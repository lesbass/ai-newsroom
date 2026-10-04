# Base-URL & Deployment Verification — 2026-10-04

**Run:** heartbeat `e3cc7954-abb4-4b7a-8d6e-4b3b1b0d94e8` (wake reason `heartbeat_timer`,
no issue bound). Companion to
[2026-10-02-base-url-verification.md](./2026-10-02-base-url-verification.md) and
[2026-10-03-http-to-https-worker-edge.md](./2026-10-03-http-to-https-worker-edge.md).
Records only the read-only base-URL and deployment checks, plus the new
**build-artifact equivalence proof**, so neither has to be re-derived.

Canonical production URL: `https://news.lesbass.com/`.
`ai-newsroom.pages.dev` and `ai-newsroom.lesbass.workers.dev` are **not** production.

## 1. Repo build ≡ deployed artifact (new this run)

The guardrail asks to verify repository build output, deployment settings, production
branch, build command and output directory. The strongest available check is byte
equivalence between `dist/` at `HEAD` and what production serves:

| Path | live md5 | repo `dist/` md5 | Result |
|------|----------|------------------|--------|
| `/` (`index.html`) | `4f8a455c093e6bf5479c450d2f898968` | `4f8a455c093e6bf5479c450d2f898968` | MATCH |
| `/sitemap.xml` | `d8fe542d4330104aac1e87347ae63cc8` | `d8fe542d4330104aac1e87347ae63cc8` | MATCH |
| `/robots.txt` | `efa6be053da41a968db77932fb5493f7` | `efa6be053da41a968db77932fb5493f7` | MATCH |
| `/og-image.png` | `56f5128b2713463a22ee440ef15b946a` | `56f5128b2713463a22ee440ef15b946a` | MATCH |
| `/rss.xml` | `7b8de7eac375aff5e8620878d3d409ec` | `9dd2c211053492ee69be8ec37596d839` | differs **only** in `<lastBuildDate>` |

`/rss.xml` diff, complete:

```
< <lastBuildDate>Sat, 03 Oct 2026 01:40:49 GMT</lastBuildDate>
---
> <lastBuildDate>Sat, 03 Oct 2026 01:10:55 GMT</lastBuildDate>
```

i.e. the local rebuild ran 30 minutes before the one Workers Builds produced; every other
byte is identical. **There is no deployment drift.**

Deployment settings, confirmed from the repository:

| Setting | Value | Source |
|---------|-------|--------|
| Production branch | `main` (local == `origin/main`) | `git status -sb`, `origin/main` = `965221c` |
| Deployed commit | `965221c773dc3437b56f2f3882ca0103a2643c4e` (2026-10-03 01:40:20 +0000) | byte match above |
| Build command | `npm run build` (`astro build`) | `package.json` |
| Output directory | `dist/` | `astro.config.mjs` `output: 'static'` |
| Base URL | `site: 'https://news.lesbass.com/'` | `astro.config.mjs` |
| Runtime | Worker `ai-newsroom`, `main: src/worker.js`, `assets.directory: ./dist`, `run_worker_first: true` | `wrangler.jsonc` |
| CI | Workers Builds GitHub check on push to `main`; no `.github/workflows/` | repo tree |

## 2. Live production checks — all pass, 00:39–00:50 UTC

| Check | Result |
|-------|--------|
| `http://news.lesbass.com/` | ✅ `301` → `https://news.lesbass.com/` (Worker edge, AIN-846) |
| `/robots.txt` | ✅ 200 `text/plain`, `Sitemap: https://news.lesbass.com/sitemap.xml` |
| `/sitemap.xml` | ✅ 200 `application/xml`; **152/152** `<loc>` = `https://news.lesbass.com/`, **0** foreign hosts; max `lastmod` `2026-10-03` (no future dates) |
| `/rss.xml` | ✅ 200 `application/rss+xml`; 66 items, every `<link>` canonical, max `pubDate` `Wed, 29 Jul 2026`, `lastBuildDate` `Sat, 03 Oct 2026`, `<language>en-US</language>` |
| RSS description length | ✅ 0 of 66 items over the 60-word preview budget |
| Sample article canonical/OG/JSON-LD | ✅ `/articles/alberta-claude-466m-lines-government-code-2026/`: `<html lang="en">`, canonical → `news.lesbass.com`, `og:image` raster `…/hero-desktop.png`, JSON-LD `url` → `news.lesbass.com`, `datePublished 2026-07-07` |
| Security headers (home + article) | ✅ `strict-transport-security: max-age=31536000; includeSubDomains; preload`, `x-content-type-options: nosniff`, `x-frame-options: DENY`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy` |
| Unknown path | ✅ real `404` (not a soft-200) |
| `/og-image.png` | ✅ 200 `image/png` (AIN-844 fix live) |
| `ai-newsroom.lesbass.workers.dev` | ✅ 200, canonical → `news.lesbass.com`; `http://` of it → `301` https |

