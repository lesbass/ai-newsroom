---
title: "Cohere ships North Small Translate — a 218B/25B-active MoE translation model that claims an 83.6 on Cohere-run WMT26 benchmarks for under a millidollar per task"
description: "Cohere's first North-family translation model is a 218B/25B-active MoE under CC BY-NC 4.0. Cohere-run WMT26 tests score it 83.6; the eval method is GPT-5.6-Sol as judge."
pubDate: 2026-09-12
author: "AI Newsroom"
tags:
  - cohere
  - north-small-translate
  - machine-translation
  - moe
  - open-weights
  - wmt26
image: /images/articles/cohere-north-small-translate/hero.png
imageAlt: "Screenshot of the Cohere blog post announcing North Small Translate, showing the model card and WMT26 benchmark comparison chart"
imageCredit: "Source: cohere.com/blog/north-small-translate · Credit: Cohere · License: no license stated (vendor-published blog)"
sources:
  - title: "Introducing North Small Translate: A leading sovereign open-weight machine translation model (Cohere blog, 2026-09-10)"
    url: "https://cohere.com/blog/north-small-translate"
    date: 2026-09-10
    type: primary
  - title: "CohereLabs/North-Small-Translate-1.0 — Hugging Face model card"
    url: "https://huggingface.co/CohereLabs/North-Small-Translate-1.0"
    date: 2026-09-10
    type: primary
  - title: "WMT26 General Machine Translation shared task page"
    url: "https://www2.statmt.org/wmt26/translation-task.html"
    date: 2026-08-05
    type: primary
  - title: "RWS and Cohere build top-performing AI language intelligence (Cohere blog, 2026-06-01)"
    url: "https://cohere.com/blog/rws-and-cohere-build-ai-language-intelligence"
    date: 2026-06-01
    type: primary
highRiskClaims: true
---

