import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { products } from '../data/products'
export interface Line { id: string; size?: string; color?: string; qty: number }
export interface Order { code: string; date: string; customer: Record<string, string>; payment: string; lines: { name: string; size?: string; color?: string; qty: number; price: number }[]; subtotal: number; shipping: number; total: number }
const load = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch { return d } }
const save = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* storage pieno o bloccato */ } }
export const FREE_SHIP = 80, SHIP = 6.9
export const priceOf = (id: string) => products.find(p => p.id === id)?.price ?? 0
export const getOrders = () => load<Order[]>('ghiaoforte.orders', [])
export const saveOrder = (o: Order) => save('ghiaoforte.orders', [o, ...getOrders()])
interface Ctx { lines: Line[]; count: number; subtotal: number; shipping: number; total: number; toast: string; add: (l: Line) => void; setQty: (i: number, q: number) => void; remove: (i: number) => void; clear: () => void }
const C = createContext<Ctx>(null as unknown as Ctx)
export const useCart = () => useContext(C)
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => load<Line[]>('ghiaoforte.cart', []).filter(l => products.some(p => p.id === l.id) && l.qty > 0))
  const [toast, setToast] = useState('')
  useEffect(() => save('ghiaoforte.cart', lines), [lines])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2200); return () => clearTimeout(t) }, [toast])
  const add = (l: Line) => {
    const p = products.find(x => x.id === l.id); if (!p || p.stock < 1 || l.qty < 1) return
    setLines(ls => {
      const i = ls.findIndex(x => x.id === l.id && x.size === l.size && x.color === l.color)
      if (i < 0) return [...ls, { ...l, qty: Math.min(l.qty, p.stock) }]
      return ls.map((x, j) => j === i ? { ...x, qty: Math.min(x.qty + l.qty, p.stock) } : x)
    })
    setToast(`${p.name} aggiunto al carrello`)
  }
  const setQty = (i: number, q: number) => setLines(ls => ls.map((x, j) => {
    if (j !== i) return x; const max = products.find(p => p.id === x.id)?.stock ?? 1
    return { ...x, qty: Math.max(1, Math.min(max, Math.floor(q) || 1)) }
  }))
  const remove = (i: number) => setLines(ls => ls.filter((_, j) => j !== i))
  const subtotal = lines.reduce((s, l) => s + priceOf(l.id) * l.qty, 0)
  const shipping = lines.length === 0 || subtotal >= FREE_SHIP ? 0 : SHIP
  return <C.Provider value={{ lines, count: lines.reduce((s, l) => s + l.qty, 0), subtotal, shipping, total: subtotal + shipping, toast, add, setQty, remove, clear: () => setLines([]) }}>{children}</C.Provider>
}
