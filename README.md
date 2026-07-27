# DaarLabs

Studio site — TanStack Start (React 19 + Vite 8) with Tailwind v4 and shadcn/ui.

## Run

```bash
npm install
npm run dev      # http://localhost:8080
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run format`.

## Structure

```
src/
  routes/           file-based routes (TanStack Router)
    __root.tsx      html shell, fonts, meta, 404 + error boundaries
    index.tsx       home — hero video, wordmark, studio statement, pillars
    founders.tsx    founder profile
    projects.tsx    horizontal showcase rail
    projects.all.tsx    filterable archive (All / iOS / Web / Tool / Research)
    projects.$slug.tsx  project detail — overview, highlights, screens, next
    contact.tsx     contact form + details
    privacy.tsx     privacy policy
  components/
    SiteChrome.tsx  Nav, Footer, LightningLayer, PageShell
    ui/             shadcn/ui primitives (46 components)
  lib/
    projects-data.ts    single source of truth for all projects
    utils.ts            cn() helper
    error-capture.ts, error-page.ts, lovable-error-reporting.ts
  hooks/use-mobile.ts
  styles.css        design tokens (oklch), fonts, keyframes, utilities
  router.tsx, server.ts, start.ts
public/
  storm-hero.mp4    hero film
  favicon.ico
```

## Content

Add or edit projects in `src/lib/projects-data.ts` — the showcase, archive, detail pages
and their filters all read from that one array. A new entry appears everywhere automatically;
`slug` becomes the URL at `/projects/<slug>`.

## Hero video

`public/storm-hero.mp4`, referenced through `src/assets/storm-hero.mp4.asset.json`.
`LOOP_START_SECONDS` in `src/routes/index.tsx` (currently `4.0`) is where the loop restarts
after the first playthrough, so the trident lands once and the storm continues.

## Design tokens

Defined in `src/styles.css` as oklch values: `--background` `oklch(0.12 0.01 240)`,
`--gold` `oklch(0.78 0.13 82)`, plus card/muted/border/ring. Fonts are Cormorant Garamond
(serif display) and Inter (sans). Custom utilities: `wordmark-in`, `lightning`, `flicker`,
`drift`, `intro-glow`, `squircle`, `no-scrollbar`.

## Build config

`vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which wires TanStack Start,
React, Tailwind v4 and tsconfig paths together. Don't hand-roll these plugins — the
wrapper keeps dev-server CSS serving and SSR asset routing correct.

## Deploy

`npm run build` emits a Nitro bundle in `.output/` (`.output/public` static, `.output/server` SSR).
Nitro auto-detects the target — pushing to Vercel or Netlify just works. To pin one,
set `nitro: { preset: "vercel" }` in `vite.config.ts`.

## Troubleshooting

### Unstyled page / missing utilities

Tailwind's content scanner finds no source files on some machines — a parent
`.gitignore`, a protected or cloud-synced folder, or a symlinked path will do it.
Tailwind then emits base + theme and **no utilities**, so the app renders as plain
HTML on a black background.

The safelist block in `src/styles.css` makes utility generation independent of
scanning, and `npm run dev` / `npm run build` regenerate it automatically. After
adding classes in a new file you can also refresh it manually:

```bash
npm run safelist
```

To check whether scanning is the underlying problem:

```bash
# compiled stylesheet size — healthy is ~100 KB, scanner-broken is ~9 KB
curl -s -H "Accept: text/css" http://localhost:8080/src/styles.css | wc -c

# is something upstream git-ignoring the source?
git check-ignore -v src/routes/index.tsx
```

If `git check-ignore` prints a rule, that's the cause — the safelist covers it, but
moving the project out of the ignored path restores normal scanning and lets you
drop the safelist entirely.
