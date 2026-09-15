---
title: "OpenAI launches Agents API: managed Codex harness"
description: "OpenAI's Agents API brings the open-source Codex harness to a managed API, letting developers run cloud agents with pay-per-use pricing and sandbox partner options."
pubDate: 2026-09-12
author: "AI Newsroom"
tags:
  - openai
  - agents-api
  - codex
  - api
  - cloud-agents
  - sandbox
  - multi-agent
  - tool-search
  - compaction
  - mcp
  - pricing
  - ai-newsroom-coverage
image: "/images/articles/openai-agents-api-codex-harness/hero.png"
imageAlt: "Generated editorial diagram of the Agents API architecture showing the managed Codex harness connecting to sandbox providers (AI-generated, AI Newsroom)"
imageCredit: "Generated editorial image · Model/tool: PIL/Pillow script · Disclosure: AI-generated, not source evidence"
sources:
  - title: "OpenAI — Introducing the Agents API (2026-09-10)"
    url: "https://openai.com/index/introducing-the-agents-api/"
    date: 2026-09-10
    type: primary
  - title: "openai/codex GitHub repository"
    url: "https://github.com/openai/codex"
    date: 2026-09-12
    type: primary
  - title: "OpenAI API Pricing"
    url: "https://developers.openai.com/api/docs/pricing"
    date: 2026-09-12
    type: primary
  - title: "Agents API developer documentation"
    url: "https://developers.openai.com/api/docs/guides/agents-api/overview"
    date: 2026-09-12
    type: primary
highRiskClaims: false
---

OpenAI released the **Agents API** in public beta on **September 10, 2026**, making the same open-source Codex harness that powers its cloud agents available as a managed API. Developers can now build and run cloud agents with a single API call, paying only for tokens and tools used — no extra API fee.

## What was announced

- **Public beta, all developers.** The Agents API is available today to every developer with an OpenAI API account.
- **Managed Codex harness.** OpenAI operates the harness; developers choose the compute environment.
- **OpenAI hosted sandbox.** A new managed sandbox option for quick start and scaling.
- **Sandbox partners.** First-class integrations with Blaxel, Cloudflare, Daytona, DigitalOcean, E2B, Modal, Oracle, Runloop, and Vercel.
- **Key features.** Multi-agent support, tool search, programmatic tool calling, compaction, and MCP support.
- **Pricing.** No additional API fee — pay for tokens and tools your agents use.

## How it works

The Agents API wraps the Codex harness in a simple interface. A single API call creates a session, specifying the model, tools, and environment. The harness manages context, coordinates subagents, and handles long-running sessions.

```json
{
  "agent": {
    "model": "gpt-6-astra",
    "tools": [{ "type": "mcp", "server_label": "my_server", "transport": { "type": "http", "server_url": "https://example.com/mcp" } }],
    "multi_agent": { "enabled": true, "max_concurrent_subagents": 3 }
  },
  "environment": { "type": "openai_hosted" },
  "input": "Analyze the codebase and suggest improvements."
}
```

The harness automatically compacts context as sessions approach limits, preserving critical information. Tool search loads relevant tool definitions on demand, reducing token usage. Programmatic tool calling lets agents run parallel calls, chain operations, and filter results.

## Pricing breakdown

The Agents API itself is free — you pay for model tokens and tool usage:

- **Model tokens:** `gpt-6-astra` standard pricing at $10.00 input / $50.00 output per 1M tokens.
- **Container sessions:** 1 GB $0.03, 4 GB $0.12, 16 GB $0.48, 64 GB $1.92 per 20-minute session (5-minute minimum).
- **Web search:** $10.00 per 1k calls plus search-content tokens at model rates.
- **File search:** $0.10/GB-day storage (1 GB free), $2.50 per 1k tool calls.
- **Note:** Fast mode is unavailable for GPT-6 Astra with EU data residency.

## Sandbox options

Developers can choose between:

1. **OpenAI hosted sandbox** — fully managed, quick start, same infrastructure as Codex.
2. **Sandbox partners** — nine providers offering different CPU, GPU, memory, and deployment options.
3. **Self-hosted** — run on your own infrastructure.

Each partner offers different trade-offs in cold-start time, cost, and configuration.

## Open-source foundation

The harness is the open-source [openai/codex](https://github.com/openai/codex) repository (Apache-2.0, 123.5k stars, 19.0k forks, 10,668 commits). Developers can inspect the core logic that coordinates model calls, tools, and context. OpenAI maintains and updates the harness alongside model releases.

## What's different from the Agents SDK

The Agents API is a managed service; the older Agents SDK is self-hosted. The API handles infrastructure, scaling, and harness updates — developers focus on agent logic.

## Practical implications

- **Start with the hosted sandbox** to prototype without infrastructure setup.
- **Compare sandbox partners** on cold-start, cost, and configuration before committing.
- **Monitor token usage** — the pay-per-use model can get expensive with long sessions.
- **Evaluate multi-agent support** for tasks that benefit from parallel subagents.
- **Consider the open-source harness** for custom deployments or deep customization.

## Risks and caveats

- The API is in public beta — expect changes before general availability.
- No SLA, rate limit, or uptime figures are published.
- Sandbox partner pricing varies — the article's container pricing is for OpenAI's hosted option.
- The harness evolves with model updates; developers cannot pin a specific version.
- Customer testimonials are from specific use cases — your mileage may vary.

## What to watch

- General availability timeline and any pricing changes.
- New sandbox partner integrations and capabilities.
- Performance benchmarks comparing the managed API to self-hosted harness deployments.
- Integration with other OpenAI models and tools.

## Sources

- 1. [OpenAI — "Introducing the Agents API" (2026-09-10)](https://openai.com/index/introducing-the-agents-api/) — primary announcement.
- 2. [openai/codex GitHub repository](https://github.com/openai/codex) — Apache-2.0, 123.5k stars, 19.0k forks, 10,668 commits.
- 3. [OpenAI API Pricing](https://developers.openai.com/api/docs/pricing) — model and tool pricing.
- 4. [Agents API developer documentation](https://developers.openai.com/api/docs/guides/agents-api/overview) — API reference and guides.
