import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '../services/apiClient.js'

const initialState = { data: null, error: null, status: 'idle' }

export function useApi(request, { enabled = true } = {}) {
    const [state, setState] = useState(initialState)
    const [attempt, setAttempt] = useState(0)

    useEffect(() => {
        if (!enabled || !request) {
            return undefined
        }

        const controller = new AbortController()
        let active = true

        Promise.resolve()
            .then(() => {
                if (active) setState({ data: null, error: null, status: 'loading' })
                return typeof request === 'function'
                    ? request({ signal: controller.signal })
                    : apiClient(request, { signal: controller.signal })
            })
            .then((data) => {
                if (active) setState({ data, error: null, status: 'success' })
            })
            .catch((error) => {
                if (active && error.name !== 'AbortError') {
                    setState({ data: null, error, status: 'error' })
                }
            })

        return () => {
            active = false
            controller.abort()
        }
    }, [attempt, enabled, request])

    const retry = useCallback(() => setAttempt((current) => current + 1), [])

    return { ...(enabled && request ? state : initialState), retry }
}
