import { useState } from 'react'
import { User, Grid } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EducationFilter, FilterValues } from '@/components/EducationFilter'
import { mockData } from '@/data/mock'
import { formatDateShort } from '@/lib/utils'

export function OpenTraining() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [_appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null)

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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            홈 - 출강 신청 - 오픈 예정 교육
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            오픈 예정 교육
          </h1>
        </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
      </div>

      {/* Table Card */}
      <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1" />
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            aria-label="Open filter"
          >
            <Grid className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap text-center text-lg">교육ID</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">교육명</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">학년-반</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">교육기관명</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">지역</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">기간</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.openTraining.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-gray-500 dark:text-gray-400">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                mockData.openTraining.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.id}</TableCell>
                    <TableCell className="text-center font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">{item.institution}</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">
                      {formatDateShort(item.startDate)} ~ {formatDateShort(item.endDate)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
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
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
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
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <EducationFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
      />
    </div>
  )
}

