import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import { catalog } from '../../data/catalog.js'
import Button from '../../components/Button.jsx'
import Container from '../../components/Container.jsx'
import ProductCard from '../../components/ProductCard.jsx'
import Reveal from '../../components/Reveal.jsx'
import SectionTitle from '../../components/SectionTitle.jsx'

export default function ProductSection({ bestSellers = false }) {
  const products = bestSellers ? catalog.slice(2, 6) : catalog.slice(0, 4)

  return (
    <section
      className={
        bestSellers
          ? 'bg-cream-200/60 py-16 sm:py-20 lg:py-28'
          : 'py-16 sm:py-20 lg:py-28'
      }
    >
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionTitle
              description={
                bestSellers
                  ? 'The pieces our community keeps coming back to, chosen for their quality and quiet usefulness.'
                  : 'Fresh finds and trusted staples for a more thoughtful everyday.'
              }
              eyebrow={bestSellers ? 'Loved by you' : 'A considered start'}
              title={
                bestSellers
                  ? 'The ones worth returning to.'
                  : 'Meet the current edit.'
              }
            />
            <Button as={Link} size="sm" to={ROUTES.products} variant="quiet">
              View all products →
            </Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 xs:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal delay={index * 0.06} key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
