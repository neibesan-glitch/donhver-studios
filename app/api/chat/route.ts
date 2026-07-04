import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SYSTEM_PROMPT } from "@/lib/chatbot/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Regex simple mais robuste pour détecter un email dans un message utilisateur.
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

// Modèles gratuits OpenRouter classés par qualité décroissante.
// La liste complète et la logique de fallback sont dans la boucle d'appel ci-dessous.
// Surchargable via OPENROUTER_MODEL (un seul modèle) dans .env.local.

/**
 * Client Supabase privilégié (SERVICE_ROLE_KEY).
 * Autorisé à contourner la RLS pour écrire les leads et les messages.
 * Utilisé UNIQUEMENT côté serveur — cette clé ne quitte jamais le navigateur.
 */
function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return null; // Supabase non configuré : on continue sans persistance
  }
  return createClient(url, key);
}

/**
 * Essaie de deviner le type de projet à partir du contenu de la conversation.
 * Retourne null si rien ne ressort clairement.
 */
function guessProjectType(history: { role: string; content: string }[]): string | null {
  const text = history.map((m) => m.content.toLowerCase()).join(" \n ");
  if (/(face cam|face-cam|ugc|créateur.*parle|tiktok|reels|shorts)/.test(text)) {
    return "ugc";
  }
  if (/(motion design|motion-design|fond noir|apple|cinétique|kinetic|typograph)/.test(text)) {
    return "motion_design";
  }
  if (/(multi-?clip|multi-?plan|récit|voix off|brand film|automotive|suv|voiture)/.test(text)) {
    return "pub_multi_clip";
  }
  if (/(court[- ]métrage|short film|fiction)/.test(text)) {
    return "court_metrage";
  }
  return null;
}

/**
 * Extrait un email de la conversation (cherche dans les messages utilisateur).
 */
