---
title: "Mistral releases Leanstral 1.5: 119B/6B-active Apache-2.0 prover saturates miniF2F and finds 5 unknown Rust bugs at $4 per problem"
description: "Apache-2.0 119B/6B-active MoE prover from Mistral saturates miniF2F, hits SOTA on FATE-H (87%) and FATE-X (34%), and uncovers 5 previously unknown Rust bugs across 57 repos — all for about $4 per problem."
pubDate: 2026-07-04
author: "AI Newsroom"
tags: ["open-source", "open-weights", "formal-verification", "lean-4", "mistral", "leanstral", "apache-2-0", "moe", "moe-119b-6b-active", "proof-engineering", "flteval", "putnambench", "minif2f", "fate-h", "fate-x", "rust", "code-verification", "multimodal", "256k-context", "huggingface", "vllm", "cispo", "rl"]
image: "/images/articles/mistral-leanstral-1-5-proof-engineering-model/hero-desktop.png"
imageAlt: "Screenshot of the Mistral AI blog post \"Leanstral 1.5: Proof Abundance for All\" (July 2, 2026, by the Leanstral Team at Mistral AI), with the cover image and the article's opening summary describing a free Apache-2.0 6B-active MoE model that saturates miniF2F, solves 587/672 PutnamBench problems, and hits 87% / 34% on FATE-H and FATE-X."
imageCredit: "Source: https://mistral.ai/news/leanstral-1-5 · Captured 2026-07-04 via Playwright Chromium (bundled-libs pattern) · License: no license stated on Mistral's blog post cover image; screenshot used editorially for the Leanstral 1.5 article"
sources:
  - title: "Mistral AI — \"Leanstral 1.5: Proof Abundance for All\" (July 2, 2026): Apache-2.0 weights, 119B/6B-active MoE, miniF2F saturation, 587/672 PutnamBench, FATE-H 87% / FATE-X 34%, AVL-tree proof, 5 unknown Rust bugs"
    url: "https://mistral.ai/news/leanstral-1-5"
    date: 2026-07-02
    type: primary
  - title: "Hugging Face — mistralai/Leanstral-1.5-119B-A6B model card: 128 experts / 4 active MoE, 119B total / 6.5B activated, 256k context, multimodal input, Apache-2.0 license, vLLM and Mistral Vibe usage"
    url: "https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B"
    date: 2026-07-04
    type: primary
  - title: "GitHub — mistralai/FLTEval: Docker-only evaluation harness for FLT Lean tasks, Apache-2.0, sample of 162 prepared instances, mini-swe-agent config, SafeVerify manifest"
    url: "https://github.com/mistralai/FLTEval"
    date: 2026-07-04
    type: primary
highRiskClaims: true
---

