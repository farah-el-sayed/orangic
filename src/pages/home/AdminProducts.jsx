import { Link } from 'react-router-dom'
import Badge from '../../components/Badge.jsx'
import Card from '../../components/Card.jsx'
import Rating from '../../components/Rating.jsx'
import SafeImage from '../../components/SafeImage.jsx'
import { ROUTES } from '../../constants/routes.js'
import { formatMoney } from '../../utils/admin.js'
import SearchInput from './AdminSearchInput.jsx'

export default function AdminProducts({ query, setQuery, list }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-3 border-b border-line px-5 py-4 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl text-forest-950">Products ({list.length})</h2>
          <p className="text-sm text-ink-700">Live catalog data from the storefront.</p>
        </div>
        <SearchInput label="Search products" placeholder="Search products" value={query} onChange={setQuery} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.12em] text-ink-500">
              <th className="px-5 py-3 font-semibold">Product</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Price</th>
              <th className="px-5 py-3 font-semibold">Stock</th>
              <th className="px-5 py-3 font-semibold">Rating</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr className="border-t border-line" key={product.id}>
                <td className="px-5 py-3">
                  <Link className="flex items-center gap-3" to={`${ROUTES.products}/${product.slug}`}>
                    <span className="size-11 shrink-0 overflow-hidden rounded-md bg-sage-50">
                      <SafeImage alt={product.name} className="size-full object-cover" loading="lazy" src={product.images[0]} />
                    </span>
                    <span className="font-semibold text-forest-900 hover:text-clay-700">{product.name}</span>
                  </Link>
                </td>
                <td className="px-5 py-3 text-ink-700">{product.category}</td>
                <td className="px-5 py-3 font-semibold text-forest-900">{formatMoney(product.price)}</td>
                <td className="px-5 py-3"><Badge variant={product.stock <= 20 ? 'warm' : 'success'}>{product.stock} in stock</Badge></td>
                <td className="px-5 py-3"><Rating compact value={product.rating} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
