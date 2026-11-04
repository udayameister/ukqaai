import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMeta } from '@/data/pages'
import { headTags, pageTitle, structuredData } from '@/utils/seo'

/** Keeps <head> in sync during client-side navigation (prerendered HTML already has it). */
export function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = getPageMeta(pathname)
    document.title = pageTitle(m)
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
    for (const t of headTags(m)) {
      const el = document.createElement(t.tag)
      Object.entries(t.attrs).forEach(([k, v]) => el.setAttribute(k, v))
      el.setAttribute('data-seo', '')
      document.head.appendChild(el)
    }
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-seo', '')
    s.textContent = JSON.stringify(structuredData(m))
    document.head.appendChild(s)
  }, [pathname])
  return null
}
