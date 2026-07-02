---
title: "Cloudflare `wrangler deploy --temporary` for AI agents"
description: "Wrangler CLI flag that provisions a temporary Cloudflare account, deploys a Worker to workers.dev, and prints a 60-minute claim URL — no API token, no OAuth, no human in the loop."
pubDate: 2026-06-22
author: "AI Newsroom"
tags: ["cloudflare", "cloudflare-workers", "wrangler", "ai-agents", "agentic-ai", "developer-tools", "cli", "deployment", "temporary-accounts", "workers-dev", "auth", "agent-auth", "frictionless-deploy", "simon-willison", "gpt-5-5"]
image: "https://cf-assets.www.cloudflare.com/zkvhlag99gkb/60PB1NmcYFywT5TDlwDR0v/a9e72c980e108702e00b57343ea1ccb2/OG_Share_2024-2025-2026__39_.png"
imageAlt: "Cloudflare Temporary Accounts for AI agents social card"
imageCredit: "Image: Cloudflare blog / Temporary Accounts announcement (June 19, 2026)"
sources:
  - title: "Cloudflare blog — 'Temporary Cloudflare Accounts for AI agents' (Sid Chatterjee, Celso Martinho, Brendan Irvine-Broque)"
    url: "https://blog.cloudflare.com/temporary-accounts/"
    date: 2026-06-19
    type: primary
  - title: "Cloudflare developer docs — 'Claim deployments (temporary accounts)' (page last modified 2026-06-19)"
    url: "https://developers.cloudflare.com/workers/platform/claim-deployments/"
    date: 2026-06-19
    type: primary
  - title: "Simon Willison — 'Temporary Cloudflare Accounts for AI agents' (independent test with GPT-5.5 xhigh in Codex Desktop)"
    url: "https://simonwillison.net/2026/Jun/21/temporary-cloudflare-accounts/"
    date: 2026-06-21
    type: secondary
  - title: "Simon Willison — GPT-5.5 xhigh in Codex Desktop session gist (the model-side evidence for the --temporary flag)"
    url: "https://gist.github.com/simonw/264bd6b8a39fc34c91c9c867454c64b9"
    date: 2026-06-21
    type: secondary
  - title: "Simon Willison — cloudflare-redirect-resolver test repo (the Worker Simon's agent deployed)"
    url: "https://github.com/simonw/cloudflare-redirect-resolver"
    date: 2026-06-21
    type: secondary
  - title: "Cloudflare developer docs — 'Install and update' the Wrangler CLI (4.102.0 minimum)"
    url: "https://developers.cloudflare.com/workers/wrangler/install-and-update/"
    date: 2026-06-19
    type: primary
  - title: "Cloudflare developer docs — Wrangler `deploy` command reference (the --temporary flag spec)"
    url: "https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy"
    date: 2026-06-19
    type: primary
  - title: "Cloudflare blog — Cloudflare + Stripe partnership for agent provisioning (referenced from the temporary-accounts post)"
    url: "https://blog.cloudflare.com/agents-stripe-projects/"
    date: 2026-06-19
    type: secondary
  - title: "WorkOS — auth.md (OAuth-based agent provisioning protocol co-designed with Cloudflare, referenced from the temporary-accounts post)"
    url: "https://workos.com/auth-md"
    date: 2026-06-19
    type: secondary
  - title: "Hacker News discussion on the temporary-accounts announcement (context only)"
    url: "https://news.ycombinator.com/item?id=48608394"
    date: 2026-06-21
    type: secondary
highRiskClaims: false
---

