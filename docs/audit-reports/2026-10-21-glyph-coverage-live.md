# Glyph coverage — live production verification (2026-10-21)

**Agent:** SiteEngineer · **Canonical production:** `https://news.lesbass.com/`
**Scope:** close the AIN-976 production-verification blocker after the AIN-969 Workers Builds fix, and prove the new symbol coverage on the live site.

## Outcome

AIN-976 is live. Production serves the regenerated symbol font, the widened `unicode-range`, and the preload tag. `npm run audit:daily` against production passes **13/13**, including **Glyphs** and **DeployFreshness**. Real Chromium at 320/375/1280 px renders `★ ≈ ≤ ≥ ⚠ U+2011` from the bundled custom face.

## Live deployment evidence

Checked 2026-10-21 07:18–07:20 UTC with `Cache-Control: no-cache`.

| Signal | Result |
|---|---|
| RSS `<lastBuildDate>` | `Wed, 21 Oct 2026 07:17:34 GMT` |
| `/fonts/ai-newsroom-symbols.woff` | `200`, `39,172` bytes |
| Font SHA-256 | `b64bc756b3ba59a895944eadb6f4fd517f7c456d8f1fc736cd81b70959d5c510` (identical to the committed subset) |
| Homepage symbol preload | present: `<link rel="preload" as="font" type="font/woff" href="/fonts/ai-newsroom-symbols.woff" crossorigin>` |
| Live `unicode-range` | `U+0100-017F, U+0391-03C9, U+2000-206F, U+2070-209F, U+2190-21FF, U+2200-22FF, U+25A0-25FF, U+2605-2606, U+26A0-26A1, U+2794, U+27A1, U+2B05-2B07` |
| Sitemap | `200`, `application/xml`; all sampled `<loc>` hosts are `https://news.lesbass.com` |

## Automated audit

`CHECK_URL=https://news.lesbass.com npm run audit:daily` at 2026-10-21 07:19:25 UTC:

| Build | TypeCheck | Lint | Links | Mobile | SEO | SitemapLastmod | Images | Dates | Contrast | Targets | Glyphs | DeployFreshness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

`Glyphs` reported:

```text
✅ Glyph coverage: 593 pages, 8650 non-ASCII characters, all rendered by bundled fonts or intentional OS fallback
   Symbol font: 806 glyphs in 39172 bytes (38.3 KiB), 12 unicode-range segments
```

`DeployFreshness` reported production within the grace window of the newest `main` commit, so the AIN-969 stall is resolved.

## Real-browser evidence

Captured against `https://news.lesbass.com` with `scripts/capture-glyph-evidence.mjs` and the repo's Playwright Chromium helper. At 375 px, `CSS.getPlatformFontsForNode` reported the custom `DejaVu Sans` face for every target glyph; no target glyph fell back to a system font:

| Glyph | Platform font |
|---|---|
| `★` U+2605 | `DejaVu Sans (custom):1` |
| `≈` U+2248 | `DejaVu Sans (custom):1` |
| `≤` U+2264 | `DejaVu Sans (custom):1` |
| `≥` U+2265 | `DejaVu Sans (custom):1` |
| `⚠` U+26A0 | `DejaVu Sans (custom):1` |
| `‑` U+2011 | `DejaVu Sans (custom):1` |

| Shot | Viewport | Evidence |
|---|---|---|
| [`glyph-home-320.png`](2026-10-21/glyph-home-320.png) | 320×720, DSF 2 | live homepage, nav on one row, no horizontal overflow |
| [`glyph-home-375.png`](2026-10-21/glyph-home-375.png) | 375×812, DSF 2 | live homepage |
| [`glyph-home-1280.png`](2026-10-21/glyph-home-1280.png) | 1280×800, DSF 1 | live homepage |
| [`glyph-article-320.png`](2026-10-21/glyph-article-320.png) | 320×720, DSF 2 | live Meta Muse Glimmer article header |
| [`glyph-article-375.png`](2026-10-21/glyph-article-375.png) | 375×812, DSF 2 | live Meta Muse Glimmer article header |
| [`glyph-article-1280.png`](2026-10-21/glyph-article-1280.png) | 1280×800, DSF 1 | live Meta Muse Glimmer article header |
| [`glyph-proof-320.png`](2026-10-21/glyph-proof-320.png) | 320×720, DSF 2 | capture-time proof: `★ ≈ ≤ ≥ ⚠ ‑` |
| [`glyph-proof-375.png`](2026-10-21/glyph-proof-375.png) | 375×812, DSF 2 | capture-time proof: `★ ≈ ≤ ≥ ⚠ ‑` |
| [`glyph-proof-1280.png`](2026-10-21/glyph-proof-1280.png) | 1280×800, DSF 1 | capture-time proof: `★ ≈ ≤ ≥ ⚠ ‑` |
| [`glyph-closeup-star-375.png`](2026-10-21/glyph-closeup-star-375.png) | 375×812, DSF 2 | live article text: `911★` |
| [`glyph-closeup-warning-375.png`](2026-10-21/glyph-closeup-warning-375.png) | 375×812, DSF 2 | live article text: `0.95 ⚠` |
| [`glyph-closeup-approx-375.png`](2026-10-21/glyph-closeup-approx-375.png) | 375×812, DSF 2 | live article text: `≈1.9×` |
| [`glyph-closeup-table-375.png`](2026-10-21/glyph-closeup-table-375.png) | 375×812, DSF 2 | live article text: `≤8B` |

The proof paragraph is injected into the live article DOM for the capture only; it is not in the published article. The close-up cards quote real live article text and label the source path and code point. Raw measurements are in [`glyph-evidence.json`](2026-10-21/glyph-evidence.json).

### Visual judgment

- All six target glyphs render as real marks at 320, 375, and 1280 px; no empty boxes, clipped glyphs, or overlapping text.
- The 320 px nav remains on one row, and the captured pages do not overflow horizontally.
- Headline, dek, tags, hero, and article prose keep the existing hierarchy and mobile density; the symbol face changes only the glyphs outside the Latin subsets.
- No article content or metadata was changed for this verification.

## Relationship to the local audit

The implementation and local evidence are recorded in [`2026-10-20-glyph-coverage.md`](2026-10-20-glyph-coverage.md). This report supersedes its production-status caveat: the AIN-969 Workers Builds blocker is resolved and the change is now live.