function extractEmail(history: { role: string; content: string }[]): string | null {
  for (const m of history) {
    if (m.role !== "user") continue;
    const match = m.content.match(EMAIL_RE);
    if (match) return match[0].toLowerCase();
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      messages?: Array<{ role: string; content: string }>;
      sessionId?: string;
    };

    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const sessionId = body.sessionId || crypto.randomUUID();

    if (incoming.length === 0) {
      return NextResponse.json(
        { error: "Aucun message fourni." },
        { status: 400 }
      );
    }

    // --- Persistance : on tente d'écrire en base, mais on ne bloque pas
    // le chat si Supabase n'est pas configuré. ---
    const admin = getAdminSupabase();

    if (admin) {
      // 1. Stocke le dernier message utilisateur
      const lastUserMsg = [...incoming].reverse().find((m) => m.role === "user");
      if (lastUserMsg) {
        await admin.from("chat_messages").insert({
          session_id: sessionId,
          role: "user",
          content: lastUserMsg.content,
        });
      }

      // 2. Capture d'email + création/maj de lead
      const email = extractEmail(incoming);
      if (email) {
        const projectType = guessProjectType(incoming);
        const messageAggregate = incoming
          .filter((m) => m.role === "user")
          .map((m) => m.content)
          .join(" | ");

        // Upsert simple sur email : si le lead existe déjà, on met à jour le message.
        const { data: existing } = await admin
          .from("leads")
          .select("id, email")
          .eq("email", email)
          .limit(1);

        if (existing && existing.length > 0) {
          await admin
            .from("leads")
            .update({
              message: messageAggregate,
              project_type: projectType ?? undefined,
            })
            .eq("id", existing[0].id);
        } else {
          await admin.from("leads").insert({
            email,
            project_type: projectType,
            message: messageAggregate,
            status: "nouveau",
          });
        }
      }
    }

    // --- Appel OpenRouter ---
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      // Clé absente : on répond quand même avec un message d'erreur utile.
      return NextResponse.json(
        {
          role: "assistant",
          content:
            "Je suis désolé, l'assistant est momentanément indisponible. Vous pouvez écrire directement au studio : hello@donhver.studio.",
          sessionId,
        },
        { status: 200 }
      );
    }

    const messagesForModel = [
      { role: "system", content: SYSTEM_PROMPT },
      ...incoming.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    // ─── Fallback multi-modèles gratuits (qualité décroissante) ───────────
    // On essaie chaque modèle dans l'ordre. Au premier qui répond, on garde.
    // On ne passe aux moins bons que si les meilleurs sont saturés/indispos.
    //
    // IMPORTANT : la liste des modèles gratuits OpenRouter change souvent.
    // Dernière vérification : 2026-07-03 (tests en direct ci-dessus).
    // Les anciens modèles (gemini-2.0-flash-exp, deepseek-chat, qwen-2.5...)
    // ont été retirés du free tier ou n'ont plus d'endpoints.
    const FREE_MODELS_FALLBACK = [
      // Tier 1 — les meilleurs gratuits actuels (testés avec vrai system prompt
      // le 2026-07-03 : réponse propre en français, suit les instructions)
      "openai/gpt-oss-120b:free",                    // GPT open-source 120B, excellent (0.5s)
      "openai/gpt-oss-20b:free",                     // GPT open-source 20B, très bon (2.4s)
      "nvidia/nemotron-3-ultra-550b-a55b:free",      // 550B, bon sur requêtes simples
      // Tier 2 — fallbacks si les précédents sont saturés
      "nvidia/nemotron-3-super-120b-a12b:free",      // 120B, rapide
      "google/gemma-4-31b-it:free",                  // Google Gemma 4 31B
      "google/gemma-4-26b-a4b-it:free",              // Google Gemma 4 26B
      // Tier 3 — recours (plus petits, moins qualitatifs)
      "nvidia/nemotron-3-nano-30b-a3b:free",         // 30B nano
      "meta-llama/llama-3.2-3b-instruct:free",       // petit Llama, dernier recours
    ];

    // Surchargable via .env (un seul modèle si besoin de test isolé)
    const forcedModel = process.env.OPENROUTER_MODEL;

    let reply: string | null = null;
    let usedModel: string | null = null;
    const errors: string[] = [];

    const modelsToTry = forcedModel
      ? [forcedModel, ...FREE_MODELS_FALLBACK.filter((m) => m !== forcedModel)]
      : FREE_MODELS_FALLBACK;

    for (const model of modelsToTry) {
      try {
        const controller = new AbortController();
        // Timeout par modèle : 25s. Au-delà on considère saturation et on bascule.
        const timeout = setTimeout(() => controller.abort(), 25000);

        const orRes = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openRouterKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer":
                process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              "X-Title": "Donhver Studios",
            },
            body: JSON.stringify({
              model,
              messages: messagesForModel,
              temperature: 0.7,
              max_tokens: 300,
            }),
            signal: controller.signal,
          }
        );
        clearTimeout(timeout);

        if (!orRes.ok) {
          const errText = await orRes.text();
          // 429 = saturé, 4xx/5xx = on tente le suivant
          errors.push(`${model} → HTTP ${orRes.status}`);
          console.error(`[chat] ${model} HTTP ${orRes.status}`, errText.slice(0, 200));
          continue;
        }

        const orData = await orRes.json();
        const content: string | undefined = orData?.choices?.[0]?.message?.content;
        if (!content || !content.trim()) {
          errors.push(`${model} → réponse vide`);
          continue;
        }
        // Filtre les modèles qui "réfléchissent à voix haute" (raisonsonnement
        // interne leaked dans la réponse). On exige une vraie phrase adressée
        // au visiteur, pas un monologue type "The user says: ..."
        const trimmed = content.trim();
        const looksLikeLeakedReasoning =
          /^(the user|l'utilisateur|okay,|let me|i should|je dois)/i.test(trimmed) &&
          trimmed.length < 120;
        if (looksLikeLeakedReasoning) {
          errors.push(`${model} → raisonnement leaked`);
          continue;
        }

        reply = content;
        usedModel = model;
        break; // succès, on sort de la boucle
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${model} → ${msg}`);
        console.error(`[chat] ${model} erreur:`, msg);
        // (timeout abort, réseau, etc.) → modèle suivant
      }
    }

    // Tous les modèles ont échoué
    if (!reply) {
      console.error("[chat] Tous les modèles ont échoué:", errors.join(" | "));
      return NextResponse.json(
        {
          role: "assistant",
          content:
            "Désolé, une erreur technique est survenue. Vous pouvez écrire directement à hello@donhver.studio.",
          sessionId,
        },
        { status: 200 }
      );
    }

    console.log(`[chat] Réponse via ${usedModel}`);

    // Persiste la réponse de l'assistant
    if (admin) {
      await admin.from("chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: reply,
      });
    }

    return NextResponse.json(
      { role: "assistant", content: reply, sessionId },
      { status: 200 }
    );
  } catch (err) {
    console.error("[chat] Unexpected error", err);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
