import { useEffect, useState } from 'react'
import { Icon } from './Icon'

/**
 * Site-wide visit counter using Abacus (https://abacus.jasoncameron.dev) — free, no sign-up, no cookies.
 * Counts one visit per browser session; later page views in the same session only read the total.
 * If the service is unreachable the counter is hidden (never shows a made-up number).
 */
const NAMESPACE = 'ukqaai-com'
const KEY = 'site-visits'
const SESSION_FLAG = 'ukqaai-visit-counted'

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let counted = false
    try { counted = sessionStorage.getItem(SESSION_FLAG) === '1' } catch { /* storage blocked */ }
    const action = counted ? 'get' : 'hit'
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 6000)
    fetch(`https://abacus.jasoncameron.dev/${action}/${NAMESPACE}/${KEY}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { value?: number }) => {
        if (typeof d.value === 'number') {
          setCount(d.value)
          if (!counted) { try { sessionStorage.setItem(SESSION_FLAG, '1') } catch { /* ignore */ } }
        }
      })
      .catch(() => setCount(null))
      .finally(() => clearTimeout(timer))
    return () => { clearTimeout(timer); ctrl.abort() }
  }, [])

  if (count === null) return null
  return (
    <p className="inline-flex items-center gap-1.5" aria-live="polite">
      <Icon name="users" className="h-4 w-4 text-brand" />
      <span><span className="font-semibold text-fg">{count.toLocaleString('en-IN')}</span> website visits</span>
    </p>
  )
}
