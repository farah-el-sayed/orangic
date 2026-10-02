export default function Card({
  as: Component = 'article',
  children,
  interactive = false,
  className = '',
  ...props
}) {
  return (
    <Component
      {...props}
      className={`rounded-xl border border-line bg-cream-50 shadow-soft ${interactive ? 'transition duration-300 ease-out hover:-translate-y-1 hover:border-sage-200 hover:shadow-lifted focus-within:ring-4 focus-within:ring-sage-100 motion-reduce:hover:translate-y-0' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
