---
title: "codebase-memory-mcp: zero-dep code intelligence"
description: "Pure-C, single-binary MCP server that indexes a codebase into a Tree-Sitter knowledge graph in milliseconds. 13.3k stars, MIT, 5,604 tests, 11 agents. arXiv 2603.27277 reports 83% quality at 10× fewer tokens."
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

A pure-C, single-binary MCP server called `codebase-memory-mcp` hit **13,355 GitHub stars** as of 2026-06-24 06:12 UTC. It's the first tool a builder can install with one `curl`, run with **zero runtime dependencies** on macOS, Linux, or Windows, and have answered structural code questions in under a millisecond ([GitHub API, 2026-06-24](https://api.github.com/repos/DeusData/codebase-memory-mcp); [README](https://github.com/DeusData/codebase-memory-mcp)). The headline number is supported by a peer-style preprint on arXiv ([arXiv:2603.27277](https://arxiv.org/abs/2603.27277)), not just a marketing page.

The trade-off, also from the arXiv paper, is the part most coverage skips: codebase-memory-mcp reaches **83% answer quality** versus **92%** for a file-exploration agent, at **10× fewer tokens** and **2.1× fewer tool calls** across 31 real-world repositories ([arXiv:2603.27277, abstract, 2026-03-28](https://arxiv.org/abs/2603.27277)). On graph-native questions (hub detection, caller ranking) it matches or beats the explorer on 19 of 31 languages. The paper claims the tool is **substantially cheaper on the questions it is structured for**, not uniformly better.

## What the repository is

[`DeusData/codebase-memory-mcp`](https://github.com/DeusData/codebase-memory-mcp) is a four-month-old C project (created 2026-02-24, last push 2026-06-24), MIT-licensed, single static binary with vendored Tree-Sitter grammars for 158 languages, an in-memory SQLite store, LZ4 compression, and 14 MCP tools ([GitHub API](https://api.github.com/repos/DeusData/codebase-memory-mcp); [README](https://github.com/DeusData/codebase-memory-mcp/blob/main/README.md)). README badge row: **5,604 tests, 158 languages, 11 agents, single static binary, zero dependencies**.

**Latest release:** v0.8.1, 2026-06-12 ([release](https://github.com/DeusData/codebase-memory-mcp/releases/tag/v0.8.1)). The 11 agents auto-configured by the installer: **Claude Code, Codex CLI, Gemini CLI, Zed, OpenCode, Antigravity, Aider, KiloCode, VS Code, OpenClaw, Kiro** ([README](https://github.com/DeusData/codebase-memory-mcp)).

**The research layer is a published arXiv preprint.** [*Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP*](https://arxiv.org/abs/2603.27277) (Vogel et al., 2026-03-28) reports the 83% / 10× / 2.1× / 31-repo evaluation. The paper parses **66 languages** — 158 is vendored Tree-Sitter grammars in the binary, not what the paper's pipeline exercises. arXiv license CC BY 4.0.

**Security posture is explicit.** README publishes a SLSA Level 3 build-provenance badge, a VirusTotal-scanned-every-release badge, an OpenSSF Scorecard badge, and a 5,604-tests-passing CI badge. Every release binary is signed, checksummed, and scanned by 70+ antivirus engines. All processing is 100% local. The tool reads the user's codebase and writes to the user's agent configuration files — by design.

## Why it matters

**1. Token cost is the dominant complaint about agent loops.** README's worked example: 5 structural queries return ~3,400 tokens via the graph vs ~412,000 via file-by-file search — a **~120× reduction on that workload**. The arXiv aggregate is 10× across 31 repos. The 10× is the defensible headline; the 120× is a worked example.

**2. Indexing speed is fast enough to be a day-to-day dependency.** Linux kernel (28M LOC, 75K files) full-indexes in ~3 minutes on M3 Pro. An average repo is in milliseconds. A background watcher re-indexes on file changes incrementally.

**3. The single static binary makes the install story honest.** No Docker. No Node.js. No Python. No API key. No Ollama. Nomic `nomic-embed-code` embeddings (40K tokens, 768d int8) and Hybrid LSP type-resolution are compiled in. The one-line installer is auditable: `curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash` ([install.sh](https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh)).

**4. The Hybrid LSP is the typed-language differentiator.** Tier-1 gets type-resolved semantic search: **Python, TypeScript/JavaScript/JSX/TSX, PHP, C#, Go, C, C++, Java, Kotlin, Rust**. On those, queries return function signatures and resolved types. Tier-2 returns AST-resolved symbols with a thinner type layer.

**5. Infrastructure-as-code is a first-class graph node.** Dockerfiles, Kubernetes manifests, and Kustomize overlays are indexed as graph nodes: `Resource` for K8s kinds, `Module` for Kustomize overlays with `IMPORTS` edges. Most code intelligence tools stop at application code.

## Practical implications

- **One command installs everything.** `curl -fsSL .../install.sh | bash`, restart the agent, say "Index this project." The `--ui` flag adds the 3D graph visualization binary at `localhost:9749`; `--skip-config` installs without writing to agent configs; `--dir=<path>` installs to a custom location.
- **Audit before you install.** Every release binary is signed, checksummed, and AV-scanned. If you won't run a piped curl, clone the repo and inspect `install.sh` first.
- **Read the arXiv paper before believing the 10× claim.** A published, named-author evaluation across 31 repos with a reproducible harness. For graph-native queries it matches or beats file-exploration on 19 of 31 languages. For "what does this function do on line 47," the explorer wins (92% vs 83%).
- **Treat the team-shared graph artifact as a deployment primitive.** `.codebase-memory/graph.db.zst` snapshots are commit-able; teammates who clone get the snapshot and run incremental indexing for their diff.

## Risks and caveats

1. **Single-maintainer bus factor.** DeusData is the org; small team. 5,604 tests and 13,355 stars in four months are strong signals, but the bus factor is real.
2. **The 120× token figure is a single workload.** The arXiv 10× is the more defensible aggregate.
3. **The 83% answer quality is a relative number.** 9 percentage points of quality for 10× fewer tokens. For builders who need every last percentage point, file-exploration may still be the right answer.
4. **The arXiv paper parses 66 languages; the binary ships 158 grammars.** 158 is parser breadth; 66 is evaluation depth.
5. **Hybrid LSP quality varies by language.** Tier-1 gets type-resolved semantic search; tier-2 gets AST-resolved symbols with a thinner type layer.
6. **First index takes resources.** Linux kernel in ~3 minutes on M3 Pro; smaller repos in seconds. RAM spikes during the initial index, released after. Subsequent queries are sub-millisecond.

## What to watch

- **Adoption by major coding agent vendors.** Eleven agents are auto-configured today; framework-level integration is the next step.
- **Release cadence.** v0.8.1 shipped 2026-06-12; a v0.9 with a wider Hybrid LSP tier (Java, Kotlin, PHP, C# candidates) is the next big milestone.
- **Hybrid LSP tier-1 push.** A tier-1 entry for Swift, Scala, or Ruby would change the tool's relevance for mobile and JVM-alternative developers.
- **Graph UI maturity.** A 3D graph UI at `localhost:9749` is optional; a first stable release is a meaningful UX milestone.
- **Risk: a major agent vendor ships a competing first-party feature.** Anthropic, OpenAI, Cursor, JetBrains all ship some form of context engineering. A first-party persistent indexed knowledge graph + semantic type resolution would compress the open-source window in 6-12 months.

## Sources

- 1. [DeusData/codebase-memory-mcp (GitHub repository, 2026-06-24)](https://github.com/DeusData/codebase-memory-mcp) — primary.
- 2. [README on main (2026-06-24)](https://github.com/DeusData/codebase-memory-mcp/blob/main/README.md) — primary.
- 3. [v0.8.1 release (2026-06-12)](https://github.com/DeusData/codebase-memory-mcp/releases/tag/v0.8.1) — primary.
- 4. [GitHub REST API metadata](https://api.github.com/repos/DeusData/codebase-memory-mcp) — primary.
- 5. [arXiv:2603.27277 (2026-03-28, CC BY 4.0)](https://arxiv.org/abs/2603.27277) — primary; Vogel, Meyer-Eschenbach, Kohler, Grünewald, Balzer.
- 6. [One-line installer script (install.sh, 2026-06-24)](https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh) — primary.
- 7. [OpenSSF Scorecard for the repository (2026-06-24)](https://scorecard.dev/viewer/?uri=github.com/DeusData/codebase-memory-mcp) — secondary.
- 8. [SLSA build provenance reference (2026-06-24)](https://slsa.dev) — secondary.
