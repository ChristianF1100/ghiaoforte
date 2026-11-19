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
  { id: 'privacy-cookie', kind: 'privacy', auto: true, priority: 95, title: 'Accettazione silenziosa',
    body: ['Proseguendo dichiari di non aver visto nulla, di non conoscere nessuno e di non poter essere citato come testimone in alcuna sede.',
      'Ogni eventuale danno morale o patrimoniale derivante dalla visita di questo sito è già stato messo in conto.'],
    buttons: [close('ACCETTO'), close('NON HO SCELTA', false)] },
  { id: 'official-1', kind: 'official', auto: true, priority: 80, lockSeconds: 3, title: 'Avviso ai visitatori e ai sostenitori',
    body: ['Il tifo non è un diritto garantito, ma una concessione revocabile in qualsiasi momento senza preavviso.', 'Chi critica le scelte della società perde automaticamente la facoltà di lamentarsi per il prezzo del biglietto.'],
    buttons: [close('COMPRESO')] },
  { id: 'maintenance-1', kind: 'maintenance', auto: true, priority: 70, lockSeconds: 2, title: 'Gestione reclami e rimborsi',
    body: ['L’ufficio reclami riceve il quinto venerdì del mese, dalle 12:58 alle 13:00.', 'Tutte le istanze pervenute fuori orario vengono archiviate direttamente nel tritarifiuti.'],
    buttons: [close('PRENDO ATTO')] },
  { id: 'service-shop', kind: 'service', auto: true, priority: 65, onlyRoutes: ['/shop', '/carrello'], title: 'Clausola di acquisto irrevocabile',
    body: ['Una volta confermato l’ordine, i tuoi soldi appartengono definitivamente all’AS Ghiaoforte.', 'Non si effettuano rimborsi, cambi taglia o spiegazioni in caso di mancata consegna.'],
    buttons: [close('PROCEDI')] },
  { id: 'notice-palloni', kind: 'notice', auto: true, priority: 50, title: 'Accesso agli spalti e biglietteria',
    body: ['L’acquisto del tagliando garantisce esclusivamente l’ingresso al recinto, non la visuale del campo né l’incolumità personale.', 'In caso di rinvio della gara, il biglietto resta valido come ricordo personale.'],
    buttons: [close('CHIUDI')] },
  ...(['investigazioni', 'rsa', 'scommesse', 'dietologo', 'comprooro', 'psicologo'] as const).map((adId, i): PopupDef => ({
    id: 'ad-' + adId, kind: 'ad', auto: true, priority: 40 - i, adId, title: 'Messaggio pubblicitario', body: [],
    buttons: [{ label: 'SCOPRI DI PIÙ', open: 'ad-unavailable', primary: true }, close('CHIUDI', false)] })),

  // Solo su richiesta
  { id: 'ad-unavailable', kind: 'service', auto: false, priority: 0, title: 'Contatto interrotto',
    body: ['L’attività inserzionista ha cessato ogni rapporto commerciale o ha cambiato ragione sociale durante la notte.', 'La società trattiene comunque l’intero importo versato.'], buttons: [close('CHIUDI')] },
  { id: 'privacy-info', kind: 'privacy', auto: false, priority: 0, title: 'Riservatezza dell’utenza',
    body: ['I tuoi dati non vengono ceduti a terzi perché non hanno alcun valore di mercato.', 'Tutto ciò che inserisci resta confinato su questo dispositivo: nessuno verrà a cercarti, a meno che tu non lasci un ordine in sospeso.'], buttons: [close('CHIUDI')] },
  { id: 'cookie-info', kind: 'privacy', auto: false, priority: 0, title: 'Memoria delle transazioni',
    body: ['Il sistema conserva traccia esclusiva dei tuoi carrelli abbandonati e dei pagamenti non completati.', 'Chiudere la scheda del browser non estingue il debito morale verso il club.'], buttons: [close('CHIUDI')] },
  { id: 'avvisi', kind: 'notice', auto: false, priority: 0, title: 'Condizioni di permanenza',
    body: ['La consultazione del sito avviene a esclusivo rischio e pericolo del navigatore.', 'La società non risponde di delusioni sportive, attacchi di nervosismo o perdite di tempo.', 'Ogni tentativo di contestazione comporta l’esclusione immediata dalla biglietteria.'], buttons: [close('CHIUDI')] },
]
export const popupById = (id: string) => popups.find(p => p.id === id)
