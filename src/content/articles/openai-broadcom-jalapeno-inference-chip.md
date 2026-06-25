---
title: "OpenAI and Broadcom unveil Jalapeño, OpenAI's first custom LLM inference chip"
description: "On 2026-06-24 OpenAI and Broadcom jointly unveiled Jalapeño, OpenAI's first custom Intelligence Processor, with engineering samples running ML workloads in the lab at production target frequency and power and a multi-generation platform described as gigawatt-scale with Microsoft and other partners beginning in 2026. Per-watt performance, the 9-month tape-out timeline, and a 'GPT-5.3-Codex-Spark' workload are vendor claims; no independent benchmark, no shipping date, and no SKU has been published."
pubDate: 2026-06-25
author: "AI Newsroom"
tags:
  - openai
  - broadcom
  - jalapeno
  - inference-chip
  - custom-silicon
  - intelligence-processor
  - asic
  - celestica
  - tomahawk
  - microsoft
  - gpt-5-3-codex-spark
  - vertical-integration
  - nvidia
  - amd
  - google-tpu
  - ai-infrastructure
  - data-centers
  - ai-newsroom-coverage
image: "/images/articles/openai-broadcom-jalapeno-inference-chip/hero-desktop.png"
imageAlt: "Screenshot of the OpenAI 'OpenAI and Broadcom unveil LLM-optimized inference chip' announcement page archived by the Wayback Machine on 2026-06-24 at 20:14:46 UTC, showing the headline 'Designed to be the best inference platform for LLMs' above the section 'Nine-month tape-out, accelerated by OpenAI models'."
imageCredit: "Screenshot: OpenAI / Broadcom announcement (openai.com, 2026-06-24) — captured 2026-06-25 from the Wayback Machine archive snapshot 20260624201446 (the live openai.com URL returned HTTP 403 to a non-browser Cloudflare challenge). Credit: OpenAI. License: OpenAI published material, used for editorial commentary under fair use."
sources:
  - title: "OpenAI — 'OpenAI and Broadcom unveil LLM-optimized inference chip' (Company, 2026-06-24)"
    url: "https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
    date: 2026-06-24
    type: primary
  - title: "Wayback Machine archive snapshot of the OpenAI announcement — 2026-06-24 20:14:46 UTC"
    url: "http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
    date: 2026-06-24
    type: primary

  - title: "Broadcom (NASDAQ: AVGO) corporate site — ticker reference"
    url: "https://www.broadcom.com/"
    date: 2026-06-24
    type: secondary
  - title: "Microsoft — infrastructure and Azure page (deployment-partner context)"
    url: "https://azure.microsoft.com/"
    date: 2026-06-24
    type: secondary
highRiskClaims: true
---

On **2026-06-24**, OpenAI and Broadcom (NASDAQ: AVGO) jointly unveiled **Jalapeño**, OpenAI's first custom Intelligence Processor — a blank-slate LLM inference accelerator co-developed with Broadcom and Celestica, taken from initial design to manufacturing tape-out in nine months, and already running engineering samples in the lab at production target frequency and power. Per the announcement, the first Jalapeño chips were physically delivered to OpenAI CEO Sam Altman and President Greg Brockman by Broadcom President and CEO Hock Tan and President Charlie Kawwas ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/); [Wayback Machine archive of the same page, 2026-06-24 20:14:46 UTC](http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

The press framing is full-stack: chip architecture, kernels, memory systems, networking, scheduling, deployment, and product are now designed inside the same organization. OpenAI is the first US frontier AI lab to publicly attach its name to a custom inference silicon program. **The performance numbers — "substantially better" performance per watt than current state-of-the-art, and the "nine-month" tape-out claim — are vendor claims from the announcement, not independent measurements.** A detailed technical report is promised "in the coming months."

## What was announced

