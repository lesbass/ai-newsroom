---
title: "DeepSeek ships V4-Flash-Vision-Exp — its first multimodal model, matching V4-Flash on text, adding image input"
description: "DeepSeek's experimental vision model matches V4-Flash on text tasks and adds image input at the same pricing; new Files API lets you upload once and reuse across requests."
pubDate: 2026-08-22
author: "AI Newsroom"
tags:
  - deepseek
  - deepseek-v4-flash
  - vision-exp
  - multimodal
  - image-input
  - agent-harness
  - files-api
image: "/images/articles/deepseek-v4-flash-vision-exp/benchmark-chart.png"
imageAlt: "DeepSeek benchmark chart showing V4-Flash-Vision-Exp performance on multimodal agent benchmarks, with bars comparing V4-Flash, V4-Flash-Vision-Exp, and Opus-4.8 across three evaluation tasks"
imageCredit: "Source: api-docs.deepseek.com/news/news260821 · Credit: DeepSeek AI · License: no license stated (vendor-published benchmark image)"
sources:
  - title: "DeepSeek V4-Flash-Vision-Exp Release: Multimodal API Now Live (news post, 2026-08-21)"
    url: "https://api-docs.deepseek.com/news/news260821"
    date: 2026-08-21
    type: primary
  - title: "Models & Pricing — DeepSeek API Docs (V4-Flash and V4-Flash-Vision-Exp pricing, verified 2026-08-22)"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
    date: 2026-08-22
    type: primary
  - title: "Vision Guide — DeepSeek API Docs (image input methods, token usage, limits, verified 2026-08-22)"
    url: "https://api-docs.deepseek.com/guides/vision"
    date: 2026-08-22
    type: primary
  - title: "Files API Guide — DeepSeek API Docs (upload, reuse, limits, verified 2026-08-22)"
    url: "https://api-docs.deepseek.com/guides/files_api"
    date: 2026-08-22
    type: primary
  - title: "DeepSeek Harness Quickstart — deepseek-harness.github.io (Web UI setup, verified 2026-08-22)"
    url: "https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart"
    date: 2026-08-22
    type: primary
highRiskClaims: true
---

