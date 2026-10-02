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
import SafeImage from '../components/SafeImage.jsx'

function formatMoney(amount) {
    return `$${amount.toFixed(2)}`
}

export default function CartPage() {
    const reducedMotion = useReducedMotion()
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        subtotal,
        shipping,
        discount,
        grandTotal,
    } = useCart()
    const { showToast } = useToast()

    const handleIncrease = (product) => {
        increaseQuantity(product.id)
        showToast(`${product.name} quantity increased`)
    }

    const handleDecrease = (product) => {
        decreaseQuantity(product.id)
        showToast(`${product.name} quantity updated`)
    }

    const handleRemove = (product) => {
        removeFromCart(product.id)
        showToast(`${product.name} removed from cart`)
    }

    if (cart.length === 0) {
        return (
            <EmptyState
                actionLabel="Browse products"
                description="Your cart is ready for something thoughtfully made. Find a few favorites and they will appear here."
                title="Your cart is waiting"
            />
        )
    }

    return (
        <>
            <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
                <Container>
                    <SectionTitle
                        description="A considered collection of small-batch goods, ready when you are."
                        eyebrow="Your basket"
                        title="Good things, gathered."
                        as="h1"
                    />
                </Container>
            </section>
            <Container className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="grid content-start gap-4">
                    <AnimatePresence initial={false} mode="popLayout">
                    {cart.map((product) => (
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
                            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                            key={product.id}
                            layout
                            transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
                        >
                        <Card className="grid gap-4 p-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-center sm:p-5">
                            <Link
                                aria-label={`View ${product.name}`}
                                className="aspect-square overflow-hidden rounded-md bg-sage-50"
                                to={`${ROUTES.products}/${product.slug}`}
                            >
                                <SafeImage
                                    alt={product.name}
                                    className="size-full object-cover"
                                    src={product.images[0]}
                                />
                            </Link>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
                                    {product.category}
                                </p>
                                <Link
                                    className="mt-1 block truncate font-display text-xl text-forest-950 hover:text-forest-700"
                                    to={`${ROUTES.products}/${product.slug}`}
                                >
                                    {product.name}
                                </Link>
                                <Price
                                    className="mt-2"
                                    discount={product.discount}
                                    oldPrice={product.oldPrice}
                                    price={product.price}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-4 sm:justify-end">
                                <div className="flex items-center rounded-md border border-line bg-cream-50">
                                    <button
                                        aria-label={`Decrease ${product.name} quantity`}
                                        className="grid size-9 place-items-center text-lg text-forest-800 transition hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
                                        onClick={() => handleDecrease(product)}
                                        type="button"
                                    >
                                        −
                                    </button>
                                    <span className="grid min-w-8 place-items-center text-sm font-semibold text-forest-950">
                                        {product.quantity}
                                    </span>
                                    <button
                                        aria-label={`Increase ${product.name} quantity`}
                                        className="grid size-9 place-items-center text-lg text-forest-800 transition hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
                                        onClick={() => handleIncrease(product)}
                                        type="button"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-forest-900">
                                        {formatMoney(product.price * product.quantity)}
                                    </p>
                                    <button
                                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-danger-700 hover:text-clay-700"
                                        onClick={() => handleRemove(product)}
                                        type="button"
                                    >
                                        <Icon name="close" size={13} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </Card>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                    <Button as={Link} className="mt-2 w-fit" to={ROUTES.products} variant="quiet">
                        Continue shopping
                    </Button>
                </div>

                <Card className="h-fit p-5 sm:p-6">
                    <h2 className="font-display text-2xl text-forest-950">Order summary</h2>
                    <div className="mt-6 grid gap-4 border-b border-line pb-6 text-sm">
                        <div className="flex justify-between gap-4 text-ink-700">
                            <span>Subtotal</span>
                            <span>{formatMoney(subtotal)}</span>
                        </div>
                        <div className="flex justify-between gap-4 text-ink-700">
                            <span>Shipping</span>
                            <span>{shipping ? formatMoney(shipping) : 'Free'}</span>
                        </div>
                        <div className="flex justify-between gap-4 text-clay-700">
                            <span>Discount</span>
                            <span>-{formatMoney(discount)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between gap-4 py-5 text-lg font-semibold text-forest-950">
                        <span>Grand total</span>
                        <span>{formatMoney(grandTotal)}</span>
                    </div>
                    <Button as={Link} className="w-full" to={ROUTES.checkout}>
                        Checkout
                    </Button>
                </Card>
            </Container>
        </>
    )
}