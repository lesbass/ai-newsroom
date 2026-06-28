---
title: "DeepSeek releases DeepSpec: open-source full-stack for training and evaluating speculative decoding draft models"
description: "On 2026-06-26 DeepSeek published github.com/deepseek-ai/DeepSpec, a full-stack MIT-licensed codebase for training and evaluating draft models for speculative decoding. The bundle ships three implementations — DSpark (new, with a paper in the repo), DFlash (block diffusion, accepted at ICML 2026, with the DeepSeek authors claiming over 6× lossless acceleration and up to 2.5× over EAGLE-3), and Eagle3 (the prior state of the art) — with 8-GPU training scripts, 38 TB of target-cache storage for the Qwen3-4B default, and evaluation across nine benchmarks. The 1,546 stars, 128 forks, single commit on main, and zero release tags as of 2026-06-28 are the load-bearing repo signals. Every speedup number in the article is the authors' own measurement — no independent reproduction is on the record as of 2026-06-28."
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
  - title: "AIN-230 — NewsScout radar sweep 2026-06-28 (the candidate brief that flagged DeepSpec to EditorInChief)"
    url: "/AIN/issues/AIN-230"
    date: 2026-06-28
    type: primary
  - title: "AIN-231 — Article candidate brief: DeepSeek DeepSpec (EditorInChief-accepted 2026-06-28; the disposition this brief is replacing)"
    url: "/AIN/issues/AIN-231"
    date: 2026-06-28
    type: primary
  - title: "AIN-164 — Correct AI Newsroom production URL (done 2026-06-25; site restored to https://news.lesbass.com/)"
    url: "/AIN/issues/AIN-164"
    date: 2026-06-25
    type: secondary
highRiskClaims: true
---

On **2026-06-26**, DeepSeek created a public GitHub repository at [`deepseek-ai/DeepSpec`](https://github.com/deepseek-ai/DeepSpec) — described in the repo's own one-liner as *"DeepSpec: a full-stack codebase for training and evaluating speculative decoding algorithms"* ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). The repo's `main` branch was last pushed **2026-06-27 04:57:08 UTC**, has no release tags, and is licensed under MIT ([GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)). As of **2026-06-28** the repository sits at **1,546 stars, 128 forks, 2 open issues**, with `default_branch: "main"`, `size: 3465 KB`, and `has_releases: false` ([GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)). The headline number in the DFlash paper — *"DFlash achieves over 6x lossless acceleration across a range of models and tasks, delivering up to 2.5x higher speedup than the state-of-the-art speculative decoding method EAGLE-3"* ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036)) — is the DeepSeek authors' own measurement. The article reads the release as a builder-facing tool story and keeps every performance number attributed to its author.

## What it is

**A training and evaluation pipeline for speculative-decoding draft models, MIT-licensed, in one repo.** The README states the contract directly: *"DeepSpec is a full-stack codebase for training and evaluating draft models for speculative decoding. It contains data preparation utilities, draft model implementations, training code, and evaluation scripts."* ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). Three stages run in order — **data preparation**, **training**, **evaluation** — and the output of each feeds the next. The data stage downloads prompts, regenerates target answers, and *"prepares the target cache (storage warning: this can be very large — roughly 38 TB for the default `Qwen/Qwen3-4B` setting)"* ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). 38 TB is the documented target-cache size for the Qwen3-4B default, not a per-epoch training cost. The training stage launches one worker per visible GPU and writes checkpoints to `~/checkpoints/<project_name>/<exp_name>/step_*`; the evaluation stage runs the draft checkpoint against nine benchmarks — `gsm8k, math500, aime25, humaneval, mbpp, livecodebench, mt-bench, alpaca, arena-hard-v2` ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). The README does not claim state-of-the-art on any of these benchmarks. It provides the harness.

**Three draft-model implementations in one bundle.** The README's *"Supported Algorithms"* section names them: *"Currently, DeepSpec includes three draft models: DSpark, DFlash and Eagle3."* ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). The repo ships a `DSpark_paper.pdf` in the repository root. DFlash links to the [arXiv paper at 2602.06036](https://arxiv.org/abs/2602.06036); Eagle3 links to the [EAGLE-3 arXiv paper at 2503.01840](https://arxiv.org/abs/2503.01840). A builder pulls the repo and gets a unified training pipeline, a unified evaluation harness, and three competing draft-model implementations under the same license.

