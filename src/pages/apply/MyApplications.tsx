import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Grid, AlertTriangle } from 'lucide-react'
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
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function MyApplications() {
  const navigate = useNavigate()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [_appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<{
    id: string
    name: string
    institution: string
  } | null>(null)

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

  const handleDeleteClick = (id: string, name: string, institution: string) => {
    setSelectedApplication({ id, name, institution })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedApplication) {
      toast.success('삭제 완료(가상)')
      // Here you would delete the application
      console.log('Delete application:', selectedApplication.id)
      setIsDeleteModalOpen(false)
      setSelectedApplication(null)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setSelectedApplication(null)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            홈 - 출강 신청 - 내가 신청한 교육들
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            내가 신청한 교육들
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
                <TableHead className="whitespace-nowrap text-center text-lg">교육기관명</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">시작일</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">종료일</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">비고</TableHead>
                <TableHead className="whitespace-nowrap text-center text-lg">삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.myApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-gray-500 dark:text-gray-400">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                mockData.myApplications.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    onClick={() => navigate(`/my-applications/${item.id}`)}
                  >
                    <TableCell className="text-center">{item.id}</TableCell>
                    <TableCell className="text-center font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">{item.institution}</TableCell>
                    <TableCell className="text-center">{item.startDate}</TableCell>
                    <TableCell className="text-center">{item.endDate}</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDeleteClick(item.id, item.name, item.institution)}
                        className="px-3 py-1 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                        aria-label="Delete application"
                      >
                        삭제
                      </button>
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
            onClick={handleCancelDelete}
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
              <div className="w-16 h-16 rounded-full bg-red-500 border-2 border-red-500 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
              삭제 확인
            </h2>

            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-900 dark:text-gray-100 mb-2">
                {selectedApplication.name}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300">
                이 교육 신청을 삭제하시겠습니까?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

