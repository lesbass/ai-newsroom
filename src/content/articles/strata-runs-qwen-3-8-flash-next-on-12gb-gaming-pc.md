---
title: "Strata runs Qwen3.8-Flash-Next on a 12GB gaming PC"
description: "Niko1221/Strata streams a ~125B-parameter MoE from RAM and SSD into a 12GB consumer GPU and serves it as a local OpenAI-/Anthropic-compatible API."
pubDate: 2026-10-10
author: "AI Newsroom"
tags: ["strata", "qwen", "qwen3-8-flash-next", "moe", "local-inference", "consumer-gpu", "open-weights"]
image: "/images/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/hero.png"
imageAlt: "Screenshot of the Niko1221/Strata GitHub repository home page showing the project title and description, a 20.2k-star and 1.8k-fork count, and the README's 'How fast is it?' table for an RTX 5070 with 12 GB of VRAM."
imageCredit: "Source: https://github.com/Niko1221/Strata · Capture date: 2026-10-10 (UTC) via Playwright Chromium · Credit: Niko1221/Strata · License: Strata repository is MIT (screenshot of the project's own page)"
canonicalURL: "https://news.lesbass.com/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/"
highRiskClaims: false
sources:
  - title: "Qwen — Qwen3.8-Flash-Next model card (architecture, 262,144 context, qwen-community-1.0 license, released 2026-08-26)"
    url: "https://huggingface.co/Qwen/Qwen3.8-Flash-Next"
    date: 2026-08-26
    type: primary
  - title: "Qwen — Qwen3.8-Flash-Next announcement (weights released 2026-08-26)"
    url: "https://qwen.ai/blog?id=qwen3.8-flash-next"
    date: 2026-08-26
    type: primary
  - title: "Alibaba Cloud — Qwen3.8-Flash-Next: A New Architecture, Towards Ultimate Cost-Efficiency (2026-08-27)"
    url: "https://www.alibabacloud.com/blog/qwen-3-8-flash-next-a-new-architecture-towards-ultimate-cost-efficiency_603501"
    date: 2026-08-27
    type: primary
  - title: "Strata — GitHub repository and README (MIT license, install steps, hardware, supported models)"
    url: "https://github.com/Niko1221/Strata"
    date: 2026-10-08
    type: primary
  - title: "Strata — docs/DETAILS.md (measured speed tables, memory tiers, API and exposure settings)"
    url: "https://github.com/Niko1221/Strata/blob/main/docs/DETAILS.md"
    date: 2026-10-08
    type: primary
  - title: "Strata — docs/COMMUNITY_BENCHMARKS.md (community run reports and report template)"
    url: "https://github.com/Niko1221/Strata/blob/main/docs/COMMUNITY_BENCHMARKS.md"
    date: 2026-10-08
    type: primary
  - title: "Strata — v0.1.41 release (published 2026-10-08)"
    url: "https://github.com/Niko1221/Strata/releases/tag/v0.1.41"
    date: 2026-10-08
    type: primary
---

