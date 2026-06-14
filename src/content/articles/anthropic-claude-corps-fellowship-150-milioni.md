---
title: "Anthropic lancia Claude Corps: $150M, 1.000 fellow, 12 mesi nelle nonprofit USA"
description: "Anthropic mette 150 milioni di dollari iniziali in un programma nazionale di fellowship che recluterà 1.000 persone all'inizio della carriera, le formerà su Claude e le inserirà per un anno in almeno 400 organizzazioni nonprofit americane. I partner sono CodePath e Social Finance. È un modello operativo, non un hackathon — e per i lettori italiani vale la pena studiarne l'architettura."
pubDate: 2026-06-13
author: "AI Newsroom"
tags: ["anthropic", "claude", "nonprofit", "lavoro", "fellowship", "programma"]
sources:
  - title: "Introducing Claude Corps (Anthropic newsroom)"
    url: "https://www.anthropic.com/news/claude-corps"
    date: 2026-06-11
    type: primary
  - title: "Claude Corps — Program page (Anthropic)"
    url: "https://www.anthropic.com/claude-corps"
    date: 2026-06-11
    type: primary
  - title: "Policy on the AI Exponential (Anthropic)"
    url: "https://www.anthropic.com/policy-on-the-ai-exponential"
    date: 2026-06-10
    type: primary
  - title: "CodePath"
    url: "https://www.codepath.org/"
    date: 2026-06-11
    type: secondary
  - title: "Social Finance"
    url: "https://socialfinance.org/"
    date: 2026-06-11
    type: secondary
highRiskClaims: false
---

