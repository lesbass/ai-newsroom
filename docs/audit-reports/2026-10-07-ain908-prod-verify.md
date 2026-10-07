# AIN-908 — post-deploy production verification (desktop + mobile)

Issue: **AIN-908** (article tables: keyboard access + scroll affordance).
Fix commit: `c6b7cde` on `origin/main` (deployed by Workers Builds).
Production target: **`https://news.lesbass.com/`**. Date: 2026-10-07 (Europe/Rome).

AIN-908's own report (`2026-10-07-ain908-table-scroll.md`) verified the change against a locally
served `dist/`. This run closes the remaining gap: it verifies the **deployed production build** in a
real Chromium browser at desktop and mobile widths.

## Method

- Real Chromium via `scripts/browser.mjs` (`@sparticuz/chromium`), headless, one browser process per
  viewport.
- Page: `/articles/anthropic-model-hardware-standard-mhs-driver-spec-lab-agents/` (2 markdown tables).
- Viewports: **1280×800** (DSF 1) and **375×812** (DSF 2).
- The first `.table-scroll` was scrolled into view and focused, then the DOM/CSS geometry was read.

## Results (production)

| Property | Desktop 1280×800 | Mobile 375×812 |
|---|---|---|
| HTTP status | 200 | 200 |
| wrappers / tables | 2 / 2 | 2 / 2 |
| `tabindex` / `role` / `aria-label` | `0` / `region` / present | `0` / `region` / present |
| `.table-scroll` focusable + `:focus-visible` | yes (focused) | yes (focused) |
| table scroll: content vs box | 1725 > 720 px | 1725 > 335 px |
| document horizontal overflow | 0 | 0 |
| broken images (`naturalWidth === 0`) | 0 | 0 |
| `document.fonts.status` | `loaded` | `loaded` |

Cross-page smoke check (same run, desktop + mobile): `/` and `/articles/` return 200, no horizontal
overflow (`scrollWidth === innerWidth`), no broken images, fonts loaded, and canonical URLs use
`https://news.lesbass.com/`.

## Evidence

Screenshots (production, table region focused to show the `:focus-visible` outline and, on mobile,
the right-edge inset affordance):

- [`desktop-article.png`](2026-10-07-ain908-prod-verify/desktop-article.png)
- [`mobile-article.png`](2026-10-07-ain908-prod-verify/mobile-article.png)

**Method note / limitation:** this run's model cannot ingest raster screenshots, so the pass/fail
judgment is grounded in real-browser DOM/CSS geometry (table above); the screenshots are stored as
pixel evidence for a vision-capable or human reviewer.

## Control-plane note

This was an unbound `heartbeat_timer` run (`PAPERCLIP_TASK_ID` absent), so issue comments and status
`PATCH` are rejected with `403 cross_issue_influence_run_context_required` (root cause **AIN-874**).
The durable record therefore lives in this report and as an issue document on AIN-908, not as a
comment.

## Verdict

The AIN-908 table fix is **live and correct on production** at both viewports: each table is wrapped in
a keyboard-focusable `role="region"` scroll container with an accessible name, the page does not widen,
and no images are broken. No regression found.
