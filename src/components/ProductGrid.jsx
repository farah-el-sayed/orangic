import { memo } from 'react'
import ProductCard from './ProductCard.jsx'
import EmptyState from './EmptyState.jsx'
import Skeleton from './Skeleton.jsx'

function ProductGrid({
  products,
  emptyMessage = 'No products match these filters.',
  loading = false,
  skeletonCount = 6,
}) {
  if (loading) {
    return <Skeleton variant="card" count={skeletonCount} />
  }

  if (products.length === 0) {
    return <EmptyState description={emptyMessage} title="No products found" />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 xs:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default memo(ProductGrid)
