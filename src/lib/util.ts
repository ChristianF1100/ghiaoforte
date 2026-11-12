import { useEffect } from 'react'
export const img = (p: string) => import.meta.env.BASE_URL + 'images/' + p
export const money = (n: number) => n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })
export const fdate = (d: string) => new Date(d).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
export function useTitle(title: string, desc?: string) {
  useEffect(() => {
    document.title = title + ' | Ghiaforte'
    if (desc) document.querySelector('meta[name=description]')?.setAttribute('content', desc)
  }, [title, desc])
}
