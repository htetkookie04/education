import { useNavigate, useLocation } from 'react-router-dom'
import { Briefcase, MousePointerClick, FileText, Flag, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TabItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  route: string
}

const tabs: TabItem[] = [
  {
    id: 'my-lectures',
    label: '내 출강 리스트',
    icon: BookOpen,
    route: '/schedule/my-lectures',
  },
  {
    id: 'open',
    label: '오픈 예정 교육',
    icon: Briefcase,
    route: '/apply/open',
  },
  {
    id: 'available',
    label: '신청할 수 있는 교육',
    icon: MousePointerClick,
    route: '/apply/request',
  },
  {
    id: 'in-progress',
    label: '교육 진행 중',
    icon: FileText,
    route: '/schedule/in-progress',
  },
  {
    id: 'completed',
    label: '교육 완료',
    icon: Flag,
    route: '/schedule/completed',
  },
]

interface TabCardsProps {
  disableNavigation?: boolean
  activeTabId?: string
  onTabChange?: (tabId: string) => void
}

export function TabCards({ disableNavigation = false, activeTabId: propActiveTabId, onTabChange }: TabCardsProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const getActiveTabId = () => {
    if (propActiveTabId) {
      return propActiveTabId
    }
    const currentPath = location.pathname
    const tab = tabs.find((t) => currentPath.startsWith(t.route))
    return tab?.id || 'my-lectures'
  }

  const activeTabId = getActiveTabId()

  const handleTabClick = (tabId: string, route: string) => {
    if (disableNavigation) {
      onTabChange?.(tabId)
    } else {
      navigate(route)
    }
  }

  return (
    <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black p-4 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTabId === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.route)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap',
                'hover:bg-gray-50 dark:hover:bg-gray-900',
                isActive
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary border-b-2 border-primary'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-gray-500')} />
              <span className="font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

