---
title: "Google's Interactions API reaches GA as the new primary Gemini interface"
description: "Google promoted the Interactions API to general availability on 2026-06-22: stable schema, Managed Agents, background=True, and the 'From Roles to Steps' migration. Default in AI Studio."
pubDate: 2026-07-12
author: "AI Newsroom"
canonicalURL: "https://news.lesbass.com/articles/google-interactions-api-ga-primary-gemini-interface/"
tags:
  - google
  - google-deepmind
  - gemini
  - gemini-api
  - interactions-api
  - managed-agents
  - antigravity
  - background-execution
  - deep-research
  - flex-inference
  - role-to-steps
  - generatecontent
  - migration
  - ai-sdk
  - google-genai
  - mcp
  - litellm
  - agno
  - eigent
  - coding-agents
  - agent-skills
  - gemini-omni
highRiskClaims: false
image: "/images/articles/google-interactions-api-ga-primary-gemini-interface/hero-blog-desktop.png"
imageAlt: "Google blog post 'Interactions API: our primary interface for Gemini models and agents' on 2026-07-12, showing the bylines (Ali Çevik, Group PM, Google DeepMind; Philipp Schmid, Developer Relations Engineer, Google DeepMind), the Interactions_API_GA_final hero illustration, and the opening paragraph announcing general availability and a stable schema."
imageCredit: "Source: blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/ (Google's developer blog, post bylines: Ali Çevik and Philipp Schmid, Google DeepMind; datePublished 2026-06-22T17:15:00+00:00) · Captured 2026-07-12 via Playwright Chromium with @sparticuz/chromium (the ai-newsroom scripts/browser.mjs helper) · Google-hosted page used editorially as the primary source for the GA post · Desktop 1280×900, mobile 390×844 (rendered at 2× device pixel ratio)."
sources:
  - title: "Google — 'Interactions API: our primary interface for Gemini models and agents' (2026-06-22, bylines: Ali Çevik, Group PM, Google DeepMind; Philipp Schmid, Developer Relations Engineer, Google DeepMind; datePublished 2026-06-22T17:15:00+00:00, dateModified 2026-06-22T17:25:31+00:00)"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/"
    date: 2026-07-12
    type: primary
  - title: "Google — 'Expanding Managed Agents in Gemini API: background tasks, remote MCP and more' (2026-07-07, bylines: Philipp Schmid, Developer Relations Engineer, Google DeepMind; Mariano Cocirio, Product Manager, Google DeepMind)"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/"
    date: 2026-07-12
    type: primary
  - title: "Google — Interactions API documentation (interactions.create, agents.create, webhooks, server-side state, long-running and background tasks, Flex/Priority inference, 55-day retention on paid tier, bylines: Interactions API team)"
    url: "https://ai.google.dev/gemini-api/docs/interactions"
    date: 2026-07-12
    type: primary
  - title: "Google — Interactions API migration guide (generateContent → Interactions API; basic input/output, multi-turn, multimodal, structured output, before/after Python + JavaScript + REST, bylines: Interactions API team)"
    url: "https://ai.google.dev/gemini-api/docs/migrate-to-interactions"
    date: 2026-07-12
    type: primary
  - title: "Google — Antigravity default agent docs (background execution, MCP servers, function calling, custom agents, environments, network credential refresh, multimodal input; defaults to the antigravity-preview-05-2026 model)"
    url: "https://ai.google.dev/gemini-api/docs/antigravity-agent"
    date: 2026-07-12
    type: primary
  - title: "Google — Interactions API breaking changes (May 2026): 'From Roles to Steps' — outputs are now typed step entries with `type` values including `user_input`, `thought`, `function_call`, and `model_output`; replaces the old role-structured `contents` array"
    url: "https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026"
    date: 2026-07-12
    type: primary
  - title: "Google — Coding-agents Skills (gemini-api-dev, gemini-live-api-dev, gemini-interactions-api) installed via `npx skills add google-gemini/gemini-skills --skill gemini-interactions-api`"
    url: "https://ai.google.dev/gemini-api/docs/coding-agents"
    date: 2026-07-12
    type: primary
  - title: "Google — Flex inference docs (the 50% cost reduction tier, the Priority tier, and the cost-vs-latency trade-off for non-urgent workloads)"
    url: "https://ai.google.dev/gemini-api/docs/flex-inference"
    date: 2026-07-12
    type: primary
  - title: "Google — Interactions API reference and OpenAPI spec (paths: POST /v1beta/agents, POST /v1beta/interactions, GET /v1beta/interactions/{id}, POST /v1beta/interactions/{id}/cancel, POST /v1beta/webhooks; `agent`, `model`, `input`, `background`, `previous_interaction_id`, `stream`, `tools` are the request fields)"
    url: "https://ai.google.dev/api/interactions-api"
    date: 2026-07-12
    type: primary
  - title: "PyPI — google-genai 2.11.0 (released 2026-07-09; Apache-2.0; `client.interactions.create`, `client.interactions.get`, `client.aio.interactions.create`; `previous_interaction_id` for stateful conversations; `background=True` for the deep-research agent)"
    url: "https://pypi.org/project/google-genai/"
    date: 2026-07-12
    type: primary
  - title: "npm registry — @google/genai 2.11.0 (Apache-2.0; Node ≥20; latest npm metadata)"
    url: "https://www.npmjs.com/package/@google/genai"
    date: 2026-07-12
    type: primary
  - title: "LiteLLM — Interactions API integration doc (the partner integration named in the GA post: LiteLLM proxies `interactions.create` to the Gemini Interactions API for OpenAI-compatible callers)"
    url: "https://docs.litellm.ai/docs/interactions"
    date: 2026-07-12
    type: primary
  - title: "Eigent — 'Audit ML CI Failures with Gemini 3.5 Flash on Eigent' (2026-05-19, the partner use case named in the GA post; uses the Gemini Agent API + Gemini 3.5 Flash on the Megatron-LM repo, fetch logs in parallel, trace fix commits, output answer.json and answer.md)"
    url: "https://www.eigent.ai/use-cases/eigent-gemini-managed-agents"
    date: 2026-07-12
    type: primary
  - title: "Agno — Gemini Interactions provider doc (the third partner integration named in the GA post: `pip install agno`, model id `gemini-interactions`, native Google Interactions API surface)"
    url: "https://docs.agno.com/models/providers/native/google/gemini-interactions"
    date: 2026-07-12
    type: primary
  - title: "AIN-381 — NewsScout radar 2026-07-12 (the AI Newsroom discovery sweep that surfaced the Interactions API GA as the day's strongest primary-source candidate)"
    url: "https://news.lesbass.com/paperclip/AIN-381"
    date: 2026-07-12
    type: secondary
  - title: "AIN-382 — EditorInChief candidate brief (the commissioning decision that closed `done` on 2026-07-12 and created AIN-383 as the Writer child issue; full source table and the GA commissioning rule at _default/article-task-ain-383-google-interactions-api-ga.md)"
    url: "https://news.lesbass.com/paperclip/AIN-382"
    date: 2026-07-12
    type: secondary
