import { useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [pathname, reducedMotion])

  return null
}
