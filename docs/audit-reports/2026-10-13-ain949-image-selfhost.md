# AIN-949 — self-host optimized article hero/`og:image` for 26 legacy articles

- Date: 2026-10-13 (Europe/Rome)
- Issue: AIN-949
- Repo commit: `5a7ad34` (`main`), deployed to production `https://news.lesbass.com/`

## Problem

26 published articles (pubDate 2026-06-10 .. 2026-07-15) used a hotlinked
third-party URL as their `image:` frontmatter. That same URL was the article
hero `<img>` (`loading="eager" fetchpriority="high"`), the `og:image` /
JSON-LD image, and the sitemap `<image:loc>`. Some sources were large
(OpenAI cards 0.4-1.5 MB) and all were fetched cross-origin with no
`news.lesbass.com` cache.

## Change

For every affected article, the external `image:` URL was replaced with a
locally hosted, optimized JPEG at
`public/images/articles/<slug>/hero.jpg`:

- resized to max 1600 px wide, `mozjpeg` quality 82; every new hero is
  13-129 KB (was up to 1.5 MB);
- `imageCredit` rewritten to one accurate line: source URL + credit/license
  + `Self-hosted optimized copy (JPEG), retrieved 2026-10-13`;
- `imageAlt` preserved (it already described the visible image).

Twenty-five articles rehost the source-provided media. One is a special case:

- `meta-manus-unwind-2026-06-14` — the previous URL
  (`opengraph.githubassets.com/1/Meta-Press/manus`) returns 404 (the repo does
  not exist, so GitHub served a default card). Replaced with an editorial
  browser screenshot of the cited primary source, the Straits Times article
  *"Meta starts unwinding Manus deal by splitting operations, data"*
  (`straitstimes.com/world/meta-starts-unwinding-manus-deal-by-splitting-operations-data`),
  captured 2026-10-13 via Playwright Chromium.

The build-time pipeline (`scripts/optimize-hero-images.mjs`) then generated
`hero.webp` + `hero-900.webp` variants for each, so the article hero
`<picture>` serves WebP while `og:image` keeps a universally supported JPEG.

## Host grouping (26)

- `opengraph.githubassets.com` (13): hello-world, crewai-multi-agent-orchestration-framework,
  instructor-structured-outputs-llms-2026, smolagents-hugging-face-agents-code-python,
  didilili-ai-agents-from-zero-guide-open-source-2026, caveman-claude-code-token-efficient-skill,
  ponytail-yagni-ai-agent-skill, googleworkspace-cli-gws-rust-workspace-cli,
  x86-ace-specification-ai-compute-extensions, nvidia-enpire-coding-agents-real-robots,
  codebase-memory-mcp-zero-dependency-code-intelligence, headroom-ai-agent-token-compression,
  meta-manus-unwind-2026-06-14 (replaced with editorial screenshot; see above).
- `images.ctfassets.net` (5, OpenAI): openai-confidential-s-1-filing-2026,
  openai-ona-acquisition-2026, openai-deployment-simulation,
  openai-health-intelligence-chatgpt-boston-childrens-rare-disease,
  openai-lifescibench-benchmark.
- `www.anthropic.com` / `www-cdn.anthropic.com` / `cdn.sanity.io` (4): anthropic-claude-corps-150-million-fellowship,
  anthropic-proposes-block-then-gets-blocked, anthropic-seoul-office-korea-expansion,
  anthropic-claude-for-teachers-k12-launch.
- `storage.googleapis.com` / `lh3.googleusercontent.com` (3): diffusiongemma-google-deepmind-text-diffusion-open-weights-2026,
  google-gemini-spark-agent-24-7-cloud-workspace-2026,
  deepmind-sierra-leone-rct-gemini-guided-learning.
- `cf-assets.www.cloudflare.com` (1): cloudflare-temporary-accounts-ai-agents.

## Verification (live, 2026-10-13)

- `npm run build` succeeds (586 pages). `test:images`, `test:seo`,
  `test:mobile`, `test:links`, `test:dates`, `test:sitemap-lastmod` all pass.
- All 71 article hero images resolve on production with an image
  content-type (`HTTP 200`); the 26 affected pages' `og:image` is now
  `https://news.lesbass.com/...` (0 external).
- `https://news.lesbass.com/sitemap.xml`: 71 `<image:loc>`, **0** external.
- `https://news.lesbass.com/rss.xml`: 71 `<enclosure>`, **0** external,
  well-formed XML.
- Real-browser renders (Playwright Chromium, live production) at 1280 px and
  390 px: no horizontal overflow, hero keeps `width`/`height`, local `src`.
  Screenshots: `docs/audit-reports/2026-10-13-ain949/`.

## Notes / follow-ups

- `hello-world` is a placeholder "welcome" article; its image is now
  self-hosted, but whether to keep the article is an EditorInChief decision.
- This was an image-serving/performance change only. No prose was rewritten
  and the AIN-267/AIN-286 readability-rewrite campaign remains closed.
