import { useEffect, useRef } from 'react'
import { isLiteDevice, useMotionAllowed, useThemeColors, whenIdle } from '@/hooks/useMotion'

/**
 * A slowly rotating 3D network "globe" drawn on canvas — reads like a looping video
 * but weighs nothing. Follows the pointer gently, pauses when off-screen or the tab is hidden,
 * and shows a single still frame when the visitor prefers reduced motion.
 */
const POINTS = 110
const LINK_DIST = 0.52

function fibonacciSphere(n: number) {
  const pts: [number, number, number][] = []
  const g = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = g * i
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r])
  }
  return pts
}

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const motion = useMotionAllowed()
  const colors = useThemeColors()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lite = isLiteDevice()
    const pts = fibonacciSphere(lite ? 70 : POINTS)
    const links: [number, number][] = []
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1], pts[i][2] - pts[j][2])
        if (d < LINK_DIST * (lite ? 0.78 : 0.62)) links.push([i, j])
      }
    // pulses travelling along links
    const pulses = Array.from({ length: lite ? 6 : 14 }, () => ({ link: Math.floor(Math.random() * links.length), t: Math.random(), speed: 0.004 + Math.random() * 0.006 }))

    let w = 0, h = 0, dpr = 1
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    let rotY = 0.6, rotX = -0.25, targetX = -0.25, targetY = 0
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      targetX = -0.25 + ((e.clientY - r.top) / r.height - 0.5) * 0.5
      targetY = ((e.clientX - r.left) / r.width - 0.5) * 0.6
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const project = (p: [number, number, number]) => {
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX)
      const x = p[0] * cy + p[2] * sy
      let z = -p[0] * sy + p[2] * cy
      const y = p[1] * cx - z * sx
      z = p[1] * sx + z * cx
      const R = Math.min(w, h) * 0.4
      const persp = 2.6 / (2.6 + z)
      return { x: w / 2 + x * R * persp, y: h / 2 + y * R * persp, z, s: persp }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const c = colors.current
      const proj = pts.map(project)
      // outer ring
      const R = Math.min(w, h) * 0.4
      ctx.beginPath(); ctx.arc(w / 2, h / 2, R * 1.08, 0, Math.PI * 2)
      ctx.strokeStyle = c.a; ctx.globalAlpha = 0.35; ctx.lineWidth = 1.5; ctx.stroke()
      // links
      ctx.lineWidth = 1
      for (const [i, j] of links) {
        const a = proj[i], b = proj[j]
        const depth = (2 - (a.z + b.z) / 2) / 3
        ctx.globalAlpha = Math.max(0.05, depth * 0.55)
        ctx.strokeStyle = a.z + b.z > 0 ? c.b : c.a
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      }
      // nodes
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i]
        const depth = (1.5 - p.z) / 2.5
        ctx.globalAlpha = Math.max(0.15, depth)
        ctx.fillStyle = i % 3 === 0 ? c.b : c.a
        ctx.beginPath(); ctx.arc(p.x, p.y, (i % 7 === 0 ? 3.6 : 2.2) * p.s, 0, Math.PI * 2); ctx.fill()
      }
      // pulses
      for (const pu of pulses) {
        const [i, j] = links[pu.link]
        const a = proj[i], b = proj[j]
        const x = a.x + (b.x - a.x) * pu.t, y = a.y + (b.y - a.y) * pu.t
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9)
        g.addColorStop(0, c.glow); g.addColorStop(1, 'transparent')
        ctx.globalAlpha = 0.9; ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    let raf = 0, running = false, visible = true, last = 0
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last < (lite ? 40 : 22)) return // ~45 fps, ~25 fps on phones
      last = t
      rotY += 0.0025 + (targetY - 0) * 0.0006
      rotX += (targetX - rotX) * 0.03
      for (const pu of pulses) {
        pu.t += pu.speed
        if (pu.t > 1) { pu.t = 0; pu.link = Math.floor(Math.random() * links.length) }
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

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}
