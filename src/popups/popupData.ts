// Catalogo dei popup. Aggiungere un popup = aggiungere un oggetto a questa lista.
// auto: compare da solo (secondo priorità, frequenza e limiti in src/config/site.ts); altrimenti solo su richiesta (open('id')).
export type PopupKind = 'ad' | 'official' | 'maintenance' | 'privacy' | 'notice' | 'service'
export interface PopupButton { label: string; to?: string; open?: string; primary?: boolean }
export interface PopupDef {
  id: string; kind: PopupKind; auto: boolean
  priority: number          // >= 90: compare sempre per primo; altrimenti estrazione pesata sulla priorità
  max?: number              // quante volte per sessione (default 1)
  title: string; body: string[]; adId?: string
  buttons?: PopupButton[]
  lockSeconds?: number      // secondi prima di poter chiudere (pochi: la segreteria non è crudele)
  onlyRoutes?: string[]     // se presente, compare solo su questi percorsi (prefisso)
}
export const kindLabel: Record<PopupKind, string> = {
  ad: 'Pubblicità', official: 'Comunicazione ufficiale', maintenance: 'Avviso di manutenzione',
  privacy: 'Informativa', notice: 'Notifica della società', service: 'Messaggio di servizio',
}
const close = (label: string, primary = true): PopupButton => ({ label, primary })

export const popups: PopupDef[] = [
  { id: 'privacy-cookie', kind: 'privacy', auto: true, priority: 95, title: 'Informativa sull’utilizzo del sito',
    body: ['Ai sensi delle disposizioni societarie, si informa l’utenza che il presente sito conserva nel browser esclusivamente il contenuto del carrello, gli ordini dimostrativi e alcune preferenze di visualizzazione.',
      'Nessun dato viene inviato a server esterni. La società declina ogni responsabilità per l’eventuale smarrimento del carrello.'],
    buttons: [close('ACCETTO'), close('ACCETTO CON RISERVA', false)] },
  { id: 'official-1', kind: 'official', auto: true, priority: 80, lockSeconds: 3, title: 'Comunicazione ufficiale n. 1',
    body: ['Si comunica all’utenza che il servizio di aggiornamento risultati potrebbe subire ritardi.', 'La società informa inoltre che le richieste saranno evase secondo disponibilità.'],
    buttons: [close('PRESO ATTO')] },
  { id: 'maintenance-1', kind: 'maintenance', auto: true, priority: 70, lockSeconds: 2, title: 'Avviso di manutenzione programmata',
    body: ['Si informa che sono previsti interventi di manutenzione in data da definirsi.', 'Durante gli interventi il sito sarà regolarmente consultabile, salvo imprevisti. Il servizio potrebbe non essere temporaneamente disponibile.'],
    buttons: [close('HO PRESO VISIONE')] },
  { id: 'service-shop', kind: 'service', auto: true, priority: 65, onlyRoutes: ['/shop', '/carrello'], title: 'Messaggio di servizio — Shop',
    body: ['Si comunica che l’evasione degli ordini avverrà secondo disponibilità.', 'La società declina ogni responsabilità per eventuali ritardi. La procedura di acquisto prevede la compilazione di un modulo.'],
    buttons: [close('PROSEGUI')] },
  { id: 'notice-palloni', kind: 'notice', auto: true, priority: 50, title: 'Notifica della società',
    body: ['Si ricorda che i palloni sgonfi lasciati in eredità dal fondatore sono tuttora in fase di inventario.', 'La procedura è stata avviata, salvo verifiche successive.'],
    buttons: [close('PRENDO ATTO')] },
  ...(['bulloni', 'mandarini', 'autoscuola', 'tabacchi', 'onoranze', 'pizzeria'] as const).map((adId, i): PopupDef => ({
    id: 'ad-' + adId, kind: 'ad', auto: true, priority: 40 - i, adId, title: 'Messaggio pubblicitario', body: [],
    buttons: [{ label: 'SCOPRI DI PIÙ', open: 'ad-unavailable', primary: true }, close('CHIUDI', false)] })),

  // Solo su richiesta
  { id: 'ad-unavailable', kind: 'service', auto: false, priority: 0, title: 'Collegamento non disponibile',
    body: ['Il collegamento allo sponsor non è al momento raggiungibile.', 'La società ringrazia per l’interesse e declina ogni responsabilità.'], buttons: [close('CHIUDI')] },
  { id: 'privacy-info', kind: 'privacy', auto: false, priority: 0, title: 'Informativa sulla privacy',
    body: ['Il presente sito non raccoglie dati personali e non invia informazioni a server esterni.', 'I moduli dello shop e del checkout sono una simulazione: i dati inseriti restano nel browser e non vengono conservati. Si raccomanda di inserire dati di fantasia.'], buttons: [close('CHIUDI')] },
  { id: 'cookie-info', kind: 'privacy', auto: false, priority: 0, title: 'Cookie policy',
    body: ['Il sito non utilizza cookie di profilazione.', 'Utilizza il solo archivio locale del browser per ricordare il carrello, gli ordini dimostrativi e l’esito della verifica anti-robot.'], buttons: [close('CHIUDI')] },
  { id: 'avvisi', kind: 'notice', auto: false, priority: 0, title: 'Avvisi alla utenza',
    body: ['Il servizio di aggiornamento risultati potrebbe subire ritardi.', 'Le richieste saranno evase secondo disponibilità.', 'Il presente sito è in continuo aggiornamento, salvo imprevisti.'], buttons: [close('CHIUDI')] },
]
export const popupById = (id: string) => popups.find(p => p.id === id)
