---
title: "smolagents (Hugging Face): agenti che pensano in codice Python invece che in chiamate JSON"
description: "La libreria Hugging Face per costruire agenti LLM in cui le azioni sono snippet Python eseguibili, non dizionari JSON. 27.8k stelle, Apache 2.0, ultima release v1.26.0 del 29 maggio 2026. Sandbox obbligatoria per l'esecuzione del codice."
pubDate: 2026-06-14
author: "AI Newsroom"
tags: ["huggingface", "smolagents", "agent", "code-agent", "open-source", "mcp", "langchain", "sandbox", "framework", "repository-feature"]
sources:
  - title: "huggingface/smolagents (GitHub repository)"
    url: "https://github.com/huggingface/smolagents"
    date: 2026-06-14
    type: primary
  - title: "smolagents — REST API metadata (stars, forks, license, pushed_at)"
    url: "https://api.github.com/repos/huggingface/smolagents"
    date: 2026-06-14
    type: primary
  - title: "smolagents — releases endpoint (latest tag, changelog)"
    url: "https://api.github.com/repos/huggingface/smolagents/releases?per_page=10"
    date: 2026-06-14
    type: primary
  - title: "smolagents — v1.26.0 release page (2026-05-29)"
    url: "https://github.com/huggingface/smolagents/releases/tag/v1.26.0"
    date: 2026-06-14
    type: primary
  - title: "smolagents — documentazione ufficiale (index, installazione, quickstart)"
    url: "https://huggingface.co/docs/smolagents/index"
    date: 2026-06-14
    type: primary
  - title: "smolagents — Secure code execution (tutorial sandboxing)"
    url: "https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution"
    date: 2026-06-14
    type: primary
  - title: "smolagents — Conceptual guides: What are agents? (Code Agents section)"
    url: "https://huggingface.co/docs/smolagents/en/conceptual_guides/intro_agents"
    date: 2026-06-14
    type: primary
  - title: "Introducing smolagents: a simple library to build agents (HF blog, 2024-12-31)"
    url: "https://huggingface.co/blog/smolagents"
    date: 2024-12-31
    type: secondary
  - title: "Executable Code Actions Elicit Better LLM Agents — Wang et al., 2024 (CodeAct paper, arXiv:2402.01030)"
    url: "https://huggingface.co/papers/2402.01030"
    date: 2024-06-07
    type: secondary
highRiskClaims: true
---