**The three algorithms, in plain terms.** **DSpark** is the DeepSeek group's own new draft model — its paper ships in the repo as `DSpark_paper.pdf`, and the README does not report a head-to-head number against DFlash or Eagle3. **DFlash** is the DeepSeek group's block-diffusion draft model; per the paper's abstract, *"DFlash achieves over 6x lossless acceleration across a range of models and tasks, delivering up to 2.5x higher speedup than the state-of-the-art speculative decoding method EAGLE-3"* ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036)). The DFlash paper was submitted 2026-02-05 (v1) and last revised 2026-05-28 (v2); the comment on the arXiv record reads *"Accepted at ICML 2026. Camera-ready version."* ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036)). **Eagle3** is the prior state of the art in this line of work, from a different research group; per the EAGLE-3 paper's abstract, *"EAGLE-3 achieves a speedup ratio up to 6.5x, with about 1.4x improvement over EAGLE-2"* ([arXiv:2503.01840, 2026-06-28](https://arxiv.org/abs/2503.01840)).

**The license and the attributions.** *"DeepSpec is released under the MIT License. It includes code adapted from third-party projects under their own licenses; see NOTICE for the full attribution."* ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). The GitHub REST API returns the same answer at the metadata level: `license: { key: "mit", name: "MIT License", spdx_id: "MIT" }` ([GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)). The README's *"Acknowledgements"* section lists the upstream stack: [SpecForge](https://github.com/sgl-project/SpecForge) (Apache-2.0) for the training framework and Eagle3 implementation; [DFlash](https://github.com/z-lab/dflash) (MIT) for the DFlash draft-model design and training recipe; and [Qwen3](https://github.com/QwenLM/Qwen3) and [Gemma](https://github.com/google-deepmind/gemma) as the supported target model families ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). The attribution chain is honest: the training framework comes from SGLang's SpecForge, the DFlash reference implementation is from z-lab, the target model families are Qwen3 and Gemma, and DeepSeek itself contributes the DSpark algorithm, the integration glue, and the unified training recipe.

## Why it matters

**1 · A real "training day" for any team running an OpenAI-compatible or vLLM-style serving stack.** Speculative decoding is the most practical inference-latency win available today. For any team running a serving stack with a non-trivial prompt-cache hit rate, a well-tuned draft model is the single largest knob between *"fast enough"* and *"needs another H100"*. An open-source full-stack implementation from a leading independent lab lowers the barrier for any team to train a custom draft model. Before this release, the path was: read the Eagle3 paper, find an unofficial implementation, write your own training loop, write your own evaluation harness, and reconcile target-cache formats. DeepSpec is the four steps in one repo.

**2 · DFlash is an ICML 2026 paper.** The academic-credibility marker is on the record: *"Accepted at ICML 2026. Camera-ready version"* ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036)). Camera-ready acceptance is not a benchmark reproduction — keep the marker in proportion — but it is the second-strongest signal in the speculative-decoding literature for the DFlash technique. The DFlash authors (Jian Chen, Yesheng Liang, Zhijian Liu) are listed on the same arXiv abstract page; the EAGLE-3 authors (Yuhui Li, Fangyun Wei, Chao Zhang, Hongyang Zhang) are listed on theirs ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036); [arXiv:2503.01840, 2026-06-28](https://arxiv.org/abs/2503.01840)).

**3 · The architectural reason DFlash can claim a higher speedup than Eagle3.** Per the DFlash abstract, *"DFlash, a speculative decoding framework that employs a lightweight block diffusion model for parallel drafting. By generating draft tokens in a single forward pass and conditioning the draft model on context features extracted from the target model, DFlash enables efficient drafting with high-quality outputs and higher acceptance rates."* ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036)). The *"single forward pass"* is the load-bearing word. EAGLE-3, per its own abstract, *"abandons feature prediction in favor of direct token prediction and replaces reliance on top-layer features with multi-layer feature fusion via a technique named training-time test"* ([arXiv:2503.01840, 2026-06-28](https://arxiv.org/abs/2503.01840)). DFlash drafts multiple tokens in one block-diffusion pass; Eagle3 drafts token-by-token at the feature level. The architectural difference is *"block diffusion vs autoregressive at the feature level"*, and the *"up to 2.5×"* in the DFlash paper is the speedup of block-diffusion drafting over autoregressive-feature drafting in the same setup.

**4 · The hardware floor is real and named.** *"Hardware: the default configs and scripts assume a single node with 8 GPUs. For fewer GPUs, reduce `CUDA_VISIBLE_DEVICES`."* ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). Combined with the 38 TB target-cache storage warning for the Qwen3-4B default, the implied minimum budget to reproduce the headline numbers is a single 8-GPU node plus a 38 TB local storage target. The README states both; the article does not paper over them.

**5 · The supported target models are Qwen3 and Gemma, not DeepSeek's own.** The README's Acknowledgements section names *"Qwen3 and Gemma — the target model families supported in this repo"* ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). The article does not imply that the lab itself is using DeepSpec to draft for DeepSeek-V3 or DeepSeek-R1. A future commit adding DeepSeek's own family as targets would be the signal that the lab is dogfooding the codebase.

