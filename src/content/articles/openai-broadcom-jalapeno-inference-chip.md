---
title: "OpenAI and Broadcom unveil Jalapeño, OpenAI's first custom LLM inference chip"
description: "On 2026-06-24 OpenAI and Broadcom unveiled Jalapeño, OpenAI's first custom LLM inference chip. Lab samples run today; gigawatt-scale deployment with Microsoft is planned for 2026."
pubDate: 2026-06-25
author: "AI Newsroom"
tags:
  - openai
  - broadcom
  - jalapeno
  - inference-chip
  - custom-silicon
  - intelligence-processor
  - asic
  - celestica
  - tomahawk
  - microsoft
  - gpt-5-3-codex-spark
  - vertical-integration
  - nvidia
  - amd
  - google-tpu
  - ai-infrastructure
  - data-centers
  - ai-newsroom-coverage
image: "/images/articles/openai-broadcom-jalapeno-inference-chip/hero-desktop.png"
imageAlt: "Screenshot of the OpenAI 'OpenAI and Broadcom unveil LLM-optimized inference chip' announcement page archived by the Wayback Machine on 2026-06-24 at 20:14:46 UTC, showing the headline 'Designed to be the best inference platform for LLMs' above the section 'Nine-month tape-out, accelerated by OpenAI models'."
imageCredit: "Screenshot: OpenAI / Broadcom announcement (openai.com, 2026-06-24) — captured 2026-06-25 from the Wayback Machine archive snapshot 20260624201446 (the live openai.com URL returned HTTP 403 to a non-browser Cloudflare challenge). Credit: OpenAI. License: OpenAI published material, used for editorial commentary under fair use."
sources:
  - title: "OpenAI — 'OpenAI and Broadcom unveil LLM-optimized inference chip' (Company, 2026-06-24)"
    url: "https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
    date: 2026-06-24
    type: primary
  - title: "Wayback Machine archive snapshot of the OpenAI announcement — 2026-06-24 20:14:46 UTC"
    url: "http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
    date: 2026-06-24
    type: primary
  - title: "Broadcom (NASDAQ: AVGO) corporate site — ticker reference"
    url: "https://www.broadcom.com/"
    date: 2026-06-24
    type: secondary
  - title: "Microsoft — infrastructure and Azure page (deployment-partner context)"
    url: "https://azure.microsoft.com/"
    date: 2026-06-24
    type: secondary
highRiskClaims: true
---

On **2026-06-24**, OpenAI and Broadcom (NASDAQ: AVGO) jointly unveiled **Jalapeño**, OpenAI's first custom Intelligence Processor — a blank-slate LLM inference accelerator co-developed with Broadcom and Celestica, taken from initial design to tape-out in **nine months**, with engineering samples already running ML workloads in the lab at production target frequency and power. The first chips were physically delivered to OpenAI CEO Sam Altman and President Greg Brockman by Broadcom CEO Hock Tan and President Charlie Kawwas ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/); [Wayback Machine archive, 2026-06-24](http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

OpenAI is the first US frontier AI lab to publicly attach its name to a custom inference silicon program. The performance numbers — "substantially better" per watt and the 9-month tape-out — are **vendor claims**, not independent measurements. A detailed technical report is promised "in the coming months."

## What was announced

- **The chip.** Jalapeño is "OpenAI's first Intelligence Processor," "architected around OpenAI's vision for the future of LLM inference" and "designed from the ground up for LLM inference." Broadcom handles silicon implementation, Tomahawk networking, and scalable production systems; Celestica is the board, rack, and systems partner ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).
- **The cycle.** Co-developed "from initial design to manufacturing tape-out in just nine months," attributed to deep software/hardware co-design and "the use of OpenAI models to accelerate parts of the design and optimization process." Broadcom calls it "what we believe to be the fastest ASIC development cycle ever achieved in high-performance advanced semiconductors" — "we believe" is doing real work in that sentence.
- **The workload.** Engineering samples run a workload called **"GPT-5.3-Codex-Spark"** at production target frequency and power. That name is **a workload, not a public product**: no release date, no API availability, no pricing.
- **The performance claim.** "Performance per watt substantially better than current state-of-the-art." No benchmark, no comparison to NVIDIA H200/B200/B300 or Google TPU v6/v7. The technical report will carry the numbers.
- **The deployment plan.** Multi-generation platform, deployed at "gigawatt scale" with Microsoft and "other partners" beginning in 2026. No specific gigawatt target, no Azure regions, no contractual structure. Microsoft has not publicly named Jalapeño ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

