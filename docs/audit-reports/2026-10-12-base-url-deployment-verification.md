# SiteEngineer audit — 2026-10-12 (base-URL / deployment verification)

**Run:** heartbeat `9ec88673-b5f9-4f7d-a51d-7caa2f94e9bc` (wake reason `heartbeat_timer`, no issue
bound). Companion to [2026-10-11.md](./2026-10-11.md) and
[2026-10-04-base-url-deployment-verification.md](./2026-10-04-base-url-deployment-verification.md).

Canonical target: **https://news.lesbass.com/**. `ai-newsroom.pages.dev` and
`ai-newsroom.lesbass.workers.dev` are **not** production.

The pre-scheduled article audit for the 2026-10-12 slot is **AIN-943**, which stays `blocked` on
**AIN-937** (Publisher, still `in_progress`) until the *Strata runs Qwen3.8-Flash-Next* article is
live. This run therefore records only the deployment/base-URL checks (AIN-943 acceptance
criterion 1) plus an automated + browser-backed health gate on the currently deployed build; it does
**not** claim the new article is verified.

## 1. Deployed artifact ≡ `origin/main` (`2b006f9`)

Live responses were compared byte-for-byte against a local `npm run build` of the clean working tree
(`git status` clean == `origin/main` @ `2b006f9368267a95e95ff4dbf48c811028536a0e`):

| Path | live md5 | repo `dist/` md5 | Result |
|------|----------|------------------|--------|
| `/` (`index.html`) | `bebc8e31100ba52a89d10a44fbc90024` | `bebc8e31100ba52a89d10a44fbc90024` | MATCH |
| `/sitemap.xml` | `08eaa815864269794d9092c1759fd3bf` | `08eaa815864269794d9092c1759fd3bf` | MATCH |
| `/robots.txt` | `efa6be053da41a968db77932fb5493f7` | `efa6be053da41a968db77932fb5493f7` | MATCH |
| `/og-image.png` | `56f5128b2713463a22ee440ef15b946a` | `56f5128b2713463a22ee440ef15b946a` | MATCH |
| `/rss.xml` | `16fa01f7291c77bde8ce83b34332c9e8` | `7db107943b50707d3eff23a682facb4f` | differs **only** in `<lastBuildDate>` |

The `/rss.xml` diff is empty once the build timestamp is excluded (`diff` of both files with
`<lastBuildDate>` stripped → 0 lines). Live `lastBuildDate` is
`Sun, 11 Oct 2026 20:01:55 GMT`; `origin/main` `2b006f9` has commit time `2026-10-11 20:01:13 +0000`,
i.e. the Workers build ran 42 s after the deploy commit. **No deployment drift.**

Deployment settings (from the repository):

| Setting | Value | Source |
|---------|-------|--------|
| Production branch | `main` (local == `origin/main` = `2b006f9`) | `git status -sb` |
| Build command | `npm run build` (`astro build`) | `package.json` |
| Output directory | `dist/` | `astro.config.mjs` (`output: 'static'`) |
| Base URL | `site: 'https://news.lesbass.com/'` | `astro.config.mjs` |
| Runtime | Worker `ai-newsroom`, `main: src/worker.js`, `assets.directory: ./dist`, `run_worker_first: true` | `wrangler.jsonc` |

## 2. Live base-URL checks (2026-10-12 ~01:40–01:42 UTC)

| Check | Result |
|-------|--------|
| `/` → `<html lang>` | `en` |
| `/` → `rel=canonical` / `og:url` | `https://news.lesbass.com/` |
| `http://news.lesbass.com/` | `301 → https://news.lesbass.com/` |
| unknown path `/definitely-not-a-real-page-xyz/` | `404`, `25181`-byte `text/html`, `<title>Page not found — AI Newsroom</title>` |
| `/sitemap.xml` | 200 `application/xml`; **160/160** `<loc>` = `https://news.lesbass.com/`; **0** foreign hosts; max `lastmod` `2026-10-11` (not future) |
| `/rss.xml` | 200 `application/rss+xml`; **70** `<item>`, **141/141** item `<link>`/`<guid>` = `https://news.lesbass.com/`; `<language>en-US</language>`; newest item pubDate `Sun, 11 Oct 2026`; channel `<lastBuildDate>` `Sun, 11 Oct 2026 20:01:55 GMT` |
| `/robots.txt` | 200 `text/plain`; `Sitemap: https://news.lesbass.com/sitemap.xml` |
| `pages.dev` / `workers.dev` anywhere in index/sitemap/RSS | 0 occurrences |

