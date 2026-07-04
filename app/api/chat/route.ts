import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SYSTEM_PROMPT } from "@/lib/chatbot/system-prompt";
import { rateLimit, getClientIP } from "@/lib/rateLimit";

// ─── Configuration de sécurité ──────────────────────────────────────────
// Limite stricte de durée pour éviter qu'une requête ne monopolise une
// fonction serverless trop longtemps (DoS amplifier).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20; // secondes (Vercel Hobby : 10-60s selon plan)

// Constantes de validation (audit H2)
const MAX_MESSAGES = 30; // nb max de messages par requête
const MAX_CONTENT_LENGTH = 2000; // caractères max par message utilisateur
const MAX_REPLY_LENGTH = 1000; // tronque la réponse LLM stockée/renvoyée

// Regex simple mais robuste pour détecter un email (ReDoS-safe — pas de
// quantificateurs imbriqués).
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

// UUID v4 (validation du sessionId fourni par le client).
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Modèles gratuits OpenRouter classés par qualité décroissante.
const FREE_MODELS_FALLBACK = [
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-31b-it:free",
];

/**
 * Client Supabase privilégié (SERVICE_ROLE_KEY) — bypass RLS.
 * Côté serveur UNIQUEMENT. Ne JAMAIS exposer cette clé au navigateur.
 * Retourne null si Supabase n'est pas configuré (on continue sans persistance).
 */
function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * Devine le type de projet à partir du contenu de la conversation.
 */
function guessProjectType(history: { role: string; content: string }[]): string | null {
  const text = history.map((m) => m.content.toLowerCase()).join(" \n ");
  if (/(face cam|face-cam|ugc|créateur.*parle|tiktok|reels|shorts)/.test(text)) return "ugc";
  if (/(motion design|motion-design|fond noir|apple|cinétique|kinetic|typograph)/.test(text)) return "motion_design";
  if (/(multi-?clip|multi-?plan|récit|voix off|brand film|automotive|suv|voiture)/.test(text)) return "pub_multi_clip";
  if (/(court[- ]métrage|short film|fiction|cinémato)/.test(text)) return "court_metrage";
  return null;
}

/** Extrait un email des messages utilisateur. */
function extractEmail(history: { role: string; content: string }[]): string | null {
  for (const m of history) {
    if (m.role !== "user") continue;
    const match = m.content.match(EMAIL_RE);
    if (match) return match[0].toLowerCase();
  }
  return null;
}

/** Réponse JSON d'erreur standardisée. */
function errorResponse(content: string, sessionId: string, status = 200) {
  return NextResponse.json({ role: "assistant", content, sessionId }, { status });
}

