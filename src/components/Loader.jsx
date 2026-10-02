import { useEffect, useState } from 'react'

export default function Loader({ label = 'Loading', className = '', delay = 0 }) {
  const [visible, setVisible] = useState(delay <= 0)

  useEffect(() => {
    if (delay <= 0) return undefined
    const timer = window.setTimeout(() => setVisible(true), delay)
    return () => window.clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      aria-label={label}
      aria-live="polite"
      className={`grid min-h-40 place-items-center gap-4 px-4 py-10 text-forest-700 ${className}`}
      role="status"
    >
      <span className="relative grid size-14 place-items-center" aria-hidden="true">
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-sage-200 border-t-forest-700" />
        <span className="grid size-9 place-items-center rounded-full bg-forest-800 text-sm font-bold text-cream-50">
          O
        </span>
      </span>
      <span className="text-sm font-medium">{label}…</span>
      <span className="sr-only">{label}</span>
    </div>
  )
}