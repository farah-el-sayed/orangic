const STAR_COUNT = 5

function starFill(value, star) {
  return Math.min(1, Math.max(0, value - (star - 1)))
}

export default function Rating({
  value,
  reviews,
  compact = false,
  showValue = true,
  className = '',
}) {
  const rating = Math.min(5, Math.max(0, Number(value) || 0))

  return (
    <span
      className={`inline-flex items-center gap-1 text-sm ${className}`}
      aria-label={`${rating.toFixed(1)} out of 5 stars${reviews ? `, ${reviews} reviews` : ''}`}
    >
      <span aria-hidden="true" className="inline-flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: STAR_COUNT }, (_, index) => {
          const fill = starFill(rating, index + 1)

          return (
            <span className="relative inline-block size-3.5" key={index + 1}>
              <span className="absolute inset-0 text-amber-500/25">★</span>
              <span
                className="absolute inset-0 overflow-hidden text-amber-500"
                style={{ width: `${fill * 100}%` }}
              >
                ★
              </span>
            </span>
          )
        })}
      </span>
      {showValue && (
        <span className="font-semibold text-ink-900">{rating.toFixed(1)}</span>
      )}
      {reviews && (
        <span className={compact ? 'sr-only' : 'text-ink-500'}>
          ({reviews})
        </span>
      )}
    </span>
  )
}
