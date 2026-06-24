---
title: "codebase-memory-mcp: zero-dep code intelligence"
description: "codebase-memory-mcp is a pure-C, single-binary MCP server that indexes a codebase into a persistent Tree-Sitter knowledge graph in milliseconds and replaces dozens of file-by-file read cycles with a handful of structured MCP queries. As of 2026-06-24 it sits at 13,355 GitHub stars with 5,604 tests passing, MIT-licensed, supports 11 coding agents, and is backed by an arXiv preprint (arXiv:2603.27277) that benchmarks 83% answer quality at 10× fewer tokens and 2.1× fewer tool calls versus file-by-file exploration across 31 real-world repositories. The article is a builder-focused tool piece, not a news event."
pubDate: 2026-06-24
author: "AI Newsroom"
tags: ["codebase-memory-mcp", "mcp", "model-context-protocol", "tree-sitter", "knowledge-graph", "code-intelligence", "ai-coding-agents", "claude-code", "codex", "gemini-cli", "opencode", "hybrid-lsp", "static-binary", "zero-dependency", "arxiv-2603-27277", "deusdata", "ai-newsroom-coverage"]
image: "https://opengraph.githubassets.com/1/DeusData/codebase-memory-mcp"
imageAlt: "codebase-memory-mcp open-source repository social preview card"
imageCredit: "Image: GitHub / DeusData/codebase-memory-mcp repository (MIT)"
sources:
  - title: "DeusData/codebase-memory-mcp — GitHub repository"
    url: "https://github.com/DeusData/codebase-memory-mcp"
    date: 2026-06-24
    type: primary
  - title: "codebase-memory-mcp README on main"
    url: "https://github.com/DeusData/codebase-memory-mcp/blob/main/README.md"
    date: 2026-06-24
    type: primary
  - title: "codebase-memory-mcp v0.8.1 release"
    url: "https://github.com/DeusData/codebase-memory-mcp/releases/tag/v0.8.1"
    date: 2026-06-12
    type: primary
  - title: "codebase-memory-mcp GitHub REST API metadata"
    url: "https://api.github.com/repos/DeusData/codebase-memory-mcp"
    date: 2026-06-24
    type: primary
  - title: "arXiv:2603.27277 — Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP"
    url: "https://arxiv.org/abs/2603.27277"
    date: 2026-03-28
    type: primary
  - title: "One-line installer script (install.sh) on main"
    url: "https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh"
    date: 2026-06-24
    type: primary
  - title: "OpenSSF Scorecard for DeusData/codebase-memory-mcp"
    url: "https://scorecard.dev/viewer/?uri=github.com/DeusData/codebase-memory-mcp"
    date: 2026-06-24
    type: secondary
  - title: "SLSA build provenance reference"
    url: "https://slsa.dev"
    date: 2026-06-24
    type: secondary
highRiskClaims: false
---

