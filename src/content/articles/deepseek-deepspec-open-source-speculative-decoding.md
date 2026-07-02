---
title: "DeepSeek releases DeepSpec: open-source full-stack for speculative decoding"
description: "DeepSeek published DeepSpec, a full-stack MIT-licensed codebase for training and evaluating draft models for speculative decoding, bundling DSpark, DFlash, and Eagle3."
pubDate: 2026-06-28
author: "AI Newsroom"
tags:
  - deepseek
  - deepspec
  - dflash
  - dspark
  - eagle3
  - speculative-decoding
  - draft-model
  - block-diffusion
  - icml-2026
  - inference-acceleration
  - qwen3
  - gemma
  - specforge
  - sglang
  - mit-license
  - open-source
  - high-risk-claim
image: "/images/articles/deepseek-deepspec-open-source-speculative-decoding/hero-desktop.png"
imageAlt: "Screenshot of the deepseek-ai/DeepSpec GitHub repository landing page on 2026-06-28, showing the README's 'Supported Algorithms' line naming DSpark, DFlash, and Eagle3, the MIT license badge, the 1,546-star / 128-fork counts, the 8-GPU hardware assumption, the 38 TB target-cache storage warning for the Qwen3-4B default, and the nine-evaluation-benchmark set (gsm8k, math500, aime25, humaneval, mbpp, livecodebench, mt-bench, alpaca, arena-hard-v2)."
imageCredit: "Source: github.com/deepseek-ai/DeepSpec · Captured 2026-06-28 via Chromium (desktop, 1280x800) using @sparticuz/chromium · License: MIT (project) / screenshot used editorially for the DeepSpec article"
sources:
  - title: "GitHub — deepseek-ai/DeepSpec (README, LICENSE, NOTICE, file listing, Supported Algorithms section, 8-GPU hardware assumption, 38 TB data-preparation warning, SpecForge / DFlash / Qwen3 / Gemma attributions, nine-benchmark evaluation set)"
    url: "https://github.com/deepseek-ai/DeepSpec"
    date: 2026-06-28
    type: primary
  - title: "GitHub REST API — repos/deepseek-ai/DeepSpec (canonical metadata: 1,546 stars, 128 forks, 2 open issues, license MIT, default branch main, has_releases false, pushed_at 2026-06-27 04:57:08 UTC, created_at 2026-06-26 12:36:05 UTC)"
    url: "https://api.github.com/repos/deepseek-ai/DeepSpec"
    date: 2026-06-28
    type: primary
  - title: "arXiv — DFlash: Block Diffusion for Flash Speculative Decoding (Jian Chen, Yesheng Liang, Zhijian Liu; v1 2026-02-05, v2 2026-05-28; 'Accepted at ICML 2026. Camera-ready version.')"
    url: "https://arxiv.org/abs/2602.06036"
    date: 2026-06-28
    type: primary
  - title: "arXiv — EAGLE-3: Scaling up Inference Acceleration of Large Language Models via Training-Time Test (Yuhui Li, Fangyun Wei, Chao Zhang, Hongyang Zhang; v1 2025-03-03, v3 2025-04-23; 'speedup ratio up to 6.5x, with about 1.4x improvement over EAGLE-2')"
    url: "https://arxiv.org/abs/2503.01840"
    date: 2026-06-28
    type: primary
highRiskClaims: true
---

On **2026-06-26**, DeepSeek created a public GitHub repository at [`deepseek-ai/DeepSpec`](https://github.com/deepseek-ai/DeepSpec) — a full-stack MIT-licensed codebase for training and evaluating speculative-decoding draft models ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). As of **2026-06-28** the repo sits at **1,546 stars, 128 forks**, with zero release tags ([GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)). Every speedup number in the article is the authors' own measurement — no independent reproduction exists.

## What it is

DeepSpec ships three draft-model implementations in one repo ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)):

- **DSpark** — DeepSeek's own new draft model. Paper ships in the repo as `DSpark_paper.pdf`; no head-to-head number against DFlash or Eagle3 in the README.
- **DFlash** — block-diffusion draft model. Per the paper: *"DFlash achieves over 6x lossless acceleration across a range of models and tasks, delivering up to 2.5x higher speedup than EAGLE-3"* ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036)). Accepted at **ICML 2026** (camera-ready).
- **Eagle3** — prior state of the art. Per its paper: *"speedup ratio up to 6.5x, with about 1.4x improvement over EAGLE-2"* ([arXiv:2503.01840, 2026-06-28](https://arxiv.org/abs/2503.01840)).

The pipeline runs in three stages: **data preparation** (downloads prompts, regenerates target answers, builds target cache — **~38 TB** for the default Qwen3-4B), **training** (one worker per visible GPU, default 8 GPUs), and **evaluation** (nine benchmarks: gsm8k, math500, aime25, humaneval, mbpp, livecodebench, mt-bench, alpaca, arena-hard-v2) ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)).

