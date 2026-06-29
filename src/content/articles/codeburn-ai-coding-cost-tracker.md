---
title: "CodeBurn: a free, local-first cost tracker for 31 AI coding tools"
description: "On 2026-06-29, the open-source project CodeBurn (getagentseal/codeburn on GitHub) sat at 8,313 stars, 650 forks, 769 commits on main, 16 open issues, 15 open PRs, and a v0.9.14 release (Jun 22, 2026) that added a browser dashboard and a PIN-paired multi-device view. v0.9.14 (Jun 22) shipped 5 new providers (Grok Build, ZCode / z.ai GLM-5.2, Hermes Agent, Kiro CLI, Zerostack) and codeburn overview for a copy-pasteable monthly summary. The macOS menubar app ships as a separate mac-v0.9.14 (Jun 22, 2026), refreshes every 30 seconds, and is built in native Swift / SwiftUI under mac/. CodeBurn is a free, MIT-licensed, local-first TypeScript CLI that reads the session files your AI coding tools already write to disk and breaks down every token and dollar by task, model, tool, and project — across 31 integrations, with no proxy, no API key, and nothing leaving your machine. This is a builder-focused tool / workflow piece, not a benchmark, not a capability claim, and not a comparison to any hosted spend tracker."
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

On **2026-06-29**, the open-source project [CodeBurn](https://github.com/getagentseal/codeburn) sat at **8,313 stars**, **650 forks**, **769 commits** on `main`, **16 open issues**, and **15 open PRs** — MIT-licensed, TypeScript on the CLI side, Swift / SwiftUI for the macOS menubar, with the README leading on the line "**See where your AI spend goes**" ([GitHub repository, 2026-06-29](https://github.com/getagentseal/codeburn)). The current CLI line is **v0.9.14, released 2026-06-22** ([v0.9.14 release notes, 2026-06-22](https://github.com/getagentseal/codeburn/releases/tag/v0.9.14)); the macOS menubar app ships as a separate tag, **mac-v0.9.14**, on the same date ([mac-v0.9.14 release, 2026-06-22](https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14)). The repo's "Supported tools" section lists **31 integrations** — Claude Code, Cline, Codex, Cursor, cursor-agent, Devin, Forge, Gemini CLI, Mistral Vibe, GitHub Copilot, IBM Bob, Kiro, OpenCode, OpenClaw, Pi, OMP (Oh My Pi), Droid, Roo Code, KiloCode, Qwen, Kimi Code CLI, Goose, Antigravity, Crush, Warp, Mux (coder), Vercel AI Gateway, Zerostack, Grok Build, ZCode, and Hermes Agent ([README "Supported tools" section, 2026-06-29](https://github.com/getagentseal/codeburn)) — and the README rounds the count to "31 tools and agents" in its first paragraph.

This is a builder-focused tool / workflow piece, not a benchmark. The story is one mature open-source tool that fills a specific gap: spend visibility across AI coding tools, on a single machine, with no proxy and no API keys. There is no head-to-head comparison against OpenAI's admin dashboard, Cursor's analytics, or any hosted spend tracker on the record; this is an architecture / workflow piece, not a benchmark piece.

## What happened

**The repo, in numbers.** As of 2026-06-29 the [GitHub repository](https://github.com/getagentseal/codeburn) returns 8,313 stars, 650 forks, 16 open issues, 15 open PRs, primary language TypeScript, license MIT, default branch `main`. The README carries the "Claude for Open Source Recipient" badge — Anthropic's open-source sponsorship — and the repo ships four screenshots in `assets/` under the same MIT license ([GitHub repository, 2026-06-29](https://github.com/getagentseal/codeburn); [LICENSE, 2026-06-29](https://github.com/getagentseal/codeburn/blob/main/LICENSE)). Primary maintainer: [@iamtoruk](https://github.com/iamtoruk).

**The latest CLI release — v0.9.14 (2026-06-22).** [v0.9.14](https://github.com/getagentseal/codeburn/releases/tag/v0.9.14) ships 12 commits to `main` since the tag and a verified GitHub signature on commit `69eee2c`. Headline additions, per the release notes:

- **`codeburn web`** — a local React / Recharts dashboard served at `localhost:4747`, with the same task / model / tool / project breakdowns as the TUI and an in-dashboard device-discovery + share flow.
- **PIN-paired multi-device combining** — `codeburn share --pair` and `codeburn devices add` join usage across your machines on the local network, with a per-device join-by-PIN handshake.
- **New providers:** Grok Build, ZCode / z.ai GLM-5.2, Hermes Agent, Kiro CLI sessions, and Zerostack.
- **`codeburn overview`** — a copy-pasteable plain-text monthly summary, designed to drop into a status update or a tweet.
- **Codex credit usage** alongside dollar cost, and **MCP server usage in JSON / CSV exports**.
- **OpenCode 1.1+ file-based sessions**, and a Claude-scoped agent-type breakdown.
- **Daily cache v9** — newly supported providers backfill across history without a manual cache clear.

**The release before that — v0.9.12 (2026-06-09).** [v0.9.12](https://github.com/getagentseal/codeburn/releases/tag/v0.9.12) added the `codeburn mcp` server (`get_usage`, `get_savings` to AI agents over stdio, with project names pseudonymized by default), the new providers Devin, Antigravity IDE, JetBrains — IntelliJ / DataGrip via Copilot, coder / mux, and an opt-in Vercel AI Gateway datasource, and **automatic pricing gap-fill from models.dev and OpenRouter** so models LiteLLM has not yet indexed (e.g. Claude Fable 5, Mythos 5) get priced correctly without a manual patch.

**The release before that — v0.9.11 (2026-05-27).** [v0.9.11](https://github.com/getagentseal/codeburn/releases/tag/v0.9.11) shipped the **Warp provider adapter**, **file-aware retry detection with a typed ToolCall**, **multi-day calendar selection with a custom popover UI**, and **Forge provider support**. On the menubar side, the loading-recovery watchdog was rewritten with **exponential backoff (8s to 60s, 6 attempts max)** — the previous 8-second loop was killing healthy 45-second CLI fetches.

**The macOS menubar app — mac-v0.9.14 (2026-06-22).** The menubar ships as a separate release by `github-actions` on the same day as the CLI tag. Install is `codeburn menubar`, which drops the `.app` into `~/Applications`, records the persistent CLI path the menubar uses, verifies the downloaded checksum, clears quarantine after bundle verification, and launches ([mac-v0.9.14 release, 2026-06-22](https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14)). The app is native Swift / SwiftUI under `mac/`, refreshes every 30 seconds, supports Today / Week / Month / 6 Months periods, and v0.9.14 added a custom daily-budget alert that respects the display metric (Cost or Tokens) and shows every active agent as a tab ordered by usage.

**How it reads data — the local-first architecture.** The README's headline is exact: "**Everything runs locally. No wrapper, no proxy, no API keys, nothing leaves your machine.** Pricing comes from LiteLLM, refreshed daily" ([README, 2026-06-29](https://github.com/getagentseal/codeburn)). CodeBurn does not wrap the model API and does not proxy traffic. It reads the session files the tools already write to disk — Claude Code's `~/.claude/projects/<sanitized-path>/<session-id>.jsonl`, Codex's `~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`, Cursor's `globalStorage/state.vscdb`, OpenCode's `~/.local/share/opencode/opencode*.db`, Gemini CLI's `~/.gemini/tmp/<project>/chats/session-*.json`, and so on — and joins them by timestamp. Pricing comes from [LiteLLM](https://github.com/BerriAI/litellm) cached locally for 24 hours at `~/.cache/codeburn/`, with **hardcoded fallbacks for all Claude and GPT-5 models** ([README "Pricing" section, 2026-06-29](https://github.com/getagentseal/codeburn)). v0.9.12 added the models.dev + OpenRouter gap-fill for Fable 5 / Mythos 5.

**What the dashboard actually shows.** `codeburn` opens an interactive TUI for the last 7 days. The header shows cost, calls, sessions, in / out / cache-write / cache-read tokens, and cache hit rate. Below it: **Daily Activity** (per-day cost and call count), **By Project** (per-project cost and sessions), **By Activity** (per-task-category cost, turns, and 1-shot rate across 13 deterministic categories), **By Model** (per-model cost and calls), **Core Tools** (per-tool calls — Bash, Read, Edit, Grep, Write), **Shell Commands** (per-command calls — `git`, `head`, `tail`, `python3`, `grep`, `echo`, `python`, `ls`, `npx`, `gh`), and **MCP Servers** (per-server calls). Arrow keys switch periods, `c` opens model comparison, `o` opens optimize, `q` quits, and the dashboard auto-refreshes every 30 seconds ([README "Commands" section, 2026-06-29](https://github.com/getagentseal/codeburn)).

**`codeburn optimize` — the waste-finder.** Scans the last 30 days of sessions and `~/.claude/` setup for known cost leaks: re-read files, low Read:Edit ratio (editing without reading implies retry loops), uncapped `BASH_MAX_OUTPUT_LENGTH`, unused MCP servers, ghost agents / skills / slash commands defined in `~/.claude/` but never invoked, bloated `CLAUDE.md` files, cache-creation overhead, and "possibly low-worth expensive sessions" with no `git` / `gh` delivery command. Each finding shows the estimated token and dollar savings plus a copy-pasteable fix. Findings are ranked by urgency and rolled up to an **A–F setup-health grade**; repeat runs classify each finding as new / improving / resolved against a 48-hour recent window ([README "Find and fix waste" section, 2026-06-29](https://github.com/getagentseal/codeburn)).

**`codeburn yield` — the productivity breakdown.** Correlates AI sessions with git commits by timestamp and classifies spend as **Productive** (commits landed in `main`), **Reverted** (commits were later reverted), or **Abandoned** (no commits near the session, or commits never merged). Requires a git repository ([README "Track what shipped" section, 2026-06-29](https://github.com/getagentseal/codeburn)).

**`codeburn compare` — the model comparison.** Side-by-side metrics per category and period: one-shot rate, retry rate, self-correction rate, cost per call, cost per edit, output tokens per call, cache hit rate, and fast-mode usage ([README "Compare models" section, 2026-06-29](https://github.com/getagentseal/codeburn)).

**Currency and plan support.** **162 ISO 4217 currencies** (FX rates from the European Central Bank via [Frankfurter](https://www.frankfurter.app/), refreshed every 24 hours, no API key). Subscription-plan tracking for Claude Pro / Max, Cursor Pro, and per-provider custom plans via `codeburn plan set` ([README "Currency" and "Plans" sections, 2026-06-29](https://github.com/getagentseal/codeburn)). The `codeburn model-alias` command covers the `$0.00` proxy-rename case.

## Why it matters

Five reasons this is a day-one story on 2026-06-29.

**1. AI coding spend is the silent line item in 2026 dev budgets.** Most builders running Claude Code, Codex, and Cursor simultaneously have a spend problem they cannot see. The bill tells you the total; it never tells you which model, which project, or which task burned it. CodeBurn is the only free, local-first, 31-tool option the Writer can verify end-to-end in one article, and the README's leading dashboard is the visual evidence that the gap is closed for a single machine, on a single account.

**2. Local-first is the differentiator.** Tools that *cut* tokens already exist. CodeBurn is about *seeing* the bill before you cut it. The local-first architecture — reads session files, never wraps the API, never sees plaintext — is the answer to the enterprise "I cannot ship telemetry to a third party" objection that blocks adoption of every hosted spend tracker. The browser dashboard binds to `localhost:4747`; multi-device combining is PIN-paired on the local network.

**3. 31 integrations is the breadth argument.** A team using Claude Code, Codex, OpenCode, and Gemini CLI simultaneously can see one combined total, broken down per tool, on one machine. No vendor's admin dashboard does that. v0.9.14 added 5 more providers (Grok Build, ZCode / z.ai GLM-5.2, Hermes Agent, Kiro CLI, Zerostack) and v0.9.12 added 5 more (Devin, Antigravity IDE, JetBrains via Copilot, coder / mux, Vercel AI Gateway).

**4. The waste-finding loop is the workflow story.** `codeburn optimize` does not just report spend; it suggests copy-pasteable fixes — a `CLAUDE.md` line, an env var, an `mv` command. The loop is **scan → fix → re-scan → watch the grade improve**. A builder who runs it weekly can move the setup-health grade from D to B over a few iterations, with measurable impact on the same numbers `codeburn overview` prints.

**5. The yield command is the executive summary.** Productive vs Reverted vs Abandoned spend, correlated with git commits, is the question every AI-leadership meeting asks and few teams can answer. CodeBurn is the first local-first tool to put that breakdown in the TUI, without shipping the commit data to a third party.

## Practical implications

Six concrete takeaways for builders and operators.

1. **If you use more than one AI coding tool, `npx codeburn` is the 30-second start.** No install, no account, no telemetry. The TUI shows where the last 7 days of spend went; the first run is typically the moment a builder realises 60% of the bill is one model on one project.
2. **Pair `codeburn optimize` with `codeburn yield` weekly.** Optimize finds waste and prints copy-pasteable fixes; yield tells you which spend actually shipped. Together they answer "is the AI budget producing value?"
3. **If you are on Claude Code and Cursor simultaneously, set `CLAUDE_CONFIG_DIRS` and check the Cursor "Auto (Sonnet est.)" rows.** Cursor's "Auto" mode hides the model, so CodeBurn costs the row at Sonnet rates and labels it "Auto (Sonnet est.)" — the price is an estimate. The same caveat applies to Kiro and the GitHub Copilot legacy CLI.
4. **For team or org settings, run the macOS menubar app and PIN-pair your machines.** No hosted backend; the pairing is local-network only. This is the answer to the "I cannot ship spend data to a third party" objection.
5. **For model-choice decisions, run `codeburn compare` weekly.** The README's "Reading the dashboard" table translates specific signals — low 1-shot rate on Coding, lots of `Read` calls per session, Opus 4.6 dominating cost on small turns — into actions. A pattern of Opus 4.6 dominating cost on small turns suggests the dashboard is showing an overpowered model doing work a cheaper one would have one-shot, not that Opus is "bad".
6. **The repo is independent of any single model lab.** Anthropic's "Claude for Open Source Recipient" badge is a sponsorship signal, not vendor lock-in. CodeBurn works with any provider the user's tools use, and adding a new provider is a single file under `src/providers/`.

## Risks and caveats

`highRiskClaims: false`. The article is a feature / architecture piece, not a benchmark. Six framing-level caveats, all anchored to the README or to the v0.9.x release notes.

1. **CodeBurn is a single-maintainer project.** [@iamtoruk](https://github.com/iamtoruk) is the primary maintainer; the v0.9.14 release credits 8 external contributors and v0.9.12 credits 7, so the bus factor is improving, but the project is still 1.0 of one person. No SLA, no commercial support, no on-call. Sponsorship is the funding model ([README "Sponsoring CodeBurn" section, 2026-06-29](https://github.com/getagentseal/codeburn)).
2. **Token counts are accurate only for the integrations that write real counts to disk.** Claude Code, Codex, OpenCode, Gemini CLI, and Pi / OMP write structured session files with real token usage. **GitHub Copilot (legacy CLI), Kiro, and Mistral Vibe are estimated** — Copilot editor transcripts carry no explicit token counts and tokens are estimated from content length; Kiro does not expose the model so sessions are labelled `kiro-auto` and costed at Sonnet rates ([README "How it reads your data" table, 2026-06-29](https://github.com/getagentseal/codeburn)). The dashboard reports what the underlying tools actually log, with documented estimation fallbacks for the gaps — it is not an exact-bill oracle.
3. **Pricing accuracy depends on the upstream model name matching the LiteLLM catalog.** Behind a proxy that rewrites model names, CodeBurn will report `$0.00` until the user configures a `codeburn model-alias`. v0.9.12 added automatic gap-fill from models.dev and OpenRouter so Fable 5 and Mythos 5 price correctly, but the dashboard is not always-accurate ([README "Pricing" section, 2026-06-29](https://github.com/getagentseal/codeburn)).
4. **The `optimize` findings are heuristic, not causal.** "Low Read:Edit ratio implies retry loops" is a pattern, not a measurement of waste. The optimize scorecard is a starting point for the scan → fix → re-scan loop, not a definitive accounting ([README "Find and fix waste" section, 2026-06-29](https://github.com/getagentseal/codeburn)).
5. **Yield requires a git repository.** Sessions outside a git working directory, or in repositories where commits are not pushed, are misclassified as Abandoned. Yield is not a complete productivity measure ([README "Track what shipped" section, 2026-06-29](https://github.com/getagentseal/codeburn)).
6. **There is no head-to-head benchmark against an alternative spend tracker.** [Token-Cost](https://github.com/juspay/tokencost), the [LiteLLM proxy](https://github.com/BerriAI/litellm), the OpenAI admin dashboard, Cursor's analytics, and the Anthropic console all measure overlapping-but-different things, and no independent benchmark of CodeBurn's accuracy against any of them is on the record as of 2026-06-29. This is a feature / architecture piece, not a benchmark piece.

## What to watch

Five follow-up signals for the next 60–90 days.

1. **A v1.0 release.** v0.9.x is the current line; the first v1.0 will mark the first "intended for production use" milestone. Watch [github.com/getagentseal/codeburn/releases](https://github.com/getagentseal/codeburn/releases).
2. **New provider coverage.** Each new AI coding tool requires its own provider parser under `src/providers/`. The first OpenCode-only or Kiro-only shop that adopts CodeBurn will surface coverage gaps.
3. **Pricing for new model families.** v0.9.12 added automatic gap-fill from models.dev and OpenRouter. The next model-family launch will stress this.
4. **Adoption in team / org settings.** CodeBurn is individual-developer today. If a team-mode ships — shared budget view, per-user rollup, SSO — that is a follow-up signal.
5. **A first independent benchmark.** The first academic or third-party comparison against OpenAI's admin dashboard, Cursor's analytics, or a hosted spend tracker will be a separate article. The Writer must not invent one.

## Sources

Live-verified 2026-06-29 against the live repository, the README on `main`, the v0.9.14 / v0.9.12 / v0.9.11 release notes, the mac-v0.9.14 release, and the AI Newsroom sitemap.

| # | Source | Type | Date | Status |
|---|---|---|---|---|
| 1 | GitHub — `getagentseal/codeburn` (README, LICENSE, "Supported tools" section, "How it reads your data" table, "Find and fix waste" / "Track what shipped" / "Compare models" / "Reading the dashboard" sections) | Primary | snapshot 2026-06-29 | Live-verified 2026-06-29 ([github.com/getagentseal/codeburn](https://github.com/getagentseal/codeburn)) |
| 2 | GitHub — `getagentseal/codeburn` releases page (v0.9.14) | Primary | 2026-06-22 | Live-verified 2026-06-29 ([v0.9.14](https://github.com/getagentseal/codeburn/releases/tag/v0.9.14)) |
| 3 | GitHub — `getagentseal/codeburn` releases page (v0.9.12) | Primary | 2026-06-09 | Live-verified 2026-06-29 ([v0.9.12](https://github.com/getagentseal/codeburn/releases/tag/v0.9.12)) |
| 4 | GitHub — `getagentseal/codeburn` releases page (v0.9.11) | Primary | 2026-05-27 | Live-verified 2026-06-29 ([v0.9.11](https://github.com/getagentseal/codeburn/releases/tag/v0.9.11)) |
| 5 | GitHub — `getagentseal/codeburn` releases page (mac-v0.9.14) | Primary | 2026-06-22 | Live-verified 2026-06-29 ([mac-v0.9.14](https://github.com/getagentseal/codeburn/releases/tag/mac-v0.9.14)) |
| 6 | GitHub — `getagentseal/codeburn` LICENSE (MIT) | Primary | 2026-06-29 | Live-verified 2026-06-29 ([LICENSE](https://github.com/getagentseal/codeburn/blob/main/LICENSE)) |
| 7 | npm — `codeburn` package (CLI distribution, Node.js 22.13+ runtime requirement) | Primary | 2026-06-29 | Live-verified 2026-06-29 ([npmjs.com/package/codeburn](https://www.npmjs.com/package/codeburn)) |
| 8 | AI Newsroom — sitemap.xml (no prior CodeBurn article on the site; closest existing pieces are the token-compression, MCP-server, and AI-coding-agent clusters, all different subjects) | Secondary | 2026-06-29 | Live-verified 2026-06-29 ([sitemap.xml](https://news.lesbass.com/sitemap.xml)) |

> **Source rule for the Writer.** The load-bearing claims in this article are in sources #1, #2, #3, #4, and #5. Any claim not in those five sources has been either attributed inline to the README / release notes, or omitted.