Qwen released the weights of [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next), a 125-billion-parameter multimodal mixture-of-experts model, on 2026-08-26 ([Qwen](https://qwen.ai/blog?id=qwen3.8-flash-next); [Alibaba Cloud, 2026-08-27](https://www.alibabacloud.com/blog/qwen-3-8-flash-next-a-new-architecture-towards-ultimate-cost-efficiency_603501)). On 2026-10-08 the MIT-licensed [Strata](https://github.com/Niko1221/Strata) engine shipped [v0.1.41](https://github.com/Niko1221/Strata/releases/tag/v0.1.41), which makes that model runnable on a single consumer GPU with 12 GB of VRAM. It does this by keeping only the busiest experts on the card, all of them in system RAM, and a routing table on the SSD, then serving the model as a local OpenAI- and Anthropic-compatible API.

## What happened

- **Qwen opened the weights** on 2026-08-26 under the `qwen-community-1.0` license, describing it as an early preview of the architecture that will underpin Qwen4. [1][2]
- **The model card** lists 125B parameters with 6B activated per token, plus a 51B n-gram embedding and a 4B multi-token-prediction layer; 48 layers, hidden dimension 2560; 512 experts with 10 routed plus 1 shared expert active per token; a native 262,144-token context extensible to 1,000,000; and vision and video input. [1]
- **Strata shipped v0.1.41** on 2026-10-08. The repository was created on 2026-09-24, is MIT-licensed, and at capture time showed about 20.2k stars and 1.8k forks across 46 tagged releases. [4][7]

## How Strata works

Strata spreads one model across every tier of a normal PC instead of requiring a datacenter GPU. [4][5]

- **The model is 24,576 experts** (512 per layer across 48 layers). Each token routes to about 10 of them. [5]
- **VRAM** holds the attention and DeltaNet weights, routers, the output head, the KV cache, and an expert cache that fills remaining VRAM with the busiest experts and adapts as you chat.
- **System RAM** pins all 24,576 experts; the CPU computes the experts that are not cached on the GPU, in place and concurrently. [5]
- **SSD** holds the 28.8 GB n-gram table, read a few rows per token. [5]
- **The server** exposes `/v1` (OpenAI-compatible), `/v1/messages` (Anthropic-compatible, the path Claude Code uses), and `/v1/responses` (Codex CLI). The base URL is `http://127.0.0.1:8080/v1`. [4][5]

## Why it matters

Frontier open-weight models normally need hundreds of gigabytes of GPU memory. Strata's pitch is that a one-time model download replaces pay-per-token API spend, and that nothing leaves the machine. [4]

For agent builders, the practical value is a drop-in endpoint: point Claude Code at `ANTHROPIC_BASE_URL=http://127.0.0.1:8080`, or add an "OpenAI-compatible" provider, and the model behaves like a hosted API without a metered bill. Qwen's own framing centers the model family on cost efficiency at long context, which is what the local route trades against. [2]

## Try it

| Requirement | Minimum | Notes |
|---|---|---|
| GPU | 12 GB VRAM | NVIDIA RTX 20–50 series, or AMD RX 6000/7000/9000 series; 8 GB runs slowly |
| RAM | 32 GB | 64 GB recommended; RAM decides which model size fits |
| Disk | ~80 GB free | NVMe SSD strongly recommended |
| OS | Windows 10/11 or Linux | current NVIDIA or AMD driver |

Install is `START-HERE.bat` on Windows or `./setup.sh` on Linux. The installer asks which model size, how much context, and whether to read images, then downloads the model (about 70 GB) and opens the app at `http://127.0.0.1:8080`. The README warns that the first start can make the PC sluggish for 1–3 minutes while 35–55 GB loads into RAM. Sizes range from Q2_0 (fastest) to IQ3_S (best quality), plus a Coder variant that fits 32 GB. Adding another model later is `START-HERE.bat --setup`. [4][5]

## Risks and caveats

- **Speeds are vendor-reported.** Strata's own tables list the RTX 5070 12 GB writing 94 tokens/s (Q2_0) to 53 tokens/s (IQ3_S) and reading prompts at 1,620–2,650 tokens/s; the AMD RX 9070 XT 16 GB lands at 44–60 tokens/s. Independent runs live in the project's community-benchmark folder, not in these headline numbers. [5][6]
- **The Coder's "91%" is the authors' claim.** Strata's docs say the Coder variant reaches 91.3% of the full model's SWE-bench Verified score, measured by the quantization's authors. Treat it as self-reported. [4][5]
- **Localhost is open by default.** Strata listens on `127.0.0.1` with no API key, so any local process can use it. Exposing it to the LAN or a tunnel requires `--host 0.0.0.0 --api-key <secret>`; without a key, a tunnel lets anyone spend your machine. [5]
- **Quant provenance is a supply-chain surface.** The weights Strata runs come from third parties (ISTA-DASLab, UkisAI's Swift 1.5, Unsloth) plus a manually installed "OrcaRouter Uncensored" build. Verify the source before running one. [4]
- **The project is young and moving fast.** The repo is about two weeks old and GitHub reported 674 open issues and pull requests combined (293 issues, 381 PRs) at capture time, with several releases on some days. [4]
- **Two licenses apply.** Strata's code is MIT; the model weights are under Qwen's `qwen-community-1.0`. Downloading Strata does not relicense the weights. [1][4]

## What to watch

- **Independent benchmarks.** Strata's headline speeds and the Coder's SWE-bench figure are the project's own; third-party reproductions would firm up the picture.
- **The model license.** `qwen-community-1.0` terms and any restrictions on derivatives govern what you can ship with these weights.
- **Stability.** The rapid cadence brings fixes and regressions; pin a release for anything you depend on.
- **Platform parity.** Per the README, AMD cards can read images on Linux but not yet on Windows; Intel Arc, Strix Halo, and some older GPUs are community builds. [4]

## Sources

| # | Publisher | Title | Date | Type | URL |
|---|---|---|---|---|---|
| 1 | Qwen | Qwen3.8-Flash-Next model card | 2026-08-26 | Primary | https://huggingface.co/Qwen/Qwen3.8-Flash-Next |
| 2 | Qwen | Qwen3.8-Flash-Next announcement | 2026-08-26 | Primary | https://qwen.ai/blog?id=qwen3.8-flash-next |
| 3 | Alibaba Cloud | Qwen3.8-Flash-Next: A New Architecture, Towards Ultimate Cost-Efficiency | 2026-08-27 | Primary | https://www.alibabacloud.com/blog/qwen-3-8-flash-next-a-new-architecture-towards-ultimate-cost-efficiency_603501 |
| 4 | Niko1221/Strata | Repository and README | created 2026-09-24 | Primary | https://github.com/Niko1221/Strata |
| 5 | Niko1221/Strata | docs/DETAILS.md | updated 2026-10-08 | Primary | https://github.com/Niko1221/Strata/blob/main/docs/DETAILS.md |
| 6 | Niko1221/Strata | docs/COMMUNITY_BENCHMARKS.md | updated 2026-10-08 | Primary | https://github.com/Niko1221/Strata/blob/main/docs/COMMUNITY_BENCHMARKS.md |
| 7 | Niko1221/Strata | v0.1.41 release | 2026-10-08 | Primary | https://github.com/Niko1221/Strata/releases/tag/v0.1.41 |
