import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { products } from '../data/products.js'
import Button from './Button.jsx'
import Input from './Input.jsx'
import { useFocusTrap } from '../hooks/useFocusTrap.js'

const categories = [
  'All categories',
  ...new Set(products.map((product) => product.category)),
]

function FilterFields({ filters, onChange }) {
  return (
    <div className="grid gap-5">
      <Input
        aria-label="Search products"
        label="Search"
        onChange={(event) => onChange('search', event.target.value)}
        placeholder="Search products"
        type="search"
        value={filters.search}
      />
      <label className="grid gap-2 text-sm font-medium text-ink-900">
        Category
        <select
          aria-label="Category"
          className="min-h-11 rounded-md border border-line bg-cream-50 px-3 text-sm outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-sage-100"
          onChange={(event) => onChange('category', event.target.value)}
          value={filters.category}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink-900">
        Price
        <select
          aria-label="Price range"
          className="min-h-11 rounded-md border border-line bg-cream-50 px-3 text-sm outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-sage-100"
          onChange={(event) => onChange('price', event.target.value)}
          value={filters.price}
        >
          <option value="all">All prices</option>
          <option value="under-20">Under $20</option>
          <option value="20-30">$20 – $30</option>
          <option value="over-30">Over $30</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink-900">
        Rating
        <select
          aria-label="Minimum rating"
          className="min-h-11 rounded-md border border-line bg-cream-50 px-3 text-sm outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-sage-100"
          onChange={(event) => onChange('rating', event.target.value)}
          value={filters.rating}
        >
          <option value="all">Any rating</option>
          <option value="4">4+ stars</option>
          <option value="4.5">4.5+ stars</option>
          <option value="4.8">4.8+ stars</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink-900">
        Availability
        <select
          aria-label="Availability"
          className="min-h-11 rounded-md border border-line bg-cream-50 px-3 text-sm outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-sage-100"
          onChange={(event) => onChange('availability', event.target.value)}
          value={filters.availability}
        >
          <option value="all">All products</option>
          <option value="in-stock">In stock</option>
          <option value="organic">Organic only</option>
        </select>
      </label>
    </div>
  )
}

export default function ProductFilters({
  filters,
  onChange,
  open,
  onClose,
  onClear,
  hasActiveFilters,
}) {
  const reducedMotion = useReducedMotion()
  const filtersRef = useRef(null)
  const closeButtonRef = useRef(null)
  useFocusTrap(open, filtersRef, closeButtonRef)
  return (
    <>
      <aside className="hidden rounded-lg border border-line bg-cream-50 p-5 lg:block">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl text-forest-950">
            Refine your edit
          </h2>
          {hasActiveFilters && (
            <button
              className="text-sm font-medium text-forest-700 hover:text-clay-700"
              onClick={onClear}
              type="button"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="mt-5">
          <FilterFields filters={filters} onChange={onChange} />
        </div>
      </aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close filters"
              className="fixed inset-0 z-40 bg-forest-950/30 lg:hidden"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              onClick={onClose}
              type="button"
            />
            <motion.aside
              aria-label="Product filters"
              aria-modal="true"
              aria-labelledby="mobile-filters-title"
              className="fixed inset-y-0 right-0 z-50 w-[min(22rem,90vw)] overflow-y-auto bg-cream-50 p-6 shadow-lifted lg:hidden"
              initial={reducedMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reducedMotion ? undefined : { x: '100%' }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              role="dialog"
              ref={filtersRef}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-forest-950" id="mobile-filters-title">
                  Filters
                </h2>
                <Button onClick={onClose} ref={closeButtonRef} size="sm" variant="quiet">
                  Close
                </Button>
              </div>
              <div className="mt-6">
                <FilterFields filters={filters} onChange={onChange} />
              </div>
              {hasActiveFilters && (
                <Button className="mt-4 w-full" onClick={onClear} variant="quiet">
                  Clear all filters
                </Button>
              )}
              <Button className="mt-8 w-full" onClick={onClose}>
                Show results
              </Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