## Practical implications

**For the engineer evaluating speculative-decoding stacks today, the right comparison is "DSpark vs DFlash vs Eagle3 on the same target, on the same eval set, on the same hardware."** DeepSpec provides the harness to make that comparison reproducible — same training script, same evaluation script, same nine-benchmark set, same `Qwen/Qwen3-4B` target by default. The headline numbers in the papers are starting points for that comparison, not conclusions.

**For a team training a custom draft model against Qwen3 or Gemma, the 8-GPU / 38 TB budget is the planning number.** The training script launches one worker per visible GPU; checkpoints land in `~/checkpoints/<project_name>/<exp_name>/step_*`; the evaluation script reads the latest checkpoint ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). A team that already runs Qwen3-4B inference has the storage shape; a team that does not has a 38 TB procurement problem to think about.

**For a researcher studying speculative decoding, the three-algorithm bundle is the reproducible substrate.** The DFlash paper is on arXiv (2602.06036), the EAGLE-3 paper is on arXiv (2503.01840), the DSpark paper is in the repo (`DSpark_paper.pdf`), and the implementation is in the same repo for all three. The previous fragmentation was three papers behind three different unofficial implementations; DeepSpec consolidates the implementation surface while keeping the three papers as the source of truth for the architectural claims.

**For a builder wiring a custom draft model into a serving stack, the relevant target families are Qwen3 and Gemma.** If the production target is a DeepSeek-V3 or DeepSeek-R1 serving stack, DeepSpec does not, at this commit, support that path. A team running a Llama-3 serving stack is in the same position. The supported target is `Qwen/Qwen3-4B`; the second supported family is Gemma. Plan accordingly.

**For a buyer evaluating open-source inference-acceleration stacks, the "speedup over autoregressive" comparison is the wrong yardstick on day one.** The right yardstick is *"DSpark / DFlash / Eagle3 on my model on my hardware on my workload."* The 6× and 2.5× numbers in the DFlash paper are the authors' own measurements, on the authors' own evaluation set, on the authors' own setup.

## Risks and caveats

1. **The 6× and 2.5× are the DeepSeek authors' own measurements.** The paper's abstract states both numbers; no independent reproduction is on the record as of 2026-06-28. Attribute them: *"the DeepSeek authors report over 6× lossless acceleration"* and *"the paper claims up to 2.5× over EAGLE-3"* — never *"DFlash is 6× faster than autoregressive decoding."* Treat the EAGLE-3 6.5× and 1.4×-over-EAGLE-2 numbers the same way.

2. **DSpark ships with a paper in the repo but no headline benchmark in the README.** The article does not invent a DSpark number. DSpark is *"the third implementation in the bundle, paper in the repo, no published head-to-head against DFlash or Eagle3 as of 2026-06-28."* A follow-up can pick up a DSpark benchmark if and when one lands in the README.

