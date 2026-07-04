# Portfolio Herve Donmesa

Site portfolio pour **Herve Donmesa**, créateur de publicités IA cinématographiques (UGC, motion design produit, publicités multi-clip).

Stack : **Next.js 14 (App Router)** · **Tailwind CSS** · **Supabase** · **OpenRouter** (modèles gratuits).

---

## Démarrage rapide

### 1. Installer les dépendances

```bash
cd portfolio
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.local.example .env.local
```

Remplir `.env.local` avec :

| Variable | Où la trouver | Rôle |
|---|---|---|
| `OPENROUTER_API_KEY` | https://openrouter.ai/keys | Clé du chatbot |
| `OPENROUTER_MODEL` | déjà pré-rempli | Modèle gratuit à utiliser |
| `NEXT_PUBLIC_SUPABASE_URL` | dashboard Supabase → Settings → API | URL du projet |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | idem | Clé publique (sûre côté navigateur) |
| `SUPABASE_SERVICE_ROLE_KEY` | idem | Clé serveur (JAMAIS côté navigateur) |

### 3. Créer le schéma de base de données

Dans le **SQL Editor** de Supabase, exécuter le contenu de :

```
lib/supabase/schema.sql
```

Cela crée les tables `leads` et `chat_messages` avec leurs politiques RLS (écriture publique, lecture réservée au serveur).

### 4. Lancer en local

```bash
npm run dev
```

Le site est disponible sur http://localhost:3000.

---

## Déploiement sur Vercel

1. Pousser le dépôt sur GitHub.
2. Sur https://vercel.com → **Add New Project** → importer le dépôt.
3. Dans **Settings → Environment Variables**, ajouter les mêmes variables que dans `.env.local`.
4. Vercel détecte Next.js automatiquement → **Deploy**.

### Hébergement des vidéos

Les fichiers `.mp4` ne doivent **pas** être commités dans le repo (trop lourds pour GitHub). Options :

- **Vercel Blob** (intégré à Vercel, idéal)
- **Supabase Storage** (déjà disponible si tu as un projet Supabase)
- CDN externe (Cloudflare R2, Backblaze...)

Dans `lib/data.ts`, remplacer les `videoUrl: undefined` des projets par les URLs publiques des vidéos assemblées.

---

## Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Shell + metadata SEO + fonts
│   ├── page.tsx                # Assemblage des sections
│   ├── globals.css             # Tailwind + tokens dark cinématique
│   └── api/chat/route.ts       # Chatbot (cache la clé OpenRouter)
├── components/
│   ├── Hero.tsx                # Section 1 — nom + accroche + vidéo hero
│   ├── Services.tsx            # Section 2 — 3 cartes services
│   ├── Portfolio.tsx           # Section 3 — grille de projets filtrable
│   ├── Process.tsx             # Section 4 — pipeline image→vidéo
│   ├── About.tsx               # Section 5 — bio + stack
│   ├── ContactFooter.tsx       # Section 6 — contact + footer
│   ├── ChatWidget.tsx          # Widget flottant chatbot
│   └── ui/                     # Reveal, VideoPlaceholder, SectionHeading
├── lib/
│   ├── data.ts                 # Contenu du portfolio (modifiable ici)
│   ├── chatbot/system-prompt.ts # Personnalité du chatbot
│   └── supabase/
│       ├── client.ts           # Client navigateur
│       ├── server.ts           # Client serveur
│       ├── types.ts            # Types TypeScript du schéma
│       └── schema.sql          # Schéma SQL à exécuter dans Supabase
└── public/videos/              # Vidéos (à déposer plus tard)
```

---

## Personnaliser le contenu

Tout le contenu est centralisé dans **`lib/data.ts`** :

- `profile` : nom, tagline, intro, email, stats
- `services` : titres, descriptions, délais
- `projects` : portfolio (titre, marque, catégorie, format, `videoUrl`)
- `processSteps` : les 4 étapes du pipeline

Pour ajouter un projet, copier un bloc `Project` et remplir ses champs.

Le **system prompt** du chatbot est dans `lib/chatbot/system-prompt.ts`. Adapter si l'offre évolue.

---

## Sécurité

- Les clés API (**OpenRouter**, **Supabase service role**) ne sont jamais exposées côté navigateur. La route `/api/chat` est la seule à les utiliser, côté serveur.
- **RLS Supabase** : un visiteur peut insérer un lead, mais ne peut pas lire les leads des autres. La lecture se fait uniquement via la `SERVICE_ROLE_KEY` côté serveur.
- `.env.local` est dans `.gitignore` et ne doit **jamais** être commité.

---

## Licence

MIT — projet personnel.
