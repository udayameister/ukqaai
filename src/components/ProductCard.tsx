import type { Product } from '@/data/products'
import { productStatusLabels } from '@/data/products'
import { Icon } from './Icon'
import { Badge, ButtonLink, IconTile } from './ui'

/** Reusable product card. `featured` shows the full feature grid. */
export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const tone = product.status === 'live' ? 'green' : product.status === 'beta' ? 'amber' : 'violet'
  const live = product.status !== 'coming-soon'
  return (
    <article className={`card reveal relative overflow-hidden ${featured ? 'p-7 sm:p-10' : 'p-6 sm:p-8'}`} aria-labelledby={`p-${product.id}`}>
      {featured && <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />}
      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <IconTile name={product.icon} />
          <Badge tone={tone}>{productStatusLabels[product.status]}</Badge>
        </div>
        <h3 id={`p-${product.id}`} className={`mt-6 font-semibold ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{product.name}</h3>
        <p className="mt-2 font-display text-base font-medium text-brand">{product.tagline}</p>
        <p className="mt-4 max-w-2xl text-muted">{product.description}</p>

        <ul className={`mt-8 grid gap-4 ${featured ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {(featured ? product.features : product.features.slice(0, 4)).map((f) => (
            <li key={f.title} className="flex gap-3 rounded-xl border border-line bg-surface-2/60 p-4">
              <Icon name={f.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>
                <span className="block font-semibold text-fg">{f.title}</span>
                <span className="mt-1 block text-sm text-muted">{f.description}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {live ? (
            <ButtonLink to={product.url} external>{product.ctaLabel}</ButtonLink>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-semibold text-muted">In development — launching soon</span>
          )}
          <p className="text-sm text-muted">For: {product.audience.join(' · ')}</p>
        </div>
      </div>
    </article>
  )
}
