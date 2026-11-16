// Comunicazioni e avvisi burocratici (testi aggiunti dal restyling; non sono dati sportivi).
export const tickerMessages = [
  'Si comunica che il servizio di aggiornamento risultati potrebbe subire ritardi.',
  'La società informa che le richieste saranno evase secondo disponibilità.',
  'Il presente sito è in continuo aggiornamento, salvo imprevisti.',
  'Si ricorda all’utenza che il carrello non costituisce impegno di acquisto né, tantomeno, di consegna.',
  'Gli sportelli della segreteria sono aperti nei giorni e negli orari di apertura.',
]

export interface Comunicazione { prot: string; title: string; text: string }
export const comunicazioni: Comunicazione[] = [
  { prot: 'GF/2026/001', title: 'Comunicazione alla spettabile utenza', text: 'Ai sensi delle disposizioni societarie, si informa che le comunicazioni ufficiali saranno pubblicate in questa sezione, salvo diversa determinazione. La società declina ogni responsabilità per eventuali omissioni.' },
  { prot: 'GF/2026/002', title: 'Avviso della segreteria', text: 'La segreteria informa che gli orari di apertura saranno resi noti all’apertura. Per ogni informazione si invita a consultare il presente sito, attualmente in aggiornamento.' },
  { prot: 'GF/2026/003', title: 'Shop ufficiale: procedura di acquisto', text: 'L’acquisto dei prodotti ufficiali prevede la compilazione di un apposito modulo. Si raccomanda di munirsi per tempo dei documenti del bisnonno paterno. La richiesta sarà presa in carico.' },
]

export const serviceStatus: { name: string; state: string; tone: 'ok' | 'warn' | 'bad' }[] = [
  { name: 'Sito web', state: 'In aggiornamento', tone: 'warn' },
  { name: 'Aggiornamento risultati', state: 'In ritardo', tone: 'bad' },
  { name: 'Shop ufficiale', state: 'Operativo, con riserva', tone: 'warn' },
  { name: 'Segreteria', state: 'Chiusa', tone: 'bad' },
  { name: 'Contatore visite', state: 'Funzionante', tone: 'ok' },
]

export const comunicazioneTxt = (c: Comunicazione) =>
  `AS GHIAOFORTE\nComunicazione ufficiale — Prot. ${c.prot}\n\n${c.title.toUpperCase()}\n\n${c.text}\n\nIl presente documento è stato generato automaticamente e non ha valore legale.\nLa società declina ogni responsabilità per eventuali ritardi.\n`
