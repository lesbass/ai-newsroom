# AIN-881 — Homepage hero aligned to the 760px content column

**Date:** 2026-10-07 · **Agent:** SiteEngineer · **Production:** `https://news.lesbass.com/`
**Commit:** `7b98005` — `AIN-881: align the homepage hero headline with the 760px content column`
**Gate:** `CHECK_URL=https://news.lesbass.com/ npm run audit:daily` → **10/10 PASS**
(report `.audit-reports/2026-10-07.md`, timestamp **2026-10-07 00:54:22 UTC**)

## Problem

The homepage hero had a second left edge: at 1280px the headline started at **131.19px** while
`.section-label` ("LATEST") and every card started at **280px** — a 148.81px hang, found in the
2026-10-07 production audit (`docs/audit-reports/2026-10-07.md`, observation 1).

- `header`, `footer`, `.home-hero`: `width: min(1120px, calc(100% - 2rem))` → frame at 80px;
  `.home-hero` added `padding-left: clamp(2rem, 4vw, 3.25rem)` → text at 131.19px.
- `.container`: `max-width: var(--max-width)` = 760px, centred, `padding: 0 1.25rem` → text at 280px.

## Fix

One rule changed — `src/layouts/BaseLayout.astro`, `.home-hero` padding-left:

```css
padding: clamp(3.4rem, 8vw, 6rem) 0 clamp(2rem, 5vw, 3.6rem)
  clamp(
    calc(0.25rem + 4px),                                  /* floor: 768px value */
    calc((100% - var(--max-width)) / 2 + 0.25rem),        /* container offset  */
    calc(1.25rem + 180px)                                 /* cap: 200px        */
  );
```

`100%` resolves against the hero's **containing block** (`main`, the same width `.container` centres
in), not the hero's own 1120px frame, so the middle term is exactly the `.container` content offset
once the hero frame is `1rem` from each edge (viewport ≤ 1152px). Two clamps are required:

| Term | Value | Why |
|---|---|---|
| floor `calc(0.25rem + 4px)` | 8px @16px root | That is the alignment value at exactly 768px, and it is > the `0.42rem` tick rail (6.72px), so the headline never collides with the rail on 601–767px. |
| middle | `(100% - 760px)/2 + 0.25rem` | Reproduces `.container`'s `1.25rem` padding minus the hero's `1rem` frame inset. |
| cap `calc(1.25rem + 180px)` | 200px @16px root | Above 1152px the hero frame starts tracking the viewport, so the required offset becomes constant (`(1120 - 760)/2 + 1.25rem`). Without the cap the offset keeps growing — the issue's literal `max()` snippet would overshoot by 144px at 1440. |

The `<=600px` media query keeps its existing `padding-left: 1.25rem` (deliberate — see mobile below).

## Measurements (live production)

Left edges in CSS pixels, measured with Playwright against `https://news.lesbass.com/`
(`main` width equals the viewport at every width — Chromium runs with `--hide-scrollbars`).

**Before (2026-10-07 00:41 UTC):**

| viewport | hero frame | padding-left | hero h1 | `.section-label` / card | Δ |
|---:|---:|---:|---:|---:|---:|
| 1440 | 160 | 52px | 212 | 360 | **−148** |
| 1280 | 80 | 51.2px | 131.19 | 280 | **−148.81** |
| 1152 | 16 | 46.08px | 62.08 | 216 | −153.92 |
| 1024 | 16 | 40.96px | 56.95 | 152 | −95.05 |
| 816 | 16 | 32.64px | 48.63 | 48 | +0.63 |
| 768 | 16 | 32px | 48 | 24 | **+24** |
| 700 | 16 | 32px | 48 | 20 | +28 |
| 601 | 16 | 32px | 48 | 20 | +28 |
| 600 / 390 / 375 | 12 | 20px | 32 | 20 | +12 |

**After deploy (2026-10-07 00:53 UTC):**

| viewport | hero frame | padding-left | hero h1 | `.section-label` / card | Δ | h1 − rail right | overflow |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1440 | 160 | 200px | 360 | 360 | **0** | 193.28 | 0 |
| 1280 | 80 | 200px | 280 | 280 | **0** | 193.28 | 0 |
| 1152 | 16 | 200px | 216 | 216 | **0** | 193.28 | 0 |
| 1024 | 16 | 136px | 152 | 152 | **0** | 129.28 | 0 |
| 816 | 16 | 32px | 48 | 48 | **0** | 25.28 | 0 |
| 768 | 16 | 8px | 24 | 24 | **0** | 1.28 | 0 |
| 700 | 16 | 8px | 24 | 20 | +4 | 1.28 | 0 |
| 601 | 16 | 8px | 24 | 20 | +4 | 1.28 | 0 |
| 600 / 390 / 375 | 12 | 20px | 32 | 20 | +12 *(unchanged)* | 13.28 | 0 |

### Acceptance

- [x] Hero headline left edge == `.section-label` / card left edge at **1280, 1024, 768** (Δ 0).
- [x] Mobile **390 and 375 unchanged** — same numbers as the baseline row; pixel diff against the
      pre-fix mobile evidence `home/screenshot-mobile.png` is **17 device pixels (0.001%)**, i.e.
      noise only. Tick-rail gap stays 13.28px, no regression.
- [x] `CHECK_URL=https://news.lesbass.com/ npm run audit:daily` → **10/10 PASS**, 0 failures.
- [x] Desktop + mobile screenshots of `/` committed under `docs/audit-reports/2026-10-07/ain881/`.

### Deliberate trade-offs

1. **601–767px keeps a ≤4px offset instead of exact alignment.** Exact alignment there would put the
   headline box 2.72px *inside* the tick rail (rail spans `hero_left → hero_left + 6.72px`, the
   column edge sits at 20px while the hero frame sits at 16px). The floor buys the rail 1.28px of
   clearance (2.0px of measured ink separation at both 768 and 700, checked at 2× DPI — no
   collision) and costs at most 4px of alignment.
2. **Mobile was not "fixed".** Aligning ≤600px would cut the rail gap from 13.28px to 1.28px. The
   issue asks for mobile unchanged-or-improved, so the existing media query stands.
3. **The tick rail stays on the logo's left edge** (80px at 1280), and the hero frame/border still
   spans 1120px like the header and footer — only the text moved.

## Evidence

| File | What it shows |
|---|---|
| `2026-10-07/ain881/screenshot-desktop.png` | `/` at 1280×800 from production; headline, LATEST and the featured card on one 280px edge (pixel-verified: first dark pixel of the headline band at x=280). |
| `2026-10-07/ain881/screenshot-mobile.png` | `/` at 375×812 (2× DPI), pixel-diff equivalent to the pre-fix mobile evidence (17 of 1,218,000 device pixels). |
| `2026-10-07/ain881/screenshot-tablet-768.png` | `/` at 768×900 — tightest acceptance width; headline first dark pixel at x=25 against the 24px column. |
| `.audit-reports/2026-10-07.md` | Machine audit report, 10/10 PASS. |

Local pre-deploy verification on the same build: `astro check` (0 errors), ESLint (0 errors),
`test:links`, `test:mobile`, `test:seo`, `test:images`, `test:dates`, `test:contrast` (20/20 pairs),
`test:targets` (755 targets, 12 page/viewport runs, 0 hard failures) — all against `dist/`.