A pure-C, single-binary MCP server called `codebase-memory-mcp` hit **13,355 GitHub stars** as of 2026-06-24 06:12 UTC, up from roughly 11,900 when the project first reached the AI Newsroom radar two days earlier. It is the first tool of its kind that a builder can install with one curl, run with zero runtime dependencies on macOS, Linux, or Windows, and have answered structural code questions in under a millisecond ([GitHub API, 2026-06-24](https://api.github.com/repos/DeusData/codebase-memory-mcp); [README, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)). The headline number is supported by a peer-style preprint on arXiv ([arXiv:2603.27277](https://arxiv.org/abs/2603.27277)), not just a marketing page.

The trade-off, also from the arXiv paper, is the part most coverage skips: codebase-memory-mcp reaches **83% answer quality** versus **92%** for a file-exploration agent, at **10× fewer tokens** and **2.1× fewer tool calls** across 31 real-world repositories ([arXiv:2603.27277, abstract, 2026-03-28](https://arxiv.org/abs/2603.27277)). On graph-native questions — hub detection, caller ranking — it matches or beats the explorer on 19 of 31 languages. The paper does not claim the tool is uniformly better; it claims the tool is substantially cheaper on the questions it is structured for.

## What happened

**The repository is a four-month-old C project with 5,604 passing tests and 11 supported agents.** Created on 2026-02-24 and last pushed 2026-06-24, [`DeusData/codebase-memory-mcp`](https://github.com/DeusData/codebase-memory-mcp) is a single static binary under MIT, written in pure C with vendored Tree-Sitter grammars for 158 languages, an in-memory SQLite store, LZ4 compression, and 14 MCP tools ([GitHub API, 2026-06-24](https://api.github.com/repos/DeusData/codebase-memory-mcp); [README, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp/blob/main/README.md)). The README's badge row states 5,604 tests passing, 158 languages, 11 supported agents, and a single static binary with zero dependencies.

**The latest release is v0.8.1, published 2026-06-12.** The release was cut via the project's GitHub Actions pipeline and is hosted at [`releases/tag/v0.8.1`](https://github.com/DeusData/codebase-memory-mcp/releases/tag/v0.8.1) ([release metadata, 2026-06-12](https://api.github.com/repos/DeusData/codebase-memory-mcp/releases/latest)). The 11 agents the install command auto-detects and configures are: Claude Code, Codex CLI, Gemini CLI, Zed, OpenCode, Antigravity, Aider, KiloCode, VS Code, OpenClaw, and Kiro ([READ ME, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)). OpenCode is in that list, which makes the tool immediately relevant to AI Newsroom's own stack.

**The research layer is a published arXiv preprint, not a marketing whitepaper.** [*Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP*](https://arxiv.org/abs/2603.27277) (Vogel, Meyer-Eschenbach, Kohler, Grünewald, Balzer, 2026-03-28) reports the 83% / 10× / 2.1× / 31-repo evaluation in its abstract. The paper parses 66 languages (not 158 — the 158 figure is the number of vendored Tree-Sitter grammars in the binary; the 66 figure is what the paper's pipeline actually exercises). The arXiv license is CC BY 4.0, and the submission is dated 2026-03-28 14:18 UTC ([arXiv:2603.27277, 2026-03-28](https://arxiv.org/abs/2603.27277)). A builder who wants to verify the trade-off can read the paper, not just trust the README.

**The security posture is explicit, not claimed.** The README publishes a SLSA Level 3 build provenance badge, a VirusTotal-scanned-every-release badge, an OpenSSF Scorecard badge, and a 5,604-tests-passing CI badge. Every release binary is signed, checksummed, and scanned by 70+ antivirus engines. All processing is 100% local; the code never leaves the machine. The README is direct about what the tool does: it reads the user's codebase and writes to the user's agent configuration files — that is by design ([README — Security & Trust, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)).

**The agent compatibility is real, but the OpenCode detail is worth a line.** A builder who already runs OpenCode (or any of the other 10 agents in the matrix) gets MCP server entries, instruction files, and pre-tool hooks written automatically by the `install` command. Restart the agent. Say "Index this project." Done. The `--ui` flag also installs the optional graph-visualization binary that runs a 3D graph UI at `localhost:9749` ([README — Quick Start, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)).

## Why it matters

**Token cost is still the dominant complaint about agent loops in 2026.** The README's worked example: 5 structural queries return ~3,400 tokens against the graph, versus ~412,000 tokens via file-by-file search — roughly a **120× reduction on that workload**. The arXiv paper's published aggregate is a 10× reduction across 31 repos. Both numbers are real, but they answer different questions; the 10× is the defensible headline, the 120× is a specific worked example. The article should be honest about which is which — and the README itself flags this by saying the 5-query figure is a "5 structural queries" comparison, not a uniform claim.

**Indexing speed is fast enough to be a day-to-day dependency, not a one-off research tool.** The Linux kernel (28M LOC, 75K files) full-indexes in ~3 minutes on an M3 Pro. An average repository is in milliseconds. A background watcher re-indexes on file changes incrementally. This is the property that turns a code intelligence tool from a periodic "rebuild the index" chore into something an agent can call on every session ([README — Indexing pipeline, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)).

**The single static binary is what makes the install story honest.** No Docker. No Node.js. No Python. No API key. No Ollama. The Nomic `nomic-embed-code` embeddings (40K tokens, 768d int8) and the Hybrid LSP type-resolution logic are compiled into the binary. The one-line installer is exactly what the README claims — `curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash` — and is auditable from the raw URL ([install.sh, 2026-06-24](https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh)). A builder who will not run a piped curl can clone the repo and run install.sh from there.

**The Hybrid LSP is the typed-language differentiator, but the language list is specific.** The README names 9 tier-1 languages for type-resolved semantic search: Python, TypeScript / JavaScript / JSX / TSX (counted as one family in the badge), PHP, C#, Go, C, C++, Java, Kotlin, and Rust ([README — Hybrid LSP, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)). On those languages, queries return function signatures and resolved types, not just identifiers. On tier-2 languages the project still returns AST-resolved symbols but the type layer is less rich. The article should not present the tool as uniformly excellent across all 158 languages — the 83% / 10× / 2.1× benchmarks are aggregate, not per-language.

**Infrastructure-as-code is a first-class graph node, not an afterthought.** Dockerfiles, Kubernetes manifests, and Kustomize overlays are indexed as graph nodes with cross-references. `Resource` nodes for K8s kinds, `Module` nodes for Kustomize overlays with `IMPORTS` edges to referenced resources. This is a unique property — most code intelligence tools stop at application code. For a builder whose stack includes K8s manifests, this is a load-bearing feature ([README — Edge types, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)).

## Practical implications for builders

**1. The fastest path is one command.** From the README's *Quick Start* section:

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
```

Restart the coding agent. Say "Index this project." Done. The `--ui` flag adds the graph visualization binary. The `--skip-config` flag installs the binary without writing to agent configs. The `--dir=<path>` flag installs to a custom location ([README — Quick Start, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)).

**2. Audit before you install.** The README is direct about scope: the tool reads your codebase and writes to your agent configuration files, that is by design. Every release binary is signed, checksummed, and scanned by 70+ antivirus engines, and all processing is 100% local. A builder who cannot audit should not run any piped binary installer; clone the repo, inspect `install.sh`, and run it from there.

**3. Read the arXiv paper before believing the 10× claim.** The 10× / 2.1× / 83% triple is a published, named-author evaluation across 31 real-world repositories, with a reproducible harness. For graph-native queries — hub detection, caller ranking, dead code, cross-service link discovery — the graph approach matches or beats file-exploration on 19 of 31 languages. For "what does this function do on line 47" style questions, the trade-off favors the explorer at 92% versus 83% answer quality ([arXiv:2603.27277, abstract, 2026-03-28](https://arxiv.org/abs/2603.27277)). Choose the tool by query shape, not by headline.

**4. Treat the team-shared graph artifact as a deployment primitive.** The README documents a `.codebase-memory/graph.db.zst` snapshot, written on explicit `index_repository` and refreshed by the watcher, that a team can commit to the repo. Teammates who clone get the snapshot and then run incremental indexing for their local diff. A `.gitattributes` line with `merge=ours` is auto-created so concurrent edits do not produce merge conflicts on the binary artifact. For teams that want a shared index without a reindex tax, this is the property that makes codebase-memory-mcp usable on day one of a clone ([README — Team-Shared Graph Artifact, 2026-06-24](https://github.com/DeusData/codebase-memory-mcp)).

## Risks and caveats

1. **Single-maintainer bus factor.** DeusData is the org; the project appears to be a small team. 5,604 tests passing and 13,355 stars in four months are strong signals, but a single-maintainer project with this much capability is one person leaving away from a fork-or-die situation. The supply-chain pipeline is the strongest in the open-source MCP code-intelligence space, but the bus factor is real.
2. **The 120× token figure is a single workload.** Per the README, 5 structural queries return ~3,400 tokens vs ~412,000 via file-by-file search — that is a 121× reduction on **that workload**. The arXiv paper's 10× figure is the more defensible aggregate across 31 repos. Report the arXiv 10× as the headline, and mention the 120× / ~3,400-tokens figure as a representative worked example with the workload called out explicitly.
3. **The 83% answer quality is a relative number.** Per the arXiv paper, codebase-memory-mcp reaches 83% answer quality vs. 92% for a file-exploration agent. The 10× and 2.1× figures come at a real cost: 9 percentage points of answer quality. For a builder that needs every last percentage point, file-exploration may still be the right answer; for an agent that pays tokens on every query, the trade-off favors the graph. State the trade-off directly, not just the wins.
4. **The arXiv paper parses 66 languages; the README bundles 158 Tree-Sitter grammars.** The arXiv pipeline operates on 66 languages in the published evaluation; the binary ships 158 vendored Tree-Sitter grammars. The 158 is the breadth of the parser, not the depth of the published evaluation. Do not conflate the two.
5. **Hybrid LSP quality varies by language.** Python, TypeScript / JavaScript / JSX / TSX, PHP, C#, Go, C, C++, Java, Kotlin, and Rust are tier-1 for type-resolved semantic search. Tier-2 languages still return AST-resolved symbols but the type layer is less rich. The 83% / 10× / 2.1× benchmarks are aggregate, not uniform.
6. **First index takes resources.** Linux kernel in ~3 minutes on an M3 Pro; smaller repos in seconds. RAM spikes during the initial index and is released after. A builder running on a memory-constrained machine should expect the first index to be the slow one. Subsequent queries are sub-millisecond.
7. **No duplicate coverage in AI Newsroom.** The 2026-06-24 Headroom article is a different tool (token compression); codebase-memory-mcp is a code intelligence MCP server. The two are complementary, not competing. This is the first AI Newsroom article on codebase-memory-mcp.

## What to watch

1. **Adoption by the major coding agent vendors.** Eleven agents are auto-configured today; framework-level integration is the next step. Whether Claude Code, Codex, Cursor, or Aider ship first-party integration with codebase-memory-mcp (or a competitor) as a default-on feature is the milestone to watch over the next quarter.
2. **The release cadence.** v0.8.1 shipped on 2026-06-12; the README's release page should keep the roughly biweekly cadence. A v0.9 release with a wider Hybrid LSP language tier — Java, Kotlin, PHP, and C# are named as tier-2 candidates in the README's hybrid LSP section — is the next big milestone.
3. **Hybrid LSP tier-1 push.** Watch the docs for new tier-1 entries. A tier-1 push for Swift, Scala, or Ruby would change the tool's relevance for mobile and JVM-alternative developers.
4. **Graph visualization UI maturity.** A 3D graph visualization runs at `localhost:9749` as an optional binary variant. The first stable release of the UI binary, separate from the headless one, would be a meaningful UX milestone.
5. **Risk: a major agent vendor ships a competing first-party feature.** Anthropic, OpenAI, Cursor, and JetBrains all ship some form of context engineering today. A first-party competitor that ships persistent indexed knowledge graph + semantic type resolution would compress the open-source window. The next 6–12 months will tell.

## Sources

- 1. `DeusData/codebase-memory-mcp` — GitHub repository (primary, 2026-06-24, [live-verified](https://github.com/DeusData/codebase-memory-mcp))
- 2. README on `main` (primary, 2026-06-24, [live-verified](https://github.com/DeusData/codebase-memory-mcp/blob/main/README.md))
- 3. v0.8.1 release (primary, 2026-06-12, [live-verified](https://github.com/DeusData/codebase-memory-mcp/releases/tag/v0.8.1))
- 4. GitHub REST API metadata — 13,355 stars, 979 forks, MIT, default branch `main` (primary, 2026-06-24, [live-verified](https://api.github.com/repos/DeusData/codebase-memory-mcp))
- 5. arXiv:2603.27277 — *Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP*, Vogel, Meyer-Eschenbach, Kohler, Grünewald, Balzer, 2026-03-28 (primary, [live-verified](https://arxiv.org/abs/2603.27277); CC BY 4.0)
- 6. arXiv:2603.27277 PDF (primary, 2026-03-28, [available](https://arxiv.org/pdf/2603.27277); abstract figures used for the 83% / 10× / 2.1× / 31-repo claim)
- 7. One-line installer (macOS / Linux) (primary, 2026-06-24, [live-verified](https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh))
- 8. OpenSSF Scorecard for the repository (secondary, 2026-06-24, [live-verified](https://scorecard.dev/viewer/?uri=github.com/DeusData/codebase-memory-mcp))
- 9. SLSA build provenance reference (secondary, 2026-06-24, [live-verified](https://slsa.dev))