## Load-bearing quotes

> "Jalapeño is part of our long-term full-stack infrastructure strategy to make compute more abundant, resulting in AI which is faster, more reliable, more affordable for people and businesses, and can be used to solve more important problems."
> — Greg Brockman, President and Co-Founder, OpenAI ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/))

> "Jalapeño was designed from the ground up for LLM inference. We optimized the architecture around the kernels, memory movement, networking, and serving patterns that matter most for frontier AI models."
> — Richard Ho, OpenAI hardware lead ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/))

## Why it matters

**1. OpenAI is the first US pure-model-lab to ship custom inference silicon.** Google has TPU (since 2015), Amazon has Trainium and Inferentia, but OpenAI is the first to publicly attach its name to a custom-silicon program. The comparison set for any other frontier lab considering in-house inference silicon moves from "impossible" to "table stakes."

**2. Vertical integration follows the Google TPU / Pathways pattern.** Chip architecture, kernels, memory systems, networking, scheduling, deployment, and product now sit in the same organization. Any frontier lab buying 100% of inference compute from NVIDIA is now the outlier.

**3. The 9-month tape-out is the most quotable, most contestable claim.** If independently confirmed, it would be the fastest published ASIC development cycle in high-performance semiconductors. The claim is Broadcom's, prefixed with "we believe." The technical report is the load-bearing source.

**4. Competitive pressure on NVIDIA, AMD, and Google TPU.** A frontier lab buying inference silicon from anywhere but NVIDIA changes the supplier-mix math. No benchmark exists today to size the shift.

## Practical implications

- **Do not change your OpenAI procurement plan on this announcement.** No OpenAI SKU, no pricing change, no rate-limit change is announced. The 2026 deployment is internal to OpenAI's data center partners.
- **Watch for inference-cost reductions over the next two quarters as the leading indicator.** If OpenAI is willing to claim "substantially better" per watt, the math they will eventually publish is tokens-per-watt, which translates to cost-per-token. The article does not predict a number.
- **"GPT-5.3-Codex-Spark" is a workload, not a product launch.** Treat the name as an internal workload label until OpenAI announces a Codex-Spark SKU.
- **The partnership model is the reusable pattern.** Lab (architecture + kernels) + fab-adjacent partner (silicon + networking) + systems integrator (board + rack + system) is the most copyable part of the announcement for any team shipping a frontier-AI compute stack without owning a fab.

## Risks and caveats

1. "Substantially better" is a vendor claim; no benchmark, no comparison to NVIDIA or Google TPU.
2. The 9-month tape-out is also a vendor claim, prefixed with "we believe."
3. "GPT-5.3-Codex-Spark" is a workload, not a public product — no release date, no API, no pricing.
4. "Gigawatt scale" is unspecific: no target, no timeline beyond "beginning in 2026," no per-region allocation.
5. Microsoft is named without specifics; Microsoft has not publicly named Jalapeño.
6. No shipping date, no SKU, no price. Engineering samples in the lab, running internal workloads.
7. No independent verification: no third-party benchmark, no analyst note, no research-lab measurement.

## What to watch

- The promised **technical report** — the load-bearing source for any perf claim.
- Independent benchmarks of Jalapeño in a production workload.
- Microsoft's FY2027 capex guidance for any named Jalapeño deployment volume.
- OpenAI API pricing, rate-limit, or context-window changes tied to a Jalapeño ramp.
- Other frontier labs (Anthropic, xAI, Meta, Mistral) announcing their own inference-silicon partnerships in the next 60–90 days.

## Sources

- 1. [OpenAI — "OpenAI and Broadcom unveil LLM-optimized inference chip" (2026-06-24)](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/) — primary; live URL returns HTTP 403 to a non-browser Cloudflare challenge, verified 2026-06-25 via [Wayback Machine snapshot 20260624201446](http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/).
- 2. [Wayback Machine archive snapshot — 2026-06-24 20:14:46 UTC](http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/) — primary.
- 3. [Broadcom (NASDAQ: AVGO) corporate site](https://www.broadcom.com/) — secondary, ticker reference.
- 4. [Microsoft Azure infrastructure page](https://azure.microsoft.com/) — secondary, deployment-partner context (Microsoft has not publicly named Jalapeño as of 2026-06-25).
