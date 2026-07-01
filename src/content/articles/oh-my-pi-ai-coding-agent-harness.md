---
title: "oh-my-pi: a terminal agent that treats the harness as the product"
description: "can1357/oh-my-pi: a Rust-based terminal AI coding agent (fork of Mario Zechner's pi-mono) with Hashline edits, an advisor model, 40+ providers, 18-hour release cadence."
pubDate: 2026-06-26
author: "AI Newsroom"
tags: ["oh-my-pi", "omp", "ai-coding-agent", "harness", "harness-engineering", "hashline", "subagents", "advisor-model", "stream-rules", "lsp", "dap", "rust", "typescript", "bun", "claude", "openai", "gemini", "grok", "mcp", "terminal", "tui", "pi-mono", "mario-zechner", "can1357", "can-boluk", "multi-provider", "developer-tools", "open-source", "mit-license", "high-risk-claim"]
image: "/images/articles/oh-my-pi-ai-coding-agent-harness/section-readme-stats.png"
imageAlt: "Screenshot of the oh-my-pi GitHub README showing the 'Every tool, benchmaxed' table with four model rows (Grok Code Fast 1 6.7% to 68.3%, Gemini 3 Flash +5 pp, Grok 4 Fast minus 61 percent tokens, MiniMax 2.1x), the 'The Pi you love, with batteries included' heading, the '01 Code execution w/ tool-calling' section intro, and the fork provenance line 'Originally built on Mario Zechner's wonderful Pi, omp adds everything you're missing.'"
imageCredit: "Source: github.com/can1357/oh-my-pi/blob/main/README.md · Captured 2026-06-26 via Playwright Chromium · License: MIT (project) / screenshot used editorially for the oh-my-pi article"
sources:
  - title: "can1357/oh-my-pi — GitHub repository metadata (14,677 stars, 1,287 forks, 369 open issues, MIT, 10,671 commits, created 2025-12-31, pushed 2026-06-26)"
    url: "https://api.github.com/repos/can1357/oh-my-pi"
    date: 2026-06-26
    type: primary
  - title: "can1357/oh-my-pi — main README.md (fork relationship, 40+ providers, 32 tools, 14 LSP, 28 DAP, ~55k lines of Rust, every-tool-benchmaxed model table, 20 numbered sections, Pi fork lineage)"
    url: "https://raw.githubusercontent.com/can1357/oh-my-pi/main/README.md"
    date: 2026-06-26
    type: primary
  - title: "can1357/oh-my-pi — Releases API (v16.1.21 published 2026-06-26 05:55 UTC, v16.1.20 2026-06-25 21:01 UTC, v16.1.19 2026-06-25 11:30 UTC, v16.1.16 2026-06-23 13:13 UTC, v16.1.15 2026-06-22 16:33 UTC, v16.1.14 2026-06-22 05:41 UTC)"
    url: "https://api.github.com/repos/can1357/oh-my-pi/releases?per_page=10"
    date: 2026-06-26
    type: primary
  - title: "can1357/oh-my-pi — main LICENSE (MIT, copyright Mario Zechner 2025, copyright Can Bölük 2025-2026)"
    url: "https://raw.githubusercontent.com/can1357/oh-my-pi/main/LICENSE"
    date: 2026-06-26
    type: primary
  - title: "can1357/oh-my-pi — CONTRIBUTING.md (vouch-based contribution system, !vouch / !denounce commands, VOUCHED.td as the source of truth)"
    url: "https://raw.githubusercontent.com/can1357/oh-my-pi/main/CONTRIBUTING.md"
    date: 2026-06-26
    type: primary
  - title: "can1357/oh-my-pi — @oh-my-pi/hashline package README (line-anchored patch language, [PATH#TAG] sections, SWAP/INS/DEL operations, snapshot-store content hashes, 3-way-merge stale-anchor recovery)"
    url: "https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/hashline/README.md"
    date: 2026-06-26
    type: primary
  - title: "can1357/oh-my-pi — @oh-my-pi/pi-agent package README (Agent class, transformContext / convertToLlm pipeline, custom AgentMessage types, steering, follow-up, telemetry, per-event subscription)"
    url: "https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/agent/README.md"
    date: 2026-06-26
    type: primary
  - title: "can1357/oh-my-pi — blog post 'I Improved 15 LLMs at Coding in One Afternoon. Only the Harness Changed.' (Can Bölük, 2026-02-12, blog.can.ac; documents the 540-task edit benchmark, the 16-model × 3-edit-format matrix, the 300 USD cost, the Hashline 2-3 char content-hash format, the per-model improvements, the patch failure rate on Grok 4 at 50.7% and GLM-4.7 at 46.2%)"
    url: "https://blog.can.ac/2026/02/12/the-harness-problem/"
    date: 2026-02-12
    type: primary
  - title: "can1357/oh-my-pi — packages/coding-agent CHANGELOG and Releases page (recent v16.1.x cadence, the 2026-06-25 / 2026-06-26 burst of v16.1.19 → v16.1.20 → v16.1.21 with macOS / Linux / Windows binaries)"
    url: "https://github.com/can1357/oh-my-pi/releases"
    date: 2026-06-26
    type: primary
  - title: "earendil-works/pi — the upstream Pi project (formerly badlogic/pi-mono; 65.7k stars, MIT, 240 releases, v0.80.2 latest on 2026-06-23)"
    url: "https://github.com/earendil-works/pi"
    date: 2026-06-26
    type: primary
  - title: "omp.sh — project homepage (linked from GitHub repository homepage field; canonical docs at omp.sh/docs/tools, omp.sh/docs/providers, omp.sh/docs/sdk)"
    url: "https://omp.sh/"
    date: 2026-06-26
    type: primary