3. **The supported target models are Qwen3 and Gemma.** The README names those two families only ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). The article does not imply that DeepSeek uses DeepSpec in production for its own DeepSeek-V3 / DeepSeek-R1 line.

4. **The hardware floor is real and named.** 8 GPUs as the default-config assumption, 38 TB target-cache storage for the Qwen3-4B default ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec)). A builder who needs to reproduce the headline numbers needs both. A team that plans to run the eval on fewer GPUs needs to know that the configs and the parallelism story were tuned at 8.

5. **The repo is one day old.** 10 commits in total per the API, no releases published, no `v0.1.0` ([GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)). The article does not present DeepSpec as a v1.0 product. *"Open-source codebase, first commit 2026-06-26"* is the only acceptable framing. Breaking changes between commits are a real possibility for the next 60 days.

6. **The DFlash paper claims *"up to 2.5× over EAGLE-3"* and *"higher acceptance rates"* — the *"up to"* is doing work.** DFlash is described in the abstract as a *"speculative decoding framework that employs a lightweight block diffusion model for parallel drafting."* The architectural choice has trade-offs the paper itself does not enumerate in the abstract. A builder choosing between DFlash and Eagle3 should expect a per-workload spread, not a flat win.

7. **DSpark's paper (`DSpark_paper.pdf`) is in the repo but its contents are not separately verified in this article.** The article reports DSpark as *"paper in the repo, contents not separately verified here."* If the DSpark paper's specific claims become load-bearing for a follow-up, the next article will pull them directly from the PDF.

8. **The 1,546-star count is a launch spike.** Star counts at this band move by the thousand per week. Re-verify the headline number at the time of reading.

## What to watch

