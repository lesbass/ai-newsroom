---
title: "Mistral opens Leanstral 1.5: 6B-active Apache-2.0 Lean 4 prover"
description: "Apache-2.0 Leanstral 1.5 (119B/6B MoE) saturates miniF2F, hits 587/672 PutnamBench, sets SOTA on FATE-H and FATE-X, and finds 5 unknown bugs in 57 Rust repos — at ~$4 per problem."
slug: leanstral-mistral-open-source-proof-engineering
pubDate: 2026-07-04
author: "AI Newsroom"
tags:
  - mistral
  - leanstral
  - proof-engineering
  - formal-verification
  - lean-4
  - open-source
  - apache-2-0
  - moe
  - moe-119b-6b-active
  - cispo
  - flteval
  - putnambench
  - minif2f
  - fate-h
  - fate-x
  - rust
  - code-verification
  - 256k-context
  - huggingface
  - vllm
  - rl
image: "/images/articles/mistral-leanstral-1-5-proof-engineering-model/hero-desktop.png"
imageAlt: "Screenshot of the Mistral AI blog post \"Leanstral 1.5: Proof Abundance for All\" (July 2, 2026, by the Leanstral Team at Mistral AI), with the cover image and the article's opening summary describing a free Apache-2.0 6B-active MoE model that saturates miniF2F, solves 587/672 PutnamBench problems, and hits 87% / 34% on FATE-H and FATE-X."
imageCredit: "Source: https://mistral.ai/news/leanstral-1-5 · Captured 2026-07-04 via Playwright Chromium (bundled-libs pattern) · License: no license stated on Mistral's blog post cover image; screenshot used editorially for the Leanstral 1.5 article"
sources:
  - title: "Mistral AI — \"Leanstral 1.5: Proof Abundance for All\" — 2026-07-02"
    url: "https://mistral.ai/news/leanstral-1-5/"
    date: 2026-07-02
    type: primary
  - title: "Hugging Face — mistralai/Leanstral-1.5-119B-A6B model card — 2026-07-02"
    url: "https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B"
    date: 2026-07-02
    type: primary
  - title: "Mistral AI — Leanstral 1.5 API model card (`leanstral-1-5` endpoint) — 2026-07-02"
    url: "https://docs.mistral.ai/models/model-cards/leanstral-1-5"
    date: 2026-07-02
    type: primary
  - title: "GitHub — mistralai/FLTEval (open-source benchmark) — 2026-07-02"
    url: "https://github.com/mistralai/FLTEval"
    date: 2026-07-02
    type: primary
  - title: "GitHub — mistralai/LeanstralSafeVerify (Mistral's fork of SafeVerify) — 2026-07-02"
    url: "https://github.com/mistralai/LeanstralSafeVerify"
    date: 2026-07-02
    type: primary
  - title: "GitHub — datrs/varinteger (U64 overflow case) — 2026-07-02"
    url: "https://github.com/datrs/varinteger"
    date: 2026-07-02
    type: primary
  - title: "Lean 4 reference site (the proof assistant Leanstral targets)"
    url: "https://leanprover.github.io/"
    type: secondary
  - title: "GitHub — oOo0oOo/lean-lsp-mcp (the optional MCP integration)"
    url: "https://github.com/oOo0oOo/lean-lsp-mcp"
    type: secondary
  - title: "AI Newsroom — sitemap (no prior Leanstral or Mistral article on news.lesbass.com before 2026-07-04)"
    url: "https://news.lesbass.com/sitemap.xml"
    date: 2026-07-04
    type: secondary
highRiskClaims: false
canonicalURL: "https://news.lesbass.com/articles/leanstral-mistral-open-source-proof-engineering/"
---

