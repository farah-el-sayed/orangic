import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { router } from './routes/index.jsx'

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}
