import { useEffect, useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { club } from '../data/club'
import { sortedNews } from '../data/news'
import { sponsors } from '../data/sponsors'
import { siteConfig } from '../config/site'
import { useCart } from '../shop/cart'
import { fdate, img } from '../lib/util'
import { usePopups } from '../popups/PopupContext'
import Ticker from './Ticker'
const nav = [['/', 'Home'], ['/societa', 'La società'], ['/squadre', 'Squadre'], ['/news', 'News'], ['/galleria', 'Galleria'], ['/dove-giochiamo', 'Dove giochiamo'], ['/sponsor', 'Sponsor'], ['/scommesse', 'Scommesse'], ['/shop', 'Shop']]
export default function Layout() {
  const [open, setOpen] = useState(false), { count, toast } = useCart(), loc = useLocation(), { open: popup } = usePopups()
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [loc.pathname])
  const last = sortedNews()[0]?.date
  return <>
    <a className="skip" href="#main">Vai al contenuto</a>
    <div className="site">
      <div className="topbar"><span>Stagione sportiva {siteConfig.season} · Dal {club.founded}</span>
        <nav aria-label="Collegamenti secondari"><Link to="/societa">Informazioni</Link><button type="button" onClick={() => popup('privacy-info')}>Privacy</button><button type="button" onClick={() => popup('cookie-info')}>Cookie</button><button type="button" onClick={() => popup('avvisi')}>Avvisi</button></nav></div>
      <header className="hdr">
        <Link to="/" className="brand" aria-label={club.name + ' — home'}><img src={img('brand/logo.png')} alt="" width="56" height="64" />
          <span><b>AS {club.name}</b><small>{club.tagline}</small></span></Link>
        <div className="hdr-r">{last && <p className="upd">Ultimo aggiornamento del sito:<br /><b>{fdate(last)}</b> (indicativo)</p>}
          <Link to="/carrello" className="cart" aria-label={`Carrello, ${count} articoli`}>🛒 Carrello <b key={count} className={count ? 'badge' : 'badge zero'}>{count}</b></Link></div>
      </header>
      <nav className="menu" aria-label="Principale">
        <button className="menu-toggle" aria-expanded={open} aria-controls="menu-list" onClick={() => setOpen(!open)}>☰ MENU</button>
        <ul id="menu-list" className={open ? 'open' : ''}>{nav.map(([to, l]) => <li key={to}><NavLink to={to} end={to === '/'}>{l}</NavLink></li>)}</ul>
      </nav>
      <Ticker />
      <main id="main" className="page"><Outlet /></main>
      <footer className="ftr"><div className="ftr-grid">
        <div><div className="brand"><img src={img('brand/logo-white.png')} alt="" width="44" height="50" /><span><b>AS {club.name}</b></span></div><p>{club.description}</p><p className="muted">{club.venue.name}<br />{club.venue.address}</p></div>
        <div><h3>Il sito</h3><ul>{nav.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>
        <div><h3>Sponsor principali</h3><ul>{sponsors.filter(s => s.tier !== 'partner').map(s => <li key={s.name}><Link to="/sponsor">{s.name}</Link></li>)}</ul><h3>Social</h3><p>{club.social.map(s => <a key={s.label} href={s.url} className="chip">{s.label}</a>)}</p></div>
      </div>
      <div className="ftr-legal"><p>© {club.founded}–{new Date().getFullYear()} AS {club.name} — Tutti i diritti riservati.</p>
        <p><button type="button" onClick={() => popup('privacy-info')}>Privacy</button> · <button type="button" onClick={() => popup('cookie-info')}>Cookie policy</button> · <button type="button" onClick={() => popup('avvisi')}>Avvisi alla utenza</button></p>
        <p>{last && <>Ultimo aggiornamento: {fdate(last)}. </>}Sito ottimizzato per la visualizzazione a 1024×768. La gestione del sito è curata dalla società, secondo disponibilità.</p></div></footer>
    </div>
    <div className={'toast' + (toast ? ' show' : '')} role="status">{toast}</div>
  </>
}
