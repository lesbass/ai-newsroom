---
title: "EmbeddingGemma 2: on-device multimodal embeddings under Apache 2.0"
description: "Google DeepMind's 740M open-weight EmbeddingGemma 2 maps text, images, video, and audio into one shared 768-dimensional vector space for local search and RAG."
pubDate: 2026-10-07
author: "AI Newsroom"
tags: ["google", "google-deepmind", "embeddinggemma", "embeddings", "multimodal", "on-device", "rag", "apache-2.0", "gemma-4", "developer-tools"]
image: "/images/articles/google-embeddinggemma-2-on-device-multimodal-2026-10/hero.png"
imageAlt: "Two-panel screenshot: the Google blog headline 'EmbeddingGemma 2: an open, lightweight multimodal embedding model' above the EmbeddingGemma 2 banner, and the Hugging Face model card table 'Evaluation Results with Vector Truncation' comparing 768d, 512d, 256d, and 128d vectors."
imageCredit: "Sources: https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/ and https://huggingface.co/google/embeddinggemma-2 · Capture date: 2026-10-07 · Credit: Google DeepMind · License: Apache 2.0 for the Hugging Face weights; blog and model-card screenshots used under fair use for editorial coverage"
canonicalURL: "https://news.lesbass.com/articles/google-embeddinggemma-2-on-device-multimodal-2026-10/"
sources:
  - title: "Google — EmbeddingGemma 2: an open, lightweight multimodal embedding model (announcement, 2026-10-06)"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/"
    date: 2026-10-06
    type: primary
  - title: "Google — EmbeddingGemma 2 model card (2026-10-06)"
    url: "https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2"
    date: 2026-10-06
    type: primary
  - title: "Google AI Edge — Bring multimodal semantic search to the edge with EmbeddingGemma 2 (developer blog, 2026-10-06)"
    url: "https://developers.googleblog.com/google-ai-edge-with-embeddinggemma-2/"
    date: 2026-10-06
    type: primary
  - title: "Hugging Face — google/embeddinggemma-2 model card (Apache 2.0, checked 2026-10-07)"
    url: "https://huggingface.co/google/embeddinggemma-2"
    date: 2026-10-07
    type: primary
  - title: "Kaggle — google/embeddinggemma-2 (Apache 2.0 weights, checked 2026-10-07)"
    url: "https://www.kaggle.com/models/google/embeddinggemma-2"
    date: 2026-10-07
    type: primary
highRiskClaims: false
---

Google DeepMind released EmbeddingGemma 2 on October 6, an open-weight model that maps text, images, video frames, and audio into one shared 768-dimensional vector space. According to Google, it has 740 million total parameters, ships under Apache 2.0, and needs about 191 MB of active RAM for text-only work with quantization on a Pixel 11 Pro. Weights are on Hugging Face and Kaggle, with integrations from `sentence-transformers` and `llama.cpp` to LiteRT and MediaPipe.

![Two-panel screenshot of the EmbeddingGemma 2 Google blog headline and the Hugging Face model card vector-truncation table](/images/articles/google-embeddinggemma-2-on-device-multimodal-2026-10/hero.png)

*Composite screenshot: Google blog headline and hero (top) and the Hugging Face model card vector-truncation table (bottom). Source: blog.google and huggingface.co · Capture date: 2026-10-07 · Credit: Google DeepMind · Apache 2.0 weights; screenshots used editorially.*

## What happened

Google's announcement describes EmbeddingGemma 2 as a model that "natively maps combinations of text, images, audio, and video into a unified embedding space," replacing pipelines that chain separate captioning, speech-to-text, and text-embedding models ([Google announcement](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/), 2026-10-06). It is built on the Gemma 4 architecture.

