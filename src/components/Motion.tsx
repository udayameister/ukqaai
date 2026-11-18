import { useEffect, useRef, useState } from 'react'
import { useMotionAllowed } from '@/hooks/useMotion'

/** Counts up from 0 to `to` when it scrolls into view. Shows the final number to no-JS visitors and search engines. */
export function CountUp({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const motion = useMotionAllowed()
  const [n, setN] = useState(to)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !motion) { setN(to); return }
    setN(0)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / duration)
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration, motion])
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>
}

/** Cycles through phrases with a soft slide. Screen readers get the full list once. */
export function RotatingWords({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const motion = useMotionAllowed()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!motion) return
    const id = setInterval(() => setI((x) => (x + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [motion, words.length, interval])
  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((w, k) => (
        <span
          key={w}
          aria-hidden="true"
          className={`col-start-1 row-start-1 whitespace-nowrap font-semibold text-brand transition-all duration-500 ${k === i ? 'translate-y-0 opacity-100' : k === (i - 1 + words.length) % words.length ? '-translate-y-3 opacity-0' : 'translate-y-3 opacity-0'}`}
        >
          {w}
        </span>
      ))}
    </span>
  )
}

/** Endless horizontal ticker. Pauses on hover and stops for reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-semibold text-muted">
          {t}<span className="h-1.5 w-1.5 rounded-full bg-brand/60" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      {row(false)}
      {row(true)}
    </div>
  )
}
