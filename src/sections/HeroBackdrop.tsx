import { useEffect, useRef } from 'react'
import { isLiteDevice, useMotionAllowed, useThemeColors, whenIdle } from '@/hooks/useMotion'

/** Full-bleed drifting particle field with soft moving light — the hero's "video" background. */
export function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null)
  const motion = useMotionAllowed()
  const colors = useThemeColors()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const lite = isLiteDevice()
    let w = 0, h = 0
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    let ps: P[] = []
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(lite ? 26 : 60, (w * h) / 22000))
      ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.6 + 0.6 }))
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    let mx = -9999, my = -9999
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top }
    window.addEventListener('pointermove', onMove, { passive: true })

    const draw = () => {
      const c = colors.current
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * 0.22
            ctx.strokeStyle = c.a
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        const dm = Math.hypot(p.x - mx, p.y - my)
        if (dm < 160) {
          ctx.globalAlpha = (1 - dm / 160) * 0.45
          ctx.strokeStyle = c.b
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke()
        }
        ctx.globalAlpha = 0.55
        ctx.fillStyle = i % 2 ? c.b : c.a
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    let raf = 0, running = false, visible = true, last = 0
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last < (lite ? 50 : 33)) return // ~30 fps is plenty for a slow drift
      last = t
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10
      }
      draw()
    }
    const start = () => { if (!running && visible && motion && !document.hidden) { running = true; raf = requestAnimationFrame(tick) } }
    const stop = () => { running = false; cancelAnimationFrame(raf) }
    draw()
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    const cancelIdle = whenIdle(start)
    return () => { cancelIdle(); stop(); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', onVis) }
  }, [motion, colors])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  )
}
