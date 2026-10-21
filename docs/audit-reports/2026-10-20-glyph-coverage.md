# Glyph coverage audit — 2026-10-20 (AIN-976)

**Agent:** SiteEngineer · **Canonical production:** `https://news.lesbass.com/`
**Scope:** cover the math/symbol glyphs that still depended on OS fallback after AIN-969, and add an automated glyph-coverage gate to `npm run audit:daily`.

> **Live follow-up:** production was verified on 2026-10-21 after the AIN-969 deploy fix. See [`2026-10-21-glyph-coverage-live.md`](2026-10-21-glyph-coverage-live.md) for the live font hash, 13/13 audit, and production screenshots.

## Outcome

The bundled symbol font now covers the non-ASCII characters used in article prose and metadata, including `U+2011` non-breaking hyphen, `≈ ≤ ≥ ≠ π −`, `★`, `⚠`, `⁵`, `₀`, and `ő`. A new `test:glyphs` check fails the daily audit if any built page uses a non-ASCII code point that neither the bundled fonts nor a documented OS fallback can render.

## Font subset

`public/fonts/ai-newsroom-symbols.woff` was regenerated from **DejaVu Sans 2.35** (the same family and license as the AIN-969 arrow subset) with `--no-hinting`:

| Signal | Value |
|---|---|
| File size | 39,172 bytes (38.3 KiB / 39.2 kB) — under the 40 KiB budget |
| Mapped code points | 806 |
| Format / display | WOFF, `font-display: optional`, preloaded |
| Ranges | `U+0100-017F`, `U+0391-03C9`, `U+2000-206F`, `U+2070-209F`, `U+2190-21FF`, `U+2200-22FF`, `U+25A0-25FF`, `U+2605-2606`, `U+26A0-26A1`, `U+2794`, `U+27A1`, `U+2B05-2B07` |

The `unicode-range` in `src/layouts/BaseLayout.astro` matches the subset and keeps the face in the heading, body, and mono stacks.

### Coverage decisions

- The suggested full `U+2600-26FF` and `U+1E00-1EFF` ranges produce a 73–74 KiB WOFF with `--no-hinting`, which breaks the 40 KiB budget. This build keeps the used symbol clusters (`U+2605-2606`, `U+26A0-26A1`) and omits Latin Extended Additional, which has no current uses.
- Greek is limited to letters and symbols in `U+0391-03C9`; that covers `π` and ordinary math Greek without archaic blocks.
- `⛏` (`U+26CF`) is absent from DejaVu Sans 2.35. It appears once inside a literal Claude Code statusline code sample, so it is allowlisted as an intentionally OS-rendered emoji rather than widening the subset for one decorative code-block glyph.

Regeneration command:

```bash
python3 -m fontTools.subset /path/to/DejaVuSans.ttf \
  --unicodes='U+0100-017F,U+0391-03C9,U+2000-206F,U+2070-209F,U+2190-21FF,U+2200-22FF,U+25A0-25FF,U+2605-2606,U+26A0-26A1,U+2794,U+27A1,U+2B05-2B07' \
  --flavor=woff --no-hinting \
  --output-file=public/fonts/ai-newsroom-symbols.woff
```

## Audit gate

`scripts/check-glyphs.mjs` (also `npm run test:glyphs`) runs against the built `dist/`:

- Extracts visible text plus `alt`, `title`, and `aria-label` values from every built HTML page, and decodes numeric/named entities.
- Reads the symbol WOFF cmap directly (format 12/4) instead of trusting the CSS: a glyph counts only when the font contains it **and** the `@font-face` `unicode-range` claims it.
- Applies the Latin-subset ranges, which cover Basic Latin/Latin-1 plus the punctuation, euro, and trade-mark glyphs shipped in the four Latin WOFF2 files.
- Allows CJK and emoji to fall back to the OS, with a narrow explicit allowance for `U+26CF` as described above.
- Asserts the built HTML still preloads the symbol font and the `@font-face` keeps `font-display: optional`.
- Fails if the symbol font exceeds 40 KiB or any used code point is outside the covered set, printing the code point, count, and an example page.

The check is wired into both `npm run audit:daily` and `npm run audit` as the **Glyphs** step.

Gate self-test: appending a Georgian `U+10C0` to `dist/index.html` made the check exit `1` with `U+10C0 "Ⴠ" × 1 (e.g. /index.html)`; removing the test character restored the pass.

## Automated audit

`AUDIT_WORKTREE=dirty npm run audit:daily` at 2026-10-20 12:40 UTC, against a fresh local build:

| Build | TypeCheck | Lint | Links | Mobile | SEO | SitemapLastmod | Images | Dates | Contrast | Targets | Glyphs | DeployFreshness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (skipped live) |

`Glyphs` reported:

```text
✅ Glyph coverage: 593 pages, 8650 non-ASCII characters, all rendered by bundled fonts or intentional OS fallback
   Symbol font: 806 glyphs in 39172 bytes (38.3 KiB), 12 unicode-range segments
```