On **2026-06-19**, Cloudflare shipped `wrangler deploy --temporary` — a Wrangler CLI flag that provisions a temporary Cloudflare account, deploys a Worker to a `workers.dev` URL, and prints a claim URL ([Cloudflare blog](https://blog.cloudflare.com/temporary-accounts/); [developer docs](https://developers.cloudflare.com/workers/platform/claim-deployments/)). No human in the loop, no API token, no OAuth, no Cloudflare account. The deployment stays live for **60 minutes**; within that window a human can claim it and convert the temporary account into a permanent one, keeping the Worker and every Cloudflare resource it created. On **2026-06-21**, [Simon Willison](https://simonwillison.net/2026/Jun/21/temporary-cloudflare-accounts/) confirmed the flow end-to-end with **GPT-5.5 xhigh in Codex Desktop**, redeploying a [redirect-resolver Worker](https://github.com/simonw/cloudflare-redirect-resolver) and capturing the claim UI.

## What happened

**The blog post (2026-06-19).** The Cloudflare framing the audience will recognize: *"the moment an agent needs to deploy something… it slams face-first into a wall built for humans: a browser-based OAuth flow, a dashboard to click through, an API token to copy-paste, a multi-factor authentication prompt to satisfy."* The technical core is the new `wrangler deploy --temporary` flag — opt-in for the LLM: when an agent runs `wrangler deploy` without credentials, the CLI now prints a message suggesting `--temporary`, so the agent can discover the flag without being told.

**The developer docs.** The full flow, the supported-products table, the limits, and the abuse-prevention posture are documented. The page is explicit that `--temporary` returns an error if the CLI can already use OAuth, `CLOUDFLARE_API_TOKEN`, or a global API key.

**Simon's test.** His verdict: *"The temporary deployment worked as advertised."* His boundary: *"the AI hook isn't really necessary, this is an interesting feature for everyone else as well."* His [claim-UI screenshot](https://static.simonwillison.net/static/2026/cloudflare-claim.jpg) shows the account-claim page with a 49:26 countdown timer.

**The four-step flow.** Install Wrangler 4.102.0+, run `wrangler deploy` without credentials (CLI hints `--temporary`), rerun with `npx wrangler deploy --temporary`, and the CLI prints a `Claim URL: https://dash.cloudflare.com/claim-preview?claimToken=...` valid for 60 minutes. Within the window, Wrangler caches the temporary account and reuses it for subsequent `--temporary` runs, so an agent can iterate on a Worker and verify changes in one session. The cache is cleared by `wrangler login` or `wrangler logout`.

**Supported products and limits** (2026-06-19 docs):

| Product | Limit |
|---|---|
| Workers | Deployments on `workers.dev` |
| Workers Static Assets | Up to 1,000 files, ≤5 MiB each |
| Workers KV | Commands with temporary credentials |
| D1 | One database, ≤100 MB total |
| Durable Objects | Commands with temporary credentials |
| Hyperdrive | ≤2 configs, ≤10 connections |
| Queues | ≤10 queues |
| SSL/TLS | Commands with temporary credentials |

**The non-obvious limits.** (1) **Proof-of-work** before account creation — CLI handles it; can add a short delay. (2) **Rate limits** — not published numerically; the advice is to wait or authenticate. (3) **Abuse prevention** — *"additional abuse prevention checks"* not specified. (4) **Claim URLs are sensitive** — *"Treat them as sensitive."*

## Why it matters

The auth wall is the single biggest visible blocker for autonomous agents in 2026. Browser OAuth, copy-paste of API tokens, and MFA prompts stop background agents cold. `--temporary` is the first widely-deployed CLI-level response from a major platform that does not require the agent to discover a custom protocol, a vendor partnership, or a paid auth product. Vercel, Netlify, Render, Fly, and Railway do not have a public equivalent as of 2026-06-22. Tight write → deploy → verify loops are essential for agent productivity, and the industry is converging on a few specific patterns: Cloudflare's CLI-level shortcut, WorkOS's `auth.md` (OAuth-based provisioning), and Cloudflare's Stripe partnership (billing). None is a standard yet, but they are the building blocks of a near-term convention.

## Practical implications

- **One-line invocation.** `npx wrangler deploy --temporary` is the entry point. Wrangler 4.102.0+ required.
- **Iterate within the 60-minute window.** Wrangler caches the temporary account; the agent's write/deploy/verify loop works.
- **The supported products table is the truth.** R2, Pages, Stream, Email Workers, Workers AI inference bindings beyond the table — use `wrangler login` / `CLOUDFLARE_API_TOKEN`.
- **Production path is unchanged.** Per the docs: *"For production and CI/CD, use a permanent Cloudflare account… Do not use `--temporary` when the Wrangler CLI is already authenticated."*

## Risks and caveats

- **Cloudflare product, not an industry standard.** Don't frame `--temporary` as canonical.
- **60-minute TTL is short for some workloads.** Long-running training or multi-day batch jobs will be reclaimed.
- **Supported products and limits are narrow.** D1 to one DB; Hyperdrive to two configs; Queues to ten. Don't imply "every Cloudflare product."
- **Claim URLs grant ownership of the temporary account.** Treat them as credentials.
- **Abuse prevention is opaque.** Agents that trip checks will be silently rate-limited.
- **Simon's test is a single user / model / project.** Generalize carefully.
- **"For AI agents" is partly marketing.** The flag is genuinely useful for human developers too.

## What to watch

1. Whether other platforms ship equivalent features (Vercel, Netlify, Render, Fly, Railway).
2. Adoption in agent frameworks (Claude Code, Codex, Cursor, Aider, smolagents).
3. Expansion of the supported-products table and limits.
4. Abuse / rate-limit behavior at scale.
5. Convergence with WorkOS `auth.md` and the Cloudflare + Stripe partnership.

## Sources

- [Cloudflare blog — "Temporary Cloudflare Accounts for AI agents" (2026-06-19)](https://blog.cloudflare.com/temporary-accounts/)
- [Cloudflare developer docs — "Claim deployments (temporary accounts)"](https://developers.cloudflare.com/workers/platform/claim-deployments/)
- [Cloudflare developer docs — Wrangler install / update (4.102.0 minimum)](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- [Cloudflare developer docs — Wrangler deploy reference](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy)
- [Cloudflare blog — Cloudflare + Stripe partnership](https://blog.cloudflare.com/agents-stripe-projects/)
- [Simon Willison — "Temporary Cloudflare Accounts for AI agents" (2026-06-21)](https://simonwillison.net/2026/Jun/21/temporary-cloudflare-accounts/)
- [Simon Willison — GPT-5.5 xhigh session gist](https://gist.github.com/simonw/264bd6b8a39fc34c91c9c867454c64b9)
- [Simon Willison — cloudflare-redirect-resolver test repo](https://github.com/simonw/cloudflare-redirect-resolver)
- [WorkOS — auth.md](https://workos.com/auth-md)
- [Hacker News discussion](https://news.ycombinator.com/item?id=48608394)
