---
title: "context-mode: 98% context savings and session continuity across 17 AI coding agents"
description: "mksglu/context-mode is a 19.4k★ MCP server with 98% tool-output savings, SQLite/FTS5 session-continuity, and 17 supported agent platforms — under an ELv2 license."
pubDate: 2026-07-29
author: "AI Newsroom"
tags:
  - context-mode
  - mcp
  - context-engineering
  - context-window
  - ai-coding-agents
  - token-savings
  - compaction
  - elv2
  - ai-newsroom-coverage
image: "/images/articles/context-mode/hero-desktop.svg"
imageAlt: "context-mode README at github.com/mksglu/context-mode on 2026-07-29, showing the 'Used across teams at' logo grid and the 'How Context Mode Solves It' four-bullet block: Context Saving, Session Continuity, Think in Code, No prose-style enforcement."
imageCredit: "Source: https://github.com/mksglu/context-mode · Captured 2026-07-29 via Playwright Chromium · Project license: ELv2."
highRiskClaims: false
sources:
  - title: "mksglu/context-mode — GitHub repository"
    url: "https://github.com/mksglu/context-mode"
    date: 2026-07-29
    type: primary
  - title: "mksglu/context-mode — BENCHMARK.md"
    url: "https://github.com/mksglu/context-mode/blob/main/BENCHMARK.md"
    date: 2026-07-29
    type: primary
  - title: "mksglu/context-mode — LICENSE (ELv2)"
    url: "https://github.com/mksglu/context-mode/blob/main/LICENSE"
    date: 2026-07-29
    type: primary
  - title: "mksglu/context-mode — package.json"
    url: "https://github.com/mksglu/context-mode/blob/main/package.json"
    date: 2026-07-29
    type: primary
  - title: "Hacker News — context-mode discussion (front page)"
    url: "https://news.ycombinator.com/"
    date: 2026-07-29
    type: secondary
  - title: "Ratel: AI agent context engineering (AI Newsroom, 2026-07-11)"
    url: "https://news.lesbass.com/articles/ratel-context-engineering-tool-catalog/"
    date: 2026-07-11
    type: secondary
  - title: "Headroom: AI agent token compression (AI Newsroom, 2026-06-24)"
    url: "https://news.lesbass.com/articles/headroom-ai-agent-token-compression/"
    date: 2026-06-24
    type: secondary
  - title: "codebase-memory-mcp: zero-dependency code intelligence (AI Newsroom, 2026-06-24)"
    url: "https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/"
    date: 2026-06-24
    type: secondary
  - title: "AIN-544 — RepoScout radar 2026-07-29 (Paperclip)"
    url: "https://news.lesbass.com/paperclip/AIN-544"
    date: 2026-07-29
    type: secondary
  - title: "AIN-545 — Article candidate: context-mode (Paperclip)"
    url: "https://news.lesbass.com/paperclip/AIN-545"
    date: 2026-07-29
    type: secondary
---

