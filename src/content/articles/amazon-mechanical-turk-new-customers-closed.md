---
title: "Amazon closes Mechanical Turk to new customers on July 30, 2026"
description: "Amazon stops accepting new Mechanical Turk customers effective July 30, 2026 and ships no new features — the 20-year-old crowdsourcing platform that built AI data labeling is on life support."
pubDate: 2026-07-06
author: "AI Newsroom"
tags: ["amazon", "mechanical-turk", "aws", "sagemaker", "ai-training-data", "crowdsourcing", "data-annotation", "ground-truth", "end-of-life"]
image: "/images/articles/amazon-mechanical-turk-new-customers-closed/hero-mturk-announcement.png"
imageAlt: "Screenshot of the Mechanical Turk homepage (mturk.com, captured 2026-07-06) showing the dark announcement banner at the top: 'Amazon Mechanical Turk will be closed to new customers, effective July 30, 2026. Existing users will not be impacted by this change. More information is available here.' Below the banner the standard MTurk navigation and 'Get started with Amazon Mechanical Turk' landing are visible."
imageCredit: "Screenshot of https://www.mturk.com/ — captured 2026-07-06 via Playwright Chromium (headless, networkidle, 1280x900) · License: no license stated on the MTurk homepage; screenshot used editorially for the AIN-328 article."
canonicalURL: "https://news.lesbass.com/articles/amazon-mechanical-turk-new-customers-closed/"
sources:
  - title: "Mechanical Turk homepage — announcement banner: 'Amazon Mechanical Turk will be closed to new customers, effective July 30, 2026. Existing users will not be impacted by this change. More information is available here.'"
    url: "https://www.mturk.com/"
    date: 2026-07-06
    type: primary
  - title: "AWS SageMaker — Using the Amazon Mechanical Turk Workforce (note, effective 7/30/26): 'After careful consideration, we have made the decision to close new customer access to AWS Mechanical Turk, effective 7/30/26. Existing customers can continue to use the service as normal. AWS continues to invest in security and availability improvements for Mechanical Turk, but we do not plan to introduce new features.'"
    url: "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management-public.html"
    date: 2026-06-30
    type: primary
  - title: "AWS general maintenance services table — 'Amazon SageMaker AI – Mechanical Turk' availability change row, announcement date June 30, 2026"
    url: "https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html"
    date: 2026-06-30
    type: primary
  - title: "TechCrunch — 'Amazon will stop accepting new customers for Mechanical Turk' (Anthony Ha, 2026-07-05): secondary context, includes the 33–46% worker-LLM figure attribution to a 2023 analysis"
    url: "https://techcrunch.com/2026/07/05/amazon-will-stop-accepting-new-customers-for-mechanical-turk/"
    date: 2026-07-05
    type: secondary
  - title: "Veselovsky, Horta Ribeiro, West — 'Artificial Artificial Artificial Intelligence: Crowd Workers Widely Use Large Language Models for Text Production Tasks' (arXiv:2306.07899, 2023-06-13): 33–46% of MTurk crowd workers used LLMs on an abstract-summarization task, measured via keystroke detection and synthetic-text classification"
    url: "https://arxiv.org/abs/2306.07899"
    date: 2023-06-13
    type: primary
highRiskClaims: true
---

