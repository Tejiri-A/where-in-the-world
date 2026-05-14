import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../ThemeProvider'
import { useEffect, useRef, useState } from 'react'


function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isFixed, setIsFixed] = useState<boolean>(false)

  const headerRef = useRef<HTMLHeadElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsFixed(scrollY > 260)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`h-20 flex items-center justify-center element-bg-primary-clr py-7.5 px-4 md:px-10 lg:px-20 lg:py-6 drop-shadow ${isFixed ? "fixed top-0 left-0 w-full z-50" : null}`}
    >
      <div className="flex justify-between items-center  max-w-[1280px] mx-auto w-full">
        <h1 className="text-sm leading-5 text-primary-clr lg:text-preset-2">
          Where in the world?
        </h1>
        <button
          type="button"
          className="flex gap-2 items-center cursor-pointer text-primary-clr"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              <Moon className="size-4" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="size-4" />
              Light Mode
            </>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
