import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, subDays } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import { cn } from '@/lib/utils'
import { DayEvent } from '@/data/mockCalendar'
import type { CalendarView } from '../Calendar'

interface DayTimetableProps {
  onViewChange?: (view: CalendarView) => void
  currentView?: CalendarView
  baseDate?: Date
  onBaseDateChange?: (date: Date) => void
}

const SLOT_HEIGHT = 40 // pixels per 30-minute slot

export function DayTimetable({ onViewChange, currentView = 'day', baseDate: propBaseDate, onBaseDateChange }: DayTimetableProps) {
  const [internalDate, setInternalDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<DayEvent | null>(null)
  
  // Use prop baseDate if provided, otherwise use internal state
  const currentDate = propBaseDate ?? internalDate
  const setCurrentDate = onBaseDateChange ?? setInternalDate

  const goToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1))
    setSelectedEvent(null)
  }

  const goToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1))
    setSelectedEvent(null)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedEvent(null)
  }

  const dayOfWeek = format(currentDate, 'EEEE', { locale: ko })

  // Generate time slots - each hour has 2 rows (30 minutes each)
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

  // Format event title: "오전 12:30 - 오전 1:00 -"
  const formatEventTitle = (startMin: number, endMin: number): string => {
    const startTime = minutesToKoreanTime(startMin)
    const endTime = minutesToKoreanTime(endMin)
    return `${startTime} - ${endTime} -`
  }

  // Handle slot click - single selection with toggle
  const handleSlotClick = (slotIndex: number) => {
    // Skip "종일" row
    if (slotIndex < 0) return

    const startMin = slotIndex * 30
    const endMin = startMin + 30

    // Toggle off if clicking the same slot
    if (selectedEvent?.startMin === startMin) {
      setSelectedEvent(null)
    } else {
      // Replace with new event
      const newEvent: DayEvent = {
        id: `event-${Date.now()}-${Math.random()}`,
        startMin,
        endMin,
        title: formatEventTitle(startMin, endMin),
      }
      setSelectedEvent(newEvent)
    }
  }

  // Calculate event position and height
  const getEventStyle = (event: DayEvent) => {
    // Skip "종일" row (index 0)
    const top = event.startMin * (SLOT_HEIGHT / 30) + SLOT_HEIGHT
    const height = (event.endMin - event.startMin) * (SLOT_HEIGHT / 30)
    
    return {
      top: `${top}px`,
      height: `${height}px`,
    }
  }

  return (
    <div className="border border-slate-200 dark:border-gray-900 rounded-xl bg-white dark:bg-black">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-gray-900">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousDay}
            className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToNextDay}
            className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            오늘
          </button>
        </div>
        <div className="text-center flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {format(currentDate, 'yyyy년 M월 d일', { locale: ko })}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{dayOfWeek}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-slate-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewChange?.('month')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                currentView === 'month'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-900'
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
                  : 'text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-900'
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
                  : 'text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-900'
              )}
            >
              일간
            </button>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="flex overflow-y-auto bg-white dark:bg-black" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {/* Left Time Column - Fixed width (~80px) */}
        <div className="w-20 border-r border-slate-200 dark:border-gray-900 flex-shrink-0" style={{ height: `${49 * SLOT_HEIGHT}px`, minHeight: `${49 * SLOT_HEIGHT}px` }}>
          {/* 종일 row */}
          <div className="h-[40px] border-b border-slate-200 dark:border-gray-900 p-2 flex items-center">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">종일</div>
          </div>
          
          {/* Hour rows - 48 slots total */}
          {timeSlots.slice(1).map((slot, idx) => {
            // Only show label on first row of each hour (minute === 0)
            if (slot.minute === 0) {
              return (
                <div
                  key={idx}
                  className="h-[40px] border-b border-slate-200 dark:border-gray-900 p-2 flex items-start text-xs text-gray-600 dark:text-gray-400"
                >
                  {slot.label}
                </div>
              )
            } else {
              return (
                <div
                  key={idx}
                  className="h-[40px] border-b border-slate-200 dark:border-gray-900"
                />
              )
            }
          })}
        </div>

        {/* Right Grid - Scrollable with events */}
        <div className="flex-1 relative" style={{ minWidth: 0 }}>
          {/* Grid container - 종일 row + 48 time slots = 49 total */}
          <div className="relative" style={{ height: `${49 * SLOT_HEIGHT}px`, minHeight: `${49 * SLOT_HEIGHT}px` }}>
            {/* Grid rows - 1 for 종일 + 48 for time slots */}
            {timeSlots.map((slot, idx) => {
              const isClickable = slot.slotIndex >= 0
              return (
                <div
                  key={idx}
                  onClick={isClickable ? () => handleSlotClick(slot.slotIndex) : undefined}
                  className={cn(
                    'h-[40px] border-b border-slate-200 dark:border-gray-900 hover:bg-slate-50 dark:hover:bg-gray-900 transition-colors',
                    idx === 0 && 'border-b-2 border-slate-200 dark:border-gray-900',
                    isClickable && 'cursor-pointer'
                  )}
                />
              )
            })}

            {/* Render only selectedEvent */}
            {selectedEvent && (
              <div
                className="absolute left-2 right-2 bg-blue-600 text-white rounded-md px-2 py-1 text-xs font-medium flex items-center"
                style={getEventStyle(selectedEvent)}
              >
                {selectedEvent.title}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
