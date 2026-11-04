import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Seo } from '@/components/Seo'
import { CookieBanner } from '@/components/CookieBanner'
import { useReveal } from '@/hooks/useReveal'
import { useScrollTop } from '@/hooks/useScrollTop'

export function SiteLayout() {
  useReveal()
  useScrollTop()
  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Seo />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
