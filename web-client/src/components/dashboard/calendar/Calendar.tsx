// ==========================================
// Parent shell container
// ==========================================

import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { AgendaPanel } from './AgendaPanel';
import { DailyCalendar } from './DailyCalendar';
import styles from './Calendar.module.css';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 1)); // Default Aug 2026
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-01');

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleChangeMonthYear = (year: number, monthIndex: number) => {
    setCurrentDate(new Date(year, monthIndex, 1));
  };

  return (
    <section className={styles.monthPanel} aria-labelledby="monthPlannerHeading">
      <div className={styles.calendarLayoutShell}>
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <div className={styles.calendarMainLayout}>
          <AgendaPanel />
          <DailyCalendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onChangeMonthYear={handleChangeMonthYear}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;