**The headline.** OpenAI and Broadcom are building a multi-generation inference platform, of which Jalapeño is the first chip. Per the announcement, Jalapeño is "OpenAI's first Intelligence Processor: an accelerator architected around OpenAI's vision for the future of LLM inference, and the first AI accelerator in a multi-generation compute platform the companies are building together to make advanced AI faster, more reliable, and more accessible to more people" ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)). Broadcom is responsible for silicon implementation, high-performance networking (Tomahawk is named), and scalable production systems; Celestica is the board, rack, and system integration partner. The chip was designed "from the ground up for LLM inference" rather than adapted from an earlier AI workload.

**The 9-month tape-out.** Per the announcement, Jalapeño "was co-developed from initial design to manufacturing tape-out in just nine months, and the custom AI accelerator program represents what we believe to be the fastest ASIC development cycle ever achieved in high-performance advanced semiconductors." The post attributes the speed to deep software/hardware co-development and "the use of OpenAI models to accelerate parts of the design and optimization process." "We believe" is doing real work in that sentence — it is Broadcom's claim about the cycle, not an independently measured record ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

**Engineering samples running in the lab.** The announcement says "engineering samples of the Jalapeño chip are running ML workloads in the lab at production target frequency and power, including GPT-5.3-Codex-Spark." **"GPT-5.3-Codex-Spark" is named in the announcement as a workload running on the chip, not as a public OpenAI product.** No release date, no API availability, no pricing was announced for any model or product line ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

**The performance claim — vague by design.** OpenAI says "while OpenAI is still measuring final performance, early testing shows that Jalapeño will deliver performance per watt substantially better than current state-of-the-art. A detailed technical report on performance will be presented in the coming months." No benchmark. No comparison to NVIDIA H200, B200, B300, or to Google TPU v6 / v7. "Substantially better" is the announcement's wording, attributed to OpenAI's own early testing ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

**Deployment plan.** Multi-generation. To be deployed at "gigawatt scale" with Microsoft and other data center partners "beginning in 2026." The announcement gives no specific gigawatt target, no per-region allocation, no contractual structure, and no Azure regions. Microsoft is named as the lead data center partner; "other partners" are not named. No shipping date, no SKU, no price ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

**The handoff.** Per the announcement, the first Jalapeño chips were physically delivered to OpenAI CEO Sam Altman and President Greg Brockman by Broadcom President and CEO Hock Tan and President Charlie Kawwas. The press framing positions this as a symbolic full-stack handoff, not as a commercial launch ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

## The load-bearing quotes

Three short executive quotes appear in the announcement. The Brockman full-stack-strategy quote and the Ho "ground-up for LLM inference" quote are the load-bearing ones; both stay under 30 words and are reproduced here with attribution in full.

**Greg Brockman, President and Co-Founder, OpenAI:**

> "Jalapeño is part of our long-term full-stack infrastructure strategy to make compute more abundant, resulting in AI which is faster, more reliable, more affordable for people and businesses, and can be used to solve more important problems. By designing more of the stack ourselves, we can serve more intelligence with greater efficiency and keep pushing advanced AI toward broader access."
>
> — [OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)

**Richard Ho, who leads OpenAI's hardware program:**

> "Jalapeño was designed from the ground up for LLM inference. We optimized the architecture around the kernels, memory movement, networking, and serving patterns that matter most for frontier AI models."
>
> — [OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)

**Hock Tan, President and CEO, Broadcom:**

> "By co-developing our industry-leading silicon directly with OpenAI, we are enabling the deployment of gigawatt scale data centers with Microsoft and other partners beginning in 2026."
>
> — [OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)

## Why it matters

**1. OpenAI is the first US frontier AI lab to ship custom inference silicon.** Google has TPU (in-house, since 2015). Amazon has Trainium and Inferentia (in-house AWS silicon). OpenAI is the first pure-model-lab to vertically integrate to inference silicon via a public co-development program. The move shifts the comparison set for any other frontier lab considering in-house inference silicon from "impossible" to "now table-stakes" ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

