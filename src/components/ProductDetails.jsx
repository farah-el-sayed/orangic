import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'
import Badge from './Badge.jsx'
import Button from './Button.jsx'
import Container from './Container.jsx'
import Icon from './Icon.jsx'
import Price from './Price.jsx'
import ProductCard from './ProductCard.jsx'
import Rating from './Rating.jsx'
import Reviews from './Reviews.jsx'
import SafeImage from './SafeImage.jsx'
import StockStatus from './StockStatus.jsx'
import { products } from '../data/products.js'
import { useCart } from '../hooks/useCart.js'
import { useToast } from '../hooks/useToast.js'
import { useWishlist } from '../hooks/useWishlist.js'

const DETAIL_TABS = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'nutrition', label: 'Nutrition & care' },
]

export default function ProductDetails({ product }) {
  const reducedMotion = useReducedMotion()
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState(DETAIL_TABS[0].id)
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const { wishlist, toggle } = useWishlist()
  const isWishlisted = wishlist.some((item) => item.id === product.id)
  const isOutOfStock = product.stock === 0
  const maxQuantity = Math.max(product.stock, 1)
  const savings = product.oldPrice ? product.oldPrice - product.price : 0

  const related = useMemo(() => {
    const sameCategory = products.filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    const picked = sameCategory.length > 0 ? sameCategory : products
    return {
      items: picked.slice(0, 3),
      fromCategory: sameCategory.length > 0,
    }
  }, [product.category, product.id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    showToast(`${quantity} ${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    showToast(`${product.name} added — heading to checkout`)
    navigate(ROUTES.checkout)
  }

  const handleWishlist = () => {
    toggle(product)
    showToast(
      isWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} saved to wishlist`,
    )
  }

  const handlePreviousImage = () => {
    setActiveImage(
      (current) => (current - 1 + product.images.length) % product.images.length,
    )
  }

  const handleNextImage = () => {
    setActiveImage((current) => (current + 1) % product.images.length)
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10)
    setQuantity(
      Number.isInteger(value) && value > 0 ? Math.min(value, maxQuantity) : 1,
    )
  }

  const scrollToReviews = () => {
    document.getElementById('reviews')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <Container className="pb-12 pt-6 sm:pb-16 sm:pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-forest-800" to={ROUTES.home}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-forest-800" to={ROUTES.products}>
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-forest-900">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>
      <Container className="grid gap-10 pb-16 sm:pb-24 lg:grid-cols-2 lg:gap-16">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="grid gap-3 sm:grid-cols-[5rem_1fr]"
          initial={reducedMotion ? false : { opacity: 0, x: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:grid sm:content-start sm:overflow-visible">
            {product.images.map((image, index) => (
              <button
                aria-label={`Show ${product.name} image ${index + 1}`}
                aria-pressed={activeImage === index}
                className={`size-16 shrink-0 overflow-hidden rounded-md border-2 sm:size-20 ${
                  activeImage === index ? 'border-forest-700' : 'border-transparent'
                }`}
                key={image}
                onClick={() => setActiveImage(index)}
                type="button"
              >
                <SafeImage
                  alt={`${product.name} view ${index + 1}`}
                  className="size-full object-cover"
                  decoding="async"
                  loading="lazy"
                  src={image}
                />
              </button>
            ))}
          </div>
          <div className="relative order-1 aspect-square overflow-hidden rounded-lg bg-sage-50 sm:order-2">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 size-full"
                exit={reducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
                initial={reducedMotion ? false : { opacity: 0, scale: 1.02 }}
                key={product.images[activeImage]}
                transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
              >
                <SafeImage
                  alt={product.name}
                  className="size-full object-cover"
                  decoding="async"
                  src={product.images[activeImage]}
                />
              </motion.div>
            </AnimatePresence>

            {product.badge && (
              <Badge className="absolute left-4 top-4" variant="warm">
                {product.badge}
              </Badge>
            )}
            {savings > 0 && (
              <Badge className="absolute right-4 top-4" variant="accent">
                -{product.discount}%
              </Badge>
            )}

            {product.images.length > 1 && (
              <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
                <button
                  aria-label="Show previous image"
                  className="grid size-9 place-items-center rounded-full bg-cream-50/90 text-lg text-forest-800 shadow-soft backdrop-blur transition hover:bg-cream-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200"
                  onClick={handlePreviousImage}
                  type="button"
                >
                  ←
                </button>
                <span className="rounded-full bg-cream-50/90 px-2.5 py-1 text-xs font-semibold text-forest-900 shadow-soft backdrop-blur">
                  {activeImage + 1} / {product.images.length}
                </span>
                <button
                  aria-label="Show next image"
                  className="grid size-9 place-items-center rounded-full bg-cream-50/90 text-lg text-forest-800 shadow-soft backdrop-blur transition hover:bg-cream-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200"
                  onClick={handleNextImage}
                  type="button"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl self-center"
          initial={reducedMotion ? false : { opacity: 0, x: 10 }}
          transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
        >
          <Link
            className="text-sm font-semibold text-forest-700 hover:text-clay-700"
            to={ROUTES.products}
          >
            ← Back to products
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {product.badge && <Badge variant="warm">{product.badge}</Badge>}
            {product.isOrganic && <Badge variant="success">Certified organic</Badge>}
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-ink-500">
            {product.category}
          </p>
          <h1 className="ds-heading mt-2 text-forest-950">{product.name}</h1>
<div className="mt-5 flex flex-wrap items-center gap-5">
            <Price
              discount={product.discount}
              oldPrice={product.oldPrice}
              price={product.price}
            />
            <Rating reviews={product.reviews} value={product.rating} />
          </div>
          {savings > 0 && (
            <p className="mt-1 text-sm font-semibold text-forest-700">
              You save ${savings.toFixed(2)} · {product.discount}% off the usual price
            </p>
          )}
          <button
            className="mt-2 text-sm font-medium text-forest-700 underline underline-offset-2 transition hover:text-clay-700"
            onClick={scrollToReviews}
            type="button"
          >
            Read all {product.reviews} customer reviews →
          </button>
          <p className="ds-body mt-5">{product.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <StockStatus stock={product.stock} />
            <span className="text-sm text-ink-500">Ships in 1–2 days</span>
          </div>
          {!isOutOfStock && product.stock < 10 && (
            <div className="mt-4">
              <div
                aria-hidden="true"
                className="h-1.5 overflow-hidden rounded-full bg-clay-100"
              >
                <div
                  className="h-full rounded-full bg-clay-700"
                  style={{ width: `${Math.max(10, (product.stock / 40) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-semibold text-clay-700">
                Hurry — only {product.stock} left in stock
              </p>
            </div>
          )}
{isOutOfStock ? (
            <Button className="mt-8 w-full" disabled size="lg">
              Out of stock — back soon
            </Button>
          ) : (
            <div className="mt-8 grid gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-md border border-line bg-cream-50">
                  <button
                    aria-label="Decrease quantity"
                    className="grid size-11 place-items-center text-lg text-forest-800 hover:bg-sage-50"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    type="button"
                  >
                    −
                  </button>
                  <label className="sr-only" htmlFor="product-quantity">
                    Quantity
                  </label>
                  <input
                    aria-label="Quantity"
                    className="w-14 border-0 bg-transparent text-center font-semibold text-forest-950 tabular-nums outline-none"
                    id="product-quantity"
                    inputMode="numeric"
                    max={maxQuantity}
                    min={1}
                    onChange={handleQuantityChange}
                    pattern="[0-9]*"
                    type="number"
                    value={quantity}
                  />
                  <button
                    aria-label="Increase quantity"
                    className="grid size-11 place-items-center text-lg text-forest-800 hover:bg-sage-50"
                    disabled={quantity >= maxQuantity}
                    onClick={() =>
                      setQuantity((current) => Math.min(maxQuantity, current + 1))
                    }
                    type="button"
                  >
                    +
                  </button>
                </div>
                <Button
                  className="min-w-44 flex-1 sm:flex-none"
                  onClick={handleAddToCart}
                  size="lg"
                  variant="secondary"
                >
                  Add to cart
                </Button>
              </div>
              <Button className="w-full" onClick={handleBuyNow} size="lg">
                Buy now
              </Button>
            </div>
          )}

          <Button
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWishlisted}
            className="mt-3 w-full"
            onClick={handleWishlist}
            size="lg"
            variant={isWishlisted ? 'primary' : 'secondary'}
          >
            <Icon filled={isWishlisted} name="heart" size={17} />
            {isWishlisted ? 'Saved to wishlist' : 'Add to wishlist'}
          </Button>
          <div className="mt-10 border-t border-line pt-6">
            <div
              aria-label={`${product.name} details`}
              className="flex flex-wrap gap-2"
              role="tablist"
            >
              {DETAIL_TABS.map((tab) => (
                <button
                  aria-selected={activeTab === tab.id}
                  className={`grid min-h-10 place-items-center rounded-md border px-4 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? 'border-forest-800 bg-forest-50 text-forest-900'
                      : 'border-line bg-cream-50 text-ink-500 hover:border-forest-100 hover:text-forest-700'
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-6" role="tabpanel">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
                  initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                  key={activeTab}
                  transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                >
                  {activeTab === 'description' && (
                    <div className="grid gap-4 text-sm leading-7 text-ink-700">
                      <p>{product.description}</p>
                      <p>
                        Made for everyday rituals, with ingredients and materials
                        you can feel good about — traceable, small-batch, and
                        delivered with care.
                      </p>
                      <ul className="grid gap-2">
                        {product.isOrganic && <li>✓ Certified organic</li>}
                        <li>✓ Ships in 1–2 business days</li>
                        <li>✓ Free shipping on orders over $50</li>
                      </ul>
                    </div>
                  )}
                  {activeTab === 'ingredients' && (
                    <ul className="grid gap-2 text-sm leading-6 text-ink-700">
                      {product.ingredients.map((ingredient) => (
                        <li key={ingredient}>• {ingredient}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'nutrition' && (
                    <dl className="grid gap-2 text-sm leading-6 text-ink-700">
                      {Object.entries(product.nutrition).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-3 border-b border-line pb-2"
                          key={key}
                        >
                          <dt className="capitalize text-ink-500">{key}</dt>
                          <dd className="text-right font-medium text-forest-900">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </Container>
      <Reviews product={product} />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
                You may also like
              </p>
              <h2 className="mt-2 font-display text-3xl text-forest-950">
                Related products
              </h2>
            </div>
            <Link
              className="text-sm font-semibold text-forest-700 hover:text-clay-700"
              to={
                related.fromCategory
                  ? `${ROUTES.products}?category=${encodeURIComponent(product.category)}`
                  : ROUTES.products
              }
            >
              View all
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.items.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}