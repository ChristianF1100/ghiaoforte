// Aggiungi una news = aggiungi un oggetto. La home mostra automaticamente quella con la data più recente.
export interface Article { id: string; title: string; date: string; img: string; excerpt: string; tags: string[]; body: string[] }
export const news: Article[] = [
  { id: 'nuova-maglia-home', title: 'Presentata la nuova maglia Home: il colore della ghiaia', date: '2026-11-08', img: 'news/n1.svg', tags: ['shop', 'prima squadra'],
    excerpt: 'Ispirata ai colori delle antiche cave, la nuova divisa debutta con un design pulito e un dettaglio dedicato ai sessant\'anni di storia.',
    body: ['La nuova maglia Home reinterpreta i colori sociali con una trama che richiama la ghiaia da cui il club prende il nome. Il collo è rifinito con un inserto color ruggine.', 'All\'interno del colletto compare la scritta «Dal 1964», omaggio a chi ha fondato la società. La divisa è già disponibile nello shop ufficiale.'] },
  { id: 'serata-tifosi', title: 'Una serata insieme: tifosi e squadra a cena sotto la tribuna', date: '2026-10-25', img: 'news/n2.svg', tags: ['tifosi', 'eventi'],
    excerpt: 'Oltre duecento persone hanno riempito lo stadio per la tradizionale cena del tifoso, tra racconti, brindisi e canti.',
    body: ['Tavolate lunghe sotto la tribuna coperta, cucina curata dai volontari e tanta musica: la cena del tifoso si conferma l\'appuntamento più sentito dell\'autunno.', 'La squadra ha firmato maglie e sciarpe per i presenti, mentre i più piccoli hanno giocato sul campo fino a tarda sera.'] },
  { id: 'lavori-tribuna', title: 'Concluso il rifacimento dei seggiolini della tribuna', date: '2026-10-10', img: 'news/n3.svg', tags: ['impianto', 'iniziative'],
    excerpt: 'Nuovi seggiolini nei colori sociali e una zona dedicata ai tifosi più caldi: il Comunale «Le Cave» si rinnova.',
    body: ['I lavori, durati poche settimane, hanno interessato tutta la tribuna centrale con nuovi sedili e una verniciatura completa.', 'Resta invariata l\'atmosfera: la curva continuerà a essere il cuore del tifo.'] },
  { id: 'ritiro-preparazione', title: 'Fine ritiro: la rosa 2026/2027 prende forma', date: '2026-09-02', img: 'news/n4.svg', tags: ['prima squadra', 'allenamenti'],
    excerpt: 'Tre settimane di lavoro intenso tra corsa, tattica e amichevoli interne per il gruppo che affronterà la nuova stagione.',
    body: ['Il ritiro estivo si è chiuso con una grande partitella tra compagni, davanti a un centinaio di sostenitori.', 'Un gruppo affiatato, con un mix di esperienza e giovani talenti arrivati nel corso dell\'estate.'] },
  { id: 'mostra-foto-storiche', title: '60 anni in una foto: la mostra del Ghiaforte nel centro del paese', date: '2026-07-18', img: 'news/n5.svg', tags: ['storia', 'eventi'],
    excerpt: 'Immagini d\'archivio, maglie d\'epoca e oggetti dei fondatori allestiti nella sala civica.',
    body: ['Decine di fotografie raccontano le origini del club, dai primi campi di ghiaia alla promozione del 1996.', 'La mostra ha richiamato famiglie e vecchie glorie; molti hanno riconosciuto volti e momenti della propria giovinezza.'] },
  { id: 'giornata-solidarieta', title: 'Una giornata di solidarietà con il paese', date: '2026-05-30', img: 'news/n6.svg', tags: ['iniziative', 'tifosi'],
    excerpt: 'I giocatori hanno incontrato le associazioni locali in una giornata di giochi e raccolta fondi.',
    body: ['La società ha aperto il Comunale alle associazioni del territorio per un pomeriggio di sport e festa.', 'Il ricavato sarà destinato ad attività a favore della comunità.'] },
  { id: 'premio-fedelta', title: 'Premiati i tifosi più fedeli della stagione 2025/2026', date: '2026-05-12', img: 'news/n7.svg', tags: ['tifosi', 'eventi'],
    excerpt: 'Una targa speciale a chi non ha mai mancato una domenica: il ringraziamento del club ai suoi sostenitori.',
    body: ['Sul prato del Comunale la squadra ha consegnato i riconoscimenti agli abbonati più assidui.', 'Applausi, foto ricordo e una promessa: ritrovarsi tutti in tribuna alla prossima stagione.'] },
]
export const sortedNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date))
export const latestNews = () => sortedNews()[0]
