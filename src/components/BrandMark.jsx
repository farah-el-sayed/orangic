import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'

export default function BrandMark({ onClick, light = false }) {
  return (
    <Link
      aria-label="Orangic home"
      className={`group inline-flex items-center gap-2 ${light ? 'text-cream-50' : 'text-forest-950'}`}
      onClick={onClick}
      to={ROUTES.home}
    >
      
     <span className="font-display text-xl font-semibold tracking-tight max-[30rem]:hidden text-stone-700">
  ORGANICA
</span>


    </Link>
  )
}
