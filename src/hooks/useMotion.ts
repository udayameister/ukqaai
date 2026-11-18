import { useEffect, useRef, useState } from 'react'

/** False when the visitor asks for reduced motion (OS setting). */
export function useMotionAllowed() {
  const [ok, setOk] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setOk(!mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  return ok
}

export interface ThemeColors { a: string; b: string; glow: string }

/** Brand colours from the current theme's CSS variables, kept fresh when the theme switches. */
export function useThemeColors() {
  const ref = useRef<ThemeColors>({ a: '#3d7bff', b: '#8a5cff', glow: 'rgba(143,179,255,0.95)' })
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement)
      ref.current = {
        a: s.getPropertyValue('--mark-a').trim() || ref.current.a,
        b: s.getPropertyValue('--mark-b').trim() || ref.current.b,
        glow: s.getPropertyValue('--node-core').trim() || ref.current.glow,
      }
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])
  return ref
}

/** Runs fn after the page has fully loaded and the browser is idle, so motion never delays loading. */
export function whenIdle(fn: () => void): () => void {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
  let cancelled = false
  let idleId = 0
  let timer = 0
  const go = () => {
    timer = window.setTimeout(() => {
      if (cancelled) return
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => !cancelled && fn(), { timeout: 2000 })
      else fn()
    }, 1500)
  }
  if (document.readyState === 'complete') go()
  else window.addEventListener('load', go, { once: true })
  return () => { cancelled = true; clearTimeout(timer); window.removeEventListener('load', go); if (idleId) w.cancelIdleCallback?.(idleId) }
}

/** True on phones and low-power devices: animations use fewer elements and frames there. */
export function isLiteDevice() {
  if (typeof window === 'undefined') return false
  const n = navigator as Navigator & { deviceMemory?: number }
  return window.innerWidth < 768 || (n.hardwareConcurrency ?? 8) <= 4 || (n.deviceMemory ?? 8) <= 4
}
