import Container from '../components/Container.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { categories } from '../data/homeData.js'

export default function CategoriesPage() {
  return (
    <>
      <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
        <Container>
          <SectionTitle
            as="h1"
            description="Explore pantry, body care, home, and wellness goods chosen for everyday rituals."
            eyebrow="Browse by ritual"
            title="Find what fits your everyday."
          />
        </Container>
      </section>
      <Container className="py-10 sm:py-14 lg:py-20">
        <div className="grid gap-5 xs:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.name} />
          ))}
        </div>
      </Container>
    </>
  )
}
