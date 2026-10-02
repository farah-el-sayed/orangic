import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function NavIconLink({ to, label, icon, onClick }) {
  return (
    <Link
      aria-label={label}
      className="group relative grid size-10 place-items-center rounded-full text-forest-800 transition hover:bg-forest-50 hover:text-forest-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
      onClick={onClick}
      title={label}
      to={to}
    >
      <Icon name={icon} />
    </Link>
  )
}
