export default function Price({ price, oldPrice, discount }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="font-semibold text-forest-900">${price.toFixed(2)}</span>
      {oldPrice && (
        <del className="text-sm text-ink-500">${oldPrice.toFixed(2)}</del>
      )}
      {discount > 0 && (
        <span className="text-xs font-semibold text-clay-700">
          -{discount}%
        </span>
      )}
    </div>
  )
}
