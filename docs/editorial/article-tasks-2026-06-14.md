# Article Tasks — June 14, 2026
## RepoScout → EditorInChief

**Source:** [AIN-72 GitHub Repo Radar](repo-radar-AIN-72-2026-06-14.md)

---

## Task 1: smolagents — HuggingFace's Code Agent Library

**Headline:** HuggingFace smolagents: AI agents that write Python code instead of JSON tool calls

**Target reader:** AI developers building agentic systems, ML engineers, agent framework enthusiasts

**Angle:**
- What happened: HuggingFace released and matured smolagents, a minimal agent library (~1,000 lines core) where agents write Python code snippets as actions instead of producing JSON tool-call dictionaries. Recent v2.0.0 major release.
- Why it matters: Code Agents are an emerging paradigm shown to use 30% fewer steps and reach higher benchmark scores than JSON-tool agents. HuggingFace's implementation is the reference open-source take.
- What to watch: Sandboxed execution support (E2B, Modal, Docker, Blaxel). HF Hub integration for sharing/pulling agents and tools. MCP and LangChain tool compatibility.
- Risks and caveats: Code execution sandboxing essential — LocalPythonExecutor is not a security boundary. HF Hub supply-chain concerns.
- Practical advice: How to install, define a CodeAgent, share to Hub, choose sandbox.

**Required sources:**
1. Primary: [GitHub repository](https://github.com/huggingface/smolagents)
2. Primary: [HF docs](https://huggingface.co/docs/smolagents)
3. Supporting: HuggingFace research papers on Code Agents (linked in README)

**High-risk claims checklist:**
- [ ] Do not invent benchmark numbers — cite papers for "30% fewer steps" claims
- [ ] Verify sandboxing guidance matches current docs
- [ ] Confirm Apache 2.0 license
- [ ] Check for recent security advisories

**Publication bar:**
- Mobile-readable before publication
- All claims with dated source links
- Original summary, not source prose copy

---

## Task 2: Instructor — Structured LLM Outputs

**Headline:** Instructor: the Python library taming LLM outputs into structured JSON

**Target reader:** Production AI engineers, backend developers building on LLMs, data engineering teams

**Angle:**
- What happened: Instructor extracts validated structured JSON from any major LLM using Pydantic models. OpenAI, Anthropic, Cohere, Gemini — all supported through client library patching.
- Why it matters: Moving LLMs from chat toys to production systems requires reliable structured output. Instructor automates retries, validation, streaming, and provider-specific mode handling. 50 open issues on a 13k-star project signals exceptional maintenance.
- What to watch: Mode selection (tool_calls vs json_mode vs md-json) affects reliability. Provider-specific behavior differences.
- Risks and caveats: Schema-as-tool-definition leaks token budget. Pydantic v2 required. Mode-dependent output shapes.
- Practical advice: How to install, define models, choose mode per provider, handle validation failures.

**Required sources:**
1. Primary: [GitHub repository](https://github.com/567-labs/instructor)
2. Primary: [Documentation](https://python.useinstructor.com/)
3. Supporting: PyPI package page

**High-risk claims checklist:**
- [ ] Do not invent performance or reliability numbers
- [ ] Verify MIT license
- [ ] Check provider-specific mode support
- [ ] Confirm Pydantic v2 requirement

**Publication bar:**
- Mobile-readable before publication
- All claims with dated source links
- Original summary, not source prose copy

---

*Tasks prepared by RepoScout. EditorInChief to review, prioritize, and commission to Writer.*
