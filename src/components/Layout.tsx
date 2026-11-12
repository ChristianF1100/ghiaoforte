import { useEffect, useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { club } from '../data/club'
import { sponsors } from '../data/sponsors'
import { useCart } from '../shop/cart'
import { img } from '../lib/util'
import Img from './Img'
const nav = [['/', 'Home'], ['/societa', 'La società'], ['/squadre', 'Squadre'], ['/news', 'News'], ['/galleria', 'Galleria'], ['/dove-giochiamo', 'Dove giochiamo'], ['/sponsor', 'Sponsor'], ['/shop', 'Shop']]
export default function Layout() {
  const [open, setOpen] = useState(false), { count, toast } = useCart(), loc = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [loc.pathname])
  return <>
    <a className="skip" href="#main">Vai al contenuto</a>
    <header className="hdr"><div className="wrap hdr-in">
      <Link to="/" className="brand" aria-label={club.name + ' — home'}><img src={img('brand/logo.png')} alt="" width="40" height="40" /><span>{club.name}</span></Link>
      <nav className={'nav' + (open ? ' open' : '')} aria-label="Principale">{nav.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'}>{l}</NavLink>)}</nav>
      <Link to="/carrello" className="cart" aria-label={`Carrello, ${count} articoli`}>🛒<b key={count} className={count ? 'badge' : 'badge zero'}>{count}</b></Link>
      <button className="burger" aria-expanded={open} aria-label="Apri menu" onClick={() => setOpen(!open)}><i /><i /><i /></button>
    </div></header>
    <main id="main" className="page"><Outlet /></main>
    <div className={'toast' + (toast ? ' show' : '')} role="status">{toast}</div>
    <footer className="ftr"><div className="wrap ftr-grid">
      <div><div className="brand"><img src={img('brand/logo.png')} alt="" width="48" height="48" /><span>{club.name}</span></div><p>{club.description}</p><p className="muted">{club.venue.name}<br />{club.venue.address}</p></div>
      <div><h3>Il sito</h3><ul>{nav.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>
      <div><h3>Sponsor principali</h3><ul>{sponsors.filter(s => s.tier !== 'partner').map(s => <li key={s.name}><Link to="/sponsor">{s.name}</Link></li>)}</ul><h3>Social</h3><p>{club.social.map(s => <a key={s.label} href={s.url} className="chip">{s.label}</a>)}</p></div>
    </div><p className="wrap copy">© {new Date().getFullYear()} {club.name} — Tutti i diritti riservati.</p></footer>
  </>
}
