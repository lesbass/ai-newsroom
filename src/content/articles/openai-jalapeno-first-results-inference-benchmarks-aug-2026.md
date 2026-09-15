---
title: "OpenAI Jalapeño chip posts first benchmarks"
description: "OpenAI published first-party benchmark numbers for Jalapeño: 1.5–1.9× more AI work per watt, 1.7–3.6× lower end-to-end latency. Vendor-tested, not independent."
pubDate: 2026-08-26
language: en
author: "AI Newsroom"
tags:
  - openai
  - jalapeno
  - inference-chip
  - custom-silicon
  - benchmarks
  - inferencex
  - semianalysis
  - nvidia
  - gb200
  - gb300
  - deepseek
  - kimi
  - ai-infrastructure
  - ai-newsroom-coverage
image: "/images/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026/hero-desktop.jpg"
imageAlt: "Close-up photograph of the OpenAI Jalapeño inference chip mounted on a teal circuit board, showing the chip package and surrounding board components."
imageCredit: "Source: OpenAI (openai.com/index/jalapeno-first-results/, 2026-08-25) · Credit: OpenAI · License: OpenAI published material, used for editorial commentary under fair use"
sources:
  - title: "OpenAI — Jalapeño's first results show industry-leading speed and efficiency in AI inference (Engineering, 2026-08-25)"
    url: "https://openai.com/index/jalapeno-first-results/"
    date: 2026-08-25
    type: primary
  - title: "OpenAI — The full stack behind abundant intelligence (Company, 2026-08-25)"
    url: "https://openai.com/index/the-full-stack-behind-abundant-intelligence/"
    date: 2026-08-25
    type: primary
  - title: "AI Newsroom — AIN-633 Jalapeño first results radar (2026-08-26)"
    url: "https://news.lesbass.com/paperclip/AIN-633"
    date: 2026-08-26
    type: secondary
  - title: "AI Newsroom — AIN-634 commissioning record (2026-08-26)"
    url: "https://news.lesbass.com/paperclip/AIN-634"
    date: 2026-08-26
    type: secondary
  - title: "AI Newsroom — OpenAI and Broadcom unveil Jalapeño (AIN-206, 2026-06-25)"
    url: "https://news.lesbass.com/articles/openai-broadcom-jalapeno-inference-chip/"
    date: 2026-06-25
    type: primary
  - title: "OpenAI — OpenAI and Broadcom unveil LLM-optimized inference chip (2026-06-24)"
    url: "https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
    date: 2026-06-24
    type: primary
  - title: "OpenAI Jalapeño chip photograph (CDN asset, 2026-08-25)"
    url: "https://images.ctfassets.net/kftzwdyauwt9/3zePuVBRvgyZ4IgOwnI0jI/65ba02edadf6a0a1c33d2c2abf260fab/Jalapeno-chip-final.jpg"
    date: 2026-08-25
    type: primary
highRiskClaims: true
---

