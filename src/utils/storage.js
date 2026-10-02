export const storage = {
    get: (key) => {
        try {
            return typeof window === 'undefined' ? null : window.localStorage.getItem(key)
        } catch {
            return null
        }
    },
    set: (key, value) => {
        try {
            if (typeof window !== 'undefined') window.localStorage.setItem(key, value)
            return true
        } catch {
            return false
        }
    },
    remove: (key) => {
        try {
            if (typeof window !== 'undefined') window.localStorage.removeItem(key)
            return true
        } catch {
            return false
        }
    },
}
