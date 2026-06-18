---
title: "x86 ACE v1: AI Compute Extensions specification released"
description: "On June 15, 2026, the x86 Ecosystem Advisory Group — led by Intel and AMD, with Google, Microsoft, Meta, Broadcom, Dell, HPE, HP Inc., Lenovo, Oracle, Red Hat, Adobe, and Nutanix — published the AI Compute Extensions (ACE) v1 specification, defining new x86 ISA extensions for AI acceleration. ACE adds a matrix-multiply tile architecture, a dedicated register file, data-movement and format-conversion primitives, and system-management state, all designed to integrate with the existing AVX/AVX10 vector pipeline. The spec page is dated 2026-06-15 and a companion white paper was published 2026-04-27. No Intel or AMD silicon has been announced under the ACE name as of 2026-06-18; performance claims in the white paper are projections, not benchmarks; v1 is reduced-precision-first; and the EAG is a vendor consortium, not an independent standards body."
pubDate: 2026-06-18
author: "AI Newsroom"
tags: ["x86", "ace", "ai-compute-extensions", "intel", "amd", "avx10", "instruction-set", "matrix-multiplication", "inference", "cpu-acceleration", "x86-ecosystem-advisory-group", "specification", "white-paper"]
sources:
  - title: "x86 Ecosystem Advisory Group — 'AI Compute Extensions (ACE) Specification' (resource page, June 15, 2026)"
    url: "https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/"
    date: 2026-06-15
    type: primary
  - title: "x86 Ecosystem Advisory Group — 'AI Compute Extensions (ACE) v1 Specification' (PDF, public, dated January 15 baseline)"
    url: "https://x86ecosystem.org/wp-content/uploads/2026/06/ACE_v1_Specification_public_1_15.pdf"
    date: 2026-06-15
    type: primary
  - title: "x86 Ecosystem Advisory Group — 'The AI Compute Extensions (ACE) for x86' (white paper page, April 27, 2026)"
    url: "https://x86ecosystem.org/resource/ace-white-paper/"
    date: 2026-04-27
    type: primary
  - title: "x86 Ecosystem Advisory Group — 'The AI Compute Extensions (ACE) for x86' (white paper PDF)"
    url: "https://x86ecosystem.org/wp-content/uploads/2026/03/ACE-Whitepaper-v1.pdf"
    date: 2026-04-27
    type: primary
  - title: "x86 Ecosystem Advisory Group — 'Members'"
    url: "https://x86ecosystem.org/members/"
    date: 2026-06-18
    type: primary
  - title: "x86 Ecosystem Advisory Group — 'About' (consortium description)"
    url: "https://x86ecosystem.org/about/"
    date: 2026-06-18
    type: primary
  - title: "x86 Ecosystem Advisory Group — 'Resources' (index of all published specifications and white papers)"
    url: "https://x86ecosystem.org/resources/"
    date: 2026-06-18
    type: primary
highRiskClaims: false
---

