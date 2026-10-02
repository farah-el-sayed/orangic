import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import Button from '../../components/Button.jsx'
import Container from '../../components/Container.jsx'
import SafeImage from '../../components/SafeImage.jsx'

export default function HeroSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="overflow-hidden border-b border-line bg-sage-50">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
        <motion.div
          className="relative z-10 max-w-xl"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="ds-caption mb-5 font-bold uppercase tracking-[0.2em] text-clay-700">
            Better things for everyday living
          </p>
          <h1 className="ds-display max-w-2xl text-forest-950">
            Goodness, grown <span className="text-forest-700">closer.</span>
          </h1>
          <p className="ds-body mt-6 max-w-lg text-lg">
            A considered collection of organic pantry staples, body care, and
            home goods made to bring a little more intention to your day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button as={Link} size="lg" to={ROUTES.products}>
              Shop the collection
            </Button>
            <Button as={Link} size="lg" to={ROUTES.about} variant="secondary">
              Our approach
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
            <span>Small-batch</span>
            <span>Traceable</span>
            <span>Low-waste</span>
          </div>
        </motion.div>
        <motion.div
          className="relative mx-auto w-full max-w-xl"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.08, ease: 'easeOut' }}
        >
          <div className="absolute -inset-4 rounded-[2rem] border border-sage-200/70 sm:-inset-8" />
          <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.5rem] bg-forest-800 sm:aspect-[4/4]">
            <SafeImage
              alt="Fresh organic produce arranged on a wooden table"
              className="size-full object-cover"
              decoding="async"
              fetchPriority="high"
              loading="eager"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/45 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-md bg-cream-50/90 px-4 py-3 backdrop-blur sm:bottom-7 sm:left-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-clay-700">
                The good edit
              </p>
              <p className="mt-1 font-display text-xl text-forest-950">
                For a softer daily rhythm.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
