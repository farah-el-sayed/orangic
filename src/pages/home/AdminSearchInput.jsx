export default function AdminSearchInput({ label, placeholder, value, onChange }) {
  return (
    <input
      aria-label={label}
      className="min-h-11 rounded-md border border-line bg-cream-100/60 px-3 text-sm outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-sage-100 sm:w-64"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type="search"
      value={value}
    />
  )
}
