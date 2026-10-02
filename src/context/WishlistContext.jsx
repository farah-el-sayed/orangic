import { useCallback, useEffect, useMemo, useState } from 'react'
import { WishlistContext } from './contexts.js'
import { storage } from '../utils/storage.js'

const WISHLIST_STORAGE_KEY = 'orangic-wishlist'

function readWishlist() {
    try {
        const storedWishlist = storage.get(WISHLIST_STORAGE_KEY)
        const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : []
        return Array.isArray(parsedWishlist)
            ? parsedWishlist.filter(
                (item) =>
                    item &&
                    typeof item.id === 'string' &&
                    typeof item.name === 'string' &&
                    typeof item.slug === 'string' &&
                    Array.isArray(item.images) &&
                    item.images.length > 0,
            )
            : []
    } catch {
        return []
    }
}

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(readWishlist)

    useEffect(() => {
        storage.set(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
    }, [wishlist])

    const add = useCallback((product) => {
        if (!product?.id) return

        setWishlist((currentWishlist) =>
            currentWishlist.some((item) => item.id === product.id)
                ? currentWishlist
                : [...currentWishlist, product],
        )
    }, [])

    const remove = useCallback((productId) => {
        setWishlist((currentWishlist) =>
            currentWishlist.filter((item) => item.id !== productId),
        )
    }, [])

    const toggle = useCallback((product) => {
        if (!product?.id) return

        setWishlist((currentWishlist) =>
            currentWishlist.some((item) => item.id === product.id)
                ? currentWishlist.filter((item) => item.id !== product.id)
                : [...currentWishlist, product],
        )
    }, [])

    const value = useMemo(
        () => ({ wishlist, add, remove, toggle }),
        [add, remove, toggle, wishlist],
    )

    return (
        <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
    )
}
