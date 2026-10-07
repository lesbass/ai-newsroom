# AIN-908 — Article tables: keyboard access + scroll affordance

Issue: **AIN-908** (follow-up to the AIN-904 biweekly audit, observation §6).
Canonical production target: **`https://news.lesbass.com/`**.
Date: 2026-10-07 (Europe/Rome).

## Problem

Markdown tables rendered as `<table>` with `display:block; overflow-x:auto` in
`BaseLayout.astro`. Wide tables overflow the article column (measured below) and
become a horizontal scroll region, but the region was:

- **not keyboard-focusable** — a keyboard-only user could not scroll it (WCAG 2.1.1 Keyboard);
- **without a visible hint** on touch/mobile that there was more content to the right.

## Change

- New rehype plugin `src/lib/rehype-table-scroll.ts` wraps every markdown
  `<table>` in a focusable scroll region. The `<table>` keeps its native table
  semantics; only the wrapper carries the role:

  ```html
  <div class="table-scroll" tabindex="0" role="region"
       aria-label="Table, scroll horizontally to see more">
    <table>…</table>
  </div>
  ```

- `astro.config.mjs` registers the plugin next to `rehypeLazyImages`.
- `src/layouts/BaseLayout.astro`: `overflow-x:auto` moves from `table` to
  `.table-scroll`; `table` becomes `width:max-content; min-width:100%`. Added a
  `.table-scroll:focus-visible` outline and a subtle right-edge inset shadow on
  viewports `≤640px` as a scroll hint. No client-side JavaScript.

## Verification

Article used: `/articles/anthropic-model-hardware-standard-mhs-driver-spec-lab-agents/`
(2 tables). Local `dist/` served over HTTP; Chromium via `scripts/browser.mjs`.

| Property | Desktop 1280×800 | Mobile 375×812 |
|---|---|---|
| wrappers / tables | 2 / 2 | 2 / 2 |
| `tabindex` / `role` / `aria-label` | `0` / `region` / present | `0` / `region` / present |
| `role` on `<table>` (must be null) | null | null |
| `overflow-x` | auto | auto |
| focusable + `:focus-visible` | yes / yes | yes / yes |
| focus outline | solid 3px `rgb(29,79,145)` | solid 3px `rgb(29,79,145)` |
| table scroll, content vs box | 1725 > 720 | 1725 > 335 |
| right-edge affordance shadow | n/a | `rgba(11,16,32,.28) -12px 0 12px -12px inset` |
| document horizontal overflow | 0 | 0 |

Rule logic: `wrapperCount===tableCount && tabIndex==='0' && role==='region' &&
tableRole===null && overflowX==='auto' && focusable && focusVisible &&
outlineStyle!=='none' && docOverflow<=0` → **PASS** on both viewports.

Automated gate (all pass): `npm run build` (562 pages), `npm run check`,
`npm run lint`, `test:mobile`, `test:seo`, `test:images`, `test:dates`,
`test:contrast` (20/20 AA), `test:targets` (755 targets, 0 failures).

**Method note / limitation:** this run's model cannot ingest raster screenshots,
so the visual judgment is grounded in real-browser DOM/CSS geometry (the table
above). The screenshots in this directory are stored as pixel evidence for a
vision-capable or human reviewer; no "verified by eye" claim is made.

## Evidence

- [`desktop-table-focus.png`](2026-10-07-ain908-table-scroll/desktop-table-focus.png)
- [`mobile-table-focus.png`](2026-10-07-ain908-table-scroll/mobile-table-focus.png)
- [`mobile-table2.png`](2026-10-07-ain908-table-scroll/mobile-table2.png)
- [`desktop-article.png`](2026-10-07-ain908-table-scroll/desktop-article.png)
- [`mobile-article.png`](2026-10-07-ain908-table-scroll/mobile-article.png)
