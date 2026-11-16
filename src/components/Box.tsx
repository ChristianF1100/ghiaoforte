import { ReactNode } from 'react'
export default function Box({ title, right, className = '', children }: { title: string; right?: ReactNode; className?: string; children: ReactNode }) {
  return <section className={'box ' + className}><h2 className="box-h"><span>{title}</span>{right && <small>{right}</small>}</h2><div className="box-b">{children}</div></section>
}
export function Notice({ children, title = 'Avviso' }: { children: ReactNode; title?: string }) {
  return <p className="avviso"><b>{title}:</b> {children}</p>
}
