export default function StockStatus({ stock }) {
  const status =
    stock === 0
      ? 'Out of stock'
      : stock < 10
        ? `Only ${stock} left`
        : 'In stock'
  const color =
    stock === 0
      ? 'text-danger-700'
      : stock < 10
        ? 'text-clay-700'
        : 'text-forest-700'

  return <span className={`text-xs font-semibold ${color}`}>{status}</span>
}
