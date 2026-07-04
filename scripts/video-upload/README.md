# Upload des vidéos finales vers Vercel Blob

Script ponctuel pour envoyer les 7 vidéos finales du portfolio sur Vercel Blob
et obtenir les URLs publiques à brancher dans `lib/data.ts`.

## Prérequis

### 1. Créer le Blob store sur Vercel

1. Va sur https://vercel.com/dashboard
2. Ouvre ton projet portfolio (ou crée-le si pas encore fait)
3. Onglet **Storage** → **Create Database** → choisis **Blob**
4. Nomme-le `portfolio-videos` → **Create**
5. Vercel génère un **`BLOB_READ_WRITE_TOKEN`** — copie-le

### 2. Configurer le token

Le token se met dans **le fichier `.env.local` unique à la racine du portfolio**
(`portfolio/.env.local`) — le même qui contient OpenRouter et Supabase :

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ Ce fichier est ignoré par git (cf. `.gitignore`). Ne le commit jamais.

### 3. Installer les dépendances

```bash
cd portfolio/scripts/video-upload
npm install
```

## Utilisation

```bash
node upload-videos.mjs
```

Le script :
1. Vérifie que les 7 fichiers vidéo existent aux chemins attendus
2. Upload chacun vers `portfolio-videos/<nom>.mp4` sur Vercel Blob
3. Affiche les URLs publiques
4. Génère un récap à copier-coller pour ZCode

## Après l'upload

Copie le récap affiché en bas du script et donne-le à ZCode (ou colle-le dans
la conversation). Il branchera chaque URL dans le bon case study de
`portfolio/lib/data.ts` — les modals afficheront alors la vraie vidéo finale.

## Chemins des vidéos attendus

Le script cherche les vidéos à ces emplacements (ajustables dans la constante
`VIDEOS` du script si tes fichiers sont rangés ailleurs) :

```
seedance/alphea-ad/clip1-odyssee-v2.mp4     → ALPHEA clip 1
seedance/alphea-ad/clip2-finale.mp4         → ALPHEA clip 2
seedance/aura-ad/clip1-aura-revelation.mp4  → AURA clip 1
seedance/aura-ad/clip2-aura-infographics.mp4→ AURA clip 2
seedance/slake-ad/clip1-eclair.mp4          → SLAKE clip 1
seedance/pizza-edu/clip1-origines.mp4       → PIZZA clip 1
.../pub-casque-silence/pub casque - web 1080p.mp4 → CASQUE-SILENCE (réencodée ~20 Mo)
```

> La vidéo du casque a été réencodée de 154 Mo (4K) à ~20 Mo (1080p web).
> **Ne jamais uploader la version 4K** — elle est trop lourde pour le streaming.

## En cas d'erreur

- **`BLOB_READ_WRITE_TOKEN manquant`** → tu n'as pas créé `.env.local` dans ce
  dossier, ou le token est mal orthographié.
- **`Fichiers vidéo introuvables`** → ajuste les chemins dans la constante
  `VIDEOS` du script, ou déplace tes vidéos aux emplacements indiqués.
- **Erreur réseau / 401** → vérifie que le token est valide et que le store
  Blob existe toujours sur Vercel.
