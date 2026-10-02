import { useEffect, useState } from 'react'
import { withBase } from '../utils/withBase.js'

const FALLBACK_IMAGE = withBase('/favicon.svg')

export default function SafeImage({
  fallbackSrc = FALLBACK_IMAGE,
  src,
  eager = false,
  ...props
}) {
  const resolvedSrc = withBase(src)
  const resolvedFallback = withBase(fallbackSrc)
  const [imageSrc, setImageSrc] = useState(resolvedSrc)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setImageSrc(withBase(src))
  }, [src])

  const handleError = () => {
    if (imageSrc !== resolvedFallback) setImageSrc(resolvedFallback)
  }

  return (
    <img
      {...props}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      onError={handleError}
      onLoad={() => setLoaded(true)}
      src={imageSrc}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'all 0.4s ease-out',
        ...(props.style || {}),
      }}
    />
  )
}

