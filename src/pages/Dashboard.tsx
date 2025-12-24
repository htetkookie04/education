import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TabCards } from '@/components/TabCards'
import { Calendar } from '@/components/Calendar'
import { EducationFilter, FilterValues } from '@/components/EducationFilter'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDateShort } from '@/lib/utils'

// Dashboard-specific data matching the screenshot
const dashboardData = [
  {
    id: '1',
    name: '테스트_1224',
    institution: '테스트_1224_북부',
    startDate: '2025-12-28',
    endDate: '2025-12-28',
    educationId: '16880',
  },
]

export function Dashboard() {
  const navigate = useNavigate()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [_appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null)
  const [activeTabId, setActiveTabId] = useState('available') // Default to "신청할 수 있는 교육"

  const handleFilterApply = (filters: FilterValues) => {
    setAppliedFilters(filters)
    setIsFilterOpen(false)
    // Here you would apply the filters to your data
    console.log('Applied filters:', filters)
  }

  const handleFilterReset = () => {
    setAppliedFilters(null)
    setIsFilterOpen(false)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId)
    // Here you can change the table data based on the selected tab
    console.log('Tab changed to:', tabId)
  }

  // Filter data based on active tab - only show data for "available" tab
  const filteredData = activeTabId === 'available' ? dashboardData : []

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              홈 &gt; 대시보드
            </nav>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              김철수(일반, 북부-테스트계정) 강사님 안녕하세요!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              지금 신청 가능! 놓치지 마세요.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <TabCards 
        disableNavigation={true}
        activeTabId={activeTabId}
        onTabChange={handleTabChange}
      />

      <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] text-center text-lg">교육명</TableHead>
              <TableHead className="w-[250px] text-center text-lg">교육기관명</TableHead>
              <TableHead className="w-[150px] text-center text-lg">시작일</TableHead>
              <TableHead className="w-[150px] text-center text-lg">종료일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-gray-500 dark:text-gray-400">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow 
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  onClick={() => navigate(`/apply/request/${item.educationId}`)}
                >
                  <TableCell className="text-center font-medium dark:text-gray-100">{item.name}</TableCell>
                  <TableCell className="text-center dark:text-gray-100">{item.institution}</TableCell>
                  <TableCell className="text-center dark:text-gray-100">{formatDateShort(item.startDate)}</TableCell>
                  <TableCell className="text-center dark:text-gray-100">{formatDateShort(item.endDate)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {filteredData.length > 0 && (
          <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-900">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors disabled:opacity-50" disabled>
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded bg-blue-500 text-white text-sm font-medium">
                1
              </button>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors disabled:opacity-50" disabled>
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Calendar />

      {/* Filter Panel - Independent state for Dashboard */}
      <EducationFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
      />
    </div>
  )
}

