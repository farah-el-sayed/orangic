import { useEffect } from 'react'
import { useRouteError } from 'react-router-dom'
import ErrorState from './ErrorState.jsx'

export default function RouteErrorState() {
    const error = useRouteError()

    useEffect(() => {
        if (import.meta.env.DEV) {
            console.error('Unhandled route error:', error)
        }
    }, [error])

    return (
        <ErrorState
            description="The page could not be loaded. Please try again or return home."
            onRetry={() => window.location.reload()}
        />
    )
}