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
    ratio?: "16/9" | "9/16" | "1/1"; // format de la vidéo (défaut 16/9)
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

// Base URL des vidéos finales hébergées sur Vercel Blob (CDN public).
// Définie ici car utilisée par showreel + videos + works.
const VIDS =
  "https://spdb3opwpftoijeo.public.blob.vercel-storage.com/portfolio-videos/";

export const showreel = {
  src: VIDS + "court-metrage-la-photo.mp4", // court-métrage 1m55s — pièce la plus ambitieuse
  title: "Showreel — Donhver Studios",
  caption: "RÉALISATION · PUBLICITÉ CINÉMATOGRAPHIQUE",
  badge: "SHOWREEL 2026",
};

export const videos: VideoItem[] = [
  {
    num: "01",
    title: "Le Silence qui parle",
    cat: "SPOT 60S · CASQUE ANC",
    src: VIDS + "casque-silence-1080p.mp4",
  },
  {
    num: "02",
    title: "Botaniste",
    cat: "UGC · 60S",
    src: VIDS + "ugc-botaniste.mp4",
  },
  {
    num: "03",
    title: "AURA — Smartphone",
    cat: "MOTION DESIGN · 30S",
    src: VIDS + "aura-final.mp4",
  },
  {
    num: "04",
    title: "Motel",
    cat: "PUBLICITÉ · 62S",
    src: VIDS + "pub-motel.mp4",
  },
];

