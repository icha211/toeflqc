import React from 'react';
import { AgendaItemData, UserProgressData } from './types';
import styles from './Calendar.module.css';

interface AgendaPanelProps {
  agendaItems?: AgendaItemData[];
  progress?: UserProgressData;
}

const DEFAULT_AGENDA: AgendaItemData[] = [
  { id: '1', date: '2 Aug', title: 'Listening Practice Test', href: '/section-1', iconUrl: '/asset/figma/mock-listening.png' },
  { id: '2', date: '3 Aug', title: 'Structure Practice Test', href: '/section-2', iconUrl: '/asset/figma/mock-structure.png' },
  { id: '3', date: '4 Aug', title: 'Reading Practice Test', href: '/section-3', iconUrl: '/asset/figma/mock-reading.png' },
  { id: '4', date: '5 Aug', title: 'Listening Practice Test', href: '/section-1', iconUrl: '/asset/figma/mock-listening.png' },
];

const DEFAULT_PROGRESS: UserProgressData = {
  currentScore: 517,
  targetScore: 550,
  minScore: 310,
  maxScore: 550,
  progressPercent: 57,
};

export const AgendaPanel: React.FC<AgendaPanelProps> = ({
  agendaItems = DEFAULT_AGENDA,
  progress = DEFAULT_PROGRESS,
}) => {
  const pointsLeft = progress.targetScore - progress.currentScore;

  return (
    <aside className={styles.agendaPanel} aria-label="Upcoming agenda">
      <h3>UPCOMING AGENDA</h3>
      <div className={styles.agendaList}>
        {agendaItems.map((item) => (
          <article key={item.id} className={styles.agendaItem}>
            <strong>{item.date}</strong>
            <div className={styles.agendaItemMain}>
              <img src={item.iconUrl} alt="" />
              <div className={styles.agendaItemCopy}>
                <span>{item.title}</span>
                <a href={item.href}>
                  Start Test <i className="ti ti-arrow-narrow-right" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className={styles.agendaProgress} aria-label="Overall progress">
        <h4>OVERALL PROGRESS</h4>
        <div className={styles.agendaProgressScore}>
          <strong>{progress.currentScore}</strong>
          <span>accumulation score from Mock Test &amp; Practice Test</span>
        </div>
        <small>
          GOAL {progress.targetScore} <span>{pointsLeft} points to go</span>
        </small>
        <b>{progress.currentScore}</b>
        <div className={styles.agendaProgressBar}>
          <span style={{ width: `${progress.progressPercent}%` }} />
        </div>
        <small>
          <span>{progress.minScore}</span>
          <span>{progress.maxScore}</span>
        </small>
      </section>
    </aside>
  );
};