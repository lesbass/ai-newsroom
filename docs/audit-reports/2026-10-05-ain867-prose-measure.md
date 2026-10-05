# AIN-867 — Narrow the article prose measure to 66–72 characters per line

**Run:** heartbeat `17152317-46c9-4a5c-919b-f500531830cf`, 2026-10-05.
**Issue:** [AIN-867](https://github.com/lesbass/ai-newsroom) — filed by the 2026-10-05 daily audit.
**Scope:** article prose measure only. No `--max-width` change, no listing/tag/home layout change.

---

## The change

`src/layouts/BaseLayout.astro`, three lines inside the existing `.article-body` block:

```css
.article-body :is(p, ul, ol, blockquote) { max-width: 51ch; }
.article-body p:has(> img),
.article-body p:has(> picture) { max-width: none; }
```

`--max-width` (760px) is untouched, so `.container`, figures, tables, code blocks, headings and
every listing page keep their current width. Only running prose is capped.

### Why `51ch` and not the suggested `68ch`

`ch` resolves against the element's own font. The body font is **Atkinson Hyperlegible at 17px**
(`font-size: 1.0625rem`), where `1ch = 11.016px`:

| value | computed `max-width` | result |
|-------|----------------------|--------|
| `68ch` (suggested in the issue) | **749.09px** | wider than the 720px prose column → **no-op, nothing changes** |
| `51ch` (shipped) | **561.8px** | ≈ 66–72 characters per line |

So `68ch` was tried first and measured as a no-op; the value was calibrated empirically to land the
measure in the issue's target band. Because it is expressed in `ch`, it still tracks the font if the
body font or size ever changes.

---

## Measurements

Probe: per-character line assignment (collapsed `Range` per character, new line when the rect top
moves by more than half a line-height) over every `.article-body > p` and every direct `li` of
`.article-body > ul/ol` with ≥150 characters. Two articles, the same pair the issue sampled.

Viewport **1366×900**, `deviceScaleFactor: 1`, against the local `dist/` build.

Two metrics are reported:

- **full-line** — characters on *completed* lines only, excluding each block's last line. This is
  the reading measure.
- **all-lines** — total characters / total lines. The usually short final line pulls this down, so
  it reads lower than the measure actually is.

### Before → after

| | before (`max-width: none`) | after (`51ch`) |
|---|---|---|
| samples | 36 | 36 |
| full-line min / avg / max | **82 / 89.2 / 95** | **63.5 / 68.5 / 73.0** |
| all-lines min / avg / max | 64.3 / 79.8 / 91.8 | 50.7 / 60.5 / 73.3 |
| blocks with full-line outside 62–75 | **36 of 36** | **0 of 36** |

Average full-line measure went from **89.2 → 68.5 CPL**, inside the issue's 66–72 target band, and
every sampled block now sits inside 62–75.

### Media width is unchanged (the issue's hard constraint)

Computed `getBoundingClientRect().width`, 1366×900, four article pages:

| element | width |
|---|---|
| `.article-body > p` | **562px** (was 720px) |
| `.article-body > p:has(> img)` | **720px** (exception holds) |
| `li` prose (51ch minus list padding) | 538px |
| `figure` / `img` | **720px** |
| `table` | **720px** |
| `h1`–`h6` | **720px** |
| `.container` | **760px** (unchanged) |

All 3 image-bearing paragraphs in the corpus are `<p><img …></p>` (direct child), so the `:has(> img)`
exception covers every one of them — verified by scanning all 553 built pages.

### Mobile is unaffected

`51ch` = 562px is wider than a 390px viewport, so the cap never engages on phones.

| 390×844 | before | after |
|---|---|---|
| article `scrollHeight` | 9,387px | **9,387px** |
| `scrollWidth - clientWidth` (overflow) | 0 | **0** |
| `/articles/` `scrollHeight` | 19,852px | 19,852px (AIN-868, unchanged) |
| `/` `scrollHeight` | 4,921px | 4,921px |

Desktop article `scrollHeight` grew 6,325 → 7,107px (+12%), which is the expected cost of a
narrower measure.

---

## Visual evidence

Chromium via `scripts/browser.mjs` `launchBrowser()`, one browser per viewport, `networkidle` +
`document.fonts.ready`, screenshots at `deviceScaleFactor` 1 (desktop) / 2 (mobile).

| Screenshot | Viewport |
|---|---|
| [`ain867-article-desktop-before.png`](2026-10-05/ain867-article-desktop-before.png) | 1366×768, pre-change |
| [`ain867-article-desktop.png`](2026-10-05/ain867-article-desktop.png) | 1366×768, shipped |
| [`ain867-article-mobile-before.png`](2026-10-05/ain867-article-mobile-before.png) | 390×844, pre-change |
| [`ain867-article-mobile.png`](2026-10-05/ain867-article-mobile.png) | 390×844, shipped |
| [`ain867-listing-mobile.png`](2026-10-05/ain867-listing-mobile.png) | 390×844, unchanged |
| [`ain867-home-mobile.png`](2026-10-05/ain867-home-mobile.png) | 390×844, unchanged |

Before/after desktop pairs are the same article at the same anchor paragraph; the only difference is
the measure. No console errors and no ≥400 responses on any probed page.

**Judgment:** the desktop column now reads like a text column rather than a banner. Left edges of
headings, body and lists still align (the cap is on the block, not on the text alignment), media
still breaks out to the full 720px, and the extra right-hand whitespace inside the 760px container
is not visible as a hard edge because the page background grid runs the full width. Mobile is
pixel-identical to before.

---

## Verification

```bash
npm run audit    # exit 0
# build 553 pages, astro check, eslint, links, mobile, seo, images, dates, contrast — all green
```

`test:contrast` still reports 20/20 pairs at WCAG 2.1 AA; `test:seo` canonical/sitemap/RSS checks
unchanged; `test:dates` reports no future publication dates.

Reproduce the CPL numbers:

```bash
python3 -m http.server 8799 --bind 127.0.0.1 -d dist &
node <probe> http://127.0.0.1:8799 1366 900            # after
node <probe> http://127.0.0.1:8799 1366 900 \
  ".article-body :is(p, ul, ol, blockquote){max-width: none !important}"   # before
```

The probe itself is a throwaway harness kept out of the repository (repo hygiene); the numbers above
are the durable record.

---

## Production re-verification (later the same day)

Run against the **live site** `https://news.lesbass.com/`, not the local `dist/`, so the numbers
cover the deployed artifact rather than only the build.

- The inline rule is served: `.article-body :is(p, ul, ol, blockquote) { max-width: 51ch; }` is
  present in the HTML of `/` and of the sampled article page (Astro inlines the layout CSS, there is
  no external stylesheet).
- CPL probe, same two articles, 1366×900, `document.fonts.ready`, 36 blocks. Each line is measured
  with its trailing whitespace trimmed (the convention that makes the table above comparable):

  | | value |
  |---|---|
  | min / avg / max of **block averages** | **62.5 / 67.5 / 72.2** |
  | blocks outside the issue's 62–75 target | **0 of 36** |
  | individual line extremes (context only) | 58 – 79 |

  Every sampled paragraph sits inside 62–75 and the mean lands inside the 66–72 goal band. The
  individual-line spread is not something `max-width` can tighten: it sets the *box*, while the
  characters that fit in that box move with glyph widths, so short narrow-glyph runs and **bold**
  lead-ins (`Training-only behaviors: …`, `Scope creep risk: …`) produce 58–60 character lines and
  dense narrow-glyph runs reach the high 70s. This is ordinary proportional typography, not a layout
  regression.

- Widths on production, unchanged by the cap where it must be:

  | element | width |
  |---|---|
  | `.article-body > p` | 562px |
  | `.article-body > ul/ol > li` | 538px |
  | `figure`, `table`, `h2` | 720px |
  | `.container` | 760px |

- Mobile 390×844 on production: prose renders at 350px (viewport-bound, so the 562px cap never
  engages), `scrollWidth - clientWidth` is 0, no console errors and no ≥400 responses.
- `npm run audit` re-run: **exit 0** — 553 pages built, `astro check` 0/0, eslint clean apart from a
  pre-existing unused-import warning in `scripts/check-contrast.mjs`, links, mobile, SEO, images,
  dates and contrast (20/20 at WCAG 2.1 AA) all green.
- Desktop and mobile screenshots of the live article page were captured and reviewed: prose left
  edge still aligns with headings, media keeps its full width, mobile layout is unchanged.

---

## Not changed

- `--max-width`, `.container`, `.container-wide`, listing and tag pages, header/footer.
- Any content, frontmatter, URL, canonical, sitemap or RSS value.
- Mobile padding, card layout, tag pills.
- The `check-mobile.mjs` success-message gap (AIN-869) and the `/articles/` length (AIN-868) are
  separate issues, still open.
