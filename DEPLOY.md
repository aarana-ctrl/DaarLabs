# Deploying DaarLabs

Two steps: put the code on GitHub, then point Vercel at it. ~10 minutes total.

---

## 1. Create the GitHub repo

From the `Daar` folder:

```bash
git init
git add .
git commit -m "DaarLabs studio site"
git branch -M main
```

Then create the remote. **With the GitHub CLI** (easiest — it creates the repo and pushes):

```bash
gh repo create daarlabs-web --private --source=. --remote=origin --push
```

No `gh`? Create it in the browser instead:

1. Go to <https://github.com/new>
2. Repository name: `daarlabs-web`
3. Choose **Private** (or Public — your call)
4. **Do not** tick "Add a README", `.gitignore`, or a licence — the folder already has them, and pre-filled files cause a push conflict
5. Click **Create repository**, then run:

```bash
git remote add origin https://github.com/aarana-ctrl/daarlabs-web.git
git push -u origin main
```

### Note on the hero video

`public/storm-hero.mp4` is ~9.9 MB. That's fine for git (the limit is 100 MB per file),
but it does make clones heavier. If you later add more videos, consider Git LFS:

```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
```

---

## 2. Deploy on Vercel

1. Go to <https://vercel.com/new> and sign in with GitHub
2. **Import** the `daarlabs-web` repository
3. Vercel auto-detects the settings — confirm they read:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: leave as detected
4. No environment variables are needed
5. Click **Deploy**

You'll get a `daarlabs-web.vercel.app` URL. Every push to `main` redeploys automatically,
and pull requests get their own preview URLs.

### Custom domain

Project → **Settings** → **Domains** → add `daarlabs.com`. Vercel shows the DNS records to
create at your registrar — usually an `A` record for the apex and a `CNAME` for `www`.
HTTPS is provisioned automatically once DNS resolves.

---

## Build details

`npm run build` regenerates the Tailwind safelist, then produces a Nitro bundle:

- `.output/public` — static assets (JS, CSS, video, favicon)
- `.output/server` — the SSR handler

Nitro auto-detects Vercel from its environment, so no preset configuration is required.
To pin it explicitly, set `nitro: { preset: "vercel" }` in `vite.config.ts`.

## Pre-deploy checklist

```bash
npm run lint        # eslint
npx tsc --noEmit    # types
npm run build       # full production build
npm run preview     # serve the build locally
```
