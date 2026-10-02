import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import Container from '../components/Container.jsx'
import Input from '../components/Input.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SafeImage from '../components/SafeImage.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { ROUTES } from '../constants/routes.js'
import { products } from '../data/products.js'
import { useDebouncedValue } from '../hooks/useDebouncedValue.js'

const SUGGESTION_LIMIT = 5

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`
}

export default function SearchPage() {
  const reducedMotion = useReducedMotion()
  const dropdownId = useId()
  const searchBoxRef = useRef(null)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const debouncedQuery = useDebouncedValue(query)

  const results = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase()
    if (!normalizedQuery) return products

    return products.filter((product) =>
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [debouncedQuery])

  const suggestions = results.slice(0, SUGGESTION_LIMIT)
  const hasQuery = debouncedQuery.trim().length > 0
  const showDropdown = focused && hasQuery

  useEffect(() => {
    if (!showDropdown) return

    const handlePointerDown = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setFocused(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setFocused(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showDropdown])

  const viewAllResults = () => {
    setFocused(false)
    document.getElementById('search-results')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
        <Container>
          <SectionTitle
            as="h1"
            description="Search our considered collection of pantry, wellness, body care, and home goods."
            eyebrow="Find your next ritual"
            title="Search the collection."
          />
          <div className="relative mt-8 max-w-xl" ref={searchBoxRef}>
            <Input
              aria-autocomplete="list"
              aria-controls={showDropdown ? dropdownId : undefined}
              aria-expanded={showDropdown}
              aria-label="Search the collection"
              label="Search"
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Try honey, tea, or pantry..."
              role="combobox"
              type="search"
              value={query}
            />
            {showDropdown && (
              <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-line bg-cream-50 shadow-lifted">
                <div id={dropdownId} role="listbox">
                  {suggestions.length > 0 ? (
                    <>
                      <ul className="max-h-80 overflow-y-auto py-2">
                        {suggestions.map((product) => (
                          <li key={product.id}>
                            <Link
                              className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-forest-50 focus-visible:bg-forest-50 focus-visible:outline-none"
                              onClick={() => setFocused(false)}
                              role="option"
                              to={`${ROUTES.products}/${product.slug}`}
                            >
                              <span className="size-12 shrink-0 overflow-hidden rounded-md bg-sage-50">
                                <SafeImage
                                  alt={product.name}
                                  className="size-full object-cover"
                                  loading="lazy"
                                  src={product.images[0]}
                                />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold text-ink-900">
                                  {product.name}
                                </span>
                                <span className="block text-xs text-ink-500">
                                  {product.category}
                                </span>
                              </span>
                              <span className="ml-3 shrink-0 font-semibold text-forest-900">
                                {formatMoney(product.price)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-line p-2">
                        <button
                          className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-forest-700 transition hover:bg-forest-50 hover:text-clay-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
                          onClick={viewAllResults}
                          type="button"
                        >
                          View all results ({results.length}) →
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="px-4 py-4 text-sm text-ink-700">
                      No products match “{debouncedQuery}”.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
      <Container className="py-10 sm:py-14" id="search-results">
        <p className="mb-7 text-sm text-ink-700">
          <strong className="text-forest-900">{results.length}</strong> results
        </p>
        <ProductGrid
          emptyMessage={`No products match “${debouncedQuery}”. Try another search.`}
          products={results}
        />
      </Container>
    </>
  )
}