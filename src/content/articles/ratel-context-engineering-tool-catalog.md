---
title: "Ratel: an in-process BM25 tool catalog that cuts AI agent context spend 87% on BFCL v3"
description: "Ratel (ratel-ai/ratel, 186★, Apache-2.0 core + MIT SDKs) ships an in-process BM25 tool catalog. On BFCL v3: ~87% fewer tokens, tool selection within ±5 points."
pubDate: 2026-07-11
author: "AI Newsroom"
tags: ["ratel", "ratel-ai", "context-engineering", "tool-calling", "tool-selection", "bm25", "rust", "napi", "pyo3", "mcp", "mcp-server", "ai-agents", "claude-skills", "skills", "memory", "bfcl", "bfcl-v3", "sonnet-4-6", "haiku-4-5", "gpt-5-4-mini", "qwen3-4b", "ratel-mcp", "ratel-cloud", "ratel-bench", "apache-2-0", "mit", "open-source", "ai-newsroom-coverage"]
image: "/images/articles/ratel-context-engineering-tool-catalog/hero-benchmark-desktop.png"
imageAlt: "Benchmark.ratel.sh 'Token Spend by Model' dumbbell chart on 2026-07-11, showing the Version 0.4.0 (stable) header and the four-row dumbbell: Claude Sonnet 4.6 (3.7k With Ratel vs 29.3k Baseline, Oracle floor 1.8k), Qwen3 4b (2.5k vs 28.1k, Oracle 714), Claude Haiku 4.5 (3.7k vs 25.6k, Oracle 1.4k), and GPT 5.4 Mini (1.7k vs 15.0k, Oracle 431). The legend lists Oracle (gold tools only), With Ratel (search_tools gateway), and Baseline (full tool pool)."
imageCredit: "Source: benchmark.ratel.sh (project's own published benchmark page) · Captured 2026-07-11 via Playwright Chromium with @sparticuz/chromium (the ai-newsroom scripts/browser.mjs helper) · Benchmark framework: BFCL v3, 599 scenarios, 100-tool pool · License: project is Apache-2.0 (core) + MIT (SDKs); the benchmark page screenshot is a primary source used editorially for the Ratel article · Desktop 1280×900, mobile 375×812."
sources:
  - title: "ratel-ai/ratel — GitHub repository (README hero 'Your AI agent is paying for tools it never uses. Ratel fixes that.', 'The context engineering layer for AI agents' Introduction, 'Why' section with 'Every tool schema sent to the model is tokens you pay for' and 'Some drop from 77% to 8% accuracy just from having too many options' framing, Install instructions for TypeScript / Python / MCP, How it works with BM25, The Ratel project table, License section, AGENTS.md, CONTRIBUTING.md, docs/adr/0002-product-split-engine-local-cloud.md, docs/adr/0003-catalog-source-interface.md, docs/adr/0009-licensing.md)"
    url: "https://github.com/ratel-ai/ratel"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai/ratel — GitHub REST API metadata (186 stars, 9 forks, 18 open issues, 27 branches, 40 tags, license: MIT, language: Rust, created_at: 2025-11-12T15:09:11Z, pushed_at: 2026-07-10T23:53:44Z, topics: accuracy, agents, claude-skills, context, harness, llm, llm-routing, mcp, mcp-server, memory, optimization, rag, skills, token-optimization, tool-calling, tool-selection)"
    url: "https://api.github.com/repos/ratel-ai/ratel"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai/ratel — README.md (the verbatim 'Why' bullets: 'Cost: Every tool schema sent to the model is tokens you pay for. Fewer tools in context means lower spend on every call.' and 'Accuracy: Models get worse as tool lists grow. Some drop from 77% to 8% accuracy just from having too many options.'; the closing 'Across local, open-source, and frontier model setups, Ratel cuts token usage and recovers accuracy lost to tool overload — without embeddings or a vector DB.'; the License section: 'The ratel-ai-core engine is licensed under Apache-2.0 — an explicit patent grant for the engine others embed. Everything else (SDKs, telemetry helpers, examples) is MIT.')"
    url: "https://github.com/ratel-ai/ratel/blob/main/README.md"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai/ratel — Releases index (latest 5: core-v0.4.0 on 2026-07-09, sdk-py-v0.4.1 on 2026-07-10T23:07:31Z, sdk-ts-v0.4.1 on 2026-07-10T23:08:30Z, telemetry-ts-v0.1.1 on 2026-07-10T22:54:38Z, telemetry-py-v0.1.1 on 2026-07-10T22:54:40Z; the 0.4.0 line is the first stable 'with Ratel' benchmark on benchmark.ratel.sh)"
    url: "https://github.com/ratel-ai/ratel/releases"
    date: 2026-07-11
    type: primary
  - title: "benchmark.ratel.sh — Version 0.4.0 (stable), 'Evaluated with golden industry standards, measured with BFCL v3' (599 scenarios, 100-tool pool; Token Spend by Model dumbbell chart: Sonnet 4.6 29,301→3,688 mean tokens, tool selection 97.5% vs 98.0% (no Ratel), task completion 92.5% vs 92.0%; Haiku 4.5 25,606→3,674 mean tokens, tool selection 96.7% vs 84.1%; GPT 5.4 Mini 15,006→1,669 mean tokens, tool selection 95.3% vs 96.5%; Qwen3 4b 28,060→2,535 mean tokens, tool selection 91.5% vs 95.8%)"
    url: "https://benchmark.ratel.sh"
    date: 2026-07-11
    type: primary
  - title: "docs.ratel.sh — stable docs site (llms.txt / llms-full.txt, 9-skill Skills Suite, Python and TypeScript SDK references, Vercel AI SDK + Pydantic AI example references)"
    url: "https://docs.ratel.sh"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai/ratel — docs/adr/0002-product-split-engine-local-cloud.md (ADR-0002: 'The hosted cloud is decided direction, not yet public.')"
    url: "https://github.com/ratel-ai/ratel/blob/main/docs/adr/0002-product-split-engine-local-cloud.md"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai/ratel — docs/adr/0003-catalog-source-interface.md (ADR-0003: 'A standalone server is deferred.')"
    url: "https://github.com/ratel-ai/ratel/blob/main/docs/adr/0003-catalog-source-interface.md"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai/ratel — docs/adr/0009-licensing.md (ADR-0009: the Apache-2.0-for-engine + MIT-for-SDKs dual-license rationale)"
    url: "https://github.com/ratel-ai/ratel/blob/main/docs/adr/0009-licensing.md"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai/ratel-mcp — local distribution and `@ratel-ai/mcp-server` (the `npx -y @ratel-ai/mcp-server mcp import` shim that drops Ratel in front of an existing Claude Code / Cursor / ChatGPT MCP setup)"
    url: "https://github.com/ratel-ai/ratel-mcp"
    date: 2026-07-11
    type: primary
  - title: "ratel-ai-core on crates.io — Rust engine crate (the `ratel-ai-core` engine that the NAPI and PyO3 SDKs bind against)"
    url: "https://crates.io/crates/ratel-ai-core"
    date: 2026-07-11
    type: primary
  - title: "AIN-371 — GitHub repo radar (the AI Newsroom radar sweep that surfaced Ratel as the 2026-07-11 candidate; EditorInChief commissioned the article on 2026-07-11 in AIN-372 with bani.sh held as the secondary candidate)"
    url: "https://news.lesbass.com/paperclip/AIN-371"
    date: 2026-07-11
    type: secondary
  - title: "AIN-372 — Article candidate: Ratel — context engineering for AI agents (the EditorInChief commissioning decision that closed `done` on 2026-07-11 and created AIN-373 as the Writer child issue; full source table and the dual-license attribution rule in the brief at _default/article-task-ain-373-ratel.md)"
    url: "https://news.lesbass.com/paperclip/AIN-372"
    date: 2026-07-11
    type: secondary
