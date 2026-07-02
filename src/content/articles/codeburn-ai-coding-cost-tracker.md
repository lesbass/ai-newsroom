---
title: "CodeBurn: a free, local-first cost tracker for 31 AI coding tools"
description: "Free, MIT, local-first TypeScript CLI that reads 31 AI coding tools' session files and breaks down tokens and dollars by task, model, and project — no proxy, no API key."
pubDate: 2026-06-29
author: "AI Newsroom"
tags: ["codeburn", "ai-coding", "cost-tracking", "token-spend", "local-first", "claude-code", "codex", "cursor", "opencode", "openclaw", "grok", "gemini-cli", "kiro", "warp", "mux", "vercel-ai-gateway", "typescript", "nodejs", "tui", "menubar", "spend-visibility", "mcp", "litellm", "claude-for-open-source", "mit-license", "cli", "developer-tools", "open-source"]
image: "/images/articles/codeburn-ai-coding-cost-tracker/hero.png"
imageAlt: "CodeBurn TUI dashboard showing a week of AI coding spend broken down by tool, by model, by project, by activity, by day, by core tools, by shell commands, and by MCP server. The headline row reads $1,497.93 across 17,277 calls, 2,204 sessions, 100% cache hit, 891.6K input / 5.2M output / 2,394.6M cached / 45.3M written."
imageCredit: "Source: github.com/getagentseal/codeburn/blob/main/assets/dashboard.jpg · Captured 2026-06-29 via Playwright Chromium + @sparticuz/chromium (re-rendered with editorial caption and license) · License: MIT (project); screenshot used editorially for the CodeBurn article on news.lesbass.com"
sources:
  - title: "CodeBurn repository on GitHub (getagentseal/codeburn) — 8,313 stars, 650 forks, 769 commits, 16 open issues, 15 open PRs, MIT, \"Claude for Open Source Recipient\" badge, 31 supported tools in the README"
    url: "https://github.com/getagentseal/codeburn"
    date: 2026-06-29
    type: primary
  - title: "CodeBurn v0.9.14 release notes — browser dashboard (codeburn web, localhost:4747), PIN-paired share/devices, new providers Grok Build / ZCode (z.ai GLM-5.2) / Hermes Agent / Kiro CLI / Zerostack, codeburn overview, Codex credit usage, MCP server usage in JSON/CSV exports, OpenCode 1.1+ file-based sessions, daily cache v9"
    url: "https://github.com/getagentseal/codeburn/releases/tag/v0.9.14"
    date: 2026-06-22
    type: primary
  - title: "CodeBurn v0.9.12 release notes — codeburn mcp server (get_usage, get_savings, project names pseudonymized by default), new providers Devin / Antigravity IDE / JetBrains (IntelliJ/DataGrip) via Copilot / coder/mux / Vercel AI Gateway, automatic pricing gap-fill from models.dev and OpenRouter, Fable 5 + Mythos 5 launch pricing + names, per-file parse isolation"
    url: "https://github.com/getagentseal/codeburn/releases/tag/v0.9.12"
    date: 2026-06-09
    type: primary
  - title: "CodeBurn v0.9.11 release notes — Warp provider adapter, file-aware retry detection with typed ToolCall, multi-day calendar selection with custom popover UI, Forge provider support, menubar loading recovery with exponential backoff (8s to 60s, 6 attempts max), Cursor state.vscdb range-aware scan, OpenCode provider refactored to shared SQLite parser"
    url: "https://github.com/getagentseal/codeburn/releases/tag/v0.9.11"
    date: 2026-05-27
    type: primary
  - title: "CodeBurn macOS menubar v0.9.14 — separate release by github-actions on 2026-06-22; install via codeburn menubar; native Swift / SwiftUI app under mac/; 30s refresh; custom daily budget alert"
    url: "https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14"
    date: 2026-06-22
    type: primary
  - title: "CodeBurn README \"How it reads your data\" table — per-provider data locations and parsing notes (Claude Code ~/.claude/projects/<sanitized-path>/<session-id>.jsonl, Codex ~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl, Cursor SQLite state.vscdb with bubbleId: prefix, OpenCode SQLite ~/.local/share/opencode/opencode*.db, Gemini CLI ~/.gemini/tmp/<project>/chats/, Antigravity, Copilot, Kiro, Mistral Vibe, OpenClaw, Warp, Forge, Pi / OMP, Codebuff, Cline / Roo Code / KiloCode, IBM Bob, Kimi Code CLI, Vercel AI Gateway); 13 task categories; 162 ISO 4217 currencies; LiteLLM pricing refreshed every 24h with hardcoded Claude / GPT-5 fallbacks; MCP-server attribution"
    url: "https://github.com/getagentseal/codeburn"
    date: 2026-06-29
    type: primary
  - title: "CodeBurn README \"Find and fix waste\" / \"Track what shipped\" / \"Compare models\" sections — codeburn optimize scans the last 30 days for re-read files, low Read:Edit ratio, uncapped BASH_MAX_OUTPUT_LENGTH, unused MCP servers, ghost agents/skills/slash commands, bloated CLAUDE.md with @-import expansion, cache-creation overhead, context-heavy sessions, possibly low-worth expensive sessions; A–F setup health grade; new / improving / resolved classification over a 48-hour recent window. codeburn yield classifies spend as Productive / Reverted / Abandoned against git commits. codeburn compare gives side-by-side one-shot rate, retry rate, self-correction, cost per call / per edit, output tokens per call, cache hit rate"
    url: "https://github.com/getagentseal/codeburn"
    date: 2026-06-29
    type: primary
  - title: "CodeBurn LICENSE (MIT)"
    url: "https://github.com/getagentseal/codeburn/blob/main/LICENSE"
    date: 2026-06-29
    type: primary
  - title: "CodeBurn npm package (codeburn) — published as a CLI on the public registry, with bunx codeburn / npx codeburn / brew install codeburn install paths and Node.js 22.13+ as the runtime requirement"
    url: "https://www.npmjs.com/package/codeburn"
    date: 2026-06-29
    type: primary
  - title: "AI Newsroom sitemap.xml (2026-06-29) — no CodeBurn article has been published on news.lesbass.com prior to this one; the closest existing pieces are the headroom token-compression article (different category: measurement vs reduction) and the codebase-memory-mcp / oh-my-pi pieces (different subjects)"
    url: "https://news.lesbass.com/sitemap.xml"
    date: 2026-06-29
    type: secondary
