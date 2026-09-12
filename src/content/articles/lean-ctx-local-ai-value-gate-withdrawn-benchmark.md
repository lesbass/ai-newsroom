---
title: "lean-ctx: single-binary local AI Value Gate with a withdrawn benchmark"
description: "yvgude/lean-ctx is an Apache-2.0 Rust binary that compresses reads, proxies requests, and tracks costs across 30+ AI coding agents — but its headline benchmark is withdrawn."
pubDate: 2026-09-13
author: "AI Newsroom"
tags:
  - lean-ctx
  - context-engineering
  - mcp
  - ai-coding-agents
  - token-optimization
  - rust
  - open-source
  - cursor
  - claude-code
  - codex
image: "/images/articles/lean-ctx-local-ai-value-gate-withdrawn-benchmark/hero.png"
imageAlt: "GitHub OpenGraph social preview for yvgude/lean-ctx showing the LeanCTX ASCII logo and repository description"
imageCredit: "Source: https://github.com/yvgude/lean-ctx · Credit: GitHub OpenGraph / yvgude · License: Apache-2.0"
highRiskClaims: true
sources:
  - title: "yvgude/lean-ctx — GitHub repository (3.8k stars, 345 forks, Apache-2.0, 8,032 commits on main)"
    url: "https://github.com/yvgude/lean-ctx"
    date: 2026-09-12
    type: primary
  - title: "yvgude/lean-ctx — BENCHMARKS.md (Withdrawn Historical Snapshot)"
    url: "https://github.com/yvgude/lean-ctx/blob/main/BENCHMARKS.md"
    date: 2026-09-12
    type: primary
  - title: "yvgude/lean-ctx — README.md (benchmarks section, proxy docs, agent matrix)"
    url: "https://github.com/yvgude/lean-ctx/blob/main/README.md"
    date: 2026-09-12
    type: primary
  - title: "Headroom open-source token compression — AI Newsroom (AIN-372, 2026-06-24)"
    url: "https://news.lesbass.com/articles/headroom-ai-agent-token-compression/"
    date: 2026-09-12
    type: secondary
  - title: "context-mode MCP context window optimization — AI Newsroom (AIN-546, 2026-07-29)"
    url: "https://news.lesbass.com/articles/context-mode-mcp-context-window-optimization/"
    date: 2026-09-12
    type: secondary
---

