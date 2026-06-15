---
title: "smolagents (Hugging Face): agents that think in Python code instead of JSON calls"
description: "The Hugging Face library for building LLM agents where actions are executable Python snippets, not JSON dictionaries. 27.8k stars, Apache 2.0, latest release v1.26.0 from May 29, 2026. Mandatory sandbox for code execution."
pubDate: 2026-06-14
author: "AI Newsroom"
tags: ["huggingface", "smolagents", "agent", "code-agent", "open-source", "mcp", "langchain", "sandbox", "framework", "repository-feature"]
sources:
  - title: "huggingface/smolagents (GitHub repository)"
    url: "https://github.com/huggingface/smolagents"
    date: 2026-06-14
    type: primary
  - title: "smolagents — REST API metadata (stars, forks, license, pushed_at)"
    url: "https://api.github.com/repos/huggingface/smolagents"
    date: 2026-06-14
    type: primary
  - title: "smolagents — releases endpoint (latest tag, changelog)"
    url: "https://api.github.com/repos/huggingface/smolagents/releases?per_page=10"
    date: 2026-06-14
    type: primary
  - title: "smolagents — v1.26.0 release page (2026-05-29)"
    url: "https://github.com/huggingface/smolagents/releases/tag/v1.26.0"
    date: 2026-06-14
    type: primary
  - title: "smolagents — official documentation (index, installation, quickstart)"
    url: "https://huggingface.co/docs/smolagents/index"
    date: 2026-06-14
    type: primary
  - title: "smolagents — Secure code execution (sandboxing tutorial)"
    url: "https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution"
    date: 2026-06-14
    type: primary
  - title: "smolagents — Conceptual guides: What are agents? (Code Agents section)"
    url: "https://huggingface.co/docs/smolagents/en/conceptual_guides/intro_agents"
    date: 2026-06-14
    type: primary
  - title: "Introducing smolagents: a simple library to build agents (HF blog, 2024-12-31)"
    url: "https://huggingface.co/blog/smolagents"
    date: 2024-12-31
    type: secondary
  - title: "Executable Code Actions Elicit Better LLM Agents — Wang et al., 2024 (CodeAct paper, arXiv:2402.01030)"
    url: "https://huggingface.co/papers/2402.01030"
    date: 2024-06-07
    type: secondary
highRiskClaims: true
---

