import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top (or to #hash) and move focus to <main> on route change, for screen-reader users. */
export function useScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
    const main = document.getElementById('main')
    if (main && document.activeElement !== document.body) main.focus({ preventScroll: true })
  }, [pathname, hash])
}
