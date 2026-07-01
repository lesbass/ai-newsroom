---
title: "caveman: terse-output skill, 75k stars in 11 weeks"
description: "GitHub JuliusBrussee/caveman: a TypeScript skill for 30+ agent platforms that asks the agent to drop filler. 75k stars, MIT, 65% output-token reduction."
pubDate: 2026-06-20
author: "AI Newsroom"
tags: ["open-source", "typescript", "claude-code", "codex", "gemini", "cursor", "agent-skills", "tokens", "token-efficiency", "prompt-engineering", "anthropic", "openai", "gemini-cli", "caveman", "juliusbrussee", "caveman-code", "cavemem", "cavekit", "cavegemma", "openclaw", "mcp", "fine-tuning", "gemma", "lora", "developer-tools", "high-risk-claim"]
image: "https://opengraph.githubassets.com/1/JuliusBrussee/caveman"
imageAlt: "caveman open-source repository social preview card showing the '74,940 stars' badge and the JuliusBrussee avatar"
imageCredit: "Image: GitHub / JuliusBrussee/caveman repository (MIT)"
sources:
  - title: "JuliusBrussee/caveman — GitHub repository metadata (74,940 stars, 4,230 forks, 299 open issues, MIT, created 2026-04-04)"
    url: "https://api.github.com/repos/JuliusBrussee/caveman"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman — main README.md (10-prompt benchmark table, caveman-compress receipts, Important box, Lobster OpenClaw section, Caveman Ecosystem, ATLAS Cloud sponsor, MIT)"
    url: "https://raw.githubusercontent.com/JuliusBrussee/caveman/main/README.md"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman — Releases API (v1.9.0 'Rock pinned. Rock verified. opencode rock work now.' 2026-06-12, plus v1.8.2 / v1.8.1 / v1.8.0 / v1.7.0 / v1.6.0 / v1.5.1 / v1.5.0 — 15 total tags)"
    url: "https://api.github.com/repos/JuliusBrussee/caveman/releases"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman — benchmarks/ directory (raw data and reproduction script for the 10-prompt benchmark)"
    url: "https://github.com/JuliusBrussee/caveman/tree/main/benchmarks"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman — evals/ directory (three-arm eval harness: baseline / terse / skill)"
    url: "https://github.com/JuliusBrussee/caveman/tree/main/evals"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman-code — terminal coding agent (548 stars, 60 forks, MIT, 26 open issues; published 25-task MicroBench 2026-05-18)"
    url: "https://github.com/JuliusBrussee/caveman-code"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/cavegemma — Gemma 4 31B LoRA fine-tune (193-pair holdout, 81.5% accuracy, 96-100% code-fence exactness)"
    url: "https://github.com/JuliusBrussee/cavegemma"
    date: 2026-06-20
    type: primary
  - title: "arXiv 2604.00025 — 'Brevity Constraints Reverse Performance Hierarchies in Language Models' (March 2026)"
    url: "https://arxiv.org/abs/2604.00025"
    date: 2026-06-20
    type: primary
highRiskClaims: true
---

