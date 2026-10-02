import Card from '../../components/Card.jsx'
import { formatMoney } from '../../utils/admin.js'
import SearchInput from './AdminSearchInput.jsx'

export default function AdminCustomers({ query, setQuery, list }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-3 border-b border-line px-5 py-4 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl text-forest-950">Customers ({list.length})</h2>
          <p className="text-sm text-ink-700">Mock customers for demonstration.</p>
        </div>
        <SearchInput label="Search customers" placeholder="Search customers" value={query} onChange={setQuery} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.12em] text-ink-500">
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Orders</th>
              <th className="px-5 py-3 font-semibold">Spent</th>
              <th className="px-5 py-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {list.map((customer) => (
              <tr className="border-t border-line" key={customer.email}>
                <td className="px-5 py-3"><span className="block font-semibold text-forest-900">{customer.name}</span><span className="text-xs text-ink-500">{customer.email}</span></td>
                <td className="px-5 py-3 text-ink-700">{customer.location}</td>
                <td className="px-5 py-3 text-ink-700">{customer.orders}</td>
                <td className="px-5 py-3 font-semibold text-forest-900">{formatMoney(customer.spent)}</td>
                <td className="px-5 py-3 text-ink-700">{customer.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
