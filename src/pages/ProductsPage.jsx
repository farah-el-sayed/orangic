import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import ProductFilters from '../components/ProductFilters.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { products } from '../data/products.js'
import { useDebouncedValue } from '../hooks/useDebouncedValue.js'

const initialFilters = {
  search: '',
  category: 'All categories',
  price: 'all',
  rating: 'all',
  availability: 'all',
  sort: 'popular',
}

const LIMIT = 4

function getInitialFilters(searchParams) {
  const category = searchParams.get('category')
  return {
    ...initialFilters,
    category: category || initialFilters.category,
  }
}

function matchesPrice(product, range) {
  if (range === 'under-20') return product.price < 20
  if (range === '20-30') return product.price >= 20 && product.price <= 30
  if (range === 'over-30') return product.price > 30
  return true
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => getInitialFilters(searchParams))
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(LIMIT)
  const debouncedSearch = useDebouncedValue(filters.search)
  const { availability, category, price, rating, sort } = filters
  const filterCriteria = useMemo(
    () => ({ availability, category, price, rating, search: debouncedSearch, sort }),
    [
      availability,
      category,
      debouncedSearch,
      price,
      rating,
      sort,
    ],
  )

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch =
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase())
      const matchesCategory =
        filterCriteria.category === 'All categories' ||
        product.category === filterCriteria.category
      const matchesRating =
        filterCriteria.rating === 'all' || product.rating >= Number(filterCriteria.rating)
      const matchesAvailability =
        filterCriteria.availability === 'all' ||
        (filterCriteria.availability === 'in-stock'
          ? product.stock > 0
          : product.isOrganic)
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice(product, filterCriteria.price) &&
        matchesRating &&
        matchesAvailability
      )
    })

    return [...result].sort((a, b) => {
      if (filterCriteria.sort === 'price-low') return a.price - b.price
      if (filterCriteria.sort === 'price-high') return b.price - a.price
      if (filterCriteria.sort === 'newest')
        return new Date(b.createdAt) - new Date(a.createdAt)
      if (filterCriteria.sort === 'rated') return b.rating - a.rating
      return b.reviews - a.reviews
    })
  }, [filterCriteria])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  const activeFilterLabels = useMemo(() => {
    const labels = []
    if (filters.search) labels.push({ key: 'search', label: `“${filters.search}”` })
    if (filters.category !== initialFilters.category)
      labels.push({ key: 'category', label: filters.category })
    if (filters.price !== 'all') {
      const priceLabels = {
        'under-20': 'Under $20',
        '20-30': '$20 – $30',
        'over-30': 'Over $30',
      }
      labels.push({ key: 'price', label: priceLabels[filters.price] })
    }
    if (filters.rating !== 'all')
      labels.push({ key: 'rating', label: `${filters.rating}★ & up` })
    if (filters.availability !== 'all')
      labels.push({
        key: 'availability',
        label: filters.availability === 'in-stock' ? 'In stock' : 'Organic only',
      })
    return labels
  }, [filters])

  // Reset the visible amount whenever the active filters/sort change.
  const [prevFilterCriteria, setPrevFilterCriteria] = useState(filterCriteria)
  if (filterCriteria !== prevFilterCriteria) {
    setPrevFilterCriteria(filterCriteria)
    setVisibleCount(LIMIT)
  }

  const clearFilters = () => {
    setFilters(initialFilters)
    if (searchParams.has('category')) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('category')
      setSearchParams(nextParams, { replace: true })
    }
  }

  const clearSingle = (key) => updateFilter(key, initialFilters[key])

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))

    if (key === 'category') {
      const nextParams = new URLSearchParams(searchParams)
      if (value === 'All categories') nextParams.delete('category')
      else nextParams.set('category', value)
      setSearchParams(nextParams, { replace: true })
    }
  }

  return (
    <>
      <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
        <Container>
          <SectionTitle
            description="Small-batch pantry, body, home, and wellness goods chosen with intention."
            eyebrow="The collection"
            title="Products for a better everyday."
            as="h1"
          />
        </Container>
      </section>
      <Container className="py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-700">
            <strong className="text-forest-900">
              {visibleProducts.length}
            </strong>{' '}
            of{' '}
            <strong className="text-forest-900">
              {filteredProducts.length}
            </strong>{' '}
            products
          </p>
          <div className="flex w-full gap-3 sm:w-auto">
            <Button
              className="flex-1 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
              variant="secondary"
            >
              Filters
            </Button>
            <label className="flex flex-1 items-center gap-2 text-sm font-medium text-ink-700 sm:flex-none">
              <span className="sr-only">Sort products</span>
              <select
                className="min-h-11 w-full rounded-md border border-line bg-cream-50 px-3 text-sm outline-none focus:ring-4 focus:ring-sage-100 sm:w-52"
                onChange={(event) => updateFilter('sort', event.target.value)}
                value={filters.sort}
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price Low to High</option>
                <option value="price-high">Price High to Low</option>
                <option value="newest">Newest</option>
                <option value="rated">Best Rated</option>
              </select>
            </label>
          </div>
        </div>
        {activeFilterLabels.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {activeFilterLabels.map((label) => (
              <button
                aria-label={`Remove ${label.label} filter`}
                className="inline-flex items-center gap-2 rounded-full border border-forest-100 bg-forest-50 px-3 py-1.5 text-xs font-medium text-forest-900 transition hover:border-forest-700 hover:text-clay-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200"
                key={label.key}
                onClick={() => clearSingle(label.key)}
                type="button"
              >
                {label.label}
                <span aria-hidden="true">×</span>
              </button>
            ))}
            <Button onClick={clearFilters} size="sm" variant="quiet">
              Clear all
            </Button>
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <ProductFilters
            filters={filters}
            hasActiveFilters={activeFilterLabels.length > 0}
            onChange={updateFilter}
            onClear={clearFilters}
            onClose={() => setMobileFiltersOpen(false)}
            open={mobileFiltersOpen}
          />
          <div>
            <ProductGrid products={visibleProducts} />
            {visibleCount < filteredProducts.length && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => setVisibleCount((current) => current + LIMIT)}
                  variant="secondary"
                >
                  Load more products
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