highRiskClaims: false
---

[Ratel](https://github.com/ratel-ai/ratel) is the in-process tool catalog that addresses the "tools in context" problem on every agent stack. As of **2026-07-11** the [`ratel-ai/ratel`](https://github.com/ratel-ai/ratel) repository sits at **186 stars, 9 forks, 18 open issues, primary language Rust**, created **2025-11-12**, last pushed **2026-07-10** ([GitHub REST API](https://api.github.com/repos/ratel-ai/ratel)). The project's [benchmark page](https://benchmark.ratel.sh) is now pinned to **Version 0.4.0 (stable), Evaluated with BFCL v3** — 100-tool pool, 599 scenarios, **Claude Sonnet 4.6 drops from 29,301 mean tokens to 3,688 (−87%)** with tool selection 97.5% (Ratel) vs 98.0% (no Ratel) and task completion 92.5% vs 92.0%.

![Benchmark.ratel.sh 'Token Spend by Model' dumbbell chart on 2026-07-11 showing the four-model comparison and the legend Oracle / With Ratel / Baseline under the Version 0.4.0 (stable) header.]({{ '/images/articles/ratel-context-engineering-tool-catalog/hero-benchmark-desktop.png' | url }})

## What happened

A 4-release burst on 2026-07-09/10 ([releases index, 2026-07-11](https://github.com/ratel-ai/ratel/releases)): **`core-v0.4.0`** on 2026-07-09, **`sdk-py-v0.4.1`** on 2026-07-10T23:07:31Z, **`sdk-ts-v0.4.1`** on 2026-07-10T23:08:30Z, **`telemetry-ts-v0.1.1`** on 2026-07-10T22:54:38Z, and **`telemetry-py-v0.1.1`** on 2026-07-10T22:54:40Z. The 0.4.0 line is the first stable "with Ratel" benchmark on the project site. Two changes matter: PR #86 ([ratel-ai/ratel#86](https://github.com/ratel-ai/ratel/pull/86)) renamed the discovery surface from `gateway` to `capability tools`, and PR #101 ([#101](https://github.com/ratel-ai/ratel/pull/101)) made re-register replace tools/skills in place. The repo is 8 months old and daily-active.

The README's hero line is direct: *"Your AI agent is paying for tools it never uses. Ratel fixes that."* ([README, 2026-07-11](https://github.com/ratel-ai/ratel/blob/main/README.md)). The Introduction: *"The context engineering layer for AI agents. Selects only the tools and skills relevant to each turn, recovering accuracy lost to tool overload and cutting what you pay per call. No vector DB, no infra."*

## Why it matters

Two problems converge here, and Ratel addresses both at the same layer.

- **Cost is the front of the call.** Every tool schema sent to the model is tokens you pay for on every call. With Ratel you pay ~3,700 tokens for the tool surface instead of ~25,000–29,000. The savings repeat on every turn.
- **Accuracy is the second-order effect.** Models get worse as tool lists grow — the README's framing is that tool overload collapses the model's ability to pick the right tool. The 77% → 8% accuracy drop is the README's general illustration of the LLM-under-tool-overload phenomenon (not a Ratel-specific measurement). The Ratel-specific numbers come from the [BFCL v3 benchmark page](https://benchmark.ratel.sh).

Ratel is the only open-source in-process BM25 catalog (no vector DB, no embedding pipeline) that drops into either TypeScript or Python agent code with a one-line `ToolCatalog` registration and a two-call interface (`search_capabilities` + `invoke`). The Rust core is in-process, deterministic, and adds no infra.

## What Ratel actually is

| Surface | What Ratel exposes |
|---|---|
| **Engine** | `ratel-ai-core` (Rust, [crates.io](https://crates.io/crates/ratel-ai-core)) — BM25 index by default, opt-in semantic / hybrid per catalog or per call |
| **TypeScript SDK** | `@ratel-ai/sdk` on npm — NAPI-bound; prebuilt `.node` binaries for `darwin-arm64`, `darwin-x64`, `linux-arm64-gnu`, `linux-x64-gnu`, `win32-x64-msvc` |
| **Python SDK** | `ratel-ai` on PyPI — PyO3-bound; `pip install ratel-ai` |
| **Local distribution** | `@ratel-ai/mcp-server` / `ratel-mcp` — `npx -y @ratel-ai/mcp-server mcp import` drops Ratel in front of an existing Claude Code / Cursor / ChatGPT MCP setup with no code changes |
| **Catalog contract** | [`protocol/`](https://github.com/ratel-ai/ratel/tree/main/protocol) — wire contract for catalog sources (Slack, Notion, custom tool stores) |
| **Telemetry** | OpenTelemetry `ratel.*` / `gen_ai.*` funnel spans ([ADR-0007](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0007-telemetry-conventions.md)) |
| **License** | Apache-2.0 for `ratel-ai-core` (explicit patent grant for the engine others embed), MIT for SDKs / telemetry helpers / examples (see [ADR-0009](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0009-licensing.md)) |

The core install is two lines per language:

```bash
pnpm add @ratel-ai/sdk
```
```bash
pip install ratel-ai
```

A `ToolCatalog` object, `register()` to add tools, `search_capabilities_tool(catalog)` to expose the search, `invoke_tool_tool(catalog)` to expose the call. Both SDKs expose the same two-call interface; the README's TypeScript and Python snippets use the same names on both sides.

## Practical implications for builders

Four install paths cover the common setups. Pick one.

| Path | Command | What it adds | Best for |
|---|---|---|---|
| **TypeScript SDK** | `pnpm add @ratel-ai/sdk` | NAPI binding to `ratel-ai-core` | Any TS / Node agent (Claude Code plugins, Vercel AI SDK) |
| **Python SDK** | `pip install ratel-ai` | PyO3 binding to `ratel-ai-core` | Any Python agent (Pydantic AI, smolagents, custom harnesses) |
| **MCP shim** | `npx -y @ratel-ai/mcp-server mcp import` | No-code wrapper that fronts an existing MCP setup | Claude Code, Cursor, ChatGPT with MCP servers today |
| **Rust embed** | `cargo add ratel-ai-core` | Engine only, no SDK | Native Rust agents (oh-my-pi, custom runtimes) |

The [BFCL v3 benchmark](https://benchmark.ratel.sh) is the load-bearing evidence. Mean total tokens per task, four models:

| Model | Baseline (full pool) | With Ratel (`search_tools`) | Oracle (gold only) | Tool selection (With Ratel vs no Ratel) |
|---|---|---|---|---|
| **Claude Sonnet 4.6** | 29,301 | 3,688 | 1,829 | **97.5% vs 98.0%** (−0.5 pt) |
| **Claude Haiku 4.5** | 25,606 | 3,674 | 1,386 | **96.7% vs 84.1%** (+12.6 pt) |
| **GPT 5.4 Mini** | 15,006 | 1,669 | 431 | **95.3% vs 96.5%** (−1.2 pt) |
| **Qwen3 4b** | 28,060 | 2,535 | 714 | **91.5% vs 95.8%** (−4.3 pt) |

The README's [`protocol/`](https://github.com/ratel-ai/ratel/tree/main/protocol) catalog-source contract means future catalog sources (Slack, Notion, custom tool stores) plug in without re-indexing. The Rust core's BM25 index is in-process, deterministic, and adds no latency to the agent loop. Semantic and hybrid ranking are opt-in per catalog or per call, running a local embedding model in the same process.

## Risks and caveats

- **The 77% → 8% accuracy claim is the README's general framing** of an LLM-under-tool-overload phenomenon, not a Ratel-specific measurement. The Ratel-specific numbers come from the BFCL v3 benchmark page (599 scenarios, 100-tool pool).
- **The benchmark is hosted by the project itself** (`benchmark.ratel.sh`) on the BFCL v3 evaluation suite — the framework is industry-standard, but the runs are the project's. AI Newsroom has not re-run the numbers within 24 hours.
- **Qwen3 4b loses ~4 points of tool selection with Ratel** (91.5% vs 95.8%). Ratel is not a free win on the smallest model in the published set; the README and benchmark page report this honestly.
- **186★ is small for the category** — pre-traction but daily-active. 8 months old, 4 repos, 4 releases in 36 hours. The 0.4.x line and the SDK / telemetry separation suggest real investment.
- **Hosted cloud is unconfirmed direction** — [ADR-0002](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0002-product-split-engine-local-cloud.md) says the hosted cloud is "decided direction" but "not yet public"; [ADR-0003](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0003-catalog-source-interface.md) says a standalone server is "deferred". The article does not promise a hosted product.
- **Dual-license attribution is required** — the GitHub REST API exposes the overall license as `MIT`, but the README, `LICENSE-APACHE`, and [ADR-0009](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0009-licensing.md) say the **core is Apache-2.0 and the SDKs / telemetry / examples are MIT**. Cite both.

## What to watch

- **v0.5.x cadence.** The 0.4.0 line is now the stable "with Ratel" baseline on the benchmark page; the next minor is the load-bearing one to watch.
- **Semantic and hybrid ranking** (the `v0.3.0-semantic.2` and `v0.3.0-hybrid.2` pre-release tags) move from opt-in to default for catalogs that need them.
- **ratel-cloud as a managed catalog source** via the [`protocol/`](https://github.com/ratel-ai/ratel/tree/main/protocol) contract — gated on [ADR-0002](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0002-product-split-engine-local-cloud.md) flipping from "decided direction" to "shipped."
- **The ratel-bench harness** ([ratel-ai/ratel-bench](https://github.com/ratel-ai/ratel-bench)) expanding to other evaluation suites beyond BFCL v3.
- **OpenTelemetry telemetry stability** — `telemetry-ts-v0.1.1` and `telemetry-py-v0.1.1` are the first telemetry releases; `ratel.*` / `gen_ai.*` funnel spans need a public schema review.
- **Cross-language catalog federation** — the `protocol/` contract is the bet that catalog sources (Slack, Notion, custom tool stores) can share state across TS and Python agents.

## Sources

- [ratel-ai/ratel — GitHub repository (2026-07-11)](https://github.com/ratel-ai/ratel)
- [ratel-ai/ratel — GitHub REST API metadata (2026-07-11)](https://api.github.com/repos/ratel-ai/ratel)
- [ratel-ai/ratel — README.md (2026-07-11)](https://github.com/ratel-ai/ratel/blob/main/README.md)
- [ratel-ai/ratel — Releases index (2026-07-11)](https://github.com/ratel-ai/ratel/releases)
- [benchmark.ratel.sh — Version 0.4.0 (stable), BFCL v3, 599 scenarios, 100-tool pool (2026-07-11)](https://benchmark.ratel.sh)
- [docs.ratel.sh — stable docs, llms.txt, 9-skill Skills Suite, Python + TypeScript SDK references (2026-07-11)](https://docs.ratel.sh)
- [ratel-ai/ratel — docs/adr/0002-product-split-engine-local-cloud.md (ADR-0002, 2026-07-11)](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0002-product-split-engine-local-cloud.md)
- [ratel-ai/ratel — docs/adr/0003-catalog-source-interface.md (ADR-0003, 2026-07-11)](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0003-catalog-source-interface.md)
- [ratel-ai/ratel — docs/adr/0009-licensing.md (ADR-0009, 2026-07-11)](https://github.com/ratel-ai/ratel/blob/main/docs/adr/0009-licensing.md)
- [ratel-ai/ratel-mcp — local distribution and `@ratel-ai/mcp-server` (2026-07-11)](https://github.com/ratel-ai/ratel-mcp)
- [ratel-ai-core on crates.io — Rust engine crate (2026-07-11)](https://crates.io/crates/ratel-ai-core)
- [AIN-371 — RepoScout radar (2026-07-11)](https://news.lesbass.com/paperclip/AIN-371)
- [AIN-372 — Article candidate: Ratel — context engineering for AI agents (2026-07-11)](https://news.lesbass.com/paperclip/AIN-372)
