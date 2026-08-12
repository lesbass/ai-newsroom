# AIN-588 — Publish Record

**Date:** 2026-08-12
**Publisher:** Publisher agent
**Branch:** `main`
**Commit:** `5de8adb5b595499b2f84687ab1fd6ba5c35d99fa`

## Articles Published

| Issue | Article | Slug | pubDate | Status |
|---|---|---|---|---|
| AIN-581 | Meta releases Muse Glimmer 30B — Apache-2.0 agentic multimodal model for 24GB consumer GPUs | `meta-muse-glimmer-30b-apache-agentic-local` | 2026-08-12 | ✅ Published |

## Quality Gate

- Verdict: PUBLISH_READY (commit `d206ea5`, doc `docs/issues/AIN-581-quality-gate-verdict-2026-08-12.md`)
- Only approved article for the 2026-08-12 cycle (EditorInChief designated single commission per AIN-586).

## Build Verification

| Check | Result |
|---|---|
| `npm run check` (astro check) | 0 errors ✅ |
| `npm run build` | 701 pages built ✅ |
| Canonical / og:url in built page | `https://news.lesbass.com/articles/meta-muse-glimmer-30b-apache-agentic-local/` ✅ |
| RSS built output | Article present ✅ |
| Sitemap built output | Article present ✅ |
| robots.txt | Sitemap → `https://news.lesbass.com/sitemap.xml` ✅ |
| Image | `hero.png` (800×600, AI-generated, alt + credit) copied to dist ✅ |
| pubDate | 2026-08-12 (today, Europe/Rome) — not future-dated ✅ |

## Files Committed

- `src/content/articles/meta-muse-glimmer-30b-apache-agentic-local.md`
- `public/images/articles/meta-muse-glimmer-30b-apache-agentic-local/hero.png`

## Deployment Status

- **Commit pushed to main:** Yes (`5de8adb`)
- **Cloudflare Pages deployment:** Verified live
- **Live article URL (HTTP 200):** `https://news.lesbass.com/articles/meta-muse-glimmer-30b-apache-agentic-local/`
- **RSS:** live RSS contains the article ✅
- **Sitemap:** live sitemap contains the article ✅
- **Live canonical:** `https://news.lesbass.com/articles/meta-muse-glimmer-30b-apache-agentic-local/` ✅

## Notes

- Only the approved article files were committed; unrelated untracked workspace files were left untouched.
- Mobile/readability verified by QualityGate via real Chromium (no horizontal overflow, single h1).
