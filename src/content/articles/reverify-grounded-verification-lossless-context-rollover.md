---
title: "reverify lets deterministic tools judge every AI claim — zero false accepts across 275 binaries"
description: "2akouwu/reverify pairs an LLM with a deterministic verifier: model proposes, tools check bytes, only VERIFIED claims survive. Lossless rollover replaces compaction."
pubDate: 2026-09-09
author: "AI Newsroom"
tags:
  - reverify
  - anti-hallucination
  - binary-analysis
  - verification
  - context-engineering
  - mcp
  - reverse-engineering
  - deterministic-verifier
  - open-source
  - python
image: "/images/articles/reverify-grounded-verification-lossless-context-rollover/hero.svg"
imageAlt: "Generated editorial diagram of reverify's propose-and-verify loop: LLM agent proposes a claim, deterministic verifier checks bytes against the actual binary, decision diamond routes VERIFIED claims to the fact ledger and REFUTED claims back to the model for correction"
imageCredit: "Generated editorial image · Model/tool: hand-authored SVG · Disclosure: AI-generated, not source evidence"
highRiskClaims: true
sources:
  - title: "2akouwu/reverify — GitHub repository (911 stars, MIT license, created 2026-08-31)"
    url: "https://github.com/2akouwu/reverify"
    date: 2026-09-05
    type: primary
  - title: "2akouwu/reverify — BENCHMARK.md (275 binaries, 4 formats, 0 false VERIFIED, pooled 95% upper bound ~1.4%)"
    url: "https://github.com/2akouwu/reverify/blob/main/BENCHMARK.md"
    date: 2026-09-05
    type: primary
  - title: "2akouwu/reverify — README.md (verification loop, claim kinds, rollover, MCP server)"
    url: "https://github.com/2akouwu/reverify/blob/main/README.md"
    date: 2026-09-05
    type: primary
  - title: "2akouwu/reverify — SECURITY.md (authorized use only: malware analysis, CTF, vuln research)"
    url: "https://github.com/2akouwu/reverify/blob/main/SECURITY.md"
    date: 2026-09-05
    type: primary
  - title: "2akouwu/reverify — Release v0.11.0 (lossless context rollover, Sep 4 2026)"
    url: "https://github.com/2akouwu/reverify/releases/tag/v0.11.0"
    date: 2026-09-05
    type: primary
  - title: "2akouwu/reverify — Release v0.10.0 (Sep 4 2026)"
    url: "https://github.com/2akouwu/reverify/releases/tag/v0.10.0"
    date: 2026-09-05
    type: primary
  - title: "reverify on PyPI (0.10.0, requires Python >=3.8)"
    url: "https://pypi.org/project/reverify/"
    date: 2026-09-05
    type: primary
  - title: "context-mode — AI Newsroom coverage (AIN-546, 2026-07-29)"
    url: "https://news.lesbass.com/articles/context-mode-mcp-context-window-optimization/"
    date: 2026-09-05
    type: secondary
  - title: "DeepSeek dsh — AI Newsroom coverage (AIN-609, 2026-08-19)"
    url: "https://news.lesbass.com/articles/deepseek-harness-dsh/"
    date: 2026-09-05
    type: secondary
---

