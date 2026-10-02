import { useEffect, useRef } from 'react'

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(active, containerRef, initialFocusRef) {
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!active) return undefined

    previousFocusRef.current = document.activeElement
    const container = containerRef.current
    if (!container) return undefined

    const initialFocus = initialFocusRef?.current || container.querySelector(focusableSelector)
    initialFocus?.focus()

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return

      const focusable = [...container.querySelectorAll(focusableSelector)]
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current instanceof HTMLElement) previousFocusRef.current.focus()
    }
  }, [active, containerRef, initialFocusRef])
}