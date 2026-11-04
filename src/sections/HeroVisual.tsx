/** Abstract AI network illustration for the home hero (pure SVG + CSS, no images). */
const nodes: [number, number, number][] = [
  [250, 70, 5], [370, 110, 4], [430, 220, 6], [400, 340, 4], [290, 420, 5], [160, 390, 4], [80, 280, 6], [100, 150, 4],
  [200, 170, 7], [310, 190, 6], [340, 290, 7], [220, 310, 6], [260, 245, 10],
]
const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 8], [0, 9], [1, 9], [2, 10], [3, 10], [4, 11], [5, 11], [6, 11], [7, 8],
  [8, 12], [9, 12], [10, 12], [11, 12], [8, 9], [9, 10], [10, 11], [11, 8], [6, 8], [2, 9],
]
const chips = [
  { label: 'Machine Learning', x: '2%', y: '14%' },
  { label: 'Research', x: '74%', y: '8%' },
  { label: 'Software', x: '80%', y: '72%' },
  { label: 'Quantum R&D', x: '0%', y: '78%' },
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-brand/20 blur-3xl" />
      <svg viewBox="0 0 500 500" className="anim-float relative h-full w-full">
        <defs>
          <linearGradient id="hv-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3d7bff" />
            <stop offset="1" stopColor="#8a5cff" />
          </linearGradient>
          <radialGradient id="hv-core">
            <stop offset="0" stopColor="#8fb3ff" />
            <stop offset="1" stopColor="#3d7bff" />
          </radialGradient>
        </defs>
        <g className="anim-orbit">
          <ellipse cx="255" cy="245" rx="235" ry="92" fill="none" stroke="url(#hv-edge)" strokeOpacity=".28" strokeWidth="1.2" transform="rotate(-24 255 245)" />
          <circle cx="40" cy="300" r="5" fill="#8a5cff" />
        </g>
        <circle cx="255" cy="245" r="200" fill="none" stroke="url(#hv-edge)" strokeOpacity=".5" strokeWidth="2" />
        <circle cx="255" cy="245" r="150" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 6" />
        <g stroke="url(#hv-edge)" strokeWidth="1.4" strokeOpacity=".7">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className={i % 3 === 0 ? 'anim-dash' : undefined} />
          ))}
        </g>
        {nodes.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r * 2.4} fill="#3d7bff" opacity=".12" />
            <circle cx={x} cy={y} r={r} fill={i === 12 ? 'url(#hv-core)' : i % 2 ? '#8a5cff' : '#5b93ff'} className="anim-pulse" style={{ animationDelay: `${(i * 0.37) % 3}s` }} />
          </g>
        ))}
        <path d="M398 393 L440 435 H482" fill="none" stroke="url(#hv-edge)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="484" cy="435" r="6" fill="#8a5cff" />
      </svg>
      {chips.map((c) => (
        <span key={c.label} className="card absolute hidden px-3 py-1.5 text-xs font-semibold text-fg shadow-lg shadow-black/10 backdrop-blur sm:block" style={{ left: c.x, top: c.y }}>
          {c.label}
        </span>
      ))}
    </div>
  )
}
