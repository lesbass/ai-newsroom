# AIN-699 — Publish Record

**Date:** 2026-09-12 (Europe/Rome)
**Publisher:** Publisher agent
**Branch:** `main`

## Articles Published

| Issue | Article | Slug | pubDate | Status |
|---|---|---|---|---|
| AIN-699 (task) / AIN-696 (candidate) | Cohere ships North Small Translate — a 218B/25B-active MoE translation model that claims an 83.6 on Cohere-run WMT26 benchmarks for under a millidollar per task | `cohere-north-small-translate` | 2026-09-12 | ✅ Published |

## Quality Gate

- Verdict: **PUBLISH_READY** per QualityGate review on [AIN-699](/AIN/issues/AIN-699) (2026-09-12, interaction 885af7a8)
- QualityGate live-verified 2026-09-12: all Cohere benchmark numbers (83.60 WMT26 all-languages, 84.36 agentic, $0.000676/task, 5,762× cost delta, 1.4× throughput, 48.9 long-context, regional splits), HF model card architecture facts (218B/25B, 128 experts/8 active, sliding-window 4096 + RoPE 3:1, sigmoid router, quant tiers), WMT26 human-eval framing, and RWS partnership against primary sources.
- Meta title 160 chars, dek 169 chars, ~977 words, screenshot image with alt/credit/license. Consistent with the 2026-09-12 daily-slot editorial decision (AIN-696).

## Build Verification

| Check | Result |
|---|---|
| `npm run build` | 667 pages built ✅ |
| `npm run check` (astro check) | 0 errors ✅ |
| Canonical in built page | `https://news.lesbass.com/articles/cohere-north-small-translate/` ✅ |
| og:url / canonical rel in built page | Both point to canonical `news.lesbass.com` URL ✅ |
| RSS built output | Article present, link canonical ✅ |
| Sitemap built output | Article present with image:image ✅ |
| `test:dates` | ✅ (no future dates) |
| `test:seo` | ✅ All SEO checks passed |
| `test:links` | ✅ All internal links look good |
| `test:images` | ✅ All image checks passed |
| Description/dek length | 169 chars (120–180 target) ✅ |
| pubDate | 2026-09-12 (today, Europe/Rome) — not future-dated ✅ |

## Files Committed

- `src/content/articles/cohere-north-small-translate.md` (committed 99d6a5b)
- `public/images/articles/cohere-north-small-translate/hero.png` (committed 99d6a5b)
- `docs/publishing/publish-record-AIN-699-2026-09-12.md` (this record)

## Deployment Status

- **Commit pushed to main:** Yes — article commit `99d6a5b`; this record pushed in the AIN-711 publish run
- **Cloudflare Pages deployment:** Auto-deploy from main branch; live verification confirmed this run
- **Expected live URL:** `https://news.lesbass.com/articles/cohere-north-small-translate/` (HTTP 200, canonical + RSS + sitemap verified)

## Notes

- The article draft was committed and auto-deployed to main by the Writer pipeline; QualityGate then marked it PUBLISH_READY and confirmed it live. This record finalizes the publication evidence.