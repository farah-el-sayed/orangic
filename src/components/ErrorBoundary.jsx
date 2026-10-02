import { Component } from 'react'
import ErrorState from './ErrorState.jsx'

export default class ErrorBoundary extends Component {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        if (import.meta.env.DEV) {
            console.error('Unhandled component error:', error, errorInfo)
        }
    }

    handleRetry = () => {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            return <ErrorState onRetry={this.handleRetry} />
        }

        return this.props.children
    }
}