import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../ThemeProvider'

function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="h-20 flex items-center justify-center element-bg-primary-clr py-7.5 px-4 md:px-10 lg:px-20 lg:py-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-primary-clr text-sm leading-5 lg:text-preset-2">
          Where in the world?
        </h1>
        <button
          type="button"
          className="flex items-center gap-2 text-primary-clr cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              <Moon className="size-4 " />
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