As of June 14, 2026, the public repository **[`huggingface/smolagents`](https://github.com/huggingface/smolagents)** — Hugging Face's Python library for building LLM agents — counts **27,843 stars, 2,687 forks, 595 open issues**, is distributed under the **Apache 2.0** license, and is under active development: last push to `main` on **June 9, 2026**, latest release **v1.26.0** on **May 29, 2026** ([GitHub Releases, June 14, 2026](https://api.github.com/repos/huggingface/smolagents/releases?per_page=10)). Its positioning is summarized by the README: *"a barebones library for agents that think in code"* — a minimal library where the LLM, instead of producing a JSON dictionary with tool name and arguments, **directly writes Python snippets** that are executed to complete the task.

## What happened

`smolagents` was released by Hugging Face on **December 31, 2024** ([HF blog, 2024-12-31](https://huggingface.co/blog/smolagents)) as the **successor** to the previous `transformers.agents` ([HF blog, 2024-12-31](https://huggingface.co/blog/smolagents)). The library exposes two main agent classes, defined in the [official documentation](https://huggingface.co/docs/smolagents/index):

- **`CodeAgent`** — the "thinking in code" agent. At each step of the ReAct loop (Thought → Action → Observation), the model emits a **Python block** that is executed by the interpreter; the output (or error) feeds back into memory and becomes the next step's observation.
- **`ToolCallingAgent`** — the variant that produces actions in the standard "JSON / text blob with tool name + arguments" format, useful when the model or infrastructure doesn't handle executable Python well.

Installation is one line ([smolagents docs, June 14, 2026](https://huggingface.co/docs/smolagents/index)): `pip install 'smolagents[toolkit]'` for the basic installation, with optional dependencies for specific integrations (`[docker]`, `[e2b]`, `[modal]`, `[blaxel]`, `[litellm]`, `[transformers]`, `[mcp]`, `[telemetry]`). The quickstart in the documentation is intentionally minimal:

```python
from smolagents import CodeAgent, InferenceClientModel, DuckDuckGoSearchTool

model = InferenceClientModel()  # default Hugging Face Inference API
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=model)
result = agent.run("What is the current weather in Paris?")
```

The list of supported integrations as of June 14, 2026 covers the main operational ecosystem of a modern Python agent ([smolagents docs](https://huggingface.co/docs/smolagents/index), [secure_code_execution tutorial](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)):

- **Models:** `InferenceClientModel` (Hugging Face Inference API), `LiteLLMModel` (OpenAI, Anthropic, and 100+ other providers), `TransformersModel` (local models via `transformers`), `vLLMModel`, `AmazonBedrockModel`.
- **Tools:** any Python function decorated with `@tool` ([HF blog](https://huggingface.co/blog/smolagents)), tools from an [MCP server](https://modelcontextprotocol.io/) (`ToolCollection.from_mcp`), [LangChain](https://python.langchain.com/) tools (`Tool.from_langchain`), tools loaded from an [Hub Space](https://huggingface.co/spaces) (`Tool.from_space`).
- **Code execution:** `LocalPythonExecutor` (custom, default — *not a security sandbox*), `DockerExecutor`, `E2BExecutor`, `ModalExecutor`, `BlaxelExecutor`, `WasmExecutor` (the latter removed in remote mode in [v1.26.0](https://github.com/huggingface/smolagents/releases/tag/v1.26.0)).

Useful release numbers as of June 14, 2026, from the [REST API GitHub releases endpoint](https://api.github.com/repos/huggingface/smolagents/releases?per_page=10): the library is on a dense release cycle — **17 releases published** between November 17, 2025 (v1.23.0) and May 29, 2026 (v1.26.0), at a rate of about **one release every 12-15 days**. v1.25.0 (May 14, 2026) introduced specific security improvements for remote executors: removal of `allow_origin` from Docker/Modal, use of a token in `DockerExecutor` and `WasmExecutor`, per-instance Deno cache isolation in `WasmExecutor`, correct `pickle:...` decoding support, and — critical for security — reinforcement of the warning "*LocalPythonExecutor is not a security tool*" ([PR #2039](https://github.com/huggingface/smolagents/pull/2039)).

## Why it matters

**1. The "Code Agent" paradigm isn't marketing, it's an explicit research choice.** The idea of having the model write Python instead of JSON dictionaries is at the center of a 2023-2024 research line ([CodeAct paper, Wang et al., 2024](https://huggingface.co/papers/2402.01030), published at ICML 2024). The paper evaluates 17 LLMs on API-Bank and a new M3ToolEval benchmark of 82 multi-tool tasks: **CodeAct achieves a higher success rate** on 12 out of 17 LLMs compared to JSON or text, with an **absolute improvement of up to 20%** on the best model (gpt-4-1106-preview), **requiring up to 30% fewer interactions** ([CodeAct paper, §2.3](https://huggingface.co/papers/2402.01030)). The reasons given in the paper are four: **composability** (nested calls, function definitions, loops, and conditionals in a single action, which JSON doesn't naturally allow), **object handling** (one action's output can be passed directly to the next action as a variable), **generality** (Python is Turing-complete by definition), and **training-data fit** (LLMs are already trained on large amounts of quality Python, so the "action = code" form is congenial to their distribution). The [smolagents documentation](https://huggingface.co/docs/smolagents/en/conceptual_guides/intro_agents) and the [HF blog of December 31, 2024](https://huggingface.co/blog/smolagents) reiterate exactly these four motivations, signaling that the `transformers.agents` → `smolagents` transition happened precisely to align HF's reference library with CodeAct.

**2. Sandboxing is explicit, not optional.** The [Secure code execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution) documentation page starts with a clear statement: "*By default, the CodeAgent runs LLM-generated code in your environment. This is inherently risky*." It lists four risk vectors (honest model error, supply chain on a compromised LLM, web-based prompt injection, publicly exposed agents) and declares that no local sandbox can be 100% secure:

> "*It's important to understand that no local python sandbox can ever be completely secure. While our interpreter provides significant safety improvements over the standard Python interpreter, it is still possible for a determined attacker or a fine-tuned malicious LLM to find vulnerabilities and potentially harm your environment.*"
>
> — [smolagents docs, secure_code_execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)

The only robust mitigation indicated is the **remote sandbox**: `DockerExecutor` (with a recommended Dockerfile using `USER nobody`, `cap_drop=ALL`, `mem_limit=512m`, `no-new-privileges`), `E2BExecutor` (remote machine at [e2b.dev](https://e2b.dev/)), `ModalExecutor` ([modal.com](https://modal.com/)), `BlaxelExecutor` ([blaxel.ai](https://blaxel.ai/)). The default `LocalPythonExecutor`, based on a Python interpreter rewritten by smolagents that walks the AST and blocks unauthorized imports, is a first filter (authorized imports by extension, no access to sub-modules, limited operation count, explicit definition of all supported operations) — but not a security boundary. [PR #2039](https://github.com/huggingface/smolagents/pull/2039) "Emphasise sandboxing is required; LocalPythonExecutor is not a security tool" from May 14, 2026, reinforced this message.

**3. Smolagents is an HF library, not an independent fork.** The repository owner is the `huggingface` organization ([API metadata, June 14, 2026](https://api.github.com/repos/huggingface/smolagents)) and most releases are signed by `@albertvillanova` and `@aymeric-roucher` (HF staff). The distribution ecosystem is native Hugging Face: `push_to_hub()` to publish a tool as a Space, `Tool.from_space()` to consume one from another agent, integration with the [Hugging Face Inference API](https://huggingface.co/docs/inference-providers/index) via `InferenceClientModel`. For a team already using HF Hub and its Spaces as a deployment platform, smolagents is the "lowest friction option" among Python agent libraries.

**4. The entry barrier is intentionally low — at the cost of an explicit trade-off.** The file [`src/smolagents/agents.py`](https://github.com/huggingface/smolagents/blob/main/src/smolagents/agents.py) contains "*the logic for agents fits in ~thousands lines of code*" ([HF blog, 2024-12-31](https://huggingface.co/blog/smolagents)). Installation is one line, the "hello world" quickstart example is six lines of Python. This simplicity is an advantage for anyone wanting to understand **how** an agent works, not just use one: the custom Python interpreter, the ReAct loop, the planning step, the memory system, and logging are all readable. It's an explicit trade-off with heavier, multi-layer abstraction libraries (LangGraph, crewAI) that offer production-ready multi-agent capabilities but require more reading to fully understand.

**5. Adoption numbers are strong but should be read honestly.** 27,843 stars and 2,687 forks as of June 14, 2026, place smolagents among the most adopted Python agent libraries, though comparison should be calibrated: `crewAI` is at 53.5k stars (radar AIN-72, June 14, 2026), `langchain` is above 100k, `autogen` is in the 50k range. Smolagents competes on **positioning** (Code Agents + simplicity), not absolute volume. The 595 open issues signal a large and active user base, but also a non-trivial backlog.

## What to watch

- **Security of remote executors.** [v1.25.0 (May 14, 2026)](https://github.com/huggingface/smolagents/releases/tag/v1.25.0) already hardened `DockerExecutor`, `ModalExecutor`, and `WasmExecutor` by removing `allow_origin`, introducing token authentication, and isolating caches. Constant monitoring of the [implicit CHANGELOG in release notes](https://github.com/huggingface/smolagents/releases) is mandatory: anyone deploying smolagents in production must know in real time if a security fix ships and in which version.
- **Updates to `LocalPythonExecutor` security.** The May 14, 2026 release strengthened warnings, but the interpreter remains the most critical component for local development use. New mitigations are expected with every minor release.
- **MCP integration.** The [documentation](https://huggingface.co/docs/smolagents/index) explicitly cites `ToolCollection.from_mcp` for loading tools from MCP servers. The MCP specification evolution pace in 2026 is high: watch the [smolagents release notes](https://github.com/huggingface/smolagents/releases) for updates to `from_mcp`, `anyOf` parsing, and structured output support (introduced in [v1.22.0](https://github.com/huggingface/smolagents/releases/tag/v1.22.0)).
- **Default model on `InferenceClientModel`.** v1.23.0 (November 17, 2025) changed the default to `Qwen/Qwen3-Next-80B-A3B-Thinking`. If HF changes the default again, production recipes could silently change behavior at the next bump.
- **Compatibility with `huggingface-hub >= 1`.** Introduced in v1.25.0. If a pipeline pins `huggingface-hub<1.0.0` for other reasons, upgrading to smolagents 1.25+ becomes an operational blocker.
- **Documentation in other languages.** The project maintains active translations in Korean (`i18n-KO`) and Spanish (`i18n-es`). Italian isn't present as of June 14, 2026.
- **Possible GitHub security advisories.** The repository has a [Security tab](https://github.com/huggingface/smolagents/security) — check periodically for CVE-associated advisories, especially for LLM-generated code parsing.

## Risks and caveats

1. **"Code Agents" doesn't mean "secure by default."** The `LocalPythonExecutor` executes model-generated code **in your environment** ([smolagents docs, secure_code_execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)). The documentation says so explicitly. Any production use requires `executor_type="docker"` (or equivalent E2B/Modal/Blaxel), with resource limits configured. The article doesn't sell smolagents as "production-ready by default" — it's production-ready **only** if the sandbox is correctly configured.
2. **The CodeAct paper performance numbers should be cited with context.** The [CodeAct paper, §2.3](https://huggingface.co/papers/2402.01030) measures "up to 20% higher success" and "up to 30% fewer actions" on the best model (gpt-4-1106-preview) and on a synthetic benchmark (M3ToolEval, 82 multi-tool tasks). It's a research result, not a product benchmark. For open-source models like Llama-2-7b or Mistral-7B, absolute numbers are much lower (CodeActAgent-Mistral at 12.2% success rate on M3ToolEval vs gpt-4-1106-preview at 74.4% — same paper, table 3). The article doesn't transfer "CodeAct works for all models" as a universal claim.
3. **Smolagents isn't the only Code Agent implementation.** Other projects adopt similar paradigms: the [CodeAct paper](https://huggingface.co/papers/2402.01030) cites TaskWeaver as concurrent work; `autogen` (Microsoft) and `langgraph` (LangChain) both support code execution. The article doesn't present smolagents as "the only" or "the best" implementation.
4. **Supply-chain risk via HF Hub tools.** `Tool.from_space` allows loading a tool from a third-party HF Space. This is convenient but introduces a dependency on the Space author: third-party code executed by your agent. Verify the author, repository, and revisions before importing third-party tools into a production flow.
5. **The 595 open issues as of June 14, 2026 signal imperfect maintenance.** The absolute backlog is high (for comparison: instructor, another Python library, has ~50 open issues on 13.2k stars — data AIN-72). It's not a blocker, but it's a maintenance capacity signal to monitor.
6. **Performance claims aren't smolagents' — they're CodeAct's.** When saying "Code Agents use 30% fewer steps," it's the CodeAct paper demonstrating it on a specific benchmark. Smolagents is the reference implementation; performance depends on the underlying model and prompt.
7. **Star/fork metrics change over time.** 27,843 stars and 2,687 forks were observed on June 14, 2026. Not a permanent snapshot.

## What to do

**For AI engineers evaluating adoption of smolagents in production:** the non-negotiable rule is **remote sandboxing first**. The minimum setup requires `pip install 'smolagents[docker]'` and a `Dockerfile` with `USER nobody`, `cap_drop=ALL`, `no-new-privileges`, memory and CPU limits ([example in documentation](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)). Those with an existing E2B, Modal, or Blaxel account can start with one of those providers and get the same isolation level in 5 minutes, without managing Docker. `LocalPythonExecutor` should be used **only** for local prototypes and experimentation, never for execution on untrusted input.

**For those wanting to understand how a Code Agent works "from the inside":** smolagents is one of the most accessible readings. The file [`src/smolagents/agents.py`](https://github.com/huggingface/smolagents/blob/main/src/smolagents/agents.py) is the core (~1,000 lines of logic per the README) and covers the entire ReAct loop, memory, planning, and logging. The ["What are agents?" tutorial](https://huggingface.co/docs/smolagents/en/conceptual_guides/intro_agents) and the [announcement blog](https://huggingface.co/blog/smolagents) explain the paradigm. Onboarding time: one evening, not one week.

**For those seeking a comparison with other Python agent frameworks:** smolagents competes on positioning (Code Agents + simplicity + HF-native), not multi-agent features completeness. If the goal is **multi-agent production-ready** with tracing, flow control, persistence, and role management, [LangGraph](https://langchain-ai.github.io/langgraph/) or [crewAI](https://github.com/crewAIInc/crewAI) offer more at the cost of a steeper learning curve. If the goal is **simple, readable Code Agents** with good MCP and LangChain support, smolagents is the natural choice.

**For those wanting to experiment with open-weight models via Hugging Face:** `InferenceClientModel` calls the HF Inference API without needing OpenAI or Anthropic keys; for local models, `TransformersModel` loads a model via `transformers` locally. Combined with the Hub ecosystem (tools published as Spaces, models on HF), smolagents becomes a way to build agents entirely with open-weight components, from the model side to the tooling.

## Verdict

**`huggingface/smolagents` is a solid, well-maintained Python agent library, clearly positioned on the Code Agents paradigm.** 27,843 stars, Apache 2.0, 17 releases in seven months, active security work on remote executors. The fact that it's owned by Hugging Face and natively integrated with the HF Hub ecosystem (Inference API, Spaces, models) makes it a low-friction choice for those already inside that ecosystem.

The real value isn't the library itself — it's the **mindset shift** it proposes. In an ecosystem where most agent libraries (including LangGraph, crewAI, autogen) use the JSON format for tool calls, smolagents puts **Python code** at the center of agent actions, and does so with a library small enough to be read and understood. It's a non-neutral design bet: it accepts higher code execution risk in exchange for expressiveness, composability, and a better fit with modern LLM training data. The bet is supported by the [CodeAct paper by Wang et al., 2024](https://huggingface.co/papers/2402.01030) on a synthetic benchmark, not by an exhaustive comparison on all possible workloads.

For an AI engineer building LLM agents in 2026, smolagents deserves to be read, installed, and tried — **with remote sandboxing configured from the first commit**. It's not the right library for every use case (complex multi-agent systems, tight flow control, enterprise production with strong governance require other tools), but it's one of the few that makes the Code Agents paradigm explicit and allows understanding it, not just consuming it. The [official documentation](https://huggingface.co/docs/smolagents/index) and the [announcement blog](https://huggingface.co/blog/smolagents) are the entry point; the [Secure code execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution) page is required reading before any production use.
