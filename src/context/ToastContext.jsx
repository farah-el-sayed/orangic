import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ToastContext } from './contexts.js'

let nextToastId = 0

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])
    const reducedMotion = useReducedMotion()

    const dismissToast = useCallback((toastId) => {
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== toastId),
        )
    }, [])

    const showToast = useCallback((message, variant = 'success') => {
        const id = nextToastId++
        setToasts((currentToasts) => [
            ...currentToasts,
            { id, message, variant, duration: 3200 },
        ])
    }, [])

    useEffect(() => {
        const timers = toasts.map((toast) =>
            window.setTimeout(() => dismissToast(toast.id), toast.duration),
        )

        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [dismissToast, toasts])

    const value = useMemo(
        () => ({ showToast, dismissToast }),
        [dismissToast, showToast],
    )

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                aria-live="polite"
                className="pointer-events-none fixed inset-x-4 bottom-5 z-50 grid justify-items-center gap-2.5 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-96 sm:justify-items-end"
            >
                <AnimatePresence initial={false}>
                    {toasts.map((toast) => (
                        <motion.div
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`pointer-events-auto flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lifted backdrop-blur-md ${toast.variant === 'error' ? 'border-danger-700/40 bg-danger-100/95 text-danger-700' : 'border-forest-100 bg-forest-950/95 text-cream-50'}`}
                            exit={reducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.97 }}
                            initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
                            key={toast.id}
                            layout
                            role="status"
                            transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
                        >
                            <span
                                aria-hidden="true"
                                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${toast.variant === 'error' ? 'bg-danger-700/15' : 'bg-sage-200/25'}`}
                            >
                                {toast.variant === 'error' ? '!' : '✓'}
                            </span>
                            <span className="min-w-0 flex-1 leading-6">{toast.message}</span>
                            <button
                                aria-label="Dismiss notification"
                                className="grid size-6 shrink-0 place-items-center rounded-full text-current opacity-60 transition hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-200"
                                onClick={() => dismissToast(toast.id)}
                                type="button"
                            >
                                ×
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}