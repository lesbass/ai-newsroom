---
title: "Instructor: Pydantic structured outputs for any LLM"
description: "MIT Python library (567-labs) for extracting validated Pydantic objects from any LLM. 13.2k stars, 108 releases, 15+ providers. v1.15.2 adds log redaction."
pubDate: 2026-06-14
author: "AI Newsroom"
tags: ["open-source", "python", "pydantic", "structured-outputs", "llm", "instructor", "567-labs", "jason-liu", "openai", "anthropic", "repository-feature"]
image: "https://opengraph.githubassets.com/1/567-labs/instructor"
imageAlt: "Instructor open-source repository social preview card"
imageCredit: "Image: GitHub / 567-labs/instructor repository (MIT)"
sources:
  - title: "567-labs/instructor — GitHub repository (homepage)"
    url: "https://github.com/567-labs/instructor"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — LICENSE (MIT, copyright 2023 Jason Liu)"
    url: "https://github.com/567-labs/instructor/blob/main/LICENSE"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — Releases (v1.15.1, v1.15.2, full changelog)"
    url: "https://github.com/567-labs/instructor/releases"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — CHANGELOG.md (integrated security advisory, dating 1.15.0-1.15.2)"
    url: "https://github.com/567-labs/instructor/blob/main/CHANGELOG.md"
    date: 2026-06-14
    type: primary
  - title: "instructor on PyPI — version, dependencies, authors, extras"
    url: "https://pypi.org/project/instructor/"
    date: 2026-06-14
    type: primary
  - title: "Instructor — official documentation (python.useinstructor.com)"
    url: "https://python.useinstructor.com/"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — Security Advisories (GitHub, repo page)"
    url: "https://github.com/567-labs/instructor/security/advisories"
    date: 2026-06-14
    type: primary
  - title: "Pydantic v2 — official documentation (BaseModel, Field, validator models)"
    url: "https://docs.pydantic.dev/latest/"
    date: 2026-06-14
    type: secondary
highRiskClaims: false
---

