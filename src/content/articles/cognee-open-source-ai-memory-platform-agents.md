---
title: "cognee: open-source AI memory platform for agents"
description: "cognee is an Apache-2.0 open-source AI memory platform for agents: a self-hosted knowledge graph engine with a four-method API (remember, recall, forget, improve) and a Claude Code plugin."
pubDate: 2026-06-30
author: "AI Newsroom"
tags: ["cognee", "topoteretes", "ai-memory", "agent-memory", "knowledge-graph", "graph-rag", "ai-agents", "context-engineering", "mcp", "model-context-protocol", "claude-code", "claude-code-plugin", "postgres", "pgvector", "truth-subspace", "reranking", "single-postgres", "rust-client", "typescript-client", "cognee-cloud", "open-source", "apache-2-0", "arxiv-2505-24478", "beam", "memory-platform", "vector-database", "ai-newsroom-coverage"]
image: "/images/articles/cognee-open-source-ai-memory-platform-agents/hero-desktop.png"
imageAlt: "GitHub repository landing page for topoteretes/cognee, an Apache-2.0 open-source AI memory platform for agents, showing 25.7k stars, 2.4k forks, 207 open issues, 224 open pull requests, 8,426 commits, and a topics list that includes ai-memory, agent-memory, cognitive-memory, context-engineering, and knowledge-graph."
imageCredit: "Screenshot: GitHub repository landing page for topoteretes/cognee (github.com/topoteretes/cognee), captured 2026-06-30 via Playwright Chromium via the project's scripts/browser.mjs. License: Apache-2.0 (project) / screenshot used editorially for the cognee article."
sources:
  - title: "topoteretes/cognee — GitHub repository (README, file tree, About, Quickstart, Run the Whole Memory Layer on Postgres, Why use Cognee, Use with AI Agents > Claude Code, Use Cognee in Other Languages, Deploy Cognee, Run with Docker, Benchmarks, Research & Citation BibTeX, topics, dependents, language stats)"
    url: "https://github.com/topoteretes/cognee"
    date: 2026-06-30
    type: primary
  - title: "topoteretes/cognee — GitHub REST API metadata (25,747 stars, 2,371 forks, 8,426 commits, 207 open issues, 224 open PRs, 121 releases, Apache-2.0, last push 2026-06-29)"
    url: "https://api.github.com/repos/topoteretes/cognee"
    date: 2026-06-30
    type: primary
  - title: "topoteretes/cognee — v1.2.2 release notes (Truth Subspace & Retrieval Improvements, 2026-06-26)"
    url: "https://github.com/topoteretes/cognee/releases/tag/v1.2.2"
    date: 2026-06-26
    type: primary
  - title: "topoteretes/cognee — v1.2.0 release notes (2026-06-21, smart session distillation, breaking env var renames)"
    url: "https://github.com/topoteretes/cognee/releases/tag/v1.2.0"
    date: 2026-06-21
    type: primary
  - title: "arXiv:2505.24478 — Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning (Markovic, Obradovic, Hajdu, Pavlovic 2025, preliminary version)"
    url: "https://arxiv.org/abs/2505.24478"
    date: 2025-05-30
    type: primary
  - title: "cognee-integrations/claude-code — Claude Code marketplace plugin source (cognee-memory@cognee)"
    url: "https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code"
    date: 2026-06-30
    type: primary
  - title: "cognee/cognee-mcp — Docker Hub prebuilt MCP server image"
    url: "https://hub.docker.com/r/cognee/cognee-mcp"
    date: 2026-06-30
    type: primary
  - title: "cognee-rs — Rust client (cargo add cognee)"
    url: "https://github.com/topoteretes/cognee-rs"
    date: 2026-06-30
    type: primary
  - title: "@cognee/cognee-ts — TypeScript client (npm install @cognee/cognee-ts)"
    url: "https://www.npmjs.com/package/@cognee/cognee-ts"
    date: 2026-06-30
    type: primary
  - title: "Cognee Cloud — managed hosting at www.cognee.ai (pricing not on the public record as of 2026-06-30)"
    url: "https://www.cognee.ai"
    date: 2026-06-30
    type: secondary
  - title: "AI Newsroom — codebase-memory-mcp article (knowledge-graph tag, 2026-06-24, code-intelligence MCP, not cross-session agent memory)"
    url: "https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/"
    date: 2026-06-24
    type: secondary
highRiskClaims: false
---

