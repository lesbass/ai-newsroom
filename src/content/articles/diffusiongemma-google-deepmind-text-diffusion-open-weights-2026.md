---
title: "DiffusionGemma: 1,000+ tokens/sec open-weights text gen"
description: "Google DeepMind's June 10, 2026 release: a 26B/3.8B text-diffusion model denoising 256 tokens in parallel; ~4x faster than AR on a single H100, Apache 2.0, explicitly experimental."
pubDate: 2026-06-15
author: "AI Newsroom"
tags: ["google-deepmind", "gemma", "diffusiongemma", "text-diffusion", "open-weights", "apache-2-0", "moe", "h100", "blackwell", "vllm", "hugging-face", "unsloth", "tensorrt-llm", "experimental", "high-risk-claim"]
image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Diffusion_Gemma_Social.width-1300.png"
imageAlt: "DiffusionGemma social card showing the text-diffusion approach with a Gemma 4 base and parallel token generation"
imageCredit: "Image: Google blog / DiffusionGemma announcement (June 10, 2026)"
sources:
  - title: "Google blog — 'DiffusionGemma: 4x faster text generation' (Brendan O'Donoghue, Sebastian Flennerhag, June 10, 2026)"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/diffusion-gemma-faster-text-generation/"
    date: 2026-06-10
    type: primary
  - title: "Google DeepMind — DiffusionGemma model page"
    url: "https://deepmind.google/models/gemma/diffusiongemma/"
    date: 2026-06-10
    type: primary
  - title: "NVIDIA blog — 'NVIDIA Accelerates Google DeepMind's DiffusionGemma for Local AI' (Michael Fukuyama, June 10, 2026)"
    url: "https://blogs.nvidia.com/blog/rtx-ai-garage-local-gemma-diffusion/"
    date: 2026-06-10
    type: primary
  - title: "Hugging Face — google/diffusiongemma-26B-A4B-it model card (Apache 2.0)"
    url: "https://huggingface.co/google/diffusiongemma-26B-A4B-it"
    date: 2026-06-10
    type: primary
  - title: "SiliconANGLE — 'Google open-sources speedy DiffusionGemma text diffusion model' (Maria Deutscher, June 10, 2026)"
    url: "https://siliconangle.com/2026/06/10/google-open-sources-speedy-diffusiongemma-text-diffusion-model/"
    date: 2026-06-10
    type: secondary
  - title: "Hugging Face — nvidia/diffusiongemma-26B-A4B-it-NVFP4 (Blackwell-optimized NVFP4 build)"
    url: "https://huggingface.co/nvidia/diffusiongemma-26B-A4B-it-NVFP4"
    date: 2026-06-10
    type: secondary
  - title: "Hugging Face — RedHatAI/diffusiongemma-26b-a4b-it (vLLM integration)"
    url: "https://huggingface.co/collections/RedHatAI/diffusiongemma-26b-a4b-it"
    date: 2026-06-10
    type: secondary
highRiskClaims: true
---