On **2026-06-14**, the public repository **[`567-labs/instructor`](https://github.com/567-labs/instructor)** — maintained by the [567-labs](https://github.com/567-labs) organization under the **MIT** license ([LICENSE, copyright 2023 Jason Liu](https://github.com/567-labs/instructor/blob/main/LICENSE)) — counts **13.2k stars, 1.1k forks, 108 releases, 1,560 commits** and presents itself as "structured outputs for llms" ([README, 2026-06-14](https://github.com/567-labs/instructor)). The stable version on PyPI is **1.15.1** (released 2026-04-03), followed by **1.15.2 on 2026-05-10** which added redaction of sensitive fields (including `Authorization` and `x-api-key`) in debug logs ([CHANGELOG, 2026-05-10](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md); [PyPI, 2026-06-14](https://pypi.org/project/instructor/)).

## What it does

`Instructor` extracts **structured, validated data from any LLM** using [Pydantic v2](https://docs.pydantic.dev/latest/) models as the output schema. The modern API is a single factory: `instructor.from_provider("provider/model")` returns a client compatible with the provider's chat API, with the `response_model=BaseModel` parameter replacing the manual `tools=[...]` approach ([README, 2026-06-14](https://github.com/567-labs/instructor)):

```python
import instructor
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

client = instructor.from_provider("openai/gpt-4o-mini")
user = client.chat.completions.create(
    response_model=User,
    messages=[{"role": "user", "content": "John is 25 years old"}],
)
print(user)  # User(name='John', age=25)
```

## Repository numbers

From the [GitHub homepage, 2026-06-14](https://github.com/567-labs/instructor): **13.2k stars, 1.1k forks, 54 watchers, 14 open issues, 36 open pull requests, 0 published security advisories, 108 releases, 1,560 total commits**. Python 99.9%. The [Security Advisories](https://github.com/567-labs/instructor/security/advisories) page is empty as of 2026-06-14, but `CHANGELOG.md` documents security fixes in release notes — a process inconsistency discussed in "Risks."

## Supported providers

At least 15: **OpenAI, Anthropic, Google Gemini, Google Vertex AI, Mistral, Cohere, Ollama, llama-cpp-python, Groq, xAI, AWS Bedrock, Cerebras, Fireworks, Perplexity, Writer, DeepSeek, LiteLLM** ([docs](https://python.useinstructor.com/); [CHANGELOG](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)). [PyPI `Provides-Extra`](https://pypi.org/project/instructor/) confirms 22+ optional extras. Python `>=3.9, <4.0`.

## Recent release roadmap ([CHANGELOG, 2026-06-14](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md))

- **v1.15.2 (2026-05-10):** sensitive log redaction ([PR #2297](https://github.com/567-labs/instructor/pull/2297)).
- **v1.15.1 (2026-04-03):** blocked remote URL fetching in `_openai_image_part_to_bedrock` and `PDF.to_bedrock` (only `data:` or `s3://` accepted — SSRF and local file disclosure mitigation).
- **v1.15.0 (2026-04-02):** pinned `litellm ≤ 1.82.6` to avoid compromised 1.82.7/1.82.8; made `diskcache` optional (CVE-2025-69872).
- **v1.14.0 (2026-01-04):** Bedrock PDF support; **v1.13.0 (2025-11-03):** restored `py.typed` (PEP 561).

The `[Unreleased]` section announces V2 Gemini cleanup, Cohere templating, and a `ty 0.0.44` type checker pass.

## Why it matters

**1. The pain point is real.** Native provider APIs require writing the JSON schema for `tools=`, parsing `response.choices[0].message.tool_calls[0].function.arguments`, handling `json.JSONDecodeError`, re-handling validation errors, and retrying. The README shows **25 lines without Instructor vs 5 lines with Instructor** for the same extraction. For classification, entity extraction, scoring, or mapping LLM output to internal APIs, `response_model=BaseModel` is a real productivity multiplier.

**2. Pydantic v2 propagates everywhere.** `class User(BaseModel)` gives static type checking, IDE autocompletion, `@field_validator`, `llm_validator`, nested models, and serialization. The "BaseModel as contract" pattern is established in FastAPI, SQLModel, and LangChain — for those teams, `Instructor` is a drop-in surface.

**3. Provider coverage is broad and current.** v1.15.0 added Claude 4, GPT-4.1, o3/o4, Grok 3, DeepSeek R1/V3 to `KnownModelName`. Mode management maps Pydantic `response_model` to the provider's native mechanism. `from_provider("openai/gpt-4o-mini")` and `from_provider("anthropic/claude-3-5-sonnet")` expose the identical API.

**4. Production-ready patterns are present.** Automatic retries on validation failure (`max_retries=3`), partial object streaming (`Partial[User]`), LLM-assisted validators (`llm_validator`), Jinja templates, logging hooks, async/await, raw completion access via `create_with_completion()`. All in `main`.

**5. A sibling product exists for agents.** The README and docs say: *"Use Instructor for fast extraction, reach for PydanticAI when you need agents."* The same Pydantic models work in both.

## Practical implications

- **Install and try on a simple case.** `pip install instructor`, `client = instructor.from_provider("openai/gpt-4o-mini")`, define a 3-4 field `BaseModel`, call `client.chat.completions.create(response_model=..., messages=[...])`. Ten minutes.
- **Measure your schema's token weight.** `model.model_json_schema()` and count tokens. If it exceeds 10-15% of the chosen context window, consider a larger model, splitting the schema, or `Mode.JSON` instead of `Mode.TOOLS`.
- **Set `max_retries` explicitly.** Default is 3; complex schemas may need more (token burn) or less (ambiguous fields).
- **Use `from_provider(...)`, not legacy `from_openai` / `from_anthropic`.** The unified API is the modern path.
- **For "soft" fields:** `llm_validator("description", client=client)` calls a second LLM. Use sparingly.
- **For progressive UX:** `Partial[T]` + `stream=True` emits partial Pydantic instances as tokens arrive.

## Risks and caveats

1. **Mode-dependence across providers.** `response_model=` behavior depends on the *mode* selected per provider (`TOOLS`, `JSON`, `JSON_SCHEMA`, `ANTHROPIC_TOOLS`, `GEMINI_TOOLS`, etc.). Reliability varies: `Mode.TOOLS` on Anthropic and `Mode.JSON_SCHEMA` on OpenAI may not produce equal success rates for complex schemas. "Works with all providers" means "uniform API," not "uniform reliability."
2. **Token budget risk.** A deeply nested Pydantic schema serialized as `tools=[...]` can consume a significant fraction of the context window before the user message arrives.
3. **Retry loop risk.** If the schema is semantically too strict, retries burn tokens without producing output. Mitigations: relax constraints, raise `max_retries`, use `Optional[T]` or `Union[A, B]`, accept a free `raw: str` fallback. No automatic dead-letter is documented.
4. **GHSA page is empty, but releases document security fixes.** Scanners (e.g., `osv-scanner`, Snyk) may miss formal advisories for `diskcache` (CVE-2025-69872) or `litellm` 1.82.7/1.82.8 in apps using `Instructor`. Pin `instructor>=1.15.0` if you use `litellm` or `diskcache` as dependencies.
5. **README adoption numbers are maintainer claims.** "100k developers," "3M+ monthly downloads," "10k+ stars" are README statements, not independently verifiable. Current 13.2k stars are verifiable.
6. **`instructor.pydantic.dev` doesn't resolve** as of 2026-06-14. The active docs are at [`python.useinstructor.com`](https://python.useinstructor.com/).

## What to watch

- **`Instructor 2.0`.** The `[Unreleased]` section hints at V2 cleanup; monitor the [Releases page](https://github.com/567-labs/instructor/releases) and `CHANGELOG.md` on `main`.
- **Whether GitHub Security Advisories start being published** (a transparency upgrade useful for automated scanners).
- **Dependency pins** on `litellm`, `diskcache`, and `anthropic` per release.
- **Adoption of `Mode.JSON_SCHEMA` on OpenAI** as the default for new models.
- **PydanticAI vs Instructor boundary evolution** — the separation is declared, but the boundary may move.

## Verdict

**`Instructor` is a mature, MIT, well-maintained Python library with 13.2k stars, 108 releases, and a clear answer to a recurring problem: extracting validated Pydantic objects from LLMs without reinventing the schema → tool call → parse → validation → retry cycle.** The `from_provider` + `response_model` API is a productivity multiplier, Pydantic v2 brings type safety, and provider coverage is broad and current. The maintainer's honest "extraction vs agents" separation is a maturity signal.

The caveats matter: formal advisories are missing, mode behavior varies across providers, schema weight must be measured, and the retry loop isn't a robustness guarantee. The active docs are at `python.useinstructor.com`, not `instructor.pydantic.dev`. If your use case is exactly "extract validated Pydantic objects from LLMs with automatic retries, multi-provider, in Python," `Instructor` is the right choice as of 2026-06-14; for agent loops, observability, or eval pipelines, start with `PydanticAI` or `LangGraph`.

## Sources

- 1. [567-labs/instructor (GitHub repository, 2026-06-14)](https://github.com/567-labs/instructor) — primary.
- 2. [LICENSE (MIT, copyright 2023 Jason Liu)](https://github.com/567-labs/instructor/blob/main/LICENSE) — primary.
- 3. [Releases (v1.15.1, v1.15.2, full changelog)](https://github.com/567-labs/instructor/releases) — primary.
- 4. [CHANGELOG.md](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md) — primary.
- 5. [instructor on PyPI](https://pypi.org/project/instructor/) — primary.
- 6. [Instructor — official documentation (python.useinstructor.com)](https://python.useinstructor.com/) — primary.
- 7. [567-labs/instructor — Security Advisories](https://github.com/567-labs/instructor/security/advisories) — primary.
- 8. [Pydantic v2 — official documentation](https://docs.pydantic.dev/latest/) — secondary.
