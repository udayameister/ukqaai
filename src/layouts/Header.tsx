import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { Icon } from '@/components/Icon'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ButtonLink, Badge } from '@/components/ui'
import { mainNav } from '@/data/navigation'
import { services, statusLabels } from '@/data/services'

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3.5 py-2 text-sm font-medium transition hover:text-fg ${isActive ? 'text-fg' : 'text-muted'}`

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMobileOpen(false); setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuOpen(false); setMobileOpen(false) } }
    const onClick = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [])

  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : '' }, [mobileOpen])

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled || mobileOpen ? 'border-line bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="min-w-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {mainNav.map((item) =>
            item.hasMenu ? (
              <div key={item.to} className="relative" ref={menuRef}>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition hover:text-fg ${pathname.startsWith('/services') ? 'text-fg' : 'text-muted'}`}
                  aria-expanded={menuOpen}
                  aria-controls="services-menu"
                  onClick={() => setMenuOpen((o) => !o)}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition ${menuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {menuOpen && (
                  <div id="services-menu" className="card absolute left-1/2 top-full mt-3 w-[min(92vw,680px)] -translate-x-1/2 p-3 shadow-2xl shadow-black/20">
                    <ul className="grid gap-1 sm:grid-cols-2">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link to={`/services/${s.slug}`} className="flex gap-3 rounded-xl p-3 transition hover:bg-surface-2">
                            <span className="mt-0.5 text-brand"><Icon name={s.icon} className="h-5 w-5" /></span>
                            <span>
                              <span className="block text-sm font-semibold text-fg">{s.shortTitle}</span>
                              <span className="mt-0.5 block text-xs text-muted">{statusLabels[s.status]}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/services" className="mt-2 flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3 text-sm font-semibold text-fg hover:text-brand">
                      View all services <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} className={linkCls}>{item.label}</NavLink>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <span className="hidden sm:block"><ButtonLink to="/contact" icon={null}>Contact us</ButtonLink></span>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div className="container-x py-6">
            <p className="eyebrow mb-3">Services</p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-surface-2">
                    <span className="flex items-center gap-3 font-medium"><Icon name={s.icon} className="h-5 w-5 text-brand" />{s.shortTitle}</span>
                    {s.status !== 'available' && <Badge tone={s.status === 'developing' ? 'amber' : 'violet'}>{statusLabels[s.status]}</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 border-t border-line pt-4">
              {mainNav.filter((n) => !n.hasMenu).concat([{ label: 'Contact', to: '/contact' }]).map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} className="block rounded-xl px-3 py-3 font-display text-lg font-semibold hover:bg-surface-2">{n.label}</NavLink>
                </li>
              ))}
            </ul>
            <ButtonLink to="/contact" className="mt-6 w-full">Contact our team</ButtonLink>
          </div>
        </nav>
      )}
    </header>
  )
}
