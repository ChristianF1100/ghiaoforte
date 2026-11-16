// Inserzionisti di fantasia per banner e popup pubblicitari (non sono sponsor reali del club).
export interface Ad { id: string; name: string; slogan: string; detail: string; icon: string; bg: string; fg: string; accent: string }
export const ads: Ad[] = [
  { id: 'bulloni', name: 'Ferramenta Bulloni & Figli', slogan: 'Se non ce l’abbiamo, non serviva.', detail: 'Viti, chiodi e consigli non richiesti. Sconto riservato ai possessori di ricevuta.', icon: '🔩', bg: 'linear-gradient(180deg,#fff3a8,#f2c200)', fg: '#2b1d00', accent: '#b3261e' },
  { id: 'mandarini', name: 'Cooperativa Mandarini del Territorio', slogan: 'Il frutto dell’impegno.', detail: 'Mandarini selezionati a mano, quando disponibili. Accettiamo anche pagamenti in natura.', icon: '🍊', bg: 'linear-gradient(180deg,#ffd9a0,#ee8a12)', fg: '#3a1b00', accent: '#1d4a2e' },
  { id: 'autoscuola', name: 'Autoscuola Rapida', slogan: 'Patente in tempi ragionevoli.', detail: 'Corsi teorici e pratici. Il foglio rosa è un diritto, l’esame è un’opinione.', icon: '🚗', bg: 'linear-gradient(180deg,#d6ecff,#6fb1e8)', fg: '#06233d', accent: '#b3261e' },
  { id: 'tabacchi', name: 'Tabaccheria Il Gratta', slogan: 'Il sabato siamo chiusi. La domenica anche.', detail: 'Giornali, ricariche, valori bollati. Gioca responsabilmente, o almeno gioca.', icon: '🎟️', bg: 'linear-gradient(180deg,#e6f5d0,#8cc152)', fg: '#10270a', accent: '#b3261e' },
  { id: 'onoranze', name: 'Onoranze Serenità', slogan: 'Convenzione speciale per i soci.', detail: 'Sempre al vostro fianco, in qualsiasi categoria.', icon: '🕊️', bg: 'linear-gradient(180deg,#eeeeee,#b9b9b9)', fg: '#1a1a1a', accent: '#1d4a2e' },
  { id: 'pizzeria', name: 'Pizzeria Da Gennaro', slogan: 'Consegna a domicilio, quando c’è.', detail: 'Pizze al taglio e al tegamino. Il tempo di consegna è indicativo e non vincolante.', icon: '🍕', bg: 'linear-gradient(180deg,#ffe0dc,#e5675a)', fg: '#3b0904', accent: '#1d4a2e' },
]
export const adById = (id: string) => ads.find(a => a.id === id)
