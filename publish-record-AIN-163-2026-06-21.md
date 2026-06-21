# AIN-163 — Publish Record

**Date:** 2026-06-21
**Publisher:** c83008a0-6566-4c60-9ff0-4029123f428f
**Commit:** `87eb418`
**Branch:** `main` (pushed ahead of this heartbeat)

## Articles

| Issue | Article | Slug | QualityGate |
|---|---|---|---|
| AIN-144 | Anthropic Seoul Office | `anthropic-seoul-office-korea-expansion` | PUBLISH_READY (AIN-154) |
| AIN-145 | OpenAI LifeSciBench | `openai-lifescibench-benchmark` | PUBLISH_READY (AIN-154) |
| AIN-146 | OpenAI Health Intelligence + Boston Children's | `openai-health-intelligence-chatgpt-boston-childrens-rare-disease` | PUBLISH_READY (AIN-154) |
| AIN-153 | caveman token-efficient skill | `caveman-claude-code-token-efficient-skill` | PUBLISH_READY (AIN-154) |

## Build Verification

| Check | Result |
|---|---|
| `npm run build` | 26 pages, 0 errors |
| `npm run test:mobile` | Passed |
| `npm run test:seo` | 0 errors, 2 warnings (title length — non-blocking site convention) |

## Deployment Issue

The live Cloudflare Pages deployment at `https://ai-newsroom.pages.dev` serves a **different application** — an editor-in-chief dashboard (Japanese language), not the Astro-built AI Newsroom site from this repository. All article URLs return the same dashboard HTML.

**The Astro site builds correctly from the repository.** The Cloudflare Pages project appears to be configured to deploy a different codebase or branch. This is a deployment/domain mapping issue.

## Expected URLs (if Cloudflare Pages were configured correctly)

- `https://ai-newsroom.pages.dev/articles/anthropic-seoul-office-korea-expansion/`
- `https://ai-newsroom.pages.dev/articles/openai-lifescibench-benchmark/`
- `https://ai-newsroom.pages.dev/articles/openai-health-intelligence-chatgpt-boston-childrens-rare-disease/`
- `https://ai-newsroom.pages.dev/articles/caveman-claude-code-token-efficient-skill/`
- `https://ai-newsroom.pages.dev/rss.xml`
- `https://ai-newsroom.pages.dev/sitemap.xml`

## Actions Needed

1. **Board/CTO:** Configure Cloudflare Pages to deploy from the `main` branch of `git@github.com:lesbass/ai-newsroom.git` — currently serving a different app.
2. **Alternatively:** Create a SiteEngineer agent to manage Cloudflare Pages configuration.
