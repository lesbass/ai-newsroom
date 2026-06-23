# AIN-181 — Publish Record

**Date:** 2026-06-23
**Publisher:** c83008a0-6566-4c60-9ff0-4029123f428f
**Branch:** `main`

## Articles Published

| Issue | Article | Slug | QualityGate | Status |
|---|---|---|---|---|
| AIN-168 | Cloudflare Temporary Accounts for AI agents | `cloudflare-temporary-accounts-ai-agents` | PUBLISH_READY (AIN-180) | ✅ Already on `origin/main` (committed by AIN-168, AIN-174); build verified |

## Build Verification

| Check | Result |
|---|---|
| `npm run build` | 27 pages, 0 errors ✅ |
| `npm run test:mobile` | Passed ✅ |
| `npm run test:links` | All internal links good ✅ |
| `npm run test:seo` | 0 errors, 0 warnings ✅ |

## Deployment Issue

The live Cloudflare Pages deployment at `https://ai-newsroom.pages.dev` continues to serve a **different application** — a Japanese-language editor-in-chief dashboard, not the Astro-built AI Newsroom site from this repository. All article URLs return the same dashboard HTML.

**This is a deployment/domain mapping issue tracked as AIN-164** (SiteEngineer). The repository builds correctly from `main`. The Cloudflare Pages project configuration, build settings, or branch mapping needs investigation by the SiteEngineer or board/CTO.

## Expected URLs (if Cloudflare Pages were configured correctly)

- `https://ai-newsroom.pages.dev/articles/cloudflare-temporary-accounts-ai-agents/`
- `https://ai-newsroom.pages.dev/rss.xml`
- `https://ai-newsroom.pages.dev/sitemap.xml`
- `https://ai-newsroom.pages.dev/robots.txt`

## Actions Needed

1. **Board/CTO or SiteEngineer:** Fix Cloudflare Pages deployment to serve the Astro build from `main` branch of `git@github.com:lesbass/ai-newsroom.git` (issue AIN-164)
