import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import SafeImage from '../components/SafeImage.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { ROUTES } from '../constants/routes.js'
import { products } from '../data/products.js'
import AdminCustomers from './home/AdminCustomers.jsx'
import AdminOrders from './home/AdminOrders.jsx'
import AdminProducts from './home/AdminProducts.jsx'
import { formatMoney } from '../utils/admin.js'
import StatusBadge from './home/AdminStatusBadge.jsx'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'products', label: 'Products' },
  { id: 'orders', label: 'Orders' },
  { id: 'customers', label: 'Customers' },
]

const mockOrders = [
  { id: 'ORD-1042', customer: 'Maya R.', email: 'maya@example.com', date: 'Jun 12, 2026', items: 3, total: 64.0, status: 'Delivered' },
  { id: 'ORD-1041', customer: 'Jon Bell', email: 'jon@example.com', date: 'Jun 11, 2026', items: 2, total: 46.5, status: 'Shipped' },
  { id: 'ORD-1040', customer: 'Leila S.', email: 'leila@example.com', date: 'Jun 10, 2026', items: 4, total: 92.75, status: 'Processing' },
  { id: 'ORD-1039', customer: 'Omar K.', email: 'omar@example.com', date: 'Jun 09, 2026', items: 1, total: 28.0, status: 'Delivered' },
  { id: 'ORD-1038', customer: 'Priya N.', email: 'priya@example.com', date: 'Jun 08, 2026', items: 5, total: 118.2, status: 'Delivered' },
  { id: 'ORD-1037', customer: 'Sam W.', email: 'sam@example.com', date: 'Jun 07, 2026', items: 2, total: 39.9, status: 'Pending' },
  { id: 'ORD-1036', customer: 'Farah N.', email: 'farah@example.com', date: 'Jun 06, 2026', items: 3, total: 71.4, status: 'Shipped' },
  { id: 'ORD-1035', customer: 'Elias T.', email: 'elias@example.com', date: 'Jun 05, 2026', items: 2, total: 52.0, status: 'Cancelled' },
]

const mockCustomers = [
  { name: 'Maya R.', email: 'maya@example.com', location: 'Amman, JO', orders: 6, spent: 284.5, joined: 'Jan 2026' },
  { name: 'Jon Bell', email: 'jon@example.com', location: 'London, UK', orders: 4, spent: 176.2, joined: 'Feb 2026' },
  { name: 'Leila S.', email: 'leila@example.com', location: 'Dubai, AE', orders: 5, spent: 231.9, joined: 'Mar 2026' },
  { name: 'Omar K.', email: 'omar@example.com', location: 'Cairo, EG', orders: 3, spent: 98.0, joined: 'Apr 2026' },
  { name: 'Priya N.', email: 'priya@example.com', location: 'Mumbai, IN', orders: 7, spent: 342.75, joined: 'Jan 2026' },
  { name: 'Sam W.', email: 'sam@example.com', location: 'Berlin, DE', orders: 2, spent: 64.4, joined: 'May 2026' },
]

const salesByCategory = [
  { category: 'Pantry', revenue: 486.4, share: 38 },
  { category: 'Wellness', revenue: 352.75, share: 27 },
  { category: 'Body care', revenue: 268.9, share: 21 },
  { category: 'Home & lifestyle', revenue: 179.5, share: 14 },
]

