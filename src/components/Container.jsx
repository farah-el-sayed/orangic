export default function Container({
  as: Component = 'div',
  children,
  size = 'default',
  className = '',
  ...props
}) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-[96rem]',
  }

  return (
    <Component
      {...props}
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}
    >
      {children}
    </Component>
  )
}
