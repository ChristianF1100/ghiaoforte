import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import ShopGate from './components/ShopGate'
import Home from './pages/Home'
import { Club, Stadium, Sponsors, Team } from './pages/Institutional'
import { Archive, ArticlePage } from './pages/News'
import Gallery from './pages/Gallery'
import Bets from './pages/Bets'
import { Shop, ProductPage, CartPage } from './pages/Shop'
import { Checkout, OrderDone } from './pages/Checkout'
export default function App() {
  return <Routes><Route element={<Layout />}>
    <Route index element={<Home />} /><Route path="societa" element={<Club />} /><Route path="squadre" element={<Team />} />
    <Route path="news" element={<Archive />} /><Route path="news/:id" element={<ArticlePage />} /><Route path="galleria" element={<Gallery />} />
    <Route path="dove-giochiamo" element={<Stadium />} /><Route path="sponsor" element={<Sponsors />} /><Route path="scommesse" element={<Bets />} />
    <Route element={<ShopGate />}>
      <Route path="shop" element={<Shop />} /><Route path="shop/:id" element={<ProductPage />} /><Route path="carrello" element={<CartPage />} />
      <Route path="checkout" element={<Checkout />} /><Route path="ordine/:code" element={<OrderDone />} />
    </Route>
    <Route path="*" element={<section className="wrap empty"><h1>Pagina non trovata</h1><p>La pagina richiesta non risulta presente in archivio.</p><Link className="btn pri" to="/">Torna alla home</Link></section>} />
  </Route></Routes>
}
