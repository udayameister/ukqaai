import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(true)
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch { /* storage unavailable */ }
  }
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition hover:border-brand/50 hover:text-brand"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  )
}
