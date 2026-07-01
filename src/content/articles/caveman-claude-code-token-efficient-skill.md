---
title: "caveman: terse-output skill, 75k stars in 11 weeks"
description: "GitHub repo JuliusBrussee/caveman: a TypeScript skill for 30+ agent platforms that asks the agent to talk like a caveman. 74,940 stars, MIT, 15 releases. 65% output-token reduction (22–87%) on 10 real Claude prompts."
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
  - title: "JuliusBrussee/caveman — main LICENSE (MIT, copyright Julius Brussee)"
    url: "https://raw.githubusercontent.com/JuliusBrussee/caveman/main/LICENSE"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman — benchmarks/ directory (raw data and reproduction script for the 10-prompt benchmark)"
    url: "https://github.com/JuliusBrussee/caveman/tree/main/benchmarks"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman — evals/ directory (three-arm eval harness: baseline / terse / skill, comparing caveman against 'Answer concisely')"
    url: "https://github.com/JuliusBrussee/caveman/tree/main/evals"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/caveman-code — terminal coding agent in the same philosophy (548 stars, 60 forks, MIT, 26 open issues; published 25-task MicroBench dated 2026-05-18 with raw CSV, aggregate JSON, and reproduction command)"
    url: "https://github.com/JuliusBrussee/caveman-code"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/cavemem — cross-agent persistent memory (551 stars, 48 forks, MIT, 37 open issues)"
    url: "https://github.com/JuliusBrussee/cavemem"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/cavekit — spec-driven build loop (1,044 stars, 75 forks, MIT, 14 open issues)"
    url: "https://github.com/JuliusBrussee/cavekit"
    date: 2026-06-20
    type: primary
  - title: "JuliusBrussee/cavegemma — Gemma 4 31B LoRA fine-tune of the caveman style (56 stars, 10 forks; published 193-pair holdout eval, 81.5% accuracy, 96-100% code-fence exactness)"
    url: "https://github.com/JuliusBrussee/cavegemma"
    date: 2026-06-20
    type: primary
  - title: "arXiv 2604.00025 — 'Brevity Constraints Reverse Performance Hierarchies in Language Models' (March 2026 paper referenced in caveman README; 26-point accuracy improvement on certain benchmarks under brief-response constraints)"
    url: "https://arxiv.org/abs/2604.00025"
    date: 2026-06-20
    type: primary
  - title: "caveman.so — project homepage (linked from GitHub repo homepage field)"
    url: "https://caveman.so/"
    date: 2026-06-20
    type: secondary
  - title: "Atlas Cloud — sponsor page (https://www.atlascloud.ai, full-modal AI inference platform, listed as caveman sponsor in README)"
    url: "https://www.atlascloud.ai"
    date: 2026-06-20
    type: secondary
highRiskClaims: true
---

