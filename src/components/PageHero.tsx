import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export function PageHero({
  eyebrow, title, intro, crumbs = [], children,
}: { eyebrow?: string; title: ReactNode; intro?: ReactNode; crumbs?: { name: string; path: string }[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
      <div className="container-x relative py-16 sm:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li><Link to="/" className="hover:text-fg">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  <Icon name="arrowRight" className="h-3.5 w-3.5 opacity-50" />
                  {i === crumbs.length - 1 ? <span aria-current="page" className="text-fg">{c.name}</span> : <Link to={c.path} className="hover:text-fg">{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 text-lg text-muted sm:text-xl">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
