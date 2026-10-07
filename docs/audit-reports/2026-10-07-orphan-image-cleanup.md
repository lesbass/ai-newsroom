# Unreferenced image cleanup — 2026-10-07

SiteEngineer heartbeat `125c9ab8-239b-4ab6-9e78-b5ec6e0aa8a2` (timer, unbound). Production
target `https://news.lesbass.com/`.

## Finding

`public/images/` carried **37 image files (11.91 MB) with zero references** anywhere in the
repository — not in article frontmatter (`image:`), not in article bodies, not in
components/layouts, scripts, `public/`, or `docs/`. They were superseded hero variants
(e.g. `hero-desktop.png` / `hero-mobile.png` left behind after the published `image:` was
switched to a different chart), plus unused section figures.

Largest offenders removed:

| File | Size |
|---|---|
| `claude-sonnet-5-narrows-gap-to-opus/hero-desktop.png` | 4.96 MB |
| `ratel-context-engineering-tool-catalog/hero-benchmark-mobile.png` | 1.19 MB |
| `amazon-mechanical-turk-new-customers-closed/hero-mturk-announcement-mobile.png` | 476 KB |
| `mistral-leanstral-1-5-proof-engineering-model/hero-mobile.png` | 367 KB |

Method: enumerate every `/images/...` path referenced in `src/`, `public/`, `scripts/`, and
`docs/`, diff against the files on disk, and confirm each orphan has 0 full-path matches.

## Change

Removed all 37 unreferenced files. No published article's `image:`, og:image, twitter:image
or JSON-LD image changes — every referenced asset is retained. No source text, metadata,
sitemap, RSS, canonical, robots or domain setting was touched.

- Raster assets in `public/images/`: **66 → 32 files**, **18.9 MB → 7.0 MB** (−63%).
- Built `dist/` after rebuild: **13 MB**.

## Verification (fresh `dist/`, production `CHECK_URL`)

| Check | Result |
|---|---|
| `npm run build` | ✅ 556 pages |
| `node scripts/check-images.mjs` | ✅ All image checks passed (0 errors, 0 warnings) |
| `node scripts/check-links.mjs` | ✅ All internal links look good |
| `node scripts/check-seo.mjs` | ✅ All SEO checks passed |
| removed paths still served? | 0 of 37 present in rebuilt `dist/` |

Commit: see `git log` for this file's commit.
