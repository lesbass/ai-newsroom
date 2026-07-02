---
title: "cognee: open-source AI memory platform for agents"
description: "Apache-2.0, self-hosted knowledge-graph engine for agent memory. Four-method API, single-Postgres architecture, Claude Code plugin, MCP server. v1.2.2 (Jun 26, 2026) adds opt-in truth-subspace reranking."
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

[cognee](https://github.com/topoteretes/cognee) is the leading self-hosted answer to the agent-memory problem: the agent has no memory of what it learned last week, last month, or last release. Apache-2.0, as of 2026-06-30 the [`topoteretes/cognee`](https://github.com/topoteretes/cognee) repository sits at **25,747 stars, 2,371 forks, 8,426 commits, 207 open issues, 224 open PRs, 121 releases** ([GitHub REST API](https://api.github.com/repos/topoteretes/cognee)). The latest release, **v1.2.2 "Truth Subspace & Retrieval Improvements"** ([release notes, 2026-06-26](https://github.com/topoteretes/cognee/releases/tag/v1.2.2)), adds an opt-in retrieval layer on top of the single-Postgres architecture that shipped in cognee 1.0. The project also has a published research paper: [arXiv:2505.24478](https://arxiv.org/abs/2505.24478).

## What happened

**The four-method API is the surface most builders touch first.** `remember` ingests into the permanent knowledge graph; `recall` queries and auto-routes to the best search strategy; `forget(dataset=...)` deletes a dataset; `improve(...)` runs the truth-subspace build after session distillation ([README](https://github.com/topoteretes/cognee)). The CLI mirrors the same surface: `cognee-cli remember`, `cognee-cli recall`, `cognee-cli forget --all`, and `cognee-cli -ui` to open the local graph UI.

**Single Postgres is the recommended default.** Per the README: *"In cognee 1.0 you can run the entire memory layer on a single Postgres instance."* The traditional stack needs four services (graph DB, vector DB, Redis, relational DB); cognee 1.0 collapses that to one Postgres with `pgvector` for embeddings and a SQL session-cache backend. The README reports *"in our CI benchmarks, Postgres search ran ~10% faster than the separate graph-plus-vector setup."* Optional dedicated backends remain: Neo4j, Neptune, Redis, pgvector, LanceDB, Qdrant, ChromaDB, Weaviate, Milvus. Local development stays fully embedded — SQLite, LanceDB, Kuzudb.

**The research grounding is a dated arXiv paper — a preliminary version.** [*Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning*](https://arxiv.org/abs/2505.24478) (Markovic et al., 2025-05-30) studies hyperparameter optimization across HotPotQA, TwoWikiMultiHop, MuSiQue, scored with exact match, F1, and DeepEval's LLM-based correctness. The paper: *"meaningful gains can be achieved through targeted tuning. While the gains are consistent, they are not uniform."* The arXiv page is explicit: *"This is a preliminary version. A revised and expanded version is in preparation."*

**The BEAM benchmark is self-reported and explicitly directional.** Per the [README](https://github.com/topoteretes/cognee), cognee **0.79 at 100K tokens** vs previous SOTA 0.735, and **0.67 at 10M tokens** vs previous SOTA 0.641. The README's caveat, verbatim: *"These numbers are a directional signal rather than a definitive measure."* No third-party reproduction is on the record as of 2026-06-30.

**The Claude Code plugin is the most direct builder hook.** `cognee-memory@cognee` captures prompts, tool traces, and assistant responses into session memory, injects relevant context on every prompt, and syncs session memory into the permanent knowledge graph at session end ([plugin source](https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code)). Install: `claude plugin marketplace add topoteretes/cognee-integrations`; `claude plugin install cognee-memory@cognee`; `export LLM_API_KEY="sk-..."`; `claude`. The first launch shows a "Cognee Memory Connected" system message.

**The MCP server attaches cognee to any agent that speaks MCP.** [`cognee/cognee-mcp`](https://hub.docker.com/r/cognee/cognee-mcp) on port 8001 exposes cognee as a first-class MCP server. Claude Code, Codex, Cursor, OpenCode, Cline, Windsurf, Continue, Kiro can attach a persistent memory layer without writing custom glue code.

**Other clients.** Rust (`cognee-rs`, [`cargo add cognee`](https://github.com/topoteretes/cognee-rs)); TypeScript (`@cognee/cognee-ts`, [npm](https://www.npmjs.com/package/@cognee/cognee-ts)); OpenClaw plugin; Cognee Cloud at [www.cognee.ai](https://www.cognee.ai). One-click deploys target Modal, Railway, Fly.io, Render, Daytona.

**v1.2.2 (2026-06-26) — truth-subspace reranking, all opt-in.** Per the [v1.2.2 release notes](https://github.com/topoteretes/cognee/releases/tag/v1.2.2), the headline is a **truth subspace** — centroids and slots built from distilled, accepted session learnings — that helps rerank search results. Items: truth subspace builder, centroid-slot truth weighting (MVP), truth-subspace reranking + feedback activation, `build_truth_subspace` opt-in flag on `/improve`, `DEFAULT_FEEDBACK_INFLUENCE` env var (default **0.0**). **No breaking changes.**

**v1.2.0 (2026-06-21) — security-and-distillation, with two breaking env var renames.** Smart session distillation auto-runs during `improve()`. Breaking: `LLM_MAX_TOKENS` → `LLM_MAX_COMPLETION_TOKENS`; `EMBEDDING_MAX_TOKENS` → `EMBEDDING_MAX_COMPLETION_TOKENS`. Public registration is disabled by default; `ENABLE_BACKEND_ACCESS_CONTROL` now implies API auth and per-user/dataset DB isolation ([release notes](https://github.com/topoteretes/cognee/releases/tag/v1.2.0)).

## Why it matters

**Agent memory is the unsolved infrastructure problem of agent tooling** — cognee is the leading open-source answer. **The single-Postgres architecture is a real simplification, not marketing** — the README reports ~10% faster than the separate graph-plus-vector setup in CI. **The Claude Code plugin is the lowest-friction entry point on the market today** — three commands, value visible in the next session. **v1.2.2's truth-subspace reranking is a research-grade retrieval improvement, shipped behind a default-off flag** — `DEFAULT_FEEDBACK_INFLUENCE` defaults to 0.0; the README does not claim "improves accuracy by X%."

## Practical implications

1. **If you run Claude Code today, install the plugin in three commands.** `claude plugin marketplace add topoteretes/cognee-integrations`; `claude plugin install cognee-memory@cognee`; `export LLM_API_KEY="sk-..."`; `claude`.
2. **If you run any MCP-speaking agent, attach `cognee-mcp` via Docker.** `docker pull cognee/cognee-mcp:main && docker run -e TRANSPORT_MODE=http --env-file ./.env -p 8000:8000 --rm -it cognee/cognee-mcp:main` exposes the API on `localhost:8000`.
3. **If you are deploying for the first time, default to single Postgres.** `pip install "cognee[postgres]"`, then set `DB_PROVIDER=postgres`, `VECTOR_DB_PROVIDER=pgvector`, `GRAPH_DATABASE_PROVIDER=postgres`, `CACHE_BACKEND=postgres`.
4. **If you are upgrading to v1.2.0 or later, rename two env vars.** `LLM_MAX_TOKENS` → `LLM_MAX_COMPLETION_TOKENS`; `EMBEDDING_MAX_TOKENS` → `EMBEDDING_MAX_COMPLETION_TOKENS`. Skipping silently disables your completion-token cap.
5. **If you want to try truth-subspace reranking, opt in.** Set `DEFAULT_FEEDBACK_INFLUENCE` to a non-zero value, or pass `feedback_influence` per API call; then call `improve(..., build_truth_subspace=True)`.
6. **If you are building in Python, the SDK path is four lines.** `uv pip install cognee`; `import cognee; await cognee.remember(...); await cognee.recall(...); await cognee.forget(...)`.

## Risks and caveats

- **The BEAM numbers are self-reported and explicitly directional.** No third-party reproduction is on the record as of 2026-06-30.
- **The arXiv paper is a preliminary version, not peer-reviewed.** The arXiv page states: *"This is a preliminary version. A revised and expanded version is in preparation."*
- **Truth-subspace reranking is opt-in.** Default `DEFAULT_FEEDBACK_INFLUENCE` is **0.0**; reranking does not change behavior unless the operator opts in.
- **Single Postgres is the recommended default, but optionality remains.** Neo4j, Neptune, Redis, pgvector, LanceDB, Qdrant, ChromaDB, Weaviate, Milvus are still supported as dedicated backends.
- **v1.2.0 introduced a breaking env var rename** and disabled public registration by default.
- **No independent head-to-head against a comparable agent-memory platform.** Zep, mem0, Letta exist; no head-to-head benchmark is on the record as of 2026-06-30. Cognee Cloud pricing is not on the public record.

## What to watch

1. **Revised arXiv paper** — the 2025-05-30 submission flags a revised and expanded version in preparation.
2. **First independent BEAM benchmark reproduction** — the 100K / 10M numbers are project self-reports as of 2026-06-30.
3. **Cognee Cloud GA / pricing** — published pricing is not on the record.
4. **v1.3 / v1.4 with truth-subspace as default** — v1.2.2 ships it opt-in.
5. **Adoption in non-Claude-Code agents** — the MCP server is the hook.

## Sources

- [topoteretes/cognee — GitHub repository](https://github.com/topoteretes/cognee)
- [topoteretes/cognee — GitHub REST API metadata](https://api.github.com/repos/topoteretes/cognee)
- [topoteretes/cognee — v1.2.2 release notes (2026-06-26)](https://github.com/topoteretes/cognee/releases/tag/v1.2.2)
- [topoteretes/cognee — v1.2.0 release notes (2026-06-21)](https://github.com/topoteretes/cognee/releases/tag/v1.2.0)
- [arXiv:2505.24478 — Optimizing the Interface Between Knowledge Graphs and LLMs (2025-05-30)](https://arxiv.org/abs/2505.24478)
- [cognee-integrations/claude-code — Claude Code plugin source](https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code)
- [cognee/cognee-mcp — Docker Hub prebuilt MCP server image](https://hub.docker.com/r/cognee/cognee-mcp)
- [cognee-rs — Rust client](https://github.com/topoteretes/cognee-rs)
- [@cognee/cognee-ts — TypeScript client (npm)](https://www.npmjs.com/package/@cognee/cognee-ts)
- [Cognee Cloud — www.cognee.ai](https://www.cognee.ai)
- [AI Newsroom — codebase-memory-mcp article (2026-06-24)](https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/)
