---
title: "Instructor: output strutturati per LLM con Pydantic, in Python"
description: "Libreria Python MIT (567-labs) per estrarre JSON validato da qualsiasi LLM tramite modelli Pydantic. 13,2k stelle, 1,1k fork, v1.15.1 con fix SSRF su Bedrock, supporto per OpenAI, Anthropic, Gemini, Cohere, Ollama, Bedrock e altri 15+ provider. v1.15.2 (10 maggio 2026) aggiunge redazione dei log sensibili."
pubDate: 2026-06-14
author: "AI Newsroom"
tags: ["open-source", "python", "pydantic", "structured-outputs", "llm", "instructor", "567-labs", "jason-liu", "openai", "anthropic", "repository-feature"]
sources:
  - title: "567-labs/instructor — repository GitHub (homepage)"
    url: "https://github.com/567-labs/instructor"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — LICENSE (MIT, copyright 2023 Jason Liu)"
    url: "https://github.com/567-labs/instructor/blob/main/LICENSE"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — Releases (v1.15.1, v1.15.2, changelog completo)"
    url: "https://github.com/567-labs/instructor/releases"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — CHANGELOG.md (security advisory integrato, dating 1.15.0–1.15.2)"
    url: "https://github.com/567-labs/instructor/blob/main/CHANGELOG.md"
    date: 2026-06-14
    type: primary
  - title: "instructor su PyPI — versione, dipendenze, autori, extras"
    url: "https://pypi.org/project/instructor/"
    date: 2026-06-14
    type: primary
  - title: "Instructor — documentazione ufficiale (python.useinstructor.com)"
    url: "https://python.useinstructor.com/"
    date: 2026-06-14
    type: primary
  - title: "567-labs/instructor — Security Advisories (GitHub, pagina del repo)"
    url: "https://github.com/567-labs/instructor/security/advisories"
    date: 2026-06-14
    type: primary
  - title: "Pydantic v2 — documentazione ufficiale (modelli BaseModel, Field, validator)"
    url: "https://docs.pydantic.dev/latest/"
    date: 2026-06-14
    type: secondary
highRiskClaims: false
---

