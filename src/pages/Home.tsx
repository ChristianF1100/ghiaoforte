import { Link } from 'react-router-dom'
import { club } from '../data/club'
import { latestNews } from '../data/news'
import { sponsors } from '../data/sponsors'
import { fdate, img, useTitle } from '../lib/util'
import Img from '../components/Img'
export default function Home() {
  useTitle('Sito ufficiale', club.description)
  const n = latestNews()
  return <>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(14,22,28,.92),rgba(14,22,28,.35)),url(${img('home/hero.svg')})` }}>
      <div className="wrap hero-in"><img src={img('brand/logo.png')} alt={'Stemma ' + club.name} width="110" height="110" />
        <p className="kicker">Dal {club.founded}</p><h1>{club.name}</h1><p className="lead">{club.tagline}</p>
        <div className="row"><Link className="btn" to="/societa">Scopri la società</Link><Link className="btn ghost" to="/squadre">La prima squadra</Link></div></div></section>
    {n && <section className="wrap sec"><div className="sec-h"><h2>Ultima news</h2><Link to="/news" className="more">Archivio completo →</Link></div>
      <Link to={`/news/${n.id}`} className="card feat"><Img src={n.img} alt={n.title} /><div><time dateTime={n.date}>{fdate(n.date)}</time><h3>{n.title}</h3><p>{n.excerpt}</p><span className="more">Leggi l'articolo →</span></div></Link></section>}
    <section className="band"><div className="wrap"><div className="sec-h"><h2>Sponsor e partner</h2><Link to="/sponsor" className="more">Tutti i partner →</Link></div>
      <ul className="logos">{sponsors.map(s => <li key={s.name}><Link to="/sponsor" title={s.name}><Img src={s.logo} alt={s.name} /><span>{s.name}</span></Link></li>)}</ul></div></section>
  </>
}