On 2026-07-06, [Mechanical Turk](https://www.mturk.com/) carries a banner at the top of the page: Amazon will stop accepting new customers effective **2026-07-30**, while existing customers continue to use the workforce. AWS's maintenance services table now lists "Amazon SageMaker AI – Mechanical Turk" as a 2026-06-30 availability change, and the AWS SageMaker page restates the decision in dated form: *"effective 7/30/26 … we do not plan to introduce new features."*

The 20-year-old platform that anchored the early AI data-annotation economy is not being switched off, but it has been put on life support.

## What happened

Three first-party surfaces say the same thing:

- **Mechanical Turk homepage (https://www.mturk.com/)** — the banner reads, *"Amazon Mechanical Turk will be closed to new customers, effective July 30, 2026. Existing users will not be impacted by this change."* The "more information" link points to the AWS docs page.
- **AWS SageMaker — Using the Amazon Mechanical Turk Workforce** ([docs.aws.amazon.com](https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management-public.html)) — a note dated 7/30/26 says AWS will *"close new customer access to AWS Mechanical Turk"* while existing customers keep using it; AWS will keep investing in security and availability but will not add features.
- **AWS general maintenance services table** ([docs.aws.amazon.com](https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html)) — *"Amazon SageMaker AI – Mechanical Turk"* appears in the same 2026-06-30 batch as A2I, Clarify, Debugger, GeoSpatial, Ground Truth, Model Monitor, Role Manager, and Studio Lab.

There is no Amazon press release on `press.aboutamazon.com`; the announcement lives on Amazon's own docs and product pages.

## Why it matters

Mechanical Turk taught a generation of researchers and engineers how to outsource small, human-judged tasks — bounding-box annotation, sentiment labeling, summarisation evaluation, A/B preference ratings. From 2018 it was sold as a workforce option inside SageMaker Ground Truth and A2I; the homepage still links requesters to Ground Truth and Ground Truth Plus.

Closing new-customer access signals that the open crowdsourced marketplace has been outgrown. The successor tier is vendor-managed annotation with SLAs (Scale AI, Surge, Appen, Labelbox, AWS Ground Truth Plus), enterprise data-platform contracts, synthetic data, and model-graded evaluation. None of those categories need a public 24x7 worker pool.

## The irony

In a 2023 case study, Veselovsky, Horta Ribeiro, and West reran an abstract-summarisation task on Mechanical Turk and, combining keystroke detection with synthetic-text classification, estimated that **33–46% of crowd workers used LLMs** to complete the task ([arXiv:2306.07899](https://arxiv.org/abs/2306.07899), 2023-06-13) — the most-cited number in the worker-LLM literature.

The structural irony is sharp: a platform that helped build the training data for modern language models is now being automated, on the worker side, by those same models. TechCrunch framed the closure in 2026-07-05 in the same terms ([Anthony Ha, TechCrunch](https://techcrunch.com/2026/07/05/amazon-will-stop-accepting-new-customers-for-mechanical-turk/)). The figure is a 2023 measurement of one task, not a current platform read.

## What is changing for practitioners

For teams that already route annotation through MTurk today, the immediate effect is small.

- **Ground Truth and A2I workflows** that already select the Mechanical Turk workforce continue to run.
- **AWS does not name a migration target** — no "switch to vendor workforce X" pointer, no deprecation date for the underlying ARN.
- **Vendor-managed annotation** is the implicit successor tier; the MTurk homepage itself links requesters to Ground Truth Plus.
- **New requester-side onboarding** is the visible constraint; existing accounts can keep their HITs running.

The phrasing that matters: *"we do not plan to introduce new features."* Existing customers get continuity, not a roadmap.

## What comes next for the data-annotation market

Four shifts are visible across the rest of 2026.

- **Vendor-managed annotation with SLAs** is the default for production ML pipelines — Ground Truth Plus, Scale, Surge, Appen, Labelbox.
- **Synthetic data and self-play** continue to replace a slice of human labelling for pretraining and evaluation.
- **In-house labelers** for regulated domains — health, legal, finance — keep human review on the critical path, just not on the open marketplace.
- **Model-graded evaluation** absorbs tasks that were open crowdsourced HITs a few years ago.

Mechanical Turk's niche — fast, cheap, public, ad-hoc judgement calls — is the slice being squeezed from both sides.

## Risks and caveats

- **No Amazon press release.** The announcement lives on `mturk.com` and AWS docs, not on `press.aboutamazon.com`.
- **Closed to new customers, not shut down.** The workforce continues for existing customers; calling this a "shutdown" overstates it.
- **The 33–46% worker-LLM figure is from 2023.** A 2023 measurement of an abstract-summarisation task, not a current platform read. Generalisation to less LLM-friendly HITs is open in the source paper itself.
- **TechCrunch is a secondary source** in the commissioning brief; the date, the wording, and the structural framing are anchored to Amazon's own surfaces.
- **The 2026-06-30 maintenance-table entry and the 2026-07-30 effective date are two different dates.** Keep them straight.
- **Amazon's docs note does not give a reason.** Speculating about motivation is editorialising.

## What to watch

- **An Amazon press release or AWS blog post** that formalises the change with an explicit migration path.
- **Vendor positioning** from Scale, Surge, Appen, and AWS Ground Truth Plus on capturing former MTurk requester spend.
- **Researcher statements** on what closure means for open crowdsourcing as a research tool — academic NLP papers have used MTurk for human evaluation in documented shares of ACL/EMNLP corpora.
- **The effective date itself.** 2026-07-30 is published; a slip would be the first sign the maintenance framing is being relaxed.

## Sources

- [Mechanical Turk homepage — announcement banner (2026-07-06)](https://www.mturk.com/)
- [AWS SageMaker — Using the Amazon Mechanical Turk Workforce (note dated 7/30/26, page updated 2026-06-30)](https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management-public.html)
- [AWS general maintenance services table — Amazon SageMaker AI – Mechanical Turk row (announcement date 2026-06-30)](https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html)
- [TechCrunch — "Amazon will stop accepting new customers for Mechanical Turk" (Anthony Ha, 2026-07-05)](https://techcrunch.com/2026/07/05/amazon-will-stop-accepting-new-customers-for-mechanical-turk/)
- [Veselovsky, Horta Ribeiro, West — "Artificial Artificial Artificial Intelligence: Crowd Workers Widely Use Large Language Models for Text Production Tasks" (arXiv:2306.07899, 2023-06-13)](https://arxiv.org/abs/2306.07899)
