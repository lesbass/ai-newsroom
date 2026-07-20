---
title: "smolagents: Hugging Face's Code-First Python Agent Library"
description: "Hugging Face's open-source Python agent library where the model writes executable code instead of JSON. 27.8k stars, Apache 2.0, v1.26.0 (May 29, 2026). Remote sandboxing is mandatory."
pubDate: 2026-06-14
author: "AI Newsroom"
tags: ["huggingface", "smolagents", "agent", "code-agent", "open-source", "mcp", "langchain", "sandbox", "framework", "repository-feature"]
image: "https://opengraph.githubassets.com/1/huggingface/smolagents"
imageAlt: "smolagents open-source repository social preview card"
imageCredit: "Image: GitHub / huggingface/smolagents repository (Apache 2.0)"
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

As of **2026-06-14**, the public repository **[`huggingface/smolagents`](https://github.com/huggingface/smolagents)** — Hugging Face's Python library for building LLM agents — counts **27,843 stars, 2,687 forks, 595 open issues**, ships under **Apache 2.0**, with last push on **2026-06-09** and latest release **v1.26.0** on **2026-05-29** ([GitHub Releases, 2026-06-14](https://api.github.com/repos/huggingface/smolagents/releases?per_page=10)). The README positions it as *"a barebones library for agents that think in code"* — the LLM writes **Python snippets** that execute, instead of a JSON dictionary of tool name + arguments ([HF blog, 2024-12-31](https://huggingface.co/blog/smolagents)).

## What it is

Two agent classes ([smolagents docs](https://huggingface.co/docs/smolagents/index)):

- **`CodeAgent`** — the "thinking in code" agent. Each ReAct step (Thought → Action → Observation) emits a Python block; the interpreter runs it; the output feeds back as the next step's observation.
- **`ToolCallingAgent`** — the JSON/text-blob variant for models or stacks that don't handle executable Python well.

Installation: `pip install 'smolagents[toolkit]'` with optional extras (`[docker]`, `[e2b]`, `[modal]`, `[litellm]`, `[mcp]`, `[telemetry]`). Quickstart:

```python
from smolagents import CodeAgent, InferenceClientModel, DuckDuckGoSearchTool
model = InferenceClientModel()
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=model)
result = agent.run("What is the current weather in Paris?")
```

**Integrations (as of 2026-06-14):**

- **Models:** `InferenceClientModel` (HF Inference API), `LiteLLMModel` (OpenAI, Anthropic, 100+ providers), `TransformersModel`, `vLLMModel`, `AmazonBedrockModel`.
- **Tools:** any Python function via `@tool`, MCP servers (`ToolCollection.from_mcp`), LangChain tools, HF Hub Spaces (`Tool.from_space`).
- **Executors:** `LocalPythonExecutor` (default — *not a sandbox*), `DockerExecutor`, `E2BExecutor`, `ModalExecutor`, `BlaxelExecutor`, `WasmExecutor`.

**Release cadence:** **17 releases** between v1.23.0 (2025-11-17) and v1.26.0 (2026-05-29) — about one every 12-15 days. v1.25.0 (2026-05-14) hardened remote executors: removed `allow_origin` from Docker/Modal, added token auth in Docker/Wasm, isolated Deno caches, and reinforced *"LocalPythonExecutor is not a security tool."*

## Why it matters

**1. The "Code Agent" paradigm is a research choice, not a tagline.** The [CodeAct paper (Wang et al., 2024, ICML 2024)](https://huggingface.co/papers/2402.01030) evaluates 17 LLMs on API-Bank and M3ToolEval (82 multi-tool tasks). CodeAct posts a higher success rate on **12 of 17** models versus JSON or text — up to **20% absolute gain** on gpt-4-1106-preview, with up to **30% fewer interactions** (§2.3). The reasons: **composability** (nested calls, loops, conditionals in one action), **object handling** (output becomes a variable for the next action), **generality** (Python is Turing-complete), and **training-data fit** (LLMs already see lots of Python). The `transformers.agents` → `smolagents` transition was the move to align HF's reference library with this paper.

**2. Sandboxing is explicit, not optional.** The [Secure code execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution) page opens with: *"By default, the CodeAgent runs LLM-generated code in your environment. This is inherently risky."* The mitigation is a **remote sandbox** — `DockerExecutor` (recommended Dockerfile: `USER nobody`, `cap_drop=ALL`, `mem_limit=512m`, `no-new-privileges`), `E2BExecutor`, `ModalExecutor`, `BlaxelExecutor`. The default `LocalPythonExecutor` is a custom AST-walking interpreter that blocks unauthorized imports and limits operations — a first filter, not a security boundary.

**3. It's an HF library, not a community fork.** Owner is the `huggingface` org; most releases are signed by HF staff. Distribution is native HF Hub: `push_to_hub()` publishes a tool as a Space, `Tool.from_space()` consumes one, `InferenceClientModel` calls the HF Inference API. For teams already on HF Hub, this is the lowest-friction option in the Python agent landscape.

**4. The entry barrier is intentionally low.** Core logic fits in ~1,000 lines ([`agents.py`](https://github.com/huggingface/smolagents/blob/main/src/smolagents/agents.py)). The ReAct loop, planning, memory, and logging are all readable. Heavier libraries (LangGraph, crewAI) offer production multi-agent, persistence, and tracing — smolagents offers a *readable* Code Agent.

**5. Adoption is strong, read honestly.** 27.8k stars is high for a six-month-old library, but `crewAI` is at 53.5k, `langchain` above 100k, `autogen` around 50k. Smolagents competes on **positioning** (Code Agents + simplicity), not absolute volume. 595 open issues signal an active user base and a real backlog.

## Practical implications

- **Sandbox first.** Use `DockerExecutor` with resource limits, or an E2B/Modal/Blaxel account. `LocalPythonExecutor` is for prototypes only.
- **Read the code.** [`agents.py`](https://github.com/huggingface/smolagents/blob/main/src/smolagents/agents.py) is short enough to read in one sitting.
- **Compare before committing.** For multi-agent production with tracing and flow control, LangGraph or crewAI offer more at the cost of a steeper curve. For simple Code Agents with good MCP support, smolagents is the natural choice.
- **Watch the CHANGELOG.** Releases ship every 12-15 days. The default `InferenceClientModel` already changed once (v1.23.0 → Qwen3-Next-80B-A3B-Thinking).

## Risks and caveats

1. **"Code Agents" ≠ "secure by default."** `LocalPythonExecutor` runs model code in your environment; the docs say so explicitly.
2. **CodeAct numbers are research-grade.** The 20%/30% figures are on M3ToolEval (82 tasks) and gpt-4-1106-preview. Open-source models score far lower (CodeActAgent-Mistral at 12.2% vs gpt-4-1106-preview at 74.4% on the same benchmark).
3. **Not the only Code Agent implementation.** TaskWeaver is concurrent work; autogen and langgraph also support code execution.
4. **Supply-chain risk via `Tool.from_space`.** Third-party HF Space code runs in your agent. Verify the author and revisions.
5. **595 open issues is a real backlog.** Active maintenance, not abandoned.
6. **Stars are a snapshot.** 27,843 on 2026-06-14, not a permanent number.

## What to watch

- Security of remote executors per release; v1.25.0 already removed `allow_origin` and added token auth.
- `LocalPythonExecutor` mitigations per release.
- MCP integration (`ToolCollection.from_mcp`, `anyOf` parsing).
- Default `InferenceClientModel` changes — silently affects production recipes.
- `huggingface-hub >= 1` compatibility in v1.25+.
- [Security Advisories](https://github.com/huggingface/smolagents/security) for LLM-generated code parsing CVEs.

## Verdict

`huggingface/smolagents` is a well-maintained, Apache 2.0, HF-native Python agent library that puts **executable code** at the center of agent actions. The bet — higher execution risk in exchange for expressiveness and training-data fit — is supported by the CodeAct paper on a synthetic benchmark, not by exhaustive comparison. For an AI engineer in 2026: read the docs, install it, and try it. **Configure remote sandboxing from the first commit.** For multi-agent production with tracing and flow control, prefer LangGraph or crewAI. For a simple, readable, Code-First agent that integrates with the HF ecosystem, smolagents is the natural pick.

## Sources

- 1. [huggingface/smolagents (GitHub repository, 2026-06-14)](https://github.com/huggingface/smolagents) — primary.
- 2. [smolagents REST API metadata](https://api.github.com/repos/huggingface/smolagents) — primary.
- 3. [smolagents releases endpoint](https://api.github.com/repos/huggingface/smolagents/releases?per_page=10) — primary.
- 4. [smolagents v1.26.0 release page (2026-05-29)](https://github.com/huggingface/smolagents/releases/tag/v1.26.0) — primary.
- 5. [smolagents official documentation](https://huggingface.co/docs/smolagents/index) — primary.
- 6. [smolagents — Secure code execution tutorial](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution) — primary.
- 7. [smolagents — What are agents?](https://huggingface.co/docs/smolagents/en/conceptual_guides/intro_agents) — primary.
- 8. [Introducing smolagents — HF blog (2024-12-31)](https://huggingface.co/blog/smolagents) — secondary.
- 9. [Executable Code Actions Elicit Better LLM Agents — Wang et al., 2024 (arXiv:2402.01030)](https://huggingface.co/papers/2402.01030) — secondary.
