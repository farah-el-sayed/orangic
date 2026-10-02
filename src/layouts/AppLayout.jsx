import { Outlet } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { AppProviders } from '../context/AppProviders.jsx'
import BackToTopButton from '../components/BackToTopButton.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import PageMetadata from '../components/PageMetadata.jsx'

export default function AppLayout() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  return (
    <AppProviders>
      <PageMetadata pathname={location.pathname} />
      <div className="flex min-h-svh flex-col">
        <ScrollToTop />
        <Navbar />
        <motion.main
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          key={location.pathname}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.main>
        <Footer />
        <BackToTopButton />
      </div>
    </AppProviders>
  )
}
