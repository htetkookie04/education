import { useState } from 'react'
import { User, Grid, Check, Minus, AlertTriangle } from 'lucide-react'
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
import { formatDateShort } from '@/lib/utils'
import { cn } from '@/lib/utils'

// Dashboard-specific data matching the screenshot
const requestApplyData = [
  {
    id: '1',
    institution: '테스트_1224_북부',
    gradeClass: '2-6',
    name: '테스트_1224',
    region: '의정부시',
    period: '2025-12-28',
    educationId: '16880',
  },
]

export function RequestApply() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [selectedEducation, setSelectedEducation] = useState<{
    name: string
    educationId: string
    instructorType: 'main' | 'assistant'
  } | null>(null)
  // Track applied status: key is educationId-instructorType
  const [appliedStatus, setAppliedStatus] = useState<Set<string>>(new Set())

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

  const handleApplyClick = (name: string, educationId: string, instructorType: 'main' | 'assistant') => {
    setSelectedEducation({ name, educationId, instructorType })
    setIsConfirmModalOpen(true)
  }

  const handleConfirmApply = () => {
    if (selectedEducation) {
      const statusKey = `${selectedEducation.educationId}-${selectedEducation.instructorType}`
      setAppliedStatus(prev => new Set(prev).add(statusKey))
      console.log(`신청 완료: ${selectedEducation.educationId} - ${selectedEducation.instructorType === 'main' ? '주강사' : '보조강사'}`)
      // Here you would handle the actual application
      setIsConfirmModalOpen(false)
      setSelectedEducation(null)
    }
  }

  const isApplied = (educationId: string, instructorType: 'main' | 'assistant') => {
    return appliedStatus.has(`${educationId}-${instructorType}`)
  }

  const handleRemoveClick = (name: string, educationId: string, instructorType: 'main' | 'assistant') => {
    setSelectedEducation({ name, educationId, instructorType })
    setIsCancelModalOpen(true)
  }

  const handleConfirmCancel = () => {
    if (selectedEducation) {
      const statusKey = `${selectedEducation.educationId}-${selectedEducation.instructorType}`
      setAppliedStatus(prev => {
        const newSet = new Set(prev)
        newSet.delete(statusKey)
        return newSet
      })
      setIsCancelModalOpen(false)
      setSelectedEducation(null)
    }
  }

  const handleGoBack = () => {
    setIsCancelModalOpen(false)
    setSelectedEducation(null)
  }

  const handleCancelApply = () => {
    setIsConfirmModalOpen(false)
    setSelectedEducation(null)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            홈 - 출강 신청 - 출강 신청하기
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
            출강 신청하기
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
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-900">
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
                <TableHead className="whitespace-nowrap text-center text-lg">교육기관명</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">학년-반</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">교육명</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">지역</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">기간</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">신청</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">교육ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestApplyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-gray-500 dark:text-gray-400">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                requestApplyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center dark:text-gray-100">{item.institution}</TableCell>
                    <TableCell className="text-center dark:text-gray-100">{item.gradeClass}</TableCell>
                    <TableCell className="text-center font-medium dark:text-gray-100">{item.name}</TableCell>
                    <TableCell className="text-center dark:text-gray-100">{item.region}</TableCell>
                    <TableCell className="text-center dark:text-gray-100">{item.period}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2 sm:gap-2">
                        {/* 주강사 신청 */}
                        {isApplied(item.educationId, 'main') ? (
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-500 dark:border-green-700 rounded">
                            <Check className="w-4 h-4 text-green-700 dark:text-green-400" />
                            <span className="text-sm text-green-700 dark:text-green-400">주강사 신청됨</span>
                            <button
                              onClick={() => handleRemoveClick(item.name, item.educationId, 'main')}
                              className="w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-400 transition-colors"
                              aria-label="Remove application"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : isApplied(item.educationId, 'assistant') ? (
                          <div className="flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded opacity-60">
                            <span className="text-sm text-gray-700 dark:text-gray-300">주강사 0/1</span>
                            <button
                              disabled
                              className="ml-2 w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              aria-label="Disabled"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded">
                            <span className="text-sm text-gray-700 dark:text-gray-300">주강사 0/1</span>
                            <button
                              onClick={() => handleApplyClick(item.name, item.educationId, 'main')}
                              className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                            >
                              신청
                            </button>
                          </div>
                        )}
                        {/* 보조강사 신청 */}
                        {isApplied(item.educationId, 'assistant') ? (
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-500 dark:border-green-700 rounded">
                            <Check className="w-4 h-4 text-green-700 dark:text-green-400" />
                            <span className="text-sm text-green-700 dark:text-green-400">보조강사 신청됨</span>
                            <button
                              onClick={() => handleRemoveClick(item.name, item.educationId, 'assistant')}
                              className="w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-400 transition-colors"
                              aria-label="Remove application"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : isApplied(item.educationId, 'main') ? (
                          <div className="flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded opacity-60">
                            <span className="text-sm text-gray-700 dark:text-gray-300">보조강사 0/2</span>
                            <button
                              disabled
                              className="ml-2 w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              aria-label="Disabled"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded">
                            <span className="text-sm text-gray-700 dark:text-gray-300">보조강사 0/2</span>
                            <button
                              onClick={() => handleApplyClick(item.name, item.educationId, 'assistant')}
                              className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                            >
                              신청
                            </button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center dark:text-gray-100">{item.educationId}</TableCell>
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

      {/* Confirmation Modal */}
      {isConfirmModalOpen && selectedEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
            onClick={handleCancelApply}
            aria-hidden="true"
          />
          
          {/* Modal Dialog */}
          <div
            className={cn(
              "relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6",
              "transition-all duration-300 ease-in-out"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 border-2 border-blue-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">?</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
              강사 신청
            </h2>

            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-900 dark:text-gray-100 mb-2">
                {selectedEducation.name}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {selectedEducation.instructorType === 'main' ? '주강사' : '보조강사'}로 신청하시겠습니까?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelApply}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={handleConfirmApply}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                신청
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && selectedEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
            onClick={handleGoBack}
            aria-hidden="true"
          />
          
          {/* Modal Dialog */}
          <div
            className={cn(
              "relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6",
              "transition-all duration-300 ease-in-out"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-500 border-2 border-yellow-500 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
              신청 취소
            </h2>

            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-900 dark:text-gray-100 mb-2">
                {selectedEducation.name}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300">
                강사 신청을 취소하시겠습니까?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={handleGoBack}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors font-medium"
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

