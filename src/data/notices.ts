// ==========================================
// TICKER MESSAGES (AVVISI STADIO)
// ==========================================
export const tickerMessages = [
  'Attenzione: la crepa nel settore distinti si è allargata dopo l’ultima pioggia. Si consiglia ai tifosi più robusti di distribuirsi uniformemente.',
  'Si avvisano gli spettatori che la rete di recinzione dietro la porta nord presenta varchi larghi a sufficienza per far passare un pallone o un bambino.',
  'Attenzione ai tondini di ferro sporgenti lungo le scale della gradinata: l’antitetanica non è inclusa nel prezzo del biglietto.',
  'In caso di blackout durante le partite serali, restare fermi al proprio posto finché l’impianto di emergenza non decide di ripartire.',
  'Si raccomanda di non appoggiarsi alle balaustre del primo anello durante le esultanze: tengono ancora, ma solo per abitudine.',
]

// ==========================================
// COMUNICAZIONI UFFICIALI AI TIFOSI
// ==========================================
export interface Comunicazione { prot: string; title: string; text: string }

export const comunicazioni: Comunicazione[] = [
  { 
    prot: 'GF/2026/001', 
    title: 'Norme di sicurezza e integrità fisica sugli spalti', 
    text: 'L’ingresso al Comunale «Carlo Cartone» presuppone la piena accettazione dei rischi strutturali dell’impianto. Si invitano i tifosi a prestare attenzione ai gradoni sconnessi e a evitare salti sincronizzati nei settori già segnalati con il nastro bianco e rosso.' 
  },
  { 
    prot: 'GF/2026/002', 
    title: 'Guida al tifo e comportamento a bordo campo', 
    text: 'Sostenere la squadra significa anche accettare la vicinanza fisica con il terreno di gioco. È vietato invadere il campo, raccogliere i palloni finiti nei rovi dietro la tribuna senza guanti da lavoro o distrarre Igor Jesus durante i rigori.' 
  },
  { 
    prot: 'GF/2026/003', 
    title: 'Servizi igienici e punto ristoro', 
    text: 'Si avvisano i sostenitori che i bagni del settore ospiti sono temporaneamente fuori uso dal 2018. Per il ristoro durante l’intervallo è attivo il chiosco mobile all’ingresso, fino a esaurimento scorte o intervento delle autorità sanitarie.' 
  },
]