highRiskClaims: false
---

[CodeBurn](https://github.com/getagentseal/codeburn) is a free, MIT-licensed, local-first TypeScript CLI that reads the session files your AI coding tools already write to disk and breaks down every token and dollar by task, model, tool, and project — across 31 integrations, with no proxy, no API key, and nothing leaving your machine. As of 2026-06-29 the [repo](https://github.com/getagentseal/codeburn) reports 8,313 stars, 650 forks, 769 commits, 16 open issues, 15 open PRs, an MIT license, and a "Claude for Open Source Recipient" badge. The current line is **v0.9.14** (2026-06-22) for the CLI and **mac-v0.9.14** (2026-06-22) for the macOS menubar.

## What happened

**Latest CLI release — v0.9.14 (2026-06-22).** Ships a browser dashboard at `localhost:4747`, PIN-paired multi-device combining on the local network, five new providers (Grok Build, ZCode / z.ai GLM-5.2, Hermes Agent, Kiro CLI, Zerostack), a `codeburn overview` plain-text monthly summary, Codex credit usage, MCP server usage in JSON / CSV exports, OpenCode 1.1+ file-based sessions, and a new "daily cache v9" that backfills new providers across history without a manual clear ([release notes](https://github.com/getagentseal/codeburn/releases/tag/v0.9.14)).

**Prior CLI release — v0.9.12 (2026-06-09).** Added the `codeburn mcp` server (`get_usage`, `get_savings` to AI agents over stdio, with project names pseudonymized by default), five more providers (Devin, Antigravity IDE, JetBrains via Copilot, coder / mux, Vercel AI Gateway), and **automatic pricing gap-fill from models.dev and OpenRouter** so models LiteLLM has not yet indexed (Fable 5, Mythos 5) price correctly without a manual patch ([release notes](https://github.com/getagentseal/codeburn/releases/tag/v0.9.12)).

**Prior CLI release — v0.9.11 (2026-05-27).** Warp provider adapter, file-aware retry detection, multi-day calendar selection, Forge provider support, and a menubar loading-recovery watchdog rewritten with exponential backoff ([release notes](https://github.com/getagentseal/codeburn/releases/tag/v0.9.11)).

**macOS menubar — mac-v0.9.14 (2026-06-22).** Native Swift / SwiftUI under `mac/`, 30s refresh, Today / Week / Month / 6 Months periods, custom daily-budget alert; install via `codeburn menubar` ([release](https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14)).

**Local-first architecture.** The README's headline: *"Everything runs locally. No wrapper, no proxy, no API keys, nothing leaves your machine."* CodeBurn reads Claude Code's `~/.claude/projects/.../jsonl`, Codex's `~/.codex/sessions/.../rollout-*.jsonl`, Cursor's `globalStorage/state.vscdb`, OpenCode's `~/.local/share/opencode/opencode*.db`, and the session files of the other supported tools, joining them by timestamp. Pricing comes from [LiteLLM](https://github.com/BerriAI/litellm), cached 24h at `~/.cache/codeburn/`, with hardcoded fallbacks for all Claude and GPT-5 models; v0.9.12 added the models.dev + OpenRouter gap-fill.

**The dashboard.** `codeburn` opens an interactive TUI: header (cost, calls, sessions, in / out / cache tokens, cache-hit rate), Daily Activity, By Project, By Activity (13 categories), By Model, Core Tools (Bash, Read, Edit, Grep, Write), Shell Commands, and MCP Servers. Arrow keys switch periods; `c` opens model comparison; `o` opens optimize. `codeburn optimize` scans 30 days for waste (re-read files, low Read:Edit ratio, uncapped `BASH_MAX_OUTPUT_LENGTH`, ghost agents / skills, bloated `CLAUDE.md`) and rolls up to an **A–F setup-health grade**. `codeburn yield` correlates AI sessions with git commits (Productive / Reverted / Abandoned). `codeburn compare` gives per-model one-shot rate, retry rate, self-correction, cost per call, output tokens per call, cache hit rate.

## Why it matters

**AI coding spend is the silent line item in 2026 dev budgets.** CodeBurn is the only free, local-first, 31-tool option the Writer can verify end-to-end. **Local-first is the differentiator** — tools that *cut* tokens exist; CodeBurn is about *seeing* the bill before you cut it. The browser dashboard binds to `localhost:4747`; multi-device combining is PIN-paired on the local network. **31 integrations is the breadth argument** — one combined total across Claude Code, Codex, OpenCode, and Gemini CLI on one machine, broken down per tool. **The waste-finding loop is the workflow** — `codeburn optimize` does not just report spend; it suggests copy-pasteable fixes (`CLAUDE.md` line, env var, `mv` command). The loop is **scan → fix → re-scan → watch the grade improve**.

## Practical implications

1. **`npx codeburn` is the 30-second start.** No install, no account, no telemetry; the TUI shows where the last 7 days went.
2. **Pair `optimize` with `yield` weekly.** Optimize finds waste; yield tells you which spend actually shipped (commits in `main`).
3. **Cursor "Auto" rows are estimates.** Cursor's "Auto" mode hides the model; CodeBurn costs it at Sonnet rates and labels it "Auto (Sonnet est.)". Same caveat for Kiro and the GitHub Copilot legacy CLI.
4. **PIN-pair your machines via the menubar app.** No hosted backend; the pairing is local-network only.
5. **`codeburn compare` weekly for model-choice decisions.** A pattern of Opus 4.6 dominating cost on small turns suggests overpowered-model waste, not that Opus is "bad".

## Risks and caveats

- **Single-maintainer project** ([@iamtoruk](https://github.com/iamtoruk)); v0.9.14 credits 8 external contributors, but the bus factor is still improving. No SLA, no commercial support.
- **Token counts are estimated for GitHub Copilot (legacy CLI), Kiro, and Mistral Vibe** — those tools don't write structured session files. Real counts only for Claude Code, Codex, OpenCode, Gemini CLI, Pi / OMP.
- **Pricing depends on LiteLLM catalog matching.** Behind a proxy that rewrites model names, CodeBurn reports `$0.00` until the user runs `codeburn model-alias`. v0.9.12 added models.dev + OpenRouter gap-fill.
- **Optimize findings are heuristic, not causal.** Low Read:Edit ratio is a pattern, not a measurement of waste.
- **Yield requires a git repository.** Sessions outside a git working directory, or in repos where commits are not pushed, are misclassified as Abandoned.

## What to watch

- A **v1.0 release** marking "intended for production use."
- New provider coverage; the first OpenCode-only or Kiro-only shop that adopts CodeBurn will surface coverage gaps.
- Pricing for new model families (next launch will stress the models.dev + OpenRouter gap-fill).
- A first independent benchmark — the Writer must not invent one.

## Sources

- [GitHub — getagentseal/codeburn (README, LICENSE, 31 tools)](https://github.com/getagentseal/codeburn)
- [GitHub — v0.9.14 release notes](https://github.com/getagentseal/codeburn/releases/tag/v0.9.14)
- [GitHub — v0.9.12 release notes](https://github.com/getagentseal/codeburn/releases/tag/v0.9.12)
- [GitHub — v0.9.11 release notes](https://github.com/getagentseal/codeburn/releases/tag/v0.9.11)
- [GitHub — mac-v0.9.14 release](https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14)
- [GitHub — CodeBurn LICENSE (MIT)](https://github.com/getagentseal/codeburn/blob/main/LICENSE)
- [npm — codeburn package](https://www.npmjs.com/package/codeburn)
- [AI Newsroom — sitemap.xml](https://news.lesbass.com/sitemap.xml)