L'11 giugno 2026 Anthropic ha annunciato [Claude Corps](https://www.anthropic.com/news/claude-corps), un programma nazionale di fellowship della durata di un anno che, nei prossimi dodici mesi, recluterà **1.000 persone all'inizio della carriera** — retribuite **85.000 dollari l'anno più benefit** — e le distribuirà in **almeno 400 organizzazioni nonprofit** americane. L'impegno economico iniziale è di **150 milioni di dollari**, gestito da tre organizzazioni: **Anthropic** (funding, strategia e competenza tecnica su Claude), **[CodePath](https://www.codepath.org/)** (employer of record dei fellow e training iniziale intensivo) e **[Social Finance](https://socialfinance.org/)** (misurazione d'impatto, valutazione, e un "veicolo finanziario" pensato per rendere il programma scalabile).

Non è un hackathon, una sponsorizzazione accademica o un grant. È un'assunzione di un anno, full-time, in presenza, di mille persone che imparano Claude bene, vengono abbinate a una nonprofit, e ci lavorano per dodici mesi. La prima coorte di 100 fellow apre le candidature l'11 giugno e le chiude il **17 luglio 2026**; la prima coorte inizia a **ottobre 2026**, la seconda a **gennaio 2027**, la terza ad **agosto 2027**, su base rolling. I requisiti: almeno 18 anni, meno di due anni di esperienza lavorativa full-time, nessun titolo di studio richiesto, sola l'autorizzazione a lavorare negli Stati Uniti.

## Cosa è successo

Il programma nasce da una premessa esplicita: "[i benefici di sistemi di intelligenza artificiale trasformativi potrebbero arrivare al costo di una disruption significativa](https://www.anthropic.com/news/claude-corps)", e "[l]e aziende che costruiscono questa tecnologia hanno la responsabilità di assicurarsi che i benefici siano pienamente realizzati e ampiamente condivisi, e di investire direttamente nei lavoratori che assorbono il cambiamento". L'annuncio arriva un giorno dopo il policy framework sul lavoro che Anthropic ha pubblicato il 10 giugno — "[Policy on the AI Exponential](https://www.anthropic.com/policy-on-the-ai-exponential)" — e, nelle parole stesse dell'azienda, le due mosse vanno lette insieme.

Il modello è semplice e poco ambiguo. Ogni fellowship dura 12 mesi. All'inizio, Anthropic e CodePath fanno training intensivo su Claude in contesti nonprofit. Una volta inseriti nell'organizzazione ospitante, i fellow ricevono **5 ore settimanali** di formazione continuativa, supporto da un mentor di CodePath, *office hours* tecniche di Anthropic, e un budget ampio di token Claude. Anthropic copre "salary, benefits, training, and ongoing support" — esattamente la formula usata sulla [pagina dedicata al programma](https://www.anthropic.com/claude-corps). La nonprofit ospitante mette a disposizione il progetto e la propria struttura operativa; il budget del fellow non è a carico suo.

La pagina dedicata elenca **19 organizzazioni ospitanti**: Code for America, International Rescue Committee, Goodwill Industries International, RAINN, StriveTogether, Year Up United, Pacific Community Ventures, YMCA of Greater Charlotte, YMCA of Greater Cincinnati, e altre. Non è un elenco vetrina: Code for America (gov-tech), International Rescue Committee (humanitario), RAINN (sostengo a sopravvissuti di violenza), StriveTogether (istruzione place-based), Pacific Community Ventures (sotto-servito *underwriting* per piccole imprese), Goodwill Industries International (forza lavoro) — sono organizzazioni di sostanza, con mission pubbliche coerenti con l'uso di strumenti AI. Anthropic dichiara che, nei prossimi dodici mesi, almeno 400 nonprofit ospiteranno i fellow, e che questa è la prima coorte di un programma che intende "scalare ben oltre i 1.000".

## Perché interessa

**Primo: è una mossa di posizionamento in una settimana densa per Anthropic.** Lo stesso mese di giugno 2026 ha visto Anthropic rilasciare Fable 5 e Mythos 9 (9 giugno), fare marcia indietro pubblica sulle [safeguard invisibili su Fable 5](https://x.com/ClaudeDevs/status/2064949876463645026) (11 giugno) e pubblicare il policy framework sul lavoro (10 giugno). Claude Corps è l'altro lato della stessa medaglia: Anthropic chiede al governo un potere regolatorio, *e contemporaneamente* investe direttamente nei lavoratori che assorbono la transizione. Le due mosse vanno lette come **una strategia coerente**, non come notizie scollegate. (Sul fronte delle safeguard di Fable 5, la copertura è nella nostra storia del [Claude Fable 5 invisible safeguards reversal](https://x.com/ClaudeDevs/status/2064949876463645026), 11 giugno 2026.)

**Secondo: il "modello operativo" è replicabile, e Anthropic lo sa.** Tre organizzazioni, ruoli puliti: chi mette i soldi (Anthropic), chi gestisce le persone (CodePath come employer of record — un'idea che qualunque laboratorio, fondazione o grande azienda tech può adottare per evitare di costruire un HR interno solo per il programma), chi misura l'impatto e costruisce il veicolo finanziario per scalare (Social Finance). È un'**architettura**, non un hackathon, e per il lettore italiano vale la pena studiarla.

**Terzo: la parte open-source è la più sottostimata.** Anthropic non promette di rilasciare Claude, ma promette di open-source "alcune delle tecnologie e infrastrutture core che abilitano questo programma a funzionare". Per chiunque abbia provato a costruire un programma simile, la parte tecnica non banale è: *matching* tra 1.000 candidati e centinaia di host, *onboarding* training distribuito, *tracking* d'uso di token LLM per organizzazione e per progetto, *reporting* condiviso. Se Anthropic rilascia quei pezzi, diventa un toolkit concreto, non un annuncio.

## Cosa guardare

- **La deadline del 17 luglio 2026** per le candidature della prima coorte di 100 fellow. È l'unica data "hard" del programma: le coorti 2 e 3 sono su base rolling (gennaio 2027, agosto 2027), e le date sono *previste*, non *confermate*.
- **L'open-source del "core tech"**. Anthropic dichiara l'intenzione, non la data. Vale la pena monitorare `github.com/anthropics` (e qualunque organization pubblica che Anthropic dovesse creare) per i primi rilasci.
- **Partner aggiuntivi**. Oggi i partner sono CodePath e Social Finance. Se nei prossimi 60-90 giorni ne emergono altri (per esempio una fondazione europea che apre alla replicabilità internazionale, tema che Anthropic esplicitamente dichiara di voler esplorare), diventa un *update*.
- **Conferma indipendente dei 19 host**. La lista è quella che Anthropic fornisce sul proprio sito. Al 13 giugno 2026 non risultano smentite pubbliche, ma se una delle nonprofit elencate smentisse la propria partecipazione, l'articolo va corretto.
- **Effetto sulla narrativa IPO**. Anthropic ha depositato la [draft S-1 in via riservata il 1 giugno 2026](https://www.anthropic.com/news/confidential-draft-s1-sec). Programmi di *societal benefit* di questa dimensione pesano nella narrativa S-1 e nella copertura stampa finanziaria: vale la pena menzionare *che* la mossa si colloca in un contesto IPO, **non** prevedere l'effetto.
- **Risultati del primo anno**. Social Finance gestirà la *measurement & evaluation*. Anthropic pubblicherà dati su outcome dei fellow, outcome delle nonprofit, e costo per "dollaro di missione avanzata". Fino ad allora, non ci sono risultati: chiunque dichiari "Claude Corps funziona" prima del primo report sta guardando la luna.

## Rischi e caveat

- **È una *fellowship temporanea*, non un posto di lavoro a tempo indeterminato.** Il programma copre 1.000 fellow in 3 coorti, full-time per 12 mesi ciascuna. L'ambizione di Anthropic è di "scalare ben oltre 1.000", ma "scalerà" non è "ha scalato". Dire che "Anthropic creerà 1.000 posti di lavoro" è una semplificazione che il lettore italiano fraintende.
- **Anthropic copre il *fellow*, non il budget operativo della nonprofit.** La distinzione è tecnica ma cruciale: la nonprofit guadagna una persona in più per un anno, *senza pagarla*. Il budget operativo della nonprofit resta a carico della nonprofit. Il modello non è "Anthropic finanzia le nonprofit" — è "Anthropic finanzia una persona che lavora per una nonprofit".
- **Le 19 organizzazioni elencate sono la lista di Anthropic, non una verifica indipendente.** Il blog post dell'11 giugno ne nomina 9 con descrizione; la [pagina dedicata](https://www.anthropic.com/claude-corps) ne elenca 19 con città. Usare la lista della pagina dedicata, non mescolare le due fonti.
- **Le date delle coorti 2 e 3 sono *previste*, non *confermate*.** Anthropic stessa dice "applications are open on a rolling basis for the next two cohorts" — è un piano, non un calendario vincolante.
- **"$150M" è un impegno iniziale, non un tetto.** Il post usa la parola "initial". "Inziale" è la parola chiave: cifra iniziale, non massimale.
- **Nessun confronto con altre fellowship** (Google.org Fellows, Microsoft AI for Good, OpenAI Residency, IBM SkillsBuild) **è possibile senza fonti primarie che descrivano quei programmi.** Un confronto non documentato diventa un paragrafo di opinione.
- **Al 13 giugno 2026 non risulta un programma analogo in UE con la stessa architettura** (impiego a tempo pieno, employer of record esterno, partner di *measurement*, target *early-career*). Se la fonte non c'è, l'articolo dice così: è più onesto.

## Cosa fare

**Per organizzazioni nonprofit e fondazioni italiane/UE.** La domanda non è "posso applicare alla prima coorte" (la prima coorte è solo USA), ma "è replicabile?". Le tre cose da studiare sono l'**architettura dei ruoli** (chi mette i soldi, chi gestisce le persone, chi misura), la **funzione di *employer of record*** (usare un partner esterno, non costruire HR interno per il programma), e l'**uso di un partner di *measurement & evaluation*** indipendente dal finanziatore. Un pilot locale con 5-10 fellow, ben *matching*-ato e con outcome misurati, è un primo passo sperimentale credibile; un *bulk purchase* no.

**Per AI lab e tech company che vogliono costruire un programma simile.** Il *template* è Anthropic + CodePath + Social Finance. L'ordine di lavoro che si ricava dall'annuncio è: (1) trovare un *employer of record* che non sia la vostra azienda — altrimenti diventa un programma di retention travestito; (2) trovare un partner di *measurement & evaluation* indipendente; (3) definire il *token budget* e la *training cadence* **prima** del bando, non dopo; (4) fissare da subito il calendario di *reporting* pubblico (altrimenti "misureremo" diventa un parolone vuoto).

**Per chi investe in *just transition* e formazione.** Il *veicolo finanziario* di Social Finance è la parte più interessante: un meccanismo che rende il programma scalabile *oltre* il finanziamento iniziale del donatore. Se ne esistono di analoghi in UE — i *social impact bond*, alcuni strumenti di InvestEU, *outcome fund* regionali — possono essere citati come paralleli solo se accompagnati da fonti primarie. Altrimenti, è una nota a margine.

## Verdetto

Claude Corps è una mossa seria e ben disegnata. È un *proof of concept* su scala nazionale di come una *frontier lab* può prendere sul serio la *just transition*: l'architettura dei ruoli è pulita, i partner sono verificabili, il calendario è dichiarato, e l'open-source promessa — almeno in parte — è una mossa da manuale di *ecosystem building*. Non è perfetto: il programma è *solo USA*, è *solo 12 mesi*, e i risultati del primo anno non ci sono ancora. Ma come *template* di programma, è il riferimento con cui i prossimi esperimenti di *lab → nonprofit* dovranno misurarsi.

Per il lettore italiano il valore è nel **modello**, non nel programma in sé. Claude Corps va letto insieme al Fable 5 *invisible safeguards* reversal, al policy framework sul lavoro, e alla draft S-1: è una delle mosse di giugno 2026 che definisce l'identità pubblica di Anthropic in un momento in cui l'azienda sta per diventare *public*. Non è un verdetto definitivo sul *singolo* programma — è un promemoria su come le big lab stiano rispondendo (o non rispondendo) alla domanda "chi paga il costo della transizione?".

> "If Claude Corps works, we'll have a foundation for something much larger: a model for widening AI's benefits during a period of vast economic change."

— Anthropic, *Introducing Claude Corps*, 11 giugno 2026.
