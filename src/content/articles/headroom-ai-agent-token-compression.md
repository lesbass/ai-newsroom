---
title: "Headroom: open-source token compression for AI agents"
description: "Headroom v0.27.0 is an Apache-2.0 context-compression layer for AI agents: library, proxy, agent wrapper, and MCP server. Published savings reach 92% on code search and SRE debugging."
pubDate: 2026-06-24
author: "AI Newsroom"
tags: ["headroom", "ai-agents", "token-optimization", "context-compression", "mcp", "claude-code", "codex", "cursor", "aider", "opencode", "github", "open-source", "rag", "kv-cache", "rust", "python", "typescript", "developer-tools"]
image: "https://opengraph.githubassets.com/1/headroomlabs-ai/headroom"
imageAlt: "Headroom open-source repository social preview card"
imageCredit: "Image: GitHub / headroomlabs-ai/headroom repository (Apache 2.0)"
sources:
  - title: "Headroom repository on GitHub (headroomlabs-ai/headroom)"
    url: "https://github.com/headroomlabs-ai/headroom"
    date: 2026-06-24
    type: primary
  - title: "Headroom README — installation, modes, proof, compatibility matrix"
    url: "https://github.com/headroomlabs-ai/headroom/blob/main/README.md"
    date: 2026-06-24
    type: primary
  - title: "Headroom v0.27.0 release on GitHub"
    url: "https://github.com/headroomlabs-ai/headroom/releases/tag/v0.27.0"
    date: 2026-06-22
    type: primary
  - title: "Headroom docs — Architecture"
    url: "https://headroom-docs.vercel.app/docs/architecture"
    date: 2026-06-24
    type: primary
  - title: "Headroom docs — Benchmarks (compression, accuracy, latency, production telemetry)"
    url: "https://headroom-docs.vercel.app/docs/benchmarks"
    date: 2026-06-24
    type: primary
  - title: "Headroom docs — CCR (Reversible Compression)"
    url: "https://headroom-docs.vercel.app/docs/ccr"
    date: 2026-06-24
    type: primary
  - title: "Headroom docs — Output token reduction proposal"
    url: "https://github.com/headroomlabs-ai/headroom/blob/main/docs/proposals/output-token-reduction.md"
    date: 2026-06-24
    type: primary
  - title: "Headroom on PyPI (headroom-ai package)"
    url: "https://pypi.org/project/headroom-ai/"
    date: 2026-06-24
    type: primary
  - title: "Headroom on npm (headroom-ai package)"
    url: "https://www.npmjs.com/package/headroom-ai"
    date: 2026-06-24
    type: primary
  - title: "Kompress-v2-base model card on Hugging Face"
    url: "https://huggingface.co/chopratejas/kompress-v2-base"
    date: 2026-06-24
    type: primary
  - title: "Headroom star history chart"
    url: "https://www.star-history.com/#chopratejas/headroom&Date"
    date: 2026-06-24
    type: secondary
  - title: "Headroom GitHub API metadata (stars, forks, license, latest commit, latest release)"
    url: "https://api.github.com/repos/headroomlabs-ai/headroom"
    date: 2026-06-24
    type: primary
highRiskClaims: false
---

