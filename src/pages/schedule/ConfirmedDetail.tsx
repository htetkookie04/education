import { useParams, useNavigate } from 'react-router-dom'
import { User, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { mockData } from '@/data/mock'
import { formatDateShort } from '@/lib/utils'

// Mock detail data - in a real app, this would be fetched based on the ID
const getDetailData = (id: string) => {
  const item = mockData.confirmed.find(item => item.id === id)
  if (!item) return null
  
  // This would typically be an API call
  return {
    educationId: item.id,
    status: '확정',
    name: item.name,
    description: item.name,
    startDate: item.startDate,
    endDate: item.endDate,
    institution: item.institution,
    remarks: '-',
  }
}

export function ConfirmedDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const data = id ? getDetailData(id) : null

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">데이터를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            홈 - 출강 일정 - 출강 확정 교육
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            출강 확정 교육 상세
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* ① 교육 조회 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">① 교육 조회</h2>

        {/* 교육 정보 */}
        <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">교육 정보</h3>
          </div>
          <div className="p-4">
            <Table>
              <TableBody>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">교육 ID</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.educationId}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/6 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">상태</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.status}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">교육명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.name}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">설명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.description}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">시작일</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{formatDateShort(data.startDate)}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">종료일</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{formatDateShort(data.endDate)}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">교육기관명</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3 border-r border-gray-200 dark:border-gray-800">{data.institution}</TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 !p-3 border-l border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">비고</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 !p-3">{data.remarks}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로
        </button>
      </div>
    </div>
  )
}

