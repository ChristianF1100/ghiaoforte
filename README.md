# Ghiaforte — sito ufficiale

Sito statico in **React + TypeScript + Vite** con `HashRouter`, pensato per **GitHub Pages**. Tutti i contenuti stanno in `src/data/`.

## 1. Comandi
```bash
npm install        # installa le dipendenze
npm run dev        # avvio in locale (http://localhost:5173)
npm run build      # versione di produzione nella cartella dist/
npm run preview    # prova locale della build
```

## 2. Struttura
```
public/favicon.png        favicon provvisorio
public/images/<sezione>/  tutte le immagini (brand, home, news, players, gallery, stadium, sponsors, shop)
src/data/                 CONTENUTI (club, news, players, sponsors, products, gallery)
src/pages/                pagine        src/components/  header/footer, Img
src/shop/cart.tsx         carrello e ordini (localStorage)
src/styles.css            colori e caratteri (variabili :root)
tools/make_placeholders.py  rigenera immagini provvisorie e IMAGE_GUIDE.md
```

## 3. Mappa delle modifiche
| Elemento | File da aprire | Cosa modificare | Note |
|---|---|---|---|
| Info società, storia, valori, social | `src/data/club.ts` | testi e anno | |
| Impianto, indirizzo, orari allenamenti | `src/data/club.ts` → `venue` | campi `venue` | `mapsQuery`: con un indirizzo verificabile compaiono mappa reale e indicazioni |
| News | `src/data/news.ts` | aggiungi un oggetto | la home mostra la più recente per `date` |
| Giocatori | `src/data/players.ts` | aggiungi/modifica una riga `t(...)` | `photo` opzionale |
| Sponsor | `src/data/sponsors.ts` | aggiungi un oggetto | `tier`: main / official / partner |
| Prodotti, prezzi, taglie, colori | `src/data/products.ts` | `price`, `sizes`, `colors`, `stock` | `stock: 0` = non disponibile; spedizione in `src/shop/cart.tsx` |
| Galleria / nuova stagione | `src/data/gallery.ts` | copia un blocco `{season, photos}` | |
| Logo | `public/images/brand/logo.png` e `logo-white.png` | sostituisci i file | PNG trasparente 512×512 |
| Favicon | `public/favicon.png` | sostituisci il file | PNG 128–256 px |
| Colori e caratteri | `src/styles.css` | variabili in `:root` | `--accent`, `--ink`, `--head`, `--body` |
| Immagini | `public/images/...` | sostituisci mantenendo il nome | vedi `IMAGE_GUIDE.md` |
| Nuova pagina | `src/pages/` + `src/App.tsx` + `nav` in `src/components/Layout.tsx` | crea componente, aggiungi `<Route>` e voce di menu | |

## 4. Esempi
**News**: in `news.ts` aggiungi
```ts
{ id: 'titolo-breve', title: '…', date: '2026-12-01', img: 'news/n8.jpg', excerpt: '…', tags: ['eventi'], body: ['Primo paragrafo', 'Secondo paragrafo'] }
```
Per cambiare la foto: sostituisci il file o cambia `img`. **Giocatore**: `t('Nome Cognome', 21, 'C', 'Italia', 2000)`.
**Prodotto con taglie**: `{ id: 'giacca', name: 'Giacca', price: 79, desc: '…', img: 'shop/pr13.jpg', sizes: ['S','M','L'], colors: ['Antracite'], stock: 20 }`.
**Sponsor**: carica `public/images/sponsors/nuovo.png` e aggiungi `{ name, tier: 'partner', logo: 'sponsors/nuovo.png', description, url }`.
**Album**: nuovo blocco in `gallery.ts` con `season: '2027/2028'`.

## 5. Pubblicazione su GitHub Pages
1. Crea un repository su GitHub e carica il progetto:
```bash
git init && git branch -M main
git add .
git commit -m "Aggiornamento sito Ghiaforte"
git remote add origin https://github.com/UTENTE/REPOSITORY.git
git push -u origin main
```
2. Su GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Ogni `git push origin main` avvia `.github/workflows/deploy.yml` (si può lanciare anche a mano da **Actions → Run workflow**).
4. Quando l'azione è verde, il sito è su `https://UTENTE.github.io/REPOSITORY/`.
5. Per aggiornare: modifica i file, poi `git add .`, `git commit -m "…"`, `git push origin main`.
6. Dominio personalizzato: Settings → Pages → Custom domain (poi DNS verso GitHub). Il percorso base è relativo (`./`), quindi funziona su sottocartella e su root.

## 6. Note sullo shop
Lo shop è dimostrativo e interamente client-side: carrello e ordini sono in `localStorage` del browser dell'utente e non costituiscono un sistema centralizzato di gestione ordini. Nessun pagamento, email o spedizione reali.
