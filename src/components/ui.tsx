import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost'
const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-offset-4'
const variants: Record<Variant, string> = {
  primary: 'bg-brand-gradient text-white shadow-[0_10px_30px_-12px_rgb(31_94_255/0.7)] hover:brightness-110',
  secondary: 'border border-line bg-surface text-fg hover:border-brand/50',
  ghost: 'text-fg hover:text-brand',
}

export function ButtonLink({
  to, children, variant = 'primary', icon = 'arrowRight', external = false, className = '',
}: { to: string; children: ReactNode; variant?: Variant; icon?: IconName | null; external?: boolean; className?: string }) {
  const cls = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      {icon && <Icon name={external ? 'arrowUpRight' : icon} className="h-4 w-4" />}
    </>
  )
  if (external || /^(https?:|mailto:|tel:|#)/.test(to)) {
    const isWeb = /^https?:/.test(to)
    return (
      <a href={to} className={cls} {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
        {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }
  return <Link to={to} className={cls}>{content}</Link>
}

export function Section({ children, className = '', id, labelledBy }: { children: ReactNode; className?: string; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 sm:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  )
}

export function SectionHeader({
  eyebrow, title, intro, id, align = 'left',
}: { eyebrow?: string; title: ReactNode; intro?: ReactNode; id?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`reveal mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  )
}

export function IconTile({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand ${className}`}>
      <Icon name={name} className="h-5 w-5" />
    </span>
  )
}

const badgeTone = {
  green: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300',
  violet: 'border-accent/30 bg-accent/10 text-accent',
}
export function Badge({ children, tone }: { children: ReactNode; tone: keyof typeof badgeTone }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeTone[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-muted">
          <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  )
}
