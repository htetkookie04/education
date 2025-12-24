import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  )
}