[mksglu/context-mode](https://github.com/mksglu/context-mode) is a 19,414&starf; MCP server that combines a 98% tool-output reduction sandbox, SQLite + FTS5 session-continuity across conversation compactions, a "think in code" paradigm, and 17 supported AI coding agent platforms — all under an ELv2 (source-available) license. Per the project's own [BENCHMARK.md](https://github.com/mksglu/context-mode/blob/main/BENCHMARK.md): 21 scenarios, 376 KB raw data processed into 16.5 KB of context, for a 96% overall savings with 100% code-example preservation.

## What happened

Every MCP tool call dumps raw data into the context window. A Playwright snapshot costs 56 KB. Twenty GitHub issues cost 59 KB. One nginx access log — 45 KB. After 30 minutes, 40% of the context is gone (README, 2026-07-29). mksglu/context-mode attacks this with four integrated subsystems packed into a single npm package registered across 17 AI coding agent platforms.

The repo stands at **19,414&starf; / 1,400+ forks / 2,108 commits** as of 2026-07-29 (live-verified at [github.com/mksglu/context-mode](https://github.com/mksglu/context-mode)). It recently hit the front page of Hacker News. The project lists "Used across teams at" logos for Microsoft, Google, Meta, Amazon, NVIDIA, and Stripe in its README — self-disclosed in the project's own README, not a customer reference.

## The four sub-problems

Per the README, context-mode addresses four concrete pain points of the AI agent context window:

- **Tool output flood.** A Playwright snapshot costs 56 KB, 20 GitHub issues cost 59 KB, a single access log costs 45 KB. After 30 minutes, 40% of the context is gone.
- **Session-compaction amnesia.** When the conversation compacts to free space, the agent forgets which files it was editing, what tasks are in progress, and what the user last asked for.
- **LLM as data processor.** Agents read 50 files into context to count functions when a one-line script that `console.log`s the result is faster and uses 100× less context.
- **Prose-style enforcement.** Some aggressive-brevity prompts degrade coding and reasoning benchmarks. The project deliberately does not dictate how the model writes its answer.

## The four-part solution

| Layer | What it does |
|---|---|
| **Context Saving** | Sandbox tools (`ctx_execute_file`, `ctx_index`, `ctx_search`) keep raw data out of the context window. README hero: 315 KB raw → 5.4 KB (98% reduction). |
| **Session Continuity** | Every file edit, git operation, task, error, and user decision is tracked in SQLite. On compaction, events are indexed into FTS5 and retrieved via BM25 search — the model picks up exactly where it left off. |
| **Think in Code** | Instead of 47 `Read()` calls worth 700 KB, the agent writes one `ctx_execute("javascript", ...)` script that `console.log`s the result — 3.6 KB. Mandatory across all 17 clients. |
| **No prose enforcement** | The project keeps raw data out of context but never dictates how the model writes its final answer. Brevity, completeness, formatting — the model's call. |

## The benchmark numbers

Per the project's [BENCHMARK.md](https://github.com/mksglu/context-mode/blob/main/BENCHMARK.md) (21 scenarios, 376 KB raw → 16.5 KB context):

| Benchmark slice | Scenarios | Raw → Context | Savings |
|---|---|---|---|
| **Part 1: `ctx_execute_file`** (structured data) | 14 | 315 KB → 5.5 KB | **98%** |
| **Part 2: `ctx_index` + `ctx_search`** (knowledge retrieval) | 6 | 60.3 KB → 11.0 KB | **82%** |
| **Part 3: Large-output externalization** | 1 | Data >100 KB auto-indexed to FTS5 | Pointer only |
| **Full debugging session** | — | 177.1 KB → 10.2 KB (~45,300 → ~2,600 tokens) | **94% more context free** |

Representative `ctx_execute_file` rows: Playwright page snapshot 56.2 KB → 299 B (99%), nginx access log 45.1 KB → 155 B (100%), analytics CSV 85.5 KB → 222 B (100%). All 125 tests pass. The benchmark is the project's own fixture set, not an independent replication.

## The 17-platform scope

**Full plugin (MCP + hooks + skills + slash commands):** Claude Code (marketplace), OpenCode, KiloCode, OMP (Oh My Pi), Antigravity CLI / agy, GitHub Copilot CLI, Codex CLI.

**MCP + hooks (manual config):** Gemini CLI, VS Code Copilot, JetBrains Copilot, Cursor (work in progress — marketplace awaiting Cursor team review), Kiro, Kimi Code, Qwen Code, OpenClaw / Pi Agent.

**MCP-only (no hook support):** Zed, Antigravity IDE.

The project counts "17 supported clients, plus the OpenClaw gateway integration." On Claude Code, the install is two commands: `/plugin marketplace add mksglu/context-mode`, then `/plugin install context-mode@context-mode`. All 11 `ctx_*` tools become available.

## The license, in plain language

context-mode is licensed under the **Elastic License 2.0 (ELv2)** — the source is fully readable, anyone can install it locally, and the project accepts upstream contributions. The hosted-service restriction prevents others from selling context-mode as a managed SaaS. For a developer running `npm install -g context-mode` and using it as a Claude Code or Cursor plugin on their own machine, ELv2 has no practical impact.

## Practical implications for builders

- **If you hit compaction amnesia on a long Claude Code session**, context-mode is the simplest drop-in fix: the SessionStart hook injects the routing block, PreCompact builds a resume snapshot, and the next session's `ctx_search` retrieves only the relevant events.
- **If you burn context on tool output**, `ctx_execute_file` compresses the result to a one-line summary; the full content lives in FTS5, queryable on demand.
- **If your agent reads 50 files to count functions**, write a one-line `ctx_execute` script instead — 100× less context, same answer.
- **If you bounce between Claude Code and Cursor**, the same context-mode install is reachable from both.
- **If you need a hosted service**, this is not the project for that — ELv2 prevents a managed offering.

## Risks and caveats

- The 96% / 98% / 82% / 94% numbers are the project's own BENCHMARK.md, not an independent evaluation.
- The "Used across teams at" logos in the README are self-disclosed, not customer announcements.
- ELv2 is source-available, not OSI-approved open source. The article says this in plain language above.
- context-mode runs user-level MCP tools that read files, run shell commands, and access the network — the same risk profile as any MCP tool.
- The Cursor marketplace plugin is work in progress (tracking #485 / #489); the local-folder install path is a documented workaround.
- This article covers one tool in a growing context-engineering category. Adjacent tools — [Ratel](https://news.lesbass.com/articles/ratel-context-engineering-tool-catalog/) (BM25 tool catalog), [Headroom](https://news.lesbass.com/articles/headroom-ai-agent-token-compression/) (transparent compression proxy), and [codebase-memory-mcp](https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/) (code-intelligence graph) — solve different sub-problems and are not compared here.

## What to watch

- The Cursor marketplace plugin (tracking #485 / #489).
- Any change in ELv2 terms or a re-license to Apache-2.0 / MIT.
- The first independent third-party benchmark on a non-fixture workload.
- New client platforms — the list has grown from 2 (Claude Code, Gemini CLI) to 17+.
- The next `ctx_execute` major version — currently on rapid minor-version cadence.

## Sources

- [mksglu/context-mode — GitHub repository (2026-07-29)](https://github.com/mksglu/context-mode)
- [mksglu/context-mode — BENCHMARK.md (2026-07-29)](https://github.com/mksglu/context-mode/blob/main/BENCHMARK.md)
- [mksglu/context-mode — LICENSE (ELv2, 2026-07-29)](https://github.com/mksglu/context-mode/blob/main/LICENSE)
- [mksglu/context-mode — package.json (2026-07-29)](https://github.com/mksglu/context-mode/blob/main/package.json)
- [Hacker News — context-mode discussion (2026-07-29)](https://news.ycombinator.com/)
- [Ratel: AI agent context engineering — AI Newsroom (2026-07-11)](https://news.lesbass.com/articles/ratel-context-engineering-tool-catalog/)
- [Headroom: AI agent token compression — AI Newsroom (2026-06-24)](https://news.lesbass.com/articles/headroom-ai-agent-token-compression/)
- [codebase-memory-mcp: zero-dependency code intelligence — AI Newsroom (2026-06-24)](https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/)
- [AIN-544 — RepoScout radar 2026-07-29 (Paperclip)](https://news.lesbass.com/paperclip/AIN-544)
- [AIN-545 — Article candidate: context-mode (Paperclip)](https://news.lesbass.com/paperclip/AIN-545)