function StatCard({ label, value, hint }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500">{label}</p>
      <p className="mt-2 font-display text-3xl text-forest-950">{value}</p>
      <p className="mt-1 text-sm text-ink-700">{hint}</p>
    </Card>
  )
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [productQuery, setProductQuery] = useState('')
  const [orderQuery, setOrderQuery] = useState('')
  const [customerQuery, setCustomerQuery] = useState('')

  const stats = useMemo(() => {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0)
    const lowStock = products.filter((product) => product.stock <= 20).length
    const averageRating =
      products.reduce((sum, product) => sum + product.rating, 0) / products.length
    return {
      totalRevenue,
      totalStock,
      lowStock,
      averageRating,
      totalOrders: mockOrders.length,
      totalCustomers: mockCustomers.length,
      totalProducts: products.length,
    }
  }, [])

  const filteredProducts = useMemo(() => {
    const query = productQuery.trim().toLowerCase()
    if (!query) return products
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.slug}`.toLowerCase().includes(query),
    )
  }, [productQuery])

  const filteredOrders = useMemo(() => {
    const query = orderQuery.trim().toLowerCase()
    if (!query) return mockOrders
    return mockOrders.filter((order) =>
      `${order.id} ${order.customer} ${order.email} ${order.status}`
        .toLowerCase()
        .includes(query),
    )
  }, [orderQuery])

  const filteredCustomers = useMemo(() => {
    const query = customerQuery.trim().toLowerCase()
    if (!query) return mockCustomers
    return mockCustomers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.location}`.toLowerCase().includes(query),
    )
  }, [customerQuery])

  const recentOrders = mockOrders.slice(0, 5)
  const lowStockProducts = products.slice().sort((a, b) => a.stock - b.stock).slice(0, 5)
  return (
    <>
      <section className="border-b border-line bg-sage-50 py-12 sm:py-16">
        <Container>
          <SectionTitle
            as="h1"
            description="A simple overview of products, orders, customers, and sales. Mock data for demonstration."
            eyebrow="Administration"
            title="Admin dashboard."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                aria-pressed={activeTab === tab.id}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200 ${activeTab === tab.id ? 'border-forest-800 bg-forest-800 text-cream-50' : 'border-line bg-cream-50 text-forest-800 hover:bg-forest-50'}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </section>
      <Container className="py-10 sm:py-14">
        {activeTab === 'overview' && (
          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total revenue" value={formatMoney(stats.totalRevenue)} hint={`${stats.totalOrders} mock orders`} />
              <StatCard label="Orders" value={String(stats.totalOrders)} hint="Across all statuses" />
              <StatCard label="Customers" value={String(stats.totalCustomers)} hint="Mock customer records" />
              <StatCard label="Products" value={String(stats.totalProducts)} hint={`${stats.totalStock} units in stock`} />
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <Card className="overflow-hidden p-0">
                <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <h2 className="font-display text-xl text-forest-950">Recent orders</h2>
                  <Button onClick={() => setActiveTab('orders')} size="sm" variant="quiet">View all</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[36rem] text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-[0.12em] text-ink-500">
                        <th className="px-5 py-3 font-semibold">Order</th>
                        <th className="px-5 py-3 font-semibold">Customer</th>
                        <th className="px-5 py-3 font-semibold">Total</th>
                        <th className="px-5 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr className="border-t border-line" key={order.id}>
                          <td className="px-5 py-3 font-semibold text-forest-900">{order.id}</td>
                          <td className="px-5 py-3 text-ink-700">{order.customer}</td>
                          <td className="px-5 py-3 font-semibold text-forest-900">{formatMoney(order.total)}</td>
                          <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card className="p-5 sm:p-6">
                <h2 className="font-display text-xl text-forest-950">Needs attention</h2>
                <p className="mt-1 text-sm text-ink-700">{stats.lowStock} products at 20 units or fewer</p>
                <ul className="mt-5 grid gap-3">
                  {lowStockProducts.map((product) => (
                    <li className="flex items-center gap-3 rounded-md border border-line bg-cream-100/60 px-3 py-2" key={product.id}>
                      <span className="size-11 shrink-0 overflow-hidden rounded-md bg-sage-50">
                        <SafeImage alt={product.name} className="size-full object-cover" loading="lazy" src={product.images[0]} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-forest-900">{product.name}</span>
                        <span className="text-xs text-ink-500">{product.category}</span>
                      </span>
                      <Badge variant={product.stock === 0 ? 'warm' : 'accent'}>{product.stock} left</Badge>
                    </li>
                  ))}
                </ul>
                <Button as={Link} className="mt-5 w-full" to={ROUTES.products} variant="secondary">View storefront</Button>
              </Card>
            </div>
            <Card className="p-5 sm:p-6">
              <h2 className="font-display text-xl text-forest-950">Sales by category</h2>
              <p className="mt-1 text-sm text-ink-700">Estimated revenue share from mock orders.</p>
              <div className="mt-5 grid gap-4">
                {salesByCategory.map((entry) => (
                  <div key={entry.category}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-forest-900">{entry.category}</span>
                      <span className="text-ink-700">{formatMoney(entry.revenue)} · {entry.share}%</span>
                    </div>
                    <div aria-hidden="true" className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream-200">
                      <div className="h-full rounded-full bg-forest-700" style={{ width: `${entry.share}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
        {activeTab === 'products' && <AdminProducts query={productQuery} setQuery={setProductQuery} list={filteredProducts} />}
        {activeTab === 'orders' && <AdminOrders query={orderQuery} setQuery={setOrderQuery} list={filteredOrders} />}
        {activeTab === 'customers' && <AdminCustomers query={customerQuery} setQuery={setCustomerQuery} list={filteredCustomers} />}
      </Container>
    </>
  )
}

