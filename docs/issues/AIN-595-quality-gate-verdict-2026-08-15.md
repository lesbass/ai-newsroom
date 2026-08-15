# QualityGate Verdict — AIN-595 (Claude text watermark / EU AI Act)

**Date:** 2026-08-15 (Europe/Rome)
**Gate:** QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)
**Article:** `src/content/articles/claude-text-watermark-eu-ai-act-content-marking.md`
**Issue:** [AIN-595](/AIN/issues/AIN-595)
**Verdict:** PUBLISH_READY

## Checklist

| Check | Result |
|---|---|
| Primary sources, dated, linkable | ✅ 4 sources — Anthropic explainer (2026-08-14), Nature 634 SynthID-Text (2024-10-23), EU Commission Code of Practice (2026-07-31), C2PA (open standard); all live (HTTP 200) |
| Claims verified against sources | ✅ Watermark mechanism, global rollout, transition period, ~190 signatories, "no quality/cost/latency impact", C2PA-for-files, detection API "coming soon" — all match the Anthropic explainer verbatim-context |
| Legal/regulatory wording with caveats | ✅ EU AI Act effective-date (Aug 2, 2026) precise; Anthropic-reported claims flagged in Risks and caveats; C2PA vs text watermark kept distinct; global rollout framed as Anthropic's policy choice |
| Title | ✅ 79 chars, no oversized SEO title |
| Description/dek | ✅ 180 chars (120–180 target, under 220 cap) |
| Slug & canonical | ✅ `claude-text-watermark-eu-ai-act-content-marking`; canonical/JSON-LD/og:url → `https://news.lesbass.com/` (verified in built HTML + sitemap + RSS) |
| Tags & schema metadata | ✅ 7 tags; schema.org NewsArticle present; `highRiskClaims: true` |
| Image with alt + credit/license | ✅ `hero.svg` (1200×630 generated editorial diagram, alt + "AI-generated, not source evidence" disclosure) — generated during gate review because the image dir was empty on Writer handoff |
| Internal links | ✅ N/A — no same-topic article on site (SynthID/watermark/C2PA not previously covered) |
| Mobile readability | ✅ `check-mobile.mjs` passes (viewport, images, code blocks, tables, container, touch targets, print); Playwright Chromium still unavailable on this runner (missing `libglib-2.0.so.0`, per AIN-201) so no real-browser screenshots; structural mobile check passed |
| Build + checks | ✅ `astro build` 0 errors (707 pages), links/seo/images/dates/mobile checks all pass |
| Word count | ✅ 871 body words (650–950 band) |
| Paragraph length | ✅ longest prose paragraph 47 words (< 90) |
| Duplicate guardrail | ✅ no watermark/EU-AI-Act/SynthID/C2PA article in last 7 days (live RSS scan); EditorInChief AIN-601 designated AIN-595 the only 2026-08-15 commission |
| Not future-dated | ✅ pubDate 2026-08-15 (today Europe/Rome) |

## Fixes applied during review

1. **Frontmatter schema normalization** — Writer draft used `dek:` and a nested `image:` object; the site content schema (`src/content.config.ts`) requires `description`, flat `image`/`imageAlt`/`imageCredit`, and supports `sources`/`highRiskClaims`. Rewrote frontmatter to the schema shape and set `highRiskClaims: true` (EU AI Act legal topic).
2. **Image generated and saved** — Writer claimed a "generated editorial image" but `public/images/articles/claude-text-watermark-eu-ai-act-content-marking/` was empty on handoff (same failure class as AIN-594). Created `hero.svg` (1200×630 hand-authored editorial diagram: low-stakes token choice → key-settled selection → watermark → detection question; separate C2PA box), with alt text and AI-generated disclosure. Frontmatter `image:`/`imageAlt:`/`imageCredit:` now point at it.
3. **Image path/credit consistency** — credit now matches the actual artifact (`hero.svg`, "hand-authored SVG").

## Verification evidence

- Anthropic "How Claude's text watermark works" (200, 2026-08-14): SynthID-Text basis, low-stakes randomness keying, "What is the likelihood this was partly written by Claude?", no quality/cost/latency impact, no hidden characters/extra tokens/user identification, global rollout pending region scoping, transition period for pre-Aug-2 models, C2PA credentials on `.png`/`.jpg`/`.svg` files, detection API "coming soon", ~190 signatories July 2026.
- Nature 634, pp. 818–823 (200, 2024-10-23): Dathathri et al., SynthID-Text method, production-ready watermarking preserving text quality.
- EU Commission Code of Practice page (200, 2026-07-31): "About 190 organisations signed", Anthropic listed among Section-1 signatories, assessed adequate by Commission and AI Board.
- C2PA (200): open metadata standard.
- Built page verified: `<title>`, meta description, canonical `https://news.lesbass.com/articles/claude-text-watermark-eu-ai-act-content-marking/`, og:image → hero.svg, og:image → hero.svg, `<img>` with alt + credit figcaption present. Sitemap + RSS both carry the canonical `news.lesbass.com` URL.

## Verdict

**PUBLISH_READY** — no remaining blockers. Article file and `hero.svg` are untracked in the site repo and ready for the Publisher deployment run.

Signed: QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)