On **2026-07-02**, Mistral AI released **Leanstral 1.5** — a 119B-total / 6B-active mixture-of-experts proof engineering model for [Lean 4](https://leanprover.github.io/), under **Apache-2.0** and hosted on [Hugging Face](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B) ([Mistral blog post](https://mistral.ai/news/leanstral-1-5)). Headline numbers: it **saturates miniF2F** at 100% on both validation and test sets, solves **587 of 672** PutnamBench problems, and hits a new state of the art on **FATE-H (87%)** and **FATE-X (34%)** — at about **$4 per problem**, against the **$300+** Mistral estimates for closed-source competitors.

## What shipped

Leanstral 1.5 is the second-generation release in Mistral's Leanstral line (the first is [Leanstral-2603](https://huggingface.co/mistralai/Leanstral-2603)). From the [Hugging Face card](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B): **MoE 128 experts / 4 active per token**, **119B total / 6.5B activated**, **256k context**, **multimodal input** (text + image → text), **Apache-2.0**, recommended temperature 1.0 with reasoning effort `high` for complex proofs. It ships in the [Mistral Small 4 family](https://huggingface.co/collections/mistralai/mistral-small-4) and is available as a free API endpoint (`leanstral-1-5`) and through [Mistral Vibe](https://docs.mistral.ai/getting-started/quickstarts/vibe-code/install-cli).

## How it was trained

Three stages — **mid-training, supervised fine-tuning, reinforcement learning with CISPO** — across two RL environments ([blog](https://mistral.ai/news/leanstral-1-5)). The **multiturn** environment gives the model a theorem, accepts a proof attempt, returns Lean compiler feedback, and refines until the proof compiles or the budget runs out. The **code agent** environment puts the model in a raw filesystem where it edits files, runs bash, and uses the Lean language server; it persists through context compactions to finish partial proofs, build auxiliary lemmas, and navigate real repos. Every run is verified by [Mistral's fork of SafeVerify](https://github.com/mistralai/LeanstralSafeVerify).

## Benchmarks

| Benchmark | Leanstral 1.5 | Closest closed competitor | Mistral's stated cost |
|---|---|---|---|
| **miniF2F (val/test)** | 100% / 100% | — (saturated) | — |
| **PutnamBench (672 problems)** | 587 | Seed-Prover 1.5 high: 580 | ~$4 / problem vs ~$300+ |
| **FATE-H** | 87 (SOTA) | Seed-Prover 1.5 high: 80 | — |
| **FATE-X** | 34 (SOTA) | Seed-Prover 1.5 high: 33 | — |
| **FLTEval pass@1** | 28.9 | Leanstral 1.0: 21.9 | "one-seventh the cost" of Opus 4.6 |
| **FLTEval pass@8** | 43.2 | Opus 4.6: 39.6 | — |

Mistral notes the only provers ranked higher on PutnamBench operate under different conditions — some receive natural-language proof guidance, others cost more (e.g. **Aleph Prover at $54–$68 per problem**, **Seed-Prover 1.5 high at 10 H20-days per problem**) ([blog](https://mistral.ai/news/leanstral-1-5)).

<figure>
  <img src="/images/articles/mistral-leanstral-1-5-proof-engineering-model/section-putnambench-scaling.png" alt="PutnamBench Pass@8 vs token budget. The curve climbs monotonically from 44 problems at 50k tokens to 587 at 4M, passing through 126 (100k), 244 (200k), 396 (500k), 493 (1M), and 573 (2M). Leanstral 1.5 turns compute directly into solved problems rather than giving up on long proofs." loading="lazy" decoding="async">
  <figcaption>Source: Mistral AI blog <a href="https://mistral.ai/news/leanstral-1-5/">"Leanstral 1.5: Proof Abundance for All"</a> (2026-07-02).</figcaption>
</figure>

<figure>
  <img src="/images/articles/mistral-leanstral-1-5-proof-engineering-model/section-flteval.png" alt="FLTEval pass@k performance. Leanstral 1.5 (orange) sits above Leanstral 1.0, GLM5, Kimi K2.5, and Qwen 3.5 across pass@1, pass@2, and pass@4, reaching roughly 39% at pass@4." loading="lazy" decoding="async">
  <figcaption>Source: Mistral AI blog <a href="https://mistral.ai/news/leanstral-1-5/">"Leanstral 1.5: Proof Abundance for All"</a> (2026-07-02).</figcaption>
</figure>

## Real-world code verification

Two case studies. First, an **AVL-tree insertion/deletion proof** on a real implementation. The model ran **over 2.7 million tokens across 22 compactions**, unfolded each layer of the `TimeM` monad, established an almost-tight bound of 48 steps per height unit, and connected height to tree size via a logarithmic relationship — completing verified proofs that insertion and deletion are `O(log n)`.

Second, **automatic bug discovery**. Mistral's pipeline uses [Aeneas](https://github.com/AeneasVerif/aeneas) to translate Rust to Lean, then Leanstral infers user intent, generates correctness properties, and attempts to prove them. Across **57 repositories** the pipeline flagged **47 violated properties, 11 genuine bugs, 5 previously unreported on GitHub** ([blog](https://mistral.ai/news/leanstral-1-5)).

One example: the sign function for zigzag decoding in [datrs/varinteger](https://github.com/datrs/varinteger). On input `Std.U64.MAX`, `(value + 1)` overflowed — debug-mode crashes, release-mode silent corruption. Caught without fuzzing.

Alongside the model, Mistral also **fully open-sourced the FLTEval harness** at [github.com/mistralai/FLTEval](https://github.com/mistralai/FLTEval) (Apache-2.0) — a Docker-only SWE-bench-shaped harness that applies submitted diffs inside per-task images, runs Lean and SafeVerify, and writes per-instance and aggregate reports.

## Practical implications

- **Lean 4 contributors.** Drop the weights into `vllm` (≥ 0.24.0) and run them locally, or hit `leanstral-1-5` on Mistral's free API tier. Recommended path: `vibe --agent lean` with the [Lean LSP MCP](https://github.com/oOo0oOo/lean-lsp-mcp).
- **Rust teams piloting formal verification.** The Rust-to-Lean pipeline (Aeneas + Leanstral + property generation) is a working reference for "small spec, no spec" adoption. The 5-bug hit rate across 57 repos justifies a serious pilot.
- **Proof-engineering research.** FLTEval being open-source is the more durable contribution. It runs on the real Fermat's Last Theorem pull-request history, grounding the benchmark in actual mathematical software, not synthetic problems.

## Risks and caveats

- **Benchmark saturation ≠ capability.** miniF2F is curated; the 5-bugs-across-57-repos result is the strongest signal of generalization to new Lean 4 codebases.
- **"$4 per problem" is Mistral's number.** Not directly reproducible on a third-party vLLM deployment; the $300+ comparator is also Mistral's estimate. Both are directional.
- **The 2.7M-token AVL proof is a one-shot demonstration.** Long-horizon proof quality across many runs is not reported.
- **Closed-source comparators operate under different conditions.** Higher-ranked PutnamBench provers receive natural-language guidance or run at higher per-problem cost. The SOTA framing is correct within Mistral's chosen comparison set.
- **Multimodal input is unproven for proof work.** Public evaluations are text-only.

## What to watch

1. **FLTEval adoption.** A new open benchmark lives or dies on outside reporting. The 162-instance sample is the seed; the full public dataset is meant to live on Hugging Face.
2. **Mistral Vibe as the distribution channel.** If `vibe --agent lean` becomes the default Lean 4 workflow, the practical impact will exceed the benchmark numbers.
3. **Leanstral 2.x cadence.** A 2.x bump is the natural place for test-time scaling to push past 4M tokens.
4. **Independent reproduction of the bug-finding rate.** Whether outside teams reproduce the ~10% genuine-bug rate on their own codebases is the strongest test of the practical claim.

## Sources

- [Mistral AI — "Leanstral 1.5: Proof Abundance for All" (2026-07-02)](https://mistral.ai/news/leanstral-1-5)
- [Hugging Face — mistralai/Leanstral-1.5-119B-A6B model card](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B)
- [GitHub — mistralai/FLTEval (Apache-2.0)](https://github.com/mistralai/FLTEval)
