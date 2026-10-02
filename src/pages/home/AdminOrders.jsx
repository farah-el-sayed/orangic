import Card from '../../components/Card.jsx'
import { formatMoney } from '../../utils/admin.js'
import SearchInput from './AdminSearchInput.jsx'
import StatusBadge from './AdminStatusBadge.jsx'

export default function AdminOrders({ query, setQuery, list }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-3 border-b border-line px-5 py-4 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl text-forest-950">Orders ({list.length})</h2>
          <p className="text-sm text-ink-700">Mock orders for demonstration.</p>
        </div>
        <SearchInput label="Search orders" placeholder="Search orders" value={query} onChange={setQuery} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.12em] text-ink-500">
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Items</th>
              <th className="px-5 py-3 font-semibold">Total</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((order) => (
              <tr className="border-t border-line" key={order.id}>
                <td className="px-5 py-3 font-semibold text-forest-900">{order.id}</td>
                <td className="px-5 py-3"><span className="block font-semibold text-forest-900">{order.customer}</span><span className="text-xs text-ink-500">{order.email}</span></td>
                <td className="px-5 py-3 text-ink-700">{order.date}</td>
                <td className="px-5 py-3 text-ink-700">{order.items}</td>
                <td className="px-5 py-3 font-semibold text-forest-900">{formatMoney(order.total)}</td>
                <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
