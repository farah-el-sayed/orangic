const buttonVariants = {
  primary:
    'bg-forest-800 text-cream-50 shadow-soft hover:-translate-y-px hover:bg-forest-900 hover:shadow-lifted active:translate-y-0 active:bg-forest-950',
  secondary:
    'border border-forest-800/25 bg-cream-50 text-forest-800 hover:-translate-y-px hover:border-forest-800 hover:bg-forest-50 active:translate-y-0 active:bg-forest-100',
  quiet: 'text-forest-800 hover:bg-forest-50 active:bg-forest-100',
  danger: 'bg-danger-700 text-cream-50 shadow-soft hover:-translate-y-px hover:bg-clay-700 active:translate-y-0 active:bg-danger-700',
}

const buttonSizes = {
  sm: 'min-h-9 px-3.5 text-[0.8125rem]',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-13 px-7 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  as: Component = 'button',
  type = 'button',
  ...props
}) {
  const isDisabled = disabled || loading

  return (
    <Component
      {...props}
      {...(Component === 'button' ? { type, disabled: isDisabled } : {})}
      aria-busy={loading || undefined}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      <span className="inline-flex items-center justify-center gap-2">{children}</span>
    </Component>
  )
}