highRiskClaims: true
---

On **2026-06-26**, [`can1357/oh-my-pi`](https://github.com/can1357/oh-my-pi) — a fork of Mario Zechner's `pi-mono`, re-engineered into a terminal AI coding agent called **`omp`** — sat at **14,677 stars, 1,287 forks, 369 open issues, 10,671 commits, MIT, created 2025-12-31** ([metadata](https://api.github.com/repos/can1357/oh-my-pi)). Three releases (v16.1.19, v16.1.20, v16.1.21) shipped in the 18 hours before publication. That cadence is the signal worth understanding.

## What it is

**A terminal coding agent, not a wrapper.** `omp` ships as a single Rust binary on macOS, Linux, Windows (no WSL bridge). Install: `curl -fsSL https://omp.sh/install | sh` on Unix, `irm https://omp.sh/install.ps1 | iex` on Windows, `brew install can1357/tap/omp`, or `bun install -g @oh-my-pi/pi-coding-agent`. Four entry points: TUI, one-shot prompt, Node SDK, stdio RPC / ACP.

**The fork relationship.** `oh-my-pi` is a fork of [Mario Zechner's Pi](https://github.com/earendil-works/pi) — previously at `badlogic/pi-mono`. LICENSE: *"© 2025 Mario Zechner / © 2025-2026 Can Bölük."* Upstream Pi: 65.7k stars, MIT, 240 releases. The maintainer's framing: *"The model is the moat. The harness is the bridge. Burning bridges just means fewer people bother to cross."* ([blog.can.ac, 2026-02-12](https://blog.can.ac/2026/02/12/the-harness-problem/)).

**The four numbers.** **40+ providers** (Anthropic, OpenAI, Gemini, xAI Grok, Mistral, Groq, Cerebras, Fireworks, Together, Hugging Face, NVIDIA NIM, OpenRouter, Ollama, llama.cpp, vLLM, LiteLLM). **32 built-in tools** plus **14 LSP + 28 DAP operations**. **~55k lines of Rust** in the N-API addon.

## Why it matters

The harness is the boundary between *"the model knows what to change"* and *"the change is on disk."* Most agents leave that boundary to a thin wrapper around `read`, `str_replace`, and `bash`. `omp` treats it as a product surface. Four mechanisms carry the load.

**1 · Hashline — edit by content hash.** The harness tags every read line with a 2-3 hex character content hash; every patch is anchored to a `[PATH#TAG]` full-file content hash, and **rejects the patch before it corrupts anything** if the file has changed. The model never retypes the lines it wants to change; the harness resolves the anchor and applies SWAP / INS / DEL operations ([hashline README](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/hashline/README.md)).

**2 · First-class subagents with schema-validated yield.** The `task` tool fans out into isolated worktrees; the final yield is a **schema-validated object the parent reads directly** — no prose to parse.

**3 · Time-traveling stream rules.** A regex match against the streaming model output aborts mid-token, **injects the rule as a system reminder, and retries from the same point.** README example: the model is about to write `Box::leak`; the request aborts, an amber card injects *"Don't reach for `Box::leak` in production code paths,"* and the agent course-corrects to `Arc<str>`.

**4 · The advisor model.** A second model on the `advisor` role reads every turn and injects notes inline. Stream rules catch mechanical departures from policy; the advisor catches semantic drift.

Plus: **native on Windows** (`ripgrep`, `glob`, `find`, `brush` in-process); **eight-format config import** (Cursor MDC, Cline `.clinerules`, Codex `AGENTS.md`, Copilot `applyTo`); **18-hour release cadence** with fixes at the right depth.

## The benchmark

The README publishes a 540-task, 16-model benchmark (3 runs per task, fresh session each time):

| Model | Metric | What |
|---|---|---|
| Grok Code Fast 1 | 6.7% → 68.3% | Tenfold lift when the edit format stops eating the model |
| Gemini 3 Flash | +5 pp | Over `str_replace` — beats Google's own best attempt |
| Grok 4 Fast | −61% tokens | Output collapses once the retry loop on bad diffs disappears |
| MiniMax | 2.1× | Pass rate more than doubles, same weights, same prompt |

**All four are project-published and self-attributed.** Treat the spread as the order-of-magnitude the harness contribution can deliver, not a contract ([README](https://raw.githubusercontent.com/can1357/oh-my-pi/main/README.md)).

## Practical implications

- **For harness evaluators.** The right question is "which agent's tool boundary is best" — not "which agent is best." All of `omp`'s load-bearing moves are harness-side.
- **For teams replacing Claude Code / Codex CLI today.** Migration cost is low — `omp` reads Cursor MDC, Cline `.clinerules`, Codex `AGENTS.md`, Copilot `applyTo` in their native shape, and the same binary runs against Anthropic, OpenAI, xAI, Google, Mistral, Groq, Ollama, or `llama.cpp`.
- **For researchers.** Hashline lives in `packages/hashline`; the agent runtime in `packages/agent` exposes typed events.

## What to watch

1. **Independent reproduction of the 16-model × 3-edit-format matrix** on a model not in the original sixteen.
2. **Upstream Pi merge cadence** — `omp` is a fork, not a vendor branch.
3. **The advisor model in real sessions** — no published benchmark yet.
4. **`/collab` and the `my.omp.sh` relay** — third-party service, no SLO.
5. **VOUCHED.td governance** — a public denouncement list of bad actors.

## Risks and caveats

- **The 10× lift numbers are project-published and self-attributed.** Treat as the order-of-magnitude the harness contribution can deliver, not a bill-line guarantee.
- **The `my.omp.sh` relay is a third-party dependency.** Frames are sealed client-side; that protects content, not availability.
- **Supply-chain surface is large.** 40+ provider SDKs, 14 web-search backends, MCP, ACP, Discord, four platform-tagged binaries.
- **369 open issues / 10,671 commits is a velocity signal, not a stability signal.** Six tags in 72 hours.
- **MIT is permissive; the maintenance commitment is not guaranteed.** Pin a release tag. Vouch-based contribution model; one maintainer's call.

## Verdict

[`can1357/oh-my-pi`](https://github.com/can1357/oh-my-pi) — the fork of Mario Zechner's Pi shipping as `omp` — sat at **14,677 stars, 1,287 forks, 369 open issues, 10,671 commits, MIT**, with a Rust core of ~55k lines, 40+ LLM providers, and a project-published 16-model edit benchmark. The 18-hour release cadence is the second load-bearing signal: a project using its own binary. The takeaway is **harness engineering** — *the model is the moat, the harness is the bridge* — a working MIT-licensed demo of a serious agent boundary in 2026. *Pin a release tag, read `packages/hashline`.*

## Sources

- [can1357/oh-my-pi — GitHub repository metadata (2026-06-26)](https://api.github.com/repos/can1357/oh-my-pi)
- [can1357/oh-my-pi — main README (2026-06-26)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/README.md)
- [can1357/oh-my-pi — Releases API (2026-06-26)](https://api.github.com/repos/can1357/oh-my-pi/releases?per_page=10)
- [can1357/oh-my-pi — hashline package README (2026-06-26)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/hashline/README.md)
- [can1357/oh-my-pi — pi-agent package README (2026-06-26)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/agent/README.md)
- [can1357/oh-my-pi — main LICENSE (2026-06-26)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/LICENSE)
- [can1357/oh-my-pi — CONTRIBUTING.md (2026-06-26)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/CONTRIBUTING.md)
- [Can Bölük — *I Improved 15 LLMs at Coding in One Afternoon. Only the Harness Changed.* (blog.can.ac, 2026-02-12)](https://blog.can.ac/2026/02/12/the-harness-problem/)
- [earendil-works/pi — upstream Pi project (2026-06-26)](https://github.com/earendil-works/pi)
- [omp.sh — project homepage (2026-06-26)](https://omp.sh/)