On **2026-06-20**, [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) — a TypeScript "skill" (Markdown ruleset + installer) for 30+ agent platforms (Claude Code, Codex, Gemini, Cursor, Windsurf, Cline, Copilot, OpenClaw, opencode as headline targets) — had reached **74,940 stars, 4,230 forks, 299 open issues, 201 commits, 15 releases (latest v1.9.0 on 2026-06-12), MIT** ([metadata](https://api.github.com/repos/JuliusBrussee/caveman)). Created **2026-04-04**, ~11 weeks old, not the *"two weeks"* sometimes cited. The skill tells the agent to drop filler, use fragments, keep code / URLs / paths byte-exact. The README's load-bearing caveat, in its own `> [!IMPORTANT]` box: *"Caveman only affects output tokens — thinking/reasoning tokens untouched. Caveman no make brain smaller. Caveman make mouth smaller."*

## What it is

A Markdown ruleset plus a small installer. The mechanism in three lines: *"Install drop skill file in agent. Skill tell agent: drop filler, keep substance, use fragments."* It does not change model selection, MCP wiring, or tool-calling semantics — it is a writing-style layer.

- **Install paths:** `curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash` (Unix), `irm ... install.ps1 | iex` (Windows), `npx skills add JuliusBrussee/caveman` (universal), or `--only openclaw` for OpenClaw. ~30 seconds, Node ≥ 18, safe to re-run.
- **v1.9.0 security:** hook files are downloaded from the **immutable v1.9.0 tag** and verified against `src/hooks/checksums.sha256` before executing.
- **Triggers and levels:** five triggers (`/caveman [lite|full|ultra|wenyan]`, `/caveman-commit`, `/caveman-review`, `/caveman-stats`, `/caveman-compress <file>`) and four levels (`lite` / `full` / `ultra` / `wenyan`).
- **Auto-activate and statusline:** built in for Claude Code, Codex, and Gemini. Cursor / Windsurf / Cline / Copilot and 27 others get a per-agent native install. The Claude Code statusline shows `[CAVEMAN] ⛏ 12.4k` lifetime savings.
- **Language preservation:** *"Speak your tongue. Caveman keep your language."* Code, error strings, URLs, paths stay exact; v1.7.0 added Typst + LaTeX to the protected list.

## The benchmark

The README ships a project-published benchmark of **10 real Claude API prompts** with raw counts, raw data, and a reproduction script in [`benchmarks/`](https://github.com/JuliusBrussee/caveman/tree/main/benchmarks). Average **1,214 → 294 = 65% reduction, range 22–87%** (selected rows: *React re-render bug* 1,180 → 159 = 87%; *auth middleware* 704 → 121 = 83%; *async/await refactor* 387 → 301 = 22%; *React error boundary* 3,454 → 456 = 87%; *PostgreSQL race* 1,200 → 232 = 81%).

A `caveman-compress` sub-skill cuts **46% of memory-file tokens** on 5 real receipts (e.g. `claude-md-preferences.md` 706 → 285 = 59.6%; `project-notes.md` 1,145 → 535 = 53.3%). A three-arm eval harness in [`evals/`](https://github.com/JuliusBrussee/caveman/tree/main/evals) compares *baseline* (verbose) / *terse* ("Answer concisely") / *skill* (caveman) so the delta is reported against a strong generic terse baseline, not against the verbose default.

The README also references a March 2026 paper, [*"Brevity Constraints Reverse Performance Hierarchies in Language Models"*](https://arxiv.org/abs/2604.00025), which found a 26-point accuracy lift on certain benchmarks under brief-response constraints.

## The ecosystem

The under-reported story is not the skill, it is the **five-repo family**:

| Repo | What it does | Stars / Forks / Issues (2026-06-20) |
|---|---|---|
| [caveman](https://github.com/JuliusBrussee/caveman) | Output compression skill | 74,940 / 4,230 / 299 |
| [caveman-code](https://github.com/JuliusBrussee/caveman-code) | Terminal coding agent; 25-task MicroBench 1.93× vs Codex CLI | 548 / 60 / 26 |
| [cavemem](https://github.com/JuliusBrussee/cavemem) | Cross-agent persistent memory | 551 / 48 / 37 |
| [cavekit](https://github.com/JuliusBrussee/cavekit) | Spec-driven build loop | 1,044 / 75 / 14 |
| [cavegemma](https://github.com/JuliusBrussee/cavegemma) | Gemma 4 31B LoRA fine-tune; 193-pair holdout, 81.5% accuracy | 56 / 10 / 0 |

## What to watch

1. **Independent third-party reproduction of the 10-prompt benchmark.** No independent run as of 2026-06-20.
2. **Thinking-token cost on reasoning models.** The 65% output reduction may be partially offset by unchanged thinking-token costs.
3. **`caveman-code` adoption.** Published 25-task MicroBench (524k vs 1,010k tokens, 14/25 vs 15/25 pass rate) is still project self-report.
4. **`cavegemma` accuracy on non-coding tasks.** 193-pair holdout reports 81.5% accuracy; the maintainer is direct that compression is weaker than gold pairs.

## Risks and caveats

1. **Thinking tokens are not reduced.** Billable tokens on reasoning models = output + thinking. The 65% / 22–87% numbers are output-only.
2. **The 65% average hides a 22% floor.** *Refactor callback to async/await* is 387 → 301 (22%).
3. **The benchmark is project self-report.** No independent third-party reproduction as of 2026-06-20.
4. **v1.9.0 is "Rock pinned" not "Rock perfect."** No long-term compatibility contract — pin to v1.9.0 for production.
5. **299 open issues / 201 commits is a velocity signal, not a stability signal.**

## Practical advice

- **For Claude Code / Codex / Gemini / Cursor users.** Install the one-liner, trigger with `/caveman [lite|full|ultra|wenyan]`, then run `/caveman-stats`. Pin to **v1.9.0** for team rollout.
- **For multi-agent or OpenClaw users.** Use `--with-init` for Cursor / Windsurf / Cline / Copilot. For OpenClaw, the installer drops a marker-fenced block into `~/.openclaw/workspace/SOUL.md` so the brevity auto-injects every turn.
- **For operators / IT admins.** Verify the install in a clean sandbox — the script touches `~/.claude/`, `~/.codex/`, `~/.gemini/`, `~/.cursor/`, and the OpenClaw workspace path. For reasoning models, set the billable-token expectation to *"output tokens down 65% on average (22–87% range); thinking tokens unchanged"* — not "65% off the bill."

## Verdict

[`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) — **74,940 stars, 4,230 forks, 299 open issues, MIT, 11 weeks old** — with a project-published benchmark showing **65% average output-token reduction (range 22–87%)** and `caveman-compress` cutting **46% of memory-file tokens**. The under-reported story is the **five-repo ecosystem**: [`caveman-code`](https://github.com/JuliusBrussee/caveman-code) (1.93× fewer tokens than Codex CLI), [`cavemem`](https://github.com/JuliusBrussee/cavemem), [`cavekit`](https://github.com/JuliusBrussee/cavekit), [`cavegemma`](https://github.com/JuliusBrussee/cavegemma) (**193-pair holdout, 81.5% accuracy, 96–100% code-fence exactness**). The load-bearing caveat is in the README's own Important box: *"Caveman only affects output tokens — thinking/reasoning tokens untouched."* The takeaway is the **writing-style layer** and the **ecosystem framing**, not the headline number.

## Sources

- [JuliusBrussee/caveman — GitHub repository metadata (2026-06-20)](https://api.github.com/repos/JuliusBrussee/caveman)
- [JuliusBrussee/caveman — main README (2026-06-20)](https://raw.githubusercontent.com/JuliusBrussee/caveman/main/README.md)
- [JuliusBrussee/caveman — Releases API (2026-06-20)](https://api.github.com/repos/JuliusBrussee/caveman/releases)
- [JuliusBrussee/caveman — benchmarks/ directory (2026-06-20)](https://github.com/JuliusBrussee/caveman/tree/main/benchmarks)
- [JuliusBrussee/caveman — evals/ directory (2026-06-20)](https://github.com/JuliusBrussee/caveman/tree/main/evals)
- [JuliusBrussee/caveman-code — terminal coding agent (2026-06-20)](https://github.com/JuliusBrussee/caveman-code)
- [JuliusBrussee/cavegemma — Gemma 4 31B LoRA fine-tune (2026-06-20)](https://github.com/JuliusBrussee/cavegemma)
- [arXiv 2604.00025 — *Brevity Constraints Reverse Performance Hierarchies in Language Models* (2026-04-02)](https://arxiv.org/abs/2604.00025)