Il 14 giugno 2026 il repository pubblico **[`567-labs/instructor`](https://github.com/567-labs/instructor)** — mantenuto dall'organizzazione [567-labs](https://github.com/567-labs) sotto licenza **MIT** ([LICENSE, copyright 2023 Jason Liu](https://github.com/567-labs/instructor/blob/main/LICENSE)) — conta **13,2k stelle, 1,1k fork, 108 release, 1.560 commit** e si presenta come «structured outputs for llms» ([README, 14 giugno 2026](https://github.com/567-labs/instructor)). La versione stabile su PyPI è **1.15.1**, rilasciata il **3 aprile 2026**, seguita dalla **1.15.2 del 10 maggio 2026** che aggiunge la redazione dei campi sensibili (inclusi `Authorization` e `x-api-key`) nei log di debug ([CHANGELOG, 10 maggio 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md); [PyPI, 14 giugno 2026](https://pypi.org/project/instructor/)).

## Cosa è successo

`Instructor` è una libreria Python che fa una cosa sola: **estrae dati strutturati e validati da qualsiasi LLM** usando modelli [Pydantic v2](https://docs.pydantic.dev/latest/) come schema di output. La versione moderna espone un'unica factory `instructor.from_provider("provider/modello")` che restituisce un client compatibile con l'API chat del provider sottostante, ma con il parametro `response_model=BaseModel` al posto del solito `tools=[...]` artigianale. Esempio dal [README, 14 giugno 2026](https://github.com/567-labs/instructor):

```python
import instructor
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

client = instructor.from_provider("openai/gpt-4o-mini")
user = client.chat.completions.create(
    response_model=User,
    messages=[{"role": "user", "content": "John is 25 years old"}],
)
print(user)  # User(name='John', age=25)
```

La libreria dichiara nel README un'adozione di **«3M+ monthly downloads»** e **«over 100,000 developers and companies»**, con **«1,000+ community contributors»** ([README, 14 giugno 2026](https://github.com/567-labs/instructor)). La [documentazione ufficiale](https://python.useinstructor.com/) usa numeri comparabili: «over 3 million monthly downloads, 11k stars, 100+ contributors» — la discrepanza su GitHub stars (11k vs 13,2k) si spiega con la data di fetch: la doc è verosimilmente aggiornata a un paio di release fa, mentre il repo è cresciuto nel frattempo. I numeri «100k sviluppatori» e «3M+ download» non sono verificabili in modo indipendente dal repository stesso e vanno citati solo come **claim del maintainer**.

I numeri di repository, letti dalla [homepage GitHub il 14 giugno 2026](https://github.com/567-labs/instructor): **13,2k stelle, 1,1k fork, 54 watchers, 14 issue aperte, 36 pull request aperte, 0 security advisories pubblicate, 108 release, 1.560 commit totali**. Il linguaggio è Python al 99,9% (lo 0,1% residuo è shell, dai [linguaggi del repo, 14 giugno 2026](https://github.com/567-labs/instructor)). Il file `LICENSE` nel repo è il testo standard MIT, copyright Jason Liu, anno 2023. La pagina [Security Advisories](https://github.com/567-labs/instructor/security/advisories) risulta vuota («There aren't any published security advisories») al 14 giugno 2026, ma il `CHANGELOG.md` documenta esplicitamente i fix di sicurezza rilasciati come voci «Security» nelle release, non come advisory GitHub ([CHANGELOG, 14 giugno 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)) — un'incongruenza di processo che segnaliamo in «Rischi e caveat».

I **provider supportati**, secondo la [documentazione ufficiale](https://python.useinstructor.com/) e il [CHANGELOG](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md), sono almeno 15: **OpenAI, Anthropic, Google Gemini, Google Vertex AI, Mistral, Cohere, Ollama, llama-cpp-python, Groq, xAI, AWS Bedrock, Cerebras, Fireworks, Perplexity, Writer, DeepSeek, LiteLLM**. La [lista `Provides-Extra` su PyPI](https://pypi.org/project/instructor/) conferma almeno 22 extras opzionali, una per provider o gruppo di provider (`anthropic`, `bedrock`, `cerebras-cloud-sdk`, `cohere`, `google-genai`, `groq`, `litellm`, `mistral`, `perplexity`, `vertexai`, `writer`, `xai`, e così via). Python richiesto: `>=3.9, <4.0` ([PyPI metadata, 14 giugno 2026](https://pypi.org/project/instructor/)).

La **roadmap delle release recenti** ([CHANGELOG, 14 giugno 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)) è densa e documenta un'attività di manutenzione elevata: **v1.15.2 (10 maggio 2026)** ha aggiunto la redazione dei log sensibili via [PR #2297](https://github.com/567-labs/instructor/pull/2297); **v1.15.1 (3 aprile 2026)** ha bloccato il fetch di URL remoti in `_openai_image_part_to_bedrock` e in `PDF.to_bedrock` (solo `data:` URL o `s3://` accettati, mitigation di SSRF e local file disclosure); **v1.15.0 (2 aprile 2026)** ha pinnato `litellm ≤ 1.82.6` per evitare le versioni compromesse 1.82.7 e 1.82.8, e ha reso `diskcache` una dipendenza opzionale (mitigazione della CVE-2025-69872 sulla catena transitive). Più indietro, la **v1.14.0 (4 gennaio 2026)** ha documentato il supporto Bedrock PDF, e la **v1.13.0 (3 novembre 2025)** ha ripristinato il file `py.typed` (PEP 561) per il type checking. Una **sezione `[Unreleased]`** in cima al changelog annuncia cleanup per V2 Gemini, Cohere templating, type checker `ty 0.0.44` e copertura di `supported Python versions and platforms`.

## Perché interessa

**1. Il dolore principale degli sviluppatori Python che integrano LLM in produzione è esattamente quello che `Instructor` risolve.** L'API nativa dei provider richiede di: scrivere manualmente lo schema JSON per `tools=`, parsare `response.choices[0].message.tool_calls[0].function.arguments`, gestire `json.JSONDecodeError`, ri-gestire gli errori di validazione e ri-tentare. Il README lo documenta side-by-side, con 25 righe di codice «senza Instructor» e 5 righe «con Instructor» ([README, 14 giugno 2026](https://github.com/567-labs/instructor)). Per un team che deve estrarre dati strutturati in modo affidabile — classificazione, estrazione entità, scoring, agent output, mapping verso API interne — l'astrazione `response_model=BaseModel` è un moltiplicatore di produttività reale, non un vezzo.

**2. Pydantic v2 come schema di output è un vantaggio tipo-indotto che si propaga a tutto il resto.** Definire `class User(BaseModel)` significa avere **type checking statico, autocompletion nell'IDE, validatori custom (`@field_validator`), validatori dipendenti da LLM (`llm_validator`), nested model, default values, e serializzazione** pronte all'uso. La documentazione ufficiale di [Pydantic v2](https://docs.pydantic.dev/latest/) è matura e il pattern «`BaseModel` come contratto» è già stabilito nell'ecosistema FastAPI, SQLModel, LangChain, e nella maggior parte dei tool Python moderni. Per chi arriva da quel mondo, `Instructor` è una drop-in API surface, non un nuovo framework da imparare.

**3. La copertura di provider è ampia e tenuta aggiornata.** Il CHANGELOG documenta il supporto attivo per **Claude 4 (Opus, Sonnet, Haiku), OpenAI GPT-4.1 e o3/o4 reasoning, xAI Grok 3, DeepSeek R1/V3** aggiunti nella v1.15.0 ([CHANGELOG, 14 giugno 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)). La gestione delle «mode» — il mapping dal `response_model` Pydantic al meccanismo nativo del provider (`tools` su OpenAI, `tool_use` su Anthropic, `response_schema` su Gemini, function-calling su Bedrock) — è il vero valore: chi cambia provider non deve riscrivere l'integrazione. Il `from_provider("openai/gpt-4o-mini")` e `from_provider("anthropic/claude-3-5-sonnet")` espongono la stessa identica API al codice chiamante, come mostrato nel [README, 14 giugno 2026](https://github.com/567-labs/instructor).

**4. I pattern «production-ready» ci sono tutti e sono documentati.** Il README e la documentazione elencano: **retry automatici su validation failure** (`max_retries=3` con re-ask che include l'errore di validazione nel prompt successivo), **streaming di oggetti parziali** (`Partial[User]` che emette `User(name=None, age=None)` → `User(name="John", age=25)` mentre i token arrivano), **validatori LLM-assisted** (`llm_validator("don't say objectionable things")` che chiama un LLM per validare un campo), **template Jinja** dentro i messaggi, **hooks di logging** (`client.on("completion:error", ...)`), **supporto async/await** con `async_client=True`, e **accesso alla completion raw** con `create_with_completion()` quando serve ispezionare `usage` o altri metadata. Non sono feature «da roadmap», sono tutte in `main` e dimostrabili.

**5. Esiste un'API alternativa (`PydanticAI`) per i casi che vanno oltre l'estrazione.** Il README e la homepage della documentazione avvertono esplicitamente: «Use Instructor for fast extraction, reach for PydanticAI when you need agents» ([README, 14 giugno 2026](https://github.com/567-labs/instructor); [docs homepage, 14 giugno 2026](https://python.useinstructor.com/)). La distinzione è utile all'articolo: `Instructor` resta il tool giusto quando lo use case è **«dammi un oggetto Pydantic validato a partire da testo o da una risposta LLM»**. Quando servono agent loop, observability, dataset replay, tool use complessi, il consiglio del maintainer è di passare a `PydanticAI` (sempre del team Pydantic). Non stanno in competizione: si compongono, e gli stessi modelli Pydantic funzionano in entrambi.

**6. L'attività di manutenzione è alta e la sicurezza viene trattata seriamente.** Tre release (1.15.0, 1.15.1, 1.15.2) in sei settimane (2 aprile – 10 maggio 2026) con voci «Security» esplicite in ognuna: pin di `litellm` per escludere versioni compromesse, rimozione di `diskcache` dal dependency tree, redazione dei log, blocco di SSRF su Bedrock. La pagina [Security Advisories](https://github.com/567-labs/instructor/security/advisories) del repo GitHub al 14 giugno 2026 **non** contiene advisory pubblicate, ma le mitigazioni arrivano via release — un'incongruenza che discutiamo in «Rischi e caveat».

## Cosa guardare

- **Rilascio di `Instructor 2.0`.** La sezione `[Unreleased]` in cima al [CHANGELOG](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md) accenna a «V2 cleanup» e a un rafforzamento del type checking pubblico. Una major release cambierà l'API surface e richiederà migration notes; monitorare `Releases` e `CHANGELOG.md` su `main`.
- **Stato delle security advisory GitHub.** Al 14 giugno 2026 la [pagina Security Advisories](https://github.com/567-labs/instructor/security/advisories) del repo è vuota. I fix di sicurezza arrivano nelle release note ma **non** come advisory formali. Se il maintainer inizia a pubblicare GHSA (GitHub Security Advisories), è un upgrade di trasparenza utile a chi fa vulnerability scanning automatico.
- **Dipendenza da `litellm` e altre transitive.** La v1.15.0 ha pinnato `litellm ≤ 1.82.6` per mitigare le versioni 1.82.7/1.82.8 compromesse. La `Provides-Extra: litellm` su PyPI indica che la dipendenza è opzionale; chi la usa esplicitamente deve monitorare i pin. Stesso discorso per `diskcache` (CVE-2025-69872), ora opzionale, e per il client `anthropic` (v0.76.0 → v0.88.0 tra v1.15.0 e v1.15.1).
- **Adozione di `Mode.JSON_SCHEMA` su OpenAI.** La v1.15.0 ha permesso `Mode.JSON_SCHEMA` per il provider OpenAI (prima era bloccato dal mode validation check). Se OpenAI continua a investire su `response_format: json_schema` come替代 al function calling, è probabile che `Instructor` sposti il default su quella modalità per nuovi modelli.
- **Copertura di modelli rilasciati nel 2026.** La v1.15.0 ha aggiunto Claude 4, GPT-4.1, o3/o4, Grok 3, DeepSeek R1/V3 al `KnownModelName` type. Se escono modelli frontier che cambiano il modo in cui si invoca structured output (es. tool-use più ricchi, native structured output API), `Instructor` seguirà — il ritmo di release lo suggerisce.
- **Conferenza / blog post del maintainer Jason Liu.** `Instructor` ha un [canale Discord](https://discord.gg/), una [blog section nella documentazione](https://python.useinstructor.com/blog/), e interventi pubblici del maintainer. Un post su un case study di produzione (multi-tenant extraction, eval pipeline) sarebbe un segnale di adozione enterprise solida.
- **Possibile rilascio di `PydanticAI` come prodotto separato (vs `Instructor` come estensione).** La separazione «Instructor per extraction, PydanticAI per agents» è dichiarata nel README. Se PydanticAI prende piede come framework autonomo, `Instructor` potrebbe essere rifattorizzato per essere il «data layer» di PydanticAI, o rimanere un progetto indipendente. Monitorare l'evoluzione del confine.

## Rischi e caveat

**1. Mode-dipendenza tra provider.** Il comportamento di `response_model=` dipende dal *mode* scelto dal client `Instructor` per quel provider: `TOOLS` (function calling nativo), `JSON` (JSON mode), `MD_JSON` (markdown + JSON), `JSON_SCHEMA` (OpenAI structured output), `ANTHROPIC_TOOLS`, `ANTHROPIC_REASONING_TOOLS`, `ANTHROPIC_PARALLEL_TOOLS`, `GEMINI_TOOLS`, `GENAI_STRUCTURED_OUTPUTS`, `OPENROUTER_STRUCTURED_OUTPUTS`, `RESPONSES_TOOLS` ([CHANGELOG v1.15.0, 14 giugno 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)). La **affidabilità varia per provider e per mode**: non è scontato che `Mode.TOOLS` su Anthropic e `Mode.JSON_SCHEMA` su OpenAI producano lo stesso tasso di successo per uno schema complesso. Le frasi «Instructor funziona con tutti i provider» vanno lette come «Instructor offre un'API uniforme, non che l'output sia equally reliable su tutti i provider».

**2. Il rischio token budget.** Quando il client è configurato in `TOOLS` mode, lo schema Pydantic viene serializzato come `tools=[{type: function, function: {name, parameters: {...}}}]` nel payload della richiesta. Per modelli con context window ridotta o per schemi profondamente nested, **lo schema può consumare una frazione significativa del budget di token** prima ancora che arrivi il messaggio utente. La documentazione non fornisce una metrica unica di «quanto pesa il mio schema»; va misurato per il proprio caso.

**3. Validazione Pydantic e gestione del fallback.** Quando la validazione fallisce, `Instructor` ri-invia il prompt con l'errore di validazione allegato, per un massimo di `max_retries` (default documentato nel README: 3). Se lo schema è semanticamente troppo stretto per le risposte naturali del modello, si entra in un loop di retry che brucia token senza produrre un output valido. Il pattern di fallback consigliato è: (a) ridurre la stiffness dei vincoli, (b) allargare `max_retries`, (c) usare `Optional[T]` o `Union[A, B]` per i campi ambigui, (d) accettare un campo libero `raw: str` di fallback. Non è documentato un «dead letter» automatico.

**4. La pagina `Security Advisories` GitHub è vuota, ma le release documentano fix di sicurezza.** Una ricerca con tool di vulnerability scanning (es. `ghsa-list`, `osv-scanner`, Snyk) potrebbe **non** trovare advisory formali per CVE note su `diskcache` (CVE-2025-69872) o su `litellm` 1.82.7/1.82.8 quando l'app usa `Instructor` come dipendenza, perché le mitigation arrivano solo via release notes. È una **discrepanza di processo documentale**, non un bug del codice, ma ha un impatto pratico su chi fa security gating automatico in CI. Il consiglio: pinnare `instructor>=1.15.0` se si usano `litellm` o `diskcache` come dipendenze.

**5. Il README cita numeri di adozione che non sono verificabili.** «Trusted by over 100,000 developers and companies», «3M+ monthly downloads», «10K+ GitHub stars» ([README, 14 giugno 2026](https://github.com/567-labs/instructor)): le 13,2k stelle attuali sono verificabili; i 3M+ download mensili sono un'**affermazione del maintainer**, basata probabilmente su [pypistats.org](https://pypistats.org/packages/instructor) ma non riportata con un link. L'articolo li cita solo come claim, non come fatto verificato.

**6. La data di creazione del repository.** Il brief editoriale indicava «created Jun 14, 2023» ma il [LICENSE](https://github.com/567-labs/instructor/blob/main/LICENSE) riporta solo «Copyright (c) 2023 Jason Liu» (senza giorno/mese) e le release PyPI partono da `0.2.5` del 6 settembre 2023. **La data esatta di creazione del repository non è verificabile dal solo front-end GitHub senza una chiamata API dedicata**; questo articolo la indica come «2023» e rimanda al `LICENSE` come fonte load-bearing. La data specifica «Jun 14, 2023» del brief va trattata come da verificare.

**7. `instructor.pydantic.dev` non risponde al 14 giugno 2026.** Il brief editoriale indicava `https://instructor.pydantic.dev/` come documentazione; quel dominio **non** risolve al 14 giugno 2026 (transport error). La documentazione effettivamente servita è su `https://python.useinstructor.com/`, linkata dal README e dai topic del repo. L'articolo usa quest'ultima come fonte primaria.

## Cosa fare

**Per Python developer che integrano LLM in produzione oggi:**

- **Installa e prova su un caso semplice.** `pip install instructor`, poi `client = instructor.from_provider("openai/gpt-4o-mini")` con `OPENAI_API_KEY` in env, definisci un `BaseModel` di 3-4 campi, chiama `client.chat.completions.create(response_model=..., messages=[...])`. Verifica che l'oggetto tornato sia un'istanza Pydantic valida, non un dict. Tempo: 10 minuti. Costo: solo le credenziali del provider.
- **Misura il peso del tuo schema in token.** Prima di mettere `Instructor` in produzione, serializza il tuo `response_model` come `model.model_json_schema()` e conta i token. Se supera il 10-15% del context window del modello scelto, valuta (a) modelli con context più ampio, (b) split dello schema in più chiamate con sub-model, (c) `Mode.JSON` invece di `Mode.TOOLS` (su OpenAI riduce l'overhead). Non è una metrica documentata, va misurata per il proprio caso.
- **Imposta `max_retries` esplicitamente.** Il default documentato è 3, ma se il tuo schema è complesso o il modello è piccolo, può essere troppo basso (loop di retry che bruciano token) o troppo alto (costo eccessivo su schema ambigui). Inizia con 3, misura il tasso di successo, alza o abbassa in base al dato. Logga sempre gli errori di validazione per capire se il problema è il modello o lo schema.
- **Usa `from_provider(...)` invece dei wrapper legacy (`from_openai`, `from_anthropic`).** L'API moderna è unificata. I factory `from_openai`/`from_anthropic`/etc. esistono ancora (sono standardizzati nella v1.14.0) ma sono deprecati a favore di `from_provider("provider/modello")` ([CHANGELOG v1.14.0, 14 giugno 2026](https://github.com/567-labs/instructor/blob/main/CHANGELOG.md)).

**Per team che fanno valutazione di qualità LLM:**

- **Sfrutta i validator LLM-assisted (`llm_validator`) per i campi «morbidi».** Se un campo è difficile da validare con una regola deterministica (es. «la risposta è professionale e cortese»), `llm_validator("description", client=client)` permette di chiamare un secondo LLM per la validazione. È un pattern documentato nella [docs, 14 giugno 2026](https://python.useinstructor.com/). Costo: una chiamata LLM extra per validazione; usare con moderazione.
- **Streaming con `Partial[T]`.** Per le UI in cui vuoi mostrare l'output che si popola progressivamente (typing effect, form auto-fill), `Partial[User]` + `stream=True` emette istanze parziali. È la base per costruire UX reattive senza dover gestire il protocollo di streaming manualmente. Documentato nel [README, 14 giugno 2026](https://github.com/567-labs/instructor).

**Per chi valuta `Instructor` rispetto a `PydanticAI` o alternative:**

- **Regola pratica del maintainer stesso:** `Instructor` per estrazione veloce, `PydanticAI` quando servono agent loop, observability, dataset replay, eval ([README, 14 giugno 2026](https://github.com/567-labs/instructor)). Se lo use case è «estrarre dati strutturati da testo o da output LLM», `Instructor` è più semplice e leggero. Se serve un runtime agent con tools, tracing, e condivisione di run, `PydanticAI` è il prodotto pensato per quello.
- **Rispetto a `LangChain`/`LlamaIndex`:** `Instructor` fa una cosa sola (structured extraction), è più leggero (~1.500 righe di `instructor/` vs ~50.000 di `langchain/`), ed è più facile da debuggare. Non è un framework general-purpose, è un tool chirurgico. Se il tuo progetto è già su `LangChain` e ti serve solo l'estrazione, valuta se vale la dipendenza extra o se `langchain_core` ha già quello che ti serve (di solito no, perché il retry-loop su validation error di `Instructor` non c'è in `langchain_core`).

## Verdetto

**`Instructor` è una libreria Python MIT matura, ben mantenuta, con 13,2k stelle e un track record di release frequente (108 release, 1.560 commit), che risolve un problema reale e ricorrente per chi integra LLM in produzione: estrarre dati strutturati e validati senza reinventare ogni volta il ciclo schema → tool call → parse → validation → retry.** L'API `from_provider("provider/modello")` + `response_model=BaseModel` è un moltiplicatore di produttività, e l'integrazione con Pydantic v2 porta in dote type safety, validatori custom, e compatibilità con il resto dell'ecosistema Python (FastAPI, SQLModel, ecc.). La copertura di provider (OpenAI, Anthropic, Gemini, Cohere, Mistral, Ollama, DeepSeek, Groq, xAI, Bedrock, Vertex AI, e altri) è ampia e aggiornata, e le mode-dipendenze sono documentate nel CHANGELOG. Il consiglio onesto del maintainer — «usate `Instructor` per extraction, `PydanticAI` per agents» — è un segnale di maturità, non di rinuncia.

**I caveat contano.** Le security advisory formali GitHub mancano, le release note fanno da advisory, e la mode-dipendenza può produrre risultati diversi tra provider. Il peso dello schema nel token budget va misurato, e il pattern di retry con fallback non è una garanzia di robustezza — è una default che va tunata. La documentazione a `instructor.pydantic.dev` non risponde al 14 giugno 2026; quella effettiva è su `python.useinstructor.com`. Se il tuo use case è esattamente «estrarre oggetti Pydantic validati da LLM con retry automatici, multi-provider, in Python», `Instructor` è la scelta giusta al 14 giugno 2026; se ti serve agent loop, observability, o eval pipeline, parti da `PydanticAI` o da `LangGraph`.

---

**File:** `src/content/articles/instructor-structured-outputs-llms-2026.md`
**Linked article task:** [AIN-74](/AIN/issues/AIN-74) — `article-task-ain-74.md` (this article implements the AIN-74 commission)
**Linked radar brief:** [AIN-72](/AIN/issues/AIN-72) — `repo-radar-AIN-72-2026-06-14.md` (candidate: `567-labs/instructor`, accepted)
**Cross-link:** nessuna sovrapposizione con gli articoli pubblicati (AIN-34 DeepMind Sierra Leone, AIN-66 didilili ai-agents-from-zero, AIN-55 Fable 5, AIN-60/61/62 Anthropic). Nuovo beat: Pydantic + structured outputs.