On **2026-06-22**, [Headroom](https://github.com/headroomlabs-ai/headroom) shipped [v0.27.0](https://github.com/headroomlabs-ai/headroom/releases/tag/v0.27.0) — `headroom update` with a release banner, `headroom doctor` for setup diagnostics, hot-reload of live proxy env knobs, tabular `.xlsx/.xls` compression, a `cc-switch` reconciler, and measured token throughput. As of **2026-06-24** the repository had reached **48,803 stars**, **3,406 forks**, and **368 open issues** — six months after its first commit on **2026-01-07** ([GitHub API, 2026-06-24](https://api.github.com/repos/headroomlabs-ai/headroom); [v0.27.0 release, 2026-06-22](https://github.com/headroomlabs-ai/headroom/releases/tag/v0.27.0)). Headroom is an open-source context compression layer for AI coding agents: it compresses tool outputs, logs, RAG chunks, files, and conversation history **before** they reach the LLM. Published savings reach **60-95%** on real agent workloads, with accuracy preserved on GSM8K, TruthfulQA, SQuAD v2, and BFCL. Apache 2.0, runs entirely locally, ships in four install modes: library, local proxy, agent wrapper, and MCP server.

## What happened

**The release.** [v0.27.0](https://github.com/headroomlabs-ai/headroom/releases/tag/v0.27.0) shipped on 2026-06-22 with 13 feature commits. User-facing additions: `headroom update`, `headroom doctor`, hot-reload of live proxy env knobs, tabular spreadsheet compression, a `cc-switch` reconciler, and measured token throughput (`tokens/sec`). Output-token reduction is the headline feature: `HEADROOM_OUTPUT_SHAPER=1` trims what the model writes back. Cortex Code (Snowflake CoCo) and Vertex-hosted Claude Code are added to the provider matrix.

**The repo, in numbers.** On 2026-06-24 the [GitHub API](https://api.github.com/repos/headroomlabs-ai/headroom) returns 48,803 stars, 3,406 forks, 368 open issues, license `Apache-2.0`, last push `2026-06-24T03:47:08Z`. Thirty tagged releases sit on the [releases page](https://github.com/headroomlabs-ai/headroom/releases) — a roughly biweekly cadence. CI runs on GitHub Actions with Codecov; packages ship to PyPI and npm.

**The four install modes.** From the [README](https://github.com/headroomlabs-ai/headroom/blob/main/README.md) and the [docs](https://headroom-docs.vercel.app/docs):

- **Library** — `compress(messages)` inline in Python or TypeScript.
- **Proxy** — `headroom proxy --port 8787`, drop-in, zero code changes.
- **Agent wrap** — `headroom wrap claude|codex|cursor|aider|copilot|opencode`; the wrapper injects the proxy config.
- **MCP server** — `headroom mcp install` registers `headroom_compress`, `headroom_retrieve`, and `headroom_stats` tools for any MCP client.

The headline installer is `pip install "headroom-ai[all]"` (Python 3.10+); granular extras split out `[proxy]`, `[mcp]`, `[ml]`, `[code]`, `[memory]`, `[relevance]`, `[image]`, `[agno]`, `[langchain]`, `[evals]`, and `[pytorch-mps]`.

**The four transforms.** [ContentRouter](https://headroom-docs.vercel.app/docs/how-compression-works) detects content type and selects the right compressor: **SmartCrusher** (universal JSON — preserves schema, recency, anomalies, and statistical distribution), **CodeCompressor** (AST-aware for Python, JS, Go, Rust, Java, C++), **Kompress-base** (the project's own text model on [Hugging Face](https://huggingface.co/chopratejas/kompress-v2-base)), and **Image compression** (40-90% via a trained ML router). Two adjacent pieces: **CacheAligner** stabilizes prompt prefixes so Anthropic and OpenAI KV caches actually hit; **CCR** ([Reversible Compression](https://headroom-docs.vercel.app/docs/ccr)) stores originals locally — the LLM calls `headroom_retrieve` to get the original back.

## Why it matters

**1. Token cost is still the top complaint about agent loops in 2026.** The published savings table:

| Workload | Before | After | Savings |
| --- | ---: | ---: | ---: |
| Code search (100 results) | 17,765 tok | 1,408 tok | **92%** |
| SRE incident debugging | 65,694 tok | 5,118 tok | **92%** |
| GitHub issue triage | 54,174 tok | 14,761 tok | **73%** |
| Codebase exploration | 78,502 tok | 41,254 tok | **47%** |

Accuracy: GSM8K ±0.000, TruthfulQA +0.030, SQuAD v2 97% at 19% compression, BFCL 97% at 32% — published in the [README proof section](https://github.com/headroomlabs-ai/headroom#proof).

**2. v0.27.0 moves the project from "compress the prompt" to "compress both directions" — and the output side is where the money is on Opus-class models.** The README is explicit: *"on Opus-class models output costs 5× input."* Output-token reduction adds verbosity steering (a short "be terse" line appended to the system prompt) and effort routing (when a turn is just the model resuming after a tool result, the proxy dials the model's thinking effort down). `headroom output-savings` reports an **estimate with a confidence interval** by default; `HEADROOM_OUTPUT_HOLDOUT=0.1` leaves 10% of conversations unshaped as a control group ([proposal](https://github.com/headroomlabs-ai/headroom/blob/main/docs/proposals/output-token-reduction.md)).

**3. The compatibility matrix is broad.** `headroom wrap` works with Claude Code, Codex, Cursor, Aider, Copilot CLI, OpenClaw, OpenCode, and Cortex Code ([README](https://github.com/headroomlabs-ai/headroom#agent-compatibility-matrix)). OpenAI-compatible clients work through the proxy. Library integrations exist for the Vercel AI SDK, Anthropic and OpenAI SDKs, LiteLLM, LangChain, Agno, Strands, and ASGI apps. 48,803 stars in six months is unusually fast for a developer-tooling repo.

## Practical implications

- **The fastest path is one command:** `pip install "headroom-ai[all]"` and `headroom wrap claude`.
- **The proxy mode is the right answer for a stack you do not own.** `headroom proxy --port 8787` exposes a local proxy. v0.27.0's hot-reload means the running proxy reads live settings on every request.
- **The proxy model is local, not hosted.** The ML model (Kompress-v2-base) downloads from Hugging Face on first use; thereafter it runs locally via ONNX Runtime (Rust). The CCR cache is local.
- **The output-side shaper is opt-in for a reason.** `HEADROOM_OUTPUT_SHAPER=1` is off by default. A builder who wants the savings without the asterisks should configure the holdout up front.

A concrete worked example: the README's headline GIF caption: *"Live: 10,144 → 1,260 tokens — same FATAL found."* A 100-entry production log with a critical error at position 67, compressed to 1,260 tokens, with the model still answering all four questions correctly ([docs](https://headroom-docs.vercel.app/docs/smart-crusher)).

## Risks and caveats

1. **The 60-95% range is a range, not a guarantee.** A workload dominated by structured JSON will see the upper end; a workload dominated by already-compact source code or `grep` output will see **0%** (the docs flag this as *"Zero compression is intentional"*).
2. **The accuracy numbers are N=100.** Enough to show no regression, not a strong claim about general behaviour.
3. **Output savings are counterfactual by default.** `headroom output-savings` reports an estimate with a 95% confidence interval unless `HEADROOM_OUTPUT_HOLDOUT=0.1` is configured.
4. **The ML model downloads from Hugging Face on first use.** Corporate environments may need a pre-mirror of `chopratejas/kompress-v2-base`.
5. **The proxy intercepts all agent-to-LLM traffic.** v0.27.0 includes a new traffic-audit feature.
6. **Six months old, fast-moving.** Skip it if you only use a single provider's native compaction or work in a sandboxed environment.

## What to watch

1. Adoption beyond the 48K-star core — first-party Headroom integration in Claude Code, Codex, Cursor, Aider.
2. Output-side measurements at scale with the `HEADROOM_OUTPUT_HOLDOUT` pattern.
3. Expansion of the supported agent matrix.
4. Kompress-v2 model iterations.
5. Risk: a category leader emerges from a major agent vendor (Anthropic, OpenAI, Cursor, JetBrains).

## Verdict

Headroom v0.27.0 is a working, well-documented, four-mode open-source context-compression layer with a published 60-95% savings range and accuracy preserved on standard QA benchmarks. The local-only model, broad compatibility matrix, and CCR reversibility make it the most credible "drop-in" compression option for AI agents in 2026. The headline numbers are the authors' own; the output-side savings are counterfactual by default. Independent reproductions and measured output-side numbers are the next-cycle signals ([README, 2026-06-24](https://github.com/headroomlabs-ai/headroom/blob/main/README.md); [docs, 2026-06-24](https://headroom-docs.vercel.app/docs/benchmarks)).