OpenAI published the first measured performance numbers for Jalapeño, its custom inference chip, on August 25. On InferenceX — a public benchmark from SemiAnalysis — Jalapeño delivered 1.5–1.9× more AI work per watt and 1.7–3.6× lower end-to-end latency than the NVIDIA systems it was compared against ([OpenAI Engineering, 2026-08-25](https://openai.com/index/jalapeno-first-results/)). These are vendor-first-party numbers, not independent measurements.

This follows [our June coverage](/articles/openai-broadcom-jalapeno-inference-chip/), where the only claim was "substantially better per watt" with no benchmark. Now there are numbers — and the caveats matter.

## What happened

On August 25, OpenAI released an engineering deep-dive ([jalapeno-first-results](https://openai.com/index/jalapeno-first-results/)) and a strategy essay by CFO Sarah Friar ([the-full-stack-behind-abundant-intelligence](https://openai.com/index/the-full-stack-behind-abundant-intelligence/)). The engineering post reports Jalapeño's InferenceX performance across GPT-OSS 120B, DeepSeek R1 670B, and Kimi K2.5 1T, compared against NVIDIA GB200 and GB300. All numbers are vendor-reported.

## Why it matters

- **First concrete numbers from custom AI silicon at a frontier lab.** Google publishes TPU benchmarks, but this is the first time a model lab previously dependent on external silicon has published measured inference results for its own chip.
- **Vendor-selected comparison.** OpenAI chose the NVIDIA systems, the benchmark, and the operating points. The framing favors Jalapeño. Independent replication is the missing piece.
- **Internal deployment only.** No SKU, no API pricing change, no external availability date.

## The measured results

All numbers are from OpenAI's InferenceX testing. Power is normalized to chip TDP: Jalapeño 700 W, GB200 1,200 W, GB300 1,400 W. Jalapeño's measured sustained power was at or below 550 W on tested workloads.

| Model | Comparison | Peak TPS/kW | End-to-end latency | Min TBT | Throughput at matched TBT |
|---|---|---|---|---|---|
| GPT-OSS 120B | vs. GB200 | ≈1.9× (85,448 vs. 44,960) | ≈1.7× lower (1.03 s vs. 1.80 s) | ≈2.7× lower (0.69 vs. 1.87 ms) | ≈53.7× more (22,935 vs. 427 mixed/kW) |
| DeepSeek R1 670B | vs. GB300 | ≈1.7× (19,641 vs. 11,781) | ≈3.6× lower (1.65 s vs. 5.99 s) | ≈4.1× lower (1.43 vs. 5.90 ms) | ≈104.3× more (12,258 vs. 118 mixed/kW) |
| Kimi K2.5 1T | vs. GB300 | ≈1.5× (18,195 vs. 11,862) | ≈3.4× lower (1.56 s vs. 5.31 s) | ≈3.8× lower (1.44 vs. 5.48 ms) | ≈56.1× more (6,744 vs. 120 mixed/kW) |

The "throughput at matched TBT" column shows how much more work Jalapeño does at the same time-to-first-token the comparison system achieves at its best. These are the widest gaps.

## How they were measured

InferenceX measures full end-to-end AI serving — prompt ingestion through response generation, not chip-level FLOPS. OpenAI tested at matched user-experience points across high-throughput to low-latency use.

The chip power caveat matters: 700 W vs. 1,200–1,400 W is chip TDP, not system-level TCO. Data-center economics depend on cooling, networking, density, and software overhead that the benchmark does not capture.

## AI in the silicon loop

OpenAI used its own models to accelerate chip design, reaching tape-out in nine months. AI-generated kernels for selected GPT-OSS attention and mixture-of-experts blocks ran 1.5–1.8× faster than human-expert implementations — selected blocks only, not the full model. Three open-weight models were brought to high performance on Jalapeño within two months using Codex with GPT-Astra.

## The path ahead

OpenAI plans to deploy Jalapeño internally by end of year — not a product launch. Gen 2 is "deep in development," Gen 3 is "taking shape." OpenAI will continue deploying NVIDIA and other partners' accelerators for training and inference.

## Practical implications

- **No API change today.** Jalapeño is internal infrastructure. Your OpenAI API usage is unaffected.
- **Watch for Q4 2026 cost reductions.** If per-watt efficiency translates to cost-per-token, OpenAI may pass savings through as it did with the [GPT-5.6 Sol price cut](/articles/openai-gpt-5-6-sol-price-drop-20-percent-aug-2026/).
- **Full-stack integration is the real signal.** The important development is that OpenAI can co-optimize model, chip, memory, network, and serving software in one organization — not any single benchmark number.

## Risks and caveats

1. **Vendor-first-party benchmarks.** No independent replication exists.
2. **Chip TDP, not system TCO.** The 700 W vs. 1,200–1,400 W comparison is chip power rating, not data-center economics.
3. **"By the end of the year" is internal.** Not a product launch or API date.
4. **Selected-block AI speedup.** The 1.5–1.8× applies to selected GPT-OSS attention and MoE blocks, not the full model.
5. **No GB300 NVL72, Blackwell Ultra, AMD MI400, or Google TPU v7 numbers.** Not in the source.
6. **Limited model coverage.** Three open-weight models; frontier OpenAI models tested internally but not published.

## What to watch

- Independent benchmarks from third-party analysts or researchers.
- OpenAI API pricing or rate-limit changes tied to Jalapeño deployment.
- Microsoft's capex guidance for any named Jalapeño volume.
- Gen 2 disclosure — timeline, process node, training capability.
- Other frontier labs' custom inference silicon responses.

## Sources

| # | Source | Date | Key claim supported |
|---|---|---|---|
| 1 | [OpenAI — Jalapeño's first results (Engineering)](https://openai.com/index/jalapeno-first-results/) | 2026-08-25 | All benchmark numbers: 1.5–1.9× TPS/kW, 1.7–3.6× latency, AI-kernel 1.5–1.8×, deployment timeline |
| 2 | [OpenAI — The full stack behind abundant intelligence (Company)](https://openai.com/index/the-full-stack-behind-abundant-intelligence/) | 2026-08-25 | Portfolio strategy, Jevons paradox framing, full-stack advantage claim |
| 3 | [AI Newsroom — AIN-633 radar](https://news.lesbass.com/paperclip/AIN-633) | 2026-08-26 | Editorial radar tracking this announcement |
| 4 | [AI Newsroom — AIN-634 commissioning](https://news.lesbass.com/paperclip/AIN-634) | 2026-08-26 | Article task commissioning record |
| 5 | [AI Newsroom — Prior Jalapeño article (AIN-206)](https://news.lesbass.com/articles/openai-broadcom-jalapeno-inference-chip/) | 2026-06-25 | Prior coverage: unveiling, "substantially better per watt" claim, 9-month tape-out |
| 6 | [OpenAI — OpenAI and Broadcom unveil LLM-optimized inference chip](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/) | 2026-06-24 | Original Jalapeño announcement and unveiling |
| 7 | [OpenAI Jalapeño chip photograph (CDN)](https://images.ctfassets.net/kftzwdyauwt9/3zePuVBRvgyZ4IgOwnI0jI/65ba02edadf6a0a1c33d2c2abf260fab/Jalapeno-chip-final.jpg) | 2026-08-25 | Article hero image asset |
