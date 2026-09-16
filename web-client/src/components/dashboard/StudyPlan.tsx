import { ArrowRight, BookOpen, Headphones, PenLine, Settings } from 'lucide-react';
import type { PracticeItem } from '../../types/test';

const moduleMeta = {
  listening: { icon: Headphones, tone: 'teal' },
  structure: { icon: PenLine, tone: 'coral' },
  reading: { icon: BookOpen, tone: 'blue' },
  writing: { icon: PenLine, tone: 'amber' },
};

interface StudyPlanProps {
  items: PracticeItem[];
  onStart: (item: PracticeItem) => void;
  onBrowse: () => void;
  onSettings: () => void;
}

export function StudyPlan({ items, onStart, onBrowse, onSettings }: StudyPlanProps) {
  return (
    <section className="panel plan-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Today’s plan</p>
          <h2>Small steps, measurable gains</h2>
        </div>
        <button className="icon-button" aria-label="Open plan settings" onClick={onSettings}>
          <Settings size={18} />
        </button>
      </div>

      {items.length ? (
        <div className="task-list">
          {items.map((item) => {
            const { icon: Icon, tone } = moduleMeta[item.module];
            return (
              <article className="task-row" key={item.id}>
                <div className={`task-icon task-icon--${tone}`}><Icon size={19} /></div>
                <div className="task-copy">
                  <div><strong>{item.title}</strong><span className="task-module">{item.module}</span></div>
                  <p>{item.questions} questions · {item.minutes} min</p>
                  <div className="mini-progress"><span style={{ width: `${item.accuracy ?? 0}%` }} /></div>
                </div>
                <button className="task-action" aria-label={`Start ${item.module} practice`} onClick={() => onStart(item)}>
                  <ArrowRight size={18} />
                </button>
              </article>
            );
          })}
        </div>
      ) : <p className="empty-state">No published practice sets are available yet.</p>}

      <button className="button button--outline full-width" onClick={onBrowse}>
        <BookOpen size={16} />
        Browse practice library
      </button>
    </section>
  );
}
