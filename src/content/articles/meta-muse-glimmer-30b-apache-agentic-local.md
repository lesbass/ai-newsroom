---
title: "Meta releases Muse Glimmer 30B — an Apache-2.0 agentic multimodal model for 24GB consumer GPUs"
description: "Meta's Muse Glimmer is a 30B Apache-2.0 multimodal model distilled from Muse Spark that fits a 24GB consumer GPU with 4-bit quantization. Architecture, benchmarks, and DFlash."
pubDate: 2026-08-12
author: AI Newsroom
tags:
  - meta
  - muse-glimmer
  - open-weights
  - multimodal
  - agentic-ai
  - local-llm
image: /images/articles/meta-muse-glimmer-30b-apache-agentic-local/hero.png
imageAlt: "Generated editorial diagram of Muse Glimmer 30B architecture: perception encoder, text decoder, and DFlash drafter (AI-generated, AI Newsroom)"
imageCredit: "Generated editorial image · Model/tool: PIL · Disclosure: AI-generated, not source evidence"
---

Meta Superintelligence Labs released Muse Glimmer on August 10, 2026: a 30‑billion‑parameter multimodal agentic model under the Apache‑2.0 license. The weights, GGUF k‑quants, and a DFlash speculative‑decoding drafter are available on Hugging Face the same day. The model is explicitly distilled from the closed‑weights Muse Spark and designed to run on a single consumer GPU.

## What happened

- **Release date:** August 10, 2026  
- **License:** Apache‑2.0  
- **Parameter count:** 29.6 B total (~2 B ViT‑style perception encoder + ~28 B text decoder)  
- **Context length:** 131 072+ tokens  
- **Artifacts:** Full BF16 weights, GGUF k‑quants (17 GB and 19.7 GB), perception encoder, DFlash drafter  

The model is hosted on Hugging Face at `meta-models/Muse-Glimmer-30B`. A separate GGUF repository (`meta-models/Muse-Glimmer-30B-GGUF`) provides quantized builds for llama.cpp.

## Why it matters

A 30 B model that fits a 24/32 GB consumer GPU changes the local‑agent cost model. With 4‑bit quantization the language model shrinks to under 20 GB, leaving headroom for the perception encoder, KV cache, and the DFlash drafter inside a 24 GB envelope. That means a single RTX 4090/5090‑class card (or an Apple‑Silicon Mac with enough unified memory) can host a multimodal agent without cloud APIs.

Combined with the bundled DFlash speculative decoder, this is the first Apache‑2.0 agentic multimodal model at this scale aimed at local deployment rather than API‑only access.

## Architecture in plain terms

Muse Glimmer is a dense transformer (not MoE), so every parameter activates on every token. The split is:

- **Perception encoder:** ~1.8 B‑parameter ViT‑G/14 that handles images and video frames.  
- **Text decoder:** 28 B‑parameter dense causal transformer with hybrid attention (three sliding‑window layers + one full‑attention layer, repeated 13 times).  
- **DFlash drafter:** A separate, smaller draft model trained to predict the decoder’s output blocks, enabling speculative decoding that verifies a batch of tokens at once.

The architecture details are documented in the Hugging Face model card and the Meta methodology report.

## Benchmarks — Meta‑reported, with caveats

Meta’s blog and the HF model card publish a comparison table against Gemma4‑31B and Qwen3.6‑27B. Headline numbers (all Meta self‑reported):

| Benchmark | Muse Glimmer‑30B | Gemma4‑31B | Qwen3.6‑27B |
|-----------|------------------|------------|-------------|
| SWE‑Bench Verified | **76.0** | 66.6 | 77.2 |
| SWE‑Bench Pro | **51.2** | 36.9 | 50.2 |
| MCP Atlas | **75.5** | 54.2 | 62.5 |
| GAIA2 | **43.3** | 36.4 | 40.0 |

Meta says the model “performs strongly for its size class on several widely used LLM benchmarks” — not “all.” No independent reproduction exists at time of writing.

## Practical implications

The model drops into the same harness surface as Llama‑class open weights. Day‑0 support is available in **transformers, llama.cpp, and vLLM** (Hugging Face shipped day‑0 integrations; Inference Endpoints too). Ollama, LM Studio, Unsloth, and SGLang are listed as “in coming days” per Meta.

