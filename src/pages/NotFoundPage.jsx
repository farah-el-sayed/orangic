import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ROUTES } from '../constants/routes.js'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import PageMetadata from '../components/PageMetadata.jsx'
import { useLocation } from 'react-router-dom'

export default function NotFoundPage() {
  const reducedMotion = useReducedMotion()
  const { pathname } = useLocation()

  return (
    <>
    <PageMetadata pathname={pathname} />
    <Container className="py-16 sm:py-24">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
      <Card className="mx-auto grid max-w-2xl place-items-center gap-4 bg-sage-50 px-6 py-16 text-center sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay-700">
          404
        </p>
        <h1 className="ds-heading text-forest-950">This product has moved on.</h1>
        <p className="max-w-md leading-7 text-ink-700">
          We could not find what you were looking for, but there are plenty of
          considered goods waiting in the collection.
        </p>
        <Button as={Link} to={ROUTES.products}>
          Browse products
        </Button>
      </Card>
      </motion.div>
    </Container>
    </>
  )
}
