/**
 * Contenu du portfolio Donhver Studios — modifiable sans toucher aux composants.
 *
 * Fidèle au design Donhver Studios.dc.html.
 * Les vidéos servent en local (public/videos/) ; pour la prod, héberger sur
 * Vercel Blob / Supabase Storage / CDN et pointer via videoUrl.
 */

// ─── Types ──────────────────────────────────────────────────────────────

export type VideoItem = {
  num: string;
  title: string;
  cat: string;
  src?: string; // URL de la vidéo (vide → état « Bientôt en ligne »)
};

export type Work = {
  num: string;
  kind: string; // ex. "LOOKBOOK MODE"
  title: string; // ligne principale (Anton)
  subtitle?: string; // seconde ligne du titre (Anton), ex. "Streetwear"
  mention?: string; // mention à droite en bas (DIRECTION · CASTING…)
  image: string;
  span: 5 | 7; // largeur sur grille 12 col
  ratio: "16/10" | "3/4" | "1/1"; // aspect-ratio
  caseStudy?: CaseStudy; // si présent → carte cliquable → ouvre le modal
};

/**
 * Case study détaillé montré dans le modal « behind-the-scenes ».
 * Tous les champs de `brief` sont obligatoires ; `refSheet` et `video` sont
 * optionnels (certaines marques n'ont pas de ref sheet, la vidéo finale est
 * branchée plus tard via URL externe).
 */
export type CaseStudy = {
  brief: {
    brand: string;
    tagline: string;
    concept: string; // 2-3 phrases
    format: string; // ex. "30s · 2 clips"
    tools: string[]; // ex. ["Seedance 2 (image→vidéo)", ...]
    deliverables: string;
  };
  refSheet?: {
    src: string; // image de référence verrouillée
    label: string; // ex. "Ref sheet véhicule — design lock R2V"
  };
  video?: {
    src?: string; // URL de la vidéo finale (à brancher plus tard)
    note?: string; // ex. "Vidéo à brancher via URL externe"
  };
  accent: string; // hex de la marque pour touches subtiles
};

export type Service = {
  num: string;
  title: string;
  desc: string;
};

export type ProcessStep = {
  num: string;
  title: string;
  desc: string;
};

export type Stat = {
  value: string;
  label: string;
  accentLastChar?: boolean; // colorer le dernier caractère en accent (ex. "48H")
};

// ─── Profile ────────────────────────────────────────────────────────────

export const profile = {
  name: "Donhver Studios",
  role: "Studio créatif · Direction artistique",
  established: "EST. 2026 — INDÉPENDANT",
  location: "PARIS · À DISTANCE · MONDE",
  heroHeadline: ["Nous faisons", "des images", "qui vendent."],
  heroLead:
    "Marketing, UGC, publicités vidéo haut de gamme et récits cinématographiques. Nous dirigeons chaque projet comme un film — intention, lumière, cadence.",
  heroImage: "/works/thriller.jpg",
  heroCaption: { label: "AFFICHE CINÉMA", index: "/ 01" },
  email: "hello@donhver.studio",
  studioEyebrow: "/ LE STUDIO",
  studioStatement: "Une idée. Une direction. Une image qui reste.",
  studioBody:
    "Donhver Studios est un studio créatif indépendant. Nous transformons une intention en visuels qui marquent — de la direction artistique à la publicité vidéo, du contenu UGC aux petits récits pour enfants.",
  studioBody2:
    "Chaque projet est traité avec la rigueur d'un plateau : lumière, cadrage, cadence. Pas d'effet gratuit — l'image sert le message.",
  aboutImage: "/works/mocha-mockups.jpg",
};

// ─── Marquee ────────────────────────────────────────────────────────────

export const marqueeItems = [
  "Branding",
  "UGC",
  "Motion",
  "Publicité",
  "Éditorial",
  "Cinéma",
  "Storytelling",
  "Campagnes",
];

// ─── Showreel / Vidéos ──────────────────────────────────────────────────

export const showreel = {
  src: "/videos/hero-video.mp4", // showreel principal 16/9
  title: "Showreel — Donhver Studios",
  caption: "RÉALISATION · PUBLICITÉ CINÉMATOGRAPHIQUE",
  badge: "SHOWREEL 2026",
};

