import React, { useState } from 'react';
import styles from './Calendar.module.css';

interface MonthPickerPopoverProps {
  isOpen: boolean;
  currentDate: Date;
  onSelectMonthYear: (year: number, monthIndex: number) => void;
  onClose: () => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthPickerPopover: React.FC<MonthPickerPopoverProps> = ({
  isOpen,
  currentDate,
  onSelectMonthYear,
}) => {
  const [pickerYear, setPickerYear] = useState<number>(currentDate.getFullYear());

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.monthPickerPopover} ${styles.isOpen}`}
      id="monthPickerPopover"
      role="dialog"
      aria-label="Choose month and year"
    >
      <div className={styles.monthPickerHeader}>
        <h3 className={styles.monthPickerYear} id="monthPickerYear">{pickerYear}</h3>
        <div className={styles.monthPickerYearNav}>
          <button
            type="button"
            id="previousPickerYear"
            aria-label="Previous year"
            onClick={() => setPickerYear((prev) => prev - 1)}
          >
            <i className="ti ti-chevron-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            id="nextPickerYear"
            aria-label="Next year"
            onClick={() => setPickerYear((prev) => prev + 1)}
          >
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className={styles.monthPickerLabel}>Month</p>
      <div className={styles.monthPickerGrid} id="monthPickerGrid">
        {MONTH_NAMES.map((name, index) => {
          const isActive = currentDate.getFullYear() === pickerYear && currentDate.getMonth() === index;
          return (
            <button
              key={name}
              type="button"
              className={`${styles.monthPickerOption} ${isActive ? styles.active : ''}`}
              onClick={() => onSelectMonthYear(pickerYear, index)}
            >
              <span>{name}</span>
              <i className="ti ti-chevron-right" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
};