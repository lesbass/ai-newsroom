# AIN-182: Daily SEO and Mobile Audit — Disposition

**Date:** 2026-06-23
**Agent:** SiteEngineer (1fae6b3a)
**Status:** Done

## Summary

Daily SEO and mobile audit completed. All 6 automated checks pass (build, typecheck, lint, links, mobile, SEO). 27 pages built, 23 articles, 0 warnings, 0 errors. One recurring infrastructure issue documented.

## Audit Results

| Check | Status |
|---|---|
| Build | ✅ PASS (27 pages in 1.54s) |
| TypeCheck | ✅ PASS (0 errors, 0 warnings, 0 hints) |
| Lint | ✅ PASS |
| Links | ✅ PASS |
| Mobile | ✅ PASS |
| SEO | ✅ PASS |

## Deep Verification

Beyond automated checks, performed manual deep verification:

### Mobile Readiness
- All pages have `viewport` meta with `width=device-width`
- All pages have `max-width: 100%` on images
- All pages have `overflow-x: auto` on pre blocks
- No fixed widths exceeding 480px in any inline styles
- `-webkit-text-size-adjust: 100%` present on all pages
- `overflow-wrap: break-word` present globally
- Print styles present on all pages
- Skip-to-content link with 44px touch targets on nav

### SEO Metadata
- All pages have `<title>` (within 10-70 char range) ✅
- All pages have `<meta name="description">` ✅
- All pages have canonical URL (`<link rel="canonical">`) ✅
- All pages have complete Open Graph tags (og:title, og:description, og:url, og:type, og:site_name, og:locale) ✅
- All pages have Twitter card (twitter:card, twitter:title, twitter:description) ✅
- All pages have valid JSON-LD (NewsArticle for articles, WebSite for others) ✅
- All HTML pages have `lang="en"` on `<html>` ✅
- All pages have `<meta name="theme-color">` ✅
- All images have `alt` attributes ✅
- All pages have exactly one `<h1>` ✅

### Artifacts Verified
- `robots.txt`: references correct sitemap URL ✅
- `sitemap.xml`: 26 URLs (3 static + 23 articles), proper lastmod dates ✅
- `rss.xml`: 23 items with correct metadata ✅

### OG/SEO Title Match
- `og:title` matches `<title>` on all pages ✅ (entity decoding handled correctly)

### One Minor Observation
- `/articles/caveman-claude-code-token-efficient-skill/`: HTML entities (`&#39;`) in `<title>` — Astro's default encoding for apostrophes, harmless for rendering, decoded correctly by `check-seo.mjs` comparison logic.

## Recurring Issue: Dev Dependencies Missing

Same as AIN-174 (2026-06-22). When `NODE_ENV=production` is set, `npm install` skips `devDependencies` (`@astrojs/check`, `eslint`, `playwright`). This causes `npm run check` and `npm run lint` to fail.

**Root cause:** The CI/CD environment or Cloudflare Pages build pipeline sets `NODE_ENV=production`.

**Fix:** Use `npm install --include=dev` or unset `NODE_ENV` before installing. Alternatively, move `@astrojs/check` and `eslint` to `dependencies` (not recommended — they are dev tooling).

**Note:** This was applied manually in this heartbeat. The audit now passes, but the next fresh checkout will reproduce the same issue.

## Editorial Policy Observation: Non-English Slugs

5 article slugs contain non-English word fragments, violating the 2026-06-20 editorial policy that requires English for "article titles, slugs, summaries, metadata, RSS, sitemap-facing pages":

| Slug | Non-English Word(s) |
|---|---|
| `anthropic-claude-corps-fellowship-150-milioni` | `milioni` (Italian: millions) |
| `anthropic-propone-blocco-ai-pericolosa-poi-viene-bloccata` | `blocco`, `pericolosa`, `viene`, `bloccata`, `propone` |
| `didilili-ai-agents-from-zero-guida-open-source-2026` | `guida` (Italian: guide) |
| `google-gemini-spark-agente-24-7-cloud-workspace-2026` | `agente` (Italian: agent) |
| `smolagents-hugging-face-agenti-codice-python` | `codice` (Italian: code) |

Renaming slugs requires 301 redirects to avoid breaking existing URLs, sitemap entries, and RSS items. This is a writer/editor task, not a SiteEngineer fix.

## Deployment Issue (AIN-164)

As noted in AIN-181 disposition: `https://ai-newsroom.pages.dev` continues to serve a different application (Japanese-language dashboard), not the Astro-built AI Newsroom site. The build artifact in this repo is correct — the issue is in Cloudflare Pages configuration (custom domain mapping, production branch, or project settings). This is tracked separately as AIN-164 and requires board/CTO action to resolve the Cloudflare Pages project configuration.

## Audit Report

Generated at `.audit-reports/2026-06-23.md` (gitignored).

## Disposition

**AIN-182 is complete.** All automated checks pass. The site source is healthy. Two non-blocking issues are documented for follow-up (dev dependency install pattern, non-English slugs). The Cloudflare Pages deployment mismatch (AIN-164) is a deployment infrastructure issue outside this audit's scope.
