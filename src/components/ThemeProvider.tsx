import React, { createContext, use, useEffect, useState } from 'react'

type Theme = {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const ThemeContext = createContext<Theme | null>(null)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || saved === 'light' ? saved : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.classList.add('bg-primary-clr')
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

export function useTheme() {
  const themeContext = use(ThemeContext)
  if (!themeContext) throw new Error('Must be wrapped within ThemeProvider')
  return themeContext
}
