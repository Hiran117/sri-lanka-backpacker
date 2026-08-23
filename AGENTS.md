# LankaTrail — Base44 dev environment

## Stack
- Next.js 16 (App Router, Turbopack) + React 19, Tailwind CSS v4.
- Auth via Auth.js (next-auth v5 beta): Google OAuth + Credentials. Config in `src/auth.js`.
- Database via Supabase (`@supabase/supabase-js`); client in `src/lib/supabase.js`.
- `src/lib/fetchDestinationImage.js` is a standalone Pexels image-fetch script, not imported by the app — Pexels key is optional.

## Running locally (Base44)
- `docker compose -f docker-compose.base44.yml up -d` — bind-mounts source, runs `npm install && npm run dev` on `node:22`, port 3000.
- Live reload works via Turbopack watcher; call `reload_preview` only after a service/compose restart.
- `.env.base44-defaults` holds placeholders so the app boots without real credentials; `/run/base44/app.env` (Secrets page) overrides them.

## Secrets (all optional to boot; needed for auth/data features)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase project URL + anon key.
- `AUTH_SECRET` — Auth.js session secret.
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` — Google OAuth web client credentials.

Without these, public pages (home, routes, destinations, blog) render normally; sign-in, sign-up, check-ins, and reviews will fail against the placeholder Supabase.

## Quirks
- `next.config.mjs` sets `allowedDevOrigins` from `BASE44_PUBLIC_HOST_SUFFIX` so the preview origin can load dev assets/HMR — keep this when editing config.
- Credentials provider bcrypt-compares against a `users` table in Supabase; there is no local DB — a real Supabase project with the expected tables is required for auth to work.
- Compose `environment:` must NOT list secret keys (overrides the env_file with blank values); only `BASE44_PUBLIC_HOST_SUFFIX` lives there.

## Verify
- `curl -sf -H "Host: external-preview.example.com" http://localhost:3000/` returns the Lanka Trail home page.
- `docker compose -f docker-compose.base44.yml logs web` shows `next dev` Ready + 200 responses.
