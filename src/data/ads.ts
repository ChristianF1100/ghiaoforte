// Inserzionisti di fantasia per banner e popup pubblicitari (non sono sponsor reali del club).
export interface Ad { id: string; name: string; slogan: string; detail: string; icon: string; bg: string; fg: string; accent: string }

export const ads: Ad[] = [
  { 
    id: 'investigazioni', 
    name: 'Agenzia Investigativa Occhio Vigile', 
    slogan: 'Scopri dove va davvero tuo marito la domenica.', 
    detail: 'Pedinamenti, prove fotografiche e tabulati. Pacchetto famiglia scontato per chi scopre più di due amanti.', 
    icon: '', 
    bg: 'linear-gradient(180deg,#d6ecff,#6fb1e8)', 
    fg: '#06233d', 
    accent: '#b3261e' 
  },
  { 
    id: 'rsa', 
    name: 'Residenza Anziani Orizzonte Sereno', 
    slogan: 'Lasciali a noi, goditi le vacanze.', 
    detail: 'Rette mensili bloccate e nessun obbligo di visita nei giorni festivi. Ritiro della pensione incluso nel servizio.', 
    icon: '', 
    bg: 'linear-gradient(180deg,#eeeeee,#b9b9b9)', 
    fg: '#1a1a1a', 
    accent: '#1d4a2e' 
  },
  { 
    id: 'scommesse', 
    name: 'Agenzia Ippica & Slot Il Riscatto', 
    slogan: 'La prossima giocata è quella che ti sistema.', 
    detail: 'Sale climatizzate senza orologi alle pareti. Accettiamo fedi nuziali e libretti di risparmio come cauzione.', 
    icon: '', 
    bg: 'linear-gradient(180deg,#fff3a8,#f2c200)', 
    fg: '#2b1d00', 
    accent: '#b3261e' 
  },
  { 
    id: 'dietologo', 
    name: 'Centro Dimagrimento Linea Zero', 
    slogan: 'Perdi peso o perdi la dignità provandoci.', 
    detail: 'Bevande sostitutive al gusto di gesso e umiliazioni settimanali incluse nel pacchetto trimestrale.', 
    icon: '', 
    bg: 'linear-gradient(180deg,#e6f5d0,#8cc152)', 
    fg: '#10270a', 
    accent: '#b3261e' 
  },
  { 
    id: 'comprooro', 
    name: 'Compro Oro Lingotto Facile', 
    slogan: 'I ricordi di famiglia non pagano le bollette.', 
    detail: 'Valutazioni al ribasso e contanti immediati. Nessuna domanda sulla provenienza dei gioielli.', 
    icon: '', 
    bg: 'linear-gradient(180deg,#ffd9a0,#ee8a12)', 
    fg: '#3a1b00', 
    accent: '#1d4a2e' 
  },
  { 
    id: 'psicologo', 
    name: 'Studio Psichiatrico Mente Libera', 
    slogan: 'I tuoi traumi sono il nostro fatturato.', 
    detail: 'Sedute da quaranta minuti esatti con cronometro a vista. Psicofarmaci prescritti già al primo colloquio.', 
    icon: '', 
    bg: 'linear-gradient(180deg,#ffe0dc,#e5675a)', 
    fg: '#3b0904', 
    accent: '#1d4a2e' 
  },
]

export const adById = (id: string) => ads.find(a => a.id === id)