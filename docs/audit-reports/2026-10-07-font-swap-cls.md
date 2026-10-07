# Font-swap layout shift — Cumulative Layout Shift fix (AIN-885)

**Date:** 2026-10-07 · **Agent:** SiteEngineer · **Canonical production:** `https://news.lesbass.com/`
**Scope:** frontend quality / Core Web Vitals (CLS) — residual font-swap shift after the hero fix.
**Status:** committed to `main` (commit `2e3d0c7`), verified on the built artifact; production deploy via the repo's Cloudflare Git integration.

## Problem

The article-hero fix removed the image layout shift, but a font-swap shift remained. Self-hosted
`@font-face` rules used `font-display: swap`, so on a throttled cold load the fallback font painted
first and the real font replaced it after first paint.

Measured with Playwright/Chromium at **390×844**, cold cache, **150 ms RTT / 200 KB/s** against
production:

| Article | CLS | Dominant shift |
|---|---:|---|
| `deepseek-harness-dsh` | **0.2013** | 0.1986 — `article-header`, `article-hero`, first `P` |
| `better-models-worse-tools-claude-tool-regression` | 0.0573 | tags + hero + meta |

Root cause: the `.breadcrumb` renders the full article title in the body font. Before the body
font loads, the fallback wraps that title to **3 lines (height 65.5 px)**; after the swap it is
**1–2 lines (height 30.8 px)**. The 34.7 px shrink moved everything below it up a line:

```
breadcrumb h  65.5px → 30.8px   (fonts.status: loading → loaded)
.article-header top  225.3 → 190.5
figure.article-hero top 487.1 → 450.4
```

## Fix

- `src/layouts/BaseLayout.astro`: all seven `@font-face` rules switched from
  `font-display: swap` to `font-display: optional`.
- `scripts/check-seo.mjs`: added a guard that fails the build if any built HTML contains
  `font-display: swap` (prevents regression on future builds).

`font-display: optional` gives the font a ~100 ms block window and **no swap period**: on a slow
cold load the fallback is used for that page view with zero late reflow, and on a normal/cached
load (fonts are preloaded) the brand faces are used from first paint. `swap` guaranteed a late
reflow whenever the font missed first paint.

## Verification

Reproduced the production condition locally by delaying the font responses 2.5 s (fonts arrive at
~2.53 s), same viewport/cache/throttle. Identical runs, only the CSS differs:

| Build | `font-display` | CLS |
|---|---|---:|
| before | `swap` | **0.2028** (`deepseek-harness-dsh`) |
| after | `optional` | **0** |

`optional` measured **CLS 0** with no layout-shift entries on `deepseek-harness-dsh`,
`better-models-worse-tools-claude-tool-regression`, `openai-confidential-s-1-filing-2026`, and
`alberta-claude-466m-lines-government-code-2026`.

Brand typography is preserved on normal loads — CDP `CSS.getPlatformFontsForNode` on an
unthrottled load reports the rendered `h1` as **Fraunces** and the body as **Atkinson Hyperlegible**.

Repo checks: `npm run audit:daily` → Build, TypeCheck, Lint, Links, Mobile, SEO, Images, Dates,
Contrast, Targets all pass. `test:seo` guard fails on a deliberate `swap` re-introduction and
passes once removed.

## Trade-off

On a slow first (uncached) load a reader may see the fallback font for that page view instead of
Fraunces/Atkinson. This is the deliberate cost of eliminating the visible layout jolt; repeat and
normal-speed loads get the brand faces. The alternative (metric-compatible fallback) is
environment-fragile — the headless harness resolves every family to a single font, so a fallback
tuned to Georgia/Arial metrics does not hold there or across OSes.

## Files

| File | Change |
|---|---|
| `src/layouts/BaseLayout.astro` | `font-display: swap` → `optional` on all `@font-face` rules |
| `scripts/check-seo.mjs` | guard: built HTML must not use `font-display: swap` |
