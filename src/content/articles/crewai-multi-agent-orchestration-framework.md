---
title: "crewAI: multi-agent orchestration framework at 53K GitHub stars"
description: "MIT repository (crewAIInc/crewAI) with 53,499 stars and 7,488 forks as of June 14, 2026. Crews+Flows architecture, 14.27M PyPI downloads in the last month, stable release 1.14.7 from June 11, 2026."
pubDate: 2026-06-14
author: "AI Newsroom"
tags: ["open-source", "crewai", "multi-agent", "orchestration", "python", "agents", "framework", "repository-feature", "crews", "flows", "amp"]
image: "https://opengraph.githubassets.com/1/crewAIInc/crewAI"
imageAlt: "crewAI open-source repository social preview card"
imageCredit: "Image: GitHub / crewAIInc/crewAI repository (MIT)"
sources:
  - title: "crewAIInc/crewAI (GitHub repository — metadata, releases, commits)"
    url: "https://github.com/crewAIInc/crewAI"
    date: 2026-06-14
    type: primary
  - title: "crewAIInc/crewAI — LICENSE (MIT, copyright 2025 crewAI, Inc.)"
    url: "https://github.com/crewAIInc/crewAI/blob/main/LICENSE"
    date: 2026-06-14
    type: primary
  - title: "crewAIInc/crewAI — README.md (framework description, Crews+Flows architecture, AMP suite, telemetry)"
    url: "https://github.com/crewAIInc/crewAI/blob/main/README.md"
    date: 2026-06-14
    type: primary
  - title: "crewAI docs (docs.crewai.com — Installation, Quickstart, Agents, Flows, Triggers, Enterprise console)"
    url: "https://docs.crewai.com/"
    date: 2026-06-14
    type: primary
  - title: "crewAI on PyPI (1.14.7, requires-python <3.14,>=3.10, 14.27M downloads/month via pypistats)"
    url: "https://pypi.org/project/crewai/"
    date: 2026-06-14
    type: primary
  - title: "learn.crewai.com — CrewAI courses on DeepLearning.ai ('Multi AI Agent Systems with CrewAI')"
    url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/"
    date: 2026-06-14
    type: secondary
  - title: "CrewAI-examples repository (Landing Page Generator, Trip Planner, Stock Analysis, etc.)"
    url: "https://github.com/crewAIInc/crewAI-examples"
    date: 2026-06-14
    type: primary
  - title: "CrewAI Skills (official crewAIInc/skills repository, plugins for Claude Code, Cursor, Codex, Windsurf)"
    url: "https://github.com/crewAIInc/skills"
    date: 2026-06-14
    type: secondary
highRiskClaims: false
---