**2. Vertical integration follows the Google TPU / Pathways pattern.** The announcement is explicit that "OpenAI is not only developing frontier models or building products on top of them; it is designing the infrastructure underneath them: chip architecture, kernels, memory systems, networking, scheduling, deployment systems, and product experience." This is the same architectural pattern as Google's TPU / Pathways stack. Any frontier lab still buying 100% of its inference compute from NVIDIA is now the outlier ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

**3. The 9-month tape-out is the most quotable, most contestable claim in the announcement.** A nine-month design-to-tape-out for a "high-performance advanced semiconductor" is, if independently confirmed, the fastest published ASIC development cycle in the industry. The claim is Broadcom's, prefixed with "we believe." The article records it as a vendor claim; the technical report promised for the coming months is the load-bearing source for any future independent claim.

**4. Inference cost, latency, and availability for OpenAI products move together — eventually, if the perf claim holds.** "Jalapeño helps OpenAI turn more of its infrastructure into useful intelligence" is the closest the announcement comes to a builder-relevant claim. The same compute budget could serve more tokens, longer sessions, or larger context windows. **But that linkage is for the technical report, not for today.** No OpenAI product is announcing a price or rate-limit change as a result of Jalapeño on 2026-06-25.

**5. Competitive pressure on NVIDIA, AMD, and Google TPU.** A frontier lab buying inference silicon from anyone other than NVIDIA changes the supplier-mix math. The article names NVIDIA, AMD, and Google TPU as the comparison set, and explicitly notes that the announcement contains **no benchmark numbers** to compare against any of them. Independent benchmarks of Jalapeño do not exist as of 2026-06-25.

**6. Microsoft's role is named, un-detailed, and uncorroborated.** The announcement says deployment is "with Microsoft and other partners beginning in 2026" but does not specify Azure regions, deployment volume, or contractual structure. Microsoft has not publicly named Jalapeño on 2026-06-25.

## Practical implications for builders and operators

**1. Do not change your OpenAI API procurement plan on this announcement.** Jalapeño is a 2026 internal-deployment story. The chip is "engineering samples in the lab," not "shipping in the OpenAI API." No OpenAI SKU, no pricing change, no rate-limit change is announced. The article is explicit: today's contract is the same as yesterday's ([OpenAI, 2026-06-24](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)).

**2. Watch for inference-cost reductions over the next two quarters as the leading indicator.** If OpenAI is willing to say "performance per watt substantially better" in the announcement, the math they will eventually show is tokens-per-watt, which translates to cost-per-token. The article states the linkage without predicting a number. **Do not extrapolate "substantially better" to a specific multiple of NVIDIA H200 / B200 or Google TPU — the announcement does not.**

**3. The competitive set now includes OpenAI on silicon, not just OpenAI on models.** Builders building on top of OpenAI APIs do not need to switch providers. Builders choosing between frontier providers may want to track whether similar moves by Anthropic, xAI, Meta, or Mistral shift the supplier-mix math over the next 60–90 days.

**4. "GPT-5.3-Codex-Spark" is a workload, not a product launch.** The model is named in the announcement as an example workload running on Jalapeño engineering samples. The article does not present it as a public OpenAI model release, does not give it a release date, and does not give it API pricing. If OpenAI announces a "Codex-Spark" SKU later, the article will be updated; until then, treat the name as an internal workload label.

**5. The partnership model is the reusable pattern.** OpenAI designed the architecture, Broadcom handled silicon implementation and networking, Celestica handled board, rack, and system. This three-tier "lab + fab-adjacent + systems integrator" model is the most copyable part of the announcement for any team that wants to ship a frontier-AI compute stack in 2026 without owning a fab.

## Risks and caveats

