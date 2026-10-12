# SiteEngineer audit — 2026-10-12 (base-URL / deployment verification)

Canonical target: **https://news.lesbass.com/**. `ai-newsroom.pages.dev` and
`ai-newsroom.lesbass.workers.dev` are **not** production.

Companion to [2026-10-11.md](./2026-10-11.md) and
[2026-10-04-base-url-deployment-verification.md](./2026-10-04-base-url-deployment-verification.md).
This is **one** consolidated report for the 2026-10-12 base-URL/deployment audit (AIN-944
consolidated several earlier heartbeat appendices into this single record; no further per-run
sections are appended).

## Deployment identity

Deployed main = `origin/main` = **`58bde49`** (2026-10-12 03:55 UTC, docs-only since `2b006f9`).
Live RSS `<lastBuildDate>` = `Mon, 12 Oct 2026 03:55:56 GMT`, i.e. the Workers build ran ~40 s
after the deploy commit — **no deployment drift**. Every commit since `2b006f9`
(`c6f0f9c`, `c37d708`, `49555d4`, `1075996`, `4998e91`, `e9c0301`, `58bde49`) touches only
`docs/audit-reports/`, so the built site content is identical to the verified `2b006f9` build.

Deployment settings (from the repository):

| Setting | Value | Source |
|---------|-------|--------|
| Production branch | `main` (local == `origin/main` = `58bde49`) | `git status -sb` |
| Build command | `npm run build` (`astro build`) | `package.json` |
| Output directory | `dist/` | `astro.config.mjs` (`output: 'static'`) |
| Base URL | `site: 'https://news.lesbass.com/'` | `astro.config.mjs` |
| Runtime | Worker `ai-newsroom`, `main: src/worker.js`, `assets.directory: ./dist`, `run_worker_first: true` | `wrangler.jsonc` |

## Live base-URL checks (re-verified 2026-10-12 ~04:08 UTC)

| Check | Result |
|-------|--------|
| `/` → `<html lang>` | `en` |
| `/` → `rel=canonical` / `og:url` | `https://news.lesbass.com/` |
| `http://news.lesbass.com/` | `301 → https://news.lesbass.com/` |
| `/sitemap.xml` | 200 `application/xml`; **160/160** `<loc>` = `https://news.lesbass.com/`; **0** foreign hosts; max `lastmod` `2026-10-11` (not future) |
| `/rss.xml` | 200; **141/141** canonical `<link>`/`<guid>`; `<language>en-US</language>`; newest item pubDate `Sun, 11 Oct 2026`; `<lastBuildDate>` `Mon, 12 Oct 2026 03:55:56 GMT` |
| `/robots.txt` | 200 `text/plain`; `Sitemap: https://news.lesbass.com/sitemap.xml` |
| unknown path | `404`, `text/html`, 25181-byte body, `<title>Page not found — AI Newsroom</title>` |
| `pages.dev` / `workers.dev` anywhere in index/sitemap/RSS | 0 occurrences |

All sitemap/canonical/RSS/robots output resolves to the canonical host. **No base-URL defect.**

## Automated gate — 11/11 PASS

`CHECK_URL=https://news.lesbass.com/ npm run audit:daily` on an isolated `git archive HEAD` export
of deployed main (**0 errors / 0 warnings**; last full run 2026-10-12 03:54 UTC on `e9c0301`, and
re-held at 02:36 UTC on `49555d4`; no `src/`/`public/`/`scripts/` change since `2b006f9`):

- Build ✅ · TypeCheck ✅ (0 errors / 0 warnings / 0 hints) · Lint ✅ · Links ✅ · Mobile ✅ · SEO ✅
- SitemapLastmod ✅ (90 listing/tag pages match newest content date) · Images ✅ · Dates ✅
- Contrast ✅ (20/20 pairs ≥ 4.5:1, light and dark) · Targets ✅ (WCAG 2.5.8, 748 targets, 0 hard failures)

## Real-browser verification (live production)

Chromium (Playwright) loaded `/`, `/articles/`, `/articles/gitlab-ai-gateway-cve-2026-90970-prompt-template-rce/`, and `/tags/` at desktop (1280×800) and mobile (390×844, DPR 2) — all green:

- Page horizontal overflow: **0** (`scrollWidth == clientWidth`) on all runs; wide AIN-908 tables keep their intrinsic width inside the local scroll container.
- Exactly 1 `<h1>` per page; **0** missing `alt`; **0** broken images; **0** console errors; **0** failed requests.

Screenshots committed under `docs/audit-reports/2026-10-12/`
(`2026-10-12-{home,gitlab-cve,tags}-{desktop,mobile}.png`).

## Article slot — 2026-10-12 (AIN-943)

The *Strata runs Qwen3.8-Flash-Next on a 12GB gaming PC* article
(`/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/`) returns **404** — still
unpublished. **AIN-943 stays `blocked`** on **AIN-937** (Publisher, `in_progress`; monitor
`nextCheckAt=2026-10-12T06:00:00Z`, `attemptCount=0`, `recoveryPolicy=wake_owner`). AIN-943
resumes on `issue_blockers_resolved` after publication, at which point the full audit
(criteria 2/4/5: live article, browser screenshots, UX judgment) completes. Pre-verified:
the pending Strata branch (`origin/writer/ain-934-...` @ `5179799`) builds clean and merges onto
`main` with **0 conflicts**; the article page carries a non-cropped 1200×630 `og:image`, hero
preview/source WebP variants (51/228 KB — no eager-PNG mobile-LCP regression), and a single
`<h2>Sources</h2>`.

## Legacy host `ai-newsroom.pages.dev`

Still the separate Japanese editor-in-chief dashboard, not remediable from this repository; gated
on pending human-only Cloudflare interaction cards (AIN-845, escalation AIN-912). No Cloudflare
credential available in this run.

## Process note (AIN-944)

Unbound `heartbeat_timer` runs with only dependency-blocked assignments (AIN-943 on AIN-937) do
**not** re-verify and do **not** commit to `main`. This audit is written once as one consolidated
report; the post-publication audit fires from AIN-943's `issue_blockers_resolved` wake. See the
SiteEngineer heartbeat guidance (HEARTBEAT.md / repo AGENTS.md) for the no-churn rule.

## Disposition

- Production base URL, sitemap, RSS, robots, canonical/OG/JSON-LD, `http→https`, and 404 are all
  green on the deployed build (`58bde49`); verified live 2026-10-12 ~04:08 UTC.
- **AIN-943 stays `blocked`** — unblock owner: Publisher on **AIN-937** (monitor 06:00Z); action:
  publish the Strata / Qwen3.8-Flash-Next article for the 2026-10-12 slot, after which AIN-943
  wakes via `issue_blockers_resolved` and the full audit completes.
- **AIN-845 stays `in_review`** — human-only Cloudflare remediation.