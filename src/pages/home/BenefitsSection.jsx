import { benefits } from '../../data/homeData.js'
import Container from '../../components/Container.jsx'
import Reveal from '../../components/Reveal.jsx'
import SectionTitle from '../../components/SectionTitle.jsx'

export default function BenefitsSection() {
  return (
    <section className="bg-forest-900 py-16 text-cream-50 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            className="max-w-xl"
            description="We look closely at what goes into a product, how it gets to you, and whether it will still feel good in a year."
            eyebrow="Why Orangic"
            title="The better choice is in the details."
            light
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-forest-700 bg-forest-700 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal
              className="bg-forest-900 p-6 sm:p-8"
              delay={index * 0.06}
              key={benefit.number}
            >
              <span className="text-sm font-semibold text-sage-200">
                {benefit.number}
              </span>
              <h3 className="mt-10 font-display text-2xl text-cream-50">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-sage-200">
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
