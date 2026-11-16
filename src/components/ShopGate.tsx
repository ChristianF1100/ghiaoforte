import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Captcha, { captchaValid } from './Captcha'
// Il CAPTCHA protegge soltanto le pagine dello shop (catalogo, prodotti, carrello, checkout, ordini).
export default function ShopGate() {
  const [ok, setOk] = useState(captchaValid)
  return ok ? <Outlet /> : <Captcha onPass={() => setOk(true)} />
}