[Mistral AI](https://mistral.ai/news/leanstral-1-5/) released **Leanstral 1.5** on 2026-07-02 — an Apache-2.0, 119B/6B-active MoE for proof engineering in [Lean 4](https://leanprover.github.io/). It saturates miniF2F, solves **587 of 672 PutnamBench** problems, sets SOTA on FATE-H (87%) and FATE-X (34%), and lifts FLTEval pass@8 from 31.9 to 43.2 — past Opus 4.6's 39.6 at ~1/7 the cost. Weights are on [Hugging Face](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B); a free `leanstral-1-5` API is live.

<figure>
  <img src="/images/articles/mistral-leanstral-1-5-proof-engineering-model/hero-desktop.png" alt="Screenshot of the Mistral AI blog post \"Leanstral 1.5: Proof Abundance for All\" (July 2, 2026, by the Leanstral Team at Mistral AI), with the cover image and the article's opening summary describing a free Apache-2.0 6B-active MoE model that saturates miniF2F, solves 587/672 PutnamBench problems, and hits 87% / 34% on FATE-H and FATE-X." loading="lazy" decoding="async">
  <figcaption>Source: <a href="https://mistral.ai/news/leanstral-1-5">Mistral AI — "Leanstral 1.5: Proof Abundance for All"</a> (2026-07-02). Editorial screenshot.</figcaption>
</figure>

## What happened

Leanstral 1.5 is the second-generation release in Mistral's Leanstral line (the first is [Leanstral-2603](https://huggingface.co/mistralai/Leanstral-2603)). It is a **119B/6B-active MoE** — **128 experts / 4 active per token**, **256k context**, **multimodal input** (text + image → text) — small enough for one consumer node, large enough to learn deep proof structure ([Mistral blog, 2026-07-02](https://mistral.ai/news/leanstral-1-5/)). Training runs **mid-training → SFT → RL with CISPO** in two custom environments that return feedback from a real Lean compiler.

The **multiturn Lean verifier** gives the model a theorem, returns the Lean compiler's verdict, and loops until the proof compiles. The **code agent environment** gives it a filesystem, bash, and the Lean language server; it edits files, builds auxiliary lemmas, and survives many rounds of context compaction. Final proofs are checked by [Mistral's fork of SafeVerify](https://github.com/mistralai/LeanstralSafeVerify).

## Why it matters

1. **Open weights.** Apache-2.0 means anyone can run, fine-tune, or audit; Seed-Prover 1.5 and Aleph Prover are API-only.
2. **Consumer hardware.** 6B active parameters fit on one high-memory workstation; Mistral puts Seed-Prover 1.5 high at 10 H20-days per problem.
3. **A working install path** via Mistral Vibe → `/leanstall` → `vibe --agent lean`, plus an optional Lean LSP MCP.
4. **FLTEval is now open source** — [released](https://github.com/mistralai/FLTEval) alongside the model as a community yardstick for *real-PR* proof engineering.

## Benchmarks and cost

All numbers from the [Mistral blog post, 2026-07-02](https://mistral.ai/news/leanstral-1-5/).

| Benchmark | Leanstral 1.5 | Best open | Best closed |
| --- | --- | --- | --- |
| miniF2F (val + test) | **100% / 100%** | n/a | n/a |
| PutnamBench (of 672) | **587** | A-ProverBase 365 | Aleph Prover 668; Seed-Prover 1.5 high 580 |
| FATE-H | **87** (SOTA) | A-ProverBase 66 | Seed-Prover 1.5 high 80 |
| FATE-X | **34** (SOTA) | A-ProverBase 24 | Seed-Prover 1.5 high 33 |
| FLTEval pass@1 / pass@8 | **28.9 / 43.2** | 21.9 / 31.9 | Opus 4.6: 39.6 pass@8 (~7× the cost) |

**Cost framing (vendor estimates).** Mistral reports **~$4 per PutnamBench problem** for Leanstral 1.5, **$300+ per problem** for Seed-Prover 1.5 high, **$54–68 per problem** for Aleph Prover. No closed prover publishes per-problem cost independently.

**Test-time scaling.** PutnamBench Pass@8 climbs monotonically with per-attempt tokens: **44 at 50k → 244 at 200k → 493 at 1M → 587 at 4M**. Not plateauing at 4M.

<figure>
  <img src="/images/articles/mistral-leanstral-1-5-proof-engineering-model/section-putnambench-scaling.png" alt="PutnamBench Pass@8 vs token budget. The curve climbs monotonically from 44 problems at 50k tokens to 587 at 4M, passing through 126 (100k), 244 (200k), 396 (500k), 493 (1M), and 573 (2M). Leanstral 1.5 turns compute directly into solved problems rather than giving up on long proofs." loading="lazy" decoding="async">
  <figcaption>Source: Mistral AI blog <a href="https://mistral.ai/news/leanstral-1-5/">"Leanstral 1.5: Proof Abundance for All"</a> (2026-07-02).</figcaption>
</figure>

<figure>
  <img src="/images/articles/mistral-leanstral-1-5-proof-engineering-model/section-flteval.png" alt="FLTEval pass@k performance. Leanstral 1.5 (orange) sits above Leanstral 1.0, GLM5, Kimi K2.5, and Qwen 3.5 across pass@1, pass@2, and pass@4, reaching roughly 39% at pass@4." loading="lazy" decoding="async">
  <figcaption>Source: Mistral AI blog <a href="https://mistral.ai/news/leanstral-1-5/">"Leanstral 1.5: Proof Abundance for All"</a> (2026-07-02).</figcaption>
</figure>

## Real-world bug discovery

Mistral ran a verification pipeline against **57 Rust repos** using [Aeneas](https://github.com/AeneasVerif/aeneas) (Rust → Lean), intent inference, and **4 attempts to prove + 4 to disprove** each generated property. Result: 47 violated properties flagged, **11 genuine bugs, 5 previously unreported on GitHub** (no CVEs at the time of writing).

- **AVL tree time-complexity proof.** A real AVL implementation was proven `O(log n)` for insert and delete via structural induction on the `TimeM` monad — **2.7M+ tokens across 22 compactions**, almost-tight bound of 48 steps per height unit plus a constant.
- **U64 overflow in [`datrs/varinteger`](https://github.com/datrs/varinteger).** Zigzag-decoding `value + 1` overflows on `Std.U64.MAX` — debug crash, silent release corruption.

Alongside the model, Mistral also **fully open-sourced the FLTEval harness** at [github.com/mistralai/FLTEval](https://github.com/mistralai/FLTEval) (Apache-2.0) — a Docker-only SWE-bench-shaped harness that applies submitted diffs inside per-task images, runs Lean and SafeVerify, and writes per-instance and aggregate reports.

## Practical implications for builders

```bash
uv tool install mistral-vibe && uv tool update mistral-vibe && vibe --setup
/leanstall
exit
vibe --agent lean
# Optional: Lean LSP MCP in ~/.vibe/config.toml
```

- **Maintain a Rust library?** Point Leanstral at a real PR — the 57-repo Aeneas pipeline is the closest reproducible demo.
- **Research formal methods?** Open weights + CISPO RL is a new baseline; SafeVerify and FLTEval are open source.
- **Ship Lean 4 production code?** The optional Lean LSP MCP is the real unlock — Leanstral drives `lean_goal` and iterates on stuck goals.
- **Just want to try it?** The free `leanstral-1-5` API endpoint is the shortest path; no weights, no GPU.

## Risks and caveats

1. **Benchmark-vs-real-world gap.** The 5-of-11 true-bug rate is a useful signal, not a guarantee.
2. **Lean 4 only.** No Coq, Isabelle, Rocq, Agda, or HOL Light support.
3. **Vendor cost estimates.** The $4 vs $300+ vs $54–68 framing is from Mistral; closed provers do not publish per-problem cost independently.
4. **No CVEs on the 5 unreported bugs.** Do not claim CVE ids in derivative coverage.
5. **LeanstralSafeVerify is a fork** of SafeVerify; may not generalise to Lean projects with custom build setups.
6. **PutnamBench is more crowded than it looks.** Aleph Prover solves 668/672 at higher per-problem cost; some higher-ranked results use NL proof hints that Leanstral 1.5 does not.

## What to watch

- Independent reproductions of FATE-H/X and FLTEval numbers.
- CVE assignments and upstream patches for the 5 previously unreported bugs.
- Mistral Vibe adoption — 6B-active open weights + an agent harness is a low barrier.
- FLTEval adoption as a community benchmark.
- Follow-on releases — Leanstral 1.6 or distilled variants have not been announced; Mistral has no published roadmap as of 2026-07-04.

## Sources

- [Mistral AI — "Leanstral 1.5: Proof Abundance for All" — 2026-07-02](https://mistral.ai/news/leanstral-1-5/)
- [Hugging Face — `mistralai/Leanstral-1.5-119B-A6B` model card — 2026-07-02](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B)
- [Mistral AI — Leanstral 1.5 API model card — 2026-07-02](https://docs.mistral.ai/models/model-cards/leanstral-1-5)
- [GitHub — `mistralai/FLTEval` (open-source benchmark) — 2026-07-02](https://github.com/mistralai/FLTEval)
- [GitHub — `mistralai/LeanstralSafeVerify` (Mistral's fork) — 2026-07-02](https://github.com/mistralai/LeanstralSafeVerify)
- [GitHub — `datrs/varinteger` (U64 overflow case) — 2026-07-02](https://github.com/datrs/varinteger)
- [Lean 4 reference site](https://leanprover.github.io/)
- [GitHub — `oOo0oOo/lean-lsp-mcp` (optional MCP integration)](https://github.com/oOo0oOo/lean-lsp-mcp)
- [AI Newsroom — sitemap (no prior Leanstral or Mistral article on news.lesbass.com before 2026-07-04)](https://news.lesbass.com/sitemap.xml)
