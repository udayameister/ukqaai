import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Fades .reveal elements in as they scroll into view. Content stays visible without JS. */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const root = document.documentElement
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    root.classList.add('reveal-ready')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
