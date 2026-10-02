import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'
import Badge from './Badge.jsx'
import Button from './Button.jsx'
import Container from './Container.jsx'
import Rating from './Rating.jsx'

// Deterministic star distribution that stays consistent with the product average.
function ratingDistribution(rating) {
  const weights = [1, 2, 3, 4, 5].map((star) =>
    Math.max(0.05, Math.pow(0.55, Math.abs(rating - star)) * 100),
  )
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  const percents = weights.map((weight) => Math.round((weight / total) * 100))
  // Adjust the largest bucket so the bars always add up to exactly 100%.
  const diff = 100 - percents.reduce((sum, percent) => sum + percent, 0)
  const largestIndex = percents.indexOf(Math.max(...percents))
  percents[largestIndex] += diff

  return [5, 4, 3, 2, 1].map((star, index) => ({
    star,
    percent: percents[index],
  }))
}

function firstInitial(name) {
  return (name || '?').trim().charAt(0).toUpperCase()
}

export default function Reviews({ product }) {
  const reviewCount = Number(product.reviews) || 0
  const average = Number(product.rating) || 0
  const reviews = Array.isArray(product.userReviews) ? product.userReviews : []
  const distribution = useMemo(() => ratingDistribution(average), [average])

  return (
    <section className="border-y border-line bg-cream-100 py-12 sm:py-16" id="reviews">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
                Customer reviews
              </p>
              <h2 className="mt-2 font-display text-3xl text-forest-950">
                Ratings &amp; reviews
              </h2>
            </div>
            <Button as={Link} size="sm" to={ROUTES.contact} variant="secondary">
              Write a review
            </Button>
          </div>

          <div className="mt-8 grid gap-6 rounded-lg border border-line bg-cream-50 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-6">
            <div className="text-center sm:w-24">
              <p className="font-display text-5xl text-forest-950">
                {average.toFixed(1)}
              </p>
              <Rating
                className="mt-1 justify-center"
                compact
                showValue={false}
                value={average}
              />
              <p className="mt-2 text-xs text-ink-500">{reviewCount} reviews</p>
            </div>
            <dl className="mt-4 grid content-center gap-2.5 sm:mt-0">
              {distribution.map(({ percent, star }) => (
                <div className="flex items-center gap-3" key={star}>
                  <dt className="w-12 text-right text-sm font-medium text-ink-700">
                    {star} ★
                  </dt>
                  <div
                    aria-hidden="true"
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
                  >
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <dd className="w-10 text-right text-xs font-medium text-ink-500">
                    {percent}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                className="flex flex-col rounded-md border border-line bg-cream-50 p-5"
                key={review.id}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-sage-100 text-sm font-bold text-forest-800"
                  >
                    {firstInitial(review.author)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">
                      {review.author}
                    </p>
                    <p className="text-xs text-ink-500">{review.date}</p>
                  </div>
                </div>
                <Rating
                  className="mt-3"
                  compact
                  showValue={false}
                  value={review.rating}
                />
                <h3 className="mt-2 font-sans text-sm font-bold text-forest-900">
                  {review.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-ink-700">
                  {review.comment}
                </p>
                {review.verified && (
                  <Badge className="mt-4 w-fit" variant="success">
                    Verified buyer
                  </Badge>
                )}
              </article>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-lg bg-sage-50 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
            The details
          </p>
          <p className="mt-3 text-sm leading-7 text-ink-700">
            {product.description}
          </p>
          <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-ink-500">Category</dt>
              <dd className="font-medium text-forest-900">{product.category}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-500">Average</dt>
              <dd className="font-medium text-forest-900">
                {average.toFixed(1)} / 5
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-500">Condition</dt>
              <dd className="font-medium text-forest-900">New</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-500">Delivery</dt>
              <dd className="font-medium text-forest-900">1–2 days</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </section>
  )
}