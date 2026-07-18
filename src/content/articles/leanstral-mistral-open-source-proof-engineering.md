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
  - cispo
  - flteval
image: "/images/articles/leanstral-mistral-proof-engineering/hero-benchmarks.png"
imageAlt: "Leanstral 1.5 benchmark summary showing PutnamBench 587/672, FATE-H 87%, and FATE-X 34% compared against Seed-Prover 1.5 high, Goedel-Architect, A-ProverBase, and Aleph Prover (Mistral AI blog, 2026-07-02)."
imageCredit: "Screenshot of Mistral AI blog post \"Leanstral 1.5: Proof Abundance for All\", captured 2026-07-04 from https://mistral.ai/news/leanstral-1-5/ via Playwright Chromium through the AI Newsroom browser helper. License: no license stated; editorial use of a single chart image from a public blog post for news commentary."
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
  <img src="/images/articles/leanstral-mistral-proof-engineering/hero-benchmarks.png" alt="Leanstral 1.5 benchmark summary: PutnamBench 587/672, FATE-H 87%, FATE-X 34%" loading="lazy" decoding="async">
  <figcaption>Source: Mistral AI blog <a href="https://mistral.ai/news/leanstral-1-5/">"Leanstral 1.5: Proof Abundance for All"</a> (2026-07-02). Editorial screenshot.</figcaption>
</figure>

## What happened

Leanstral 1.5 is a **119B/6B-active MoE** — small enough for one consumer node, large enough to learn deep proof structure ([Mistral blog, 2026-07-02](https://mistral.ai/news/leanstral-1-5/)). Training runs **mid-training → SFT → RL with CISPO** in two custom environments that return feedback from a real Lean compiler.

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
  <img src="/images/articles/leanstral-mistral-proof-engineering/scaling-curve.png" alt="PutnamBench Pass@8 vs token budget — 44 problems at 50k tokens, 587 at 4M tokens" loading="lazy" decoding="async">
  <figcaption>Source: Mistral AI blog <a href="https://mistral.ai/news/leanstral-1-5/">"Leanstral 1.5: Proof Abundance for All"</a> (2026-07-02). Editorial screenshot.</figcaption>
</figure>

## Real-world bug discovery

Mistral ran a verification pipeline against **57 Rust repos** using [Aeneas](https://github.com/AeneasVerif/aeneas) (Rust → Lean), intent inference, and **4 attempts to prove + 4 to disprove** each generated property. Result: 47 violated properties flagged, **11 genuine bugs, 5 previously unreported on GitHub** (no CVEs at the time of writing).

- **AVL tree time-complexity proof.** A real AVL implementation was proven `O(log n)` for insert and delete via structural induction on the `TimeM` monad — **2.7M+ tokens across 22 compactions**, almost-tight bound of 48 steps per height unit plus a constant.
- **U64 overflow in [`datrs/varinteger`](https://github.com/datrs/varinteger).** Zigzag-decoding `value + 1` overflows on `Std.U64.MAX` — debug crash, silent release corruption.

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
