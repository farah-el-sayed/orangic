import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'
import { navigationItems } from '../constants/navigation.js'
import BrandMark from './BrandMark.jsx'
import Icon from './Icon.jsx'
import MobileMenu from './MobileMenu.jsx'
import NavIconLink from './NavIconLink.jsx'
import Container from './Container.jsx'
import { useTheme } from '../hooks/useTheme.js'

function navigationClass({ isActive }) {
  return `relative py-2 text-sm transition after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-clay-700 after:transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100 ${isActive ? 'font-semibold text-forest-900 after:scale-x-100' : 'text-ink-700 after:scale-x-0 hover:text-forest-900 hover:after:scale-x-100'}`
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [menuOpen])

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 border-b border-line/80 bg-cream-50/95 backdrop-blur-md"
      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 max-[30rem]:gap-2 max-[30rem]:px-3">
        <BrandMark onClick={() => setMenuOpen(false)} />
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary navigation"
        >
          <NavLink className={navigationClass} end to={ROUTES.categories}>
            Categories
          </NavLink>
          {navigationItems.map((item) => (
            <NavLink
              className={navigationClass}
              end={item.to === ROUTES.home}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-1 lg:flex">
          <button
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid size-10 place-items-center rounded-full text-forest-800 transition hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
            onClick={toggleTheme}
            type="button"
          >
            <Icon name={isDark ? 'sun' : 'moon'} size={18} />
          </button>
          <NavIconLink icon="search" label="Search" to={ROUTES.search} />
          <NavIconLink icon="heart" label="Wishlist" to={ROUTES.wishlist} />
          <NavIconLink icon="cart" label="Cart" to={ROUTES.cart} />
          <NavIconLink icon="user" label="Account" to={ROUTES.account} />
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <NavIconLink icon="cart" label="Cart" to={ROUTES.cart} />
          <span className="max-[30rem]:hidden">
            <NavIconLink icon="heart" label="Wishlist" to={ROUTES.wishlist} />
          </span>
          <button
            aria-expanded={menuOpen}
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="grid size-10 place-items-center rounded-full text-forest-800 transition hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
          <button
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid size-10 place-items-center rounded-full text-forest-800 transition hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
            onClick={toggleTheme}
            type="button"
          >
            <Icon name={isDark ? 'sun' : 'moon'} size={18} />
          </button>
        </div>
      </Container>
      <MobileMenu onClose={() => setMenuOpen(false)} open={menuOpen} />
    </motion.header>
  )
}