[2akouwu/reverify](https://github.com/2akouwu/reverify) is an MIT-licensed Python tool that stops AI agents from making things up. The model proposes a claim about a binary; deterministic tools check it against the actual bytes; the result comes back as `VERIFIED` / `REFUTED` / `INCONCLUSIVE` with evidence ([GitHub, 2026-09-05](https://github.com/2akouwu/reverify)). On 71 real Windows system files, the AI's textbook answer was wrong 97% of the time — reverify caught every one and never accepted a wrong claim.

The project also ships `reverify rollover`, a lossless context hand-off that replaces summary-based compaction with a `.reverify` ledger so a fresh session starts from grounded facts instead of a recap.

## What happened

On **2026-09-05**, [`2akouwu/reverify`](https://github.com/2akouwu/reverify) sits at **~911 stars, 194 forks**, MIT license ([GitHub, 2026-09-05](https://github.com/2akouwu/reverify)). Created 2026-08-31, it has 71 commits and 15 tagged releases in five days. Latest release: **v0.11.0** (2026-09-04), adding lossless context rollover across Claude Code, Codex CLI, Gemini CLI, and OpenCode ([v0.11.0, 2026-09-04](https://github.com/2akouwu/reverify/releases/tag/v0.11.0)). PyPI latest: **0.10.0** (Python ≥3.8) ([PyPI, 2026-09-05](https://pypi.org/project/reverify/)).

## Why it matters

**The "deterministic tool as judge" pattern is a concrete alternative to trust-and-summarize agent loops.** Where context-mode ([AIN-546](https://news.lesbass.com/articles/context-mode-mcp-context-window-optimization/), 2026-07-29) attacks context-window bloat through compression and session continuity, and DeepSeek dsh ([AIN-609](https://news.lesbass.com/articles/deepseek-harness-dsh/), 2026-08-19) provides a plugin-first agent harness, reverify tackles a different root problem: the agent's claims are not grounded in reality. The model proposes; the tools decide. Only what survives verification becomes a fact.

**For binary and structural claims it directly attacks hallucination and context rot.** `reverify equiv` extends the same pattern to Python and C rewrites: an AI's refactor is tested against shared inputs, not trusted on authority alone ([README, 2026-09-05](https://github.com/2akouwu/reverify/blob/main/README.md)).

## How the propose-and-verify loop works

A **claim** is any hypothesis about the binary. The deterministic tools check it against the actual bytes and return `VERIFIED`, `REFUTED`, or `INCONCLUSIVE` with evidence. Only `VERIFIED` claims survive into the agent's working state.

| Claim kind | What it checks |
|---|---|
| `bytes_at`, `u32_at`, `u64_at` | Typed reads at file offsets (or RVA/VA) |
| `string_present`, `pattern_present` | AOB scan with wildcards |
| `section_present` | PE/ELF/Mach-O section existence |
| `import_present`, `export_present` | Import/export table entries |
| `instructions` | Mnemonics and optionally operands at an offset |
| `function_at` | Function boundary (requires `reverify[angr]`) |
| `calls`, `references` | Call graph and cross-references (requires angr) |
| `emulate_result` | CPU emulation against expected registers |
| `behavior_equiv` | Original vs. candidate over shared inputs |

Install: `pip install reverify` (pure-Python core), `pip install "reverify[full]"` (capstone + unicorn + lief), or `pip install "reverify[angr]"` (function/call analysis). The MCP server lets Claude Code and Cursor call the tools directly ([README, 2026-09-05](https://github.com/2akouwu/reverify/blob/main/README.md)).

## The benchmark

The headline result: **275 binaries, 4 formats, 0 false VERIFIED** (pooled 95% upper bound ~1.4%) ([BENCHMARK.md, 2026-09-05](https://github.com/2akouwu/reverify/blob/main/BENCHMARK.md)).

| Platform | Formats | Tested | Prior wrong | False VERIFIED | 95% upper bound |
|---|---|---|---|---|---|
| Windows 11 reference | PE | 71 | 69/71 = 97% | **0** | 5.1% |
| Linux x86_64 (CI) | ELF | 40 | 40 | **0** | 8.8% |
| macOS (CI) | Mach-O | 77 | 77 | **0** | 4.8% |
| Windows Server (CI) | PE x86 + x86_64 | 68 | 68 | **0** | 5.3% |
| **Pooled** | **4 formats** | **275** | — | **0** | **~1.4%** |

CI gate: any wrong claim marked `VERIFIED` fails the build. Each run records SHA-256 hashes of every binary, every verdict, and tool versions as a `benchmark-<os>` artifact. The corpus control confirms the textbook `push rbp; mov rbp, rsp` prior is verified where compilers emit it (gcc/clang -O0 with frame pointers) and refuted where they don't (-O2, MSVC, AArch64) ([BENCHMARK.md, 2026-09-05](https://github.com/2akouwu/reverify/blob/main/BENCHMARK.md)).

## Lossless context rollover

`reverify rollover install` touches hook config for Claude Code, Codex CLI, Gemini CLI, and OpenCode — with backups and reversible `uninstall` ([v0.11.0, 2026-09-04](https://github.com/2akouwu/reverify/releases/tag/v0.11.0)). The `.reverify` ledger records every grounded result (ESTABLISHED / KNOWN FALSE). When context fills up, the session is replaced — the fresh context opens from the ledger, not a model-written recap. This **replaces model-written compaction**, not augments it. Refuted claims come back as `KNOWN FALSE`, so the next session skips the same wrong prior ([README, 2026-09-05](https://github.com/2akouwu/reverify/blob/main/README.md)).

The MCP server covers Claude Code and Cursor. **Caveat:** review before running on sensitive repos — the install modifies CLI hook config.

## Risks and caveats

- **Project age.** Created 2026-08-31, one primary author (62 commits), plus one helper. Bus factor = 1 ([GitHub, 2026-09-05](https://github.com/2akouwu/reverify)).

- **Release velocity.** 15 tagged releases in ~5 days; expect breaking changes. The README explicitly warns about compatibility.

- **Supply-chain lag.** PyPI latest is 0.10.0, GitHub latest tag is v0.11.0. Pinning `pip install reverify==X.Y.Z` is mandatory, not optional ([PyPI, 2026-09-05](https://pypi.org/project/reverify/)).

- **Dual-use.** RE / malware-analysis tool. README and SECURITY.md restrict use to *authorized* analysis: malware, CTF, interoperability, vulnerability research on owned or permitted artifacts ([SECURITY.md, 2026-09-05](https://github.com/2akouwu/reverify/blob/main/SECURITY.md)).

- **Benchmark scope.** The "0 false VERIFIED" result is over 275 binaries / 4 formats using specific priors. It is evidence, not a universal guarantee. The 95% upper bound is ~1.4%, not zero.

- **Optional MCP install.** Rewrites CLI hook config — back up before installing.

## Sources

| Source | What it confirms | Date accessed |
|---|---|---|
| [2akouwu/reverify](https://github.com/2akouwu/reverify) | Repo stats (911★, 194 forks, MIT, created 2026-08-31) | 2026-09-05 |
| [BENCHMARK.md](https://github.com/2akouwu/reverify/blob/main/BENCHMARK.md) | 275 binaries, 4 formats, 0 false VERIFIED, pooled 95% UB ~1.4% | 2026-09-05 |
| [README.md](https://github.com/2akouwu/reverify/blob/main/README.md) | Verification loop, claim kinds, rollover, MCP server | 2026-09-05 |
| [SECURITY.md](https://github.com/2akouwu/reverify/blob/main/SECURITY.md) | Authorized use only: malware, CTF, vuln research, owned artifacts | 2026-09-05 |
| [v0.11.0 release](https://github.com/2akouwu/reverify/releases/tag/v0.11.0) | Lossless context rollover, four CLI harnesses | 2026-09-05 |
| [v0.10.0 release](https://github.com/2akouwu/reverify/releases/tag/v0.10.0) | Semantic layer on angr, 208 unit tests | 2026-09-05 |
| [PyPI project](https://pypi.org/project/reverify/) | 0.10.0, Python ≥3.8, release history | 2026-09-05 |
| [context-mode coverage](https://news.lesbass.com/articles/context-mode-mcp-context-window-optimization/) | Complementary context-engineering coverage (AIN-546) | 2026-09-05 |
| [DeepSeek dsh coverage](https://news.lesbass.com/articles/deepseek-harness-dsh/) | Complementary agent-harness coverage (AIN-609) | 2026-09-05 |
