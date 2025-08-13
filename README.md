# The Read Devils Reading Club — Static Site

A lightweight, accessible, and fast single-page site deployed via GitHub Pages.

## Scripts

- `npm run dev` — Local preview
- `npm run build` — Build to `dist/`
- `npm run preview` — Preview built site
- `npm run format` — Prettier format
- `npm run lint` — ESLint
- `npm run stylelint` — Stylelint
- `npm run a11y` — axe CLI (against local dev URL)
- `npm run lh` — Lighthouse (against local dev URL)

## Deploy (GitHub Pages)

- Push to `main`/`master`. GitHub Action builds and deploys to `gh-pages`.
- Ensure Pages is configured to serve from the `gh-pages` branch.

## Assets

Place brand assets in `assets/`. Square logo is reused for icons/OG until custom exports are provided.

## Tech

- HTML5 + CSS (custom properties) + minimal JS
- Vite for dev/build
- System font stack, strong color contrast, skip link, details/summary for FAQs

