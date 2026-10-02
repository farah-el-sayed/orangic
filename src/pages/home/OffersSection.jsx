import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import Button from '../../components/Button.jsx'
import Container from '../../components/Container.jsx'
import Reveal from '../../components/Reveal.jsx'

export default function OffersSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-xl bg-clay-100 px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="absolute -right-12 -top-20 -z-10 size-64 rounded-full border-[3rem] border-cream-50/60 sm:-right-5 sm:-top-28 sm:size-96" />
            <div className="max-w-xl">
              <p className="ds-caption font-bold uppercase tracking-[0.18em] text-clay-700">
                A little welcome
              </p>
              <h2 className="ds-heading mt-3 text-forest-950">
                Start with 15% off your first ritual.
              </h2>
              <p className="ds-body mt-4 max-w-md">
                Build a better everyday with a welcome edit of pantry, body, and
                home essentials.
              </p>
              <Button as={Link} className="mt-7" to={ROUTES.products}>
                Explore the offer
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
