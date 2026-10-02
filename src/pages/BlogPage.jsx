import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'
import Container from '../components/Container.jsx'
import SafeImage from '../components/SafeImage.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { journalPosts } from '../data/homeData.js'

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
        <Container>
          <SectionTitle
            as="h1"
            description="Notes on living well, making better choices, and the people behind the things we bring home."
            eyebrow="The journal"
            title="Small stories, good ideas."
          />
        </Container>
      </section>
      <Container className="py-10 sm:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {journalPosts.map((post) => (
            <article className="group" key={post.slug}>
              <Link className="block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100" to={`${ROUTES.blog}/${post.slug}`}>
                <div className="aspect-[1.35] overflow-hidden rounded-lg bg-sage-50">
                  <SafeImage alt="" className="size-full object-cover transition duration-700 group-hover:scale-105" decoding="async" loading="lazy" src={post.image} />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-clay-700">{post.category}</p>
                <h2 className="mt-2 font-display text-2xl leading-tight text-forest-950 group-hover:text-forest-700">{post.title}</h2>
                <p className="mt-3 text-xs text-ink-500">{post.date}</p>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </>
  )
}