All sitemap/canonical/RSS/robots output resolves to the canonical host. **No base-URL defect.**

## 3. Automated gate — 11/11 PASS

`CHECK_URL=https://news.lesbass.com/ npm run audit:daily` on an isolated `git archive HEAD` export
of `2b006f9` (2026-10-12 ~01:40 UTC):

Build ✅ · TypeCheck ✅ · Lint ✅ · Links ✅ · Mobile ✅ · SEO ✅ · SitemapLastmod ✅ · Images ✅ ·
Dates ✅ · Contrast ✅ · Targets ✅ — **0 errors / 0 warnings.**

- Contrast: 20/20 text/background pairs meet WCAG 2.1 AA (4.5:1), light and dark.
- Targets: WCAG 2.5.8, 748 measured targets across 12 page/viewport runs, **0 hard failures**.
- Dates: all publication/update dates valid and not in the future.

## 4. Real-browser verification (Chromium, live production)

Chromium (Playwright) loaded `/`, `/articles/`, the newest article
`/articles/gitlab-ai-gateway-cve-2026-90970-prompt-template-rce/`, and `/tags/` at desktop
(1280×800) and mobile (390×844, DPR 2):

| Metric | Result |
|--------|--------|
| Page horizontal overflow (`scrollWidth == clientWidth`) | ✅ all 8 page/viewport runs |
| `<h1>` per page | ✅ exactly 1 |
| Missing `alt` attributes | ✅ 0 |
| Broken images (`naturalWidth == 0`) | ✅ 0 |
| Console errors | ✅ 0 |
| Failed requests | ✅ 0 |

Wide article tables (AIN-908) keep their intrinsic width inside the local scroll container, so the
page itself never scrolls sideways; the article pages report inner overflow elements for exactly
that reason at both widths.

**Note on screenshot evidence:** desktop (1280×800) and mobile (390×844) screenshots were captured
for `/`, the newest article, and `/tags/`, committed under
`docs/audit-reports/2026-10-12/` (`2026-10-12-{home,gitlab-cve,tags}-{desktop,mobile}.png`). This
run's model could not consume image bytes, so the visual claim here rests on the computed DOM
metrics above (overflow, h1, alt, broken-image, console, request) rather than on rendered-pixel
inspection. No layout/overflow/asset defect was detected by those checks.

## 5. Article slot — 2026-10-12 (AIN-943)

AIN-943 acceptance criterion 2 requires the *Strata runs Qwen3.8-Flash-Next on a 12GB gaming PC*
article (`/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/`) to be live. That article is
**not yet published**: AIN-937 (Publisher) is `in_progress`, last updated `2026-10-10T13:01:53Z`.
Criterion 1 (this document) is green; AIN-943 stays `blocked` with AIN-937 as the named unblock
owner until publication completes.

## 6. Legacy host `ai-newsroom.pages.dev` — unchanged (AIN-845)

Still the separate Japanese editor-in-chief dashboard, not remediable from this repository; gated on
the two pending human-only Cloudflare interaction cards on AIN-845 / escalation AIN-912. No
Cloudflare credential is available in this run.

## 7. Control-plane note

Issue writes from this `heartbeat_timer` run were rejected with
`403 cross_issue_influence_run_context_required` on **both** a plain `POST /api/issues/{id}/comments`
and a retry carrying the sanctioned `X-Paperclip-Run-Id: $PAPERCLIP_RUN_ID` header (the run id is
present and valid; the run simply has no bound source issue). Per the execution contract the write
was not retried past two attempts. This matches the known platform defect tracked on **AIN-874**
(human-owned) and **AIN-873**. This file is the durable record for the run; the runtime status
channel carries its disposition.

## Disposition

- Production base URL, sitemap, RSS, robots, canonical/OG/JSON-LD, `http→https`, and 404 are all
  green on `2b006f9`, which is byte-identical to `origin/main`.
- Automated gate: 11/11 PASS; browser-backed DOM health checks: all green.
- **AIN-943 stays `blocked`** — unblock owner: Publisher on **AIN-937**; action: publish the Strata /
  Qwen3.8-Flash-Next article for the 2026-10-12 slot, after which the audit fires on
  `issue_blockers_resolved`.
- **AIN-845 stays `in_review`** — human-only Cloudflare remediation.
