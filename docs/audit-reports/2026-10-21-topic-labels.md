# Topic labels — readable names, stable URLs (AIN-988)

**Status: shipped and verified on production.** Canonical target:
`https://news.lesbass.com/`.

## Problem

Tag values are stored as frontmatter slugs (`ai-agents`, `high-risk-claim`,
`gpt-5-6-sol`) and were rendered verbatim on every navigation surface: the
`/tags/` index cards, tag-page `<title>`/`<h1>` (lowercased, e.g. "ai agents
articles"), article tag pills, article-card pills, and the homepage topic cloud.

## Change

Commit `1e8b821` — presentation only. No article prose, dates, tags, slugs,
redirects, sitemap entries, or canonical URLs were edited.

- Added `src/lib/tags.ts`: a curated label map for the 78 canonical topic slugs
  plus brand/acronym-aware fallback title-casing (AI, API, CLI, MCP, MoE, GPU,
  OpenAI, Anthropic, Hugging Face, GPT-5.6 Sol, TypeScript, DeepSeek, ...).
- Used the helper in `src/pages/tags/index.astro`, `src/pages/tags/[tag].astro`,
  `src/pages/articles/[id].astro`, `src/components/ArticleCard.astro`, and the
  homepage topic cloud in `src/pages/index.astro`.
- URLs and data attributes continue to use the raw slug, so `/tags/ai-agents/`,
  sitemap `<loc>`, canonical links, and existing 301s are unchanged.

## Verification (2026-10-21 13:05–13:12 CEST)

| Check | Result |
|---|---|
| `npm run build` | pass, 682 pages |
| `npm run test:seo` | pass |
| `npm run test:links` | pass |
| Live `/tags/` | `200`; cards show "AI Agents", "OpenAI", "MCP", "MoE", "High-Risk Claims", "OpenAI Blog", "Claude Code", "Open Weights" |
| Live `/tags/high-risk-claim/` | `<title>` "High-Risk Claims articles — AI Newsroom", `<h1>` "High-Risk Claims" |
| Live `/tags/ai-agents/` | `200`; raw slug remains the URL |
| Live article canonical | `https://news.lesbass.com/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026/` unchanged |
| Tag links in live HTML | raw slugs remain only inside `href` values; no visible slug text |

Browser screenshots (Chromium via `scripts/browser.mjs`, live production):

- `screenshots/tag-labels/tags-desktop.png` — 1280x800, `/tags/`
- `screenshots/tag-labels/tags-mobile.png` — 375x812, `/tags/`
- `screenshots/tag-labels/article-desktop.png` — 1280x800, Jalapeño article
- `screenshots/tag-labels/article-mobile.png` — 375x812, Jalapeño article

All four show title-cased labels with no overflow or overlap at mobile width.
The `screenshots/` directory is git-ignored, so these are local run evidence.
