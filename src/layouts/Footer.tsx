import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { Icon } from '@/components/Icon'
import { mapsLink } from '@/components/OfficeMap'
import { OPEN_COOKIE_SETTINGS } from '@/components/CookieBanner'
import { displayLegalName, site } from '@/config/site'
import { footerNav } from '@/data/navigation'
import { services } from '@/data/services'
import { products } from '@/data/products'
import { analyticsEnabled } from '@/utils/analytics'

export function Footer() {
  const socials = site.social.filter((s) => s.url)
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-sm">
          <Link to="/" className="inline-block rounded-lg"><Logo showTagline /></Link>
          <p className="mt-5 text-sm text-muted">{site.description}</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li><a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 text-fg hover:text-brand"><Icon name="mail" className="h-4 w-4 text-brand" />{site.contact.email}</a></li>
            {site.contact.phone && <li><a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="text-fg hover:text-brand">{site.contact.phone}</a></li>}
            <li><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-muted hover:text-fg"><Icon name="mapPin" className="mt-1 h-4 w-4 shrink-0 text-brand" /><span>{site.contact.address}</span><span className="sr-only"> (opens Google Maps in a new tab)</span></a></li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium hover:border-brand/50">{s.label}<Icon name="arrowUpRight" className="h-3 w-3" /></a></li>
              ))}
            </ul>
          )}
        </div>

        <FooterCol title="Services" links={services.map((s) => ({ label: s.shortTitle, to: `/services/${s.slug}` }))} />
        <FooterCol title="Products" links={[{ label: 'All products', to: '/products' }, ...products.map((p) => ({ label: p.name, to: p.url, external: true }))]} />
        <FooterCol title="Company" links={footerNav.Company} />
        <FooterCol title="Legal" links={footerNav.Legal} />
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {displayLegalName}. All rights reserved.</p>
          <div className="flex gap-4">
            {analyticsEnabled() && (
              <button type="button" className="hover:text-fg" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>Cookie settings</button>
            )}
            <span>{site.slogan}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string; external?: boolean }[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-fg">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.to} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">{l.label}<span className="sr-only"> (opens in a new tab)</span></a>
            ) : (
              <Link to={l.to} className="text-muted hover:text-fg">{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
