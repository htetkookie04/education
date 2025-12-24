import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import { cn } from '@/lib/utils'

export function CalendarMonth() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)) // December 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { locale: ko })
  const calendarEnd = endOfWeek(monthEnd, { locale: ko })
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            오늘
          </button>
          <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button className="px-4 py-2 text-sm font-medium bg-primary text-white">
              월간
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900">
              주간
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900">
              일간
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isTodayDate = isToday(day)
          const dayString = format(day, 'yyyy-MM-dd')
          const isSelected = selectedDate === dayString

          return (
            <div
              key={idx}
              onClick={() => {
                // Toggle off if clicking the same cell, otherwise select new one
                if (isSelected) {
                  setSelectedDate(null)
                } else {
                  setSelectedDate(dayString)
                }
              }}
              className={cn(
                'p-3 min-h-[80px] border border-gray-100 dark:border-gray-900 rounded-lg cursor-pointer transition-colors',
                'hover:bg-slate-50 dark:hover:bg-gray-900',
                !isCurrentMonth && 'bg-gray-50 dark:bg-black text-gray-400 dark:text-gray-600',
                isCurrentMonth && !isSelected && 'bg-white dark:bg-black text-gray-900 dark:text-gray-100',
                isSelected && 'bg-slate-100 dark:bg-gray-900 ring-1 ring-slate-300 dark:ring-gray-700',
                isTodayDate && !isSelected && 'bg-primary/5 dark:bg-primary/20 border-primary/20 dark:border-primary/40'
              )}
            >
              <div
                className={cn(
                  'text-sm font-medium mb-1',
                  isTodayDate && !isSelected && 'text-primary font-semibold'
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

