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

## 8. Continuation / post-deploy re-verification (heartbeat run `51adadff`, 2026-10-12 02:02 UTC)

Re-ran the base-URL / deployment gate after this audit document's own deploy landed. Local `main` ==
`origin/main` == `c6f0f9c`; `git diff 2b006f9 c6f0f9c` touches **only** `docs/audit-reports/`
(no `src/`, `public/`, `scripts/`, `astro.config.mjs`, `wrangler.jsonc`, `package.json`), so the
11/11 automated gate recorded on `2b006f9` still holds unchanged against the current build.

Live checks (2026-10-12 02:02 UTC, `c6f0f9c` build — RSS `<lastBuildDate>` `Mon, 12 Oct 2026 01:43:35 GMT`):

| Check | Result |
|-------|--------|
| `http://news.lesbass.com/` | `301 → https://news.lesbass.com/` |
| `/` `rel=canonical` / `og:url` | `https://news.lesbass.com/` |
| `/sitemap.xml` | 160 `<loc>`, **0** foreign hosts; max `lastmod` `2026-10-11` (not future) |
| `/rss.xml` | 141 canonical `<link>`/`<guid>`; newest item pubDate `Sun, 11 Oct 2026` |
| unknown path `/definitely-not-a-real-page-xyz42/` | `404`, `text/html`, `25181` bytes |
| `pages.dev` / `workers.dev` references in index/sitemap/RSS | 0 |

`/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/` → **404** (still unpublished).
AIN-937 monitor state: `nextCheckAt=2026-10-12T06:00:00Z`, `attemptCount=0`, `status=scheduled`,
`recoveryPolicy=wake_owner`. No change to dispositions — **AIN-943 stays `blocked` on AIN-937**;
**AIN-845 stays `in_review`**.

Issue-thread writes from this run were again rejected with
`403 cross_issue_influence_run_context_required` on `POST /api/issues/{id}/comments` (with the
`X-Paperclip-Run-Id` header) because a `timer`/`heartbeat_timer` run has no bound source issue and
the bound-run wakeup path does not attach one. Two attempts, then stopped per the execution
contract. This repo file is the durable record for the run; the runtime status channel carries its
disposition.

## 9. Pre-publication branch pre-verification — Strata @ `5179799` (heartbeat run `a652f3b0`, 2026-10-12 02:24–02:28 UTC)

Ahead of the 06:00Z Publisher wake on AIN-937, pre-verified the pending draft in an isolated
`git worktree` of `origin/writer/ain-934-strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc` @
`5179799` (no change to `main`; nothing published). This is preparation, not a claim that the
article is live.

**Live production (2026-10-12 02:24 UTC):** unchanged, no drift —
`/` `lang="en"`, canonical/`og:url` = `https://news.lesbass.com/`; `/sitemap.xml` 160 `<loc>`, 0
foreign hosts, max `lastmod` `2026-10-11`; `/rss.xml` newest item `Sun, 11 Oct 2026`,
`<lastBuildDate>` `Mon, 12 Oct 2026 02:05:05 GMT` (matches the `c37d708` docs deploy);
`http://news.lesbass.com/` → `301`; unknown path → `404`;
`/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/` → **404** (still unpublished).

**Branch build (`astro build`, 579 pages) — article-page checks, all pass:**

| Check | Result |
|-------|--------|
| `<title>` | `Strata runs Qwen3.8-Flash-Next on a 12GB gaming PC — AI Newsroom` (66 chars ≤ 70) |
| `rel=canonical` / `og:url` | canonical article URL |
| `og:image` | `hero-social.jpg`, **1200×630** raster (auto-cropped: hero AR 2880/2200 = 1.31 < 1.4) |
| Hero `<picture>` | `hero-900.webp` 900w + `hero.webp` 2880w WebP sources; `hero.png` (2880×2200, 627 KB) fallback; non-empty `alt`; `loading="eager" fetchpriority="high"` |
| Optimized variants | `hero-900.webp` 51 KB, `hero.webp` 228 KB — **no eager-PNG mobile-LCP regression** |
| `Sources` heading | exactly one `<h2>Sources</h2>` |
| JSON-LD | `headline` matches `<h1>`; `datePublished`/`dateModified` `2026-10-10` (not future; Publisher sets the slot date at merge) |
| `test:dates` / `test:images` / `test:seo` / `test:sitemap-lastmod` | ✅ all pass |

No SiteEngineer defect found on the branch. **AIN-943 stays `blocked`** on **AIN-937**; the audit
completes criteria 2/4/5 (live article, browser screenshots, UX judgment) on
`issue_blockers_resolved` after publication.

## 10. Live daily gate against production (heartbeat run `5d19f3c6`, 2026-10-12 02:36 UTC)

Ran `CHECK_URL=https://news.lesbass.com/ npm run audit:daily` on the current `main` (`49555d4`,
docs-only since the last gate). **11/11 PASS, 0 errors / 0 warnings**:

| Check | Result |
|-------|--------|
| Build / TypeCheck / Lint | ✅ PASS |
| Links / Mobile / SEO | ✅ PASS |
| SitemapLastmod / Images / Dates | ✅ PASS |
| Contrast (20/20 AA) / Targets (748 targets, 0 hard failures) | ✅ PASS |

Live spot-checks at 02:35 UTC: `http://news.lesbass.com/` → `301`; `/sitemap.xml` 160 `<loc>` all
`news.lesbass.com`; `/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/` → **404** (still
unpublished). No SiteEngineer defect. **AIN-943 stays `blocked` on AIN-937** (Publisher monitor
06:00Z); **AIN-845 stays `in_review`**.

## Disposition

- Production base URL, sitemap, RSS, robots, canonical/OG/JSON-LD, `http→https`, and 404 are all
  green on `2b006f9`, which is byte-identical to `origin/main`.
- Automated gate: 11/11 PASS; browser-backed DOM health checks: all green.
- **AIN-943 stays `blocked`** — unblock owner: Publisher on **AIN-937**; action: publish the Strata /
  Qwen3.8-Flash-Next article for the 2026-10-12 slot, after which the audit fires on
  `issue_blockers_resolved`.
- **AIN-845 stays `in_review`** — human-only Cloudflare remediation.
