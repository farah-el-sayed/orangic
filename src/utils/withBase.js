export function withBase(path) {
  if (!path || typeof path !== 'string') return path
  // Leave external / data / blob URLs untouched.
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  // Only rewrite root-absolute paths like "/images/..." or "/favicon.svg".
  if (!path.startsWith('/')) return path

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${path.slice(1)}`
}

export function getBasename() {
  const base = import.meta.env.BASE_URL || '/'
  // React Router prefers "/orangic" over "/orangic/".
  // "/" in dev must stay "/" (not empty string).
  if (base === '/' || base === './' || base === '') return '/'
  const trimmed = base.replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}` : '/'
}
