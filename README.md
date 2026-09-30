# Portfolio — Youssef Hadjkacem

Next.js 15 (App Router, export statique) · TypeScript · Tailwind CSS v4 · Framer Motion · FR/EN.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # génère le site statique dans /out
npm run lint       # vérification TypeScript
```

## Où déposer quoi

```
public/
├── profile.jpg                 ← ta photo (jpg/png/webp, carrée ou portrait, ≥ 800 px)
├── cv/                         ← 8 PDF : <data-scientist|ia-ml|cloud-backend|fintech-backend>-<fr|en>.pdf
└── media/<id-du-projet>/       ← cover.jpg, 01.jpg, 02.jpg…, demo.mp4 | demo.gif, poster.jpg
```

Détails et liste des dossiers : `public/media/README.md` et `public/cv/README.md`.
Les fichiers sont détectés **au build** (`src/lib/scan-media.ts`) : après avoir déposé des fichiers,
relance `npm run dev` (ou redéploie). Sans média, un visuel de repli est généré ; sans photo, tes initiales.

## Modifier le contenu

| À changer                              | Fichier |
|----------------------------------------|---------|
| Textes FR / EN (tout le contenu)       | `src/i18n/fr.json`, `src/i18n/en.json` (même structure, vérifiée par TypeScript) |
| Email, téléphone, réseaux              | `src/data/site.ts` |
| Technos, liens GitHub des projets      | `src/data/projects.ts` |
| **Démo live d'un projet**              | `liveUrl: "https://…"` dans `src/data/projects.ts` — le bouton « Voir la démo live » n'apparaît que si le champ est rempli |
| Compétences (et compteur de technos)   | `src/data/skills.ts` |
| Couleur d'accent                       | variables `--accent*` dans `src/app/globals.css` |

## Formulaire de contact (Formspree)

1. Crée un formulaire sur https://formspree.io et copie son ID (ex. `xyzabcde`).
2. Local : crée `.env.local` avec `NEXT_PUBLIC_FORMSPREE_ID=xyzabcde`.
3. Vercel : *Project → Settings → Environment Variables*, ajoute la même variable, puis redéploie.

Sans ID, le formulaire ouvre le client mail (`mailto:`) en repli.

## Déployer sur Vercel

1. Pousse le projet sur GitHub (`git init`, commit, push).
2. Sur https://vercel.com → *Add New… → Project* → importe le dépôt (Next.js détecté automatiquement, aucun réglage).
3. Ajoute `NEXT_PUBLIC_FORMSPREE_ID`, puis *Deploy*. Chaque `git push` redéploie.

## Langue, thème, accessibilité

- Langue : mémorisée (`localStorage`), sinon langue du navigateur (FR si `fr`, sinon EN). Le CV proposé suit la langue affichée.
- Thème : sombre par défaut, choix mémorisé, transition circulaire (View Transitions API, repli instantané sinon).
- `prefers-reduced-motion` : animations de mouvement désactivées, réseau du hero statique.
