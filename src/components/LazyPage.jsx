import { Suspense } from 'react'
import Loader from './Loader.jsx'

function DelayedBrandLoader({ label }) {
  return <Loader delay={250} label={label} />
}

export default function LazyPage({ component: Page, label = 'Loading page' }) {
  return (
    <Suspense fallback={<DelayedBrandLoader label={label} />}>
      <Page />
    </Suspense>
  )
}