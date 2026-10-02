import Container from '../components/Container.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import { benefits } from '../data/homeData.js'

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
        <Container>
          <SectionTitle
            as="h1"
            description="Orangic brings together useful, beautiful goods chosen with care for their ingredients, origins, and staying power."
            eyebrow="Our approach"
            title="A softer way to shop for everyday life."
          />
        </Container>
      </section>
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:py-24">
        <Reveal>
          <div>
            <p className="ds-caption font-bold uppercase tracking-[0.18em] text-clay-700">The Orangic edit</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-forest-950 sm:text-4xl">Small choices can shape a better daily rhythm.</h2>
            <p className="ds-body mt-6">We look closely at what goes into a product, how it gets to you, and whether it will still feel good in a year. The collection stays intentionally small so every item has a reason to be here.</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-lg bg-forest-900 p-6 text-cream-50 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-200">Our promise</p>
            <p className="mt-5 font-display text-3xl leading-tight">Useful things, thoughtfully sourced, made to last.</p>
          </div>
        </Reveal>
      </Container>
      <section className="bg-cream-200/60 py-12 sm:py-16">
        <Container>
          <SectionTitle title="What guides the collection." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article className="rounded-lg border border-line bg-cream-50 p-6 shadow-soft" key={benefit.number}>
                <span className="text-sm font-semibold text-clay-700">{benefit.number}</span>
                <h2 className="mt-8 font-display text-2xl text-forest-950">{benefit.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-700">{benefit.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
