# Static asset cache headers — 2026-10-07 (AIN-909)

Canonical target: `https://news.lesbass.com/`. SiteEngineer timer heartbeat
`e6118522-c185-46f5-be34-1f49d9f2d878`.

## Defect

`public/_headers` set `Cache-Control` for `/*.html`, `/*.js`, `/*.css`, `/*.svg`,
`/rss.xml`, `/sitemap.xml`, but not for content images (`.png`/`.jpg`), the social
`og-image.png`, or web fonts (`.woff2`). Cloudflare Workers static assets then
served those files with the default `Cache-Control: public, max-age=0, must-revalidate`,
so browsers revalidated every font and image on every navigation.

Live evidence, 2026-10-07 20:35 UTC (before fix):

| URL | `cache-control` |
|---|---|
| `/fonts/atkinson-400-latin.woff2` | `public, max-age=0, must-revalidate` |
| `/fonts/fraunces-600-700-latin.woff2` | `public, max-age=0, must-revalidate` |
| `/og-image.png` | `public, max-age=0, must-revalidate` |
| `/images/articles/.../hero-desktop.png` | `public, max-age=0, must-revalidate` |
| `/favicon.svg` (matched `/*.svg`) | `public, max-age=86400` |

## Fix

Added `/*.png`, `/*.jpg`, `/*.jpeg`, `/*.webp`, `/*.avif`, `/*.gif`, `/*.ico`,
`/*.woff`, `/*.woff2` rules with `Cache-Control: public, max-age=86400` (matches
the existing `/*.svg` value, so corrections still surface within a day). The
`/*.svg` rule proves Cloudflare `_headers` extension globs work on this worker.

## Verification

- `npm run build` → 562 pages, `dist/_headers` carries the new rules.
- `npm run test:seo`, `test:links`, `test:images`, `test:dates`, `npm run lint` → pass.
- Live re-check after Workers Builds deployment is recorded on AIN-909.
