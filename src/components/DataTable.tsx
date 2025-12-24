import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDateShort } from '@/lib/utils'
import { EducationItem } from '@/data/mock'

interface DataTableProps {
  data: EducationItem[]
  emptyMessage?: string
}

export function DataTable({ data, emptyMessage = '데이터가 없습니다.' }: DataTableProps) {
  return (
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
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center font-medium">{item.name}</TableCell>
                <TableCell className="text-center">{item.institution}</TableCell>
                <TableCell className="text-center">{formatDateShort(item.startDate)}</TableCell>
                <TableCell className="text-center">{formatDateShort(item.endDate)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {data.length > 0 && (
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-900">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
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
          <span className="text-sm text-gray-600 dark:text-gray-300">1 / 1</span>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
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
  )
}


