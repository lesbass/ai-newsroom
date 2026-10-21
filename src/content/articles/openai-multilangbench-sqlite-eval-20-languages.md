---
title: "OpenAI's MultiLangBench scores models building SQLite in 20 languages — GPT-6 Astra at 87.4%, COBOL still hardest"
description: "OpenAI open-sourced the harness that scores models building SQLite in 20 languages. The scores are OpenAI's own, and the repo ships no results table."
pubDate: 2026-10-21
image: "/images/articles/openai-multilangbench-sqlite-eval-20-languages/hero.png"
imageAlt: "Screenshot of the OpenAI MultiLangBench README showing the initial_database, user_query, and validation_query test triple, the 51k-to-24k conversion count, and the recommendation to run the 272 tests starting with 00, 01, and 02."
imageCredit: "Source: https://github.com/openai/MultiLangBench · Captured 2026-10-21 with headless Chromium · Credit: OpenAI repository README · License: Apache-2.0; screenshot by AI Newsroom"
canonicalURL: "https://news.lesbass.com/articles/openai-multilangbench-sqlite-eval-20-languages/"
tags:
  - openai
  - benchmarks
  - ai-coding
  - sqlite
  - cobol
  - fortran
  - developer-tools
  - high-risk-claim
highRiskClaims: true
sources:
  - title: "Advancing coding in low-resource programming languages"
    url: "https://openai.com/index/low-resource-programming-languages/"
    date: 2026-10-19
    type: primary
  - title: "openai/MultiLangBench (README, LICENSE, scripts, tests)"
    url: "https://github.com/openai/MultiLangBench"
    date: 2026-10-21
    type: primary
  - title: "IBM Think: What is COBOL?"
    url: "https://www.ibm.com/think/topics/cobol"
    date: 2026-10-21
    type: primary
  - title: "NOAA Institutional Repository: software modernization for the UFS"
    url: "https://repository.library.noaa.gov/view/noaa/71120"
    date: 2026-10-21
    type: primary
  - title: "US NRC: Computer Codes"
    url: "https://www.nrc.gov/education-regulatory-research/research/computer-codes"
    date: 2026-10-21
    type: primary
  - title: "SQLite 3.40.1 documentation bundle"
    url: "https://sqlite.org/2022/sqlite-doc-3400100.zip"
    type: primary
  - title: "Yash Thakker, explainx.ai: MultiLangBench analysis"
    url: "https://explainx.ai/blog/openai-multilangbench-sqlite-reimplementation-eval-2026"
    date: 2026-10-19
    type: secondary
  - title: "Gabriel Anhaia, dev.to: COBOL migration tests are hidden"
    url: "https://dev.to/gabrielanhaia/openais-cobol-migration-score-jumped-from-54-to-866-the-tests-are-hidden-29go"
    date: 2026-10-20
    type: secondary
  - title: "Ryan Daws, developer-tech.com: OpenAI reports 87.4% MultiLangBench pass rate"
    url: "https://www.developer-tech.com/news/openai-reports-87-4-multilangbench-pass-rate-gpt-6-astra/"
    date: 2026-10-20
    type: secondary
---

OpenAI published MultiLangBench on October 19, 2026: an Apache-2.0 eval that asks a model to implement SQLite 3.40.1 from its documentation in one of 20 programming languages. OpenAI reports GPT-6 Astra averaging 87.4%, with COBOL still weakest at 72%. The harness and tests are public; the results behind those numbers are not in the repository.

Every score below is OpenAI's; this article does not independently reproduce them.

## What happened

OpenAI's post, "Advancing coding in low-resource programming languages," describes two separate evaluations. MultiLangBench tests whether a model can build a SQLite-compatible engine from scratch. A second, unnamed COBOL migration evaluation tests whether a model can port existing programs to C++, Java, Kotlin, Python, or Rust. Their results should not be combined.