Al 14 giugno 2026 il repository pubblico **[`huggingface/smolagents`](https://github.com/huggingface/smolagents)** — libreria Python di Hugging Face per costruire agenti LLM — conta **27.843 stelle, 2.687 fork, 595 issue aperte**, è distribuito sotto **licenza Apache 2.0**, ed è in sviluppo attivo: ultimo push al branch `main` il **9 giugno 2026**, ultima release pubblicata **v1.26.0** il **29 maggio 2026** ([GitHub Releases, 14 giugno 2026](https://api.github.com/repos/huggingface/smolagents/releases?per_page=10)). Il suo posizionamento è sintetizzato dal README: _«a barebones library for agents that think in code»_ — una libreria minima in cui il LLM, invece di produrre un dizionario JSON con il nome dello strumento e gli argomenti, **scrive direttamente snippet di Python** che vengono eseguiti per portare a termine il task.

## Cosa è successo

`smolagents` è stato rilasciato da Hugging Face il **31 dicembre 2024** ([HF blog, 2024-12-31](https://huggingface.co/blog/smolagents)) come **successore** della precedente `transformers.agents` ([HF blog, 2024-12-31](https://huggingface.co/blog/smolagents)). La libreria espone due classi principali di agenti, definite nella [documentazione ufficiale](https://huggingface.co/docs/smolagents/index):

- **`CodeAgent`** — l'agente «pensante in codice». A ogni passo del ciclo ReAct (Thought → Action → Observation) il modello emette un **blocco di Python** che viene eseguito dall'interprete; l'output (o l'errore) rientra in memoria e diventa l'osservazione del passo successivo.
- **`ToolCallingAgent`** — la variante che produce azioni nel formato standard «JSON / blob di testo con nome strumento + argomenti», utile quando il modello o l'infrastruttura non gestiscono bene Python eseguibile.

L'installazione è una riga ([smolagents docs, 14 giugno 2026](https://huggingface.co/docs/smolagents/index)): `pip install 'smolagents[toolkit]'` per l'installazione di base, con dipendenze opzionali per integrazioni specifiche (`[docker]`, `[e2b]`, `[modal]`, `[blaxel]`, `[litellm]`, `[transformers]`, `[mcp]`, `[telemetry]`). Il quickstart della documentazione è volutamente minimale:

```python
from smolagents import CodeAgent, InferenceClientModel, DuckDuckGoSearchTool

model = InferenceClientModel()  # default Hugging Face Inference API
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=model)
result = agent.run("What is the current weather in Paris?")
```

L'elenco delle integrazioni supportate al 14 giugno 2026 copre l'ecosistema operativo principale di un agente Python moderno ([smolagents docs](https://huggingface.co/docs/smolagents/index), [secure_code_execution tutorial](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)):

- **Modelli:** `InferenceClientModel` (Hugging Face Inference API), `LiteLLMModel` (OpenAI, Anthropic e altri 100+ provider), `TransformersModel` (modelli locali via `transformers`), `vLLMModel`, `AmazonBedrockModel`.
- **Tool:** qualsiasi funzione Python decorata con `@tool` ([HF blog](https://huggingface.co/blog/smolagents)), tool da un [MCP server](https://modelcontextprotocol.io/) (`ToolCollection.from_mcp`), tool [LangChain](https://python.langchain.com/) (`Tool.from_langchain`), tool caricati da un [Hub Space](https://huggingface.co/spaces) (`Tool.from_space`).
- **Esecuzione del codice:** `LocalPythonExecutor` (custom, di default — _non è un sandbox di sicurezza_), `DockerExecutor`, `E2BExecutor`, `ModalExecutor`, `BlaxelExecutor`, `WasmExecutor` (quest'ultimo rimosso in modalità remota nella [v1.26.0](https://github.com/huggingface/smolagents/releases/tag/v1.26.0)).

I numeri di release utili al 14 giugno 2026, presi dall'[endpoint releases della REST API GitHub](https://api.github.com/repos/huggingface/smolagents/releases?per_page=10): la libreria è in ciclo di rilascio fitto — **17 release pubblicate** tra il 17 novembre 2025 (v1.23.0) e il 29 maggio 2026 (v1.26.0), a un ritmo di circa **una release ogni 12–15 giorni**. La v1.25.0 (14 maggio 2026) ha introdotto miglioramenti specifici alla sicurezza dei remote executor: rimozione dell'`allow_origin` da Docker/Modal, uso di un token in `DockerExecutor` e `WasmExecutor`, isolamento della cache Deno per istanza in `WasmExecutor`, supporto di `pickle:...` correttamente decodificato, e — punto critico per la sicurezza — il rafforzamento del warning «**LocalPythonExecutor is not a security tool**» ([PR #2039](https://github.com/huggingface/smolagents/pull/2039)).

## Perché interessa

**1. Il paradigma «Code Agent» non è marketing, è una scelta di ricerca esplicita.** L'idea di far scrivere Python al modello invece di dizionari JSON è al centro di una linea di ricerca 2023–2024 ([CodeAct paper, Wang et al., 2024](https://huggingface.co/papers/2402.01030), pubblicato a ICML 2024). Il paper valuta 17 LLM su API-Bank e su un nuovo benchmark M3ToolEval di 82 task multi-tool: **CodeAct ottiene un tasso di successo superiore** in 12 LLM su 17 rispetto a JSON o testo, con un **miglioramento assoluto fino al 20%** sul modello migliore (gpt-4-1106-preview), **richiedendo fino al 30% di interazioni in meno** ([CodeAct paper, §2.3](https://huggingface.co/papers/2402.01030)). Le ragioni addotte nel paper sono quattro: **composabilità** (si possono annidare chiamate, definire funzioni, fare loop e condizionali in un'unica azione, cosa che il JSON non permette in modo naturale), **gestione degli oggetti** (l'output di un'azione può essere passato direttamente a un'azione successiva come variabile), **generalità** (Python è Turing-completo per definizione), e **training-data fit** (i LLM sono già addestrati su grandi quantità di Python di qualità, quindi la forma «azione = codice» è congeniale alla loro distribuzione). La [documentazione smolagents](https://huggingface.co/docs/smolagents/en/conceptual_guides/intro_agents) e il [blog HF del 31 dicembre 2024](https://huggingface.co/blog/smolagents) riprendono esattamente queste quattro motivazioni, segnalando che il passaggio `transformers.agents` → `smolagents` è avvenuto proprio per allineare la libreria di riferimento HF a CodeAct.

**2. Il sandboxing è esplicito, non opzionale.** La pagina [Secure code execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution) della documentazione parte da un'affermazione netta: _«By default, the CodeAgent runs LLM-generated code in your environment. This is inherently risky»_. Elenca quattro vettori di rischio (errore onesto del modello, supply chain su un LLM compromesso, prompt injection via web, agenti esposti al pubblico) e dichiara che nessun sandbox locale può essere sicuro al 100%:

> _«It's important to understand that no local python sandbox can ever be completely secure. While our interpreter provides significant safety improvements over the standard Python interpreter, it is still possible for a determined attacker or a fine-tuned malicious LLM to find vulnerabilities and potentially harm your environment.»_
>
> — [smolagents docs, secure_code_execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)

L'unica mitigazione robusta indicata è il **remote sandbox**: `DockerExecutor` (con un Dockerfile consigliato che usa `USER nobody`, `cap_drop=ALL`, `mem_limit=512m`, `no-new-privileges`), `E2BExecutor` (macchina remota su [e2b.dev](https://e2b.dev/)), `ModalExecutor` ([modal.com](https://modal.com/)), `BlaxelExecutor` ([blaxel.ai](https://blaxel.ai/)). Il `LocalPythonExecutor` di default, basato su un interprete Python riscritto da smolagents che cammina l'AST e blocca gli import non autorizzati, è un primo filtro (import autorizzati per estensione, no accesso a sub-moduli, conteggio operazioni limitato, definizione esplicita di tutte le operazioni supportate) — ma non un security boundary. La [PR #2039](https://github.com/huggingface/smolagents/pull/2039) «Emphasise sandboxing is required; LocalPythonExecutor is not a security tool» del 14 maggio 2026 ha rafforzato questo messaggio.

**3. Smolagents è una libreria HF, non un fork indipendente.** L'owner del repository è l'organizzazione `huggingface` ([API metadata, 14 giugno 2026](https://api.github.com/repos/huggingface/smolagents)) e la maggior parte delle release è firmata da `@albertvillanova` e `@aymeric-roucher` (HF staff). L'ecosistema di distribuzione è nativo Hugging Face: `push_to_hub()` per pubblicare un tool come Space, `Tool.from_space()` per consumarlo da un altro agente, integrazione con la [Hugging Face Inference API](https://huggingface.co/docs/inference-providers/index) tramite `InferenceClientModel`. Per un team che già usa HF Hub e i suoi Space come piattaforma di deploy, smolagents è l'opzione «a minor frizione» tra le librerie agent Python.

**4. La barriera d'ingresso è volutamente bassa — a costo di un trade-off esplicito.** Il file [`src/smolagents/agents.py`](https://github.com/huggingface/smolagents/blob/main/src/smolagents/agents.py) contiene «_the logic for agents fits in ~thousands lines of code_» ([HF blog, 2024-12-31](https://huggingface.co/blog/smolagents)). L'installazione è una riga, l'esempio «hello world» nel quickstart sono sei righe di Python. Questa semplicità è un vantaggio per chi vuole capire **come funziona** un agente, non solo usarne uno: l'interprete Python custom, il ciclo ReAct, il planning step, il sistema di memoria e il logging sono tutti leggibili. È un trade-off esplicito con librerie più pesanti a strati di astrazione (LangGraph, crewAI) che offrono multi-agent production-ready ma richiedono più lettura per essere capiti fino in fondo.

**5. Il dato di adozione è forte ma va letto con onestà.** 27.843 stelle e 2.687 fork al 14 giugno 2026 pongono smolagents tra le librerie agent Python più adottate, anche se il confronto va calibrato: `crewAI` è a 53.5k stelle (radar AIN-72, 14 giugno 2026), `langchain` è sopra le 100k, `autogen` è nell'ordine delle 50k. Smolagents compete sul **posizionamento** (Code Agents + semplicità), non sul volume assoluto. Le 595 issue aperte segnalano una base utenti ampia e attiva, ma anche un backlog non trascurabile.

## Cosa guardare

- **Sicurezza dei remote executor.** La [v1.25.0 (14 maggio 2026)](https://github.com/huggingface/smolagents/releases/tag/v1.25.0) ha già indurito `DockerExecutor`, `ModalExecutor` e `WasmExecutor` rimuovendo `allow_origin`, introducendo autenticazione a token e isolando le cache. Un monitoraggio costante del [CHANGELOG implicito nei release notes](https://github.com/huggingface/smolagents/releases) è d'obbligo: chi deploya smolagents in produzione deve sapere in tempo reale se un fix di sicurezza esce e in quale versione.
- **Aggiornamenti alla sicurezza del `LocalPythonExecutor`.** Il rilascio del 14 maggio 2026 ha rafforzato i warning, ma l'interprete resta il componente più critico per l'uso in local development. Nuove mitigazioni sono attese con ogni release minore.
- **Integrazione MCP.** La [documentazione](https://huggingface.co/docs/smolagents/index) cita esplicitamente `ToolCollection.from_mcp` per caricare tool da server MCP. Il ritmo di evoluzione della specifica MCP nel 2026 è elevato: tenere d'occhio le [release notes di smolagents](https://github.com/huggingface/smolagents/releases) per aggiornamenti a `from_mcp`, parsing di `anyOf`, supporto a output strutturati (introdotto nella [v1.22.0](https://github.com/huggingface/smolagents/releases/tag/v1.22.0)).
- **Modello di default su `InferenceClientModel`.** La v1.23.0 (17 novembre 2025) ha cambiato il default a `Qwen/Qwen3-Next-80B-A3B-Thinking`. Se HF cambia nuovamente il default, le ricette che girano in produzione potrebbero cambiare comportamento in modo silenzioso al prossimo bump.
- **Compatibilità con `huggingface-hub >= 1`.** Introdotta nella v1.25.0. Se una pipeline blocca `huggingface-hub<1.0.0` per altri motivi, l'upgrade a smolagents 1.25+ diventa un blocco operativo.
- **Documentazione in altre lingue.** Il progetto mantiene traduzioni in coreano (`i18n-KO`) e in spagnolo (`i18n-es`) attive. L'italiano non è presente al 14 giugno 2026.
- **Eventuali security advisory GitHub.** Il repository ha una [scheda Security](https://github.com/huggingface/smolagents/security) — verificare periodicamente che non escano advisory con CVE associate, soprattutto per il parsing di codice generato dal LLM.

## Rischi e caveat

1. **«Code Agents» non significa «sicuri per default».** Il `LocalPythonExecutor` esegue codice generato dal modello **nel vostro ambiente** ([smolagents docs, secure_code_execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)). La documentazione lo dice esplicitamente. Qualsiasi uso in produzione richiede `executor_type="docker"` (o equivalente E2B/Modal/Blaxel), con le limitazioni di risorse configurate. L'articolo non vende smolagents come «production-ready by default» — è production-ready **solo** se la sandbox è configurata correttamente.
2. **I numeri di performance del CodeAct paper vanno citati con il contesto.** Il [CodeAct paper, §2.3](https://huggingface.co/papers/2402.01030)) misura «fino al 20% di successo in più» e «fino al 30% di azioni in meno» sul modello migliore (gpt-4-1106-preview) e su un benchmark sintetico (M3ToolEval, 82 task multi-tool). Non è un benchmark di prodotto, è un risultato di ricerca. Per modelli open-source come Llama-2-7b o Mistral-7B i numeri assoluti sono molto più bassi (CodeActAgent-Mistral a 12.2% di success rate su M3ToolEval vs gpt-4-1106-preview al 74.4% — sempre paper, tabella 3). L'articolo non trasferisce «CodeAct funziona per tutti i modelli» come claim universale.
3. **Smolagents non è l'unica implementazione di Code Agents.** Esistono altri progetti che adottano paradigmi simili: il [CodeAct paper](https://huggingface.co/papers/2402.01030) cita TaskWeaver come lavoro concorrente; `autogen` (Microsoft) e `langgraph` (LangChain) supportano entrambi execution di codice. L'articolo non presenta smolagents come «l'unica» o «la migliore» implementazione.
4. **Rischio supply-chain via tool HF Hub.** `Tool.from_space` permette di caricare un tool da un Space HF di terze parti. Questo è comodo ma introduce una dipendenza dall'autore dello Space: codice di terze parti eseguito dal vostro agente. Verificare l'autore, il repository, le revisioni prima di importare tool di terze parti in un flusso di produzione.
5. **Le 595 issue aperte al 14 giugno 2026 segnalano manutenzione non perfetta.** Il backlog è alto in valore assoluto (un confronto: instructor, altra libreria Python di HF, ha ~50 issue aperte su 13.2k stelle — dato AIN-72). Non è un blocker, ma è un segnale di capacità di manutenzione da monitorare.
6. **Le performance claims non sono di smolagents, sono di CodeAct.** Quando si dice «Code Agents usano 30% meno passi», è il CodeAct paper che lo dimostra su un benchmark specifico. Smolagents è l'implementazione di riferimento; le performance dipendono dal modello sottostante e dal prompt.
7. **Le metriche di stelle / fork cambiano nel tempo.** 27.843 stelle e 2.687 fork sono osservati al 14 giugno 2026. Non sono un'istantanea permanente.

## Cosa fare

**Per AI engineer che valutano se adottare smolagents in produzione:** la regola non negoziabile è **sandboxing remoto prima di tutto**. Il setup minimo richiede `pip install 'smolagents[docker]'` e un `Dockerfile` con `USER nobody`, `cap_drop=ALL`, `no-new-privileges`, limiti di memoria e CPU ([esempio nella documentazione](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)). Chi ha già account E2B, Modal o Blaxel può partire con uno di quei provider e ottenere lo stesso livello di isolamento in 5 minuti, senza dover gestire Docker. Il `LocalPythonExecutor` va usato **solo** per prototipi locali e sperimentazione, mai per esecuzione su input non fidati.

**Per chi vuole capire come funziona un Code Agent «dal di dentro»:** smolagents è una delle letture più accessibili. Il file [`src/smolagents/agents.py`](https://github.com/huggingface/smolagents/blob/main/src/smolagents/agents.py) è la base (~1.000 righe di logica core secondo il README) e copre l'intero ciclo ReAct, la memoria, il planning, il logging. Il [tutorial «What are agents?»](https://huggingface.co/docs/smolagents/en/conceptual_guides/intro_agents) e il [blog di annuncio](https://huggingface.co/blog/smolagents) spiegano il paradigma. Tempo di onboarding: una serata, non una settimana.

**Per chi cerca un confronto con altri framework agent Python:** smolagents compete sul posizionamento (Code Agents + semplicità + HF-native), non sulla completezza di funzionalità multi-agent. Se l'obiettivo è **multi-agent production-ready** con tracciamento, controllo di flusso, persistenza e gestione ruoli, [LangGraph](https://langchain-ai.github.io/langgraph/) o [crewAI](https://github.com/crewAIInc/crewAI) offrono di più a costo di una curva di apprendimento più ripida. Se l'obiettivo è **Code Agents semplici e leggibili** con buon supporto MCP e LangChain, smolagents è la scelta naturale.

**Per chi vuole sperimentare con modelli open-weight via Hugging Face:** `InferenceClientModel` chiama l'Inference API di HF senza bisogno di chiavi OpenAI o Anthropic; per modelli locali, `TransformersModel` carica un modello via `transformers` in locale. Combinato con l'ecosistema Hub (tool pubblicati come Space, modelli su HF), smolagents diventa un modo per costruire agenti interamente con componenti open-weight, dalla parte del modello a quella del tool.

## Verdetto

**`huggingface/smolagents` è una libreria agent Python solida, ben mantenuta e posizionata con chiarezza sul paradigma Code Agents.** 27.843 stelle, Apache 2.0, 17 release negli ultimi sette mesi, security work attivo sui remote executor. Il fatto che sia di proprietà di Hugging Face e integrata nativamente con l'ecosistema HF Hub (Inference API, Spaces, modelli) la rende una scelta a bassa frizione per chi è già dentro quell'ecosistema.

Il valore reale non è la libreria in sé — è il **cambio di mentalità** che propone. In un ecosistema in cui la maggior parte delle librerie agent (incluso LangGraph, crewAI, autogen) usa il formato JSON per le tool call, smolagents mette il **codice Python** al centro delle azioni dell'agente, e lo fa con una libreria piccola abbastanza da essere letta e capita. È una scommessa di design non neutrale: accetta un rischio di esecuzione di codice più alto in cambio di espressività, composabilità e un miglior fit con i dati di training dei LLM moderni. La scommessa è supportata dal [CodeAct paper di Wang et al., 2024](https://huggingface.co/papers/2402.01030) su un benchmark sintetico, non da un confronto esaustivo su tutti i workload possibili.

Per un AI engineer italiano che vuole costruire agenti LLM nel 2026, smolagents merita di essere letto, installato e provato — **con il sandboxing remoto configurato fin dal primo commit**. Non è la libreria giusta per ogni caso d'uso (multi-agent complessi, controllo di flusso stretto, produzione enterprise con governance forte richiedono altri strumenti), ma è una delle poche che rende esplicito il paradigma Code Agents e che permette di capirlo, non solo di consumarlo. La [documentazione ufficiale](https://huggingface.co/docs/smolagents/index) e il [blog di annuncio](https://huggingface.co/blog/smolagents) sono il punto di ingresso; la pagina [Secure code execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution) è lettura obbligata prima di qualsiasi uso in produzione.
