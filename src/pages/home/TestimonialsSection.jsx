import { testimonials } from '../../data/homeData.js'
import Container from '../../components/Container.jsx'
import Reveal from '../../components/Reveal.jsx'
import SectionTitle from '../../components/SectionTitle.jsx'

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Kind words"
            title="Good things, shared."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal delay={index * 0.06} key={testimonial.name}>
              <figure className="flex h-full flex-col justify-between rounded-lg border border-line bg-cream-50 p-6 shadow-soft sm:p-8">
                <div>
                  <div
                    className="text-lg tracking-[0.18em] text-amber-500"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </div>
                  <blockquote className="mt-6 font-display text-2xl leading-tight text-forest-950">
                    “{testimonial.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-8 border-t border-line pt-4 text-sm">
                  <span className="font-semibold text-forest-900">
                    {testimonial.name}
                  </span>
                  <span className="ml-2 text-ink-500">
                    {testimonial.detail}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
