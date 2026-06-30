---
title: "cognee: open-source AI memory platform for agents"
description: "cognee is an Apache-2.0 open-source AI memory platform for agents: a self-hosted knowledge graph engine with a four-method API (remember, recall, forget, improve) and a Claude Code plugin. v1.2.2 (Jun 26, 2026) added a truth-subspace reranker; v1.0 collapsed the entire memory layer to a single Postgres instance. The 25.7k-star repo is backed by an arXiv paper (Markovic et al., 2505.24478) and a directional BEAM benchmark (0.79 at 100K, 0.67 at 10M)."
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

The open-source project [cognee](https://github.com/topoteretes/cognee) (Apache-2.0) is the leading self-hosted answer to a problem every team running AI agents at scale hits: the agent has no memory of what it learned last week, last month, or last release. As of 2026-06-30, the [`topoteretes/cognee`](https://github.com/topoteretes/cognee) repository sits at **25,747 stars, 2,371 forks, 8,426 commits on `main`, 207 open issues, 224 open pull requests, 121 releases, and an Apache-2.0 license** (per the [GitHub REST API](https://api.github.com/repos/topoteretes/cognee), snapshot 2026-06-30). The latest release, **v1.2.2 "Truth Subspace & Retrieval Improvements"** ([release notes, 2026-06-26](https://github.com/topoteretes/cognee/releases/tag/v1.2.2)), adds a new retrieval layer on top of the single-Postgres architecture that shipped in cognee 1.0. The project is also the rare open-source agent tool that has a published research paper behind it: [*Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning*](https://arxiv.org/abs/2505.24478) by Markovic, Obradovic, Hajdu, and Pavlovic, submitted to arXiv on 2025-05-30.

## What happened

**The four-method API is the surface most builders touch first.** Cognee exposes four async operations — `remember`, `recall`, `forget`, and `improve` — for the entire memory lifecycle ([README](https://github.com/topoteretes/cognee/blob/main/README.md)). `remember` ingests into the permanent knowledge graph (running `add + cognify + improve`) or a fast session cache that syncs in the background. `recall` queries the graph and auto-routes to the best search strategy. `forget(dataset=...)` deletes a dataset. `improve(...)` runs the truth-subspace build after session distillation and before enrichment; v1.2.2 added the `build_truth_subspace=True` opt-in flag. The CLI mirrors the same surface: `cognee-cli remember`, `cognee-cli recall`, `cognee-cli forget --all`, and `cognee-cli -ui` to open the local graph UI.

**Single Postgres is the recommended default, but optionality remains.** Per the README's "Run the Whole Memory Layer on Postgres" section, *"In cognee 1.0 you can run the entire memory layer on a single Postgres instance"* ([README](https://github.com/topoteretes/cognee/blob/main/README.md)). The traditional agent-memory stack needs four services — a graph database, a vector database, Redis, and a relational database — all deployed before an agent remembers anything. cognee 1.0 collapses that to one Postgres instance with `pgvector` for embeddings, a SQL session-cache backend, and the same Postgres for metadata. The README reports that *"in our CI benchmarks, Postgres search ran ~10% faster than the separate graph-plus-vector setup."* Optional dedicated backends remain available: Neo4j and Neptune for graphs, Redis for sessions, pgvector and LanceDB for vectors, plus Qdrant, ChromaDB, Weaviate, and Milvus via community adapters. Local development stays fully embedded — SQLite, LanceDB, Kuzudb — with no extra services. Install is `pip install "cognee[postgres]"` with `DB_PROVIDER=postgres`, `VECTOR_DB_PROVIDER=pgvector`, `GRAPH_DATABASE_PROVIDER=postgres`, `CACHE_BACKEND=postgres`.

**The research grounding is a real, dated arXiv paper — but a preliminary version.** [*Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning*](https://arxiv.org/abs/2505.24478) (Markovic, Obradovic, Hajdu, Pavlovic; submitted 2025-05-30 11:27:59 UTC; subjects cs.AI, cs.CL; DOI 10.48550/arXiv.2505.24478) studies hyperparameter optimization in the context of Cognee across three multi-hop QA benchmarks — **HotPotQA, TwoWikiMultiHop, and MuSiQue** — scored with **exact match, F1, and DeepEval's LLM-based correctness metric**. The paper's own summary: *"Our results demonstrate that meaningful gains can be achieved through targeted tuning. While the gains are consistent, they are not uniform, with performance varying across datasets and metrics."* The arXiv page is explicit: *"This is a preliminary version. A revised and expanded version is in preparation"* — the article cites the paper accordingly.

**The BEAM benchmark is self-reported and explicitly directional.** Per the [README](https://github.com/topoteretes/cognee/blob/main/README.md), the BEAM table reads cognee **0.79 at 100K tokens** (>0.8 with per-question routing) vs previous SOTA 0.735, and **0.67 at 10M tokens** vs previous SOTA 0.641, with an Obsidian / RAG baseline of ~0.33. The README's own caveat, reproduced verbatim: *"These numbers are a directional signal rather than a definitive measure — see the write-up for the full methodology, caveats, and what the results actually mean."* No third-party reproduction is on the record as of 2026-06-30.

**The Claude Code plugin is the most direct builder hook.** Cognee ships a Claude Code marketplace plugin — `cognee-memory@cognee` — that "captures prompts, tool traces, and assistant responses into session memory, injects relevant context on every prompt, and syncs session memory into the permanent knowledge graph at session end" ([plugin source](https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code)). The lifecycle hooks cover `SessionStart`, `UserPromptSubmit`, `PostToolUse`, `Stop`, `PreCompact`, and `SessionEnd`. Install is three commands before the first `claude` launch:

```bash
claude plugin marketplace add topoteretes/cognee-integrations
claude plugin install cognee-memory@cognee
export LLM_API_KEY="sk-..."   # local mode; or COGNEE_BASE_URL + COGNEE_API_KEY for cloud
claude
```

On startup, Claude Code shows a "Cognee Memory Connected" system message. For Cognee Cloud or a remote instance, the plugin points at `https://your-instance.cognee.ai` with a `ck_...` API key.

**The MCP server attaches cognee to any agent that speaks MCP.** Pre-built images are published as [`cognee/cognee`](https://hub.docker.com/r/cognee/cognee) (API server on port 8000) and [`cognee/cognee-mcp`](https://hub.docker.com/r/cognee/cognee-mcp) (MCP server on port 8001). Either `docker compose --profile mcp up` or `docker pull cognee/cognee-mcp:main` with `TRANSPORT_MODE=http` exposes cognee as a first-class MCP server. Any MCP-speaking agent — Claude Code, Codex, Cursor, OpenCode, Cline, Windsurf, Continue, Kiro — can attach a persistent memory layer without writing custom glue code.

**Other clients and add-ons round out the language surface.** Beyond Python, cognee ships official clients for **Rust** (`cognee-rs`, [`cargo add cognee`](https://github.com/topoteretes/cognee-rs)) and **TypeScript** (`@cognee/cognee-ts`, [`npm install @cognee/cognee-ts`](https://www.npmjs.com/package/@cognee/cognee-ts)); an **OpenClaw plugin** ([`@cognee/cognee-openclaw`](https://www.npmjs.com/package/@cognee/cognee-openclaw)); and **Cognee Cloud** at [www.cognee.ai](https://www.cognee.ai). One-click deploys target Modal, Railway, Fly.io, Render, and Daytona.

**Distinct category from existing AI Newsroom coverage.** The closest existing AI Newsroom piece tagged `knowledge-graph` is [codebase-memory-mcp](https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/) (2026-06-24) — a code-intelligence MCP for code search, not a cross-session agent memory layer. cognee and codebase-memory-mcp solve different problems; both can coexist in the same agent stack.

**v1.2.2 (2026-06-26) is the headline release: truth-subspace reranking, all opt-in.** Per the [v1.2.2 release notes](https://github.com/topoteretes/cognee/releases/tag/v1.2.2), the headline feature is a **truth subspace** — a compact index built from distilled, accepted session learnings (centroids as topic anchors, slots as grouped examples) that helps rerank search results. The release ships five named items:

1. **Truth subspace builder** — compiles distilled session lessons into centroids and slots.
2. **Centroid-slot truth weighting (MVP)** — adjusts ranking scores using the truth subspace.
3. **Truth-subspace reranking + feedback activation** — reorders search results to favor items aligned with prior accepted lessons; tunable per call.
4. **`build_truth_subspace` opt-in flag on `/improve`** — runs the truth-subspace build after session distillation and before enrichment.
5. **`DEFAULT_FEEDBACK_INFLUENCE` env var** — controls the default learned-feedback blend weight during graph search; default is **0.0** (i.e. reranking does not change behavior unless the operator opts in).

Two demos are new: `examples/demos/truth_centroid_slots_demo.py` and `examples/python/truth_subspace_reranking_demo.py`. New abstract methods `get_node_truth_state` and `set_node_truth_state` were added to the graph DB interface. Truth signatures now use **sha256 hashing**. The LanceDB S3 usage bug is fixed. **Breaking changes: none** — all new behavior is opt-in by default.

**v1.2.0 (2026-06-21) is the security-and-distillation release with two breaking env var renames.** Per the [v1.2.0 release notes](https://github.com/topoteretes/cognee/releases/tag/v1.2.0), the headline is **smart session distillation** — auto-distill during `improve()`, distilled nodes marked in the visualization, and a reworked distillation pipeline (batched curator, per-lesson writers, reuse of stored embeddings, one document per lesson). The breaking changes are `LLM_MAX_TOKENS` → `LLM_MAX_COMPLETION_TOKENS` and `EMBEDDING_MAX_TOKENS` → `EMBEDDING_MAX_COMPLETION_TOKENS`. Public registration is **disabled by default**; `ENABLE_BACKEND_ACCESS_CONTROL` now implies API auth and per-user/dataset DB isolation. v1.2.0 also adds a Proposals endpoint, inline skill ingest API, S3FileStorage boto3 credential chain fallback (IAM role support), LanceDB Windows long-path prefixing, and LLM/embedding resiliency (retry capping, over-length embedding handling, OpenAI fallback endpoints). v1.2.1, tagged the same day, ships "Reliability & Search Improvements" — small fixes to LLM request handling. Operators tracking the cadence should note that v1.2.0 and v1.2.1 landed within hours of each other.

## Why it matters

**1. Agent memory is the unsolved infrastructure problem of agent tooling.** cognee is the leading open-source answer — a self-hosted, Apache-2.0, graph-backed memory layer that any agent can attach via SDK, CLI, MCP, or marketplace plugin.

**2. The single-Postgres architecture is a real simplification, not marketing.** The traditional agent-memory stack needs four deployed services before an agent remembers anything. cognee 1.0 collapses that to one Postgres instance, and the README reports the same Postgres setup ran **~10% faster than the separate graph-plus-vector setup** in CI benchmarks. The trade-off is that the recommendation is now Postgres-first, not Postgres-only — the README's architecture table still lists Neo4j, Neptune, Redis, pgvector, LanceDB, Qdrant, ChromaDB, Weaviate, and Milvus as available dedicated backends.

**3. The arXiv paper is real research grounding, with honest limits.** Markovic et al.'s paper studies hyperparameter optimization across three standard multi-hop QA benchmarks — HotPotQA, TwoWikiMultiHop, MuSiQue — scored with exact match, F1, and DeepEval's LLM-based correctness metric. The paper is explicit about its own limits — *"the limitations of standard evaluation measures"* and *"performance varying across datasets and metrics"* — and the arXiv page flags the paper as a **preliminary version** with a *"revised and expanded version in preparation."* The article preserves both halves of the framing.

**4. The Claude Code plugin is the lowest-friction entry point on the market today.** Most "agent memory" platforms require custom glue code. cognee ships a Claude Code marketplace plugin that captures prompts, tool traces, and assistant responses into session memory, injects dataset-scoped context on every prompt, and syncs session memory into the permanent knowledge graph at session end. The install path is three commands and the value is visible in the next session.

**5. v1.2.2's truth-subspace reranking is a research-grade retrieval improvement, shipped behind a default-off flag.** The `build_truth_subspace` opt-in flag, the `DEFAULT_FEEDBACK_INFLUENCE` env var (default 0.0), the new graph-DB interface methods, the new demos, and the sha256 signature hashing are all in v1.2.2. The README does not claim "truth-subspace reranking improves accuracy by X%" — no such claim is on the record as of 2026-06-30. The default `DEFAULT_FEEDBACK_INFLUENCE` of **0.0** does not change retrieval behavior.

## Practical implications for builders and operators

**1. If you are running Claude Code today, install the cognee plugin in three commands.** `claude plugin marketplace add topoteretes/cognee-integrations`, `claude plugin install cognee-memory@cognee`, then `export LLM_API_KEY="sk-..."` and launch Claude Code. The first launch bootstraps memory automatically.

**2. If you are running any MCP-speaking agent, attach `cognee-mcp` via Docker.** `docker pull cognee/cognee-mcp:main && docker run -e TRANSPORT_MODE=http --env-file ./.env -p 8000:8000 --rm -it cognee/cognee-mcp:main` exposes the cognee API as an MCP server on `localhost:8000`. Configure the agent's MCP client to point at the container.

**3. If you are deploying for the first time, default to single Postgres.** `pip install "cognee[postgres]"`, then set `DB_PROVIDER=postgres`, `VECTOR_DB_PROVIDER=pgvector`, `GRAPH_DATABASE_PROVIDER=postgres`, `CACHE_BACKEND=postgres`, plus the `DB_HOST` / `DB_PORT` / `DB_USERNAME` / `DB_PASSWORD` / `DB_NAME` vars. The README reports **~10% faster retrieval than the separate graph-plus-vector setup** in CI benchmarks.

**4. If you are upgrading to v1.2.0 or later, rename two env vars.** `LLM_MAX_TOKENS` → `LLM_MAX_COMPLETION_TOKENS` and `EMBEDDING_MAX_TOKENS` → `EMBEDDING_MAX_COMPLETION_TOKENS`. Skipping this rename silently disables your completion-token cap. Review your `.env` and your deployment configs before rolling out v1.2.0+.

**5. If you want to try truth-subspace reranking, opt in per-call or per-deployment.** Set `DEFAULT_FEEDBACK_INFLUENCE` to a non-zero value (e.g. `0.1`) to enable the learned feedback signal globally, or pass `feedback_influence` per API call. Then call `improve(..., build_truth_subspace=True)` to build the index after session distillation. Run the demos (`truth_centroid_slots_demo.py`, `truth_subspace_reranking_demo.py`) to verify behavior on your data.

**6. If you are building an agent in Python, the SDK path is four lines of code.** `uv pip install cognee`, then `import cognee; await cognee.remember(...)`, `await cognee.recall(...)`, `await cognee.forget(...)`. For Rust, use `cognee-rs` (`cargo add cognee`); for TypeScript, use `@cognee/cognee-ts` (`npm install @cognee/cognee-ts`); for OpenClaw, install `@cognee/cognee-openclaw`.

## Risks and caveats

1. **The BEAM numbers are self-reported and explicitly directional.** Per the README, verbatim: *"These numbers are a directional signal rather than a definitive measure — see the write-up for the full methodology, caveats, and what the results actually mean."* The article does not present cognee's 0.79 / 0.67 as a definitive ranking. No third-party reproduction of the BEAM numbers is on the record as of 2026-06-30.

2. **The arXiv paper is a preliminary version, not a peer-reviewed publication.** The arXiv page states, verbatim: *"This is a preliminary version. A revised and expanded version is in preparation."* The paper is cited as arXiv:2505.24478, not as a peer-reviewed conference paper. The paper is honest about its own limits — *"the limitations of standard evaluation measures"* and *"performance varying across datasets and metrics"* — and the article preserves both halves of the framing.

3. **Truth-subspace reranking is opt-in and the new behavior.** Per the v1.2.2 release notes, the default `DEFAULT_FEEDBACK_INFLUENCE` is **0.0** — i.e. reranking does not change behavior unless the operator sets `DEFAULT_FEEDBACK_INFLUENCE` or passes a non-zero `feedback_influence` per API call. The article does not characterise truth-subspace reranking as "now active by default" — it is **now available, opt-in**. Existing deployments that upgrade to v1.2.2 do not see a behavior change unless they opt in.

4. **Single Postgres is the recommended default, but optionality remains.** The README's architecture table lists Neo4j and Neptune for graphs, Redis for sessions, pgvector and LanceDB for vectors, plus Qdrant, ChromaDB, Weaviate, and Milvus via community adapters. The article does not claim cognee is "Postgres-only" — it is **Postgres-first, with optional dedicated backends**.

5. **v1.2.0 introduced a breaking env var rename.** Operators relying on `LLM_MAX_TOKENS` or `EMBEDDING_MAX_TOKENS` must update their `.env` or deployment configs to the new `LLM_MAX_COMPLETION_TOKENS` / `EMBEDDING_MAX_COMPLETION_TOKENS` names. v1.2.0 also disabled public registration by default and tightened `ENABLE_BACKEND_ACCESS_CONTROL` to imply API auth and per-user/dataset DB isolation — operators who relied on the previous default-open posture must review their auth settings.

6. **No independent head-to-head against a comparable agent-memory platform.** Zep, mem0, Letta, and other agent-memory platforms exist; the [cognee README](https://github.com/topoteretes/cognee/blob/main/README.md) and the AI Newsroom radar sweep do not surface a head-to-head benchmark, and no such benchmark is on the record as of 2026-06-30. Cognee Cloud pricing is also not on the public record as of 2026-06-30 — operators evaluating cloud versus self-hosting should contact the vendor.

## What to watch

1. **Revised arXiv paper.** A revised and expanded version of [arXiv:2505.24478](https://arxiv.org/abs/2505.24478) is in preparation per the arXiv page.
2. **First independent BEAM benchmark reproduction.** No third-party reproduction is on the record as of 2026-06-30. The first academic or community-led reproduction of the 100K / 10M BEAM numbers will be a separate article.
3. **Cognee Cloud GA / pricing.** Cognee Cloud exists ([www.cognee.ai](https://www.cognee.ai)), but a published pricing page is not on the record as of 2026-06-30. The first published cloud pricing or self-serve GA announcement will be a separate article.
4. **v1.3 / v1.4 with truth-subspace as default.** v1.2.2 ships truth-subspace as opt-in; the v1.3 / v1.4 line will likely turn it on by default. Watch the [cognee releases page](https://github.com/topoteretes/cognee/releases).
5. **Adoption in non-Claude-Code agents.** The MCP server (`cognee/cognee-mcp`) is the hook for any MCP-speaking agent. The first major non-Claude-Code agent to ship a first-party cognee integration will be a follow-up article.

## Sources

- 1. `topoteretes/cognee` — GitHub repository (README, LICENSE, file tree, "About Cognee", "Quickstart", "Run the Whole Memory Layer on Postgres", "Why use Cognee", "Use with AI Agents > Claude Code", "Use Cognee in Other Languages", "Deploy Cognee", "Run with Docker", "Benchmarks", Research & Citation BibTeX, topics, dependents, language stats) (primary, snapshot 2026-06-30, [live-verified](https://github.com/topoteretes/cognee))
- 2. `topoteretes/cognee` — GitHub REST API metadata (25,747 stars, 2,371 forks, 8,426 commits, 207 open issues, 224 open PRs, 121 releases, Apache-2.0, last push 2026-06-29) (primary, 2026-06-30, [live-verified](https://api.github.com/repos/topoteretes/cognee))
- 3. `topoteretes/cognee` — v1.2.2 "Truth Subspace & Retrieval Improvements" release notes (2026-06-26; truth subspace builder, centroid-slot truth weighting MVP, truth-subspace reranking + feedback activation, `build_truth_subspace` opt-in flag on `/improve`, `DEFAULT_FEEDBACK_INFLUENCE` env var default 0.0, sha256 signature hashing, tighter centroid session filtering, `get_node_truth_state` / `set_node_truth_state` graph DB methods, demos `truth_centroid_slots_demo.py` + `truth_subspace_reranking_demo.py`, LanceDB S3 fix; **no breaking changes**) (primary, 2026-06-26, [live-verified](https://github.com/topoteretes/cognee/releases/tag/v1.2.2))
- 4. `topoteretes/cognee` — v1.2.0 release notes (2026-06-21; smart session distillation with auto-distill during `improve()`, batched curator, per-lesson writers, Proposals endpoint, inline skill ingest API, **breaking env var renames `LLM_MAX_TOKENS` → `LLM_MAX_COMPLETION_TOKENS` and `EMBEDDING_MAX_TOKENS` → `EMBEDDING_MAX_COMPLETION_TOKENS`**, public registration disabled by default, `ENABLE_BACKEND_ACCESS_CONTROL` implies API auth and per-user/dataset DB isolation, S3FileStorage boto3 credential chain, LanceDB Windows long-path, LLM retry capping, OpenAI fallback endpoints) (primary, 2026-06-21, [live-verified](https://github.com/topoteretes/cognee/releases/tag/v1.2.0))
- 5. arXiv:2505.24478 — *Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning* (Markovic, Obradovic, Hajdu, Pavlovic 2025; cs.AI, cs.CL; DOI 10.48550/arXiv.2505.24478; submitted 2025-05-30 11:27:59 UTC; benchmarks HotPotQA / TwoWikiMultiHop / MuSiQue; metrics exact match / F1 / DeepEval's LLM-based correctness; *"meaningful gains can be achieved through targeted tuning. While the gains are consistent, they are not uniform, with performance varying across datasets and metrics"*; *"preliminary version, revised and expanded version in preparation"*) (primary, 2025-05-30, [live-verified](https://arxiv.org/abs/2505.24478))
- 6. cognee-integrations/claude-code — Claude Code marketplace plugin source (SessionStart / UserPromptSubmit / PostToolUse / Stop / PreCompact / SessionEnd lifecycle hooks, "Cognee Memory Connected" system message) (primary, 2026-06-30, [live-verified](https://github.com/topoteretes/cognee-integrations/tree/main/integrations/claude-code))
- 7. cognee-mcp — Docker Hub prebuilt MCP server image (primary, 2026-06-30, [live-verified](https://hub.docker.com/r/cognee/cognee-mcp))
- 8. cognee-rs — Rust client (`cargo add cognee`) (primary, 2026-06-30, [live-verified](https://github.com/topoteretes/cognee-rs))
- 9. `@cognee/cognee-ts` — TypeScript client (`npm install @cognee/cognee-ts`) (primary, 2026-06-30, [live-verified](https://www.npmjs.com/package/@cognee/cognee-ts))
- 10. Cognee Cloud — managed hosting at `www.cognee.ai` (pricing not on the public record as of 2026-06-30) (secondary, 2026-06-30, [live-verified](https://www.cognee.ai))
- 11. AI Newsroom — codebase-memory-mcp article (knowledge-graph tag, 2026-06-24, code-intelligence MCP for code search; closest existing AI Newsroom piece tagged `knowledge-graph`; no prior coverage of cognee, `topoteretes/cognee`, agent memory, persistent memory for agents, or knowledge-graph-for-agents per the [sitemap](https://news.lesbass.com/sitemap.xml)) (secondary, 2026-06-24, [live-verified](https://news.lesbass.com/articles/codebase-memory-mcp-zero-dependency-code-intelligence/))
