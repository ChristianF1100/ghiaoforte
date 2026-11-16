VIDEO PUBBLICITARI (popup iniziale)

1. Copia qui i tuoi file .mp4 (consigliati: H.264 + AAC, 10 secondi circa, meno di 5 MB ciascuno).
2. Elencali in manifest.json. Se ne indichi più d'uno, ad ogni visita ne viene scelto uno a caso:
     { "videos": [ "spot1.mp4", { "src": "spot2.mp4", "sponsor": "Nome sponsor" } ] }
3. Se l'elenco è vuoto o il file manca, il popup video semplicemente non compare (nessun errore).
4. demo-ad.mp4 è un esempio: cancellalo e toglilo dal manifest quando hai i tuoi video.

Per disattivare tutto il sistema: src/config/site.ts -> videoAd.enabled = false
Frequenza: videoAd.frequency = 'session' (una volta per sessione) oppure 'always' (a ogni caricamento).
