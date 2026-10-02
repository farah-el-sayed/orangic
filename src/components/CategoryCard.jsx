import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'
import Icon from './Icon.jsx'
import SafeImage from './SafeImage.jsx'

export default function CategoryCard({ category }) {
  return (
    <Link
      className="group relative isolate block min-h-64 overflow-hidden rounded-lg bg-forest-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200 sm:min-h-72"
      to={`${ROUTES.products}?category=${encodeURIComponent(category.filterCategory || category.name)}`}
    >
      <SafeImage
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover transition duration-700 group-hover:scale-105"
        decoding="async"
        loading="lazy"
        src={category.image}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950/85 via-forest-950/15 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-cream-50">
        <div>
          <h3 className="font-display text-2xl leading-tight">
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-sage-200">{category.count}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-50/15 backdrop-blur transition group-hover:bg-cream-50 group-hover:text-forest-900">
          <Icon name="arrowRight" size={18} />
        </span>
      </div>
    </Link>
  )
}
