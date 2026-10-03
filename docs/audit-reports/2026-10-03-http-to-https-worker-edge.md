# HTTP → HTTPS redirect at the Worker edge — 2026-10-03

**Run:** heartbeat `59c74b23-ff79-4a5b-9417-b67fed19b9c7` (wake reason `heartbeat_timer`,
unassigned). Implements **AIN-846**. Records how production is actually served, why the
issue-suggested zone-level fix was not reachable, what shipped instead, and the live
before/after evidence so neither the topology nor the regression checks need re-deriving.

Canonical production URL: `https://news.lesbass.com/`.

## Problem (as filed, AIN-846)

Plain `http://news.lesbass.com/` answered **200 OK** with the full homepage instead of
`301` to `https://`. HSTS was already present on HTTPS, but it only binds a client that has
seen an HTTPS response first.

## Serving topology (determined in this run, not documented anywhere else)

| Fact | Evidence |
|------|----------|
| Production is a **Cloudflare Worker** named `ai-newsroom`, not a Cloudflare Pages project | `GET /index.html` → `307 Location: /` (Workers Assets `html_handling`), whereas `dist/404.html` exists yet unknown paths return a **byte-empty** `404` — that combination is Assets, not Pages |
| Custom domain `news.lesbass.com` is attached to that Worker in account `4adb3952e18826ca172f446428e1b2a3` | body + headers of `https://news.lesbass.com/` and `https://ai-newsroom.lesbass.workers.dev/` are byte-identical |
| Deploys are made by **Workers Builds** through the GitHub App *Cloudflare Workers and Pages* | every push to `lesbass/ai-newsroom` produces a `Workers Builds: ai-newsroom` check run; there is **no** `.github/workflows/` in the repo |
| `ai-newsroom.pages.dev` is **not** this site | single-file Japanese HTML app, no source in any `lesbass` repo (GitHub code search → 0 hits) — that is **AIN-845** |
| Zone-level controls (`Always Use HTTPS`, Redirect rules) were not reachable | no `CLOUDFLARE_API_TOKEN`, no `~/.wrangler` auth, `/api/agents/me/secrets` → `[]`, no Cloudflare tool installed in the tool gateway (`GET /api/tool-gateway/tools` → empty) |

`public/_redirects` (177 legacy tag/host redirects) and `public/_headers` are parsed by the
Assets layer, so any Worker in front of them must forward to `env.ASSETS.fetch`.

## Fix shipped

Commits on `main`:

| Commit | Change |
|--------|--------|
| `2a01713` | `src/worker.js` — `http:` requests → `301` to the same URL over `https:`, preserving path and query; `localhost` / `127.0.0.1` / `[::1]` exempt so local tooling keeps working; every other request delegates to `env.ASSETS.fetch`. `wrangler.jsonc` gains `main: src/worker.js`, `assets.binding: "ASSETS"`, `assets.run_worker_first: true` |
| `e6dd0e5` | `eslint.config.mjs` — ignore `.wrangler/` (gitignored temp bundles broke `npm run lint` after any `npm run preview`) |

This is the credentials-free equivalent of *Always Use HTTPS*: the redirect happens at the
worker request handler, before any asset lookup, so it applies to every path.

## Verification

Local (`npm run preview` → `wrangler dev --port 8787`, driven through
`news.127.0.0.1.nip.io` because `wrangler dev` serves plain HTTP):

- `http://` any path → `301`, `location` keeps path + query
- `localhost` → still `200` (no redirect loop with dev servers)
- `/tags/agent-auth` → `301 /tags/security` (`_redirects` still applied)
- security headers present (`_headers` still applied)
- unknown path → empty `404`; `/rss.xml` → `application/rss+xml`

Live, after `2a01713` reached `main` and the Workers Builds check run completed
(`conclusion: success`, build `255ef54e-9909-48f9-849b-4c425f0be34a`):

| Request | Result |
|---------|--------|
| `http://news.lesbass.com/` | **`301` → `https://news.lesbass.com/`** |
| `http://news.lesbass.com/robots.txt` | **`301` → `https://…/robots.txt`** |
| `http://news.lesbass.com/articles/dario-amodei-pace-the-frontier/?x=1` | **`301` → `https://…?x=1`** (path + query preserved) |
| `http://ai-newsroom.lesbass.workers.dev/` | **`301` → `https://…`** |
| `https://news.lesbass.com/` | `200`, 36 489 bytes |
| `https://news.lesbass.com/articles/dario-amodei-pace-the-frontier/` | `200` |
| `https://news.lesbass.com/tags/agent-auth` | `301 /tags/security` — `_redirects` intact |
| `https://news.lesbass.com/` response headers | `strict-transport-security`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy`, `permissions-policy` — `_headers` intact |
| `/rss.xml` / `/sitemap.xml` | `application/rss+xml` / `application/xml` |
| `https://news.lesbass.com/nope-xyz/` | `404`, body size `0` |

Repo checks after the change: `npm run lint` ✅ · `npm run check` ✅ (0 errors/warnings/hints)
· `npm run test:seo` ✅ (base-URL guard) · `test:links` ✅ · `test:dates` ✅ · `test:images` ✅.

## Not done / out of scope

- Zone-level *Always Use HTTPS* and a `http.request.uri.scheme` Redirect rule were **not**
  configured — no credentials. The Worker-level redirect satisfies AIN-846; the zone rule
  remains a belt-and-braces option once Cloudflare access exists (**AIN-845**).
- `www.news.lesbass.com` still NXDOMAIN (per AIN-846, out of scope).
- No content, copy, or design changes.

## Re-verify later

```sh
curl -sI http://news.lesbass.com/                       # expect 301 + location: https://
curl -sI http://news.lesbass.com/articles/              # expect 301 (deep path)
curl -s  -o /dev/null -w '%{http_code}\n' https://news.lesbass.com/   # expect 200
curl -sI https://news.lesbass.com/tags/agent-auth       # expect 301 /tags/security
curl -s  -o /dev/null -w '%{http_code} %{size_download}\n' https://news.lesbass.com/nope-xyz/  # expect 404 0
```