To try it locally:

```bash
# Install llama.cpp (build ≥10353 required)
curl -LsSf https://llama.app/install.sh | sh

# Download the 17 GB quantized weights + perception encoder
pip install huggingface_hub
hf download meta-models/Muse-Glimmer-30B-GGUF \
    --local-dir Muse-Glimmer-30B-GGUF \
    --include "muse-glimmer-30B-kquant-17gb.gguf" \
    --include "mmproj-kquant.gguf"

# Start the server with DFlash drafter
llama serve -hf meta-models/Muse-Glimmer-30B-GGUF \
    --spec-type draft-dflash --spec-draft-n-max 15
```

The 4‑bit quantized envelope stays under 20 GB, fitting a 24 GB GPU with room for the KV cache and perception encoder.

## Risks and caveats

- All benchmark numbers are **Meta self‑reported** (Meta AI Research blog, 2026‑08‑10; HF model card last modified 2026‑08‑11). No independent re‑runs at publication time.
- The Meta blog text says Muse Glimmer “performs strongly for its size class on several widely used LLM benchmarks,” not “all.” The article does not paraphrase that as “best in class.”
- **Throughput numbers** (74.9 → 233.4 tok/s on RTX 5090) are vendor‑measured with the DFlash drafter. Without DFlash, throughput is the un‑drafted number.
- **Day‑0 inference surface is partial.** transformers, llama.cpp, and vLLM are day‑0 (per Hugging Face). Ollama, LM Studio, Unsloth, and SGLang are “in coming days” per Meta.
- The Muse Glimmer weights are a **distillation** of Muse Spark. The HF model card and methodology report do not list distillation‑specific caveats beyond the lineage statement.
- **Distillation lineage matters for license interpretation.** Muse Spark is closed‑weights; the distillation output is Apache‑2.0 per Meta. The article notes the lineage without implying any contamination.
- **No security / jailbreak claim.** Meta’s preparedness evaluation rates Muse Glimmer at “Moderate or lower” risk across chem/bio, cyber, and loss‑of‑control, but does not publish jailbreak / prompt‑injection results.

## What to watch

- Independent reproductions of SWE‑Bench Verified / MCP Atlas / GAIA2.
- Follow‑through on Ollama, LM Studio, and Unsloth day‑0 support.
- Whether Meta ships a multimodal long‑context version or a smaller (≤8 B) agentic variant distilled from Muse Spark.
- Whether other agent harnesses (Hermes, OpenClaw, Claude Code, Codex) add Muse Glimmer as a first‑class backend.
- Whether DFlash is open‑sourced as a reusable speculative‑decoding framework for other decoders.

## Sources

| Source | URL | Backs up | Accessed |
|--------|-----|----------|----------|
| Meta AI Research — “Introducing Muse Glimmer” | https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model | Release date (2026‑08‑10), Apache‑2.0 framing, “leading on several” benchmark phrasing, RTX 5090 throughput (74.9 → 233.4 tok/s with DFlash drafter), day‑0 inference surface | 2026‑08‑12 |
| Meta AI Research — Muse Glimmer methodology report | https://research.meta.ai/static/muse-glimmer-methodology | Distillation from Muse Spark, training / post‑training methodology, safety / evaluation notes | 2026‑08‑12 |
| Hugging Face model card — Muse‑Glimmer‑30B | https://huggingface.co/meta-models/Muse-Glimmer-30B | Parameter count (29.6 B / 30 B), architecture split (~2 B ViT perception + ~28 B text decoder), context length (131 K+), Apache‑2.0 license declaration, benchmark rows, DFlash drafter pairing | 2026‑08‑12 |
| Hugging Face blog — Meta Muse Glimmer | https://huggingface.co/blog/muse-glimmer | Independent confirmation of release framing, day‑0 vs “in coming days” inference surface | 2026‑08‑12 |
| Hugging Face — Muse Glimmer GGUF repo | https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF | GGUF k‑quant availability, quantization envelope (under 20 GB at 4‑bit) | 2026‑08‑12 |