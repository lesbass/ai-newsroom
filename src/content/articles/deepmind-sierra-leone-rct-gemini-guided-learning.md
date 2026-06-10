---
title: "DeepMind in Sierra Leone: il primo RCT pre-registrato sull'AI tutor misura +0,258 SD in matematica"
description: "Uno studio randomizzato con 1.763 studenti e 12 scuole in Sierra Leone mostra che la modalità Guided Learning di Gemini fa guadagnare 1,2-1,7 anni di apprendimento in otto settimane. Ma è un singolo trial, in un solo paese, e il divario di rendimento si allarga."
pubDate: 2026-06-10
author: "AI Newsroom"
tags: ["ricerca", "istruzione", "rct", "deepmind", "gemini"]
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

Il 9 giugno 2026 Google DeepMind e la onlus [Fab AI](https://www.fab-ai.org/) hanno pubblicato i risultati della prima sperimentazione controllata e randomizzata (RCT) pre-registrata sull'uso di un tutor generativo basato su intelligenza artificiale in un sistema scolastico a basso reddito. Il trial, condotto in 12 scuole secondarie inferiori del distretto di Port Loko in Sierra Leone con 1.763 studenti, ha confrontato per otto settimane classiche che usavano la modalità *Guided Learning* di Gemini con classi di controllo che proseguivano la didattica tradizionale.

Il risultato principale: **+0,258 deviazioni standard** nei punteggi di matematica a favore del gruppo di trattamento — un effetto che DeepMind traduce, sulla base di benchmark di apprendimento tipico in paesi a basso e medio reddito, in **1,2-1,7 anni di progresso scolastico compressi in otto settimane**. Nelle classi in cui gli insegnanti hanno centrato il target di 12 ore d'uso, l'effetto sale a **+0,38 SD**, equivalenti a **1,8-2,5 anni** di apprendimento.

Non è una prova definitiva, ma è la prova più rigorosa resa pubblica finora sull'AI tutoring generativo in un contesto scolastico reale a risorse limitate. E dice tre cose utili — più una da non ignorare.

## Cosa è stato misurato (e come)

Lo studio è **pre-registrato**: protocollo, ipotesi e analisi sono stati definiti *prima* della raccolta dati, riducendo il rischio di cherry-picking dei risultati. Il campione è ampio per gli standard dell'edtech accademica (1.763 studenti, 48 classi di matematica tra settimo e ottavo anno), e la randomizzazione è avvenuta a livello di classe per evitare contaminazioni.

L'endpoint primario è il cambiamento in test di matematica validati esternamente, su argomenti come frazioni, esponenti e numeri primi. Il controllo proseguiva la didattica abituale, senza AI. Otto settimane è una finestra breve, ma è già più lunga della maggior parte delle sperimentazioni brevi che si vedono nel settore.

## L'engagement è la notizia, non il learning gain

Il dato che più colpisce non è il +0,258 SD in sé — è che **il 69% degli studenti** ha raggiunto o superato il target d'uso, con una media di 15 ore di Gemini per studente. È un ordine di grandezza superiore al cosiddetto [«Five Percent Problem»](https://www.educationnext.org/5-percent-problem-online-mathematics-programs-may-benefit-most-kids-who-need-it-least/), il riferimento consolidato che descrive come la maggior parte dei programmi educativi digitali faccia registrare tassi di adesione volontaria intorno al 5% (Education Next, 2018).

Attenzione però: engagement non è apprendimento. L'effetto sui punteggi è misurato dal pre/post test, non dalle ore d'uso. Il fatto che 12 ore d'uso producano effetti più marcati suggerisce una relazione dose-risposta, ma è una correlazione, non una prova che *più ore causino più apprendimento*. DeepMind non sostiene il contrario, e l'articolo non dovrebbe.

## Le interazioni raccontano un altro pezzo di storia

Su oltre **113.000 conversazioni** analizzate, il **91,4%** delle interazioni è stato dedicato a costruire comprensione concettuale, non a cercare la risposta. Gemini ha posto domande di scaffolding nel **76%** dei messaggi, e ha fornito risposte dirette solo nel **2%** dei casi. Nel corso delle otto settimane le query orientate alla costruzione di competenze sono passate dal **68% al 90%**, mentre quelle orientate a ottenere soluzioni sono scese dal **25% al 10%**.

Sono numeri che raccontano un uso disciplinato del tutor — non un chatbot che "spiega i compiti". Sono anche il motivo per cui i risultati non sono automaticamente esportabili a un qualsiasi modello linguistico usato come tutor: qui il trattamento è *Guided Learning*, una modalità pedagogica specifica, non "Gemini in generale".

## Cosa dice DeepMind che spesso non viene riportato

Il blog e il report non sono trionfalistici. Il punto onesto che gli autori stessi mettono in primo piano è il **"achievement gap"**: gli studenti che entravano nel trial con competenze matematiche più solide hanno beneficiato di più. È esattamente l'opposto di ciò che servirebbe a chi progetta strumenti compensativi, ed è il principale argomento contro una lettura acritica del risultato.

Gli autori lo dicono in modo diretto: "to offer tools that deliver the strongest gains for the students who need it most". Riportare questo caveat non è prudenza eccessiva — è il contrario: la prova regge meglio se il suo contro-limite è esplicito.

## Tre cose che lo studio *non* ci dice

1. **Non ci dice che 12 ore d'uso siano la dose giusta per ogni contesto.** Il target di 12 ore è una scelta del protocollo, non un'ottimizzazione appresa dal trial.
2. **Non ci dice se l'effetto persiste.** Otto settimane non testano la ritenzione a lungo termine, e nessuna misura di follow-up è stata ancora riportata.
3. **Non ci dice se *qualunque* tutor socratico ben progettato produrrebbe risultati simili.** Il trattamento è *Gemini Guided Learning*, non "AI generativa in classe". La distanza tra i due è esattamente la domanda aperta che ulteriori RCT — annunciati da DeepMind — dovranno affrontare.

## Cosa fare con questo studio (per chi costruisce, insegna, finanzia)

- **Per chi costruisce prodotti edtech:** l'evidenza è su una *modalità pedagogica* (Socratic scaffolding con target d'uso esplicito), non su un modello. Replicare il setting — protocollo breve di onboarding docente, target d'uso misurabile, valutazione esterna — è più rilevante del modello sottostante.
- **Per i sistemi scolastici in paesi a basso reddito:** la combinazione "insegnante al centro + tutor AI a scaffolding + obiettivo d'uso" è una architettura testata e misurabile. Vale la pena un pilot locale, non un acquisto bulk.
- **Per i finanziatori:** il report tecnico e il [playbook RCT](https://goo.gle/LearnLM-SierraLeone-Playbook) rilasciati da DeepMind sono un punto di partenza insolitamente aperto. Finanziare repliche indipendenti in altri paesi è la leva con il miglior ritorno informativo.

## Verdetto

Un RCT pre-registrato, in un solo paese, otto settimane, con un campione ampio e una traduzione in "anni di scuola" che è degli autori, non una misura diretta. L'effetto è reale e rilevante. Il rischio è leggerlo come un verdetto anziché come il primo dato solido di una serie che deve ancora arrivare.

> "We must also rigorously study the results of our innovations…I am therefore delighted that we now have strong evidence that carefully designed AI can help improve learning outcomes in support of our many hard-working teachers."

— Conrad Sackey, Ministro dell'Istruzione di Base e Secondaria Superiore della Sierra Leone, nel blog DeepMind del 9 giugno 2026.
