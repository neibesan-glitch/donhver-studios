/**
 * upload-videos.mjs — Upload des vidéos finales du portfolio vers Vercel Blob.
 *
 * PRÉREQUIS (voir README.md) :
 *   1. Créer un Blob store sur Vercel (dashboard → Storage → Create → Blob)
 *   2. Copier BLOB_READ_WRITE_TOKEN dans .env.local (à côté de ce script)
 *   3. npm install && node upload-videos.mjs
 *
 * Le script :
 *   - upload chaque vidéo listée dans VIDEOS
 *   - affiche les URLs publiques générées
 *   - génère un snippet à coller dans portfolio/lib/data.ts
 */

import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ─── Résolution du dossier du script ────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Token lu depuis .env.local (racine du portfolio) ───────────────────
// Le fichier .env.local unique se trouve à la racine du portfolio, pas ici.
// Comme ça tu n'as qu'un seul fichier pour toutes tes clés.
async function loadEnv() {
  const envPath = path.resolve(__dirname, "../../.env.local");
  if (!existsSync(envPath)) return {};
  const txt = (await readFile(envPath, "utf8")).toString();
  const out = {};
  for (const line of txt.split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
  return out;
}

// ─── Liste des vidéos à uploader ────────────────────────────────────────
// "caseStudyKey" = la marque telle qu'elle apparaît dans portfolio/lib/data.ts.
// "src" = chemin local vers le fichier vidéo (relatif à ce script).
// Tu peux ajuster les chemins si tes vidéos sont rangées autrement.
const ROOT = path.resolve(__dirname, "../../.."); // racine du dépôt seedance/ (portfolio/scripts/video-upload → 3 niveaux)
const CASQUE_DIR = path.resolve(
  "C:/Users/herbe/OneDrive/Documents/Projet/livre/livraisons/pub-casque-silence"
);

const VIDEOS = [
  {
    caseStudyKey: "ALPHEA",
    filename: "alphea-clip1-odyssee.mp4",
    src: path.join(ROOT, "alphea-ad/clip1-odyssee-v2.mp4"),
    label: "ALPHEA — Clip 1 « L'Odyssée » (édition dynamique)",
  },
  {
    caseStudyKey: "ALPHEA",
    filename: "alphea-clip2-finale.mp4",
    src: path.join(ROOT, "alphea-ad/clip2-finale.mp4"),
    label: "ALPHEA — Clip 2 « Les Chiffres »",
  },
  {
    caseStudyKey: "AURA",
    filename: "aura-clip1-revelation.mp4",
    src: path.join(ROOT, "aura-ad/clip1-aura-revelation.mp4"),
    label: "AURA — Clip 1 « Révélation »",
  },
  {
    caseStudyKey: "AURA",
    filename: "aura-clip2-infographics.mp4",
    src: path.join(ROOT, "aura-ad/clip2-aura-infographics.mp4"),
    label: "AURA — Clip 2 « Infographics »",
  },
  {
    caseStudyKey: "SLAKE",
    filename: "slake-clip1-eclair.mp4",
    src: path.join(ROOT, "slake-ad/clip1-eclair.mp4"),
    label: "SLAKE — Clip 1 « L'Éclair »",
  },
  {
    caseStudyKey: "PIZZA",
    filename: "pizza-clip1-origines.mp4",
    src: path.join(ROOT, "pizza-edu/clip1-origines.mp4"),
    label: "PIZZA EDU — Clip 1 « Des origines à Naples »",
  },
  {
    caseStudyKey: "CASQUE",
    filename: "casque-silence-1080p.mp4",
    // Version réencodée 1080p (~20 Mo) — ne PAS uploader la 4K de 154 Mo
    src: path.join(CASQUE_DIR, "pub casque - web 1080p.mp4"),
    label: "CASQUE-SILENCE — Pub 60s (1080p web)",
  },
];

// ─── Upload ─────────────────────────────────────────────────────────────
async function main() {
  const env = await loadEnv();
  const token = env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error(
      "\n❌ BLOB_READ_WRITE_TOKEN manquant.\n" +
        "   Ajoute-le dans portfolio/.env.local (le fichier unique à la racine) :\n" +
        "   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxx\n"
    );
    process.exit(1);
  }

  // Vérifier que tous les fichiers existent avant de commencer
  const missing = VIDEOS.filter((v) => !existsSync(v.src));
  if (missing.length) {
    console.error("\n❌ Fichiers vidéo introuvables :");
    missing.forEach((v) => console.error("   -", v.src));
    console.error(
      "\nAjuste les chemins dans la constante VIDEOS de ce script si besoin.\n"
    );
    process.exit(1);
  }

  console.log(`\n📤 Upload de ${VIDEOS.length} vidéos vers Vercel Blob...\n`);

  const results = [];
  for (const v of VIDEOS) {
    process.stdout.write(`   • ${v.label}... `);
    try {
      const file = await readFile(v.src);
      const blob = await put(`portfolio-videos/${v.filename}`, file, {
        access: "public",
        token,
        addRandomSuffix: false, // URLs stables et prévisibles
      });
      console.log("OK");
      results.push({ ...v, url: blob.url });
    } catch (err) {
      console.log("ÉCHEC");
      console.error("     ", err.message);
      process.exit(1);
    }
  }

  // ─── Récap + snippet pour data.ts ─────────────────────────────────────
  console.log("\n✅ Upload terminé. URLs publiques :\n");
  for (const r of results) {
    console.log(`   [${r.caseStudyKey}] ${r.url}`);
  }

  console.log(
    "\n📝 Copie ce récap et donne-le à ZCode pour brancher dans lib/data.ts :\n"
  );
  console.log("```");
  for (const r of results) {
    console.log(`${r.caseStudyKey} | ${r.filename} | ${r.url}`);
  }
  console.log("```\n");
}

main().catch((err) => {
  console.error("\n💥 Erreur inattendue :", err);
  process.exit(1);
});
