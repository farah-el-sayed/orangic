import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Icon from './Icon.jsx'

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 480)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.button
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-20 grid size-11 place-items-center rounded-full bg-forest-800 text-cream-50 shadow-lifted transition hover:bg-forest-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200"
      initial={false}
      animate={
        reducedMotion
          ? { opacity: visible ? 1 : 0 }
          : {
              opacity: visible ? 1 : 0,
              y: visible ? 0 : 12,
              scale: visible ? 1 : 0.9,
            }
      }
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? 'auto' : 'smooth',
        })
      }
      type="button"
    >
      <Icon name="arrowUp" />
    </motion.button>
  )
}
