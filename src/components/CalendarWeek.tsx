import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, addWeeks, subWeeks } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import { cn } from '@/lib/utils'

type CalendarView = 'month' | 'week' | 'day'

interface CalendarWeekProps {
  onViewChange?: (view: CalendarView) => void
  currentView?: CalendarView
  baseDate?: Date
  onBaseDateChange?: (date: Date) => void
}

type WeekEvent = {
  id: string
  dayIndex: number // 0..6
  startMin: number // slotIndex*30
  endMin: number // startMin+30
  title: string // "오전 12:00 - 오전 12:30 -"
}

const SLOT_HEIGHT = 44 // pixels per 30-minute slot

export function CalendarWeek({ onViewChange, currentView = 'week', baseDate: propBaseDate, onBaseDateChange }: CalendarWeekProps) {
  const [internalDate, setInternalDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<WeekEvent | null>(null)
  
  // Use prop baseDate if provided, otherwise use internal state
  const currentDate = propBaseDate ?? internalDate
  const setCurrentDate = onBaseDateChange ?? setInternalDate

  const weekStart = startOfWeek(currentDate, { locale: ko })
  const weekEnd = endOfWeek(currentDate, { locale: ko })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1))
    setSelectedEvent(null)
  }

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
    setSelectedEvent(null)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedEvent(null)
  }

  // Convert minutes to Korean time string
  const minutesToKoreanTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    let period, displayHour
    if (hours === 0) {
      period = '오전'
      displayHour = 12
    } else if (hours < 12) {
      period = '오전'
      displayHour = hours
    } else if (hours === 12) {
      period = '오후'
      displayHour = 12
    } else {
      period = '오후'
      displayHour = hours - 12
    }
    
    const minuteStr = `:${mins.toString().padStart(2, '0')}`
    return `${period} ${displayHour}${minuteStr}`
  }

  // Format event title: "오전 12:00 - 오전 12:30 -"
  const formatEventTitle = (startMin: number, endMin: number): string => {
    const startTime = minutesToKoreanTime(startMin)
    const endTime = minutesToKoreanTime(endMin)
    return `${startTime} - ${endTime} -`
  }

  // Handle slot click - single selection with toggle
  const handleSlotClick = (dayIndex: number, slotIndex: number) => {
    const startMin = slotIndex * 30
    const endMin = startMin + 30

    // Toggle off if clicking the same slot
    if (selectedEvent?.dayIndex === dayIndex && selectedEvent?.startMin === startMin) {
      setSelectedEvent(null)
    } else {
      // Replace with new event
      const newEvent: WeekEvent = {
        id: `event-${Date.now()}-${Math.random()}`,
        dayIndex,
        startMin,
        endMin,
        title: formatEventTitle(startMin, endMin),
      }
      setSelectedEvent(newEvent)
    }
  }

  // Calculate event position and height
  const getEventStyle = (event: WeekEvent) => {
    // Skip "종일" row (40px height)
    const top = event.startMin * (SLOT_HEIGHT / 30) + 40
    const height = (event.endMin - event.startMin) * (SLOT_HEIGHT / 30)
    
    return {
      top: `${top}px`,
      height: `${height}px`,
    }
  }

  // Generate time slots - 48 slots (24h × 2 = 30min each)
  const timeSlots: Array<{ hour: number; minute: number; label: string; slotIndex: number }> = []
  
  // Add "종일" row (slotIndex -1, not clickable)
  timeSlots.push({ hour: -1, minute: 0, label: '종일', slotIndex: -1 })
  
  // Generate 24 hours, each with 2 rows (48 slots total)
  for (let hour = 0; hour <= 23; hour++) {
    let period, displayHour
    if (hour === 0) {
      period = '오전'
      displayHour = 12
    } else if (hour < 12) {
      period = '오전'
      displayHour = hour
    } else if (hour === 12) {
      period = '오후'
      displayHour = 12
    } else {
      period = '오후'
      displayHour = hour - 12
    }
    
    // Add two rows per hour
    const slotIndex0 = hour * 2
    const slotIndex30 = hour * 2 + 1
    timeSlots.push({ hour, minute: 0, label: `${period} ${displayHour}시`, slotIndex: slotIndex0 })
    timeSlots.push({ hour, minute: 30, label: '', slotIndex: slotIndex30 })
  }

  const weekDayLabels = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="border border-gray-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousWeek}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToNextWeek}
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
          {format(weekStart, 'yyyy년 M월 d일', { locale: ko })} - {format(weekEnd, 'd일', { locale: ko })}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewChange?.('month')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                currentView === 'month'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              )}
            >
              월간
            </button>
            <button
              onClick={() => onViewChange?.('week')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                currentView === 'week'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              )}
            >
              주간
            </button>
            <button
              onClick={() => onViewChange?.('day')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                currentView === 'day'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              )}
            >
              일간
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header row with days */}
          <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-900">
            <div className="p-3 border-r border-gray-200 dark:border-gray-900"></div>
            {weekDays.map((day, idx) => {
              const isTodayDate = isToday(day)
              return (
                <div
                  key={idx}
                  className={cn(
                    'p-3 text-center border-r border-gray-200 dark:border-gray-900 last:border-r-0',
                    isTodayDate && 'bg-green-50 dark:bg-green-900/30'
                  )}
                >
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {format(day, 'M. d.', { locale: ko })}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ({weekDayLabels[idx]})
                  </div>
                </div>
              )
            })}
          </div>

          {/* Time slots */}
          <div className="grid grid-cols-8">
            <div className="border-r border-gray-200 dark:border-gray-900">
              {/* 종일 row */}
              <div className="h-[40px] border-b border-gray-200 dark:border-gray-900 p-2 flex items-center">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">종일</div>
              </div>
              {/* Hour rows - 48 slots total */}
              {timeSlots.slice(1).map((slot, idx) => {
                // Only show label on first row of each hour (minute === 0)
                if (slot.minute === 0) {
                  return (
                    <div
                      key={idx}
                      className="h-[44px] border-b border-gray-100 dark:border-gray-900 p-2 flex items-start text-xs text-gray-600 dark:text-gray-400"
                    >
                      {slot.label}
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={idx}
                      className="h-[44px] border-b border-gray-100 dark:border-gray-900"
                    />
                  )
                }
              })}
            </div>
            {weekDays.map((day, dayIdx) => {
              const isTodayDate = isToday(day)
              const isEventDay = selectedEvent?.dayIndex === dayIdx
              return (
                <div
                  key={dayIdx}
                  className={cn(
                    'border-r border-gray-200 dark:border-gray-900 last:border-r-0 relative',
                    isTodayDate && 'bg-green-50 dark:bg-green-900/30'
                  )}
                  style={{ height: `${40 + 48 * SLOT_HEIGHT}px` }}
                >
                  {/* Grid rows - 1 for 종일 + 48 for time slots */}
                  {timeSlots.map((slot, slotIdx) => {
                    const isClickable = slot.slotIndex >= 0
                    return (
                      <div
                        key={slotIdx}
                        onClick={isClickable ? () => handleSlotClick(dayIdx, slot.slotIndex) : undefined}
                        className={cn(
                          slotIdx === 0 ? 'h-[40px] border-b-2 border-gray-200 dark:border-gray-900' : 'h-[44px] border-b border-gray-100 dark:border-gray-900',
                          isClickable && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
                        )}
                      />
                    )
                  })}

                  {/* Render event only in this day column */}
                  {isEventDay && selectedEvent && (
                    <div
                      className="absolute left-2 right-2 bg-blue-600 text-white rounded-md px-2 py-1 text-xs font-medium flex items-center"
                      style={getEventStyle(selectedEvent)}
                    >
                      {selectedEvent.title}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