export const videos: VideoItem[] = [
  {
    num: "01",
    title: "Clip Musical — Néons Urbains",
    cat: "MUSIQUE · KLING + RUNWAY",
    src: "/videos/seedance.mp4",
  },
  {
    num: "02",
    title: "Spot Publicitaire Restaurant",
    cat: "PUBLICITÉ · SPOT 30S",
    src: "/videos/demo.mp4",
  },
  {
    num: "03",
    title: "Promotion Immobilière",
    cat: "IMMOBILIER · SEEDANCE",
    // soon — pas de src
  },
  {
    num: "04",
    title: "Vidéo de Marque — Startup Tech",
    cat: "BRANDING · IA",
    // soon — pas de src
  },
];

export const videosNote =
  "Deux productions sont déjà en ligne. Pour les autres, envoie-moi les fichiers ou les liens YouTube / Vimeo et je les branche ici.";

// ─── Travaux / Visuels ──────────────────────────────────────────────────

export const works: Work[] = [
  {
    num: "01",
    kind: "LOOKBOOK MODE",
    title: "VÖRTA",
    subtitle: "Streetwear",
    mention: "DIRECTION · CASTING · PHOTO",
    image: "/works/vorta.jpg",
    span: 7,
    ratio: "16/10",
  },
  {
    num: "02",
    kind: "POSTER PUBLICITÉ",
    title: "Supra",
    subtitle: "GR",
    image: "/works/supra.jpg",
    span: 5,
    ratio: "3/4",
  },
  {
    num: "03",
    kind: "POCHETTE ALBUM",
    title: "Yara — Ember",
    image: "/works/yara.jpg",
    span: 5,
    ratio: "1/1",
  },
  {
    num: "04",
    kind: "CONTENU VIDÉO",
    title: "Filmmaking",
    subtitle: "Thumbnail",
    mention: "RÉEL + CINÉMA",
    image: "/works/filmmaking.jpg",
    span: 7,
    ratio: "16/10",
  },
  {
    num: "05",
    kind: "CAMPAGNE LIFESTYLE",
    title: "Mocha Mood",
    subtitle: "Coffee Co.",
    mention: "IDENTITÉ · UGC",
    image: "/works/mocha-photoshoot.jpg",
    span: 7,
    ratio: "16/10",
  },
  {
    num: "06",
    kind: "MINIATURE YOUTUBE",
    title: "Tech",
    subtitle: "Thumbnail",
    image: "/works/youtube.jpg",
    span: 5,
    ratio: "3/4",
  },

  // ─── Projets réels (cliquables → case study) ───────────────────────────
  {
    num: "07",
    kind: "PUBLICITÉ AUTOMOBILE",
    title: "ALPHEA",
    subtitle: "Au-delà de la route",
    mention: "SPOT 30S · 2 CLIPS",
    image: "/refs/alphea-refsheet.jpg",
    span: 7,
    ratio: "16/10",
    caseStudy: {
      brief: {
        brand: "ALPHEA",
        tagline: "Au-delà de la route.",
        concept:
          "Publicité 4x4 premium multi-saisons pour une marque fictive. Récit épique à travers l'automne, l'hiver, les rochers et le sommet, suivi de specs en motion graphics et signature. Le design du véhicule est verrouillé par une ref sheet (R2V) branchée sur les deux clips pour garantir la continuité visuelle.",
        format: "30s · 2 clips × 15s",
        tools: [
          "Seedance 2 (image→vidéo, ratio 1470:630 — 21:9)",
          "gpt_image_2 (ref sheet véhicule 2K)",
          "Runway ML API (mode R2V — image_to_video)",
        ],
        deliverables:
          'Clip 1 « L\'Odyssée » (récit épique multi-terrains) + Clip 2 « Les Chiffres » (hero shot + typographies specs : 4 ROUES MOTRICES, 700 KM D\'AUTONOMIE, -30°C, GARANTIE 7 ANS) + ref sheet véhicule verrouillée.',
      },
      refSheet: {
        src: "/refs/alphea-refsheet.jpg",
        label: "Ref sheet véhicule — design lock R2V (4 vues verrouillées)",
      },
      video: {
        note: "Vidéo finale à brancher via URL externe (Vercel Blob / Storage)",
      },
      accent: "#1A3A2A",
    },
  },
  {
    num: "08",
    kind: "MOTION DESIGN TECH",
    title: "AURA",
    subtitle: "La lumière dans ta main",
    mention: "SPOT 30S · 2 CLIPS",
    image: "/works/yara.jpg",
    span: 5,
    ratio: "3/4",
    caseStudy: {
      brief: {
        brand: "AURA",
        tagline: "La Lumière Dans Ta Main.",
        concept:
          "Publicité motion design 30s pour un smartphone premium, style Apple. Révélation cinématique de l'appareil dans un void noir infini, puis kinetic light streaks et infographics animées (écran 120Hz, 48 MP, titane, autonomie 48h). Aucune ref sheet nécessaire — le smartphone est le sujet unique.",
        format: "30s · 2 clips × 15s",
        tools: [
          "Seedance 2 (text→vidéo, ratio 864:496)",
          "Runway ML API (text_to_video, sans R2V)",
        ],
        deliverables:
          'Clip 1 « Révélation » (close-up, ignition de l\'écran, orbite autour de l\'appareil) + Clip 2 « Infographics » (kinetic + specs animées + logo AURA).',
      },
      video: {
        note: "Vidéo finale à brancher via URL externe (Vercel Blob / Storage)",
      },
      accent: "#0A84FF",
    },
  },
  {
    num: "09",
    kind: "PUB PRODUIT BOISSON",
    title: "SLAKE",
    subtitle: "L'Éclair",
    mention: "SPOT 15S · HYPER-MOTION",
    image: "/refs/slake-refsheet.jpg",
    span: 5,
    ratio: "1/1",
    caseStudy: {
      brief: {
        brand: "SLAKE",
        tagline: "L'Éclair",
        concept:
          "Publicité hyper-motion pour un thé glacé premium fictif, 15s d'énergie cinétique pure. Crash-zooms, whip pans et slow-motion liquide explosif dans un void noir studio. Aucun voiceover, aucune musique — uniquement un sound design diégétique hyper-crisp où chaque cut frappe comme un beat.",
        format: "15s · 1 clip",
        tools: [
          "Seedance 2 (image→vidéo, ratio 864:496)",
          "gpt_image_2 (ref sheet bouteille 2K)",
          "Runway ML API (mode R2V — image_to_video)",
        ],
        deliverables:
          "Clip 15s hyper-motion : crash-zoom sur glaçon, slam de bouteille, splash en couronne gelée, orbital 180°, ruban liquide anti-gravité, éruption finale. Ref sheet bouteille verrouillée.",
      },
      refSheet: {
        src: "/refs/slake-refsheet.jpg",
        label: "Ref sheet bouteille — design lock R2V (verre, label, wordmark)",
      },
      video: {
        note: "Vidéo finale à brancher via URL externe (Vercel Blob / Storage)",
      },
      accent: "#C8662A",
    },
  },
  {
    num: "10",
    kind: "ANIMATION ÉDUCATIVE",
    title: "Pizza",
    subtitle: "Margherita 1889",
    mention: "ANIMATION 15S · PAPER-CUTOUT",
    image: "/refs/pizza-styleref.jpg",
    span: 7,
    ratio: "16/10",
    caseStudy: {
      brief: {
        brand: "PIZZA EDU",
        tagline: "Des origines à Naples",
        concept:
          "Animation pédagogique 2D paper-cutout retraçant l'histoire de la pizza, de la Méditerranée antique à Naples 1889 (naissance de la Margherita). Esthétique collage de papier kraft déchiré aux ciseaux, avec ombres portées et détails à l'encre/aquarelle. Ton chaleureux et pédagogique, style livre illustré.",
        format: "15s · 1 clip",
        tools: [
          "Seedance 2 (image→vidéo, ratio 864:496)",
          "gpt_image_2 (style ref paper-cutout 2K)",
          "Runway ML API (mode R2V — image_to_video avec @style_ref)",
        ],
        deliverables:
          "Clip 15s 2D paper-cutout : carte de la Méditerranée, paysan antique + four à bois, rue de Naples 18e siècle, reine 1889 + pizza Margherita (drapeau italien), fin sur livre d'histoires ouvert. Style ref verrouillée.",
      },
      refSheet: {
        src: "/refs/pizza-styleref.jpg",
        label: "Style ref paper-cutout — esthétique verrouillée (R2V style)",
      },
      video: {
        note: "Vidéo finale à brancher via URL externe (Vercel Blob / Storage)",
      },
      accent: "#C97B3F",
    },
  },
  {
    num: "11",
    kind: "PUB CINÉMATOGRAPHIQUE",
    title: "Le Silence",
    subtitle: "qui parle",
    mention: "SPOT 60S · CASQUE ANC · 18 SHOTS",
    image: "/works/thriller.jpg",
    span: 7,
    ratio: "16/10",
    caseStudy: {
      brief: {
        brand: "CASQUE ANC",
        tagline: "Retrouve ton monde.",
        concept:
          "Publicité narrative 60s pour un casque audio à réduction de bruit active. Une femme submergée par le bruit du monde trouve, en enclenchant son casque, l'accès à son monde intérieur. Le spot repose sur une bascule sonore au tier temps (~0:22) : cut total de son, puis musique qui envahit. Le produit n'apparaît pas comme un objet — mais comme un seuil.",
        format: "60s · 18 shots · 16:9",
        tools: [
          "Découpage shot-par-shot (3 actes compressés)",
          "Angle 3/4 roi (staging en profondeur, 3 plans jouables)",
          "Règle des 180° (continuité spatiale, marche vers la gauche)",
          "Sound design narratif (cut à 0:22 = équivalent sonore du match-cut)",
        ],
        deliverables:
          "Spot 60s cinématographique : Acte I « L'agression » (cuts rapides) → Acte II « La bascule » (cut total + piano) → Acte III « L'évasion » (golden hour, master shot 3 couches, signature produit). Démonstration de mise en scène : découpage varié, direction photo, sound design narratif.",
      },
      video: {
        note: "Vidéo finale (161 Mo) à héberger sur Vercel Blob / Storage puis brancher via URL",
      },
      accent: "#5B7C99",
    },
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { value: "06", label: "DISCIPLINES MAÎTRISÉES" },
  { value: "4K", label: "QUALITÉ CINÉMA" },
  { value: "48H", label: "PREMIER JET", accentLastChar: true },
  { value: "∞", label: "ITÉRATIONS JUSQU'AU OUI" },
];

// ─── Services ───────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    num: "01",
    title: "Marketing & Campagnes",
    desc: "Concepts et visuels publicitaires pensés pour convertir — de l'idée à la déclinaison multi-format.",
  },
  {
    num: "02",
    title: "UGC",
    desc: "Contenu authentique calibré pour les réseaux et la performance, sans perdre l'exigence de direction.",
  },
  {
    num: "03",
    title: "Publicités vidéo haut de gamme",
    desc: "Films de marque à l'esthétique cinéma : lumière, montage et grading soignés.",
  },
  {
    num: "04",
    title: "Mini-histoires pour enfants",
    desc: "Récits doux et colorés, personnages attachants, univers cohérents d'un plan à l'autre.",
  },
  {
    num: "05",
    title: "Direction artistique",
    desc: "Identités, moodboards et univers de marque complets — la cohérence avant l'effet.",
  },
  {
    num: "06",
    title: "Contenu cinématographique",
    desc: "Affiches, pochettes, posters et éditorial au registre premium et assumé.",
  },
];

// ─── Processus ──────────────────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Brief",
    desc: "Vous décrivez votre vision, nous écoutons et cadrons l'intention.",
  },
  {
    num: "02",
    title: "Création",
    desc: "Direction, génération et montage donnent vie à l'idée, plan par plan.",
  },
  {
    num: "03",
    title: "Livraison",
    desc: "Vous recevez un résultat prêt à publier, dans tous les formats utiles.",
  },
];

// ─── Réseaux ────────────────────────────────────────────────────────────

export const socials = ["INSTAGRAM", "BEHANCE", "LINKEDIN"];