The model is modular ([model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2), [Hugging Face](https://huggingface.co/google/embeddinggemma-2)):

| Component | Parameters |
|---|---|
| Text backbone | 270M (130M transformer + 140M embedder) |
| Vision encoder (optional) | 170M |
| Audio encoder (optional) | 300M |
| Total, full multimodal | 740M |

Google reports two quantized footprints on a Pixel 11 Pro: about 191 MB active RAM for text-only and about 567 MB for the full multimodal model — with quantization, not full precision ([Google announcement](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/)).

An 8,192-token context window — four times EmbeddingGemma 1 — holds about 5.5 minutes of audio, 29 images, or 58 video frames. Matryoshka Representation Learning (MRL) truncates the 768-dimensional output to 512, 256, or 128 dimensions; Google cites up to 6x storage reduction, and the AI Edge blog up to 8x ([announcement](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/), [AI Edge](https://developers.googleblog.com/google-ai-edge-with-embeddinggemma-2/)).

Google's headline quality number is code retrieval: MTEB Code (v1) rises from 68.76 for EmbeddingGemma 1 to 78.68, a 9.92-point gain. The model card reports the full set ([model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2)):

| Benchmark | Metric | EmbeddingGemma 2 | EmbeddingGemma 1 |
|---|---|---|---|
| MTEB multilingual v2 | Mean(Task) | 61.36 | 61.15 |
| MTEB code v1 | NDCG@10 | 78.68 | 68.76 |
| MIEB lite | Mean(TaskType) | 64.64 | — |
| MMEB v2 Image | Hit@1 | 57.28 | — |
| MMEB v2 VisDoc | NDCG@5 | 67.84 | — |
| MMEB v2 Video | Hit@1 | 50.67 | — |
| MSEB Retrieval | MRR@10 | 69.54 | — |
| MAEB | Mean(Task) | 49.39 | — |

## Why it matters

The practical change is index consolidation: one index holds and cross-queries text, images, and audio, so teams stop maintaining separate text and vision retrieval stacks for local search ([model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2)). The same model can also index a codebase for semantic code search and coding-agent retrieval ([announcement](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/)).

## Practical implications

- **On-device app developers** can use one model for privacy-first RAG, search, clustering, and classification without cloud APIs. A text-only app loads just the 270M backbone.
- **Agent platform engineers** can build offline retrieval. Google says: "When paired with generative models such as Gemma 4, EmbeddingGemma 2 enables on-device RAG pipelines." It shares Gemma 4's text tokenizer and audio encoder.
- **Builder and tool authors** can integrate through transformers, `sentence-transformers`, MLX, vLLM, `llama.cpp`, SGLang, Ollama, LMStudio, transformers.js/WebGPU, and Qdrant, or use LiteRT and MediaPipe Tasks for turnkey on-device embeddings.

For local vector stores, MRL shows where truncation is cheap and where it is not ([Hugging Face](https://huggingface.co/google/embeddinggemma-2)):

| Output dim | Compression | MTEB code v1 | MTEB multilingual v2 | MIEB lite |
|---|---|---|---|---|
| 768d (full) | 1:1 | 78.68 | 61.36 | 64.64 |
| 512d | 1:1.5 | 77.24 | 61.17 | 64.32 |
| 256d | 1:3 | 76.18 | 60.41 | 63.13 |
| 128d | 1:6 | 71.41 | 57.89 | 59.06 |

## Risks and caveats

- **Vendor-reported numbers.** Parameters, dimensions, latency, and benchmarks come from Google, and the published benchmarks use the full-precision checkpoint, not the quantized phone runtime.
- **"Best-in-class" is positioning.** Google's "leading scores among sub-1B multimodal embedders for its size" claim covers MTEB Code and MAEB, with no published comparator table and only Google's own full-precision runs.
- **MRL cost.** Quality is near-lossless to 256 dimensions, but 128 dimensions "degrades multimodal quality substantially" and suits text-only workloads.
- **Precision trap.** Run inference in bfloat16 or float32; the card warns that float16 returns NaN or silently degraded embeddings.
- **No safety tuning.** The model card states it is a pre-trained embedding model without post-training alignment or output-level moderation.

## What to watch

- Whether ML Kit for Android ("in the coming weeks") and Model Garden ("coming soon") get dated general availability.
- Whether independent evaluations reproduce the 9.92-point MTEB Code gain, given Google's runs are self-reported.
- How quickly the listed runtimes and Qdrant ship tested EmbeddingGemma 2 support, and whether the modular footprint holds in real memory-constrained deployments.

## Sources

| # | Publisher | Title | Date | URL |
|---|---|---|---|---|
| 1 | Google | EmbeddingGemma 2: an open, lightweight multimodal embedding model | 2026-10-06 | https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/ |
| 2 | Google | EmbeddingGemma 2 model card | 2026-10-06 | https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2 |
| 3 | Google AI Edge | Bring multimodal semantic search to the edge with EmbeddingGemma 2 | 2026-10-06 | https://developers.googleblog.com/google-ai-edge-with-embeddinggemma-2/ |
| 4 | Hugging Face | google/embeddinggemma-2 model card (Apache 2.0) | checked 2026-10-07 | https://huggingface.co/google/embeddinggemma-2 |
| 5 | Kaggle | google/embeddinggemma-2 (Apache 2.0 weights) | checked 2026-10-07 | https://www.kaggle.com/models/google/embeddinggemma-2 |
