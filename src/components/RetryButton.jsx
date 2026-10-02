import Button from './Button.jsx'

export default function RetryButton({ onRetry, children = 'Try again' }) {
  return (
    <Button onClick={onRetry} type="button" variant="secondary">
      {children}
    </Button>
  )
}