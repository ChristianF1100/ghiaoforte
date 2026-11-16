// Configurazione del restyling "portale istituzionale".
// Ogni funzione satirica può essere disattivata da qui, senza toccare il resto del codice.
export interface AdVideo { src: string; sponsor?: string }

export const siteConfig = {
  season: '2026/27',

  // Popup, comunicazioni e pubblicità (vedi src/popups/popupData.ts per i contenuti)
  popups: {
    enabled: true,
    firstDelaySeconds: 12,   // attesa prima del primo popup (dopo l'ingresso nel portale)
    minGapSeconds: 40,       // pausa minima tra la chiusura di un popup e l'apertura del successivo
    maxPerSession: 5,        // massimo di popup automatici per sessione del browser
  },

  // Video pubblicitario iniziale (MP4 locale, non saltabile)
  videoAd: {
    enabled: true,
    frequency: 'session' as 'session' | 'always', // 'session' = una volta per sessione, 'always' = a ogni caricamento
    fallbackSeconds: 10,     // durata mostrata finché il browser non conosce quella reale del video
    manifest: 'videos/ads/manifest.json', // elenco dei video, relativo a public/
    videos: [] as (string | AdVideo)[],   // in alternativa al manifest: nomi file dentro public/videos/ads/
  },

  // CAPTCHA simulato (solo shop, carrello e checkout)
  captcha: {
    enabled: true,
    rememberMinutes: 30,     // per quanto tempo la verifica resta valida nella sessione
    maxAttempts: 3,          // dopo questi errori la "segreteria" decide di fidarsi
  },
}
