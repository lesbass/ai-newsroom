---
title: "crewAI: Multi-Agent Orchestration at 53K GitHub Stars"
description: "MIT repository (crewAIInc/crewAI) with 53,499 stars and 7,488 forks as of June 14, 2026. Crews+Flows architecture, 14.27M PyPI downloads in the last month, stable release 1.14.7 from June 11, 2026. Anonymous telemetry active by default, opt-out via OTEL_SDK_DISABLED. Risk of unpredictable token costs and autonomy without documented guardrails. Main sources: GitHub repo and docs.crewai.com."
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

On June 14, 2026, the public repository **[`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI)** — distributed by the [crewAIInc](https://github.com/crewAIInc) organization under the **MIT** license ([LICENSE](https://github.com/crewAIInc/crewAI/blob/main/LICENSE), copyright 2025 crewAI, Inc.) — counts **53,499 stars, 7,488 forks, 450 open issues, 382 watchers** ([GitHub REST API, June 14, 2026](https://api.github.com/repos/crewAIInc/crewAI)), with the last push on June 14, 2026, and the latest stable release **1.14.7** from June 11, 2026. The release introduces an experimental `crewai run --definition` for executing Flows from YAML ([commit d80719df, June 13, 2026](https://github.com/crewAIInc/crewAI)). The Python library is also distributed via [PyPI](https://pypi.org/project/crewai/) as `crewai`, with **14,270,352 downloads in the last 30 days** and **2,250,541 downloads in the last week** ([pypistats.org, June 14, 2026](https://pypistats.org/api/packages/crewai/recent)). The README states that *"over 100,000 developers"* are certified through CrewAI courses on [learn.crewai.com](https://learn.crewai.com) / DeepLearning.ai — a number to be read as a **vendor claim**, not independently verified data ([README, June 14, 2026](https://github.com/crewAIInc/crewAI)).

## What happened

**What it is.** The [README of `crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI) defines the framework as "*a lean, lightning-fast Python framework built entirely from scratch—completely independent of LangChain or other agent frameworks*." The architectural promise is twofold:

