import { CartProvider } from './CartContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { ToastProvider } from './ToastContext.jsx'
import { WishlistProvider } from './WishlistContext.jsx'

export function AppProviders({ children }) {
    return (
        <ThemeProvider>
            <ToastProvider>
                <WishlistProvider>
                    <CartProvider>{children}</CartProvider>
                </WishlistProvider>
            </ToastProvider>
        </ThemeProvider>
    )
}
