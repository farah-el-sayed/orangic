const badgeVariants = {
  neutral: 'bg-cream-200 text-ink-700',
  success: 'bg-sage-100 text-forest-800',
  warm: 'bg-clay-100 text-clay-700',
  accent: 'bg-forest-100 text-forest-900',
}

export default function Badge({
  children,
  variant = 'neutral',
  className = '',
}) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
