---
title: "DeepMind RCT: AI Tutoring Boosts Math in Sierra Leone"
description: "A randomized controlled trial with 1,763 students and 12 schools in Sierra Leone shows Gemini's Guided Learning mode delivers 1.2-1.7 years of learning in eight weeks. But it's a single trial, in a single country, and the achievement gap widens."
pubDate: 2026-06-10
author: "AI Newsroom"
tags: ["research", "education", "rct", "deepmind", "gemini"]
image: "https://lh3.googleusercontent.com/5g2RQPPxqVGuOzfaYj1-8r_6B-Ytp79c9mpWXzBIrk2vUhtxZmA7bMywH41h-8b0EJAdW_K4l7kqHZlfS-QTFk8kFB5MA2bgxZ4hxbuAiOuDIn3ohA=w1200-h630-n-nu-rw"
imageAlt: "Gemini guided learning RCT in Sierra Leone social card"
imageCredit: "Image: Google DeepMind blog / Sierra Leone RCT announcement (June 9, 2026)"
sources:
  - title: "Measuring the impact of learning with AI in Sierra Leone and beyond (DeepMind)"
    url: "https://deepmind.google/blog/measuring-the-impact-of-learning-with-ai-in-sierra-leone-and-beyond/"
    date: 2026-06-09
    type: primary
  - title: "LearnLM Sierra Leone technical report (PDF)"
    url: "https://storage.googleapis.com/deepmind-media/LearnLM/learnLM_sierraleone_may26.pdf"
    date: 2026-05-01
    type: primary
  - title: "Measuring the impact of AI on teaching and learning (Google blog)"
    url: "https://blog.google/products-and-platforms/products/education/measuring-the-impact-of-ai-on-teaching-and-learning/"
    date: 2026-06-09
    type: primary
  - title: "The Five Percent Problem (Education Next)"
    url: "https://www.educationnext.org/5-percent-problem-online-mathematics-programs-may-benefit-most-kids-who-need-it-least/"
    date: 2018-08-20
    type: secondary
  - title: "Fab AI"
    url: "https://www.fab-ai.org/"
    date: 2026-06-09
    type: secondary
highRiskClaims: true
---

On June 9, 2026, Google DeepMind and the nonprofit [Fab AI](https://www.fab-ai.org/) published results from the first pre-registered randomized controlled trial (RCT) of a generative AI tutor in a low-income school system. The trial, conducted in 12 lower secondary schools in the Port Loko district of Sierra Leone with 1,763 students, compared classes using Gemini's *Guided Learning* mode against control classes continuing traditional instruction for eight weeks.

The headline result: **+0.258 standard deviations** in math scores favoring the treatment group — an effect DeepMind translates, based on typical learning benchmarks in low- and middle-income countries, into **1.2-1.7 years of schooling progress compressed into eight weeks**. In classes where teachers hit the 12-hour usage target, the effect rises to **+0.38 SD**, equivalent to **1.8-2.5 years** of learning.

It's not definitive proof, but it's the most rigorous evidence published to date on generative AI tutoring in a real, resource-constrained school setting. And it says three useful things — plus one that shouldn't be ignored.

## What was measured (and how)

The study is **pre-registered**: protocol, hypotheses, and analysis were defined *before* data collection, reducing the risk of cherry-picking results. The sample is large by academic edtech standards (1,763 students, 48 math classes across seventh and eighth grade), and randomization occurred at the class level to avoid contamination.

The primary endpoint is change in externally validated math tests, covering topics like fractions, exponents, and prime numbers. The control group continued regular instruction without AI. Eight weeks is a short window, but it's already longer than most short experiments in the sector.

## Engagement is the story, not learning gain

The most striking number isn't the +0.258 SD itself — it's that **69% of students** hit or exceeded the usage target, with an average of 15 hours of Gemini per student. That's an order of magnitude higher than the so-called ["Five Percent Problem"](https://www.educationnext.org/5-percent-problem-online-mathematics-programs-may-benefit-most-kids-who-need-it-least/), the established reference describing how most digital educational programs see voluntary adoption rates around 5% (Education Next, 2018).

But caveat: engagement isn't learning. The effect on scores is measured by pre/post tests, not by hours of use. The fact that 12 hours of use produces more marked effects suggests a dose-response relationship, but it's a correlation, not proof that *more hours cause more learning*. DeepMind doesn't claim otherwise, and the article shouldn't either.

## The interactions tell another piece of the story

Across over **113,000 analyzed conversations**, **91.4%** of interactions were dedicated to building conceptual understanding, not seeking answers. Gemini asked scaffolding questions in **76%** of messages, and provided direct answers only **2%** of the time. Over the eight weeks, skill-building queries rose from **68% to 90%**, while answer-seeking queries dropped from **25% to 10%**.

These numbers describe a disciplined use of the tutor — not a chatbot that "explains homework." They're also why the results aren't automatically exportable to any language model used as a tutor: the treatment here is *Guided Learning*, a specific pedagogical mode, not "Gemini in general."

## What DeepMind says that often goes unreported

The blog and report aren't triumphalist. The honest point the authors themselves put front and center is the **"achievement gap"**: students who entered the trial with stronger math skills benefited more. That's exactly the opposite of what compensatory tools need, and it's the main argument against an uncritical reading of the result.

The authors say it directly: "to offer tools that deliver the strongest gains for the students who need it most." Reporting this caveat isn't excessive caution — it's the opposite: the evidence holds up better when its counter-limit is explicit.

## Three things the study *doesn't* tell us

1. **It doesn't tell us that 12 hours is the right dose for every context.** The 12-hour target is a protocol choice, not an optimization learned from the trial.
2. **It doesn't tell us if the effect persists.** Eight weeks doesn't test long-term retention, and no follow-up measure has been reported yet.
3. **It doesn't tell us if *any* well-designed Socratic tutor would produce similar results.** The treatment is *Gemini Guided Learning*, not "generative AI in the classroom." The gap between the two is exactly the open question that further RCTs — announced by DeepMind — will need to address.

## What to do with this study (for builders, educators, funders)

- **For edtech product builders:** the evidence is on a *pedagogical mode* (Socratic scaffolding with explicit usage targets), not on a model. Replicating the setting — short teacher onboarding protocol, measurable usage targets, external evaluation — is more relevant than replicating the underlying model.
- **For school systems in low-income countries:** the combination "teacher-centered + AI tutoring scaffolded + usage target" is a tested, measurable architecture. A local pilot is worth trying, not a bulk purchase.
- **For funders:** the technical report and [RCT playbook](https://goo.gle/LearnLM-SierraLeone-Playbook) released by DeepMind are an unusually open starting point. Funding independent replications in other countries is the highest-return information lever.

## Verdict

A pre-registered RCT, in a single country, eight weeks, with a large sample and a translation into "school years" that comes from the authors, not a direct measurement. The effect is real and relevant. The risk is reading it as a verdict rather than the first solid data point in a series that still needs to arrive.

> "We must also rigorously study the results of our innovations…I am therefore delighted that we now have strong evidence that carefully designed AI can help improve learning outcomes in support of our many hard-working teachers."

— Conrad Sackey, Sierra Leone Minister of Basic and Senior Secondary Education, DeepMind blog, June 9, 2026.
