import { useLocation } from 'react-router-dom'
import Container from '../components/Container.jsx'

export default function RoutePlaceholder() {
  const { pathname } = useLocation()
  const title = pathname.slice(1).replace('-', ' ') || 'home'

  return (
    <Container className="grid min-h-[40vh] place-items-center py-20 text-center">
      <div>
        <p className="ds-caption uppercase">Orangic</p>
        <h1 className="ds-heading mt-3 capitalize">{title} is coming soon</h1>
      </div>
    </Container>
  )
}
