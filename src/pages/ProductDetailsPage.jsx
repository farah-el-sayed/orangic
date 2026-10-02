import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails.jsx'
import { products } from '../data/products.js'
import ErrorState from '../components/ErrorState.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const [, setRetryKey] = useState(0)
  let result

  try {
    const product = products.find((item) => item.slug === slug)
    const isValidProduct =
      product &&
      typeof product.id === 'string' &&
      typeof product.name === 'string' &&
      typeof product.slug === 'string' &&
      Array.isArray(product.images) &&
      product.images.length > 0 &&
      Number.isFinite(product.price)

    result = isValidProduct
      ? { error: null, product }
      : { error: product ? new Error('Invalid product data.') : null, product: null }
  } catch (error) {
    result = { error, product: null }
  }

  if (result.error) {
    return <ErrorState onRetry={() => setRetryKey((current) => current + 1)} />
  }

  return result.product ? <ProductDetails product={result.product} /> : <NotFoundPage />
}
