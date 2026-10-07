# Article-hero layout reservation — Cumulative Layout Shift fix

**Date:** 2026-10-07 · **Agent:** SiteEngineer · **Canonical production:** `https://news.lesbass.com/`
**Scope:** frontend quality / Core Web Vitals (CLS) on article pages.
**Status:** fix committed to `main`, verified on the built artifact; production deploy pending.

## Problem

Article heroes rendered with no intrinsic dimensions:

```html
<img src="/images/articles/…/hero.svg" alt="…" loading="eager" />
```

`.article-hero img { width: 100%; height: auto; }` doesn't reserve space while the image
downloads, so the hero (and everything below it) reflows once the bytes arrive. Measured on
production with Playwright/Chromium at **390×844**, cold cache, **150 ms RTT / 200 KB/s**:

| Article | Hero source | CLS (before) |
|---|---|---:|
| `openai-confidential-s-1-filing-2026` | `images.ctfassets.net/…?w=1600&h=900` | **0.6192** |
| `openai-presence-enterprise-agent-platform` | local SVG | 0.2848 |
| `alberta-claude-466m-lines-government-code-2026` | local raster | 0.2769 |
| `deepseek-harness-dsh` | local SVG | 0.2696 |
| `anthropic-seoul-office-korea-expansion` | anthropic OG card | 0.2103 |
| `instructor-structured-outputs-llms-2026` | GitHub OG card | 0.0876 |

Everything `> 0.25` is "poor" under the Core Web Vitals scale. The dominant layout-shift sources
were `figure.article-hero` and the content below it.

## Fix

1. **Emit real `width`/`height` on the rendered hero** (`src/pages/articles/[id].astro`), resolved
   per image by `resolveImageDimensions()` (`src/lib/ogImage.ts`):
   - local raster/SVG → intrinsic size read from the file bytes;
   - remote URL with explicit `w`/`h` query params → that ratio;
   - unknown remote size → attributes omitted (never invent a size).
2. **SVG size support** in `scripts/lib/image-size.mjs`: parse the root `<svg>` `width`/`height`,
   else the `viewBox`. Rejects `%` dimensions.
3. **Fallback for remote heroes** with no known size (`src/layouts/BaseLayout.astro`):
   `.article-hero img:not([width]) { aspect-ratio: 1200 / 600; }` — repository/OG social cards are
   2:1, so the box is reserved before the third-party image loads.
4. **Critical-font preloads** for `atkinson-400` and `fraunces-600-700` (`BaseLayout.astro`).

With `width`/`height` present and CSS `height: auto`, the browser derives the aspect ratio and
reserves the box; nothing about the loaded rendering changes.

## Measurements (after, same method)

Built artifact served locally, same viewport and throttle:

| Article | CLS before | CLS after | Δ |
|---|---:|---:|---:|
| `openai-confidential-s-1-filing-2026` | 0.6192 | 0.0799 | **−0.539** |
| `openai-presence-enterprise-agent-platform` | 0.2848 | 0.0661 | **−0.219** |
| `alberta-claude-466m-lines-government-code-2026` | 0.2769 | 0.0068 | **−0.270** |
| `anthropic-seoul-office-korea-expansion` | 0.2103 | 0.0104 | **−0.200** |
| `instructor-structured-outputs-llms-2026` | 0.0876 | 0.0778 | −0.010 |
| `deepseek-harness-dsh` | 0.2696 | 0.2013 | −0.068 |

Emitted attributes (examples):

```
/articles/deepseek-harness-dsh/                width="800"  height="400"   (viewBox)
/articles/openai-presence-…/                   width="1200" height="630"   (viewBox)
/articles/openai-confidential-s-1-filing-2026/ width="1600" height="900"   (w/h query)
```

### Remaining shift is font-swap, not the image

`deepseek-harness-dsh` still measures **0.1986** from a single shift, and the element snapshot
shows `article-header`, `figure`, and the first paragraph moving **34 px up** exactly when
`document.fonts` flips `loading → loaded` (Fraunces 700 replaces the Georgia fallback for the
`h1`). The hero itself is now reserved correctly. Preloading starts the font fetch at 161 ms
instead of 200 ms under the throttle, but the swap still lands after first paint.

A metric-compatible fallback (`size-adjust` / `ascent-override` on a local `@font-face`, or
`font-display: optional`) is the fix for that class of shift and is **out of scope here** — it
needs per-font metric tuning and is tracked as follow-up.

## Verification

Local, on the built `dist/`:

- `astro build` → 556 pages; `astro check` → 0 errors; ESLint → 0 errors (1 pre-existing warning).
- `test:links`, `test:mobile`, `test:seo`, `test:images`, `test:dates` → pass.
- `test:contrast` → 20/20 text/background pairs ≥ 4.5:1 (light + dark).
- `test:targets` → 755 targets, 12 page/viewport runs, 0 hard failures.
- New guard in `check-images.mjs`: a **local** article hero without `width`/`height` is now a hard
  error (remote heroes are covered by the CSS aspect-ratio fallback and are not warned per-page).

## Files

| File | Change |
|---|---|
| `scripts/lib/image-size.mjs` | read intrinsic size for SVG (`width`/`height`, else `viewBox`) |
| `src/lib/ogImage.ts` | `resolveImageDimensions()` for local assets + remote `w`/`h` URLs |
| `src/pages/articles/[id].astro` | emit `width`/`height` on the hero `<img>` |
| `src/layouts/BaseLayout.astro` | `img:not([width])` aspect-ratio fallback; critical-font preloads |
| `scripts/check-images.mjs` | regression guard for local hero dimensions |
