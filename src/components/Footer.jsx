import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'
import Container from './Container.jsx'
import BrandMark from './BrandMark.jsx'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-forest-950 text-cream-100">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-16">
        <div className="grid content-start gap-4">
          <BrandMark light />
          <p className="max-w-xs text-sm leading-6 text-sage-200">
            Thoughtful everyday goods, grown and made with a lighter footprint.
          </p>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-sage-200">
            Explore
          </h2>
          <Link
            className="w-fit transition hover:text-cream-50"
            to={ROUTES.products}
          >
            Products
          </Link>
          <Link
            className="w-fit transition hover:text-cream-50"
            to={ROUTES.about}
          >
            Our story
          </Link>
          <Link
            className="w-fit transition hover:text-cream-50"
            to={ROUTES.blog}
          >
            Journal
          </Link>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-sage-200">
            Help
          </h2>
          <Link
            className="w-fit transition hover:text-cream-50"
            to={ROUTES.contact}
          >
            Contact us
          </Link>
          <Link
            className="w-fit transition hover:text-cream-50"
            to={ROUTES.account}
          >
            Your account
          </Link>
          <Link
            className="w-fit transition hover:text-cream-50"
            to={ROUTES.cart}
          >
            Cart
          </Link>
          <Link
            className="w-fit transition hover:text-cream-50"
            to={ROUTES.downloadApp}
          >
            Download the app
          </Link>
        </div>
      </Container>
      <div className="border-t border-forest-800">
        <Container className="py-5 text-xs text-sage-200">
          © 2026 Orangic. Made with care.
        </Container>
      </div>
    </footer>
  )
}
