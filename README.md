# Appetite Amplifier (TanStack Start + Vite + Cloudflare Workers)

This project is a TanStack Start app built with Vite and configured to deploy as a **Cloudflare Worker** (static assets in `dist/client`, worker bundle + `wrangler` config in `dist/server`).

## Local development

### Prereqs
- Node.js 20+ (Node 22 recommended)
- npm

### Install + run
```bash
npm ci
npm run dev
```

## Environment variables

Copy `.env.example` to `.env` and fill values as needed.

Notes:
- `VITE_*` variables are **exposed to the browser**.
- `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` are safe to expose only if they are the Supabase **anon/public** values (never commit service role keys).

## Production build

```bash
npm ci
npm run build
```

Build outputs:
- `dist/client` (static assets)
- `dist/server` (Cloudflare Worker + `wrangler` config)

## Deploy: Vercel (recommended for you)

This repo was originally configured for Cloudflare Workers. For Vercel SSR support, TanStack Start uses **Nitro**.

### 1) Add env vars in Vercel
Project Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- (optional) `VITE_SUPABASE_PROJECT_ID`

### 2) Deploy
Import the Git repo into Vercel and use:
- Build Command: `npm run build`
- Output Directory: leave empty (SSR)
- Install Command: `npm ci`

Vercel should auto-detect TanStack Start when Nitro is present.

If you run into detection issues, this repo includes `vercel.json`.

Local “prod-like” run:
```bash
npm run build
npm run start
```

## Deploy: Cloudflare Workers

### 1) Authenticate once
```bash
npx wrangler login
```

### 2) Build and deploy
```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

### 3) Set secrets / vars in Cloudflare
If you rely on server-side env vars at runtime, set them in your Worker environment:
```bash
npx wrangler secret put SUPABASE_URL --config dist/server/wrangler.json
npx wrangler secret put SUPABASE_PUBLISHABLE_KEY --config dist/server/wrangler.json
```

If you only use `VITE_*` variables, they must be present at **build time** (CI environment variables) because they get baked into the client bundle.

## Other platforms

### Netlify
There is a `netlify.toml`, but the current build output is a Cloudflare Worker (not a Netlify Function), so Netlify will need extra adapter work to run SSR.

If you only want a static deploy on Netlify, you can publish `dist/client`, but any SSR/server-only routes won’t work.

### Docker / Node server
There is a `Dockerfile`, but the current `dist/server` output is Worker-oriented; running `node dist/server/index.js` does **not** start an HTTP server by itself.

If you want a true Node server deployment (Fly.io/Render/etc.), we can switch the TanStack Start adapter/build target to Node and update the Dockerfile accordingly.
