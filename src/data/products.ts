// stock: 0 = non disponibile. sizes/colors opzionali: se presenti, la selezione è obbligatoria.
export interface Product { id: string; name: string; price: number; desc: string; img: string; sizes?: string[]; colors?: string[]; stock: number }
const S = ['S', 'M', 'L', 'XL', 'XXL'], K = ['6-8 anni', '9-11 anni', '12-14 anni']
export const products: Product[] = [
{
  id: 'maglia-home',
  name: 'Maglia Home 2026/27',
  price: 69.9,
  desc: 'Ispirata ai tre colori che raccontano l’identità di Ghiaoforte. Il nero rappresenta la strada da cui è nata l’AS Ghiaoforte, il verde bosco richiama la terra e le verdi colline di Ghiaoforte, mentre l’arancione rappresenta i mandarini, frutto dell’impegno e della passione.',
  img: ['shop/fronte.jpeg', 'shop/retro.jpeg'],
  sizes: S,
  colors: ['Casa'],
  stock: 40
}
]
