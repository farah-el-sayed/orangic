import ErrorMessage from './ErrorMessage.jsx'

export default function FormStatus({ error, success }) {
  if (error) return <ErrorMessage>{error}</ErrorMessage>
  if (success) {
    return (
      <p className="rounded-md border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-forest-800" role="status">
        {success}
      </p>
    )
  }
  return null
}