import { Link, useParams } from 'react-router-dom'
import Container from '../components/Container.jsx'
import SafeImage from '../components/SafeImage.jsx'
import { ROUTES } from '../constants/routes.js'
import { journalPosts } from '../data/homeData.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function BlogDetailsPage() {
  const { slug } = useParams()
  const post = journalPosts.find((item) => item.slug === slug)

  if (!post) return <NotFoundPage />

  return (
    <Container className="py-10 sm:py-14 lg:py-20">
      <Link className="text-sm font-semibold text-forest-700 hover:text-clay-700" to={ROUTES.blog}>Back to journal</Link>
      <article className="mx-auto mt-8 max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-700">{post.category}</p>
        <h1 className="ds-heading mt-3 text-forest-950">{post.title}</h1>
        <p className="mt-4 text-sm text-ink-500">{post.date}</p>
        <div className="mt-8 aspect-[1.8] overflow-hidden rounded-lg bg-sage-50">
          <SafeImage alt="" className="size-full object-cover" decoding="async" src={post.image} />
        </div>
        <div className="mt-8 max-w-2xl text-base leading-8 text-ink-700">
          <p>Good rituals begin with attention. We choose fewer things, learn where they come from, and make room for products that support the way you actually live.</p>
          <p className="mt-5">This journal note is part of the Orangic edit: practical ideas for a more thoughtful everyday, without making everyday life feel complicated.</p>
        </div>
      </article>
    </Container>
  )
}