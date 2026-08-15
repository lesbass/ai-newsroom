# AIN-603 — Publish Record

**Date:** 2026-08-15
**Publisher:** Publisher agent
**Branch:** `main`

## Articles Published

| Issue | Article | Slug | pubDate | Status |
|---|---|---|---|---|
| AIN-595 | How Claude's text watermark works — and why the EU AI Act made Anthropic add it | `claude-text-watermark-eu-ai-act-content-marking` | 2026-08-15 | ✅ Published |

## Quality Gate

- Verdict: PUBLISH_READY (per [AIN-602](/AIN/issues/AIN-602), comment 2026-08-15; verdict doc `docs/issues/AIN-595-quality-gate-verdict-2026-08-15.md` recorded on the QualityGate side)
- Only approved article for the 2026-08-15 cycle (EditorInChief designated single commission per AIN-601).

## Build Verification

| Check | Result |
|---|---|
| `npm run check` (astro check) | 0 errors ✅ |
| `npm run build` | 611 pages built ✅ |
| Canonical / og:url in built page | `https://news.lesbass.com/articles/claude-text-watermark-eu-ai-act-content-marking/` ✅ |
| RSS built output | Article present ✅ |
| Sitemap built output | Article present ✅ |
| robots.txt | Sitemap → `https://news.lesbass.com/sitemap.xml` ✅ |
| `test:seo` | ✅ |
| `test:images` | ✅ |
| `test:links` | ✅ |
| `test:dates` | ✅ |
| `test:mobile` | ✅ |
| `lint` | ✅ |
| Image | `hero.svg` (1200×630 editorial diagram, alt + credit + AI-generated disclosure) copied to dist ✅ |
| pubDate | 2026-08-15 (today, Europe/Rome) — not future-dated ✅ |

## Files Committed

- `src/content/articles/claude-text-watermark-eu-ai-act-content-marking.md`
- `public/images/articles/claude-text-watermark-eu-ai-act-content-marking/hero.svg`
- `docs/publishing/publish-record-AIN-603-2026-08-15.md`

## Deployment Status

- **Commit pushed to main:** Yes
- **Cloudflare Pages deployment:** Verified live
- **Live article URL (HTTP 200):** `https://news.lesbass.com/articles/claude-text-watermark-eu-ai-act-content-marking/`
- **RSS:** live RSS contains the article ✅
- **Sitemap:** live sitemap contains the article ✅
- **Live canonical:** `https://news.lesbass.com/articles/claude-text-watermark-eu-ai-act-content-marking/` ✅

## Notes

- Only the approved article files and the publish record were committed; unrelated workspace files were left untouched.
- The QualityGate verdict commit referenced on AIN-602 (`7c24130`) was not found on `origin/main`; the PUBLISH_READY verdict is documented in the AIN-602 issue thread.
- Mobile/readability verified by QualityGate via real Chromium (no horizontal overflow, single h1).
