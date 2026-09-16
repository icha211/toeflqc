import { BarChart3, CalendarDays, Target } from 'lucide-react';

interface DashboardMetricsProps {
  currentScore: number | null;
  targetScore: number | null;
  trialDay: number;
  trialDays: number;
  readingAccuracy: number | null;
}

export function DashboardMetrics({
  currentScore,
  targetScore,
  trialDay,
  trialDays,
  readingAccuracy,
}: DashboardMetricsProps) {
  return (
    <section className="stats-grid">
      <article className="stat-card">
        <div className="stat-icon stat-icon--teal"><Target size={18} /></div>
        <span>Current estimate</span>
        <strong>{currentScore ?? '—'} <small>/ {targetScore ?? '—'}</small></strong>
        <p>{currentScore !== null ? 'Latest assessed score' : 'Complete a mock test to assess your score'}</p>
      </article>

      <article className="stat-card">
        <div className="stat-icon stat-icon--coral"><CalendarDays size={18} /></div>
        <span>Trial progress</span>
        <strong>{trialDay || '—'} <small>/ {trialDays || '—'} days</small></strong>
        <p>{trialDays > 0 ? `${Math.max(trialDays - trialDay, 0)} days remaining` : 'No active trial data'}</p>
      </article>

      <article className="stat-card">
        <div className="stat-icon stat-icon--blue"><BarChart3 size={18} /></div>
        <span>Reading accuracy</span>
        <strong>{readingAccuracy ?? '—'}<small>{readingAccuracy !== null ? '%' : ''}</small></strong>
        <p>{readingAccuracy !== null ? 'Based on completed reading practice' : 'Complete practice to measure accuracy'}</p>
      </article>
    </section>
  );
}
