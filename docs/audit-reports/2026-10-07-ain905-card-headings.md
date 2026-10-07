# AIN-905 — Listing card titles are real headings (a11y/SEO list semantics)

**Date:** 2026-10-07 · **Agent:** SiteEngineer · **Production:** `https://news.lesbass.com/`
**Issue:** AIN-905 (follow-up from AIN-904)

## Problem

In `src/components/ArticleCard.astro` the card title was `<a class="article-card-title">`, not a
heading. On `/articles/`, `/tags/*`, and the homepage feed the article titles were therefore not
exposed as headings, so screen-reader heading navigation and list semantics were weak on every
listing page.

## Fix

`ArticleCard.astro` now renders a heading wrapping the same link, with a `headingLevel` prop:

```astro
interface Props {
  article: CollectionEntry<'articles'>;
  featured?: boolean;
  headingLevel?: 2 | 3;   // default 3 (homepage sections)
}
const Heading = `h${headingLevel}` as 'h2' | 'h3';
...
<Heading class="article-card-title">
  <a href={url}>{title}</a>
</Heading>
```

- `/articles/` and `/articles/page/N/` → `headingLevel={2}` (page `h1` is "All articles").
- `/tags/[tag]/` → `headingLevel={2}` (page `h1` is the tag name).
- `/` → `headingLevel={3}` (page `h1` is the site name; cards sit under the `h2` section labels
  "Latest" / "Recent articles" / "Browse by topic").

`BaseLayout.astro` keeps `.article-card-title` typography on the heading and adds the link's
reset so the visual style is byte-for-byte unchanged:

```css
.article-card-title { ...; margin: 0 0 0.45rem; color: var(--color-text); }  /* was margin-bottom only */
.article-card-title a { color: inherit; text-decoration: none; }
```

## Heading structure (built `dist/`, desktop + mobile)

| Page | `<h1>` | `<h2>` | `<h3>` | card titles |
|---|---:|---:|---:|---|
| `/` | 1 | 3 (section labels) | 13 | 13 `<h3>` |
| `/articles/` | 1 | 20 | 0 | 20 `<h2>` |
| `/tags/<tag>/` (e.g. `256k-context`) | 1 | 1 | 0 | `<h2>` |

No skipped levels: `h1 → h2 → h3` on the homepage, `h1 → h2` on archive/tag pages. Every listing
page still has exactly one `<h1>`.

## Rendering unchanged (browser evidence)

Playwright (`@sparticuz/chromium`), local `dist/` via `npm run build`, production
`https://news.lesbass.com/` (pre-change markup).

- **Pixel-identical pre/post locally:** an old-code build (git stash) and the new-code build render
  `/` at 1280×800 with **0 differing pixels** (mean abs diff 0.0000), deterministic across repeated
  captures.
- **Pixel-identical across the change on `/articles/`:** production (old markup) vs local (new
  markup) desktop screenshots **0 differing pixels**.
- **Computed typography/box identical** for the first card heading at 1280×800 and 375×812 on both
  pages, e.g. `/articles/` desktop `font-size 26.4px / weight 700 / line-height 29.568px / color
  rgb(16,24,39) / margin 0 0 7.2px / box 702×59` — identical before and after; mobile `20px / box
  309×67` identical. Full before/after metrics: `measure-after.json`.
- Production captures differ run-to-run (network font timing), so they are not a stable baseline;
  the deterministic local pre/post comparison is the visual-regression evidence.

## Gate

- `npm run check` → 0 errors / 0 warnings / 0 hints
- `npm run lint` → clean
- `npm run test:seo` → pass (single `<h1>` per page)
- `npm run test:mobile` → pass
- `npm run test:images`, `test:dates` → pass
- `npm run test:contrast` → 20/20 WCAG 2.1 AA pairs
- `npm run test:targets` → 755 targets, 12 page/viewport runs, 0 hard failures

## Evidence

| File | What it shows |
|---|---|
| `2026-10-07-ain905-card-headings/home-desktop.png` | `/` 1280×800 — `<h3>` card titles, unchanged visuals |
| `2026-10-07-ain905-card-headings/home-mobile.png` | `/` 375×812 (2×) |
| `2026-10-07-ain905-card-headings/articles-desktop.png` | `/articles/` 1280×800 — `<h2>` card titles |
| `2026-10-07-ain905-card-headings/articles-mobile.png` | `/articles/` 375×812 (2×) |
| `2026-10-07-ain905-card-headings/measure-after.json` | computed heading/anchor styles + heading counts, before/after |

Transparency: the model cannot ingest image pixels; the screenshots are the pixel evidence for a
vision-capable/human check, and the "unchanged" claim is backed by the deterministic pixel-diff and
computed-style measurements above.
