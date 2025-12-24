import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ScrollToTopFab } from '@/components/ScrollToTopFab'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <ScrollToTop />
      <ScrollToTopFab />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      <main className={cn(
        "flex-1 transition-all duration-300",
        // Mobile: no margin, full width
        "ml-0 p-4 sm:p-6",
        // Tablet: no margin
        "md:ml-0",
        // Desktop: margin based on collapsed state
        "lg:ml-64 lg:p-8",
        isSidebarCollapsed ? "lg:ml-16" : ""
      )}>
        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-md hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
        <div className="lg:mt-0 mt-12">
        <Outlet />
        </div>
      </main>
    </div>
  )
}

