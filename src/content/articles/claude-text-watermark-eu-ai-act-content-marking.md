---
title: "How Claude's text watermark works — and why the EU AI Act made Anthropic add it"
description: "Anthropic details how future Claude models will embed a SynthID-Text-style watermark to comply with the EU AI Act, plus C2PA credentials for images and a detection API coming soon."
pubDate: 2026-08-15
author: AI Newsroom
tags:
  - anthropic
  - claude
  - watermarking
  - eu-ai-act
  - synthid-text
  - c2pa
  - content-provenance
image: /images/articles/claude-text-watermark-eu-ai-act-content-marking/hero.svg
imageAlt: "Generated editorial diagram: Claude text generation settles low-stakes token choices with a secret key, leaving a detectable watermark, with separate C2PA content credentials for images and files (AI-generated, AI Newsroom)"
imageCredit: "Generated editorial image · Model/tool: hand-authored SVG · Disclosure: AI-generated, not source evidence"
highRiskClaims: true
---

Anthropic published a detailed technical explanation on August 14, 2026 of how future Claude models will embed a text watermark using a SynthID-Text-style approach. The change complies with the EU AI Act's content-marking mandate, which took effect August 2, 2026 for AI providers serving the EU market.

## What happened

Anthropic's explainer describes a watermarking method that changes only the source of randomness used for low-stakes token choices in Claude's text generation. The approach is based on Google DeepMind's SynthID-Text technique, published in *Nature* in 2024 (Dathathri et al., Nature 634, pp. 818–823).

Key points from Anthropic's announcement:

- The watermark answers "What is the likelihood this was partly written by Claude?" — not who wrote it
- No quality, cost, or latency impact claimed
- No hidden characters, no extra tokens, no user identification
- Applied globally at launch because region-scoped enforcement isn't durable yet
- Older Claude models (pre-August 2, 2026) will get a transition-period rollout

The EU AI Act requires providers of AI systems serving the EU to mark AI-generated content as of August 2, 2026. Anthropic signed the EU Code of Practice on Transparency of AI-Generated Content in July 2026, along with approximately 190 total signatories according to the European Commission.

## Why it matters

This is the first detailed technical account from a major US frontier lab on EU AI Act watermarking compliance. EU-facing developers, platform trust-and-safety teams, and content moderation systems need to understand what the watermark proves and what it doesn't.

The watermark is not a content label or metadata tag — it's a statistical signal embedded in the text itself. Detection requires a key held by Anthropic, and the method only works reliably on longer passages where enough word choices have been made.

## How the text watermark works

Claude generates text one word at a time, choosing among candidate words based on context. In many cases, multiple words would be equally good — "overcast" or "grey" might both work in "The weather today was cold and…"

The watermark uses these low-stakes choices to embed a pattern. Instead of using an arbitrary random number generator to pick between candidates, the system uses a key plus preceding words to settle the choice. The words are still random, but the sequence becomes consistent with the key.

As Anthropic explains: "The watermark only changes the source of the randomness used to pick among words." A key-holder can later check whether a text's word choices are consistent with what Claude would produce using that key.

The method is sparser where exact outputs are required — factual answers, code correctness, proofreading. In these cases, there's no room for the watermark to act because only one choice is correct.

## What it does and doesn't prove

**Does prove:**
- That Claude was likely involved in writing or editing the text
- Increasing confidence with longer passages

**Doesn't prove:**
- Who specifically wrote the text
- Whether the text was human-written or AI-generated
- Whether the text was written by a different AI system

**Limitations:**
- Weak on short samples
- Sparser on factual passages and code
- A complete rewrite where every word is replaced removes the watermark
- Light editing generally doesn't remove it

Detection is unreliable on short samples and improves with passage length. The watermark doesn't confirm human authorship, can't attribute to other AI systems, and doesn't identify users or organizations.

## C2PA for images and files

When Claude produces a `.png`, `.jpg`, or `.svg` file, Anthropic attaches a cryptographically signed C2PA content credential in the file's metadata. This is an open industry standard used by camera manufacturers and photo-editing software.

The metadata says "Claude was involved in producing the file" — it doesn't embed a hidden signal or change the file's content. Any C2PA-aware tool can read it, and Anthropic will provide its own reader.

This is distinct from text watermarking: C2PA is metadata-based file provenance, while the text watermark is a statistical signal in the text itself.

## Practical implications for builders

- **Global rollout**: Watermarking applies everywhere at launch because Anthropic doesn't have a durable way to scope it by region
- **Older models**: Pre-August 2026 Claude models will get watermarking over the coming months during a transition period
- **Code coverage**: Code is generally less watermarked except in arbitrary-choice tokens like comments
- **No pricing change**: Watermarking produces no extra tokens, so API costs remain the same
- **Detection API**: Anthropic says a watermark detection API is "coming soon" but hasn't announced details or pricing

EU-facing products should prepare for the detection API launch and understand that the watermark is a probabilistic signal, not a binary indicator.

## Risks and caveats

- **Anthropic-reported claims**: "No quality impact," "no cost/latency impact," and "no user identification" are Anthropic's own characterization of its own system
- **SynthID-Text basis**: The underlying evidence comes from a 2024 Nature paper testing on Gemini traffic with ~20 million responses, not a new independent benchmark of Claude
- **Detection API details unannounced**: Implementation, pricing, and accuracy characteristics remain unknown
- **Global rollout is a policy choice**: The worldwide application is Anthropic's decision, not a technical requirement of the EU regulation

## What to watch

- Detection API launch timing and pricing
- Updated rollout for older Claude models
- Independent third-party audits of the watermark's effectiveness
- EU Commission guidance on enforcement of the content-marking mandate
- Whether other major labs (OpenAI, Google, Meta) publish comparable technical details

## Sources

| Source | Date | Claim Supported |
|--------|------|-----------------|
| [How Claude's text watermark works — Anthropic](https://www.anthropic.com/news/claude-text-watermark) | Aug 14, 2026 | Primary source: watermarking mechanism, no quality/cost/latency impact, C2PA credentials, global rollout, detection API |
| [Scalable watermarking for identifying large language model outputs — Nature 634, pp. 818–823](https://www.nature.com/articles/s41586-024-08025-4) | Oct 23, 2024 | Underlying SynthID-Text method; human-rater evidence for no quality impact |
| [Strong backing for the Code of Practice on Transparency of AI-generated Content — European Commission](https://digital-strategy.ec.europa.eu/en/news/strong-backing-code-practice-transparency-ai-generated-content) | Jul 31, 2026 | ~190 signatories; Code of Practice as voluntary compliance pathway under AI Act |
| [C2PA Content Credentials](https://c2pa.org/) | — | Open standard for file metadata provenance |
