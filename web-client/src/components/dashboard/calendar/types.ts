export type ModuleType = 'listening' | 'structure' | 'reading';
export type TaskStatus = 'pending' | 'completed';

export interface TaskTokenData {
  id: string;
  module: ModuleType;
  status: TaskStatus;
  label?: string;
  iconUrl: string;
}

export interface DayData {
  date: string; // ISO string "YYYY-MM-DD"
  dayNumber: number;
  isCurrentMonth: boolean;
  isMockTestDay?: boolean;
  mockLabel?: string;
  isRecommended?: boolean;
  tasks: TaskTokenData[];
}

export interface AgendaItemData {
  id: string;
  date: string;
  title: string;
  href: string;
  iconUrl: string;
}

export interface UserProgressData {
  currentScore: number;
  targetScore: number;
  minScore: number;
  maxScore: number;
  progressPercent: number;
}