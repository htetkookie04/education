import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  List,
  CheckSquare,
  Clock,
  Flag,
  Briefcase,
  MousePointerClick,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FileEdit,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import logo from '@/image/logo.svg'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  route?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: '대시보드',
    icon: LayoutDashboard,
    route: '/dashboard',
  },
  {
    id: 'schedule',
    label: '출강 일정',
    icon: Calendar,
    children: [
      {
        id: 'my-lectures',
        label: '내 출강 리스트',
        icon: List,
        route: '/schedule/my-lectures',
      },
      {
        id: 'confirmed',
        label: '확정된 수업 조회',
        icon: CheckSquare,
        route: '/schedule/confirmed',
      },
      {
        id: 'in-progress',
        label: '진행 중인 교육',
        icon: Clock,
        route: '/schedule/in-progress',
      },
      {
        id: 'completed',
        label: '완료된 교육',
        icon: Flag,
        route: '/schedule/completed',
      },
    ],
  },
  {
    id: 'apply',
    label: '출강 신청',
    icon: FileEdit,
    children: [
      {
        id: 'open',
        label: '오픈 예정 교육',
        icon: Briefcase,
        route: '/apply/open',
      },
      {
        id: 'request',
        label: '출강 신청하기',
        icon: MousePointerClick,
        route: '/apply/request',
      },
      {
        id: 'my-applications',
        label: '내가 신청한 교육들',
        icon: User,
        route: '/my-applications',
      },
    ],
  },
]

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ isCollapsed = false, onToggle, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['schedule', 'apply'])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    )
  }

  const isActive = (route?: string) => {
    if (!route) return false
    return location.pathname === route || location.pathname.startsWith(route + '/')
  }

  const handleItemClick = (route?: string) => {
    if (route) {
      navigate(route)
      // Close mobile sidebar when navigating
      if (onMobileClose) {
        onMobileClose()
      }
    }
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const Icon = item.icon
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedGroups.includes(item.id)
    const active = isActive(item.route)
    const showFull = !isCollapsed || isMobileOpen

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => showFull && toggleGroup(item.id)}
            className={cn(
              'w-full flex items-center justify-between rounded-lg transition-colors text-left',
              'hover:bg-slate-100 dark:hover:bg-gray-900 text-slate-700 dark:text-gray-200',
              showFull ? 'px-4 py-3' : 'px-2 py-3 justify-center',
              level > 0 && showFull && 'pl-8'
            )}
            title={!showFull ? item.label : undefined}
          >
            <div className={cn("flex items-center", showFull ? "gap-3" : "justify-center")}>
              <Icon className="w-5 h-5 text-slate-500 dark:text-gray-400" />
              {showFull && <span className="font-medium">{item.label}</span>}
            </div>
            {showFull && (
              isExpanded ? (
                <ChevronDown className="w-4 h-4 text-slate-500 dark:text-gray-400" />
            ) : (
                <ChevronRight className="w-4 h-4 text-slate-500 dark:text-gray-400" />
              )
            )}
          </button>
          {showFull && isExpanded && (
            <div className="mt-1">
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <button
        key={item.id}
        onClick={() => handleItemClick(item.route)}
        className={cn(
          'w-full flex items-center rounded-lg transition-colors text-left',
          'hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300',
          active && 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-500 rounded-xl font-medium',
          showFull ? 'px-4 py-3 gap-3' : 'px-2 py-3 justify-center',
          level > 0 && showFull && 'pl-8'
        )}
        title={!showFull ? item.label : undefined}
      >
        <Icon className={cn('w-5 h-5', active ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-gray-400')} />
        {showFull && <span className="font-medium">{item.label}</span>}
      </button>
    )
  }

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "bg-white dark:bg-black border-r border-slate-200 dark:border-gray-900 h-screen fixed left-0 top-0 overflow-y-auto scrollbar-hide transition-all duration-300 z-50",
        // Mobile: slide in/out from left
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        // Desktop: width based on collapsed state
        "w-64 lg:w-64",
        isCollapsed && "lg:w-16"
      )}>
        <div className="p-6 border-b border-slate-200 dark:border-gray-900">
          <div className="flex items-center justify-between">
            {(!isCollapsed || isMobileOpen) && (
          <img src={logo} alt="SWA 미래채움" className="h-12 w-auto" />
            )}
            <div className="flex items-center gap-2">
              {/* Mobile close button */}
              {isMobileOpen && (
                <button
                  onClick={onMobileClose}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-900 transition-colors lg:hidden"
                  aria-label="Close sidebar"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-gray-300" />
                </button>
              )}
              {/* Desktop toggle button */}
              <button
                onClick={onToggle}
                className={cn(
                  "p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-900 transition-colors",
                  isCollapsed && !isMobileOpen && "mx-auto",
                  "hidden lg:block"
                )}
                aria-label="Toggle sidebar"
              >
                {isCollapsed ? (
                  <Menu className="w-5 h-5 text-slate-600 dark:text-gray-300" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            </div>
          </div>
        </div>
        <nav className={cn("space-y-1", (isCollapsed && !isMobileOpen) ? "p-2" : "p-4")}>
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </div>
    </>
  )
}