[yvgude/lean-ctx](https://github.com/yvgude/lean-ctx) is an Apache-2.0 single-binary local "AI Value Gate" that sits between an AI coding agent and the model. It compresses reads, shells output, proxies requests, persists memory, and tracks costs — all in one Rust binary ([GitHub, 2026-09-12](https://github.com/yvgude/lean-ctx)).

The project's maintainer just withdrew its headline benchmark numbers. That matters more than the compression percentages.

## What happened

As of **2026-09-12**, [lean-ctx](https://github.com/yvgude/lean-ctx) sits at **3,800+ stars, 345 forks, 8,032 commits on `main`**, and **257 tagged releases** ([GitHub, 2026-09-12](https://github.com/yvgude/lean-ctx)). Apache-2.0 license. One Rust binary, no telemetry by default.

The capability surface spans five areas: read compression (10 modes), shell-output compression (95+ patterns), an optional request proxy, session memory, and a knowledge graph with a CPAO ledger. It works with 30+ AI coding agents — Cursor, Claude Code, Codex, Gemini CLI, OpenCode, Copilot, Windsurf, Aider, Zed, JetBrains, and more — as a standard MCP server with optional shell hooks ([README, 2026-09-12](https://github.com/yvgude/lean-ctx/blob/main/README.md)).

Install: one command via `curl`, `brew`, `npm`, `cargo`, or AUR. One-command setup per agent: `lean-ctx wrap cursor`, `wrap claude`, `wrap codex`. Undo with `lean-ctx unwrap`.

## Why it matters

**The local-first context layer is now a category.** lean-ctx, Headroom ([AIN-372](https://news.lesbass.com/articles/headroom-ai-agent-token-compression/), 2026-06-24), context-mode ([AIN-546](https://news.lesbass.com/articles/context-mode-mcp-context-window-optimization/), 2026-07-29), and Ratel (2026-07-11) all attack context-window cost from different angles. lean-ctx is the most ambitious in scope: a wire-level proxy, 30+ agent coverage, one Rust binary.

**The maintainer just withdrew the headline benchmark.** The README still shows historical 98.1% map-mode compression and ~13-token cached re-read figures. The project's own `BENCHMARKS.md` on `main` labels those numbers a "withdrawn historical snapshot" and restates the quality gate. A serious project pulling back its headline number to defend its methodology is rare — and it changes how the project should be summarised.

## What lean-ctx ships

- **Read modes**: 10 modes — `full`, `map`, `signatures`, `diff`, `lines:N-M`, `density:X`. Cached re-reads cost ~13 tokens (README attribution).
- **Shell-output compression**: 95+ patterns for `git`, `npm`, `cargo`, `docker`, `kubectl`, `terraform`.
- **Tree-sitter AST**: structural understanding for 27 languages.
- **Reversible compression (CCR)**: pruned payloads move to a content-addressed store; five recovery paths.
- **Session memory (CCP)**: persists task/facts/decisions across chats; structured recovery survives compaction.
- **Knowledge graph + Property Graph**: temporal facts with validity windows, multi-edge code graph for impact analysis.
- **CPAO ledger**: per-event local-only ledger (SHA-256 tamper-evident); `lean-ctx savings` for auditable view.
- **Request proxy (opt-in)**: `lean-ctx proxy enable` compresses every request, prompt-cache-safe + byte-stable.
- **Multi-agent (ctx_agent, ctx_handoff)**: agent registration + context-transfer bundles + shared state.
- **30+ agent integrations**: hybrid mode (MCP + shell hooks) vs MCP-only, auto-selected per agent.
- **Addons**: signed `.ctxpkg` packages, WASM modules or external MCP declarations; no marketplace.

## The benchmark and its withdrawal

The README's "Benchmarks" section still shows a table: raw read 533.2K tokens, `map` 8.0K (98.1% reduction, 78% quality), `signatures` 14.0K (96.7%, 96%), cached re-read ~13 tokens ([README, 2026-09-12](https://github.com/yvgude/lean-ctx/blob/main/README.md)).

`BENCHMARKS.md` on `main` opens with a different message ([BENCHMARKS.md, 2026-09-12](https://github.com/yvgude/lean-ctx/blob/main/BENCHMARKS.md)):

> "LeanCTX Benchmarks — Withdrawn Historical Snapshot. Historical / not current evidence. The benchmark figures, competitor comparisons, versions, hardware measurements, and calculated savings that previously appeared here are withdrawn. They are not a current LeanCTX claim and must not be used in product copy, sales material, release notes, or technical decisions."

The project's quality gate: a gain is valid only when the same workload has "a known baseline and treatment, a declared quality threshold, and visible methodology." The file adds: "A cheaper failed task is not a win." Current direction: "Research, not a generally available or universal proof of savings."

**Honest framing**: lean-ctx ships a real capability surface. Its current public benchmark posture is "withdrawn historical numbers + a methodology-first research programme."

## Proxy mode — what it does, what it doesn't

`lean-ctx proxy enable` puts a local proxy between the agent and the model provider. It compresses every request — system prompt, full history, tool results — with prompt-cache-safe rewrites and a byte-stable contract ([README, 2026-09-12](https://github.com/yvgude/lean-ctx/blob/main/README.md)).

**Claude Pro/Max cannot use a custom `ANTHROPIC_BASE_URL`** (OAuth restriction). `lean-ctx wrap claude` adds no proxy redirect while still enabling the `ctx_*` tools and shell-output compression; wire-level compression for Claude requires an `ANTHROPIC_API_KEY`.

The proxy also offers effort and verbosity knobs: `proxy.effort` pins one reasoning-effort level across OpenAI, Anthropic, and Gemini without breaking cache; `verbosity` is a cache-safe steer with a measured holdout.

## Risks and caveats

- **Benchmark withdrawal is the primary caveat.** The README still shows the historical 98.1% and ~13-token figures. The project's own `BENCHMARKS.md` labels them "withdrawn historical snapshot" and says they "must not be used in product copy, sales material, release notes, or technical decisions."
- **Scope breadth vs. depth.** lean-ctx tries to own the entire context layer — read compression, wire proxy, memory, graph, cost tracking. That breadth means no single part is as specialised as a dedicated tool.
- **Proxy availability.** Claude Pro/Max users on OAuth subscription cannot use wire-level compression. The MCP tools and shell compression still work, but the proxy path requires an API key.
- **Bus factor.** One primary maintainer. The 257 releases suggest active development, but the project is not yet at community-scale contributor breadth.
- **Addons are untrusted by default.** The scrubbing pipeline is good hygiene, but the addon ecosystem is deliberately unhosted — no marketplace, no curation.

## Sources

| Source | What it confirms | Date accessed |
|---|---|---|
| [yvgude/lean-ctx](https://github.com/yvgude/lean-ctx) | Repo stats (3.8k★, 345 forks, Apache-2.0, 8,032 commits, 257 releases) | 2026-09-12 |
| [BENCHMARKS.md](https://github.com/yvgude/lean-ctx/blob/main/BENCHMARKS.md) | "Withdrawn Historical Snapshot" — figures withdrawn, must not be used in product copy | 2026-09-12 |
| [README.md](https://github.com/yvgude/lean-ctx/blob/main/README.md) | Benchmarks table, proxy docs, agent matrix, feature surface | 2026-09-12 |
| [Headroom coverage](https://news.lesbass.com/articles/headroom-ai-agent-token-compression/) | Complementary context-engineering coverage (AIN-372, 2026-06-24) | 2026-09-12 |
| [context-mode coverage](https://news.lesbass.com/articles/context-mode-mcp-context-window-optimization/) | Complementary context-engineering coverage (AIN-546, 2026-07-29) | 2026-09-12 |
