import { useEffect } from 'react'
export function useScrollLock() {
  useEffect(() => { document.body.classList.add('no-scroll'); return () => document.body.classList.remove('no-scroll') }, [])
}