On **2026-06-20**, [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) — a TypeScript "skill" (Markdown ruleset + installer) for 30+ agent platforms (Claude Code / Codex / Gemini / Cursor / Windsurf / Cline / Copilot / OpenClaw / opencode as the headline targets) — had reached **74,940 stars, 4,230 forks, 299 open issues, 201 commits, 15 releases (latest v1.9.0 on 2026-06-12), MIT** ([metadata](https://api.github.com/repos/JuliusBrussee/caveman)). Created **2026-04-04**, ~11 weeks old, not the *"two weeks"* sometimes cited. The skill tells the agent to drop filler, use fragments, and keep code / URLs / paths byte-exact. The README ships a benchmark of 10 real Claude API prompts (average **1,214 → 294 = 65% reduction, range 22–87%**), a `caveman-compress` sub-skill (**46% memory-file reduction**), and an Important box: *"Caveman only affects output tokens — thinking/reasoning tokens untouched."*

## What it is

**The skill.** A Markdown ruleset plus a small installer. *"Install drop skill file in agent. Skill tell agent: drop filler, keep substance, use fragments."* It does not change model selection, MCP wiring, or tool-calling semantics — it is a writing-style layer.

**Install paths.** One-liner per platform: `curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash` (Unix), `irm ... install.ps1 | iex` (Windows), `npx skills add JuliusBrussee/caveman` (universal), or `--only openclaw` for OpenClaw. ~30 seconds, Node ≥ 18, safe to re-run. v1.9.0 ships the SHA-256 manifest: hook files are downloaded from the **immutable v1.9.0 tag** and verified against `src/hooks/checksums.sha256` before executing.

**Triggers and levels.** Five triggers: `/caveman [lite|full|ultra|wenyan]`, `/caveman-commit` (≤50 char subject), `/caveman-review` (one-line PR comments), `/caveman-stats` (real session tokens + lifetime savings + USD), `/caveman-compress <file>`. Four levels: `lite` / `full` / `ultra` / `wenyan`.

**Auto-activate and statusline.** Built in for Claude Code, Codex, and Gemini. Cursor / Windsurf / Cline / Copilot and 27 others get a per-agent native install. The Claude Code statusline shows `[CAVEMAN] ⛏ 12.4k`; silence with `CAVEMAN_STATUSLINE_SAVINGS=0`.

**Language preservation.** *"Speak your tongue. Caveman keep your language."* Code, error strings, URLs, and paths stay exact; v1.7.0 added Typst + LaTeX to the protected list.

## Why it matters

**The viral signal is real, not vanity.** **74,940 stars in ~11 weeks** is consistent with a cultural-moment release. The value proposition is trivial to explain, trivial to try, and the savings are visible on the first reply via the statusline badge.

**The benchmark table is unusually honest for this kind of project.** Most "save tokens" claims are vendor self-reports with no raw data and no eval harness. caveman publishes the 10-prompt table with raw counts — average **1,214 → 294 = 65% reduction, range 22–87%**; `caveman-compress` memory-file receipts (5 files, byte-preserved code/URLs/paths) at average **898 → 481 = 46%**; raw data and a reproduction script in [`benchmarks/`](https://github.com/JuliusBrussee/caveman/tree/main/benchmarks); a three-arm eval harness in [`evals/`](https://github.com/JuliusBrussee/caveman/tree/main/evals) — *baseline* / *terse* ("Answer concisely") / *skill* (caveman); and a reference to a March 2026 paper, [*"Brevity Constraints Reverse Performance Hierarchies in Language Models"*](https://arxiv.org/abs/2604.00025) (26-point accuracy improvement on certain benchmarks under brief-response constraints).

**The ecosystem is the under-reported story.** Five repos in the same philosophy:

| Repo | What it does | Stars / Forks / Issues (2026-06-20) |
|---|---|---|
| [caveman](https://github.com/JuliusBrussee/caveman) | Output compression skill (this repo) | 74,940 / 4,230 / 299 |
| [caveman-code](https://github.com/JuliusBrussee/caveman-code) | Terminal coding agent; 25-task MicroBench 1.93× vs Codex CLI | 548 / 60 / 26 |
| [cavemem](https://github.com/JuliusBrussee/cavemem) | Cross-agent persistent memory | 551 / 48 / 37 |
| [cavekit](https://github.com/JuliusBrussee/cavekit) | Spec-driven build loop | 1,044 / 75 / 14 |
| [cavegemma](https://github.com/JuliusBrussee/cavegemma) | Gemma 4 31B LoRA fine-tune; 193-pair holdout, 81.5% accuracy | 56 / 10 / 0 |

## What to watch

1. **Independent third-party reproduction of the 10-prompt benchmark.** No independent reproduction as of 2026-06-20.
2. **Thinking-token cost on reasoning models.** The 65% output reduction may be partially offset by unchanged or larger thinking-token costs.
3. **`caveman-code` adoption and the MicroBench.** 25-task MicroBench dated 2026-05-18 reports 524k fresh tokens (caveman) vs 1,010k (Codex CLI), pass rate 14/25 vs 15/25.
4. **`cavegemma` real-world accuracy on non-coding tasks.** 193-pair holdout reports 81.5% accuracy; project is direct that compression is weaker than gold.
5. **Broader-corpus `caveman-compress` evaluation.** 46% memory-file average is from 5 files; the next-cycle story is the median across a few hundred real CLAUDE.md / AGENTS.md / README files.

## Risks and caveats

1. **Thinking tokens are not reduced.** For reasoning models, billable tokens = output + thinking. The 65% / 22–87% numbers are output-token reductions only.
2. **The 65% average hides a 22% floor.** *Refactor callback to async/await* is 387 → 301 (22%); *Architecture: microservices vs monolith* is 446 → 310 (30%).
3. **The benchmark is project self-report.** No independent third-party reproduction as of 2026-06-20; the "1.93× fewer than Codex" claim is published-MicroBench-but-still-self-report (14/25 vs 15/25).
4. **`cavegemma` has a published eval, not an external benchmark.** 81.5% accuracy, 96–100% code-fence exactness. Treat as the maintainer's eval.
5. **v1.9.0 is "Rock pinned" not "Rock perfect."** No long-term compatibility contract. Pin to v1.9.0 for production.
6. **299 open issues is a velocity signal, not a stability signal.** High issue/PR-to-commit ratio.

## Practical advice

- **For Claude Code / Codex / Gemini / Cursor users.** Install the one-liner and trigger with `/caveman [lite|full|ultra|wenyan]`. The honest first check is `/caveman-stats`. Pin to **v1.9.0** for team rollout.
- **For multi-agent or OpenClaw users.** Use `--with-init` for Cursor / Windsurf / Cline / Copilot. For OpenClaw, the installer drops a marker-fenced block into `~/.openclaw/workspace/SOUL.md` so the brevity auto-injects every turn.
- **For operators / IT admins.** Pin to **v1.9.0**; verify the install in a clean sandbox — the script touches `~/.claude/`, `~/.codex/`, `~/.gemini/`, `~/.cursor/`, and the OpenClaw workspace path. For reasoning models, set the billable-token expectation to *"output tokens down 65% on average (22–87% range); thinking tokens unchanged"* — not "65% off the bill."

## Verdict

On **2026-06-20**, [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) sat at **74,940 stars, 4,230 forks, 299 open issues, 201 commits, 15 releases**, MIT, with a 10-prompt benchmark showing **65% average output-token reduction (range 22–87%)** and `caveman-compress` cutting **46% of memory-file tokens**. The under-reported story is the **five-tool ecosystem**: [`caveman-code`](https://github.com/JuliusBrussee/caveman-code) (1.93× fewer tokens than Codex CLI), [`cavemem`](https://github.com/JuliusBrussee/cavemem), [`cavekit`](https://github.com/JuliusBrussee/cavekit), [`cavegemma`](https://github.com/JuliusBrussee/cavegemma) (**193-pair holdout, 81.5% accuracy, 96–100% code-fence exactness**). The load-bearing caveat is in the README's Important box: *"Caveman only affects output tokens — thinking/reasoning tokens untouched."* The takeaway is the **writing-style layer** and the **ecosystem framing**, not the headline number.

## Sources

- [JuliusBrussee/caveman — GitHub repository metadata (2026-06-20)](https://api.github.com/repos/JuliusBrussee/caveman)
- [JuliusBrussee/caveman — main README (2026-06-20)](https://raw.githubusercontent.com/JuliusBrussee/caveman/main/README.md)
- [JuliusBrussee/caveman — Releases API (2026-06-20)](https://api.github.com/repos/JuliusBrussee/caveman/releases)
- [JuliusBrussee/caveman — benchmarks/ directory (2026-06-20)](https://github.com/JuliusBrussee/caveman/tree/main/benchmarks)
- [JuliusBrussee/caveman — evals/ directory (2026-06-20)](https://github.com/JuliusBrussee/caveman/tree/main/evals)
- [JuliusBrussee/caveman-code — terminal coding agent (2026-06-20)](https://github.com/JuliusBrussee/caveman-code)
- [JuliusBrussee/cavegemma — Gemma 4 31B LoRA fine-tune (2026-06-20)](https://github.com/JuliusBrussee/cavegemma)
- [arXiv 2604.00025 — *Brevity Constraints Reverse Performance Hierarchies in Language Models* (2026-04-02)](https://arxiv.org/abs/2604.00025)
