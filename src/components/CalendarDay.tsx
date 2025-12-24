import type { CalendarView } from './Calendar'
import { DayTimetable } from './calendar/DayTimetable'

interface CalendarDayProps {
  onViewChange?: (view: CalendarView) => void
  currentView?: CalendarView
  baseDate?: Date
  onBaseDateChange?: (date: Date) => void
}

export function CalendarDay({ onViewChange, currentView = 'day', baseDate, onBaseDateChange }: CalendarDayProps) {
  return <DayTimetable onViewChange={onViewChange} currentView={currentView} baseDate={baseDate} onBaseDateChange={onBaseDateChange} />
}

