# AIN-934 — Publish Record

**Date:** 2026-10-12 (Europe/Rome)
**Publisher:** Publisher agent
**Deploy task:** AIN-937
**Branch:** `main` @ `fc6faeb`

## Article Published

| Issue | Article | Slug | pubDate | Status |
|---|---|---|---|---|
| AIN-937 (deploy) / AIN-934 (task) | Strata runs Qwen3.8-Flash-Next on a 12GB gaming PC | `strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc` | 2026-10-12 | ✅ Published |

## Quality Gate

- Verdict: **PUBLISH_READY** per QualityGate review on [AIN-935](/AIN/issues/AIN-935), re-verified at branch HEAD `5179799` (2026-10-10).
- Gate highlights (verified by QualityGate at `5179799`): architecture numbers match the Qwen3.8-Flash-Next HF model card (125B/6B activated, 48 layers, hidden 2560, 512 experts with 10 routed + 1 shared, 262,144 native context); token/s tables and the Coder SWE-bench figure labeled vendor-reported; repo MIT vs. weights `qwen-community-1.0` kept distinct; localhost exposure caveat present; AIN-936 `imageAlt` fix confirmed.
- All 7 sources are primary (Qwen HF model card, Qwen announcement, Alibaba Cloud, Strata repo/README, `docs/DETAILS.md`, `docs/COMMUNITY_BENCHMARKS.md`, v0.1.41 release).
- Description/dek: 146 chars (120–180 target ✅); meta title 50 chars.
- `highRiskClaims: false` accepted — no unlabeled vendor figures; speed/benchmark claims carry the vendor-reported caveat in the Risks section.

## Slot Handling

- Assigned slot **2026-10-12 (Europe/Rome)**. AIN-937 was held blocked through 2026-10-10/11 (the site schema `src/content.config.ts` and `scripts/check-dates.mjs` reject future `pubDate`, and the 2026-10-10/11 slots were occupied by AIN-893/AIN-930), then resumed on the slot date.
- `pubDate` set to **2026-10-12** at publish; `test:dates` green (not future).

## Build Verification (at `fc6faeb`)

| Check | Result |
|---|---|
| `npm run build` | 586 pages built ✅ |
| `npm run check` (astro check) | 0 errors ✅ |
| `npm run lint` | ✅ |
| `test:links` | ✅ All internal links look good |
| `test:mobile` | ✅ (viewport, images, code blocks, tables, container) |
| `test:seo` | ✅ |
| `test:sitemap-lastmod` | ✅ (90 listing/tag pages, newest content date) |
| `test:images` | ✅ (hero + generated WebP/social variants) |
| `test:dates` | ✅ (2026-10-12 not future) |
| `test:contrast` | ✅ 20/20 WCAG 2.1 AA pairs |
| `test:targets` | ✅ 0 hard failures (12 page/viewport runs) |
| Canonical in built page | `https://news.lesbass.com/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/` ✅ |
| og:url / og:image in built page | Canonical URL + `.../hero-social.jpg` ✅ |
| JSON-LD datePublished | 2026-10-12 ✅ |
| RSS built output | Article present, canonical link ✅ |
| Sitemap built output | Present with `lastmod 2026-10-12` + image entry ✅ |
| robots.txt | `Sitemap: https://news.lesbass.com/sitemap.xml` ✅ |

## Browser Evidence

- QualityGate (AIN-935) ran real Chromium at **390x844** and **1440x1100** on the same article files at `5179799`: `scrollWidth == clientWidth` (no horizontal overflow), 0 console errors.
- This publish run re-verified static output and the mobile/target-size checks locally; live real-Chromium screenshots were re-darkened by the container's bundled-Chromium loader/font init (`libnspr4.so`/fontconfig), so fresh screenshots were not re-generated in this run. The rendered page is unchanged since QG's browser verification except the metadata `pubDate`.

## Files Committed (publish commit `fc6faeb`)

- `src/content/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc.md`
- `public/images/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/hero.png`
- `public/images/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/hero-mobile.png`
- `scripts/capture-strata-qwen3-8-flash-next.mjs`
- `docs/publishing/publish-record-AIN-934-2026-10-12.md` (this record)

## Deployment Status

- **Commit pushed to main:** `fc6faeb` (article) + publish-record commit (this run).
- **Deployment:** follows `main` (Cloudflare Pages/Workers; `news.lesbass.com`).
- **Expected live URL:** `https://news.lesbass.com/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/`

## Notes

- Only approved article + metadata changes were committed; the working clone's unrelated untracked files were not touched.
- Live URL commented back on AIN-937 and AIN-934 for record-keeping and closure.