1. **A first tagged release.** The repo has no releases as of 2026-06-28 ([GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)). The first semantic-version tag will mark the first *"this is intended for use"* milestone. Watch [`github.com/deepseek-ai/DeepSpec/releases`](https://github.com/deepseek-ai/DeepSpec/releases).

2. **Independent reproductions of the 6× and 2.5× numbers.** Academic and third-party evaluation labs will run DFlash on the published evaluation set against the published target models. Until a reproduction lands, the numbers in the paper are the DeepSeek authors' own. The next-cycle story is the first external reproduction — particularly on a target outside the paper's evaluation grid.

3. **Support for additional target models.** Whether DeepSeek adds support for its own model family (DeepSeek-V3, DeepSeek-R1) will determine whether the lab is using DeepSpec in production. A new entry in the README's *"Acknowledgements"* section listing DeepSeek models is the signal.

4. **DSpark's standalone performance.** DSpark ships in the repo with its own paper but the README does not state a head-to-head number against DFlash or Eagle3. The next-cycle story is the first DSpark benchmark — either a README update or a follow-up paper.

5. **Adoption signals beyond the launch spike.** The first external *"we trained a custom draft model with DeepSpec"* write-up — a blog post, a company engineering write-up, or a downstream PR — is the signal worth watching. Watch the issue tracker and the first batch of community-contributed draft-model configs.

6. **A camera-ready v3 of the DFlash paper.** v2 is the current camera-ready on 2026-06-28 ([arXiv:2602.06036, 2026-06-28](https://arxiv.org/abs/2602.06036)). A v3 with extra ablations or extra target-model coverage would be a direction signal for the technique.

## Verdict

On **2026-06-26**, DeepSeek published [`deepseek-ai/DeepSpec`](https://github.com/deepseek-ai/DeepSpec) — a full-stack MIT-licensed codebase for training and evaluating speculative-decoding draft models, bundling three implementations (**DSpark, DFlash, Eagle3**), 8-GPU training scripts, 38 TB target-cache storage for the Qwen3-4B default, and evaluation across nine benchmarks ([README, 2026-06-28](https://github.com/deepseek-ai/DeepSpec); [GitHub REST API, 2026-06-28](https://api.github.com/repos/deepseek-ai/DeepSpec)). The DFlash paper at [arXiv:2602.06036](https://arxiv.org/abs/2602.06036) — *"Accepted at ICML 2026. Camera-ready version"* — is the academic-credibility marker; the *"over 6× lossless acceleration"* and *"up to 2.5× higher speedup than … EAGLE-3"* claims are the DeepSeek authors' own measurements on the paper's own setup. The 1,546 stars, 128 forks, zero release tags, and the supported Qwen3 / Gemma target families are the repo signals. The takeaway is the **bundle, not the headline number**: an MIT-licensed, three-algorithm, Qwen3-and-Gemma-targeting speculative-decoding training codebase, with the architectural reason for the DFlash speedup on the record (block diffusion) and the EAGLE-3 baseline on the record (autoregressive at the feature level, 6.5× self-reported, [arXiv:2503.01840, 2026-06-28](https://arxiv.org/abs/2503.01840)). The first tagged release, the first independent reproduction of the 6× / 2.5×, and the first DSpark head-to-head benchmark are the next-cycle signals. *A real, working, one-day-old open-source speculative-decoding training stack, with three competing draft-model implementations, an ICML 2026 paper, and an 8-GPU / 38 TB budget floor. Read the README, watch the releases page, and run the comparison on the model you are actually serving.*

## Source table

| # | Source | Type | Date | URL | Status |
|---|---|---|---|---|---|
| 1 | GitHub — `deepseek-ai/DeepSpec` (README, LICENSE, NOTICE, file listing) | Primary | repo created 2026-06-26, last push 2026-06-27 | https://github.com/deepseek-ai/DeepSpec | Live-verified 2026-06-28 via webfetch (full README extracted, including the Supported Algorithms section naming DSpark / DFlash / Eagle3, the 38 TB data-preparation warning, the 8-GPU hardware assumption, the MIT LICENSE, the SpecForge / DFlash / Qwen3 / Gemma attributions, and the 9-benchmark evaluation set); GitHub repo page captured 2026-06-28 via Chromium (desktop 1280×800 and mobile 375×812) |
| 2 | GitHub REST API — `repos/deepseek-ai/DeepSpec` | Primary | snapshot 2026-06-28 | https://api.github.com/repos/deepseek-ai/DeepSpec | Live-verified 2026-06-28 (returns `stargazers_count: 1546, forks_count: 128, open_issues_count: 2, default_branch: "main", license: { key: "mit", name: "MIT License", spdx_id: "MIT" }, has_releases: false, size: 3465 KB, created_at: 2026-06-26 12:36:05Z, pushed_at: 2026-06-27 04:57:08Z`; 10 commits on `main`; topics empty; no homepage) |
| 3 | arXiv — "DFlash: Block Diffusion for Flash Speculative Decoding" (Jian Chen, Yesheng Liang, Zhijian Liu) | Primary | v1 2026-02-05, v2 2026-05-28; "Accepted at ICML 2026. Camera-ready version" | https://arxiv.org/abs/2602.06036 | Live-verified 2026-06-28 via webfetch (full abstract extracted, including the 6× and 2.5× claims, the block-diffusion framing, the ICML 2026 acceptance comment, and the author list) |
| 4 | arXiv — "EAGLE-3: Scaling up Inference Acceleration of Large Language Models via Training-Time Test" (Yuhui Li, Fangyun Wei, Chao Zhang, Hongyang Zhang) | Primary | v1 2025-03-03, v3 2025-04-23 | https://arxiv.org/abs/2503.01840 | Live-verified 2026-06-28 via webfetch (EAGLE-3's own abstract: "speedup ratio up to 6.5x, with about 1.4x improvement over EAGLE-2"; for context only, not a data source for the headline DFlash claim) |
| 5 | AIN-230 — NewsScout radar sweep 2026-06-28 | Primary | 2026-06-28 | /AIN/issues/AIN-230 | Local; the radar sweep that flagged the candidate to the EditorInChief |
| 6 | AIN-231 — Article candidate brief (this issue, accepted by EditorInChief on 2026-06-28) | Primary | 2026-06-28 | /AIN/issues/AIN-231 | Local; the editorial disposition that this brief is replacing |
| 7 | AIN-164 — Correct AI Newsroom production URL | Secondary | 2026-06-25 (`done`) | /AIN/issues/AIN-164 | Local; the site is restored to `https://news.lesbass.com/`, so the article can be committed to `src/content/articles/...` after QualityGate approval |
