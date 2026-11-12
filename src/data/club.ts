// Informazioni della società: modifica qui testi, impianto e social.
export const club = {
  name: 'Ghiaforte', shortName: 'GF', founded: 1964,
  tagline: 'Forti come la ghiaia che ci ha visto nascere.',
  description: 'Società calcistica nata sul campo di ghiaia di un paese di cava, cresciuta con il lavoro e la passione di un intero territorio.',
  story: [
    { year: '1964', title: 'La fondazione', text: 'Un gruppo di operai delle cave e di ragazzi del paese traccia un campo sulla ghiaia dietro la vecchia fornace. Nasce il Ghiaforte, con maglie prestate e porte di legno.' },
    { year: '1978', title: 'Il primo campo in erba', text: 'Dopo anni di sacrifici e raccolte fondi, la società inaugura il terreno in erba naturale: la prima festa di tutto il paese.' },
    { year: '1996', title: 'La promozione storica', text: 'Una stagione indimenticabile porta il Ghiaforte nella categoria superiore, tra gli abbracci di una tribuna gremita.' },
    { year: '2011', title: 'Il nuovo impianto', text: 'Viene inaugurato il Comunale «Le Cave», completamente ristrutturato con tribuna coperta e nuovi spogliatoi.' },
    { year: '2024', title: 'Sessant\'anni di storia', text: 'Una grande festa con ex giocatori, tifosi e famiglie celebra sei decenni di calcio e di appartenenza.' },
  ],
  values: [
    { title: 'Territorio', text: 'Il Ghiaforte è del paese: nasce qui, gioca qui, vive con chi lo sostiene.' },
    { title: 'Spirito di squadra', text: 'Si vince e si perde insieme, dal primo all\'ultimo giocatore della rosa.' },
    { title: 'Passione', text: 'Ogni domenica è un\'occasione per onorare i colori, con entusiasmo e rispetto.' },
    { title: 'Impegno', text: 'Allenarsi ogni giorno, con umiltà: è così che si costruisce l\'appartenenza.' },
  ],
  venue: {
    name: 'Stadio Comunale «Le Cave»', address: 'Via delle Cave, 1 — Ghiaforte',
    description: 'Campo in erba naturale con tribuna coperta, spogliatoi rinnovati e un\'area per i tifosi affacciata sul terreno di gioco.',
    facts: ['Fondo: erba naturale', 'Tribuna coperta', 'Spogliatoi rinnovati', 'Parcheggio adiacente'],
    training: [{ day: 'Martedì', time: '19:30 – 21:30' }, { day: 'Mercoledì', time: '19:30 – 21:30' }, { day: 'Giovedì', time: '19:30 – 21:30' }, { day: 'Venerdì', time: '18:30 – 20:00 (rifinitura)' }],
    // Per le indicazioni stradali inserisci un indirizzo verificabile (es. "Via Roma 1, 20100 Milano").
    // Lasciato vuoto: il pulsante non viene mostrato e la mappa è dimostrativa.
    mapsQuery: '',
    images: ['stadium/s1.svg', 'stadium/s2.svg'],
  },
  social: [{ label: 'Instagram', url: '#/' }, { label: 'Facebook', url: '#/' }, { label: 'YouTube', url: '#/' }],
}
