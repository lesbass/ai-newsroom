---
title: "CodeBurn: free, local-first cost tracker for 31 AI coding tools"
description: "CodeBurn (getagentseal/codeburn) reads the session files your AI coding tools already write, breaks down every token and dollar across 31 integrations, MIT, no proxy, no API key."
pubDate: 2026-06-29
author: "AI Newsroom"
tags: ["codeburn", "ai-coding", "cost-tracking", "token-spend", "local-first", "claude-code", "codex", "cursor", "opencode", "openclaw", "grok", "gemini-cli", "kiro", "warp", "mux", "vercel-ai-gateway", "typescript", "nodejs", "tui", "menubar", "spend-visibility", "mcp", "litellm", "claude-for-open-source", "mit-license", "cli", "developer-tools", "open-source"]
image: "/images/articles/codeburn-ai-coding-cost-tracker/hero.png"
imageAlt: "CodeBurn TUI dashboard showing a week of AI coding spend broken down by tool, by model, by project, by activity, by day, by core tools, by shell commands, and by MCP server."
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
  - title: "CodeBurn README \"How it reads your data\" table — per-provider data locations and parsing notes (Claude Code ~/.claude/projects/<sanitized-path>/<session-id>.jsonl, Codex ~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl, Cursor SQLite state.vscdb with bubbleId: prefix, OpenCode SQLite ~/.local/share/opencode/opencode*.db, Gemini CLI ~/.gemini/tmp/<project>/chats/); 13 task categories; 162 ISO 4217 currencies; LiteLLM pricing refreshed every 24h with hardcoded Claude / GPT-5 fallbacks; MCP-server attribution"
    url: "https://github.com/getagentseal/codeburn"
    date: 2026-06-29
    type: primary
  - title: "CodeBurn README \"Find and fix waste\" / \"Track what shipped\" / \"Compare models\" sections — codeburn optimize scans the last 30 days for re-read files, low Read:Edit ratio, uncapped BASH_MAX_OUTPUT_LENGTH, unused MCP servers, ghost agents/skills/slash commands, bloated CLAUDE.md with @-import expansion, cache-creation overhead, context-heavy sessions, possibly low-worth expensive sessions; A–F setup health grade; new / improving / resolved classification over a 48-hour recent window; codeburn yield classifies spend as Productive / Reverted / Abandoned against git commits; codeburn compare gives side-by-side one-shot rate, retry rate, self-correction, cost per call / per edit, output tokens per call, cache hit rate"
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

