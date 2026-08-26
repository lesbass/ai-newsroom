# AIN-645 — Publish Record

**Date:** 2026-08-26
**Publisher:** Publisher agent
**Branch:** `main`

## Articles Published

| Issue | Article | Slug | pubDate | Status |
|---|---|---|---|---|
| AIN-640 (task) / AIN-639 (candidate) | walgit turns an S3 bucket into a stateless Git server — the open-source implementation of Cursor's "Continuity" design | `walgit-cursor-continuity` | 2026-08-26 | ✅ Published |
| AIN-634 (task) / AIN-633 (candidate) | OpenAI's Jalapeño chip posts first measured numbers — 1.5–1.9× more AI work per watt and 1.7–3.6× lower end-to-end latency | `openai-jalapeno-first-results-inference-benchmarks-aug-2026` | 2026-08-26 | ✅ Published |

## Quality Gate

- walgit verdict: **PUBLISH_READY** per [AIN-641](/AIN/issues/AIN-641), verdict doc `docs/issues/AIN-641-quality-gate-verdict-2026-08-26.md`
- Jalapeño first-results verdict: **PUBLISH_READY** per [AIN-637](/AIN/issues/AIN-637), verdict doc `docs/issues/AIN-637-quality-gate-verdict-2026-08-26.md`
- Verdict commit `1258cd0` on `main` declared both articles PUBLISH_READY; article files + images remained untracked for the Publisher run.

## Build Verification

| Check | Result |
|---|---|
| `npm run check` (astro check) | 0 errors ✅ |
| `npm run build` | 754 pages built ✅ |
| Canonical in built pages | `https://news.lesbass.com/articles/walgit-cursor-continuity/` and `https://news.lesbass.com/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026/` ✅ |
| og:url in built pages | Both point to canonical `news.lesbass.com` URLs ✅ |
| RSS built output | Both articles present, first entries ✅ |
| Sitemap built output | Both articles present with image:image ✅ |
| `test:seo` | ✅ |
| `test:dates` | ✅ (no future dates) |
| `test:mobile` | ✅ |
| `test:links` | ✅ for these articles (6 pre-existing broken `/AIN/issues/*` links on `mozilla-thunderbolt` and `openai-astra` pages, unrelated) |
| `test:images` | ✅ for these articles (2 pre-existing broken images on `mozilla-thunderbolt` and `openai-astra` pages, unrelated) |
| Description/dek length | walgit 150 chars, Jalapeño 159 chars (120–180 target) ✅ |
| pubDate | 2026-08-26 (today, Europe/Rome) — not future-dated ✅ |

## Files Committed

- `src/content/articles/walgit-cursor-continuity.md`
- `public/images/articles/walgit-cursor-continuity/hero.svg`
- `src/content/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026.md`
- `public/images/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026/hero-desktop.jpg`
- `docs/publishing/publish-record-AIN-645-2026-08-26.md`

## Deployment Status

- **Commit pushed to main:** Yes
- **Cloudflare Pages deployment:** Pending auto-deploy from main branch; live verification to follow.
- **Expected live URLs:** `https://news.lesbass.com/articles/walgit-cursor-continuity/` and `https://news.lesbass.com/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026/`

## Notes

- Only the two approved article files, their images, and the publish record were committed; unrelated untracked workspace files were left untouched.
- Pre-existing `test:links` / `test:images` failures are on other, already-published pages (`mozilla-thunderbolt`, `openai-astra`) and are not caused by this publication; flagging for a follow-up cleanup if not already tracked.