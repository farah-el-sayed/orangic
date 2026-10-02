export default function Skeleton({ className = '', count = 1, variant = 'block' }) {
  if (variant === 'card') {
    return (
      <div aria-hidden="true" className="grid gap-5 xs:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div
            className="overflow-hidden rounded-xl border border-line bg-cream-50 shadow-soft"
            key={index}
          >
            <div className="aspect-[4/3] animate-pulse bg-gradient-to-br from-sage-100 via-cream-200 to-sage-100 sm:aspect-[0.8889]" />
            <div className="grid gap-3 p-4 sm:p-5">
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-sage-100" />
              <div className="h-5 w-4/5 animate-pulse rounded-md bg-sage-100" />
              <div className="flex items-center justify-between gap-3">
                <div className="h-5 w-16 animate-pulse rounded-md bg-sage-100" />
                <div className="h-9 w-20 animate-pulse rounded-full bg-sage-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div aria-hidden="true" className="grid gap-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          className={`animate-pulse rounded-md bg-gradient-to-r from-sage-100 via-cream-200 to-sage-100 ${className}`}
          key={index}
        />
      ))}
    </div>
  )
}