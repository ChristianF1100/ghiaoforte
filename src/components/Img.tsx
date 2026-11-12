import { img } from '../lib/util'
export default function Img({ src, alt, ...r }: { src: string; alt: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={img(src)} alt={alt} loading="lazy" onError={e => { const t = e.currentTarget; if (!t.dataset.f) { t.dataset.f = '1'; t.src = img('brand/placeholder.svg') } }} {...r} />
}