The public repository, `openai/MultiLangBench`, is Apache-2.0; its root holds the README, `LICENSE`, `requirements.txt`, `scripts/`, and `tests/` ([GitHub, accessed 2026-10-21](https://github.com/openai/MultiLangBench)). The README does not list the target languages. The post's chart names 20: C, C#, C++, COBOL, Common Lisp, Fortran, Go, Java, JavaScript, Lean, OCaml, PHP, PowerShell, Python, Ruby, Rust, Scala, Swift, Visual Basic, and Zig.

## Why it matters

- Most coding benchmarks lean on Python and JavaScript. Teams maintaining COBOL, Fortran, or Visual Basic estates have had little public evidence about model behaviour there.
- A public harness beats a leaderboard: engineers can read the tests, see what is graded, and run the setup against their own model or fine-tune.
- The stakes are real: OpenAI cites [IBM on COBOL's role in banking and ATMs](https://www.ibm.com/think/topics/cobol), plus [NOAA](https://repository.library.noaa.gov/view/noaa/71120) and the [US NRC](https://www.nrc.gov/education-regulatory-research/research/computer-codes) for Fortran in forecasting and reactor safety.
- The catch: you can inspect how MultiLangBench grades, but you cannot verify the headline numbers from the repository alone.

## How the eval actually works

Each test is a triple: `initial_database` creates a database file, `user_query` is the SQL the candidate must support, and `validation_query` runs against the candidate's output using real SQLite 3.40.1. A test passes only on an exact output match ([README, accessed 2026-10-21](https://github.com/openai/MultiLangBench)).

- **Input contract:** the model gets the SQLite 3.40.1 docs and must ship an executable taking a database path as `argv` and SQL on stdin.
- **Corpus:** 51,000 SQLite TCL tests, of which 24,000 converted to this format — about 47%.
- **Subset:** evals should use the 272 tests starting with `00`, `01`, or `02`; the README permits all 24,000 for precision but says to note it.
- **Anti-cheat:** no internet; remove every SQLite library, executable, and embedded copy. Wrong or mixed languages sets `test_pass_rate` to 0; the README suggests another model can check compliance.
- **Scoring:** the score is `(api_cost, test_pass_rate)`; a mismatch, crash, or 60-second timeout fails the test. `requirements.txt` pins `apsw==3.40.1.0`, so the grader drives real SQLite.

## What OpenAI reports

At maximum reasoning effort, OpenAI reports these averages across the 20 languages:

| Model | Average pass rate | Estimated API cost per sample |
|---|---:|---:|
| GPT-6 Astra | **87.4%** | not stated by OpenAI |
| GPT-6 Luna | **40.3%** | **~$0.77** |
| GPT-5.6 Sol (baseline) | **26.8%** | **~$3.48** |

OpenAI says Astra scores above 83% in 19 of the 20 languages, with COBOL the exception at 72%. Its per-language chart gives the shape of the gains:

| Language | GPT-5.6 Sol | GPT-6 Luna | GPT-6 Astra |
|---|---:|---:|---:|
| COBOL | 10.9% | 17.1% | 72.1% |
| Fortran | 21.4% | 31.4% | 83.5% |
| OCaml | 25.6% | 34.1% | 85.8% |
| Visual Basic | 27.5% | 41.6% | 89.4% |

Luna's estimated cost is about 78% lower than GPT-5.6 Sol's, according to OpenAI.

The COBOL migration number is from the other evaluation. OpenAI reports GPT-6.1 Sol at 86.6% with low reasoning effort, against 5.4% for GPT-5.6 Sol at the same setting, at 61% of the API cost. At higher reasoning effort it reaches 97.9%. Those tests are hidden and require byte-for-byte parity on observable outputs; a migration counts only if every test passes.

## What the numbers don't prove

**The repository has no results table.** As of 2026-10-21, the root contains only `scripts/`, `tests/`, `.gitignore`, `LICENSE`, `README.md`, and `requirements.txt`, with no results file or results table. The post says results ship "along with" the setup, but the per-language values live in its interactive chart, not the repo.

**The test subset is unknown.** The README recommends 272 tests; the post never says whether the headline scores used those 272 or all 24,000. Readers cannot tell whether model comparisons ran on the same sample.

**The migration half is not reproducible.** The hidden COBOL tests are not public. Cloning MultiLangBench reruns the SQLite harness, not the 86.6% or 97.9% migration results.

**Contamination is a live concern.** SQLite's source and TCL tests are public and likely in training data. Hashing test names and converting files makes memorized tests less reusable, but does not rule out reconstructing SQLite from memory. Yash Thakker raised this at explainx.ai on 2026-10-19; it is an outside concern, not a demonstrated finding.

**No independent reproduction existed as of 2026-10-21.** Secondary coverage exists, including Gabriel Anhaia's dev.to analysis and Ryan Daws's developer-tech.com report, but no third party had published a rerun.

## Practical takeaways for builders

- **Start with the 272-test subset.** It is documented, cheap to repeat, and a reasonable smoke test. If you use all 24,000, say so.
- **Ask which sample produced a score.** A pass rate without the subset and run count is not comparable.
- **Read 72% as 28% failure.** Even OpenAI's best COBOL result leaves over a quarter of this eval's tests failing. OpenAI says production use "still requires expert review and testing against the system's business rules and dependencies."
- **Keep your own parity corpus for migrations.** Hidden tests cannot be your acceptance suite; build a private set from the programs you need to move.
- **Check language compliance.** A model that solves the task in Python instead of COBOL scores zero, and that failure mode matters for migration planning.

## Sources

| Claim | Source | Date |
|---|---|---|
| 20 languages; 87.4%, 40.3%, 26.8% averages; 19-of-20 result; COBOL 72%; per-language percentages; $0.77 and $3.48 estimated costs; Luna ~78% lower | [OpenAI, "Advancing coding in low-resource programming languages"](https://openai.com/index/low-resource-programming-languages/) | 2026-10-19 |
| COBOL migration 86.6%, 5.4%, 61% of cost, 97.9%; hidden tests and byte-for-byte parity; migration targets | [OpenAI, same post](https://openai.com/index/low-resource-programming-languages/) | 2026-10-19 |
| 51k tests, 24k converted, 272-test subset, 60-second timeout, triple format, language rule, `apsw` pin, Apache-2.0 | [openai/MultiLangBench README](https://github.com/openai/MultiLangBench/blob/main/README.md), [LICENSE](https://github.com/openai/MultiLangBench/blob/main/LICENSE), [repository](https://github.com/openai/MultiLangBench) | accessed 2026-10-21 |
| SQLite 3.40.1 documentation bundle used as model input | [sqlite.org](https://sqlite.org/2022/sqlite-doc-3400100.zip) | Last-Modified 2025-04-07 |
| Repository root contents and absence of result files | [openai/MultiLangBench tree](https://github.com/openai/MultiLangBench) | accessed 2026-10-21 |
| COBOL and Fortran context (banking, ATMs, forecasting, reactor safety) | [IBM](https://www.ibm.com/think/topics/cobol) · [NOAA](https://repository.library.noaa.gov/view/noaa/71120) · [US NRC](https://www.nrc.gov/education-regulatory-research/research/computer-codes) | accessed 2026-10-21 |
| Contamination concern | [Yash Thakker, explainx.ai](https://explainx.ai/blog/openai-multilangbench-sqlite-reimplementation-eval-2026) | 2026-10-19 |
| Coverage reviewed for independent reruns (none found) | [Gabriel Anhaia, dev.to](https://dev.to/gabrielanhaia/openais-cobol-migration-score-jumped-from-54-to-866-the-tests-are-hidden-29go) · [Ryan Daws, developer-tech.com](https://www.developer-tech.com/news/openai-reports-87-4-multilangbench-pass-rate-gpt-6-astra/) | 2026-10-20 |