## Why it matters

**A "training day" for speculative-decoding stacks.** Before DeepSpec, building a custom draft model meant reading the Eagle3 paper, finding unofficial implementations, writing your own training loop, and reconciling target-cache formats. DeepSpec consolidates the four steps into one repo.

**DFlash is an ICML 2026 paper.** The academic marker is on the record. Camera-ready acceptance is not a benchmark reproduction, but it is the second-strongest signal in the speculative-decoding literature for the DFlash technique.

**The architectural difference.** DFlash drafts multiple tokens in a single block-diffusion forward pass; Eagle3 drafts token-by-token at the feature level. The *"up to 2.5×"* is block-diffusion drafting vs autoregressive-feature drafting in the same setup.

**The hardware floor is real.** 8 GPUs as default, 38 TB target-cache storage for Qwen3-4B. The README states both explicitly.

**Supported targets are Qwen3 and Gemma — not DeepSeek's own models.** The article does not imply DeepSeek uses DeepSpec in production for DeepSeek-V3 or DeepSeek-R1.

## Practical implications

- **Evaluating speculative-decoding stacks:** Compare DSpark vs DFlash vs Eagle3 on the same target, eval set, and hardware. DeepSpec provides the harness.
- **Training a custom draft model:** 8-GPU / 38 TB budget is the planning number for Qwen3-4B.
- **Studying speculative decoding:** Three algorithms, three papers, one repo — the previous fragmentation is resolved.
- **Wiring into a serving stack:** Only Qwen3 and Gemma targets are supported. Not DeepSeek-V3/R1 or Llama-3 at this commit.

## Risks and caveats

1. **6× and 2.5× are the DeepSeek authors' own measurements.** No independent reproduction exists as of 2026-06-28. Attribute them as authors' claims.
2. **DSpark has no headline benchmark in the README.** Paper in the repo, no published head-to-head against DFlash or Eagle3.
3. **Supported targets: Qwen3 and Gemma only.** Do not imply DeepSeek uses DeepSpec for its own models.
4. **Hardware floor: 8 GPUs, 38 TB storage.** Real and named in the README.
5. **The repo is one day old.** 10 commits, no releases, no `v0.1.0`. Breaking changes are a real possibility.
6. **"Up to 2.5×" is doing work.** Expect a per-workload spread, not a flat win.
7. **DSpark's paper contents are not separately verified.**
8. **1,546 stars is a launch spike.** Star counts at this band move by the thousand per week.

## What to watch

1. A first tagged release (currently zero releases)
2. Independent reproductions of the 6× and 2.5× numbers
3. Support for additional target models (DeepSeek-V3, DeepSeek-R1)
4. DSpark's standalone performance (first benchmark)
5. Adoption signals beyond the launch spike (blog posts, engineering write-ups)
6. A camera-ready v3 of the DFlash paper

## Verdict

DeepSpec is a real, working, one-day-old open-source speculative-decoding training stack: three draft-model implementations (DSpark, DFlash, Eagle3), 8-GPU training scripts, 38 TB target-cache storage, and evaluation across nine benchmarks. DFlash's ICML 2026 acceptance is the academic marker; the 6× and 2.5× claims are the authors' own. The first tagged release, first independent reproduction, and first DSpark head-to-head are the next-cycle signals ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec); [GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)).

## Source table

| # | Source | Type | Date | URL |
|---|---|---|---|---|
| 1 | GitHub — `deepseek-ai/DeepSpec` (README, LICENSE, NOTICE, file listing) | Primary | repo created 2026-06-26 | https://github.com/deepseek-ai/DeepSpec |
| 2 | GitHub REST API — `repos/deepseek-ai/DeepSpec` | Primary | snapshot 2026-06-28 | https://api.github.com/repos/deepseek-ai/DeepSpec |
| 3 | arXiv — DFlash: Block Diffusion for Flash Speculative Decoding | Primary | v1 2026-02-05, v2 2026-05-28 | https://arxiv.org/abs/2602.06036 |
| 4 | arXiv — EAGLE-3: Scaling up Inference Acceleration | Primary | v1 2025-03-03, v3 2025-04-23 | https://arxiv.org/abs/2503.01840 |
