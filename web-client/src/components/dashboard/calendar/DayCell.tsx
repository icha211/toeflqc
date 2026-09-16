import React from 'react';
import { DayData } from './types';
import styles from './Calendar.module.css';

interface DayCellProps {
  day: DayData;
  isSelected: boolean;
  onSelect: (date: string) => void;
}

export const DayCell: React.FC<DayCellProps> = ({ day, isSelected, onSelect }) => {
  const classNames = [
    styles.dashboardDay,
    !day.isCurrentMonth && styles.muted,
    isSelected && styles.selected,
    day.isMockTestDay && styles.mockTestDay,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={() => day.isCurrentMonth && onSelect(day.date)}>
      <span className={styles.dashboardDayNumber}>{day.dayNumber}</span>

      {day.isMockTestDay && day.mockLabel && (
        <div className={`${styles.dashboardDayLabel} ${styles.labelMock}`}>
          {day.mockLabel}
        </div>
      )}

      {day.isRecommended && (
        <div className={`${styles.dashboardDayLabel} ${styles.labelRecommended}`}>
          <svg className={styles.labelSparkle} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      )}

      {day.tasks && day.tasks.length > 0 && (
        <div className={styles.taskQueue}>
          {day.tasks.map((task) => (
            <div
              key={task.id}
              className={`${styles.taskToken} ${task.status === 'completed' ? styles.done : ''}`}
              data-label={task.label || ''}
            >
              <img src={task.iconUrl} alt={task.module} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};