After rebasing onto `origin/main` `fdc3e5a`, which makes `DeployFreshness` always contact production, the committed HEAD `0a113eb` passes **12/13** checks. Build, TypeCheck, Lint, Links, Mobile, SEO, SitemapLastmod, Images, Dates, Contrast, Targets, and **Glyphs** pass; `DeployFreshness` fails only because production still serves the 2026-10-13 build. That is the known AIN-969 Workers Builds blocker, described below, not a regression in this change.

## Real-browser evidence

Chromium through `scripts/browser.mjs` against the local `dist/` build. For each target glyph the browser reported the custom `DejaVu Sans` face (the internal name of the bundled symbol font) with `glyphCount: 1`, not a system fallback:

| Glyph | `CSS.getPlatformFontsForNode` at 375 px |
|---|---|
| `★` U+2605 | `DejaVu Sans (custom):1` |
| `≈` U+2248 | `DejaVu Sans (custom):1` |
| `≤` U+2264 | `DejaVu Sans (custom):1` |
| `≥` U+2265 | `DejaVu Sans (custom):1` |
| `⚠` U+26A0 | `DejaVu Sans (custom):1` |
| `‑` U+2011 | `DejaVu Sans (custom):1` |

Control glyphs outside every bundled range (`U+E000`, CJK `电`) fell back to `Atkinson Hyperlegible`, confirming the probe distinguishes real coverage from fallback.

| Shot | Viewport | Evidence |
|---|---|---|
| [`glyph-home-320.png`](2026-10-20/glyph-home-320.png) | 320×720, DSF 2 | homepage, nav on one row, no horizontal overflow |
| [`glyph-home-375.png`](2026-10-20/glyph-home-375.png) | 375×812, DSF 2 | homepage |
| [`glyph-home-1280.png`](2026-10-20/glyph-home-1280.png) | 1280×800, DSF 1 | homepage |
| [`glyph-article-320.png`](2026-10-20/glyph-article-320.png) | 320×720, DSF 2 | Meta Muse Glimmer article header |
| [`glyph-article-375.png`](2026-10-20/glyph-article-375.png) | 375×812, DSF 2 | Meta Muse Glimmer article header |
| [`glyph-article-1280.png`](2026-10-20/glyph-article-1280.png) | 1280×800, DSF 1 | Meta Muse Glimmer article header |
| [`glyph-proof-320.png`](2026-10-20/glyph-proof-320.png) | 320×720, DSF 2 | capture-time proof: `★ ≈ ≤ ≥ ⚠ ‑` |
| [`glyph-proof-375.png`](2026-10-20/glyph-proof-375.png) | 375×812, DSF 2 | capture-time proof: `★ ≈ ≤ ≥ ⚠ ‑` |
| [`glyph-proof-1280.png`](2026-10-20/glyph-proof-1280.png) | 1280×800, DSF 1 | capture-time proof: `★ ≈ ≤ ≥ ⚠ ‑` |
| [`glyph-closeup-star-375.png`](2026-10-20/glyph-closeup-star-375.png) | 375×812, DSF 2 | real content: `911★` in the reverify source table |
| [`glyph-closeup-warning-375.png`](2026-10-20/glyph-closeup-warning-375.png) | 375×812, DSF 2 | real content: `0.95 ⚠` in the GPT-Live safety table |
| [`glyph-closeup-approx-375.png`](2026-10-20/glyph-closeup-approx-375.png) | 375×812, DSF 2 | real content: `≈1.9×` in the Jalapeño benchmark table |
| [`glyph-closeup-table-375.png`](2026-10-20/glyph-closeup-table-375.png) | 375×812, DSF 2 | real content: `≤8B` in the Meta Muse article |

The three `glyph-proof-*` shots inject a labeled paragraph into the article DOM for the capture only; the paragraph is not in the built or published article. It exists because no single current article contains all six glyphs. The close-ups are extracted from real article text and labelled with the source path and code point; they are verification artifacts, not article content. Raw measurements are in [`glyph-evidence.json`](2026-10-20/glyph-evidence.json).

### Visual judgment

- All six target glyphs render as real marks at 320, 375, and 1280 px; no empty boxes, no clipped glyphs, no overlapping text.
- The proof box and close-up cards keep the body font stack, so the glyphs are rendered by the same face the article uses rather than a test-only stylesheet.
- The homepage and article keep their existing hierarchy and mobile density. The 320 px nav stays on one row and `scrollWidth == clientWidth` at every captured viewport.
- No article content, headline, preview, or metadata was changed for this fix.

## Production status

The AIN-969 Cloudflare Workers Builds blocker is unchanged: production still serves the 2026-10-13 artifact, `/fonts/ai-newsroom-symbols.woff` returns `404`, and the live pages have no symbol-font preload. This change is verified locally and ships with the next successful deploy. Do not treat the local screenshots as production verification.

## Reproduction

```bash
npm run build
python3 -m http.server 4399 --directory dist &
node scripts/capture-glyph-evidence.mjs http://localhost:4399 docs/audit-reports/2026-10-20
npm run audit:daily   # after committing, or AUDIT_WORKTREE=dirty for the working tree
```
