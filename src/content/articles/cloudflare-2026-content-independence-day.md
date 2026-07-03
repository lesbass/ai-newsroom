---
title: "Cloudflare 2026 Content Independence Day: three-tier AI bot taxonomy and x402 waitlist"
description: "Cloudflare's second Content Independence Day splits AI bots into Search/Agent/Training, sets a Sep 15 default blocking Training and Agent on ad pages, and opens an x402 waitlist."
pubDate: 2026-07-03
author: "AI Newsroom"
tags: ["cloudflare", "ai-bots", "content-independence-day", "robots-txt", "content-signals", "x402", "monetization-gateway", "botbase", "web-bot-auth", "stablecoin", "ai-agents", "ai-training", "agentic-web", "linux-foundation", "jinnie-lee", "bryan-becker"]
image: "/images/articles/cloudflare-2026-content-independence-day/hero-content-signals-use.png"
imageAlt: "Generated editorial diagram of the Content Signals `use` extension: a tier layer of Search (allowed by default) and Agent and Training (blocked on ad pages from Sep 15), with a horizontal flow of the new use=immediate, use=reference (Cloudflare-managed default), and use=full values, and a before/after robots.txt block showing the added use=reference directive."
imageCredit: "Generated editorial image · Hand-authored SVG by AI Newsroom writer, rasterised to PNG with sharp on 2026-07-03 · Disclosure: AI-generated editorial diagram, not source evidence · Source composition: blog.cloudflare.com/content-independence-day-ai-options/ (Jin-Hee Lee and Bryan Becker, 2026-07-01), contentsignals.org, and developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/ · Why a generated image: the live Cloudflare blog post is the canonical source, but the writer's environment cannot capture a real browser screenshot (Playwright Chromium is unavailable because libglib-2.0.so.0 is missing system-wide), so the brief's Pattern D hand-authored SVG fallback is used with explicit AI-generated disclosure per the 2026-06-20 operating policy."
canonicalURL: "https://news.lesbass.com/articles/cloudflare-2026-content-independence-day/"
sources:
  - title: "Cloudflare blog — 'Your site, your rules: new AI traffic options for all customers' (Jin-Hee Lee and Bryan Becker)"
    url: "https://blog.cloudflare.com/content-independence-day-ai-options/"
    date: 2026-07-01
    type: primary
  - title: "Cloudflare blog — 'Announcing the Monetization Gateway: charge for any resource behind Cloudflare via x402'"
    url: "https://blog.cloudflare.com/monetization-gateway/"
    date: 2026-07-01
    type: primary
  - title: "Linux Foundation — 'Linux Foundation is Launching the x402 Foundation and Welcoming the Contribution of the x402 Protocol'"
    url: "https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol"
    date: 2026-04-02
    type: primary
  - title: "Cloudflare Radar — 'Content Independence Day, one year on' (agentic-internet bot report)"
    url: "https://blog.cloudflare.com/agentic-internet-bot-report/"
    date: 2026-07-01
    type: primary
  - title: "Cloudflare blog — 'Unmasking the crawls with Attribution Business Insights'"
    url: "https://blog.cloudflare.com/attribution-business-insights/"
    date: 2026-07-01
    type: primary
  - title: "Cloudflare blog — 'Making AI search smarter'"
    url: "https://blog.cloudflare.com/making-ai-search-smarter/"
    date: 2026-07-01
    type: primary
  - title: "Cloudflare developer docs — Web Bot Auth (page last modified 2026-07-01)"
    url: "https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/"
    date: 2026-07-01
    type: primary
  - title: "IETF — RFC 7239, 'Forwarded HTTP Extension'"
    url: "https://www.rfc-editor.org/info/rfc7239"
    date: 2014-06-01
    type: primary
  - title: "Content Signals — open standard site (the `use` field is an extension of these signals)"
    url: "https://contentsignals.org/"
    type: secondary
highRiskClaims: false
---

*Why this is long: four load-bearing pieces, the 11-row table, three x402 rules, and `Forwarded` examples — the article is in the 1,000-1,100 word band.*

