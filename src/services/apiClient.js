export async function apiClient(url, options = {}) {
    if (!url) {
        throw new Error('A request URL is required.')
    }

    const response = await fetch(url, options)
    const contentType = response.headers.get('content-type') || ''
    const body = contentType.includes('application/json')
        ? await response.json()
        : await response.text()

    if (!response.ok) {
        const error = new Error(
            typeof body === 'string' ? body : body?.message || 'Request failed.',
        )
        error.status = response.status
        throw error
    }

    return body
}
