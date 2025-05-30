import type React from "react"
import { useState, useEffect } from "react"
import styles from "./CustomCalendar.module.scss"

interface CustomCalendarProps {
  selectedDate: string
  onDateSelect: (date: string) => void
  onClose: () => void
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [showYearSelector, setShowYearSelector] = useState(false)

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate)
      setCurrentDate(date)
      setSelectedDay(date.getDate())
    }
  }, [selectedDate])

  const monthNames = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ]

  const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to be last (6)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateString = newDate.toISOString().split("T")[0]
    onDateSelect(dateString)
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDay(today.getDate())
    const dateString = today.toISOString().split("T")[0]
    onDateSelect(dateString)
  }

  const handleDelete = () => {
    setSelectedDay(null)
    onDateSelect("")
    onClose()
  }

  const handleYearClick = () => {
    setShowYearSelector(!showYearSelector)
  }

  const handleYearSelect = (year: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setFullYear(year)
      return newDate
    })
    setShowYearSelector(false)
  }

  const renderYearSelector = () => {
    const currentYear = currentDate.getFullYear()
    const years = []
    const startYear = currentYear - 10
    const endYear = currentYear + 10

    for (let year = startYear; year <= endYear; year++) {
      years.push(
        <button
          key={year}
          className={`${styles.yearOption} ${year === currentYear ? styles.selectedYear : ""}`}
          onClick={() => handleYearSelect(year)}
        >
          {year}
        </button>,
      )
    }

    return <div className={styles.yearSelector}>{years}</div>
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0)
    const daysInPrevMonth = prevMonth.getDate()

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <button
          key={`prev-${daysInPrevMonth - i}`}
          className={`${styles.day} ${styles.otherMonth}`}
          onClick={() => {
            navigateMonth("prev")
            setTimeout(() => handleDayClick(daysInPrevMonth - i), 0)
          }}
        >
          {daysInPrevMonth - i}
        </button>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDay === day &&
        selectedDate &&
        new Date(selectedDate).getMonth() === currentDate.getMonth() &&
        new Date(selectedDate).getFullYear() === currentDate.getFullYear()
      const isToday =
        new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

      days.push(
        <button
          key={day}
          className={`${styles.day} ${isSelected ? styles.selected : ""} ${isToday ? styles.today : ""}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </button>,
      )
    }

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (firstDay + daysInMonth)

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className={`${styles.day} ${styles.otherMonth}`}
          onClick={() => {
            navigateMonth("next")
            setTimeout(() => handleDayClick(day), 0)
          }}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className={styles.calendarModal} onClick={onClose}>
      <div className={styles.calendar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.calendarHeader}>
          <div className={styles.monthYear} onClick={handleYearClick}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()} г.
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.navigation}>
            <button onClick={() => navigateMonth("prev")} className={styles.navButton}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M4 5L8 1L12 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={() => navigateMonth("next")} className={styles.navButton}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 15L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M12 11L8 15L4 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {showYearSelector ? (
          renderYearSelector()
        ) : (
          <>
            <div className={styles.dayHeaders}>
              {dayNames.map((day) => (
                <div key={day} className={styles.dayHeader}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.daysGrid}>{renderCalendarDays()}</div>
          </>
        )}

        <div className={styles.calendarFooter}>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Удалить
          </button>
          <button className={styles.todayButton} onClick={handleToday}>
            Сегодня
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomCalendar