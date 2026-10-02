import { categories } from '../../data/homeData.js'
import CategoryCard from '../../components/CategoryCard.jsx'
import Container from '../../components/Container.jsx'
import Reveal from '../../components/Reveal.jsx'
import SectionTitle from '../../components/SectionTitle.jsx'

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            description="A small, useful world of products chosen for their ingredients, origins, and staying power."
            eyebrow="Browse by ritual"
            title="Find your everyday essentials."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal delay={index * 0.06} key={category.name}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
