import Badge from '../../components/Badge.jsx'

export default function StatusBadge({ status }) {
  const variant = status === 'Delivered' ? 'success' : status === 'Cancelled' ? 'warm' : 'accent'
  return <Badge variant={variant}>{status}</Badge>
}