On 2026-09-10, Cohere published ["Introducing North Small Translate"](https://cohere.com/blog/north-small-translate) — its first translation model in the North family — and opened [`CohereLabs/North-Small-Translate-1.0`](https://huggingface.co/CohereLabs/North-Small-Translate-1.0) on Hugging Face under CC BY-NC 4.0. The model is a sparse Mixture-of-Experts transformer with 218B total parameters (25B active) across 50+ languages, and Cohere claims it beats DeepL NextGen and Google Translate on a self-run "WMT26 all-languages benchmark" using GPT-5.6-Sol as judge.

## What happened

- **Release date:** 2026-09-10 ([Cohere blog, 2026-09-10](https://cohere.com/blog/north-small-translate))
- **License:** CC BY-NC 4.0 with Acceptable Use Policy addendum ([HF model card](https://huggingface.co/CohereLabs/North-Small-Translate-1.0))
- **Architecture:** 218B total / 25B active sparse MoE — 128 experts, 8 activated per token, plus shared experts ([HF model card](https://huggingface.co/CohereLabs/North-Small-Translate-1.0))
- **Context:** 16K input, 16K output ([HF model card](https://huggingface.co/CohereLabs/North-Small-Translate-1.0))
- **Languages:** 50 across Europe, MENA, South Asia, Southeast Asia, and East Asia (full list in the [model card](https://huggingface.co/CohereLabs/North-Small-Translate-1.0))
- **Partner:** Built with RWS, specifically Language Weaver's research and science teams ([Cohere blog, 2026-06-01](https://cohere.com/blog/rws-and-cohere-build-ai-language-intelligence)); commercial path is RWS Language Weaver or Cohere sales
- **Lineage:** First translation model in the North family; ancestors include Tiny Aya and Command A Translate ([Cohere blog, 2026-09-10](https://cohere.com/blog/north-small-translate))

North Small Translate is gated behind a click-through on Hugging Face requiring agreement to the License Agreement, Cohere Labs AUP, and Cohere Privacy Policy.

## Why it matters

**Open-weight translation at sub-millidollar cost.** Cohere reports a score of **83.60** on its own "WMT26 all-languages benchmark," ahead of DeepL NextGen (81.37), Qwen 3.5 397B A17B (81.56), Gemma 4 31B (79.46), GLM 5.2 FP8 (76.50), and Google Translate (68.20) ([Cohere blog, 2026-09-10](https://cohere.com/blog/north-small-translate)). An agentic multi-pass variant scores **84.36**. The commercial cost line is **$0.000676 per task** at an 80.1 score, compared to $0.038928 for Gemini 3.1 Pro Preview on the same run — a 5,762× difference per Cohere's numbers.

**Throughput claim.** Cohere reports up to **1.4× higher output throughput** than Gemma 4 31B TP1 under identical hardware: 112 vs 81 output tokens per second at low concurrency, 39 vs 30 TOPS at high concurrency ([Cohere blog, 2026-09-10](https://cohere.com/blog/north-small-translate)).

**Sovereign-AI framing.** Cohere positions this as part of its sovereign-AI push — a self-hostable translation model for governments and regulated buyers. The CC BY-NC 4.0 license restricts commercial use; commercial deployment goes through RWS Language Weaver or Cohere's sales team.

## Architecture

Decoder-only sparse MoE Transformer: **218B total / 25B active**, 128 experts (8 activated per token) with shared experts. Sliding-window attention (window 4096) with RoPE interleaved with global attention in a 3:1 ratio — the same pattern from Command A. 16K input, 16K output, text → text ([HF model card](https://huggingface.co/CohereLabs/North-Small-Translate-1.0)).

The router uses sigmoid activation over expert logits, normalized over top-k. All three quantization checkpoints (BF16, FP8, NVFP4 W4A16) are the production weights. Minimum hardware: 1× B200 or 2× H100 at W4A16; up to 4× B200 / 8× H100 at BF16 ([HF model card](https://huggingface.co/CohereLabs/North-Small-Translate-1.0)).

## Benchmark numbers — and how they were measured

The headline score is **83.60** across all languages on what Cohere labels "WMT26 benchmarks" ([Cohere blog, 2026-09-10](https://cohere.com/blog/north-small-translate)). But the evaluation method is critical: Cohere ran its own benchmark using **GPT-5.6-Sol as a judge** ([Cohere blog, footnote 1](https://cohere.com/blog/north-small-translate)). This is not the official WMT26 shared task.

The [official WMT26 General MT task](https://www2.statmt.org/wmt26/translation-task.html) uses **human evaluation** ("All systems will be human evaluated") and does not release automatic preliminary results. WMT26 results have not been published as of 2026-09-12 — the conference is 28-29 October 2026 in Budapest. The 83.60 number is Cohere's own GPT-5.6-Sol-judged run, not an official WMT26 shared-task score.

Cohere also reports a long-context score of **48.9** (measured via xComet-XL on two-chapter book translation), compared to 21.3 for Google Translate and 19.4 for Gemma 4 31B ([Cohere blog, 2026-09-10](https://cohere.com/blog/north-small-translate)).

Regional averages from the same Cohere run show North Small Translate beating Gemma 4 31B in Europe (82.2 vs 73.9) and running roughly even in South Asia (86.2 vs 86.7). Against DeepL NextGen, the largest gaps are in South Asia and MENA (~8-10 points), with the narrowest edge in East Asia (~1-3 points).

## Practical implications

- **Self-hostable.** Weights are on Hugging Face under CC BY-NC 4.0. Three quantization tiers are available (BF16, FP8, NVFP4 W4A16). The minimum is 1× B200 or 2× H100 at W4A16.
- **Production inference.** Cohere recommends greedy decoding (matching its production setup). The model can run via transformers, vLLM, or the Hugging Face Space demo. Cohere's `melody` library is needed for response parsing.
- **Commercial path.** CC BY-NC 4.0 means research and non-commercial use only. Enterprise deployments go through RWS Language Weaver or Cohere sales.
- **50 languages.** The model covers 32 high-resource and 18 additional languages, with no sharp regional drop-offs that smaller models typically show.

## Risks and caveats

- **Vendor-run benchmark.** The 83.60 score, throughput, cost, and regional breakdowns are all Cohere-reported. No independent verification exists.
- **GPT-5.6-Sol as judge.** The headline number depends on the judge model's calibration, not human evaluation. The official WMT26 shared task uses human evaluation and has not published results — the conference is 28-29 October 2026.
- **CC BY-NC 4.0.** Non-commercial use only. Commercial deployment requires RWS Language Weaver or Cohere sales.
- **Tom Kocmi dual role.** A Cohere employee organizes WMT26 ([WMT26 page](https://www2.statmt.org/wmt26/translation-task.html)) — relevant context, not an endorsement of the self-run benchmark.

## What to watch

- Official WMT26 human-evaluated results (October 2026)
- Independent reproductions of the Cohere-run benchmark
- CC BY-NC license impact on adoption vs permissively licensed alternatives
- RWS Language Weaver enterprise uptake

## Sources

| # | Source | Type | Date | URL |
|---|---|---|---|---|
| 1 | Cohere — "Introducing North Small Translate" blog post | Primary | 2026-09-10 | https://cohere.com/blog/north-small-translate |
| 2 | Hugging Face — CohereLabs/North-Small-Translate-1.0 model card | Primary | 2026-09-10 | https://huggingface.co/CohereLabs/North-Small-Translate-1.0 |
| 3 | WMT26 General Machine Translation shared task page | Primary | 2026-08-05 | https://www2.statmt.org/wmt26/translation-task.html |
| 4 | Cohere — "RWS and Cohere build top-performing AI language intelligence" | Primary | 2026-06-01 | https://cohere.com/blog/rws-and-cohere-build-ai-language-intelligence |
