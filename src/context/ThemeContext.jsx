import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './contexts.js'
import { storage } from '../utils/storage.js'

const THEME_STORAGE_KEY = 'orangic-theme'
const THEMES = { light: 'light', dark: 'dark' }

function readTheme() {
    try {
        const storedTheme = storage.get(THEME_STORAGE_KEY)
        return storedTheme === THEMES.dark ? THEMES.dark : THEMES.light
    } catch {
        return THEMES.light
    }
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(readTheme)

    useEffect(() => {
        storage.set(THEME_STORAGE_KEY, theme)
        document.documentElement.dataset.theme = theme
    }, [theme])

    const setThemeMode = useCallback((nextTheme) => {
        if (nextTheme === THEMES.light || nextTheme === THEMES.dark) {
            setTheme(nextTheme)
        }
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme((currentTheme) =>
            currentTheme === THEMES.light ? THEMES.dark : THEMES.light,
        )
    }, [])

    const value = useMemo(
        () => ({
            theme,
            isDark: theme === THEMES.dark,
            setTheme: setThemeMode,
            toggleTheme,
            themes: THEMES,
        }),
        [setThemeMode, theme, toggleTheme],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