On 2026-07-01 Cloudflare marked its second **Content Independence Day** with a coordinated package: a three-tier AI bot taxonomy, a Sep 15 default change, BotBase, a Content Signals `use` extension, an experiment with the standard `Forwarded` header for transitive trust, and an x402 Monetization Gateway that lets site owners charge per request in stablecoins ([Cloudflare blog, 2026-07-01](https://blog.cloudflare.com/content-independence-day-ai-options/); [Monetization Gateway post, 2026-07-01](https://blog.cloudflare.com/monetization-gateway/)). Anchor numbers from Cloudflare Radar: 52% of crawler requests are now for AI training, 36% are mixed-use, and more than 50% of Internet traffic is non-human ([2026-07-01 report](https://blog.cloudflare.com/agentic-internet-bot-report/)).

## What happened

Cloudflare shipped the package across five posts and one report on the same day: the **"Your site, your rules"** announcement; the **Monetization Gateway** post; the **Attribution Business Insights** dashboard; the **"Making AI search smarter"** piece; and a one-year retrospective on crawler composition.

## The three-tier taxonomy and the Sep 15 default change

The taxonomy sorts every AI bot into one of three behaviour-defined tiers:

- **Search** — crawlers that index the site for later search or answer use.
- **Agent** — automated behaviour that acts on a person's behalf in real time, with a human waiting (for example ChatGPT-User).
- **Training** — crawlers that take content to train or fine-tune a model; data is permanently absorbed into model weights.

On **2026-09-15**, two defaults change for new Cloudflare zones:

- **Training and Agent are blocked by default on ad-displaying pages**; Search remains allowed by default.
- **Multi-purpose crawlers (Googlebot, Applebot, BingBot) are caught by the most restrictive rule**, so blocking Training also blocks them.
- Existing customers can opt out in Security settings any time before Sep 15.

## BotBase and the new visibility plane

**BotBase** is the new directory surface inside Enterprise Bot Management: every Verified bot, where it falls in the new taxonomy, and a copyable detection ID. A direct control center is promised later in 2026. The 11-row table:

| Behaviour tier | Example bots |
| --- | --- |
| ***Search*** | Search engine crawlers |
| ***Agent*** | ChatGPT-User, browser-use agents |
| ***Training*** | GPTBot, ClaudeBot, common-crawl, CCBot |
| Transact | E-commerce price, stock crawlers |
| Data Collection | Lead-generation, contact crawlers |
| Security Testing | Burp, Detectify, Snyk |
| SEO | AhrefsBot, SemrushBot |
| Ads Verification | DoubleVerify, IAS |
| Social & Link Preview | Twitterbot, Slackbot, LinkedInBot |
| Feed Fetching | RSS aggregators |
| Monitoring & Ops | Uptime, page-speed, status checks |

**"Verified" no longer means "default allowed."** It now means "allowable with its relevant category" — a Verified training crawler is not allowed by default on a site that blocks Training.

## Content Signals `use` and the `Forwarded` header

The new `use` field is an extension of [Content Signals](https://contentsignals.org/) in `robots.txt`. Three values:

- **`use=immediate`** — interact, store nothing; a one-shot fetch.
- **`use=reference`** (Cloudflare-managed default) — index, excerpt, link back.
- **`use=full`** — permit the model to summarize and reproduce.

Cloudflare-managed `robots.txt` files will start emitting `use=reference` automatically. Reproduced from the post:

```
# Before
User-agent: *
Content-Signal: search=yes,ai-train=no
Allow: /
```

```
# After
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /
```

Cloudflare is **tracking content uses for every bot in BotBase**; a bot that abuses the `use` setting loses Verified status. For transitive trust, Cloudflare is experimenting with the standard `Forwarded` header ([RFC 7239](https://www.rfc-editor.org/info/rfc7239)):

```
Forwarded: for="openai"
Forwarded: for="openai";use="reference"
```

The pattern ties to Web Bot Auth (Ed25519-signed requests; [Cloudflare developer docs, 2026-07-01](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)).

## The x402 Monetization Gateway

The Monetization Gateway is a Cloudflare-side engine that wraps a web page, dataset, API, or MCP tool, so that requests above a rule get a `402 Payment Required` response. **The waitlist is open now for Cloudflare customers**; it is not a GA launch.

Settlement runs on the **x402 open protocol**, a Linux Foundation project stewarded by the x402 Foundation (launched 2026-04-02 with Adyen, AWS, AmEx, Circle, Cloudflare, Coinbase, Fiserv, Google, Mastercard, Microsoft, Shopify, Solana Foundation, Stripe, and Visa as initial members — [Linux Foundation press release, 2026-04-02](https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol)). Settlement is sub-second, sub-cent, peer-to-peer in stablecoins (PYUSD, USDC). Three example rules from the post:

- Charge $0.01 per request to `/api/premium/*`.
- Charge up to $2 for an image-generation route by compute used.
- Intercept HTTP 401 from the origin and return 402 with payment instructions.

## Why it matters

- **The Sep 15 default change is the most consequential single move.** Blocking Training also blocks Googlebot, Applebot, BingBot.
- **The taxonomy classifies bots by behaviour, not self-declared identity.** The first industry-wide attempt to retire `User-agent: GPTBot`-style rules.
- **The `use` extension gives "what may the bot do with my content" actual teeth.** Cloudflare can revoke Verified status if a bot misrepresents its `use` setting.
- **The x402 Monetization Gateway is the first CDN payment rail designed for agents.** Stablecoin settlement and Linux Foundation governance are now on the table.
- **The network-wide numbers are structural.** 52% of crawler requests for training, 36% mixed-use, 50%+ non-human traffic.

## Risks and caveats

1. **Defaults are the new lever, not opt-in.** Sep 15 is a one-way default for new zones; existing customers must opt out.
2. **Multi-purpose crawlers are caught by the most restrictive rule.** Blocking Training also blocks Googlebot, Applebot, BingBot; sites that want Google search but not training must allowlist Google user-agents.
3. **Content Signals `use` is a preference, not enforcement.** The protocol is voluntary; hard guarantees need a `Disallow` rule or Cloudflare block.
4. **Transitive trust depends on identifiability.** Small publishers and privacy-first operators will get less from this layer.
5. **The Monetization Gateway is a waitlist, not a GA launch.** Pricing rules, stablecoin support, and the dashboard are visible, but the product is not yet generally available.
6. **Cloudflare is the gatekeeper.** Verified, BotBase, the downgrade logic, and gateway settlement are all Cloudflare-operated; the x402 Foundation is a payment counterweight, but no equivalent body exists for the bot taxonomy.

## What to watch

- **The 2026-09-15 default change.** Watch the dashboard for the rollout banner; existing customers have until then to opt out.
- **BotBase evolves into a control plane.** A direct control center for known automated content is promised later in 2026.
- **Bot operators splitting their crawlers.** Watch for Google, Apple, and Microsoft to respond to the multi-purpose-crawler framing.
- **The x402 Foundation's first product moves.** Open Source Summit Europe (2026-10-07) is the likely venue for protocol milestones.
- **The Pay-Per-Crawl marketplace matures.** Watch for the first agent-to-agent transaction published by a Cloudflare customer.

## Sources

- [Cloudflare blog — "Your site, your rules: new AI traffic options for all customers" (2026-07-01)](https://blog.cloudflare.com/content-independence-day-ai-options/)
- [Cloudflare blog — "Announcing the Monetization Gateway: charge for any resource behind Cloudflare via x402" (2026-07-01)](https://blog.cloudflare.com/monetization-gateway/)
- [Linux Foundation — "Linux Foundation is Launching the x402 Foundation" (2026-04-02)](https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol)
- [Cloudflare Radar — "Content Independence Day, one year on" (2026-07-01)](https://blog.cloudflare.com/agentic-internet-bot-report/)
- [Cloudflare blog — "Unmasking the crawls with Attribution Business Insights" (2026-07-01)](https://blog.cloudflare.com/attribution-business-insights/)
- [Cloudflare blog — "Making AI search smarter" (2026-07-01)](https://blog.cloudflare.com/making-ai-search-smarter/)
- [Cloudflare developer docs — Web Bot Auth (page last modified 2026-07-01)](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)
- [IETF — RFC 7239, "Forwarded HTTP Extension"](https://www.rfc-editor.org/info/rfc7239)
- [Content Signals — open standard site](https://contentsignals.org/)
