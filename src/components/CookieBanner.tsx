import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { analyticsEnabled, getConsent, loadAnalytics, setConsent, trackPageView } from '@/utils/analytics'

export const OPEN_COOKIE_SETTINGS = 'open-cookie-settings'

/** Only rendered when analytics is configured; otherwise the site sets no cookies at all. */
export function CookieBanner() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!analyticsEnabled()) return
    const c = getConsent()
    if (c === 'accepted') loadAnalytics()
    else if (c === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen)
  }, [])

  useEffect(() => { trackPageView(pathname) }, [pathname])

  if (!open) return null
  const choose = (c: 'accepted' | 'declined') => { setConsent(c); setOpen(false) }
  return (
    <div role="region" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[60] sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-md">
      <div className="card p-5 shadow-2xl shadow-black/30">
        <p className="text-sm text-muted">
          We use optional analytics cookies to understand how our website is used. Nothing is loaded unless you accept.{' '}
          <Link to="/cookie-policy" className="text-brand underline underline-offset-4">Cookie policy</Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => choose('accepted')} className="bg-brand-gradient min-h-11 flex-1 rounded-full px-4 text-sm font-semibold text-white">Accept</button>
          <button type="button" onClick={() => choose('declined')} className="min-h-11 flex-1 rounded-full border border-line px-4 text-sm font-semibold">Decline</button>
        </div>
      </div>
    </div>
  )
}