export const videosNote =
  "Sélection de projets récents. Cliquez sur « Direction & visuels » plus bas pour voir le case study complet de chaque projet (vidéo finale + brief).";

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
  // Toutes les vidéos sont hébergées sur Vercel Blob (CDN public).
  {
    num: "07",
    kind: "UGC BOTANIQUE",
    title: "Botaniste",
    subtitle: "Rituel plante",
    mention: "UGC · 60S",
    image: "/works/ugc-botaniste.jpg",
    span: 7,
    ratio: "16/10",
    caseStudy: {
      brief: {
        brand: "Botaniste",
        tagline: "Le geste qui fait vivre",
        concept:
          "Contenu UGC de 60s pour une marque botanique — format social long, registre créateur authentique mais dirigé avec la rigueur d'un plateau. Hook, démonstration du rituel, appel à l'action.",
        format: "60s · format social",
        tools: ["Pipeline IA (non documenté — Seedance / Runway)"],
        deliverables: "Clip UGC 60s calibré pour Reels / TikTok / Shorts.",
      },
      video: {
        src: VIDS + "ugc-botaniste.mp4",
        ratio: "9/16",
      },
      accent: "#2F6B4F",
    },
  },
  {
    num: "08",
    kind: "UGC PUBLICITÉ",
    title: "Spot UGC",
    subtitle: "Format démonstration",
    mention: "UGC · 45S",
    image: "/works/ugc-pub.jpg",
    span: 5,
    ratio: "3/4",
    caseStudy: {
      brief: {
        brand: "Spot UGC",
        tagline: "Le produit en action",
        concept:
          "Publicité UGC de 45s, registre social mid-length. Arc narratif court optimisé pour la conversion : accroche, démonstration produit, preuve sociale.",
        format: "45s · format social",
        tools: ["Pipeline IA (non documenté — Seedance / Runway)"],
        deliverables: "Clip UGC 45s.",
      },
      video: {
        src: VIDS + "ugc-pub.mp4",
        ratio: "9/16",
      },
      accent: "#E07A3C",
    },
  },
  {
    num: "09",
    kind: "UGC OPTIQUE",
    title: "Lunettes",
    subtitle: "Showcase solaires",
    mention: "UGC · 30S",
    image: "/works/ugc-lunette.jpg",
    span: 5,
    ratio: "3/4",
    caseStudy: {
      brief: {
        brand: "Lunettes",
        tagline: "Le regard qui marque",
        concept:
          "UGC court de 30s pour une marque de lunettes — showcase créateur, format vertical punchy optimisé pour le scroll social.",
        format: "30s · format vertical",
        tools: ["Pipeline IA (non documenté — Seedance / Runway)"],
        deliverables: "Clip UGC 30s lunettes / optique.",
      },
      video: {
        src: VIDS + "ugc-lunette.mp4",
        ratio: "9/16",
      },
      accent: "#B5763A",
    },
  },
  {
    num: "10",
    kind: "MOTION DESIGN TECH",
    title: "AURA",
    subtitle: "La lumière dans ta main",
    mention: "SPOT 30S · SMARTPHONE",
    image: "/works/aura-final.jpg",
    span: 7,
    ratio: "16/10",
    caseStudy: {
      brief: {
        brand: "AURA",
        tagline: "La Lumière Dans Ta Main.",
        concept:
          "Publicité motion design 30s pour un smartphone premium, style Apple. Révélation cinématique de l'appareil dans un void noir infini, puis kinetic light streaks et infographics animées (écran 120Hz, 48 MP, titane, autonomie 48h). Aucune ref sheet nécessaire — le smartphone est le sujet unique.",
        format: "30s · 2 clips assemblés",
        tools: [
          "Seedance 2 (text→vidéo, ratio 864:496)",
          "Runway ML API (text_to_video, sans R2V)",
        ],
        deliverables:
          'Spot final 30s : « Révélation » (close-up, ignition de l\'écran, orbite) + « Infographics » (kinetic + specs animées + logo AURA).',
      },
      video: {
        src: VIDS + "aura-final.mp4",
      },
      accent: "#0A84FF",
    },
  },
  {
    num: "11",
    kind: "PUBLICITÉ HÔTELLERIE",
    title: "Motel",
    subtitle: "Néon & route",
    mention: "SPOT 62S · CINÉMATOGRAPHIQUE",
    image: "/works/pub-motel.jpg",
    span: 5,
    ratio: "3/4",
    caseStudy: {
      brief: {
        brand: "Motel",
        tagline: "L'arrêt sur la route",
        concept:
          "Publicité cinématographique de 62s pour un motel — atmosphère Americana, road-trip, néon. Spot narratif et atmosphérique, loin du démonstratif produit.",
        format: "62s · 16:9",
        tools: ["Pipeline IA (non documenté — Seedance / Runway)"],
        deliverables: "Spot narratif 62s, registre cinématographique.",
      },
      video: {
        src: VIDS + "pub-motel.mp4",
        ratio: "1/1",
      },
      accent: "#C2185B",
    },
  },
  {
    num: "12",
    kind: "PUB RESTAURATION",
    title: "Pasta",
    subtitle: "Cuisine italienne",
    mention: "SPOT 34S · FOOD",
    image: "/works/pub-pasta.jpg",
    span: 7,
    ratio: "16/10",
    caseStudy: {
      brief: {
        brand: "Pasta",
        tagline: "L'appetit qui parle",
        concept:
          "Publicité de 34s pour un restaurant italien — appetite-appeal, gros plans steaming, cuisine en mouvement. Spot restaurateur classique, registre gourmand.",
        format: "34s · 16:9",
        tools: ["Pipeline IA (non documenté — Seedance / Runway)"],
        deliverables: "Spot food 34s pour restaurant italien.",
      },
      video: {
        src: VIDS + "pub-pasta.mp4",
      },
      accent: "#C0392B",
    },
  },
  {
    num: "13",
    kind: "PUB HUMOUR",
    title: "Comédie",
    subtitle: "Publicité drôle",
    mention: "SPOT 28S · HUMOUR",
    image: "/works/pub-comedie.jpg",
    span: 5,
    ratio: "3/4",
    caseStudy: {
      brief: {
        brand: "Comédie publicitaire",
        tagline: "Le rire qui convertit",
        concept:
          "Publicité humoristique de 28s — ton comique, pitch décalé. Se démarque des pièces premium/cinématographiques par son registre léger et viral.",
        format: "28s · 16:9",
        tools: ["Pipeline IA (non documenté — Seedance / Runway)"],
        deliverables: "Spot comédie 28s.",
      },
      video: {
        src: VIDS + "pub-comedie.mp4",
      },
      accent: "#E8B931",
    },
  },
  {
    num: "14",
    kind: "COURT-MÉTRAGE",
    title: "La Photo",
    subtitle: "Récit narratif",
    mention: "COURT-MÉTRAGE · 1M55S",
    image: "/works/court-metrage-la-photo.jpg",
    span: 7,
    ratio: "16/10",
    caseStudy: {
      brief: {
        brand: "La Photo",
        tagline: "Une image, toute une histoire",
        concept:
          "Court-métrage narratif de 1m55s centré sur une photographie. Pièce de cinéma, pas une publicité — la plus longue du portfolio. Démontre la mise en scène longue forme et la direction de récit.",
        format: "1m55s · court-métrage",
        tools: ["Pipeline IA (non documenté — Seedance / Runway)"],
        deliverables: "Court-métrage narratif 1m55s.",
      },
      video: {
        src: VIDS + "court-metrage-la-photo.mp4",
      },
      accent: "#6B6660",
    },
  },
  {
    num: "15",
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
        src: VIDS + "casque-silence-1080p.mp4",
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
