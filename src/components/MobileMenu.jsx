import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'
import { navigationItems } from '../constants/navigation.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'

export default function MobileMenu({ open, onClose }) {
  const reducedMotion = useReducedMotion()
  const menuRef = useRef(null)
  const closeButtonRef = useRef(null)
  useFocusTrap(open, menuRef, closeButtonRef)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 cursor-default bg-forest-950/30 backdrop-blur-[2px] lg:hidden"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.aside
            aria-label="Mobile navigation"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-cream-50 p-6 shadow-lifted lg:hidden"
            initial={reducedMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: '100%' }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
            role="dialog"
            ref={menuRef}
          >
            <div className="flex items-center justify-between border-b border-line pb-5">
              <h2 className="font-display text-xl font-semibold text-forest-950" id="mobile-menu-title">
                Menu
              </h2>
              <button
                aria-label="Close navigation menu"
                className="grid size-10 place-items-center rounded-full text-forest-800 transition hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
                onClick={onClose}
                ref={closeButtonRef}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>
            <motion.nav
              animate="show"
              aria-label="Mobile links"
              className="grid gap-1 py-6"
              initial="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reducedMotion ? 0 : 0.035 } },
              }}
            >
              {navigationItems.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{
                    hidden: reducedMotion ? {} : { opacity: 0, x: 8 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <NavLink
                  className={({ isActive }) =>
                    `rounded-md px-3 py-3 text-lg transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100 ${isActive ? 'bg-forest-50 font-semibold text-forest-900' : 'text-ink-700 hover:bg-cream-200 hover:text-forest-900'}`
                  }
                  onClick={onClose}
                  to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
            <Link
              className="mt-auto inline-flex items-center justify-between rounded-md bg-forest-800 px-4 py-3 text-sm font-semibold text-cream-50 transition hover:bg-forest-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
              onClick={onClose}
              to="/categories"
            >
              Browse categories <Icon name="arrowRight" size={18} />
            </Link>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
