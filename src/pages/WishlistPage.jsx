import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ROUTES } from '../constants/routes.js'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Icon from '../components/Icon.jsx'
import Price from '../components/Price.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { useCart } from '../hooks/useCart.js'
import { useToast } from '../hooks/useToast.js'
import { useWishlist } from '../hooks/useWishlist.js'
import SafeImage from '../components/SafeImage.jsx'

export default function WishlistPage() {
    const reducedMotion = useReducedMotion()
    const { wishlist, remove } = useWishlist()
    const { addToCart } = useCart()
    const { showToast } = useToast()

    const handleMoveToCart = (product) => {
        addToCart(product)
        remove(product.id)
        showToast(`${product.name} moved to cart`)
    }

    const handleRemove = (product) => {
        remove(product.id)
        showToast(`${product.name} removed from wishlist`)
    }

    if (wishlist.length === 0) {
        return (
            <EmptyState
                actionLabel="Explore products"
                description="Save the pieces you love as you browse, and keep a quiet list of what you want to bring home."
                title="Your wishlist is empty"
            />
        )
    }

    return (
        <>
            <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
                <Container>
                    <SectionTitle
                        description="A personal shortlist of things worth coming back to."
                        eyebrow="Saved for later"
                        title="Your considered collection."
                        as="h1"
                    />
                </Container>
            </section>
            <Container className="py-10 sm:py-14">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence initial={false} mode="popLayout">
                    {wishlist.map((product) => (
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                            initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
                            key={product.id}
                            layout
                            transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
                        >
                        <Card className="overflow-hidden">
                            <Link
                                aria-label={`View ${product.name}`}
                                className="block aspect-[1.15] overflow-hidden bg-sage-50"
                                to={`${ROUTES.products}/${product.slug}`}
                            >
                                <SafeImage
                                    alt={product.name}
                                    className="size-full object-cover transition duration-500 hover:scale-105"
                                    src={product.images[0]}
                                />
                            </Link>
                            <div className="grid gap-4 p-4 sm:p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
                                            {product.category}
                                        </p>
                                        <Link
                                            className="mt-1 block font-display text-xl leading-tight text-forest-950 hover:text-forest-700"
                                            to={`${ROUTES.products}/${product.slug}`}
                                        >
                                            {product.name}
                                        </Link>
                                    </div>
                                    <button
                                        aria-label={`Remove ${product.name} from wishlist`}
                                        className="grid size-9 shrink-0 place-items-center rounded-full text-clay-700 transition hover:bg-clay-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
                                        onClick={() => handleRemove(product)}
                                        type="button"
                                    >
                                        <Icon name="close" size={17} />
                                    </button>
                                </div>
                                <Price
                                    discount={product.discount}
                                    oldPrice={product.oldPrice}
                                    price={product.price}
                                />
                                <Button
                                    className="w-full"
                                    disabled={product.stock === 0}
                                    onClick={() => handleMoveToCart(product)}
                                    variant="secondary"
                                >
                                    {product.stock === 0 ? 'Out of stock' : 'Move to cart'}
                                </Button>
                            </div>
                        </Card>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </Container>
        </>
    )
}