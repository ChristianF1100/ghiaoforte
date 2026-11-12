// stock: 0 = non disponibile. sizes/colors opzionali: se presenti, la selezione è obbligatoria.
export interface Product { id: string; name: string; price: number; desc: string; img: string; sizes?: string[]; colors?: string[]; stock: number }
const S = ['S', 'M', 'L', 'XL', 'XXL'], K = ['6-8 anni', '9-11 anni', '12-14 anni']
export const products: Product[] = [
  { id: 'maglia-home', name: 'Maglia Home 2026/27', price: 69.9, desc: 'Maglia ufficiale da gara con trama ispirata alla ghiaia e scritta «Dal 1964» nel colletto.', img: 'shop/pr1.svg', sizes: S, colors: ['Antracite'], stock: 40 },
]