On **June 10, 2026**, Google DeepMind released **DiffusionGemma**, an open-weights model that abandons the single-token autoregressive (AR) pattern and generates text via *diffusion*: it denoises **256-token blocks in parallel**, reaching **1,000+ tokens/sec on a single H100** — roughly **4x faster** than an equivalent AR model in single-user mode ([Google blog, June 10, 2026](https://blog.google/innovation-and-ai/technology/developers-tools/diffusion-gemma-faster-text-generation/); [NVIDIA blog, June 10, 2026](https://blogs.nvidia.com/blog/rtx-ai-garage-local-gemma-diffusion/)). It's a **26B total / 3.8B active** MoE based on **Gemma 4**, released under **Apache 2.0** with day-one support in vLLM, Hugging Face Transformers, Unsloth, NVIDIA NeMo, and TensorRT-LLM with **NVFP4** on Blackwell GPUs. Google explicitly labels it *"experimental"*: quality is below Gemma 4 AR — speed is the point, not peak quality.

## What was released

The post on Google's official blog, authored by **Brendan O'Donoghue** and **Sebastian Flennerhag**, frames DiffusionGemma as an *"experimental open model that explores text diffusion, an exceptionally fast approach to text generation."* Weights are on **Hugging Face** under `google/diffusiongemma-26B-A4B-it` with **apache-2.0**. A Blackwell-optimized **NVFP4** build is published by NVIDIA.

The architecture inherits the **Gemma 4 26B A4B** MoE backbone (8 of 128 experts active, 25.2B total / 3.8B active per step) and adds a *diffusion head* that denoises 256-token blocks in parallel. Attention is no longer purely *causal* — every token attends to all others. Context reaches **256K tokens** with a 1,024-token sliding window. Inputs are multimodal (text, images, video); outputs are text-only.

## Speed and benchmarks

| Hardware | Tokens/sec | Notes |
|---|---|---|
| NVIDIA H100 (single, FP8, low batch) | **1,000+** | HF card: "exceeding 1100 tokens/sec" |
| NVIDIA RTX 5090 (quantized) | **700+** | Google blog |
| NVIDIA DGX Station | 2,000 | NVIDIA blog |
| NVIDIA DGX Spark (GB10) | 150 | NVIDIA blog |

The model card compares DiffusionGemma 26B A4B (instruction-tuned, Entropy Bound sampler) against Gemma 4 26B A4B AR — the deltas are honest: **−5.0 pp on MMLU Pro, −19.2 pp on AIME 2026, −8.0 pp on LiveCodeBench v6, −289 ELO on Codeforces, −12.1 pp on MRCR v2, +0.170 (worse) on OmniDocBench 1.5**. The single positive delta is **HLE no tools (+2.3 pp)** at low absolute scores. Google frames the speedup as *"up to 4x faster"*: *"The throughput advantage is strongest at low-to-medium batch sizes on a single accelerator."*

## Why it matters

- **First open-weights text-diffusion at this scale.** The text-diffusion frontier was proprietary (Gemini Diffusion, limited API) or smaller open models. DiffusionGemma is the first 26B open-weights release with measured quality, distributed inference support, and TensorRT-LLM NVFP4 builds.
- **Latency calculation shifts for agentic tools and editors.** In single-user mode, AR is *memory-bandwidth-bound* (GPU waits for the next token). Text-diffusion shifts the bottleneck to *compute-bound*: *"DiffusionGemma's design plays directly to the GPU's strengths."* For code infilling, time-to-block (256 tokens) is an order of magnitude lower.
- **Bidirectional attention enables non-linear patterns AR can't handle.** Every token sees all others contextually. Unsloth's Sudoku tutorial demonstrates the point: AR struggles because each token depends on future tokens; diffusion doesn't.
- **Fits on consumer GPUs when quantized.** *"No cloud, no per-token cost."* Google blog says **18 GB VRAM** fits; DeepMind page says **24 GB** for an RTX 5090 / 4090. Measure on your own setup.

## Day-one ecosystem

Integrations: **Hugging Face Transformers** (`DiffusionGemmaForBlockDiffusion`), **vLLM** (day-zero, Red Hat AI support), **MLX**, **Unsloth**, **NVIDIA NeMo**, and **TensorRT-LLM** with **NVFP4** on Blackwell. Cloud paths: **Gemini Enterprise Model Garden** and **NVIDIA NIM**. *llama.cpp* support is *"coming soon"* — that would open Mac.

## Practical advice

**1. IDE / editor completion teams.** Profile latency to *first block* (256 tokens), not *first token*. Bidirectional attention refines tokens AR would have frozen — useful for non-linear edits.
**2. Agent harness builders.** Read the [`DiffusionGemmaForBlockDiffusion`](https://huggingface.co/google/diffusiongemma-26B-A4B-it) implementation and vLLM day-zero PR. Block-autoregressive decoding changes the KV-cache story.
**3. Benchmark evaluators.** Re-run the deltas independently — contribution is *speed*, not a new SOTA. Deltas vs Gemma 4 AR: **−5.0 MMLU Pro, −19.2 AIME, −8.0 LiveCodeBench, −289 ELO Codeforces, −12.1 MRCR v2, +0.170 OmniDocBench, +2.3 HLE** (pp).
**4. Local inference users.** Measure VRAM: 18 GB (Google) vs 24 GB (DeepMind) — difference is quantization and context length.
**5. Cloud serving architects.** Google: speedup *"collapses in high-QPS cloud serving."* Use DiffusionGemma for low-to-medium batch single-user; keep AR for batched serving.

## What to watch

1. **Independent benchmarks on SWE-bench, LiveCodeBench, GPQA, AIME.** Numbers above are from Google's model card, not independent runs.
2. **vLLM and Hugging Face TGI serving stability** for block-autoregressive decoding with KV-cache management.
3. **Blackwell NVFP4 quality samples.** NVIDIA calls it *"near-lossless"* — measure on your workload before production.
4. **llama.cpp support** for non-NVIDIA hardware.
5. **Fine-tuning lift on vertical use cases** (code infilling, structured extraction, IDE completion).
6. **Independent safety benchmarks** (HarmBench, AdvBench, third-party red teams).

## Risks and caveats

- **"Experimental" is the load-bearing word.** Google labels the model as experimental in both the blog title and the DeepMind product page. *"For applications that demand maximum quality, we recommend deploying standard Gemma 4."*
- **Quality is systematically below Gemma 4 AR.** −19.2 pp on AIME 2026, −289 ELO on Codeforces, −12.1 pp on long-context.
- **Speed advantage collapses in high-QPS cloud serving.** Google: *"In high-QPS cloud serving, autoregressive models can be deployed to saturate compute efficiently, so DiffusionGemma's parallel decoding offers diminishing returns."*
- **The 18 GB vs 24 GB VRAM discrepancy** likely depends on quantization. Measure on your own setup.
- **MoE complicates deployment.** Serving requires loading all 26B params or dynamic expert offloading.
- **No Apple Silicon claim.** Unified-memory Macs are memory-bandwidth-bound, so may not see the same acceleration.

## Verdict

On **June 10, 2026**, Google DeepMind released **DiffusionGemma**: 26B/3.8B active, Gemma 4 MoE, 256 tokens denoised in parallel, **1,000+ tokens/sec on a single H100**, **~4x faster** than equivalent AR in single-user mode, **Apache 2.0**, day-one support in vLLM, Hugging Face, Unsloth, NeMo, TensorRT-LLM with NVFP4 on Blackwell. It's the **first open-weights text-diffusion model at this scale** — Google labels it *"experimental"*, with quality systematically below Gemma 4 AR. **Where end-to-end latency matters** — IDE completion, code infilling, single-user agent loops, local inference on consumer GPUs — DiffusionGemma is a serious candidate.

## Sources

- [Google blog — *DiffusionGemma: 4x faster text generation* (June 10, 2026)](https://blog.google/innovation-and-ai/technology/developers-tools/diffusion-gemma-faster-text-generation/)
- [Google DeepMind — DiffusionGemma model page (June 10, 2026)](https://deepmind.google/models/gemma/diffusiongemma/)
- [NVIDIA blog — *NVIDIA Accelerates Google DeepMind's DiffusionGemma for Local AI* (June 10, 2026)](https://blogs.nvidia.com/blog/rtx-ai-garage-local-gemma-diffusion/)
- [Hugging Face — google/diffusiongemma-26B-A4B-it model card (Apache 2.0, June 10, 2026)](https://huggingface.co/google/diffusiongemma-26B-A4B-it)
- [SiliconANGLE — *Google open-sources speedy DiffusionGemma text diffusion model* (June 10, 2026)](https://siliconangle.com/2026/06/10/google-open-sources-speedy-diffusiongemma-text-diffusion-model/)
- [Hugging Face — nvidia/diffusiongemma-26B-A4B-it-NVFP4 (June 10, 2026)](https://huggingface.co/nvidia/diffusiongemma-26B-A4B-it-NVFP4)
- [Hugging Face — RedHatAI/diffusiongemma-26b-a4b-it collection (June 10, 2026)](https://huggingface.co/collections/RedHatAI/diffusiongemma-26b-a4b-it)
