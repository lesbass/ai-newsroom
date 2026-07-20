---
title: "didilili/ai-agents-from-zero: a Chinese MIT AI agent guide"
description: "MIT Chinese guide from Datawhale with 27 chapters on LangChain, LangGraph, MCP, RAG, Skills, and fine-tuning. 1.9k stars, two completed projects in May 2026. Code is Python; prose is Chinese."
pubDate: 2026-06-13
author: "AI Newsroom"
tags: ["open-source", "langchain", "langgraph", "mcp", "rag", "skills", "datawhale", "didilili", "ai-agent", "tutorial", "repository-feature"]
image: "https://opengraph.githubassets.com/1/didilili/ai-agents-from-zero"
imageAlt: "ai-agents-from-zero open-source repository social preview card"
imageCredit: "Image: GitHub / didilili/ai-agents-from-zero repository (MIT)"
sources:
  - title: "didilili/ai-agents-from-zero (GitHub repository)"
    url: "https://github.com/didilili/ai-agents-from-zero"
    date: 2026-06-13
    type: primary
  - title: "didilili/ai-agents-from-zero — online documentation site (Docsify)"
    url: "https://didilili.github.io/ai-agents-from-zero/"
    date: 2026-06-13
    type: primary
  - title: "didilili/ai-agents-from-zero — LICENSE (MIT, copyright 2026 didilili)"
    url: "https://github.com/didilili/ai-agents-from-zero/blob/main/LICENSE"
    date: 2026-06-13
    type: primary
  - title: "didilili/ai-agents-from-zero — changelog (tutorial-update-log.md), project completion dates"
    url: "https://github.com/didilili/ai-agents-from-zero/blob/main/%E6%95%99%E7%A8%8B%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md"
    date: 2026-06-13
    type: primary
  - title: "didilili/shopkeeper-agent — e-commerce NL2SQL + LangGraph project (completed May 3, 2026)"
    url: "https://github.com/didilili/shopkeeper-agent"
    date: 2026-05-03
    type: primary
  - title: "didilili/deepsearch-agents — DeepAgents multi-agent project (completed May 17, 2026)"
    url: "https://github.com/didilili/deepsearch-agents"
    date: 2026-05-17
    type: primary
  - title: "LangChain — Python docs (introduction)"
    url: "https://python.langchain.com/docs/introduction/"
    date: 2026-06-13
    type: secondary
  - title: "LangGraph — official documentation"
    url: "https://langchain-ai.github.io/langgraph/"
    date: 2026-06-13
    type: secondary
  - title: "Model Context Protocol — official specification (introduction)"
    url: "https://modelcontextprotocol.io/introduction"
    date: 2026-06-13
    type: secondary
highRiskClaims: false
---

