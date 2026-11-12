// Aggiungi una news = aggiungi un oggetto. La home mostra automaticamente quella con la data più recente.
export interface Article { id: string; title: string; date: string; img: string; excerpt: string; tags: string[]; body: string[] }
export const news: Article[] = [
  { id: 'nuova-maglia-home', title: 'Presentata la nuova maglia Home: il colore della ghiaia', date: '2026-11-08', img: 'news/n1.svg', tags: ['shop', 'prima squadra'],
    excerpt: 'Ispirata ai colori delle antiche cave, la nuova divisa debutta con un design pulito e un dettaglio dedicato ai sessant\'anni di storia.',
    body: ['La nuova maglia Home reinterpreta i colori sociali con una trama che richiama la ghiaia da cui il club prende il nome. Il collo è rifinito con un inserto color ruggine.', 'All\'interno del colletto compare la scritta «Dal 1964», omaggio a chi ha fondato la società. La divisa è già disponibile nello shop ufficiale.'] },
]
export const sortedNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date))
export const latestNews = () => sortedNews()[0]