[cognee](https://github.com/topoteretes/cognee) (Apache-2.0) is the leading self-hosted answer to a problem every team running AI agents at scale hits: the agent has no memory of what it learned last week, last month, or last release. As of 2026-06-30, the [`topoteretes/cognee`](https://github.com/topoteretes/cognee) repository sits at **25,747 stars, 2,371 forks, 8,426 commits on `main`, 207 open issues, 224 open pull requests, 121 releases, Apache-2.0** ([GitHub REST API, 2026-06-30](https://api.github.com/repos/topoteretes/cognee)). The latest release, **v1.2.2 "Truth Subspace & Retrieval Improvements"** ([2026-06-26](https://github.com/topoteretes/cognee/releases/tag/v1.2.2)), adds a new retrieval layer on top of the single-Postgres architecture that shipped in cognee 1.0.

## What it does

**The four-method API.** Cognee exposes four async operations — `remember`, `recall`, `forget`, `improve` — for the entire memory lifecycle ([README](https://github.com/topoteretes/cognee/blob/main/README.md)). `remember` ingests into the permanent knowledge graph or a fast session cache that syncs in the background. `recall` queries the graph and auto-routes to the best search strategy. `forget(dataset=...)` deletes a dataset. `improve(...)` runs the truth-subspace build after session distillation and before enrichment; v1.2.2 added the `build_truth_subspace=True` opt-in flag.

**Single Postgres is the recommended default, but optionality remains.** Per the README: *"In cognee 1.0 you can run the entire memory layer on a single Postgres instance"* ([README](https://github.com/topoteretes/cognee/blob/main/README.md)). The traditional agent-memory stack needs four services — a graph database, a vector database, Redis, and a relational database. cognee 1.0 collapses that to one Postgres instance with `pgvector` for embeddings, a SQL session-cache backend, and the same Postgres for metadata. The README reports that *"in our CI benchmarks, Postgres search ran ~10% faster than the separate graph-plus-vector setup."* Optional dedicated backends remain available: Neo4j and Neptune for graphs, Redis for sessions, pgvector and LanceDB for vectors, plus Qdrant, ChromaDB, Weaviate, and Milvus via community adapters.

**The research grounding is real, with honest limits.** [*Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning*](https://arxiv.org/abs/2505.24478) (Markovic et al., 2025-05-30) studies hyperparameter optimization across three multi-hop QA benchmarks — **HotPotQA, TwoWikiMultiHop, MuSiQue**. The paper is explicit: *"This is a preliminary version. A revised and expanded version is in preparation."* The BEAM benchmark is self-reported: cognee **0.79 at 100K tokens** (>0.8 with per-question routing), **0.67 at 10M tokens**, with an Obsidian / RAG baseline of ~0.33. The README's own caveat: *"These numbers are a directional signal rather than a definitive measure."*

**The Claude Code plugin is the most direct builder hook.** Cognee ships a Claude Code marketplace plugin — `cognee-memory@cognee` — that captures prompts, tool traces, and assistant responses into session memory, injects relevant context on every prompt, and syncs session memory into the permanent knowledge graph at session end ([plugin source](https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code)). The lifecycle hooks cover `SessionStart`, `UserPromptSubmit`, `PostToolUse`, `Stop`, `PreCompact`, `SessionEnd`. Install is three commands before the first `claude` launch:

```bash
claude plugin marketplace add topoteretes/cognee-integrations
claude plugin install cognee-memory@cognee
export LLM_API_KEY="sk-..."   # local mode
claude
```

**The MCP server attaches cognee to any agent that speaks MCP.** Pre-built images are published as [`cognee/cognee`](https://hub.docker.com/r/cognee/cognee) (API server on port 8000) and [`cognee/cognee-mcp`](https://hub.docker.com/r/cognee/cognee-mcp) (MCP server on port 8001). Any MCP-speaking agent — Claude Code, Codex, Cursor, OpenCode, Cline, Windsurf, Continue, Kiro — can attach a persistent memory layer without custom glue code.

**Other clients and add-ons.** Official clients for **Rust** (`cognee-rs`, [`cargo add cognee`](https://github.com/topoteretes/cognee-rs)) and **TypeScript** (`@cognee/cognee-ts`, [`npm install @cognee/cognee-ts`](https://www.npmjs.com/package/@cognee/cognee-ts)); an **OpenClaw plugin** (`@cognee/cognee-openclaw`); and **Cognee Cloud** at [www.cognee.ai](https://www.cognee.ai). One-click deploys target Modal, Railway, Fly.io, Render, and Daytona.

**v1.2.2 (2026-06-26) is the headline release: truth-subspace reranking, all opt-in.** Five named items: a truth-subspace builder, centroid-slot truth weighting (MVP), truth-subspace reranking + feedback activation, a `build_truth_subspace` opt-in flag on `/improve`, and a `DEFAULT_FEEDBACK_INFLUENCE` env var (default **0.0**). Two demos ship: `truth_centroid_slots_demo.py` and `truth_subspace_reranking_demo.py`. Truth signatures now use **sha256 hashing**. **Breaking changes: none.**

**v1.2.0 (2026-06-21) is the security-and-distillation release.** Smart session distillation, batched curator, per-lesson writers. Breaking changes: `LLM_MAX_TOKENS` → `LLM_MAX_COMPLETION_TOKENS` and `EMBEDDING_MAX_TOKENS` → `EMBEDDING_MAX_COMPLETION_TOKENS`. Public registration is **disabled by default**; `ENABLE_BACKEND_ACCESS_CONTROL` now implies API auth and per-user/dataset DB isolation.

## Why it matters

1. **Agent memory is the unsolved infrastructure problem of agent tooling.** cognee is the leading open-source answer — self-hosted, Apache-2.0, graph-backed, attachable via SDK, CLI, MCP, or marketplace plugin.
2. **The single-Postgres architecture is a real simplification.** The traditional stack needs four deployed services before an agent remembers anything; cognee 1.0 collapses that to one Postgres instance, **~10% faster** than the separate setup.
3. **The arXiv paper is real research grounding, with honest limits.** HotPotQA, TwoWikiMultiHop, MuSiQue; the paper is a *preliminary version*; the BEAM numbers are *directional*.
4. **The Claude Code plugin is the lowest-friction entry point on the market.** Three commands and the value is visible in the next session.
5. **v1.2.2's truth-subspace reranking is a research-grade retrieval improvement, shipped behind a default-off flag.** `DEFAULT_FEEDBACK_INFLUENCE` default 0.0 means no behavior change unless the operator opts in.

## Practical implications

- **If you run Claude Code today, install the cognee plugin in three commands.** The first launch bootstraps memory automatically.
- **For any MCP-speaking agent, attach `cognee-mcp` via Docker.** Configure the agent's MCP client to point at the container on `localhost:8000`.
- **For first-time deploys, default to single Postgres.** `pip install "cognee[postgres]"`, then set the four `*_PROVIDER=postgres` env vars.
- **If upgrading to v1.2.0+, rename two env vars.** `LLM_MAX_COMPLETION_TOKENS` and `EMBEDDING_MAX_COMPLETION_TOKENS`.
- **If trying truth-subspace reranking, opt in per-call or per-deployment.** Set `DEFAULT_FEEDBACK_INFLUENCE` to a non-zero value (e.g. `0.1`), then call `improve(..., build_truth_subspace=True)`.
- **If building in Python, the SDK path is four lines of code.** `import cognee; await cognee.remember(...); await cognee.recall(...); await cognee.forget(...)`.

## Risks and caveats

1. **The BEAM numbers are self-reported and explicitly directional.** *"These numbers are a directional signal rather than a definitive measure."* No third-party reproduction is on the record as of 2026-06-30.
2. **The arXiv paper is a preliminary version, not peer-reviewed.** *"This is a preliminary version. A revised and expanded version is in preparation."*
3. **Truth-subspace reranking is opt-in.** Default `DEFAULT_FEEDBACK_INFLUENCE` is **0.0** — existing deployments that upgrade do not see a behavior change unless they opt in.
4. **Single Postgres is the recommended default, but optionality remains.** Neo4j, Neptune, Redis, pgvector, LanceDB, Qdrant, ChromaDB, Weaviate, Milvus all still supported.
5. **v1.2.0 introduced a breaking env var rename.** Operators relying on `LLM_MAX_TOKENS` or `EMBEDDING_MAX_TOKENS` must update their `.env`.
6. **No independent head-to-head against Zep, mem0, or Letta** is on the record. Cognee Cloud pricing is also not on the public record.

## What to watch

1. **Revised arXiv paper** in preparation per the arXiv page.
2. **First independent BEAM benchmark reproduction.**
3. **Cognee Cloud GA / pricing** ([www.cognee.ai](https://www.cognee.ai)) — pricing not on the public record as of 2026-06-30.
4. **v1.3 / v1.4 with truth-subspace as default.**
5. **Adoption in non-Claude-Code agents** via the MCP server.

## Sources

- [topoteretes/cognee — GitHub repository (2026-06-30)](https://github.com/topoteretes/cognee)
- [topoteretes/cognee — GitHub REST API metadata (2026-06-30)](https://api.github.com/repos/topoteretes/cognee)
- [topoteretes/cognee — v1.2.2 "Truth Subspace & Retrieval Improvements" release notes (2026-06-26)](https://github.com/topoteretes/cognee/releases/tag/v1.2.2)
- [topoteretes/cognee — v1.2.0 release notes (2026-06-21)](https://github.com/topoteretes/cognee/releases/tag/v1.2.0)
- [arXiv:2505.24478 — *Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning* (2025-05-30)](https://arxiv.org/abs/2505.24478)
- [cognee-integrations/claude-code — Claude Code marketplace plugin source (2026-06-30)](https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code)
- [cognee-mcp — Docker Hub prebuilt MCP server image (2026-06-30)](https://hub.docker.com/r/cognee/cognee-mcp)
- [cognee-rs — Rust client (2026-06-30)](https://github.com/topoteretes/cognee-rs)
- [@cognee/cognee-ts — TypeScript client (2026-06-30)](https://www.npmjs.com/package/@cognee/cognee-ts)
- [Cognee Cloud — managed hosting at www.cognee.ai (2026-06-30)](https://www.cognee.ai)
- [AI Newsroom — codebase-memory-mcp article (2026-06-24)](https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/)