export async function POST(req: Request) {
  // ─── H3 : Vérification Content-Type ──────────────────────────────────
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type invalide." },
      { status: 415 }
    );
  }

  // ─── H3 : Vérification Origin (anti-CSRF) ────────────────────────────
  // On accepte : pas d'origin (même origine, requêtes non-CORS), localhost (dev),
  // et les déploiements Vercel (domaine principal + previews).
  const origin = req.headers.get("origin");
  if (origin) {
    const isLocalhost = origin.includes("localhost") || origin.includes("127.0.0.1");
    const isVercelApp = origin.includes("vercel.app");
    const isOwnDomain = process.env.NEXT_PUBLIC_SITE_URL
      ? origin === process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
      : false;
    if (!isLocalhost && !isVercelApp && !isOwnDomain) {
      return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 });
    }
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // ─── H1 : Rate limiting par IP ───────────────────────────────────────
  const ip = getClientIP(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const sessionId = crypto.randomUUID();

  try {
    // ─── Parsing + L1 : gérer JSON malformé ────────────────────────────
    let body: { messages?: unknown; sessionId?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Corps de requête JSON invalide." },
        { status: 400 }
      );
    }

    // ─── H2 : Validation du payload ────────────────────────────────────
    const rawMessages = body.messages;
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json(
        { error: "Aucun message fourni." },
        { status: 400 }
      );
    }
    if (rawMessages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: "Trop de messages." },
        { status: 413 }
      );
    }

    // Valide chaque message : role + content string + longueur
    const incoming: { role: string; content: string }[] = [];
    for (const m of rawMessages) {
      if (typeof m !== "object" || m === null || typeof m.content !== "string") {
        return NextResponse.json(
          { error: "Format de message invalide." },
          { status: 400 }
        );
      }
      const content = m.content.slice(0, MAX_CONTENT_LENGTH); // hard cap
      const role = typeof m.role === "string" ? m.role : "user";
      // On rejette tout role 'system' venu du client (prompt injection)
      if (role === "system") {
        return NextResponse.json(
          { error: "Rôle non autorisé." },
          { status: 400 }
        );
      }
      incoming.push({ role, content });
    }

    // ─── Persistance Supabase (non bloquante) ──────────────────────────
    const admin = getAdminSupabase();

    if (admin) {
      // 1. Stocke le dernier message utilisateur
      const lastUserMsg = [...incoming].reverse().find((m) => m.role === "user");
      if (lastUserMsg) {
        try {
          await admin.from("chat_messages").insert({
            session_id: sessionId,
            role: "user",
            content: lastUserMsg.content,
          });
        } catch {
          // La persistance ne doit jamais bloquer le chat
        }
      }

      // 2. Capture d'email + création/maj de lead
      const email = extractEmail(incoming);
      if (email) {
        const projectType = guessProjectType(incoming);
        const messageAggregate = incoming
          .filter((m) => m.role === "user")
          .map((m) => m.content)
          .join(" | ")
          .slice(0, 2000); // cap pour éviter le flood DB

        try {
          const { data: existing } = await admin
            .from("leads")
            .select("id, email")
            .eq("email", email)
            .limit(1);

          if (existing && existing.length > 0) {
            await admin
              .from("leads")
              .update({ message: messageAggregate, project_type: projectType ?? undefined })
              .eq("id", existing[0].id);
          } else {
            await admin.from("leads").insert({
              email,
              project_type: projectType,
              message: messageAggregate,
              status: "nouveau",
            });
          }
        } catch {
          // non bloquant
        }
      }
    }

    // ─── Appel OpenRouter (avec fallback) ──────────────────────────────
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      return errorResponse(
        "Je suis désolé, l'assistant est momentanément indisponible. Vous pouvez écrire directement au studio : herve@donhver-studios.com.",
        sessionId
      );
    }

    // H4 : on ne fait PAS confiance à l'historique envoyé par le client.
    // On force le dernier message à être 'user' et on ne garde que les rôles
    // valides. Pas de 'system' client (déjà rejeté plus haut).
    const safeMessages = incoming.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));
    const messagesForModel = [
      { role: "system", content: SYSTEM_PROMPT },
      ...safeMessages,
    ];

    let reply: string | null = null;
    let usedModel: string | null = null;

    for (const model of FREE_MODELS_FALLBACK) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12_000); // ≤ maxDuration

        const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": siteUrl,
            "X-Title": "Donhver Studios",
          },
          body: JSON.stringify({
            model,
            messages: messagesForModel,
            temperature: 0.7,
            max_tokens: 300,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!orRes.ok) continue; // 429/4xx/5xx → modèle suivant

        const orData = await orRes.json();
        const content: string | undefined = orData?.choices?.[0]?.message?.content;
        if (!content || !content.trim()) continue;

        // M4 : cap la longueur de la réponse (defense-in-depth)
        reply = content.trim().slice(0, MAX_REPLY_LENGTH);
        usedModel = model;
        break;
      } catch {
        continue; // timeout/réseau → modèle suivant
      }
    }

    if (!reply) {
      return errorResponse(
        "Désolé, une erreur technique est survenue. Vous pouvez écrire directement à herve@donhver-studios.com.",
        sessionId
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[chat] Réponse via ${usedModel}`);
    }

    // Persiste la réponse (capée)
    if (admin) {
      try {
        await admin.from("chat_messages").insert({
          session_id: sessionId,
          role: "assistant",
          content: reply,
        });
      } catch {
        // non bloquant
      }
    }

    return NextResponse.json(
      { role: "assistant", content: reply, sessionId },
      { status: 200 }
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[chat] Unexpected error", err);
    }
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}

// Rejette explicitement les autres méthodes HTTP
export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