On June 14, 2026, the public repository **[`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI)** — distributed by the [crewAIInc](https://github.com/crewAIInc) organization under the **MIT** license ([LICENSE](https://github.com/crewAIInc/crewAI/blob/main/LICENSE), copyright 2025 crewAI, Inc.) — counts **53,499 stars, 7,488 forks, 450 open issues, 382 watchers** ([GitHub REST API, June 14, 2026](https://api.github.com/repos/crewAIInc/crewAI)). The latest stable release is **1.14.7** from June 11, 2026. The Python library is also distributed via [PyPI](https://pypi.org/project/crewai/) as `crewai`, with **14,270,352 downloads in the last 30 days** ([pypistats.org, June 14, 2026](https://pypistats.org/api/packages/crewai/recent)). The README states *"over 100,000 developers"* are certified through [learn.crewai.com](https://learn.crewai.com) / DeepLearning.ai — a vendor claim, not independently verified.

## What it is

The [README](https://github.com/crewAIInc/crewAI) defines crewAI as *"a lean, lightning-fast Python framework built entirely from scratch — completely independent of LangChain or other agent frameworks."* The architectural promise is twofold:

1. **CrewAI Crews** — teams of agents with role, goal, and backstory, where task delegation is autonomous and collaborative. The model is "role-playing, autonomous AI agents" emphasising *collaborative intelligence*.
2. **CrewAI Flows** — event-driven, production-grade workflows with `@start`, `@listen`, `@router`, and logical operators (`or_`, `and_`) for routing. This is the *precise control* layer that counterpoints Crew autonomy. The Crews + Flows combination — *autonomy where needed, precision where needed* — is the differentiator.

The primary language is **Python**; the repository is independent from LangChain (reiterated in the README and comparison table), with a dedicated CLI (`crewai create crew`, `crewai run`, `crewai update`).

**AMP Suite.** The README announces [CrewAI AMP Suite](https://github.com/crewAIInc/crewAI#crewai-amp-suite) as an enterprise bundle with a *Crew Control Plane* (tracing, observability, centralized management, integrations, security, 24/7 support, on-premise/cloud deployment). The *Control Plane* version has a free trial at [app.crewai.com](https://app.crewai.com). Features — tracing & observability, RBAC, team management, integrations with Gmail, Slack, Salesforce, OneDrive, HubSpot — are echoed in the [official docs](https://docs.crewai.com/). **Pricing is not published** on the public site.

**CrewAI Skills.** The README introduces [CrewAI Skills](https://github.com/crewAIInc/skills) — a package of structured plugin/instructions that install on Claude Code, Cursor, Codex, Windsurf via `npx skills add crewaiinc/skills` or plugin marketplace. The framework publishes official instructions for third-party agents, aligned with the [MCP docs server](https://docs.crewai.com/mcp).

**Telemetry.** The README describes default data collection: CrewAI version, Python version, OS, agent/task count, process type, LLM model used, agent roles, tool names. The README: *"NO data is collected concerning prompts, task descriptions, agents' backstories or goals, usage of tools, API calls, responses, any data processed by the agents, or secrets and environment variables."* Opt-out is `OTEL_SDK_DISABLED=true`. There's also an opt-in `share_crew=True` mode for goals, backstories, context, and task outputs — disabled by default.

**Requirements and installation.** The [README](https://github.com/crewAIInc/crewAI#1-installation) and [PyPI](https://pypi.org/project/crewai/) require **Python >=3.10, <3.14**. The recommended package manager is [uv](https://docs.astral.sh/uv/) (Astral); canonical commands are `uv pip install crewai` or `uv pip install 'crewai[tools]'`. Known issue with `tiktoken`: `ModuleNotFoundError: No module named 'tiktoken'` is resolved with `uv pip install 'crewai[embeddings]'`; `Failed building wheel for tiktoken` requires an installed Rust compiler (on Windows: Visual C++ Build Tools).

## Why it matters

1. **It's one of the most adopted multi-agent frameworks in 2026, and its position is independent from LangChain.** 14.27M monthly PyPI downloads and 53,499 stars place crewAI in the same adoption tier as LangChain itself and [OpenAI Agents SDK](https://github.com/openai/openai-agents-python).
2. **The Crews + Flows duality is a design proposal worth attention.** Crews is autonomy (role-based delegation), Flows is precision (event-driven graph, explicit state, conditional routers). The README and docs propose them as *complementary*: complexity is managed by switching at the point where "letting agents decide" isn't enough. The translation into Python decorators (`@start`, `@listen`, `@router`) is straightforward.
3. **The "vendor claim" of 100k+ certified developers should be read with caution.** The [DeepLearning.ai](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/) course pages are public and linked. The didactic pipeline is real; the number is **a vendor claim, not an independently verifiable metric**.
4. **The integrated CLI lowers the entry barrier.** `crewai create crew <project_name>` generates a complete skeleton, `crewai run` executes it, `crewai install` locks dependencies, `crewai update` updates the package. The Quickstart reaches a `report.md` in minutes.
5. **The enterprise AMP bundle (Crew Control Plane) answers a concrete question: how do you observe and manage crews in production?** Tracing, RBAC, team management, SaaS integrations, external event triggers, 24/7 support. **Pricing is not published** as of June 14, 2026.
6. **The "5.76x faster than LangGraph" benchmark is vendor-produced.** The README's *How CrewAI Compares* section cites a notebook in [`crewAI-examples`](https://github.com/crewAIInc/crewAI-examples/blob/main/Notebooks/CrewAI%20Flows%20%26%20Langgraph/Coding%20Assistant/coding_assistant_eval.ipynb). Not independent.

## What to watch

- **Pricing and commercial terms for the AMP suite** (not published as of 2026-06-14).
- **Flow system roadmap** — June 13, 2026 commits show focus on Flow Definition YAML.
- **`crewAIInc/crewAI` and sub-repositories** — examples, skills, community forum.
- **Telemetry, opt-out, and security advisories** — empty as of 2026-06-14.
- **Python compatibility** — `<3.14,>=3.10` excludes Python 3.14 and later.
- **Positioning relative to OpenAI Agents SDK and Anthropic Claude Agent SDK.**

## Risks and caveats

1. **"100,000+ certified developers" is a vendor claim.** The number appears twice in the README; the [learn.crewai.com public page](https://learn.crewai.com) does not expose a public certificate counter.
2. **Default telemetry collects operational metadata.** It does not collect prompts, backstories, outputs, API calls, secrets, or env vars. Opt-out: `OTEL_SDK_DISABLED=true`.
3. **Unpredictable token cost on complex crews.** N agents × M LLM calls per task multiplies tokens non-linearly; tracing tools (Crew Control Plane, [LangSmith](https://docs.smith.langchain.com/), [Langfuse](https://langfuse.com/)) are the mitigation.
4. **"Independent from LangChain" doesn't mean "compatible with everything."** Third-party integrations are documented separately.
5. **Crew autonomy is an operational risk.** Crews with `Process.hierarchical` and `allow_delegation=True` leave task handoff to the agents. Without guardrails (callbacks, human-in-the-loop, output validation via [Pydantic](https://docs.pydantic.dev/) `output_pydantic`), an autonomous crew can diverge.
6. **Comparison with LangGraph is vendor-produced.** The 5.76x number is not independently arbitrated.
7. **Python requirements and known installation issues.** `<3.14,>=3.10` plus friction with `tiktoken` (Rust compiler, or Visual C++ Build Tools on Windows).
8. **MIT on code; AMP suite is paid SaaS.**

## Practical advice

- **For AI engineers evaluating multi-agent frameworks:** start with the [official docs Quickstart](https://docs.crewai.com/) and `uv pip install 'crewai[tools]'`. The dev loop — `crewai create crew` → modify `agents.yaml` / `tasks.yaml` → `crewai run` → `report.md` — is the lowest-friction path. Evaluate against [LangGraph](https://langchain-ai.github.io/langgraph/) and [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) for your use case.
- **For those looking for a Crews + Flows production use case:** clone [`crewAIInc/crewAI-examples`](https://github.com/crewAIInc/crewAI-examples) and read — don't run immediately — the *Trip Planner*, *Stock Analysis*, and *Landing Page Generator* examples.
- **For teams managing agents in production:** the [Crew Control Plane](https://app.crewai.com) (free trial) is the documented starting point. Enterprise pricing should be requested directly from crewAI.
- **For those wanting a structured course:** the [CrewAI courses on DeepLearning.ai](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/) are the official didactic pipeline — short courses, in English.

## Sources

- [crewAIInc/crewAI — GitHub repository (2026-06-14)](https://github.com/crewAIInc/crewAI)
- [crewAIInc/crewAI — LICENSE (MIT, copyright 2025 crewAI, Inc.)](https://github.com/crewAIInc/crewAI/blob/main/LICENSE)
- [crewAIInc/crewAI — README.md (2026-06-14)](https://github.com/crewAIInc/crewAI/blob/main/README.md)
- [crewAI docs (docs.crewai.com, 2026-06-14)](https://docs.crewai.com/)
- [crewAI on PyPI (1.14.7, requires-python <3.14,>=3.10, 14.27M downloads/month, 2026-06-14)](https://pypi.org/project/crewai/)
- [learn.crewai.com — CrewAI courses on DeepLearning.ai (2026-06-14)](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/)
- [CrewAI-examples repository (2026-06-14)](https://github.com/crewAIInc/crewAI-examples)
- [CrewAI Skills (2026-06-14)](https://github.com/crewAIInc/skills)
