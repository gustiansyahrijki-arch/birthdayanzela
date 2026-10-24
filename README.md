# A Little Ocean of Wishes

A small birthday website for Anzela Raissa Widya Anandia, made with React, TypeScript, Vite, and standard CSS. The site is a static frontend: it needs no backend, account, API key, or paid service.

## Edit the birthday messages

All birthday copy, open-when notes, wishes, and ocean facts are in [`src/content.ts`](src/content.ts). Edit the text there to personalize the site without changing the layout or interactions. The birthday date is October 27, 2026.

## Run locally

Install Node.js (LTS), open this folder in a terminal, and run:

```sh
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`. To check a production build:

```sh
npm run build
npm run preview
```

## Deploy to GitHub Pages

The Vite configuration uses `base: './'`, so assets resolve when the site is published at a GitHub Pages project URL. A ready-to-run workflow is included at `.github/workflows/deploy.yml`; it builds and deploys whenever you push to `main`.

1. Push this project to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push this project to the repository's `main` branch, or run **Deploy to GitHub Pages** from the **Actions** tab.
5. Open the Pages URL shown in repository settings after the workflow completes.

The page uses Google Fonts for DM Sans and DM Serif Display; if the fonts cannot load, suitable local fallbacks are defined in CSS.