On **June 15, 2026**, the **x86 Ecosystem Advisory Group (EAG)** published the **AI Compute Extensions (ACE) v1 specification** — the first public, vendor-neutral definition of an x86 instruction-set extension dedicated to AI matrix acceleration. The EAG is led by Intel and AMD and its member list includes Google, Microsoft, Meta, Broadcom, Dell, HPE, HP Inc., Lenovo, Oracle, Red Hat, Adobe, and Nutanix, plus two individual "Luminaries" (Linus Torvalds, Tim Sweeney) ([x86 EAG — Members, June 18, 2026](https://x86ecosystem.org/members/)). A companion white paper, *The AI Compute Extensions (ACE) for x86*, was published on the EAG site on **April 27, 2026** ([x86 EAG, April 27, 2026](https://x86ecosystem.org/resource/ace-white-paper/)). The v1 specification PDF (`ACE_v1_Specification_public_1_15.pdf`) and the resource page are both publicly downloadable, and the EAG's resource index confirms these are the only two EAG publications to date ([x86 EAG — Resources, June 18, 2026](https://x86ecosystem.org/resources/)).

This is the missing piece of the CPU AI inference roadmap that x86 has not had: a single matrix ISA that Intel and AMD can both implement, that compilers (GCC, LLVM/Clang, MSVC, ICC) can target, and that kernel and runtime developers can expose through BLAS and ML frameworks without per-vendor forks. It is also a v1 specification, not a shipping product — and the four load-bearing caveats (no silicon yet, AVX10 *integration* not replacement, vendor-consortium governance, reduced-precision-first scope) are not optional.

## What the spec actually defines

The resource page, dated **June 15, 2026**, frames ACE as *"x86 extensions for accelerating computation tasks, initially focusing on matrix multiplication kernels and reduced precision data formats important to ML workloads."* The extensions add four pieces of state and four corresponding operation groups ([x86 EAG — ACE specification, June 15, 2026](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/)):

- **ACE register state**, including *tile registers* (small 2D register files that hold the operands and accumulator of a matrix-multiply tile) and *block scale registers* (per-tile scale factors used by the reduced-precision formats).
- **Data processing operations** that take AVX register input and operate on the tile register state — i.e. the matrix-multiply primitives themselves, fed by AVX vector operands and producing tile results.
- **Data move operations** that move data between ACE tile state and AVX registers — the bridge that lets a kernel pack data into a tile, do the multiply, and unpack the result back into the existing vector pipeline.
- **State and operations for system management** — control register bits, CPUID enumeration, configuration descriptors, and tile-configuration structures that the OS, VMM, or kernel needs to save and restore tile state across context switches and to enumerate the capability at boot.

The spec page is explicit on the relationship to AVX and AVX10. The extensions provide *"tight integration between AVX vectors and ACE tile registers, combining high compute density tile processing operations with the comprehensive data processing features of AVX,"* and *"a number of dedicated format convert operations are provided under the AVX10 framework"* for moving data into and out of reduced-precision formats ([x86 EAG — ACE specification, June 15, 2026](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/)). The naming — "ACE register state," "AVX10 framework" for the format-convert ops — is the spec's own way of saying ACE *complements* AVX10, it does not replace it.

The v1 specification PDF (`ACE_v1_Specification_public_1_15.pdf`, ~1.1 MB) is the full ISA-level contract: tile encodings, AVX10 v1 and v2 auxiliary encodings, instruction encodings, block-scale register and operation sections, configuration-descriptor layout, CPUID enumeration, ACE enabling, AMX/ACE exception classes, tile-data-movement and tile-management sections, and outer-product instructions. The PDF name itself encodes two pieces of information: **`v1`** is the version of the spec, and **`1_15`** is the January-15 internal-revision baseline that the public release was frozen against.

## Why it matters

Three reasons this is a meaningful step rather than a slide-deck announcement.

**1. It fills a real, named cross-vendor gap on x86.** Until now, the dominant CPU AI inference story has been the *absence* of a vendor-neutral x86 matrix ISA. The work that GPUs (and, increasingly, dedicated NPUs) handle had to be expressed in AVX/AVX-512 vector code on x86 CPUs, or offloaded entirely. Intel shipped a matrix extension before — AMX (Advanced Matrix Extensions) in Sapphire Rapids and later server parts — but AMX was an Intel-only design without AMD or ecosystem buy-in. ACE is the first ISA in this space that AMD and Intel have signed onto together, and the first where the EAG (which includes the two chip vendors plus the major hyperscalers and OEMs) is publishing the spec as a *joint* artifact ([x86 EAG — Members, June 18, 2026](https://x86ecosystem.org/members/)).

**2. The signatory list is the actual news.** The EAG's member list is unusually concentrated: the two companies that define the x86 instruction set (Intel, AMD) plus the four largest cloud and software customers (Google, Microsoft, Meta, Oracle) and the major system OEMs (Dell, HPE, HP Inc., Lenovo) and the platform-software vendors whose toolchains will need to adopt ACE (Red Hat, Adobe, Broadcom, Nutanix). For a CPU-side matrix ISA to actually be a thing, the implementers (Intel, AMD), the deployers (Google, Microsoft, Meta, Oracle, Dell, HPE, HP Inc., Lenovo), and the toolchain owners (Red Hat, the compiler vendors) all have to be on the same page. On paper, they now are ([x86 EAG — Members, June 18, 2026](https://x86ecosystem.org/members/)). Whether that translates into shipping hardware and shipping intrinsics is a different question (see below).

**3. It positions AVX10 + ACE as the answer to the question x86 was being asked.** The April 27, 2026 white paper frames the design as *"a low-friction and ubiquitous matrix acceleration capability for the x86 ecosystem"* and notes that ACE *"offers a significant increase in matrix multiply performance, scalability and energy efficiency"* and *"integrates seamlessly with AVX10"* ([x86 EAG — ACE white paper, April 27, 2026](https://x86ecosystem.org/resource/ace-white-paper/)). On the broader CPU-AI ISA landscape (Arm SME/SVE2, RISC-V vector extensions), the practical effect of the EAG's move is to make "AVX10 + ACE" the natural answer to "what does x86 do for AI on-CPU" — instead of "offload to a GPU or NPU." That is a real shift in the conversation even if the silicon is not here yet.

## What to watch

- **Silicon timelines from Intel and AMD.** The EAG has not announced an Intel or AMD product that implements ACE. As of 2026-06-18, the EAG's *Press Room* index contains no ACE press release (only the original October 2024 EAG formation announcement and an October 2025 anniversary post), and the EAG's *Resources* index lists only the white paper and the v1 specification ([x86 EAG — Press Room, June 18, 2026](https://x86ecosystem.org/news/); [x86 EAG — Resources, June 18, 2026](https://x86ecosystem.org/resources/)). The test is whether Intel and AMD publish a CPU roadmap in 2026 or 2027 that explicitly names ACE.
- **Toolchain intrinsics in LLVM, GCC, and MSVC.** A multi-vendor ISA becomes a durable platform only when the compiler communities upstream intrinsics for it. As of 2026-06-18, no upstream LLVM/Clang, GCC, or MSVC intrinsic set has been published under the ACE name. Watch the LLVM `llvm-dev` and `llvm-commits` lists, the GCC `gcc-patches` list, and the MSVC release notes for new intrinsic headers or builtins; that is the second step.
- **Framework and BLAS adoption in ONNX Runtime, llama.cpp, oneDNN, BLAS, and the major ML frameworks.** The path from spec to deployable code is the kernel: tile-aware GEMM kernels in oneDNN, llama.cpp's matrix-multiply path, ONNX Runtime's CPU EP, and the relevant BLAS libraries. Adoption by any one of those projects is a real signal; adoption by three of them is a verdict.
- **AVX10 rollout status.** ACE is described as integrating with AVX10, which is itself still rolling out across Intel and AMD product lines. The two rollout curves have to converge for ACE to be deployable; AVX10 availability is the gating constraint for end-user code.
- **Whether the EAG publishes a conformance or validation suite.** The EAG's about page commits the group to *"shared specifications, reference implementations, authoritative documentation, and ecosystem updates"* ([x86 EAG — About, June 18, 2026](https://x86ecosystem.org/about/)). A published conformance test, validation suite, or reference kernel under an open-source license is the difference between a spec that vendors can each interpret differently and a spec that produces compatible hardware.
- **A second or third revision (v1.1, v2).** v1 is the floor. Broader numerical coverage (BF16, FP16, sparsity, training-style FP32), richer system-management state, and any second-generation tile layout will appear in a v1.x or v2 update.

## Risks and caveats

1. **v1 specification, not a shipping product.** As of 2026-06-18, no Intel or AMD product has been announced under the ACE name. The EAG's *Press Room* contains no ACE press release. Treat ACE as a roadmap signal, not a deployment target — there is no ACE-capable hardware in the market today ([x86 EAG — Press Room, June 18, 2026](https://x86ecosystem.org/news/); [x86 EAG — Resources, June 18, 2026](https://x86ecosystem.org/resources/)).
2. **Performance claims are projections, not benchmarks.** The white paper's "significant increase in matrix multiply performance, scalability and energy efficiency" is a design-intent claim. The 2D-tile architecture, the block-scale registers, and the AVX10 format-convert ops are *enabling* mechanisms; the speedups live in the white paper's projections and in the architectural simulations, not in measured silicon. If a number is cited, attribute it to the white paper and label it as a projection ([x86 EAG — ACE white paper, April 27, 2026](https://x86ecosystem.org/resource/ace-white-paper/)).
3. **The EAG is a vendor consortium, not an independent standards body.** The EAG self-describes as advancing the x86 architecture *"through cross-industry collaboration and technical alignment,"* and its member list has fewer than 15 corporate signatories plus two Luminaries ([x86 EAG — About, June 18, 2026](https://x86ecosystem.org/about/); [x86 EAG — Members, June 18, 2026](https://x86ecosystem.org/members/)). Standards-track adoption — LLVM/Clang, GCC, and MSVC intrinsics, kernel-side context-switch and CPUID plumbing, an EAG-published conformance suite — is what gives an ISA real durability. None of that has happened for ACE yet.
4. **Reduced-precision-first scope is the v1 floor.** The spec page says ACE *"initially focus[es] on matrix multiplication kernels and reduced precision data formats important to ML workloads."* The four pieces of state and the format-convert ops under AVX10 are designed around INT8/FP8 first. BF16, FP16, sparsity, and training-style FP32 coverage is not part of v1, and will require a v1.x or v2 revision ([x86 EAG — ACE specification, June 15, 2026](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/)).
5. **ACE integrates with AVX10; it does not replace AVX10.** The spec page is explicit: ACE's data-processing operations *"consume AVX register input and operate on tile register state"*; format-convert operations are *"provided under the AVX10 framework"*; and ACE is *"tightly integrated"* with AVX vectors. Conflating ACE with AVX10, or claiming ACE replaces AVX10, would be wrong. AVX10 is the underlying vector ISA; ACE is a tile-architecture add-on. A program that uses ACE on a hypothetical ACE-capable CPU will still need the AVX10 format-convert path to feed the tile ([x86 EAG — ACE specification, June 15, 2026](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/)).
6. **Member endorsements are corporate, not all-chip-vendor.** The EAG members page lists AMD, Intel, Google, Microsoft, Meta, Broadcom, Dell, HPE, HP Inc., Lenovo, Oracle, Red Hat, Adobe, and Nutanix as corporate signatories. The two Luminaries (Linus Torvalds, Tim Sweeney) are listed separately. This is the EAG's signatory list, not the silicon-implementer list; only Intel and AMD are positioned to ship ACE-capable CPUs, and the durability of the spec depends on them both doing so on compatible timelines ([x86 EAG — Members, June 18, 2026](https://x86ecosystem.org/members/)).
7. **Two publications, one story — the dates should not be collapsed.** The white paper is dated **2026-04-27**; the v1 specification is dated **2026-06-15**. They are not the same artifact. Most third-party coverage published in late April and May 2026 covered only the white paper; the spec PDF is the new news for mid-June 2026 ([x86 EAG — ACE white paper, April 27, 2026](https://x86ecosystem.org/resource/ace-white-paper/); [x86 EAG — ACE specification, June 15, 2026](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/)).
8. **No third-party reproduction of the white paper's projections yet.** The projections in the white paper are EAG-internal. Independent measurement of ACE-style matrix acceleration on shipping x86 silicon (i.e. using AMX or AVX-512 + tile kernels) is a separate body of work and should not be conflated with the white paper's numbers. The white paper's "significant increase" is the design intent, not a measured result ([x86 EAG — ACE white paper, April 27, 2026](https://x86ecosystem.org/resource/ace-white-paper/)).

## Practical advice for builders

**If you write or maintain CPU-side inference code today.** There is no ACE-capable hardware in the market. The right near-term action is to confirm that your existing kernels vectorise cleanly under AVX-512 and AVX10, because that is the path ACE will integrate with — the spec page is explicit that ACE's data-processing operations *"consume AVX register input and operate on tile register state"* ([x86 EAG — ACE specification, June 15, 2026](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/)). A kernel that is not AVX10-clean today is not going to be ACE-clean tomorrow.

**If you maintain a BLAS, ML framework, or compiler backend.** Follow the EAG's specification updates and watch the LLVM/Clang and GCC commit logs for ACE intrinsic additions. The matrix-multiply path in oneDNN, llama.cpp, ONNX Runtime, and the major BLAS libraries is where ACE adoption will become visible first. Plan to be ready when vendor implementations appear; do not adopt early on simulation.

**If you are choosing between CPU, GPU, and NPU for inference in 2026.** ACE is one more reason the CPU side is not standing still, but it does not change the 2026 deployment calculus. The silicon is not here. AVX10 alone is the current best CPU-side vector path. GPU and NPU remain the high-throughput options for production inference today; the ACE story is a 2027-and-beyond inflection, not a 2026 one.

**If you are a tech-policy or strategy reader.** The interesting structural fact is that two chip rivals, two of the three largest cloud providers, the largest social-AI hyperscaler, the two largest PC OEMs, and the largest enterprise OS vendor all put their names on the same ISA. That is the political economy of the spec; the technical question of whether Intel and AMD both ship compatible silicon and whether the toolchains pick it up is a separate one. Watch for product announcements from Intel and AMD that name ACE explicitly, and for upstream commits to LLVM/Clang, GCC, and MSVC that add ACE intrinsics.

**The wider CPU-AI ISA landscape, in one sentence.** Arm Scalable Matrix Extension (SME) and RISC-V vector extensions are addressing the same problem on their respective ISAs; the EAG's move is the x86 side of the same convergence, not a comparison piece.

## Verdict

**A meaningful and overdue step toward a real cross-vendor x86 matrix ISA — but v1, not a shipping product, and the test is silicon, toolchain, and framework adoption in the next 12–18 months.**

The spec is concrete and dated. The EAG's *AI Compute Extensions (ACE) Specification* resource page is dated **June 15, 2026**; the v1 specification PDF (`ACE_v1_Specification_public_1_15.pdf`) is downloadable from the same page; the *AI Compute Extensions (ACE) for x86* white paper is dated **April 27, 2026**; and the EAG members page names the corporate signatories and the two Luminaries ([x86 EAG — ACE specification, June 15, 2026](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/); [x86 EAG — ACE white paper, April 27, 2026](https://x86ecosystem.org/resource/ace-white-paper/); [x86 EAG — Members, June 18, 2026](https://x86ecosystem.org/members/)). The four pillars of the spec — register state (tile + block scale), data-processing operations, data-move operations, and system-management state — are defined; the relationship to AVX10 is explicit and is "integration," not "replacement."

The caveats are equally real. There is no ACE-capable silicon in the market as of 2026-06-18. The performance numbers in the white paper are projections, not benchmarks. The EAG is a vendor consortium with fewer than 15 corporate members, not an independent standards body. v1 is reduced-precision-first; broader coverage is not part of this revision. And the spec is integrated with AVX10, which is itself still rolling out across Intel and AMD product lines.

The right read for a builder in mid-2026 is: *this is a strong signal from the right set of signatories that the CPU AI story on x86 is moving — but it is not yet a deployable target. Keep your AVX-512/AVX10 kernels clean, follow the LLVM/Clang and GCC commit logs, and wait for an Intel or AMD product announcement that names ACE explicitly before you plan a deployment around it.*

---

*Sources verified by direct fetch on 2026-06-18.*

- [x86 Ecosystem Advisory Group — "AI Compute Extensions (ACE) Specification" (resource page, June 15, 2026)](https://x86ecosystem.org/resource/ai-compute-extensions-ace-specification/)
- [x86 Ecosystem Advisory Group — "AI Compute Extensions (ACE) v1 Specification" (PDF, public release)](https://x86ecosystem.org/wp-content/uploads/2026/06/ACE_v1_Specification_public_1_15.pdf)
- [x86 Ecosystem Advisory Group — "The AI Compute Extensions (ACE) for x86" (white paper page, April 27, 2026)](https://x86ecosystem.org/resource/ace-white-paper/)
- [x86 Ecosystem Advisory Group — "The AI Compute Extensions (ACE) for x86" (white paper PDF, April 27, 2026)](https://x86ecosystem.org/wp-content/uploads/2026/03/ACE-Whitepaper-v1.pdf)
- [x86 Ecosystem Advisory Group — "Members" (signatories list)](https://x86ecosystem.org/members/)
- [x86 Ecosystem Advisory Group — "About" (consortium description)](https://x86ecosystem.org/about/)
- [x86 Ecosystem Advisory Group — "Resources" (index of EAG publications)](https://x86ecosystem.org/resources/)
- [x86 Ecosystem Advisory Group — "Press Room" (no ACE press release as of June 18, 2026)](https://x86ecosystem.org/news/)
