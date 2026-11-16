// Aggiungi una news = aggiungi un oggetto. La home mostra automaticamente quella con la data più recente.
export interface Article { id: string; title: string; date: string; img: string; excerpt: string; tags: string[]; body: string[] }
export const news: Article[] = [
{ 
  id: 'nuova-maglia-home', 
  title: 'Presentata la nuova maglia Home: l\'identità di Ghiaoforte cucita addosso', 
  date: '2026-11-08', 
  img: 'news/n1.png', 
  tags: ['shop', 'prima squadra'],
  excerpt: 'Nero, verde bosco e arancione: la nuova divisa ufficiale racchiude la storia, il territorio e le origini leggendarie del club.',
  body: [
    'La nuova maglia Home unisce in un unico design i tre colori che definiscono l\'anima dell\'AS Ghiaoforte. Il nero profondo celebra la strada e la panchina da cui tutto è iniziato nel 1979; il verde bosco rende omaggio alle colline e al terreno calpestato in decenni di lotte domenicali; l\'arancione luminoso richiama i mandarini, simbolo storico dell\'impegno e della passione che tengono in vita la società.',
    'La divisa è stata indossata per la prima volta in via ufficiale dal capitano della squadra, Reijnders, incarnando con orgoglio la fascia e il peso della nostra storia. La maglia è già disponibile nello shop ufficiale.'
  ] 
},
{
    id: 'acquisto-igor-jesus',
    title: 'Colpo di mercato in attacco: arriva Igor Jesus',
    date: '2026-11-12',
    img: 'news/n2.png',
    tags: ['mercato', 'prima squadra'],
    excerpt: 'La nuova punta centrale lascia la Premier League per sposare il progetto dell\'AS Ghiaoforte.',
    body: [
      'L\'AS Ghiaoforte comunica l\'acquisto a titolo definitivo dell\'attaccante Igor Jesus. Il giocatore ha rinunciato agli ingaggi milionari percepiti al Nottingham Forest in Premier League per accettare un contratto basato principalmente sulla passione per il verdenero e sulla promessa di un rimborso spese puntuale, o quasi.',
      'Già a disposizione di Mr. Fistiggi e sceso regolarmente in campo per i primi allenamenti, Igor Jesus ha dimostrato grande entusiasmo, motivato a dare il suo contributo per far crescere una squadra che ha decisamente bisogno di qualcuno capace di segnare'
    ]
  }
]
export const sortedNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date))
export const latestNews = () => sortedNews()[0]
