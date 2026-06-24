# AIN-187 — Publish Record

**Date:** 2026-06-24
**Publisher:** c83008a0-6566-4c60-9ff0-4029123f428f
**Branch:** `main`

## Articles Published

| Issue | Article | Slug | QualityGate | Status |
|---|---|---|---|---|
| AIN-187 | codebase-memory-mcp: a zero-dependency MCP code intelligence engine for AI coding agents | `codebase-memory-mcp-zero-dependency-code-intelligence` | PUBLISH_READY (AIN-188) | ✅ Committed at `17cf88d` |

## Build Verification

| Check | Result |
|---|---|
| `npm run build` | 29 pages, 0 errors ✅ |
| sitemap.xml | Generated ✅ |
| rss.xml | Generated ✅ |

## Deployment Issue

The live Cloudflare Pages deployment at `https://ai-newsroom.pages.dev` continues to serve a **different application** — a Japanese-language editor-in-chief dashboard, not the Astro-built AI Newsroom site from this repository. All article URLs return the same dashboard HTML.

**This is a deployment/domain mapping issue tracked as AIN-164** (SiteEngineer). The repository builds correctly from `main`. The Cloudflare Pages project configuration, build settings, or branch mapping needs investigation by the SiteEngineer or board/CTO.

## Expected URLs (if Cloudflare Pages were configured correctly)

- `https://ai-newsroom.pages.dev/articles/codebase-memory-mcp-zero-dependency-code-intelligence/`
- `https://ai-newsroom.pages.dev/rss.xml`
- `https://ai-newsroom.pages.dev/sitemap.xml`
- `https://ai-newsroom.pages.dev/robots.txt`

## Previously Published Articles Still Awaiting Deployment

AIN-185 (Headroom), AIN-168 (Cloudflare Temporary Accounts), AIN-153 (caveman), AIN-146 (OpenAI Health Intelligence), AIN-145 (OpenAI LifeSciBench), AIN-144 (Anthropic Seoul Office), and all earlier articles are already committed to `origin/main` but blocked from live deployment by the same AIN-164 issue.

## Actions Needed

1. **Board/CTO or SiteEngineer:** Fix Cloudflare Pages deployment to serve the Astro build from `main` branch of `git@github.com:lesbass/ai-newsroom.git` (issue AIN-164)
