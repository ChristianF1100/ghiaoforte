// stock: 0 = non disponibile. sizes/colors opzionali: se presenti, la selezione è obbligatoria.
export interface Product { id: string; name: string; price: number; desc: string; img: string; sizes?: string[]; colors?: string[]; stock: number }
const S = ['S', 'M', 'L', 'XL', 'XXL'], K = ['6-8 anni', '9-11 anni', '12-14 anni']
export const products: Product[] = [
  { id: 'maglia-home', name: 'Maglia Home 2026/27', price: 69.9, desc: 'Maglia ufficiale da gara con trama ispirata alla ghiaia e scritta «Dal 1964» nel colletto.', img: 'shop/pr1.svg', sizes: S, colors: ['Antracite'], stock: 40 },
  { id: 'maglia-away', name: 'Maglia Away 2026/27', price: 69.9, desc: 'Seconda divisa in tonalità chiara con dettagli ruggine.', img: 'shop/pr2.svg', sizes: S, colors: ['Sabbia'], stock: 32 },
  { id: 'maglia-bimbo', name: 'Maglia Home Bambino', price: 49.9, desc: 'La maglia Home nelle taglie junior.', img: 'shop/pr3.svg', sizes: K, stock: 18 },
  { id: 'felpa', name: 'Felpa Ufficiale', price: 59.9, desc: 'Felpa in cotone garzato con stemma ricamato.', img: 'shop/pr4.svg', sizes: S, colors: ['Antracite', 'Ruggine'], stock: 25 },
  { id: 'tshirt', name: 'T-shirt Ghiaforte', price: 24.9, desc: 'T-shirt in cotone con grafica «Forti dal 1964».', img: 'shop/pr5.svg', sizes: S, colors: ['Bianco', 'Antracite'], stock: 60 },
  { id: 'sciarpa', name: 'Sciarpa da Stadio', price: 16.9, desc: 'Sciarpa jacquard double-face nei colori sociali.', img: 'shop/pr6.svg', stock: 80 },
  { id: 'cappellino', name: 'Cappellino Ricamato', price: 19.9, desc: 'Cappellino regolabile con stemma ricamato.', img: 'shop/pr7.svg', colors: ['Antracite', 'Sabbia'], stock: 45 },
  { id: 'tuta', name: 'Tuta di Rappresentanza', price: 99.9, desc: 'Giacca e pantaloni in tessuto tecnico, per le trasferte.', img: 'shop/pr8.svg', sizes: S, stock: 14 },
  { id: 'pantaloncini', name: 'Pantaloncini Gara', price: 29.9, desc: 'Pantaloncini leggeri e traspiranti.', img: 'shop/pr9.svg', sizes: S, colors: ['Antracite', 'Bianco'], stock: 35 },
  { id: 'calzettoni', name: 'Calzettoni Gara', price: 12.9, desc: 'Calzettoni con rinforzo su tallone e punta.', img: 'shop/pr10.svg', sizes: ['35-38', '39-42', '43-46'], colors: ['Antracite', 'Bianco'], stock: 70 },
  { id: 'borraccia', name: 'Borraccia Termica', price: 18.9, desc: 'Borraccia in acciaio da 500 ml con stemma inciso.', img: 'shop/pr11.svg', stock: 50 },
  { id: 'zaino', name: 'Zaino Sportivo', price: 39.9, desc: 'Zaino con scomparto scarpe e tasca laterale.', img: 'shop/pr12.svg', stock: 0 },
]
