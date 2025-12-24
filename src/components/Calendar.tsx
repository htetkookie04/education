import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, startOfWeek, endOfWeek, addMonths, subMonths, addDays, subDays, addWeeks, subWeeks } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import { cn } from '@/lib/utils'
import { CalendarWeek } from './CalendarWeek'
import { CalendarDay } from './CalendarDay'

export type CalendarView = 'month' | 'week' | 'day'

export function Calendar() {
  const [view, setView] = useState<CalendarView>('month')
  const [baseDate, setBaseDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const monthStart = startOfMonth(baseDate)
  const monthEnd = endOfMonth(baseDate)
  const calendarStart = startOfWeek(monthStart, { locale: ko })
  const calendarEnd = endOfWeek(monthEnd, { locale: ko })
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const handleViewChange = (newView: CalendarView) => {
    if (newView === 'week' || newView === 'day') {
      // Reset to today when switching to week or day view
      setBaseDate(new Date())
    } else if (newView === 'month') {
      // Reset to today's month when switching to month view
      setBaseDate(new Date())
    }
    setView(newView)
  }

  const goToPrevious = () => {
    if (view === 'month') {
      setBaseDate(subMonths(baseDate, 1))
    } else if (view === 'week') {
      setBaseDate(subWeeks(baseDate, 1))
    } else if (view === 'day') {
      setBaseDate(subDays(baseDate, 1))
    }
  }

  const goToNext = () => {
    if (view === 'month') {
      setBaseDate(addMonths(baseDate, 1))
    } else if (view === 'week') {
      setBaseDate(addWeeks(baseDate, 1))
    } else if (view === 'day') {
      setBaseDate(addDays(baseDate, 1))
    }
  }

  const goToToday = () => {
    setBaseDate(new Date())
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  // Helper to format date as YYYY-MM-DD
  const toYMD = (d: Date) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Render week or day view
  if (view === 'week') {
    return <CalendarWeek onViewChange={handleViewChange} currentView={view} baseDate={baseDate} onBaseDateChange={setBaseDate} />
  }

  if (view === 'day') {
    return <CalendarDay onViewChange={handleViewChange} currentView={view} baseDate={baseDate} onBaseDateChange={setBaseDate} />
  }

  // Render month view
  return (
    <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            오늘
          </button>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center flex-1">
          {format(baseDate, 'yyyy년 M월', { locale: ko })}
        </h3>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => handleViewChange('month')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                view === 'month'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              )}
            >
              월간
            </button>
            <button
              onClick={() => handleViewChange('week')}
              className="px-4 py-2 text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50"
            >
              주간
            </button>
            <button
              onClick={() => handleViewChange('day')}
              className="px-4 py-2 text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50"
            >
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
          const isCurrentMonth = isSameMonth(day, baseDate)
          const dayString = format(day, 'yyyy-MM-dd')
          const isTodayDate = dayString === toYMD(new Date())
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
                // Priority: selected > today > normal
                isSelected && 'bg-slate-100 dark:bg-gray-900 ring-1 ring-slate-300 dark:ring-gray-700',
                isSelected && isTodayDate && 'ring-2 ring-emerald-200 dark:ring-emerald-700',
                !isSelected && isTodayDate && 'bg-emerald-50 dark:bg-emerald-900/30 ring-1 ring-emerald-200 dark:ring-emerald-700',
                isCurrentMonth && !isSelected && !isTodayDate && 'bg-white dark:bg-black text-gray-900 dark:text-gray-100'
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