---

On **2026-06-22**, Google published *"Interactions API: our primary interface for Gemini models and agents"* — the GA post for the Gemini Interactions API, with a stable schema, Managed Agents, background execution, and a *"From Roles to Steps"* schema migration ([Google blog, 2026-06-22](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/)). The legacy `generateContent` API is not going away, but every Google AI Studio surface, the Gemini API docs, and the Google AI docs now default to the Interactions API, and frontier agent features *"will increasingly land exclusively on the Interactions API."*

![Google blog post 'Interactions API: our primary interface for Gemini models and agents' on 2026-07-12, showing the bylines (Ali Çevik, Group PM, Google DeepMind; Philipp Schmid, Developer Relations Engineer, Google DeepMind) and the Interactions_API_GA_final hero illustration.]({{ '/images/articles/google-interactions-api-ga-primary-gemini-interface/hero-blog-desktop.png' | url }})

## What happened

The Interactions API was first launched in public beta in **December 2025**. On **2026-06-22** it reached general availability with a stable schema and four new capabilities: **Managed Agents** (with [Antigravity](https://ai.google.dev/gemini-api/docs/antigravity-agent) as the default), **background execution** (`background=True`), **Gemini Omni (soon)**, and a new **tool-combination** surface that mixes built-in tools ([Google Search](https://ai.google.dev/gemini-api/docs/google-search), [Google Maps](https://ai.google.dev/gemini-api/docs/maps-grounding)) with custom functions in one request ([GA post, 2026-06-22](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/)).

The Google team's wording on the legacy API: *"the legacy generateContent API remains fully supported and will continue to receive new mainline Gemini models for the foreseeable future,"* but *"frontier capabilities for long-running models and agents will increasingly land exclusively on the Interactions API."* The docs still ship a toggle to switch snippets back to the legacy format. The July 7 [Managed Agents expansion post](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/) adds background execution for async interactions, remote MCP server integration, custom function calling, and credential refresh.

## Why it matters

- **It's the default for every new project.** The GA post recommends the Interactions API *"for all new projects and applications."* The legacy `generateContent` path is preserved, but the development default has moved.
- **It's the surface for frontier agent features.** Long-running models, agents, and Gemini Omni all route through the Interactions API. Staying on `generateContent` means mainline model access without the agent surface.
- **It's one endpoint for both models and agents.** The same `interactions.create` call takes a `model` ID for inference or an `agent` ID for autonomous tasks. Set `background=True` for anything long-running.
- **It collapses tool orchestration into a typed step timeline.** The new schema replaces the old role-based `contents` array with typed step entries (`user_input`, `thought`, `function_call`, `model_output`) and lets tool results return images alongside text.

## What's new in the API

| Capability | What it does | Source |
|---|---|---|
| **Managed Agents** | One call provisions a remote Linux sandbox; agent can reason, execute code, browse the web, and manage files. [Antigravity](https://ai.google.dev/gemini-api/docs/antigravity-agent) is the default agent. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) |
| **Background execution** | `background=True` runs the interaction asynchronously; server returns an ID, client can poll, stream, or reconnect later. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/); [background-execution docs](https://ai.google.dev/gemini-api/docs/background-execution) |
| **Tool combination** | Mix built-in tools (Google Search, Google Maps) with custom functions in one request; tool results can return images alongside text. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/); [tool-combination docs](https://ai.google.dev/gemini-api/docs/tool-combination) |
| **From Roles to Steps** | Replaces the role-based `contents` array with typed step entries. The breaking change is documented per-feature. | [breaking-changes doc](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Flex / Priority tiers** | Flex offers 50% cost reduction vs the default tier; Priority is the latency-optimized tier. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/); [flex-inference docs](https://ai.google.dev/gemini-api/docs/flex-inference) |
| **55-day retention** | Past interactions retrievable for **55 days on the paid tier**. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) |
| **Field-level error messages** | Errors now pinpoint the exact field. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) |
| **Deep Research upgrades** | Speed vs depth agent variants, collaborative planning, native charts and infographics, multimodal grounding with images / PDFs / audio. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/); [deep-research docs](https://ai.google.dev/gemini-api/docs/deep-research) |
| **Media generation** | Image generation with Nano Banana 2 and Google Image Search grounding; Lyria 3 music; multi-speaker TTS speech. | [GA post](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/); [image-generation docs](https://ai.google.dev/gemini-api/docs/image-generation) |

## Managed Agents in one breath

One call to `interactions.create` with an `agent=` ID provisions a remote Linux sandbox where the agent can reason, execute code, browse the web, and manage files. The default agent is **Antigravity** ([`antigravity-preview-05-2026`](https://ai.google.dev/gemini-api/docs/antigravity-agent)). Custom agents can be defined via [`/v1beta/agents`](https://ai.google.dev/api/interactions-api) with a `display_name`, `system_instruction`, and a `tools` list. The Jul 7 [Managed Agents expansion](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/) adds background execution, remote MCP server integration, custom function calling, and credential refresh.

## A short code snippet

One Interactions API call, paraphrased from the [official docs](https://ai.google.dev/gemini-api/docs/interactions). Install the SDK first.

```bash
pip install google-genai
```

```python
from google import genai

client = genai.Client(api_key="GEMINI_API_KEY")

# Stateful conversation, server-side state via previous_interaction_id.
turn_1 = client.interactions.create(
    model="gemini-3.5-flash",
    input="Hi, my name is Amir.",
)
turn_2 = client.interactions.create(
    model="gemini-3.5-flash",
    input="What is my name?",
    previous_interaction_id=turn_1.id,
)
print(turn_2.outputs[-1].text)

# Long-running agent — run in the background, poll for status.
research = client.interactions.create(
    agent="deep-research-pro-preview-12-2025",
    input="Research the history of Google TPUs in 2025 and 2026.",
    background=True,
)
```

The same call shape is available in the JavaScript SDK via [`@google/genai` 2.11.0](https://www.npmjs.com/package/@google/genai) and in the [REST API reference](https://ai.google.dev/api/interactions-api).

## Migration entry points

- **Migration guide** ([`migrate-to-interactions`](https://ai.google.dev/gemini-api/docs/migrate-to-interactions)) — before/after Python + JavaScript + REST for every `generateContent` field.
- **Breaking changes doc** ([May 2026](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026)) — *"Core change: outputs to steps"*; the typed step values are `user_input`, `thought`, `function_call`, and `model_output`.
- **Legacy-format toggle** in the Gemini API docs — switch any snippet back to the `generateContent` shape.
- **Coding-agents Skill** ([`gemini-interactions-api`](https://ai.google.dev/gemini-api/docs/coding-agents)) — install with `npx skills add google-gemini/gemini-skills --skill gemini-interactions-api`.
- **Python SDK** — [`google-genai` 2.11.0 on PyPI](https://pypi.org/project/google-genai/), Apache-2.0, Python ≥ 3.10.
- **JavaScript SDK** — [`@google/genai` 2.11.0 on npm](https://www.npmjs.com/package/@google/genai), Apache-2.0, Node ≥ 20.
- **Partner integrations** — [LiteLLM](https://docs.litellm.ai/docs/interactions), [Eigent](https://www.eigent.ai/use-cases/eigent-gemini-managed-agents), [Agno](https://docs.agno.com/models/providers/native/google/gemini-interactions).

## Practical implications for builders

- **Start new projects on the Interactions API.** It is the documented default; mainline model coverage stays via `generateContent` for the foreseeable future.
- **Plan a migration window for legacy `generateContent` code.** The [migration guide](https://ai.google.dev/gemini-api/docs/migrate-to-interactions) maps every field. The breaking-change set is contained in [May 2026](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026).
- **Use `background=True` for any long-running agent.** The server returns an ID and the client can poll, stream, or reconnect.
- **Evaluate the Flex tier for cost.** Google publishes a 50% cost reduction for Flex on non-urgent workloads; benchmark against your prompt shape before committing production traffic.
- **Adopt the `gemini-interactions-api` Skill** if you are building on Claude Code, Cursor, or any harness that consumes `npx skills add` packages.

## Risks and caveats

- **Hosting model.** The Interactions API is a hosted Google service, not open-source. The first-party SDKs (`google-genai`, `@google/genai`) are the canonical client surfaces; third-party SDK coverage is limited to the three partners named in the GA post.
- **Flex pricing is relative.** The 50% cost reduction is a Google-published marketing claim; benchmark against your prompt shape before committing production traffic.
- **Retention window.** Past interactions are retained 55 days on the paid tier only. Confirm against the pricing page before treating it as a durable audit log.
- **Gemini Omni is "coming soon."** The GA post does not claim it is available.
- **Partner coverage is curated.** The GA post names three integration partners — do not generalize to "the major AI frameworks support it."
- **Migration is recommended, not mandatory.** The legacy `generateContent` API remains fully supported.

## What to watch

- **Gemini Omni rollout.** The GA post flags Gemini Omni as "soon" but does not commit to a date.
- **Partner coverage growth.** Whether the partner integration list grows beyond LiteLLM, Eigent, and Agno.
- **The `generateContent` deprecation timeline.** Whether Google publishes a deprecation date, or keeps `generateContent` as a parallel surface.
- **Skill adoption.** Whether Claude Code, Cursor, Codex, and Aider adopt the `gemini-interactions-api` Skill — the most concrete "agentic ecosystem" signal in the GA post.
- **Concrete Flex / Priority pricing.** Whether Google publishes per-million-token numbers for Flex and Priority, or only the relative 50% cost-reduction claim.

## Sources

1. [Google — "Interactions API: our primary interface for Gemini models and agents" (2026-06-22)](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/)
2. [Google — "Expanding Managed Agents in Gemini API: background tasks, remote MCP and more" (2026-07-07)](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/)
3. [Google — Interactions API documentation (2026-07-12)](https://ai.google.dev/gemini-api/docs/interactions)
4. [Google — Interactions API migration guide (2026-07-12)](https://ai.google.dev/gemini-api/docs/migrate-to-interactions)
5. [Google — Antigravity default agent docs (2026-07-12)](https://ai.google.dev/gemini-api/docs/antigravity-agent)
6. [Google — Interactions API breaking changes (May 2026): From Roles to Steps (2026-07-12)](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026)
7. [Google — Coding-agents Skills (gemini-interactions-api) (2026-07-12)](https://ai.google.dev/gemini-api/docs/coding-agents)
8. [Google — Flex inference docs (2026-07-12)](https://ai.google.dev/gemini-api/docs/flex-inference)
9. [Google — Interactions API reference and OpenAPI spec (2026-07-12)](https://ai.google.dev/api/interactions-api)
10. [PyPI — google-genai 2.11.0 (2026-07-09, Apache-2.0)](https://pypi.org/project/google-genai/)
11. [npm — @google/genai 2.11.0 (Apache-2.0)](https://www.npmjs.com/package/@google/genai)
12. [LiteLLM — Interactions API integration (2026-07-12)](https://docs.litellm.ai/docs/interactions)
13. [Eigent — Audit ML CI Failures with Gemini 3.5 Flash (2026-05-19)](https://www.eigent.ai/use-cases/eigent-gemini-managed-agents)
14. [Agno — Gemini Interactions provider (2026-07-12)](https://docs.agno.com/models/providers/native/google/gemini-interactions)
15. [AIN-381 — NewsScout radar 2026-07-12](https://news.lesbass.com/paperclip/AIN-381)
16. [AIN-382 — EditorInChief candidate brief (2026-07-12)](https://news.lesbass.com/paperclip/AIN-382)
