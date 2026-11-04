import { site } from '@/config/site'

/** Google Analytics 4 — only loaded when a measurement ID is configured AND the visitor consents. */
const KEY = 'cookie-consent'
export type Consent = 'accepted' | 'declined' | null

export const analyticsEnabled = () => Boolean(site.integrations.gaMeasurementId)

export function getConsent(): Consent {
  try { return (localStorage.getItem(KEY) as Consent) ?? null } catch { return null }
}
export function setConsent(c: Exclude<Consent, null>) {
  try { localStorage.setItem(KEY, c) } catch { /* ignore */ }
  if (c === 'accepted') loadAnalytics()
}

declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
}

let loaded = false
export function loadAnalytics() {
  const id = site.integrations.gaMeasurementId
  if (loaded || !id || typeof window === 'undefined') return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) } // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
}

export function trackPageView(path: string) {
  if (loaded && window.gtag) window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href })
}