On **2026-08-21**, DeepSeek launched `deepseek-v4-flash-vision-exp` — its first multimodal model — on the DeepSeek API platform ([news post, 2026-08-21](https://api-docs.deepseek.com/news/news260821)). The model matches V4-Flash on text capabilities (agents, reasoning, world knowledge) and adds image input at the same per-token pricing. A new Files API lets you upload images once and reuse them across requests.

The same day, DeepSeek Harness 0.1.1 shipped with out-of-the-box support for the new model ([Harness quickstart, 2026-08-22](https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart)).

## What it is

**Experimental, not production.** The `-Exp` suffix is deliberate — DeepSeek flags this as an experimental release. It supports Thinking and non-thinking modes, 1M context length, JSON output, tool calls, the Responses API, and the Anthropic API ([pricing page, 2026-08-22](https://api-docs.deepseek.com/quick_start/pricing)).

**Image input via three methods:**

- **Base64 inline** — encode and embed directly in the request (48 MiB body limit)
- **External URL** — pass an `http(s)` link; max 8192 characters, 32 MiB file, 60-second download
- **Files API `file_id`** — upload once, reference by ID; supports up to 64 MiB per image

Supported formats: JPEG, PNG, GIF, WebP. Up to 600 images per request. Images in `user` messages only — `system` and `assistant` messages return a 400 error ([vision guide, 2026-08-22](https://api-docs.deepseek.com/guides/vision)).

**Token billing for images.** Every image is resized before inference. Images below ~384x384 pixels are scaled up; larger images are scaled down to roughly 800x800 pixels. The upper bound is **384 tokens per image**, billed as input tokens at V4-Flash rates ([vision guide, 2026-08-22](https://api-docs.deepseek.com/guides/vision)).

## Pricing (verified 2026-08-22)

V4-Flash-Vision-Exp is priced identically to V4-Flash ([pricing page, 2026-08-22](https://api-docs.deepseek.com/quick_start/pricing)):

| Tier | Input (cache miss) | Input (cache hit) | Output |
|---|---|---|---|
| Off-peak | $0.22 / 1M tokens | $0.007 / 1M tokens | $0.66 / 1M tokens |
| Peak (01:00-04:00, 06:00-10:00 UTC) | $0.44 / 1M tokens | $0.014 / 1M tokens | $1.32 / 1M tokens |

At 384 tokens per image (worst case), the image cost per request is roughly $0.00008 off-peak — negligible compared to text tokens on most prompts.

## Files API: upload once, reuse everywhere

The Files API launched alongside the vision model. It is free to use ([Files API guide, 2026-08-22](https://api-docs.deepseek.com/guides/files_api)):

- Upload an image once, get a `file_id` (format: `file-api-...`)
- Reference that ID in any subsequent chat request — no re-upload needed
- Max upload size: 64 MiB. Max stored files: 10,000 per user. Max storage: 25 GiB
- Optional expiration: 1 hour to 30 days, or permanent (default)
- Supported formats: JPEG, PNG, GIF, WebP

The API works with both the OpenAI-compatible endpoint and the Anthropic-compatible endpoint (requires `anthropic-beta: files-api-2025-04-14` header).

## Benchmark claims: close to Opus-4.8 (vendor-reported)

DeepSeek's news post claims V4-Flash-Vision-Exp "brings multimodal agent performance close to Opus-4.8" on multimodal agent benchmarks ([news post, 2026-08-21](https://api-docs.deepseek.com/news/news260821)). The post includes a benchmark chart (`/img/v4_260821_benchmark_en.png`) but does not publish the underlying numbers in text.

This is a **vendor-reported claim** — no independent reproduction exists. The article does not assert the model matches or beats Opus-4.8; it quotes DeepSeek's characterization. No primary-source head-to-head comparisons vs GPT-4V, Claude, or Gemini were published alongside this release.

## What changed since V4-Flash

- **Image input added** — V4-Flash was text-only; V4-Flash-Vision-Exp adds multimodal understanding
- **Pricing unchanged** — same per-token rates as V4-Flash
- **Files API launched** — new infrastructure for image upload and reuse across requests
- **Harness 0.1.1** — same-day release with out-of-the-box model support

Prior DeepSeek coverage: [dsh agent harness](/articles/deepseek-harness-dsh/) (2026-08-19).

## Risks and caveats

- **Experimental.** The `-Exp` suffix means this is not a production-stable API. Expect changes.
- **Benchmark claim is vendor-reported.** "Close to Opus-4.8" comes from DeepSeek's own evaluation. No independent third-party benchmarks exist yet.
- **No competitor comparisons published.** The news post does not include head-to-head data vs GPT-4V, Claude, or Gemini.
- **Image token billing adds up.** At 384 tokens per image, a 10-image prompt costs ~3,840 input tokens — about $0.0008 off-peak. Multiply by request volume.
- **Files API is free but has limits.** 10,000 files, 25 GiB storage, optional 30-day expiration. Plan for cleanup if uploading at scale.

## What to watch

1. **Stable release timeline** — when does `-Exp` become GA?
2. **Independent benchmarks** — third-party evaluations on multimodal agent tasks
3. **Pricing stability** — will V4-Flash-Vision-Exp stay at V4-Flash rates after experimental phase?
4. **Harness adoption** — does 0.1.1 support drive real usage of the vision model?
5. **Competitor responses** — how do GPT-4V, Claude, and Gemini pricing/capabilities shift?

## Sources

| # | Source | Type | Date | URL |
|---|---|---|---|---|
| 1 | DeepSeek V4-Flash-Vision-Exp Release: Multimodal API Now Live | Primary | 2026-08-21 | https://api-docs.deepseek.com/news/news260821 |
| 2 | Models & Pricing — DeepSeek API Docs | Primary | 2026-08-22 | https://api-docs.deepseek.com/quick_start/pricing |
| 3 | Vision Guide — DeepSeek API Docs | Primary | 2026-08-22 | https://api-docs.deepseek.com/guides/vision |
| 4 | Files API Guide — DeepSeek API Docs | Primary | 2026-08-22 | https://api-docs.deepseek.com/guides/files_api |
| 5 | DeepSeek Harness Quickstart | Primary | 2026-08-22 | https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart |
