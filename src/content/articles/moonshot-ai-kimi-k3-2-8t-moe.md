---
title: "Moonshot AI releases Kimi K3 — a 2.8T open-weights MoE model with million-token context"
description: "Kimi K3 is a 2.8T-parameter open-weights MoE model built on Kimi Delta Attention and Attention Residuals, with 1M-token context and native vision. Weights to follow by July 27."
pubDate: 2026-07-19
author: "AI Newsroom"
tags:
  - moonshot-ai
  - kimi
  - kimi-k3
  - open-weights
  - moe
  - large-language-models
  - coding
  - multimodal
image: "/images/articles/moonshot-ai-kimi-k3-2-8t-moe/hero-desktop.png"
imageAlt: "Kimi K3 hero visual from the official announcement, showing a stylized 'Kimi K3' wordmark with a dark futuristic design and abstract blue-purple gradient patterns"
imageCredit: "Source: https://www.kimi.com/blog/kimi-k3 (2026-07-16) · Credit: Moonshot AI · License: No license stated (hosted on kimi-file.moonshot.cn)"
sources:
  - title: "Moonshot AI — Kimi K3: Open Frontier Intelligence (official blog, 2026-07-16)"
    url: "https://www.kimi.com/blog/kimi-k3"
    date: 2026-07-16
    type: primary
  - title: "Moonshot AI — GitHub organization"
    url: "https://github.com/MoonshotAI"
    type: secondary
  - title: "Moonshot AI — HuggingFace organization"
    url: "https://huggingface.co/moonshotai"
    type: secondary
  - title: "Kimi API Platform"
    url: "https://platform.kimi.ai/"
    type: secondary
  - title: "Moonshot AI — FlashKDA repository (KDA CUDA kernels, MIT license)"
    url: "https://github.com/MoonshotAI/FlashKDA"
    type: secondary
  - title: "Moonshot AI — Attention Residuals paper (arXiv:2603.15031)"
    url: "https://arxiv.org/abs/2603.15031"
    type: primary
  - title: "Moonshot AI — X announcement (2026-07-16)"
    url: "https://x.com/Kimi_Moonshot/status/2077830229968683203"
    date: 2026-07-16
    type: primary
highRiskClaims: true
---

On **2026-07-16**, Moonshot AI introduced Kimi K3, a 2.8-trillion-parameter Mixture-of-Experts model with 16 active experts out of 896 total, a 1-million-token context window, and native vision capability ([Moonshot AI, 2026-07-16](https://www.kimi.com/blog/kimi-k3)). Per Moonshot AI, it is the first openly available model at the 3T-parameter scale, with full weights promised by July 27. Kimi K3 trails proprietary frontier models Claude Fable 5 and GPT-5.6 Sol in overall capability, but outperforms every other tested model across coding, knowledge work, and agentic benchmarks.

## What happened

Kimi K3 launches on Kimi.com, the Kimi Work desktop app (v3.1.0+), Kimi Code (via `/model`), and the Kimi API at platform.kimi.ai. Pricing: $0.30/MTok cache-hit input, $3.00/MTok cache-miss input, $15.00/MTok output. The Mooncake disaggregated inference architecture drives over 90% cache hit rates in coding workloads ([Kimi API Platform](https://platform.kimi.ai/)).

The model uses max thinking effort by default; low- and high-effort modes will arrive in a later update. The full technical report is forthcoming alongside the weights release.

## Why it matters

Kimi K3 is the first open model to reach the 2.8T-parameter scale — nine of the past twelve months, Kimi models have set the open-model size record. More importantly, it demonstrates that open-weight models can now compete with proprietary systems on agentic coding and long-horizon tasks. This has practical implications for teams that need model-level auditability, custom fine-tuning, or on-premise deployment.

## Architecture highlights

Kimi K3's major architectural components ([Moonshot AI, 2026-07-16](https://www.kimi.com/blog/kimi-k3)):

- **Kimi Delta Attention (KDA)** — linear-complexity attention enabling efficient inference at 1M-token context. The FlashKDA CUDA implementation is open-source under MIT license ([FlashKDA](https://github.com/MoonshotAI/FlashKDA)).
- **Attention Residuals (AttnRes)** — selective depth-wise retrieval of representations across layers. Claims ~25% higher training efficiency at under 2% additional parameters. Published on arXiv ([2603.15031](https://arxiv.org/abs/2603.15031)).
- **Stable LatentMoE** — 16/896 expert activation with Quantile Balancing, which derives allocation from router-score quantiles rather than heuristic updates.
- **Gated MLA** — Multi-head Latent Attention variant with a gating mechanism for improved attention selectivity.
- **SiTU activation** — Sigmoid Tanh Unit replacing standard activation functions.
- **Per-Head Muon optimizer** — head-independent optimization extending the Muon algorithm.
- **Quantization-aware training** from the SFT stage: MXFP4 weights, MXFP8 activations.

The blog reports an approximate 2.5× scaling efficiency improvement over Kimi K2.

## Coding and agentic performance

Kimi K3's strongest results are in coding benchmarks. Key numbers ([Moonshot AI, 2026-07-16](https://www.kimi.com/blog/kimi-k3)):

| Benchmark | Kimi K3 | Context |
|-----------|---------|---------|
| DeepSWE v1.1 | **67.3** | With KimiCode harness |
| Arena Frontend Code | **#1** (1679 pts) | Surpassed Claude Fable 5 |
| Vals AI Index | **#2** overall | Behind Fable 5 |
| Vals Vibe Code Bench | **85.0%** | #2 overall |
| BrowseComp | **90.4** | With 1M-token context, no compaction needed |
| Vercel/Next.js Evals | **Best** | First open model to lead |

In an autonomous chip design proof of concept, K3 produced a 45nm design at 100 MHz within 4 mm² in a single 48-hour run, using open-source EDA tools. It also built MiniTriton, a from-scratch GPU compiler that matches or beats Triton and torch.compile on roofline benchmarks ([Moonshot AI, 2026-07-16](https://www.kimi.com/blog/kimi-k3)).

## Practical implications

- **Open weights (by July 27)** — teams can self-host, fine-tune, and audit the model, unlike GPT-5.6 Sol or Claude Fable 5.
- **API cost** — $3/MTok input and $15/MTok output is competitive for a model at this scale, helped by the >90% cache hit rate.
- **Deployment requirements** — the blog recommends supernode configurations with 64+ accelerators for inference, which is not a casual deployment but within reach for organizations with existing GPU clusters.
- **Kimi Code integration** — the model is available immediately via the Kimi Code CLI agent, making it practical for terminal-based coding workflows.

## Risks and caveats

1. **Weights are not yet released** — the July 27 promise is credible given Moonshot's track record (K2, K2.5, K2.6 were all released as Apache-2.0), but the actual license and availability are TBD.
2. **No independent technical report yet** — the blog provides high-level architecture descriptions but the detailed technical report is promised alongside the weights.
3. **Known limitations** ([Moonshot AI, 2026-07-16](https://www.kimi.com/blog/kimi-k3)):
   - **Thinking history sensitivity** — K3 requires preserved thinking history; harness compatibility matters.
   - **Excessive proactiveness** — may make unexpected decisions on ambiguous tasks; needs explicit behavioral constraints for bounded applications.
   - **UX gap** — the blog acknowledges a noticeable experience gap compared to Fable 5 and GPT-5.6 Sol.
4. **Benchmark harness variation** — several comparisons use different harnesses (KimiCode vs Claude Code vs Codex), which the blog's footnotes disclose but may affect cross-model comparability.
5. **Proprietary frontier gap** — K3 "still trails" Fable 5 and GPT-5.6 Sol across the overall evaluation suite.

## What to watch

1. **Weights release on July 27** — the actual license terms, model card, and community reception will determine real-world adoption.
2. **Technical report** — expected alongside weights; will clarify training data, compute budget, and detailed evaluation methodology.
3. **vLLM integration** — Moonshot has contributed KDA prefill cache support to the vLLM community, which should simplify self-hosted deployment.
4. **Ecosystem adoption** — whether fine-tuned variants, quantizations (GGUF, AWQ), and toolchain integrations appear quickly.
5. **Comparison to DeepSeek's next model** — DeepSeek V3/R1 series is the main open-weight competitor at this scale; the relative standings will shift as both release updates.
