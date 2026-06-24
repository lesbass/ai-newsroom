---
title: "Instructor: Pydantic Structured Outputs for LLMs"
description: "MIT Python library (567-labs) for extracting validated JSON from any LLM via Pydantic models. 13.2k stars, 1.1k forks, v1.15.1 with Bedrock SSRF fix, support for OpenAI, Anthropic, Gemini, Cohere, Ollama, Bedrock, and 15+ other providers. v1.15.2 (May 10, 2026) adds sensitive log redaction."
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

On June 14, 2026, the public repository **[`567-labs/instructor`](https://github.com/567-labs/instructor)** — maintained by the [567-labs](https://github.com/567-labs) organization under the **MIT** license ([LICENSE, copyright 2023 Jason Liu](https://github.com/567-labs/instructor/blob/main/LICENSE)) — counts **13.2k stars, 1.1k forks, 108 releases, 1,560 commits** and presents itself as "structured outputs for llms" ([README, June 14, 2026](https://github.com/567-labs/instructor)). The stable version on PyPI is **1.15.1**, released on **April 3, 2026**, followed by **1.15.2 on May 10, 2026** which added redaction of sensitive fields (including `Authorization` and `x-api-key`) in debug logs ([CHANGELOG, May 10, 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md); [PyPI, June 14, 2026](https://pypi.org/project/instructor/)).

## What happened

`Instructor` is a Python library that does one thing: **extracts structured, validated data from any LLM** using [Pydantic v2](https://docs.pydantic.dev/latest/) models as the output schema. The modern version exposes a single factory `instructor.from_provider("provider/model")` that returns a client compatible with the provider's chat API, but with the `response_model=BaseModel` parameter replacing the manual `tools=[...]` approach. Example from the [README, June 14, 2026](https://github.com/567-labs/instructor):

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

The library declares in the README adoption of "**3M+ monthly downloads**" and "**over 100,000 developers and companies**", with "**1,000+ community contributors**" ([README, June 14, 2026](https://github.com/567-labs/instructor)). The [official documentation](https://python.useinstructor.com/) uses comparable numbers: "over 3 million monthly downloads, 11k stars, 100+ contributors" — the GitHub stars discrepancy (11k vs 13.2k) is explained by fetch date: the docs are likely updated a couple of releases ago, while the repo has grown since. The "100k developers" and "3M+ downloads" numbers aren't independently verifiable from the repository itself and should be cited only as **maintainer claims**.

Repository numbers from the [GitHub homepage on June 14, 2026](https://github.com/567-labs/instructor): **13.2k stars, 1.1k forks, 54 watchers, 14 open issues, 36 open pull requests, 0 published security advisories, 108 releases, 1,560 total commits**. Language is Python at 99.9% (the residual 0.1% is shell, from [repo languages, June 14, 2026](https://github.com/567-labs/instructor)). The `LICENSE` file in the repo is standard MIT text, copyright Jason Liu, year 2023. The [Security Advisories](https://github.com/567-labs/instructor/security/advisories) page shows empty ("There aren't any published security advisories") as of June 14, 2026, but `CHANGELOG.md` explicitly documents security fixes released as "Security" entries in releases, not as GitHub advisories ([CHANGELOG, June 14, 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)) — a process inconsistency flagged in "Risks and caveats."

**Supported providers**, according to the [official documentation](https://python.useinstructor.com/) and [CHANGELOG](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md), are at least 15: **OpenAI, Anthropic, Google Gemini, Google Vertex AI, Mistral, Cohere, Ollama, llama-cpp-python, Groq, xAI, AWS Bedrock, Cerebras, Fireworks, Perplexity, Writer, DeepSeek, LiteLLM**. The [PyPI `Provides-Extra` list](https://pypi.org/project/instructor/) confirms at least 22 optional extras, one per provider or provider group (`anthropic`, `bedrock`, `cerebras-cloud-sdk`, `cohere`, `google-genai`, `groq`, `litellm`, `mistral`, `perplexity`, `vertexai`, `writer`, `xai`, etc.). Python required: `>=3.9, <4.0` ([PyPI metadata, June 14, 2026](https://pypi.org/project/instructor/)).

The **recent release roadmap** ([CHANGELOG, June 14, 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)) is dense and documents high maintenance activity: **v1.15.2 (May 10, 2026)** added sensitive log redaction via [PR #2297](https://github.com/567-labs/instructor/pull/2297); **v1.15.1 (April 3, 2026)** blocked remote URL fetching in `_openai_image_part_to_bedrock` and `PDF.to_bedrock` (only `data:` URLs or `s3://` accepted, mitigating SSRF and local file disclosure); **v1.15.0 (April 2, 2026)** pinned `litellm ≤ 1.82.6` to avoid compromised versions 1.82.7 and 1.82.8, and made `diskcache` an optional dependency (mitigating CVE-2025-69872 on the transitive chain). Further back, **v1.14.0 (January 4, 2026)** documented Bedrock PDF support, and **v1.13.0 (November 3, 2025)** restored the `py.typed` file (PEP 561) for type checking. An **`[Unreleased]` section** at the top of the changelog announces cleanup for V2 Gemini, Cohere templating, `ty 0.0.44` type checker, and coverage of *supported Python versions and platforms*.

## Why it matters

**1. The main pain point for Python developers integrating LLMs in production is exactly what `Instructor` solves.** The native provider API requires: manually writing the JSON schema for `tools=`, parsing `response.choices[0].message.tool_calls[0].function.arguments`, handling `json.JSONDecodeError`, re-handling validation errors, and retrying. The README documents this side-by-side, with 25 lines of code "without Instructor" and 5 lines "with Instructor" ([README, June 14, 2026](https://github.com/567-labs/instructor)). For a team that needs to reliably extract structured data — classification, entity extraction, scoring, agent output, mapping to internal APIs — the `response_model=BaseModel` abstraction is a real productivity multiplier, not a vanity.

**2. Pydantic v2 as output schema is a type-induced advantage that propagates everywhere.** Defining `class User(BaseModel)` means having **static type checking, IDE autocompletion, custom validators (`@field_validator`), LLM-dependent validators (`llm_validator`), nested models, default values, and serialization** ready to use. [Pydantic v2](https://docs.pydantic.dev/latest/) documentation is mature and the "`BaseModel` as contract" pattern is already established in the FastAPI, SQLModel, LangChain, and most modern Python tools ecosystem. For those coming from that world, `Instructor` is a drop-in API surface, not a new framework to learn.

**3. Provider coverage is broad and kept current.** The CHANGELOG documents active support for **Claude 4 (Opus, Sonnet, Haiku), OpenAI GPT-4.1 and o3/o4 reasoning, xAI Grok 3, DeepSeek R1/V3** added in v1.15.0 ([CHANGELOG, June 14, 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)). The "mode" management — mapping from Pydantic `response_model` to the provider's native mechanism (`tools` on OpenAI, `tool_use` on Anthropic, `response_schema` on Gemini, function-calling on Bedrock) — is the real value: anyone switching providers doesn't need to rewrite the integration. `from_provider("openai/gpt-4o-mini")` and `from_provider("anthropic/claude-3-5-sonnet")` expose the identical API to calling code, as shown in the [README, June 14, 2026](https://github.com/567-labs/instructor).

**4. All "production-ready" patterns are present and documented.** The README and documentation list: **automatic retries on validation failure** (`max_retries=3` with re-ask that includes the validation error in the next prompt), **partial object streaming** (`Partial[User]` emitting `User(name=None, age=None)` → `User(name="John", age=25)` as tokens arrive), **LLM-assisted validators** (`llm_validator("don't say objectionable things")` calling a second LLM to validate a field), **Jinja templates** inside messages, **logging hooks** (`client.on("completion:error", ...)`), **async/await support** with `async_client=True`, and **raw completion access** with `create_with_completion()` when inspecting `usage` or other metadata. These aren't "roadmap features" — they're all in `main` and demonstrable.

**5. An alternative API (`PydanticAI`) exists for cases beyond extraction.** The README and docs homepage explicitly warn: "Use Instructor for fast extraction, reach for PydanticAI when you need agents" ([README, June 14, 2026](https://github.com/567-labs/instructor); [docs homepage, June 14, 2026](https://python.useinstructor.com/)). The distinction is useful: `Instructor` remains the right tool when the use case is **"give me a validated Pydantic object from text or an LLM response"**. When agent loops, observability, dataset replay, or complex tool use are needed, the maintainer's advice is to move to `PydanticAI` (also from the Pydantic team). They're not competing — they compose, and the same Pydantic models work in both.

**6. Maintenance activity is high and security is taken seriously.** Three releases (1.15.0, 1.15.1, 1.15.2) in six weeks (April 2 – May 10, 2026) with explicit "Security" entries in each: pinning `litellm` to exclude compromised versions, removing `diskcache` from the dependency tree, log redaction, SSRF blocking on Bedrock. The GitHub [Security Advisories](https://github.com/567-labs/instructor/security/advisories) page as of June 14, 2026 **doesn't** contain published advisories, but mitigations arrive via releases — a process inconsistency discussed in "Risks and caveats."

## What to watch

- **Release of `Instructor 2.0`.** The `[Unreleased]` section at the top of the [CHANGELOG](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md) hints at "V2 cleanup" and strengthened public type checking. A major release will change the API surface and require migration notes; monitor `Releases` and `CHANGELOG.md` on `main`.
- **Status of GitHub security advisories.** As of June 14, 2026, the [Security Advisories page](https://github.com/567-labs/instructor/security/advisories) is empty. Security fixes arrive in release notes but **not** as formal advisories. If the maintainer starts publishing GHSA (GitHub Security Advisories), it's a transparency upgrade useful for automatic vulnerability scanning.
- **Dependency on `litellm` and other transitive dependencies.** v1.15.0 pinned `litellm ≤ 1.82.6` to mitigate compromised versions 1.82.7/1.82.8. The PyPI `Provides-Extra: litellm` indicates the dependency is optional; those using it explicitly should monitor pins. Same for `diskcache` (CVE-2025-69872), now optional, and the `anthropic` client (v0.76.0 → v0.88.0 between v1.15.0 and v1.15.1).
- **Adoption of `Mode.JSON_SCHEMA` on OpenAI.** v1.15.0 enabled `Mode.JSON_SCHEMA` for the OpenAI provider (previously blocked by the mode validation check). If OpenAI continues investing in `response_format: json_schema` as an alternative to function calling, `Instructor` will likely shift the default for new models.
- **Coverage of models released in 2026.** v1.15.0 added Claude 4, GPT-4.1, o3/o4, Grok 3, DeepSeek R1/V3 to the `KnownModelName` type. If frontier models change how structured output is invoked (richer tool-use, native structured output APIs), `Instructor` will follow — the release rhythm suggests it.
- **Conference / blog post by maintainer Jason Liu.** `Instructor` has a [Discord channel](https://discord.gg/), a [blog section in the docs](https://python.useinstructor.com/blog/), and public appearances by the maintainer. A production case study post (multi-tenant extraction, eval pipeline) would be a signal of solid enterprise adoption.
- **Possible release of `PydanticAI` as a separate product (vs `Instructor` as an extension).** The "Instructor for extraction, PydanticAI for agents" separation is declared in the README. If PydanticAI gains traction as a standalone framework, `Instructor` could be refactored to be the "data layer" of PydanticAI, or remain an independent project. Monitor the boundary evolution.

## Risks and caveats

**1. Mode-dependence across providers.** `response_model=` behavior depends on the *mode* the `Instructor` client selects for that provider: `TOOLS` (native function calling), `JSON` (JSON mode), `MD_JSON` (markdown + JSON), `JSON_SCHEMA` (OpenAI structured output), `ANTHROPIC_TOOLS`, `ANTHROPIC_REASONING_TOOLS`, `ANTHROPIC_PARALLEL_TOOLS`, `GEMINI_TOOLS`, `GENAI_STRUCTURED_OUTPUTS`, `OPENROUTER_STRUCTURED_OUTPUTS`, `RESPONSES_TOOLS` ([CHANGELOG v1.15.0, June 14, 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)). **Reliability varies by provider and mode**: it's not guaranteed that `Mode.TOOLS` on Anthropic and `Mode.JSON_SCHEMA` on OpenAI produce the same success rate for a complex schema. Phrases like "Instructor works with all providers" should be read as "Instructor offers a uniform API, not that output is equally reliable across all providers."

**2. Token budget risk.** When the client is configured in `TOOLS` mode, the Pydantic schema is serialized as `tools=[{type: function, function: {name, parameters: {...}}}]` in the request payload. For models with small context windows or deeply nested schemas, **the schema can consume a significant fraction of the token budget** before the user message even arrives. The documentation doesn't provide a single "how heavy is my schema" metric — it must be measured per use case.

**3. Pydantic validation and fallback handling.** When validation fails, `Instructor` re-sends the prompt with the validation error attached, up to `max_retries` (documented default in README: 3). If the schema is semantically too strict for the model's natural responses, you enter a retry loop that burns tokens without producing valid output. The recommended fallback pattern is: (a) reduce constraint strictness, (b) increase `max_retries`, (c) use `Optional[T]` or `Union[A, B]` for ambiguous fields, (d) accept a free `raw: str` fallback field. No automatic "dead letter" is documented.

**4. The GitHub Security Advisories page is empty, but releases document security fixes.** A vulnerability scanning tool search (e.g., `ghsa-list`, `osv-scanner`, Snyk) might **not** find formal advisories for known CVEs on `diskcache` (CVE-2025-69872) or `litellm` 1.82.7/1.82.8 when an app uses `Instructor` as a dependency, because mitigations arrive only via release notes. It's a **documentation process discrepancy**, not a code bug, but it has practical impact on automatic security gating in CI. Advice: pin `instructor>=1.15.0` if using `litellm` or `diskcache` as dependencies.

**5. The README cites adoption numbers that aren't verifiable.** "Trusted by over 100,000 developers and companies," "3M+ monthly downloads," "10K+ GitHub stars" ([README, June 14, 2026](https://github.com/567-labs/instructor)): current 13.2k stars are verifiable; 3M+ monthly downloads are a **maintainer statement**, probably based on [pypistats.org](https://pypistats.org/packages/instructor) but not reported with a link. The article cites them only as claims, not verified facts.

**6. Repository creation date.** The editorial brief indicated "created Jun 14, 2023" but the [LICENSE](https://github.com/567-labs/instructor/blob/main/LICENSE) only shows "Copyright (c) 2023 Jason Liu" (no day/month) and PyPI releases start from `0.2.5` on September 6, 2023. **The exact repository creation date isn't verifiable from the GitHub front-end alone without a dedicated API call**; this article indicates "2023" and points to `LICENSE` as the load-bearing source. The specific "Jun 14, 2023" date from the brief should be treated as pending verification.

**7. `instructor.pydantic.dev` doesn't resolve as of June 14, 2026.** The editorial brief indicated `https://instructor.pydantic.dev/` as documentation; that domain **doesn't resolve** as of June 14, 2026 (transport error). The documentation actually served is at `https://python.useinstructor.com/`, linked from the README and repo topics. The article uses the latter as the primary source.

## What to do

**For Python developers integrating LLMs in production today:**

- **Install and try on a simple case.** `pip install instructor`, then `client = instructor.from_provider("openai/gpt-4o-mini")` with `OPENAI_API_KEY` in env, define a 3-4 field `BaseModel`, call `client.chat.completions.create(response_model=..., messages=[...])`. Verify the returned object is a Pydantic instance, not a dict. Time: 10 minutes. Cost: only provider credentials.
- **Measure your schema's token weight.** Before putting `Instructor` in production, serialize your `response_model` as `model.model_json_schema()` and count tokens. If it exceeds 10-15% of the chosen model's context window, consider (a) models with larger context, (b) splitting the schema into multiple calls with sub-models, (c) `Mode.JSON` instead of `Mode.TOOLS` (reduces overhead on OpenAI). Not a documented metric — measure per use case.
- **Set `max_retries` explicitly.** Documented default is 3, but if your schema is complex or the model is small, it may be too low (retry loops burning tokens) or too high (excessive cost on ambiguous schemas). Start with 3, measure success rate, adjust based on data. Always log validation errors to understand whether the problem is the model or the schema.
- **Use `from_provider(...)` instead of legacy wrappers (`from_openai`, `from_anthropic`).** The modern API is unified. The `from_openai`/`from_anthropic`/etc. factories still exist (standardized in v1.14.0) but are deprecated in favor of `from_provider("provider/model")` ([CHANGELOG v1.14.0, June 14, 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)).

**For teams doing LLM quality evaluation:**

- **Leverage LLM-assisted validators (`llm_validator`) for "soft" fields.** If a field is hard to validate with deterministic rules (e.g., "the response is professional and courteous"), `llm_validator("description", client=client)` calls a second LLM for validation. Documented in the [docs, June 14, 2026](https://python.useinstructor.com/). Cost: one extra LLM call for validation; use sparingly.
- **Streaming with `Partial[T]`.** For UIs where you want to show output populating progressively (typing effect, form auto-fill), `Partial[User]` + `stream=True` emits partial instances. It's the foundation for building reactive UX without manually managing the streaming protocol. Documented in the [README, June 14, 2026](https://github.com/567-labs/instructor).

**For those evaluating `Instructor` versus `PydanticAI` or alternatives:**

- **Practical rule from the maintainer himself:** `Instructor` for fast extraction, `PydanticAI` when agent loops, observability, dataset replay, eval are needed ([README, June 14, 2026](https://github.com/567-labs/instructor)). If the use case is "extract structured data from text or LLM output," `Instructor` is simpler and lighter. If a runtime agent with tools, tracing, and run sharing is needed, `PydanticAI` is the product designed for that.
- **Compared to `LangChain`/`LlamaIndex`:** `Instructor` does one thing (structured extraction), is lighter (~1,500 lines of `instructor/` vs ~50,000 of `langchain/`), and is easier to debug. It's not a general-purpose framework — it's a surgical tool. If your project is already on `LangChain` and you only need extraction, evaluate whether the extra dependency is worth it or whether `langchain_core` already has what you need (usually no, because `Instructor`'s retry loop on validation error isn't in `langchain_core`).

## Verdict

**`Instructor` is a mature, well-maintained MIT Python library with 13.2k stars and a track record of frequent releases (108 releases, 1,560 commits), solving a real, recurring problem for anyone integrating LLMs in production: extracting structured, validated data without reinventing the schema → tool call → parse → validation → retry cycle every time.** The `from_provider("provider/model")` + `response_model=BaseModel` API is a productivity multiplier, and Pydantic v2 integration brings type safety, custom validators, and compatibility with the rest of the Python ecosystem (FastAPI, SQLModel, etc.). Provider coverage (OpenAI, Anthropic, Gemini, Cohere, Mistral, Ollama, DeepSeek, Groq, xAI, Bedrock, Vertex AI, and more) is broad and current, and mode dependencies are documented in the CHANGELOG. The maintainer's honest advice — "use `Instructor` for extraction, `PydanticAI` for agents" — is a maturity signal, not a concession.

**The caveats matter.** Formal GitHub security advisories are missing, release notes serve as advisories, and mode dependencies can produce different results across providers. Schema weight in the token budget must be measured, and the retry-with-fallback pattern isn't a robustness guarantee — it's a default that needs tuning. Documentation at `instructor.pydantic.dev` doesn't resolve as of June 14, 2026; the actual docs are at `python.useinstructor.com`. If your use case is exactly "extract validated Pydantic objects from LLMs with automatic retries, multi-provider, in Python," `Instructor` is the right choice as of June 14, 2026; if you need agent loops, observability, or eval pipelines, start with `PydanticAI` or `LangGraph`.

---

**File:** `src/content/articles/instructor-structured-outputs-llms-2026.md`
**Linked article task:** AIN-74 — `article-task-ain-74.md` (this article implements the AIN-74 commission)
**Linked radar brief:** AIN-72 — `repo-radar-AIN-72-2026-06-14.md` (candidate: `567-labs/instructor`, accepted)
**Cross-link:** no overlap with published articles (AIN-34 DeepMind Sierra Leone, AIN-66 didilili ai-agents-from-zero, AIN-55 Fable 5, AIN-60/61/62 Anthropic). New beat: Pydantic + structured outputs.