On **2026-06-13**, the public repository **[`didilili/ai-agents-from-zero`](https://github.com/didilili/ai-agents-from-zero)** — published by the Chinese [Datawhale](https://www.datawhale.cn/) organization under the **MIT** license — counts **1,914 stars, 254 forks, 27 markdown chapters**, two completed projects released in May 2026, and an AI interview question archive. The README presents itself as "the most systematic AI agent crash course on the web (from zero to enterprise deployment)" ([README, 2026-06-13](https://github.com/didilili/ai-agents-from-zero)). All chapter code and both projects are **Python**, readable independent of the README language. The language barrier applies to prose, not samples.

## What the repository covers

A single MIT syllabus spanning the 2026 production agent stack:

- **LLM fundamentals** (chapters 1, 8, 11).
- **Low-code** with Coze and Dify (chapters 3-6).
- **LangChain v1.x** (chapters 9-19: Model I/O, Prompt, Parser, LCEL, Memory, Tools, RAG, Agent).
- **MCP** (chapter 20) — comparison with Function Calling and custom servers.
- **LangGraph** (chapters 22-26: graphs, State, Node, Edge, persistence, multi-agent, A2A).
- **Skills and AI programming tools** (chapter 27: Cursor, Codex, Claude Code, Trae, Qoder).
- **Advanced RAG** (vector DB, sparse+dense retrieval, BGE-Rerank, HyDE, RAGAS evaluation, MultiAgent NL2SQL).
- **Fine-tuning** (PEFT, LoRA, QLoRA, DeepSpeed, Llama-Factory, Alpaca/ShareGPT formats).

## Repository numbers

From the [GitHub REST API, 2026-06-13](https://api.github.com/repos/didilili/ai-agents-from-zero): **1,914 stars**, **254 forks**, **10 open issues**, `MIT` license, primary language Python, size 681.8 MB, last push 2026-06-10. Repo created 2026-01-29.

## The two completed projects

Both ship as separate sub-repositories, with explicit completion dates in the [changelog](https://github.com/didilili/ai-agents-from-zero/blob/main/%E6%95%99%E7%A8%8B%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md):

- **`电商问数` (NL2SQL Agent)** — [`didilili/shopkeeper-agent`](https://github.com/didilili/shopkeeper-agent), completed **2026-05-03**. MIT, 96 stars, 24 forks. Stack: LangGraph, FastAPI, Qdrant, Elasticsearch, MySQL, React. E-commerce data-warehouse NL2SQL with metadata KB, hybrid retrieval, NL2SQL generation and validation, SQL execution, and streaming visualization.
- **`深度研搜` (DeepAgents multi-agent)** — [`didilili/deepsearch-agents`](https://github.com/didilili/deepsearch-agents), completed **2026-05-17**. 45 stars, 9 forks. Stack: LangGraph, RAGFlow, Tavily, FastAPI, WebSocket. Conversational multi-agent with live WebSocket progress.

The [docs site](https://didilili.github.io/ai-agents-from-zero/) is a Docsify instance (zh-CN) with sidebar, learning map, and rendered chapters. The README discloses UCloud AI cloud sponsorship — explicit, not masked.

## Why it matters

**1. Single-syllabus coverage of the 2026 production stack.** A guide covering **MCP + LangGraph + RAG + Skills + fine-tuning** under MIT, in one repo, is rare. Open resources on these topics are usually scattered across 5-10 separate docs. 27 chapters in one place, with a shared glossary (`全书术语表.md`, 62 KB), lowers orientation costs.

**2. The two projects are the real value.** `shopkeeper-agent` and `deepsearch-agents` are runnable: clone, `docker compose`, read the Python, and you get a RAG + multi-agent + REST + WebSocket pipeline. For a team wanting a production-style reference, they're a rare open case study, current as of May 2026.

**3. Acknowledge the language barrier.** The README, sidebar, 27 `.md` files, and interview bank are **in Chinese**. Python samples read fine; the prose doesn't. Honest framing: the code reads, the prose doesn't.

**4. A Chinese industrial format.** "Long tutorial + JD-aligned interview bank + completed projects" is a pattern Datawhale has industrialized for the Chinese "AI Agent / LLM Application Engineer" job profile. A **specialist supplement** for areas (MCP, A2A, multi-agent, eval, observability) anglophone collections treat less.

**5. Supplement, not substitute.** LangChain, LangGraph, and MCP each have well-maintained English docs, often more current on API details. The value of `didilili` is a long, organized, Chinese cross-reference that Python readers can use without translating the prose.

## Practical implications

- **For LangChain / LangGraph / MCP / RAG / Skills users:** treat the repo as a **cross-reference** to official docs. Use the [docs sidebar](https://didilili.github.io/ai-agents-from-zero/) as entry point. Both projects are runnable via `docker compose`. Cost: time, not license.
- **For interview prep:** the [question bank](https://github.com/didilili/ai-agents-from-zero/blob/main/AI%E6%99%BA%E8%83%BD%E4%BD%93%E4%B8%8E%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BA%93.md) is a targeted supplement for MCP, A2A, multi-agent, and eval questions.
- **For publishers and educators:** a format signal — the Chinese open-source AI ecosystem is, on certain fronts, more methodical than anglophone sources suggest.

## Risks and caveats

1. **Prose is Chinese, not English** — verified 2026-06-13 on `main`. No canonical English translation yet.
2. **The syllabus aligns with the Chinese 2026 AI agent job profile.** Not automatically transferable to EU/Italian market expectations.
3. **"Complete" means "27 chapters + 2 projects," not "comprehensive."** The README calls it a "速成指南" (crash course) — a starting point, not an exhaustive reference.
4. **MIT permits forking with attribution**; the article doesn't cite third-party forks unless primary-sourced. The `deepsearch-agents` sub-repo doesn't show a visible `LICENSE` file in GitHub metadata as of 2026-06-13.
5. **Star/fork numbers grow over time.** 1,914 and 254 are 2026-06-13 snapshots.
6. **Not an installable library.** No PyPI or npm releases. Clone or read, not `pip install`.
7. **UCloud AI cloud sponsorship is disclosed in the README** — honest disclosure, flagged as transparency, not an editorial endorsement.

## What to watch

- An official or community English translation of the `main` branch.
- Updates to MCP, A2A, Skills, and LangGraph chapters (Chapter 20 cites "as of 2026-06-13"; a substantial update within 30 days is the signal).
- v0.2 or v0.3 releases on `shopkeeper-agent` or `deepsearch-agents`.
- Non-Chinese contributor activity as a Western-adoption quality signal.
- Endorsement from LangChain, LangGraph, Anthropic, or OpenAI as an editorial status upgrade.

## Verdict

**`didilili/ai-agents-from-zero` is a well-organized MIT guide with real Python code, two completed projects, and a structured AI interview archive.** It's not the definitive guide to AI agents and doesn't claim to be. It's one of the most systematic open resources on MCP + LangGraph + RAG + Skills in 2026. The value depends on tolerance for the language barrier: Python readers can use it as a cross-reference without translating the prose; readers needing only the prose will hit Chinese first. In both cases, the repository deserves to be known — a serious, MIT, Chinese, code-readable addition to the 2026 agent literature.

## Sources

- 1. [didilili/ai-agents-from-zero (GitHub repository, 2026-06-13)](https://github.com/didilili/ai-agents-from-zero) — primary.
- 2. [Online documentation site (Docsify, zh-CN)](https://didilili.github.io/ai-agents-from-zero/) — primary.
- 3. [LICENSE (MIT, copyright 2026 didilili)](https://github.com/didilili/ai-agents-from-zero/blob/main/LICENSE) — primary.
- 4. [Changelog (教程更新日志.md), project completion dates](https://github.com/didilili/ai-agents-from-zero/blob/main/%E6%95%99%E7%A8%8B%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md) — primary.
- 5. [didilili/shopkeeper-agent (NL2SQL, completed 2026-05-03)](https://github.com/didilili/shopkeeper-agent) — primary.
- 6. [didilili/deepsearch-agents (multi-agent, completed 2026-05-17)](https://github.com/didilili/deepsearch-agents) — primary.
- 7. [LangChain — Python docs](https://python.langchain.com/docs/introduction/) — secondary.
- 8. [LangGraph — official documentation](https://langchain-ai.github.io/langgraph/) — secondary.
- 9. [Model Context Protocol — official specification](https://modelcontextprotocol.io/introduction) — secondary.
