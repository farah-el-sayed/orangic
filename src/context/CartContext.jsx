import { useCallback, useEffect, useMemo, useState } from 'react'
import { CartContext } from './contexts.js'
import { storage } from '../utils/storage.js'

const CART_STORAGE_KEY = 'orangic-cart'
const DEFAULT_SHIPPING = 6
const FREE_SHIPPING_THRESHOLD = 50

function readCart() {
    try {
        const storedCart = storage.get(CART_STORAGE_KEY)
        const parsedCart = storedCart ? JSON.parse(storedCart) : []
        return Array.isArray(parsedCart)
            ? parsedCart.filter((item) =>
                item &&
                typeof item.id === 'string' &&
                typeof item.name === 'string' &&
                Number.isFinite(item.price) &&
                typeof item.slug === 'string' &&
                Array.isArray(item.images) &&
                item.images.length > 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0,
            )
            : []
    } catch {
        return []
    }
}

function availableQuantity(item) {
    return Number.isFinite(item.stock) && item.stock > 0 ? item.stock : 0
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(readCart)

    useEffect(() => {
        storage.set(CART_STORAGE_KEY, JSON.stringify(cart))
    }, [cart])

    const addToCart = useCallback((product, quantity = 1) => {
        if (
            !product?.id ||
            !product.slug ||
            !Array.isArray(product.images) ||
            !product.images.length ||
            !Number.isFinite(product.price) ||
            (Number.isFinite(product.stock) && product.stock <= 0) ||
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) return

        setCart((currentCart) => {
            const existingItem = currentCart.find((item) => item.id === product.id)

            if (existingItem) {
                const stockLimit = availableQuantity(existingItem)
                const nextQuantity = stockLimit
                    ? Math.min(existingItem.quantity + quantity, stockLimit)
                    : existingItem.quantity + quantity

                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: nextQuantity }
                        : item,
                )
            }

            return [...currentCart, { ...product, quantity }]
        })
    }, [])

    const removeFromCart = useCallback((productId) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== productId),
        )
    }, [])

    const increaseQuantity = useCallback((productId) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId &&
                (!Number.isFinite(item.stock) || item.stock > 0) &&
                (!Number.isFinite(item.stock) || item.quantity < item.stock)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            ),
        )
    }, [])

    const decreaseQuantity = useCallback((productId) => {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
                )
                .filter((item) => item.quantity > 0),
        )
    }, [])

    const clearCart = useCallback(() => setCart([]), [])

    const totals = useMemo(() => {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
        const subtotal = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        )
        const discount = cart.reduce(
            (total, item) =>
                total + item.price * item.quantity * ((item.discount || 0) / 100),
            0,
        )
        const shipping =
            subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
                ? 0
                : DEFAULT_SHIPPING

        return {
            cartCount,
            subtotal,
            shipping,
            discount,
            grandTotal: subtotal - discount + shipping,
        }
    }, [cart])

    const value = useMemo(
        () => ({
            cart,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            ...totals,
        }),
        [
            addToCart,
            cart,
            clearCart,
            decreaseQuantity,
            increaseQuantity,
            removeFromCart,
            totals,
        ],
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
