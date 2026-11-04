import { useId } from 'react'

/**
 * UKQAAI "Graph-Q" mark: a Q ring holding a small connected graph,
 * a faint orbit and a circuit-trace tail.
 */
export function LogoMark({ className = 'h-9 w-9', title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`g-${id}`} x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3d7bff" />
          <stop offset="1" stopColor="#8a5cff" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="29" rx="27" ry="10" fill="none" stroke={`url(#g-${id})`} strokeOpacity=".35" strokeWidth="1.5" transform="rotate(-28 30 29)" />
      <circle cx="30" cy="29" r="19" fill="none" stroke={`url(#g-${id})`} strokeWidth="4.5" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".9">
        <line x1="23" y1="23" x2="35" y2="20" />
        <line x1="23" y1="23" x2="29" y2="33" />
        <line x1="35" y1="20" x2="29" y2="33" />
        <line x1="35" y1="20" x2="39" y2="31" />
        <line x1="29" y1="33" x2="39" y2="31" />
        <line x1="23" y1="23" x2="21" y2="35" />
        <line x1="21" y1="35" x2="29" y2="33" />
      </g>
      <g fill="currentColor">
        <circle cx="23" cy="23" r="2.6" />
        <circle cx="35" cy="20" r="2.6" />
        <circle cx="29" cy="33" r="3" />
        <circle cx="39" cy="31" r="2.3" />
        <circle cx="21" cy="35" r="2.1" />
      </g>
      <path d="M42 42 L49 49 H58" fill="none" stroke={`url(#g-${id})`} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="58.5" cy="49" r="3" fill="#8a5cff" />
    </svg>
  )
}

export function Logo({ showTagline = false }: { showTagline?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 shrink-0 text-fg" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.2rem] font-bold tracking-[0.04em] text-fg">
          UKQ<span className="text-gradient">AAI</span>
        </span>{' '}
        {showTagline ? (
          <span className="mt-1.5 text-[0.72rem] font-medium text-muted">Technologies · Quantum and AI solution for everything</span>
        ) : (
          <span className="mt-1 font-display text-[0.6rem] font-medium uppercase tracking-[0.22em] text-muted">Technologies</span>
        )}
      </span>
    </span>
  )
}
