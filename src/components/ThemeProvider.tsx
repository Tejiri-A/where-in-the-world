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
    if (theme === 'dark') document.body.classList.add('dark')
    else document.body.classList.remove('dark')
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
