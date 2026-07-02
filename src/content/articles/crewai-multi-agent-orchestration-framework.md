---
title: "crewAI: Multi-Agent Orchestration at 53K GitHub Stars"
description: "MIT-licensed crewAIInc/crewAI: 53,499 stars, 14.27M monthly PyPI downloads, v1.14.7 (Jun 11, 2026). Crews+Flows pairs role-based autonomy with event-driven precision. Telemetry opt-out via OTEL_SDK_DISABLED."
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

[`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI) is one of the most-adopted multi-agent frameworks in 2026 — MIT-licensed, independent from LangChain, with a Crews+Flows architecture that pairs role-based autonomy with event-driven precision. As of 2026-06-14 the repo reports **53,499 stars, 7,488 forks, 450 open issues, 382 watchers**, latest stable release **1.14.7** (2026-06-11) ([GitHub REST API](https://api.github.com/repos/crewAIInc/crewAI)). The Python library is also on [PyPI](https://pypi.org/project/crewai/) with **14,270,352 downloads in the last 30 days** ([pypistats](https://pypistats.org/api/packages/crewai/recent)). The README's "100,000+ certified developers" is a vendor claim, not independently verified.

## What happened

**The framework is two coordinated things.** The [README](https://github.com/crewAIInc/crewAI) defines it as *"a lean, lightning-fast Python framework built entirely from scratch—completely independent of LangChain or other agent frameworks."* The two halves:

- **Crews** — role-playing, autonomous agents with `role`, `goal`, and `backstory`; task delegation is collaborative. *"Autonomy where needed."*
- **Flows** — event-driven, production-grade workflows with `@start`, `@listen`, `@router`, and logical operators (`or_`, `and_`). *"Precision where needed."*

The Crews+Flows split is the differentiator: complexity is managed by switching from one to the other at the point where "letting agents decide" isn't enough. The "Using Crews and Flows Together" section shows a Flow orchestrating sequential Crews with a router branching on high/medium/low confidence.

**Repository numbers, 2026-06-14:**

| Metric | Value |
|---|---|
| Stars | 53,499 |
| Forks | 7,488 |
| Open issues | 450 |
| Latest stable | 1.14.7 (Jun 11, 2026) |
| License | MIT |
| PyPI downloads (30d) | 14,270,352 |

**Recent activity.** The [first three commits on `main` on June 14, 2026](https://github.com/crewAIInc/crewAI/commits/main) focus on Flow Definition YAML: `crewai run --definition` for flows, expressions in FlowDefinition actions, Flow-definition run tools without Python code. Development is daily.

**AMP Suite.** The README announces the [CrewAI AMP Suite](https://github.com/crewAIInc/crewAI#crewai-amp-suite) — an enterprise bundle with a **Crew Control Plane** (tracing, observability, RBAC, team management, integrations with Gmail, Slack, Salesforce, OneDrive, HubSpot, 24/7 support, on-premise/cloud). The Control Plane version has a free trial at [app.crewai.com](https://app.crewai.com). **Pricing is not published** on the public site as of 2026-06-14.

**CrewAI Skills.** Official plugins ([`crewAIInc/skills`](https://github.com/crewAIInc/skills)) install on Claude Code, Cursor, Codex, Windsurf via `npx skills add crewaiinc/skills` to teach the coding agent CrewAI patterns. The [MCP docs server](https://docs.crewai.com/mcp) is the canonical source for current API documentation.

**Telemetry.** The [README](https://github.com/crewAIInc/crewAI#telemetry) describes default data collection: CrewAI version, Python version, OS, agent/task count, process type (sequential/hierarchical/hybrid), memory/delegation flags, task parallelism, LLM model used, agent roles, tool names. The README: *"NO data is collected" concerning prompts, task descriptions, backstories, usage of tools, API calls, responses, secrets, or env vars.* Opt-out is a single env var: `OTEL_SDK_DISABLED=true`.

**Requirements and install.** Python **≥3.10, <3.14**. Recommended: `uv pip install 'crewai[tools]'` ([uv](https://docs.astral.sh/uv/)). Documented friction: `tiktoken` requires a Rust compiler (or Visual C++ Build Tools on Windows) for `Failed building wheel for tiktoken` errors.

## Why it matters

**One of the most adopted multi-agent frameworks in 2026, independent from LangChain.** 14.27M monthly PyPI downloads and 53,499 stars place crewAI in the same adoption tier as LangChain and [OpenAI Agents SDK](https://github.com/openai/openai-agents-python). The README declares it *standalone*. **The Crews+Flows duality is a design proposal worth attention** — autonomy where needed, precision where needed, with a clean Python decorator API (`@start`, `@listen`, `@router`). **The "100k+ certified developers" is a vendor claim** — read it as a positioning signal, not verified adoption. **The CLI lowers the entry barrier** — `crewai create crew <project>` → modify `agents.yaml` / `tasks.yaml` → `crewai run` → `report.md`. **The AMP bundle answers a real question** about how to observe and manage crews in production; pricing remains unpublished.

## Practical implications

- **Start with the Quickstart.** `uv pip install 'crewai[tools]'`, then `crewai create crew my-project` and edit `agents.yaml` / `tasks.yaml`. `crewai run` is the dev loop.
- **For multi-agent evaluation,** compare [`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI), [LangGraph](https://langchain-ai.github.io/langgraph/), and [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) on your use case — autonomy vs. control, vendor lock-in vs. neutrality, token cost, observability quality.
- **For production observability,** the [Crew Control Plane](https://app.crewai.com) (free trial) is the documented starting point; verify features in the field.
- **For learning,** the [DeepLearning.ai courses](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/) are the official didactic pipeline.
- **Prepare a Rust compiler** in your CI image to avoid the `tiktoken` wheel-build issue on Windows or lightweight containers.
- **For regulated environments,** set `OTEL_SDK_DISABLED=true` at the deployment level — the README's opt-out is per-process, not per-crew.

## Risks and caveats

- **"100,000+ certified developers" is a vendor claim, not an independent metric.**
- **Default telemetry collects operational metadata** (no prompts, outputs, secrets). Opt-out via `OTEL_SDK_DISABLED=true`. For GDPR / healthcare / air-gapped, set the env var at deployment level.
- **Unpredictable token cost on complex crews** — N agents × M LLM calls per task multiplies tokens non-linearly. Trace via Control Plane, [LangSmith](https://docs.smith.langchain.com/), or [Langfuse](https://langfuse.com/).
- **"Independent from LangChain" doesn't mean "compatible with everything."** Verify the [crewai-tools](https://github.com/crewAIInc/crewAI-tools) integrations for your stack.
- **Crew autonomy is an operational risk.** `Process.hierarchical` and `allow_delegation=True` let agents hand off tasks. Without `output_pydantic` validation, callbacks, and human-in-the-loop, an autonomous crew can diverge.
- **Vendor-comparison benchmarks are not independent.** The README's "5.76x faster than LangGraph" comes from a [notebook in `crewAI-examples`](https://github.com/crewAIInc/crewAI-examples) on a selected QA task. Cite as positioning, not proof.
- **MIT on code; AMP suite is paid SaaS.** Don't conflate.
- **Python 3.10–3.13 only.** When Python 3.14 becomes the stable reference, verify compatibility.

## What to watch

1. **AMP suite pricing** — public pricing would be an editorial transparency upgrade.
2. **Flow system roadmap** — recent commits show heavy focus on Flow Definition YAML; if YAML becomes the primary authoring mode, it is a load-bearing API change.
3. **Sub-repo status** — [`crewAIInc/crewAI-examples`](https://github.com/crewAIInc/crewAI-examples), [`crewAIInc/skills`](https://github.com/crewAIInc/skills), and [community.crewai.com](https://community.crewai.com) round out the ecosystem.
4. **Security advisories** — the [security-advisories endpoint](https://api.github.com/repos/crewAIInc/crewAI/security-advisories) is empty as of 2026-06-14. Check on every release.
5. **Vendor-neutral vs. vendor-specific framework** positioning vs. [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) and [Claude Agent SDK](https://docs.claude.com/en/docs/agent-sdk/overview).
6. **Localized docs** — no official Italian translation of [docs.crewai.com](https://docs.crewai.com/) as of 2026-06-14.

## Sources

- [GitHub — crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
- [GitHub — crewAIInc/crewAI LICENSE (MIT)](https://github.com/crewAIInc/crewAI/blob/main/LICENSE)
- [GitHub — crewAIInc/crewAI README](https://github.com/crewAIInc/crewAI/blob/main/README.md)
- [crewAI docs](https://docs.crewai.com/)
- [PyPI — crewai](https://pypi.org/project/crewai/)
- [pypistats — recent downloads](https://pypistats.org/api/packages/crewai/recent)
- [DeepLearning.ai — Multi AI Agent Systems with CrewAI](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/)
- [GitHub — crewAI-examples](https://github.com/crewAIInc/crewAI-examples)
- [GitHub — crewAIInc/skills](https://github.com/crewAIInc/skills)
