import React, { useState } from 'react';
import { DayData } from './types';
import { DayCell } from './DayCell';
import { MonthPickerPopover } from './MonthPickerPopover';
import styles from './Calendar.module.css';

interface DailyCalendarProps {
  currentDate: Date;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onChangeMonthYear: (year: number, monthIndex: number) => void;
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const DailyCalendar: React.FC<DailyCalendarProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
  onChangeMonthYear,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Selected date parsing
  const parsedSelected = new Date(selectedDate);
  const selectedDayNum = parsedSelected.getDate() || 1;

  const monthAbbr = currentDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  // Grid calculation
  const generateMonthDays = (): DayData[] => {
    const days: DayData[] = [];
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Leading padding days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      days.push({
        date: `prev-${dayNum}`,
        dayNumber: dayNum,
        isCurrentMonth: false,
        tasks: [],
      });
    }

    // Active month days
    for (let d = 1; d <= totalDays; d++) {
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(d).padStart(2, '0');
      const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

      const isMock = d === 1; // Example setup matching HTML mock highlight
      days.push({
        date: dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isMockTestDay: isMock,
        mockLabel: isMock ? 'MOCK TEST' : undefined,
        tasks: [
          { id: `t1-${d}`, module: 'listening', status: 'completed', iconUrl: '/asset/figma/mock-listening.png' },
          { id: `t2-${d}`, module: 'structure', status: 'pending', iconUrl: '/asset/figma/mock-structure.png' },
        ],
      });
    }

    // Trailing padding days for complete 7-column rows
    const totalCells = Math.ceil(days.length / 7) * 7;
    const trailingCount = totalCells - days.length;
    for (let j = 1; j <= trailingCount; j++) {
      days.push({
        date: `next-${j}`,
        dayNumber: j,
        isCurrentMonth: false,
        tasks: [],
      });
    }

    return days;
  };

  const daysGrid = generateMonthDays();

  return (
    <div className={styles.dailyCalendarBlock} aria-label="Daily calendar">
      <div className={styles.calendarHead}>
        <div className={styles.calendarDateRow}>
          <div className={styles.calendarDatePicker}>
            <button
              className={styles.calendarDateBadge}
              type="button"
              id="calendarDateBadge"
              aria-label="Choose month and year"
              aria-expanded={isPickerOpen}
              aria-controls="monthPickerPopover"
              onClick={() => setIsPickerOpen((prev) => !prev)}
            >
              <span className={styles.calendarDateBadgeMonth} id="dashboardBadgeMonth">{monthAbbr}</span>
              <span className={styles.calendarDateBadgeDay} id="dashboardBadgeDay">{selectedDayNum}</span>
            </button>

            <MonthPickerPopover
              isOpen={isPickerOpen}
              currentDate={currentDate}
              onSelectMonthYear={(y, m) => {
                onChangeMonthYear(y, m);
                setIsPickerOpen(false);
              }}
              onClose={() => setIsPickerOpen(false)}
            />
          </div>
          <div className={styles.calendarDateCopy}>
            <div className={styles.calendarTitle}>DAILY SCHEDULE</div>
          </div>
        </div>
      </div>

      <div className={styles.calendarWeekdays}>
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className={styles.dashboardCalendarGrid} id="dashboardCalendarGrid">
        {daysGrid.map((day) => (
          <DayCell
            key={day.date}
            day={day}
            isSelected={day.date === selectedDate}
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
};