1. **CrewAI Crews** — teams of agents with role, goal, and backstory, where task delegation is autonomous and collaborative. The model is "role-playing, autonomous AI agents" and the emphasis is on *collaborative intelligence* between agents with distinct personalities.
2. **CrewAI Flows** — event-driven, production-grade workflows with `@start`, `@listen`, `@router`, and logical operators (`or_`, `and_`) for routing. This is the *precise control* layer that CrewAI proposes as a counterpoint to Crew autonomy. The Crews + Flows combination — *autonomy where needed, precision where needed* — is the differentiator that the README ([section "Understanding Flows and Crews"](https://github.com/crewAIInc/crewAI#understanding-flows-and-crews)) and the [official docs](https://docs.crewai.com/) ([landing, June 14, 2026](https://docs.crewai.com/)) emphasize.

The repository description on GitHub is straightforward: "*Framework for orchestrating role-playing, autonomous AI agents. By fostering collaborative intelligence, CrewAI empowers agents to work together seamlessly, tackling complex tasks.*" ([repo metadata, June 14, 2026](https://api.github.com/repos/crewAIInc/crewAI)). The primary language is **Python**; the repository is independent from LangChain (a claim reiterated in the README and comparison table), and offers a dedicated CLI (`crewai create crew`, `crewai run`, `crewai update`).

**Repository numbers as of June 14, 2026** (source: [GitHub REST API](https://api.github.com/repos/crewAIInc/crewAI)):

| Metric | Value | Observation date |
|---|---|---|
| Stars | **53,499** | 2026-06-14 05:38 UTC |
| Forks | **7,488** | 2026-06-14 05:38 UTC |
| Open issues | **450** | 2026-06-14 05:38 UTC |
| Watchers | **382** | 2026-06-14 05:38 UTC |
| Last push | 2026-06-14 01:54:58 UTC | — |
| Latest stable release | **1.14.7** (June 11, 2026) | — |
| License | **MIT** (SPDX) | LICENSE file verified |
| Size | 253,351 KB | — |
| Created | 2023-10-27 03:26:59 UTC | — |
| Topics | `agents`, `ai`, `ai-agents`, `aiagentframework`, `llms` | — |

**Recent activity feed.** The [first three commits on `main` on June 14, 2026](https://github.com/crewAIInc/crewAI/commits/main) show active work on the Flow system: "Add experimental `crewai run --definition` for flows" (`d80719df`, June 13, 2026 05:31 UTC), "Add expressions to FlowDefinition actions" (`6ad821b1`, June 13, 2026 04:56 UTC), "Implement Flow definition run tools without Python code" (`2444895c`, June 13, 2026 02:47 UTC). Development is daily — this is not a repository in maintenance mode.

**AMP Suite.** The README announces **[CrewAI AMP Suite](https://github.com/crewAIInc/crewAI#crewai-amp-suite)** as an enterprise bundle, with a *Crew Control Plane* (tracing, observability, centralized management, integrations, security, 24/7 support, on-premise/cloud deployment). The *Control Plane* version has a free trial at [app.crewai.com](https://app.crewai.com). Features mentioned in the README (tracing & observability, RBAC, team management, integrations with Gmail, Slack, Salesforce, OneDrive, HubSpot) are echoed in the [official docs](https://docs.crewai.com/) — "*Enterprise journey*" page — but **pricing** and **commercial terms** for the enterprise tier are not published on the public site. The article flags the AMP suite as a paid enterprise offering without reporting unverified price points.

**Didactic approach.** The README ([section "Build with AI"](https://github.com/crewAIInc/crewAI#build-with-ai)) introduces **CrewAI Skills** — a package of structured plugin/instructions ([repo `crewAIInc/skills`](https://github.com/crewAIInc/skills)) that install on Claude Code, Cursor, Codex, Windsurf via `npx skills add crewaiinc/skills` or plugin marketplace, to "teach" the coding agent CrewAI patterns (scaffolding new projects, configuring agents, designing tasks, querying live docs via MCP). It's an interesting move: the framework publishes official instructions for third-party agents, aligned with live MCP server docs. The [MCP docs server](https://docs.crewai.com/mcp) is explicitly linked by the README as the canonical source for current API documentation.

**Telemetry.** The README ([section "Telemetry"](https://github.com/crewAIInc/crewAI#telemetry)) describes default data collection: CrewAI version, Python version, general OS (CPU count, macOS/Windows/Linux), number of agents and tasks per crew, process type (sequential/hierarchical/hybrid), memory/delegation flags, task parallelism, LLM model used, agent roles, tool names used. The README explicitly states: "**NO data is collected** concerning prompts, task descriptions, agents' backstories or goals, usage of tools, API calls, responses, any data processed by the agents, or secrets and environment variables, with the exception of the conditions mentioned." Opt-out is a single environment variable: `OTEL_SDK_DISABLED=true`. There's also an **opt-in mode** (`share_crew=True`) that collects goals, backstories, context, and task outputs — it's disabled by default, and opt-in is per-crew. The README recommends disabling telemetry if the default opt-out isn't sufficient.

**Requirements and installation.** The [README](https://github.com/crewAIInc/crewAI#1-installation) and [PyPI](https://pypi.org/project/crewai/) require **Python >=3.10, <3.14**. The recommended package manager is **[uv](https://docs.astral.sh/uv/)** (Astral), and canonical commands are `uv pip install crewai` or `uv pip install 'crewai[tools]'`. The documentation explicitly warns about **known issues with `tiktoken`**: `ModuleNotFoundError: No module named 'tiktoken'` is resolved with `uv pip install 'crewai[embeddings]'`, and `Failed building wheel for tiktoken` requires an installed Rust compiler (on Windows: Visual C++ Build Tools). This is a real friction point for users on Windows or lightweight CI environments.

**Licensing pattern.** The [LICENSE](https://github.com/crewAIInc/crewAI/blob/main/LICENSE) is classic MIT: copyright 2025 crewAI, Inc., permission to use, copy, modify, merge, publish, distribute, sublicense, sell. It's one of the most permissive licenses available — commercial use, forking, redistribution are all permitted, with attribution.

## Why it matters

**1. It's one of the most adopted multi-agent frameworks in 2026, and its position is independent from LangChain.** The 14.27M monthly PyPI downloads and 53,499 GitHub stars as of June 14, 2026, place crewAI in the same adoption tier as LangChain itself and [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) (radar AIN-65, June 13, 2026). The README declares it *standalone*: "*built entirely from scratch—completely independent of LangChain or other agent frameworks*." For teams wanting to avoid lock-in on a specific stack, this is a non-trivial architectural point.

**2. The Crews + Flows duality is a design proposal worth attention.** Crews is autonomy (role-based delegation between agents with personalities), Flows is precision (event-driven graph, explicit state, conditional routers). The [README](https://github.com/crewAIInc/crewAI#understanding-flows-and-crews) and [docs](https://docs.crewai.com/) propose Crews and Flows as *complementary*, not alternatives: complexity is managed by switching from one to the other at the point where "letting agents decide" isn't enough. It's a useful cognitive map, and its translation into Python decorators (`@start`, `@listen`, `@router`) is straightforward. The README's "Using Crews and Flows Together" section shows an 80-line example of a Flow orchestrating sequential Crews, with a router branching on *high/medium/low confidence* — a reusable, production-grade pattern.

**3. The "vendor claim" of 100k+ certified developers should be read with caution, but the didactic pipeline is real.** The [README](https://github.com/crewAIInc/crewAI) and [learn.crewai.com](https://learn.crewai.com) document a partnership with [DeepLearning.ai](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/) for two short courses: *Multi AI Agent Systems with CrewAI* and *Practical Multi AI Agents and Advanced Use Cases*. The DeepLearning.ai course pages are public and linked. The "100,000+ certified developers" number appears twice in the README and [Key Features](https://github.com/crewAIInc/crewAI#key-features) — it's **a vendor claim**, not an independently verifiable metric from this article. For readers, the value is in the real didactic pipeline (DeepLearning.ai courses, documentation, examples, YouTube channel), not in the number itself.

**4. The integrated CLI lowers the entry barrier.** `crewai create crew <project_name>` generates a complete skeleton (`pyproject.toml`, `src/my_project/{main,crew,config/agents.yaml,config/tasks.yaml,tools}`), `crewai run` executes it, `crewai install` locks dependencies, `crewai update` updates the package. It's a short dev loop, and aligns crewAI with the "CLI-first framework" pattern that worked for [Django](https://www.djangoproject.com/), [Rails](https://rubyonrails.org/), [Laravel](https://laravel.com/), [Astro](https://astro.build/) (cited here only as a pattern). The fact that the docs ([Quickstart](https://docs.crewai.com/)) start from `crewai create crew` and reach a `report.md` in minutes is a strength felt by developers moving from more "bare-bones" frameworks.

**5. The enterprise AMP bundle (Crew Control Plane) answers a concrete question: how do you observe and manage crews in production?** Documented features — tracing, RBAC, team management, SaaS integrations (Gmail, Slack, Salesforce, OneDrive, HubSpot), external event triggers, 24/7 support — are real and consistent with what an operations team demands from an agent vendor in production. **Pricing is not published** on the public site as of June 14, 2026, and this is an area where the article can only cite the *disclosure* without quoting figures. For readers evaluating: the *Control Plane* version has a free trial at [app.crewai.com](https://app.crewai.com) — that's the starting point, not an enterprise cost estimate.

**6. It's a framework with the "handbrake pulled" on independence.** The [README](https://github.com/crewAIInc/crewAI#how-crewai-compares) includes an explicit *How CrewAI Compares* section: an **auto-comparison** where crewAI declares advantages over LangGraph ("*significant performance advantages over LangGraph, executing 5.76x faster in certain cases*"), Autogen ("*lacks an inherent concept of process*"), ChatDev ("*quite rigid*"). The article cites the *5.76x* number only as a vendor claim, with a link to the [comparison notebook](https://github.com/crewAIInc/crewAI-examples/blob/main/Notebooks/CrewAI%20Flows%20%26%20Langgraph/Coding%20Assistant/coding_assistant_eval.ipynb) in the `crewAI-examples` repo. **It's not an independent metric** — it's a vendor-produced benchmark on a selected QA task. It's useful as a positioning signal, not as comparative proof.

## What to watch

- **Pricing and commercial terms for the AMP suite.** As of June 14, 2026, the enterprise suite price points (paid Crew Control Plane, 24/7 support, on-premise deployment) are **not published** on the public site. The `app.crewai.com` free trial is the documented entry point. If crewAI publishes public pricing or tiers in the coming months, that's an editorial transparency upgrade worth flagging.
- **Flow system roadmap.** The June 13, 2026 commits on `main` show heavy focus on Flow Definition YAML (`crewai run --definition`, expressions, `do: call: tool`). If YAML syntax becomes the primary authoring mode for Flows (replacing decorated Python), it's a load-bearing API change for existing users.
- **Status of `crewAIInc/crewAI` and sub-repositories.** CrewAI has an active GitHub organization: beyond the main repo, there are [`crewAIInc/crewAI-examples`](https://github.com/crewAIInc/crewAI-examples) (Landing Page Generator, Trip Planner, Stock Analysis, comparison notebooks), [`crewAIInc/skills`](https://github.com/crewAIInc/skills) (official Skills for Claude Code / Cursor / Codex / Windsurf), and a [community forum at community.crewai.com](https://community.crewai.com). Monitoring these sub-repos is necessary to cover the ecosystem, not just the core.
- **Telemetry, opt-out, and security reports.** The GitHub Security Advisories page for `crewAIInc/crewAI` is empty as of June 14, 2026 ([security-advisories endpoint](https://api.github.com/repos/crewAIInc/crewAI/security-advisories)). No public advisory, but this doesn't exclude unreported or unpatched vulnerabilities. For enterprise use, check the security page on every release.
- **Python compatibility.** The `requires-python = "<3.14,>=3.10"` constraint ([PyPI](https://pypi.org/project/crewai/)) excludes Python 3.14 and later. When Python 3.14 becomes the stable reference version (later in 2026), crewAI compatibility will need verification.
- **Positioning relative to OpenAI Agents SDK and Anthropic Claude Agent SDK.** [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) (~27K stars, 4K forks in early 2026, radar AIN-65) is OpenAI's direct first-party counterpart. Anthropic has a native [Claude Agent SDK](https://docs.claude.com/en/docs/agent-sdk/overview) for its models. The "vendor-neutral vs. vendor-specific framework" map is an editorial choice readers will need to make consciously in 2026, and deserves a separate comparison (not in this article).
- **Translated documentation.** The [official docs](https://docs.crewai.com/) are in English. There is no official Italian translation of the docs portal as of June 14, 2026. A localization (even partial) would lower the entry barrier for non-anglophone readers.

## Risks and caveats

1. **"100,000+ certified developers" is a vendor claim, not an independent data point.** The number appears twice in the [`crewAIInc/crewAI` README](https://github.com/crewAIInc/crewAI) ("Why CrewAI?" and "Key Features" sections), and the README cites the [learn.crewai.com](https://learn.crewai.com) partnership as the source. The [learn.crewai.com public page](https://learn.crewai.com) — verified June 14, 2026 — does not expose a public certificate counter. The number should be read as a **vendor statement**, not a verified metric.
2. **Default telemetry collects operational metadata.** CrewAI version, Python version, OS, agent/task count, process type, LLM model used, agent roles, tool names. **It does not collect prompts, backstories, outputs, API calls, secrets, or env vars** (README declaration). Opt-out is a single env var: `OTEL_SDK_DISABLED=true`. For regulated environments (strict GDPR, healthcare, finance) or air-gapped deployments, opt-out should be set at the deployment level, not per-crew.
3. **Unpredictable token cost on complex crews.** The docs ([section "Triggers & Flows"](https://docs.crewai.com/)) and README imply but don't quantify: a crew with N agents making M LLM calls per task multiplies tokens non-linearly. The article doesn't cite unverified cost numbers. To mitigate: tracing tools (Crew Control Plane, [LangSmith](https://docs.smith.langchain.com/), [Langfuse](https://langfuse.com/) when integrated via callback) are the way forward.
4. **"Independent from LangChain" doesn't mean "compatible with everything."** The framework declares independence, but third-party integrations (vector DB, embedding, observability backend) are documented separately ([crewai-tools](https://github.com/crewAIInc/crewAI-tools) and cookbooks in the docs). For a team with an existing stack, verifying the list of supported integrations is a mandatory step.
5. **Crew autonomy is an operational risk.** Crews with `Process.hierarchical` and `allow_delegation=True` leave task handoff decisions to the agents. Without guardrails (callbacks, human-in-the-loop, output validation via [Pydantic](https://docs.pydantic.dev/) using `output_pydantic`), an autonomous crew can diverge. The docs ([section "Tasks & Processes"](https://docs.crewai.com/)) and README mention `human-in-the-loop triggers` as an option, but the article doesn't assume it's automatically active.
6. **Comparison with LangGraph based on vendor-produced benchmarks.** The "*5.76x faster*" number in the [README](https://github.com/crewAIInc/crewAI#how-crewai-compares) comes from a notebook in [`crewAI-examples`](https://github.com/crewAIInc/crewAI-examples/blob/main/Notebooks/CrewAI%20Flows%20%26%20Langgraph/QA%20Agent). It's a vendor benchmark on a selected QA task. The article cites it with a link to the notebook — it's not independently arbitrated.
7. **Python requirements and known installation issues.** `requires-python = "<3.14,>=3.10"` and documented friction with `tiktoken` (requires Rust compiler, or Visual C++ Build Tools on Windows). For CI/container environments, preparing Rust is a step not to forget.
8. **MIT license on code, but AMP suite is paid SaaS.** MIT applies to the open code in the repo. Enterprise features (paid Crew Control Plane, 24/7 support, on-premise deployment) are a separate commercial offering. The article doesn't conflate the two.

## What to do

**For AI engineers evaluating multi-agent frameworks in 2026:** start with the [official docs Quickstart](https://docs.crewai.com/) and `uv pip install 'crewai[tools]'`. The dev loop — `crewai create crew` → modify `agents.yaml` / `tasks.yaml` → `crewai run` → `report.md` — is the lowest-friction path for a serious first evaluation. The article doesn't recommend crewAI *instead of* [LangGraph](https://langchain-ai.github.io/langgraph/) or [OpenAI Agents SDK](https://github.com/openai/openai-agents-python): it recommends **evaluating all three** against your use case (autonomy vs. control, vendor lock-in vs. neutrality, token cost, observability quality). Comparative reading of the [crewAI README](https://github.com/crewAIInc/crewAI#how-crewai-compares), [LangGraph docs](https://langchain-ai.github.io/langgraph/), and [OpenAI Agents SDK docs](https://openai.github.io/openai-agents-python/) is the minimum two-day work for a tech lead.

**For those looking for a Crews + Flows production use case:** clone [`crewAIInc/crewAI-examples`](https://github.com/crewAIInc/crewAI-examples) and read — don't run immediately — the *Trip Planner*, *Stock Analysis*, and *Landing Page Generator* examples. They're the clearest reference implementations of the pattern. For the combined Crews+Flows pattern, the [QA Agent notebook](https://github.com/crewAIInc/crewAI-examples/tree/main/Notebooks/CrewAI%20Flows%20%26%20Langgraph/QA%20Agent) — despite being a vendor benchmark — shows a Flow orchestrating two sequential Crews, with router and explicit state, and is the most direct translation of the conceptual pattern into executable Python.

**For teams managing agents in production (observability, RBAC, audit):** the [Crew Control Plane](https://app.crewai.com) (free trial) and [enterprise docs](https://docs.crewai.com/) — "*Enterprise journey*" section — are the documented starting point. Features listed in the README (tracing, RBAC, team management, integrations, on-premise deployment) should be **verified in the field**: public documentation describes features, not production results on a specific reader's use case. Enterprise pricing should be requested directly from crewAI.

**For those wanting to learn multi-agent systems with a structured course:** the [CrewAI courses on DeepLearning.ai](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/) — *Multi AI Agent Systems with CrewAI* and *Practical Multi AI Agents and Advanced Use Cases* — are the official didactic pipeline. They're short courses (not academic certifications), in English, and represent the fastest path to a working implementation. They don't replace official documentation — they're a parallel path.

**For publishers, educators, and Italian-language teaching material authors:** an official [docs](https://docs.crewai.com/) translation doesn't exist as of June 14, 2026. An Italian translation (even just the Quickstart, Installation, and "Agents" / "Flows" sections) would be a useful editorial contribution, taking a few weeks of work, with direct impact on the Italian AI engineer community. It's not an investment recommendation — it's a gap observation.

## Verdict

**[`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI) is a mature MIT framework, actively developed, with a Crews+Flows architecture that is a credible design proposal, and 14.27M monthly PyPI downloads as of June 14, 2026, placing it among the most adopted multi-agent frameworks overall.** It's not the only or the best in absolute terms — it's one of the most used. The ecosystem (examples, sub-repositories, coding agent skills, enterprise integrations) is broad, the dev loop is short, and the AMP bundle (Crew Control Plane) answers a real observability and governance need that lighter frameworks don't cover.

The "100,000+ certified developers" claim is a vendor data point, not an independent metric — read it as a positioning signal, not as proof of verified adoption. Default telemetry is documented, opt-out via `OTEL_SDK_DISABLED=true`, and doesn't collect prompts or outputs (README declaration, to be verified in audit). Installation requires Python 3.10-3.13 and can hit friction with `tiktoken` on Windows or lightweight CI containers — preparing a Rust compiler avoids the problem upfront. Crew autonomy is an operational risk: without guardrails (Pydantic output, callbacks, human-in-the-loop) and without tracing (Crew Control Plane, LangSmith, Langfuse), a complex crew can diverge or explode in token cost.

For readers, the practical value is in the combination: MIT framework with an explicit architecture (Crews for autonomy, Flows for control), example sub-repos, official English docs on Mintlify, and a didactic pipeline on DeepLearning.ai. The entry barrier isn't the license (MIT) or the conceptual complexity — it's the English docs. An Italian Quickstart translation, even partial, would be an underutilized editorial asset at this point.
