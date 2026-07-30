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
3. Set the project settings to:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Other** |
   | Build Command | `npm run build` |
   | Install Command | `npm install` |
   | Output Directory | **leave empty** |
   | Node.js Version | 22.x (default) |

   Do **not** pick the "Vite" preset. It forces the output directory to `dist`,
   which this project never produces. During the build Nitro detects Vercel and
   writes `.vercel/output` (Build Output API v3) — static files, the SSR function,
   and the routing config — which Vercel picks up automatically.
4. Add the contact-form environment variables (Settings → Environment Variables):

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | your key from <https://resend.com/api-keys> |
   | `CONTACT_FROM` | `DaarLabs <onboarding@resend.dev>` to start |

5. Click **Deploy**

### Contact form

Messages submitted on `/contact` are forwarded to **Labs.daar@gmail.com** by a
server-side function (`src/lib/contact.ts`), with the sender's address set as
`reply_to` so you can reply straight from Gmail.

Setup: create a free Resend account, generate an API key, and set the two variables
above (locally, copy `.env.example` to `.env`). Until a domain is verified you can send
from `onboarding@resend.dev`; once `daarlabs.com` DNS is verified in Resend, switch
`CONTACT_FROM` to something like `DaarLabs <hello@daarlabs.com>`.

Without a key the form shows a clear error rather than silently dropping messages,
and the key stays server-side — it's never included in the browser bundle.

You'll get a `daarlabs-web.vercel.app` URL. Every push to `main` redeploys automatically,
and pull requests get their own preview URLs.

### Custom domain

Project → **Settings** → **Domains** → add `daarlabs.com`. Vercel shows the DNS records to
create at your registrar — usually an `A` record for the apex and a `CNAME` for `www`.
HTTPS is provisioned automatically once DNS resolves.

---

## Build details

`npm run build` regenerates the Tailwind safelist, then produces a Nitro bundle.
The layout depends on where it runs:

- **Locally** → `.output/public` (static assets) and `.output/server` (SSR handler)
- **On Vercel** (`VERCEL=1` is set during the build) → `.vercel/output` containing
  `static/`, `functions/__server.func/`, and `config.json`

No `vercel.json` is needed — the generated `config.json` already caches `/assets/*`
immutably, serves static files first, and routes everything else to the SSR function.
To pin the target from your own CI, set `nitro: { preset: "vercel" }` in `vite.config.ts`.

## Pre-deploy checklist

```bash
npm run lint        # eslint
npx tsc --noEmit    # types
npm run build       # full production build
npm run preview     # serve the build locally
```
