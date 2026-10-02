import { useId } from 'react'

export default function Input({
  label,
  hint,
  error,
  id,
  required = false,
  className = '',
  ...props
}) {
  const generatedId = useId()
  const inputId = id ?? `input-${generatedId}`
  const messageId = `${inputId}-message`
  const message = error || hint

  return (
    <div className={`grid gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink-900">
          {label}
          {required && <span className="ml-1 text-clay-700">*</span>}
        </label>
      )}
      <input
        {...props}
        id={inputId}
        required={required}
        aria-describedby={message ? messageId : undefined}
        aria-invalid={error ? 'true' : undefined}
        className="min-h-11 w-full min-w-0 rounded-md border border-line bg-cream-50 px-3.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-500 hover:border-sage-200 focus:border-forest-700 focus:ring-4 focus:ring-sage-100 disabled:cursor-not-allowed disabled:bg-cream-200 disabled:opacity-70 aria-[invalid=true]:border-danger-700 aria-[invalid=true]:focus:ring-danger-100"
      />
      {message && (
        <p
          id={messageId}
          className={`text-xs ${error ? 'text-danger-700' : 'text-ink-500'}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
