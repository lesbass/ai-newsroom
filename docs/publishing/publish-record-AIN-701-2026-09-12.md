# AIN-701 — Publish Record

**Date:** 2026-09-12 (Europe/Rome)
**Publisher:** Publisher agent
**Branch:** `main`

## Articles Published

| Issue | Article | Slug | pubDate | Status |
|---|---|---|---|---|
| AIN-701 (task) / AIN-697 (candidate) | OpenAI launches the Agents API — the managed Codex harness for cloud agents | `openai-agents-api-codex-harness` | 2026-09-12 | ✅ Published |

## Quality Gate

- Verdict: **PUBLISH_READY** per QualityGate review on [AIN-701](/AIN/issues/AIN-701) (2026-09-12)
- QualityGate live-verified 2026-09-12: OpenAI "Introducing the Agents API" (public beta, managed Codex harness, no additional API fee, sandbox partners), pricing page (gpt-6-astra $10/$50 per 1M; container/session, web search, file search rates; EU data residency fast-mode note), and openai/codex repo stats (123,546 stars / 19,023 forks / 10,668 commits). All match primary sources.
- `highRiskClaims: false` acceptable — product/API announcement with verified pricing and repo stats; caveats listed.
- Meta title 75 chars, dek 164 chars, ~697 words, generated editorial image with AI disclosure.

## Build Verification

| Check | Result |
|---|---|
| `npm run build` | 667 pages built ✅ |
| `npm run check` (astro check) | 0 errors ✅ |
| Canonical in built page | `https://news.lesbass.com/articles/openai-agents-api-codex-harness/` ✅ |
| og:url / canonical rel in built page | Both point to canonical `news.lesbass.com` URL ✅ |
| RSS built output | Article present, link canonical ✅ |
| Sitemap built output | Article present with image:image ✅ |
| `test:dates` | ✅ (no future dates) |
| `test:seo` | ✅ All SEO checks passed |
| `test:links` | ✅ All internal links look good |
| `test:images` | ✅ All image checks passed |
| Description/dek length | 164 chars (120–180 target) ✅ |
| pubDate | 2026-09-12 (today, Europe/Rome) — not future-dated ✅ |

## Files Committed

- `src/content/articles/openai-agents-api-codex-harness.md` (committed 188fdff)
- `public/images/articles/openai-agents-api-codex-harness/hero.png` (committed 188fdff)
- `docs/publishing/publish-record-AIN-701-2026-09-12.md` (this record)

## Deployment Status

- **Commit pushed to main:** Yes — article commit `188fdff`; this record pushed in the AIN-711 publish run
- **Cloudflare Pages deployment:** Auto-deploy from main branch; live verification confirmed this run
- **Expected live URL:** `https://news.lesbass.com/articles/openai-agents-api-codex-harness/` (HTTP 200, canonical + RSS + sitemap verified)

## Notes

- The article draft was committed and auto-deployed to main by the Writer pipeline; QualityGate then marked it PUBLISH_READY and confirmed it live. This record finalizes the publication evidence.