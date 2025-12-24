import { useState } from 'react'
import { X, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EducationFilterProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterValues) => void
  onReset: () => void
}

export interface FilterValues {
  educationId: string
  educationName: string
  institutionName: string
  startDate: string
  endDate: string
}

export function EducationFilter({ isOpen, onClose, onApply, onReset }: EducationFilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    educationId: '',
    educationName: '',
    institutionName: '',
    startDate: '',
    endDate: '',
  })

  const handleReset = () => {
    setFilters({
      educationId: '',
      educationName: '',
      institutionName: '',
      startDate: '',
      endDate: '',
    })
    onReset()
  }

  const handleApply = () => {
    onApply(filters)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Filter Dialog - Right Side */}
      <div
        className={cn(
          "relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-[90vw] max-w-md flex flex-col mt-40 mr-8",
          "transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">교육 필터링</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
            aria-label="Close filter"
          >
            <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto p-6 space-y-6 max-h-[60vh]">
          {/* 교육ID */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              교육ID
            </label>
            <input
              type="text"
              value={filters.educationId}
              onChange={(e) => setFilters({ ...filters, educationId: e.target.value })}
              placeholder="교육ID를 입력해주세요."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 교육명 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              교육명
            </label>
            <input
              type="text"
              value={filters.educationName}
              onChange={(e) => setFilters({ ...filters, educationName: e.target.value })}
              placeholder="교육명을 입력해주세요."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 교육기관명 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              교육기관명
            </label>
            <input
              type="text"
              value={filters.institutionName}
              onChange={(e) => setFilters({ ...filters, institutionName: e.target.value })}
              placeholder="교육기관명을 입력해주세요."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 날짜 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              날짜
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={filters.startDate || ''}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-500 dark:text-gray-400">~</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={filters.endDate || ''}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-900 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            필터 적용
          </button>
        </div>
      </div>
    </div>
  )
}

