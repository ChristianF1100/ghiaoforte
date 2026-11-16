import { useEffect, useState } from 'react'
export const img = (p: string) => import.meta.env.BASE_URL + 'images/' + p
export const money = (n: number) => n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })
export const fdate = (d: string) => new Date(d).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
export function useTitle(title: string, desc?: string) {
  useEffect(() => {
    document.title = title + ' | Ghiaoforte'
    if (desc) document.querySelector('meta[name=description]')?.setAttribute('content', desc)
  }, [title, desc])
}
export const pad = (n: number, len = 2) => String(n).padStart(len, '0')
export function downloadText(name: string, text: string) {
  try {
    const u = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove()
    setTimeout(() => URL.revokeObjectURL(u), 1500)
  } catch { /* download non disponibile */ }
}
// Contatore visite "indicativo": conta solo le sessioni di questo browser.
export function useVisits() {
  const [n] = useState(() => {
    try {
      let v = Number(localStorage.getItem('ghiaoforte.visits')) || 0
      if (!sessionStorage.getItem('ghiaoforte.visit')) { v += 1; localStorage.setItem('ghiaoforte.visits', String(v)); sessionStorage.setItem('ghiaoforte.visit', '1') }
      return v || 1
    } catch { return 1 }
  })
  return n
}