Repo scripts run against **live** (`CHECK_URL=https://news.lesbass.com/`):

```
test:seo     ✅ All SEO checks passed
test:mobile  ✅ Mobile-readiness checks passed (viewport, images, code blocks, tables, container, touch targets, print)
test:dates   ✅ All article publication dates are valid and not in the future
test:links   ✅ All internal links look good
test:images  ✅ All image checks passed        (against dist/)
```

## 3. Legacy host `ai-newsroom.pages.dev` — unchanged (AIN-845)

Re-verified 00:39–00:41 UTC, byte-for-byte the state recorded on 2026-10-02:

- `/` → `HTTP/2 200`, `content-type: text/html; charset=utf-8`, `access-control-allow-origin: *`,
  **no** `x-robots-tag`, **no** `rel=canonical`, title `AI Newsroom - 編集長ダッシュボード`
- `/robots.txt` → `200` with `content-type: text/html` (soft-404 dashboard, not a robots file)

Still a **separate Cloudflare Pages project** (source absent from every `lesbass` repo), so it
is not remediable from this repository.

## 4. Access state — nothing executable

| Probe | Result |
|-------|--------|
| `POST /runtime-tools/connections/search` | `422 {"error":"Connection requests require a task-bound heartbeat run"}` |
| `GET /api/agents/me/secrets` | `[]` |
| `CLOUDFLARE_API_TOKEN` | absent from the environment |
| `~/.wrangler` | absent |
| `GET /api/companies/…/tools/connections` | `403 Board access required` |
| `GET /api/tool-gateway/tools` | `401 {"error":"Tool gateway session token is required"}` |

The two human-only cards on **AIN-845** are still `pending` and were **not** re-requested:

- Connect Cloudflare — `d02da802-ab64-4290-acc5-8aeea9e5082a` (2026-10-02T00:36Z, `wake_assignee`)
- Remediation choice for `ai-newsroom.pages.dev` — `3b4394aa-784d-43a3-b958-08ab4c3a2246`
  (2026-10-02T00:39Z, `wake_assignee`)

## 5. Finding — zone apex `http://lesbass.com/` still answers 200

Folded into the **same** Cloudflare access window as AIN-845; no separate ticket.

| Request | Result |
|---------|--------|
| `http://lesbass.com/` | **`200`**, no `Location` — zone-level *Always Use HTTPS* is off for the apex |
| `https://lesbass.com/` | `200`, `rel=canonical` → `https://lesbass.com/` |
| `http://www.lesbass.com/` | `301` → `https://lesbass.com/` |
| `https://www.lesbass.com/` | `301` → `https://lesbass.com/` |

The apex serves a different (personal) site, not the news app, and its own canonical already
points at `https://`, so the duplicate-content risk is low. The residual gap is that the apex
is reachable in plain HTTP with no HSTS of its own — AIN-846's Worker-edge fix only covers
`news.lesbass.com` and `*.workers.dev`, because zone settings were unreachable
(see [2026-10-03-http-to-https-worker-edge.md](./2026-10-03-http-to-https-worker-edge.md)).

**Fix:** one zone *Redirect Rule* — `http://lesbass.com/*` → `https://lesbass.com/:splat` (301) —
or enable *Always Use HTTPS* for the zone. Same credential as AIN-845, no repository change,
no content change. Will be done in the same pass once the connection card lands.

## 6. Control-plane note

Issue-comment writes from this run were rejected with
`cross_issue_influence_run_context_required` (HTTP 403, two consecutive attempts): a
`heartbeat_timer` run carries no `contextSnapshot.issueId`, and
`observeCrossIssueInfluence()` refuses a run that cannot name its source issue. The sanctioned
fix is an issue-bound run (`POST /api/agents/:id/wakeup` with `payload.issueId`), which would
spawn a second concurrent run — deliberately avoided here, since stale-run escalations are the
recurring failure mode this instance keeps having to cancel.

Per the execution contract the write was not retried past two attempts; this file is the
durable record instead, and the runtime status channel carries the run's disposition.

**Disposition:** AIN-845 stays `in_review` — two pending human-only interactions with
`wake_assignee` are a real continuation path. Unblock owner: the responsible board user
(`KrG7jrdSjANfsanpgzdjx6KyZqnaVudo`); action: complete the *Connect Cloudflare* card, then pick
a remediation option.
