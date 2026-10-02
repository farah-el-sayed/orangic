import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ROUTES } from '../constants/routes.js'
import { useCart } from '../hooks/useCart.js'
import { useToast } from '../hooks/useToast.js'
import { useWishlist } from '../hooks/useWishlist.js'
import Badge from './Badge.jsx'
import Button from './Button.jsx'
import Card from './Card.jsx'
import Icon from './Icon.jsx'
import Price from './Price.jsx'
import Rating from './Rating.jsx'
import StockStatus from './StockStatus.jsx'
import SafeImage from './SafeImage.jsx'

function ProductCard({ product }) {
  const reducedMotion = useReducedMotion()
  const { addToCart } = useCart()
  const { toggle } = useWishlist()
  const { showToast } = useToast()

  const handleAddToCart = useCallback(() => {
    addToCart(product)
    showToast(`${product.name} added to cart`)
  }, [addToCart, product, showToast])

  const handleToggleWishlist = useCallback(() => {
    toggle(product)
    showToast(`${product.name} saved to wishlist`)
  }, [product, showToast, toggle])

  return (
    <Card
      animate={{ opacity: 1, y: 0 }}
      as={motion.article}
      className="group flex h-full flex-col overflow-hidden"
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      interactive
      layout
      transition={{ duration: 0.32, ease: 'easeOut' }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-50 sm:aspect-[0.8889]">
        <Link
          aria-label={`View ${product.name}`}
          className="block size-full focus-visible:outline-none"
          to={`${ROUTES.products}/${product.slug}`}
        >
          <SafeImage
            alt={product.name}
            className="size-full object-cover transition !duration-700 ease-out group-hover:scale-[1.06]"
            decoding="async"
            loading="lazy"
            src={product.images[0]}
          />
        </Link>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        {product.badge && (
          <Badge className="absolute left-3 top-3 shadow-soft sm:left-4 sm:top-4" variant="warm">
            {product.badge}
          </Badge>
        )}
        <button
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-cream-50/95 text-forest-800 opacity-100 shadow-soft backdrop-blur transition duration-200 hover:scale-105 hover:text-clay-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200 active:scale-95 sm:right-4 sm:top-4 sm:size-auto sm:px-3 sm:py-2 sm:text-xs sm:font-semibold sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          onClick={handleToggleWishlist}
          type="button"
        >
          <Icon name="heart" size={15} />
          <span className="hidden sm:inline">Wishlist</span>
        </button>
      </div>
      <div className="grid flex-1 content-start gap-2.5 p-4 sm:gap-3 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
            {product.category}
          </p>
          <Rating compact value={product.rating} />
        </div>
        <Link
          className="line-clamp-2 min-h-14 font-display text-lg leading-snug text-forest-950 transition hover:text-forest-700 sm:text-xl sm:leading-tight"
          to={`${ROUTES.products}/${product.slug}`}
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <Price
            discount={product.discount}
            oldPrice={product.oldPrice}
            price={product.price}
          />
          <Button
            aria-label={`Add ${product.name} to cart`}
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            size="sm"
          >
            Add
          </Button>
        </div>
        <StockStatus stock={product.stock} />
      </div>
    </Card>
  )
}

export default memo(ProductCard)