[CodeBurn](https://github.com/getagentseal/codeburn) is a free, MIT-licensed, local-first TypeScript CLI that reads the session files your AI coding tools already write to disk and breaks down every token and dollar by task, model, tool, and project — across 31 integrations, with no proxy, no API key, and nothing leaving your machine. As of 2026-06-29 the repo sits at **8,313 stars, 650 forks, 769 commits on `main`, 16 open issues, 15 open PRs** ([GitHub repository, 2026-06-29](https://github.com/getagentseal/codeburn)). The current line is **v0.9.14 (2026-06-22)** ([release notes](https://github.com/getagentseal/codeburn/releases/tag/v0.9.14)); the macOS menubar app ships separately as **mac-v0.9.14** on the same date. This is a builder-focused tool piece, not a benchmark.

## What it does

**The local-first architecture.** Per the README, *"Everything runs locally. No wrapper, no proxy, no API keys, nothing leaves your machine"* ([README, 2026-06-29](https://github.com/getagentseal/codeburn)). CodeBurn reads session files the tools already write — Claude Code's `~/.claude/projects/<sanitized-path>/<session-id>.jsonl`, Codex's `~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`, Cursor's `globalStorage/state.vscdb`, OpenCode's `~/.local/share/opencode/opencode*.db`, Gemini CLI's session files — and joins them by timestamp. Pricing comes from [LiteLLM](https://github.com/BerriAI/litellm) cached locally for 24 hours, with hardcoded fallbacks for Claude and GPT-5 models; v0.9.12 added automatic gap-fill from models.dev and OpenRouter so Fable 5 and Mythos 5 price correctly.

**The TUI dashboard.** `codeburn` opens an interactive TUI for the last 7 days. The header shows cost, calls, sessions, in / out / cache-write / cache-read tokens, and cache hit rate. Below: **Daily Activity**, **By Project**, **By Activity** (13 deterministic categories), **By Model**, **Core Tools** (Bash, Read, Edit, Grep, Write), **Shell Commands**, and **MCP Servers**. The dashboard auto-refreshes every 30 seconds.

**v0.9.14 additions (2026-06-22).** A new `codeburn web` browser dashboard (React + Recharts) on `localhost:4747`. PIN-paired multi-device combining via `codeburn share --pair`. New providers: **Grok Build, ZCode / z.ai GLM-5.2, Hermes Agent, Kiro CLI, Zerostack**. A `codeburn overview` plain-text monthly summary, Codex credit usage, MCP server usage in JSON / CSV exports, and OpenCode 1.1+ file-based sessions. v0.9.12 added `codeburn mcp` server (`get_usage`, `get_savings` over stdio) and providers Devin, Antigravity IDE, JetBrains via Copilot, coder/mux, Vercel AI Gateway.

**The macOS menubar app.** [mac-v0.9.14](https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14) ships native Swift / SwiftUI, refreshes every 30 seconds, supports Today / Week / Month / 6 Months, and v0.9.14 added a custom daily-budget alert.

**`codeburn optimize` — the waste-finder.** Scans the last 30 days for known cost leaks: re-read files, low Read:Edit ratio, uncapped `BASH_MAX_OUTPUT_LENGTH`, unused MCP servers, ghost agents/skills/slash commands, bloated `CLAUDE.md` files, cache-creation overhead, possibly low-worth expensive sessions. Each finding shows estimated savings plus a copy-pasteable fix. Findings are ranked by urgency and rolled up to an **A–F setup-health grade**.

**`codeburn yield` — the productivity breakdown.** Correlates AI sessions with git commits and classifies spend as **Productive** (commits landed in `main`), **Reverted** (commits were later reverted), or **Abandoned** (no commits near the session). Requires a git repository.

**Currency and plans.** 162 ISO 4217 currencies (FX from the European Central Bank via [Frankfurter](https://www.frankfurter.app/), refreshed every 24 hours, no API key). Subscription-plan tracking for Claude Pro / Max, Cursor Pro, and per-provider custom plans via `codeburn plan set`.

## Why it matters

Five reasons this is a day-one story on 2026-06-29.

1. **AI coding spend is the silent line item.** Most builders running Claude Code, Codex, and Cursor simultaneously have a spend problem they cannot see. CodeBurn is the only free, local-first, 31-tool option the Writer can verify end-to-end.
2. **Local-first is the differentiator.** Tools that *cut* tokens already exist. CodeBurn is about *seeing* the bill before you cut it.
3. **31 integrations is the breadth argument.** A team using Claude Code, Codex, OpenCode, and Gemini CLI simultaneously can see one combined total.
4. **The waste-finding loop is the workflow story.** `codeburn optimize` does not just report spend; it suggests copy-pasteable fixes.
5. **The yield command is the executive summary.** Productive vs Reverted vs Abandoned spend, correlated with git commits, is the question every AI-leadership meeting asks.

## Practical implications

- **If you use more than one AI coding tool, `npx codeburn` is the 30-second start.** No install, no account, no telemetry. The first run is typically when a builder realises 60% of the bill is one model on one project.
- **Pair `codeburn optimize` with `codeburn yield` weekly.** Optimize finds waste and prints copy-pasteable fixes; yield tells you which spend actually shipped.
- **For Cursor users, watch the "Auto (Sonnet est.)" rows.** Cursor's Auto mode hides the model; CodeBurn costs the row at Sonnet rates. The same caveat applies to Kiro and the GitHub Copilot legacy CLI.
- **For team settings, run the macOS menubar app and PIN-pair your machines.** No hosted backend; pairing is local-network only.

## Risks and caveats

1. **Single-maintainer project.** [@iamtoruk](https://github.com/iamtoruk) is the primary maintainer; v0.9.14 credits 8 external contributors, but the project is still 1.0 of one person.
2. **Token counts are accurate only for tools that write real counts.** **GitHub Copilot legacy CLI, Kiro, and Mistral Vibe are estimated** — Copilot editor transcripts carry no explicit counts; Kiro sessions are labelled `kiro-auto` and costed at Sonnet rates.
3. **Pricing accuracy depends on the upstream model name matching the LiteLLM catalog.** Behind a proxy that rewrites model names, CodeBurn will report `$0.00` until the user configures `codeburn model-alias`.
4. **`optimize` findings are heuristic, not causal.** Low Read:Edit ratio implies retry loops is a pattern, not a measurement of waste.
5. **Yield requires a git repository.** Sessions outside a git working directory are misclassified as Abandoned.
6. **No head-to-head benchmark against an alternative spend tracker** is on the record as of 2026-06-29.

## What to watch

- **A v1.0 release** marking the first "intended for production use" milestone.
- **New provider coverage** as each new AI coding tool requires its own parser.
- **Adoption in team / org settings** if a team-mode ships.
- **A first independent benchmark** against OpenAI's admin dashboard, Cursor's analytics, or a hosted spend tracker.

## Sources

- [GitHub — `getagentseal/codeburn` (README, LICENSE, "Supported tools" section, "How it reads your data" table, "Find and fix waste" / "Track what shipped" / "Compare models" sections) — 2026-06-29](https://github.com/getagentseal/codeburn)
- [GitHub — `getagentseal/codeburn` releases page (v0.9.14) — 2026-06-22](https://github.com/getagentseal/codeburn/releases/tag/v0.9.14)
- [GitHub — `getagentseal/codeburn` releases page (v0.9.12) — 2026-06-09](https://github.com/getagentseal/codeburn/releases/tag/v0.9.12)
- [GitHub — `getagentseal/codeburn` releases page (v0.9.11) — 2026-05-27](https://github.com/getagentseal/codeburn/releases/tag/v0.9.11)
- [GitHub — `getagentseal/codeburn` releases page (mac-v0.9.14) — 2026-06-22](https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14)
- [GitHub — `getagentseal/codeburn` LICENSE (MIT)](https://github.com/getagentseal/codeburn/blob/main/LICENSE)
- [npm — `codeburn` package (CLI distribution, Node.js 22.13+ runtime requirement) — 2026-06-29](https://www.npmjs.com/package/codeburn)
- [AI Newsroom — sitemap.xml (no prior CodeBurn article; 2026-06-29)](https://news.lesbass.com/sitemap.xml)
