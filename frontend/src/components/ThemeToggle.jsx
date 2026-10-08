import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../store'
import { useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'enviroDark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'enviroLight')
    }
  }, [theme])

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost btn-sm relative overflow-hidden transition-all duration-300 hover:bg-emerald-500/10"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-emerald-600 absolute inset-0 transition-all duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-5 h-5 text-mint-300 absolute inset-0 transition-all duration-300 rotate-0 scale-100" />
        )}
      </div>
    </button>
  )
}
