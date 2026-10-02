import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import { journalPosts } from '../../data/homeData.js'
import Container from '../../components/Container.jsx'
import Reveal from '../../components/Reveal.jsx'
import SectionTitle from '../../components/SectionTitle.jsx'
import SafeImage from '../../components/SafeImage.jsx'

export default function BlogPreviewSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionTitle
              description="Notes on living well, making better choices, and the people behind the things we bring home."
              eyebrow="From the journal"
              title="Small stories, good ideas."
            />
            <Link
              className="text-sm font-semibold text-forest-800 underline decoration-sage-200 decoration-2 underline-offset-4 transition hover:text-clay-700"
              to={ROUTES.blog}
            >
              Read the journal
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {journalPosts.map((post, index) => (
            <Reveal delay={index * 0.06} key={post.title}>
              <Link
                className="group block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
                to={ROUTES.blog}
              >
                <div className="aspect-[1.35] overflow-hidden rounded-lg bg-sage-50">
                  <SafeImage
                    alt=""
                    className="size-full object-cover transition duration-700 group-hover:scale-105"
                    decoding="async"
                    loading="lazy"
                    src={post.image}
                  />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-clay-700">
                  {post.category}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight text-forest-950 group-hover:text-forest-700">
                  {post.title}
                </h3>
                <p className="mt-3 text-xs text-ink-500">{post.date}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