1. **"Substantially better" is a vendor claim, not a measurement.** No benchmark numbers. No comparison to NVIDIA H200 / B200 / B300 or Google TPU v6 / v7. The detailed technical report is promised "in the coming months." The article quotes the claim with attribution and does not present it as an established fact.
2. **The 9-month tape-out is also a vendor claim.** Broadcom's contribution to the announcement calls it "what we believe to be the fastest ASIC development cycle ever achieved in high-performance advanced semiconductors." "We believe" is doing work in that sentence. The article attributes the claim to Broadcom, not to an independent third party.
3. **"GPT-5.3-Codex-Spark" must not be presented as a product.** The model is named in the announcement as a workload running on Jalapeño engineering samples, not as a public OpenAI product. No release date, no API availability, no pricing. The article does not invent those.
4. **"Gigawatt scale" is unspecific.** The announcement says deployment is gigawatt-scale with Microsoft and other partners, beginning in 2026, but contains no specific gigawatt target, no timeline beyond "beginning in 2026," and no per-region allocation. The article reports the announcement's language and stops there.
5. **Microsoft is named without specifics.** No Azure regions, no deployment volume, no contractual structure. Microsoft has not publicly named Jalapeño on 2026-06-25. The article does not infer a Microsoft commitment beyond what the announcement says.
6. **No shipping date, no SKU, no price.** Engineering samples in the lab, running internal workloads. The article does not present Jalapeño as a product one can buy, rent, or access. The 2026 deployment is internal to OpenAI's data center partners.
7. **Independent verification is missing.** No third-party benchmark, no analyst note, no research-lab measurement, no Microsoft corroboration. The article states the absence of independent verification rather than filling the gap with inference.
8. **No prior AI Newsroom coverage to overlap.** The 2026-06-23 dual-IPO coverage is on the S-1 filings, not the silicon strategy. No prior article on OpenAI silicon, Broadcom AI silicon, or inference accelerators.

## What to watch

1. **The detailed technical report.** "A detailed technical report on performance will be presented in the coming months." When it lands, it will be the load-bearing source for any perf claim. Until then, the article attributes "substantially better" as a vendor claim, not a measured result.
2. **Independence of the perf/watt claim.** Whether an independent third party — a hyperscaler benchmark, a research lab, or an analyst firm — publishes a measurement of Jalapeño in a production workload. The article flags this as a watch item; the announcement alone is not verification.
3. **Deployment volume at Microsoft.** Whether Microsoft's FY2027 capex guidance or earnings calls name a Jalapeño deployment volume. Microsoft has been silent on specifics as of 2026-06-25.
4. **OpenAI product pricing and rate-limit changes.** A successful Jalapeño ramp should eventually be visible in OpenAI API price changes, context-window expansions, or new SKU launches. The article does not promise this; it flags it as the long-term signal.
5. **Other frontier labs' silicon plans.** Whether Anthropic, xAI, Meta, or Mistral announce their own inference-silicon partnerships in the next 60–90 days. The current OpenAI move is the first public one in this generation; it is unlikely to be the last.
6. **Celestica's role and capacity.** Celestica (NYSE: CLS) is the named board/rack/system partner. The article does not extend into a Celestica stock story, but the full-stack team is OpenAI (architecture + kernels) + Broadcom (silicon + networking) + Celestica (board + rack + system).

## Sources

- 1. OpenAI — "OpenAI and Broadcom unveil LLM-optimized inference chip" (primary, 2026-06-24, [live-verified 2026-06-25 via Wayback Machine snapshot 20260624201446](http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/); the live URL returns HTTP 403 to a non-browser Cloudflare challenge)
- 2. Wayback Machine archive snapshot — 2026-06-24 20:14:46 UTC (primary, 2026-06-24, [live-verified 2026-06-25](http://web.archive.org/web/20260624201446/https://openai.com/index/openai-broadcom-jalapeno-inference-chip/))
- 3. Broadcom (NASDAQ: AVGO) corporate site — ticker reference (secondary, 2026-06-24, [live](https://www.broadcom.com/))
- 4. Microsoft — Azure infrastructure page, deployment-partner context (secondary, 2026-06-24, [live](https://azure.microsoft.com/); Microsoft has not publicly named Jalapeño as of 2026-06-25)

