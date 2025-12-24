import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ScrollToTopFab() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY

        if (scrollY <= 50) {
          setIsVisible(false)
          setIsPressed(false)
        } else if (scrollY > 200) {
          setIsVisible(true)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check
    handleScroll()

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = () => {
    setIsPressed(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'h-11 w-11 rounded-xl',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none',
        isPressed
          ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
          : 'bg-white/70 backdrop-blur border border-slate-200 text-blue-600 shadow-sm hover:bg-blue-50'
      )}
    >
      <ChevronUp className="h-5 w-5 mx-auto" />
    </button>
  )
}

