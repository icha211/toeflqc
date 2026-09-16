import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Headphones, MessageCircle, Play, Search, UserRound, Users } from 'lucide-react';
import { useState } from 'react';
import type { DashboardSummary, PracticeItem } from '../../types/test';

interface SourceDashboardViewProps {
  dashboard: DashboardSummary | null;
  items: PracticeItem[];
  displayName: string;
  selectedDay: number;
  currentDate: Date;
  onSelectDay: (day: number) => void;
  onStart: (item: PracticeItem) => void;
  onShowGuide: () => void;
}

const modules = ['listening', 'structure', 'writing', 'reading'] as const;

function formatModule(module: string) {
  return module.charAt(0).toUpperCase() + module.slice(1);
}

function PartnerCard() {
  const [isNetworkVisible, setIsNetworkVisible] = useState(false);
  const [query, setQuery] = useState('');
  const showProfile = query.trim().toLowerCase() === 'user_ken';

  return (
    <article className={`source-dashboard__partner ${isNetworkVisible ? 'source-dashboard__partner--flipped' : ''}`} aria-label="Find your English partner">
      <div className="partner-card__inner">
        <section className="partner-card__face partner-card-front" aria-hidden={isNetworkVisible}>
          <div className="partner-content">
            <h2>Find Your English Partner</h2>
            <div className="partner-status-row"><p><span />User Online &amp; Matching</p><button type="button" onClick={() => setIsNetworkVisible(true)}>You have<br /><strong>50+ Connection</strong><ArrowRight size={11} /></button></div>
            <div className="partner-carousel"><button type="button" aria-label="Previous partner"><ChevronLeft size={17} /></button><div>{[0, 1, 2, 3, 4].map((index) => <span className={index === 2 ? 'is-active' : ''} key={index}><UserRound size={index === 2 ? 28 : 22} /></span>)}</div><button type="button" aria-label="Next partner"><ChevronRight size={17} /></button></div>
            <strong className="partner-match">Match Now</strong>
            <label className="partner-search"><Search size={12} /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search Now" aria-label="Search for a partner" /><ArrowRight size={12} /></label>
            {showProfile && <section className="partner-profile-popover"><div><span className="partner-profile-avatar">UK</span><p><strong>@user_ken</strong><small>Online · A2 · 100+ connections</small></p></div><div className="partner-tags"><span>#music</span><span>#anime</span></div><a href="https://discord.gg/APnzhYPFT8" target="_blank" rel="noreferrer">Request Match</a></section>}
          </div>
          <a className="partner-discord-link" href="https://discord.gg/APnzhYPFT8" target="_blank" rel="noreferrer">Talk with Your Friends Here <MessageCircle size={17} /></a>
        </section>
        <section className="partner-card__face partner-card-back" aria-hidden={!isNetworkVisible}>
          <div className="network-card-heading"><h3>Your Global Network</h3><p><Users size={15} /> 78</p><strong>Total Connection</strong></div>
          <div className="network-card-body"><div className="network-insights"><section><h4>Connection Breakdown <small>(CEFR Level)</small></h4><div className="network-bars">{[['A1', 4], ['A2', 17], ['B1', 27], ['B2', 23], ['C1', 4], ['C2', 4]].map(([level, height]) => <span key={String(level)}><b style={{ height: `${height}px` }} />{level}</span>)}</div></section><section><h4>Top Connecting Countries</h4><p>Japan <strong>12</strong></p><p>Brazil <strong>8</strong></p><p>Spain <strong>7</strong></p></section></div><section className="network-connections"><h4>List of Connections</h4>{['Yuki T.', 'Einiry P.', 'Carlos R.', 'Glacia E.'].map((name) => <span key={name}><UserRound size={16} />{name}<b>B1</b></span>)}</section></div>
          <button className="network-back-button" type="button" onClick={() => setIsNetworkVisible(false)}>Go Back to Matchmaking <ArrowRight size={12} /></button>
        </section>
      </div>
    </article>
  );
}

export function SourceDashboardView({
  dashboard,
  items,
  displayName,
  selectedDay,
  currentDate,
  onSelectDay,
  onStart,
  onShowGuide,
}: SourceDashboardViewProps) {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const dateLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(currentDate);
  const monthTitle = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate).toUpperCase();
  const previousLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(previousMonth).toUpperCase();
  const nextLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(nextMonth).toUpperCase();
  const currentScore = dashboard?.score.current;
  const targetScore = dashboard?.score.target;
  const progress = currentScore !== null && currentScore !== undefined && targetScore ? Math.min((currentScore / targetScore) * 100, 100) : 0;

  return (
    <div className="source-dashboard">
      <section className="source-dashboard__summary" aria-label="Study progress overview">
        <article className="source-dashboard__promo"><video src="/banner promo.mp4" autoPlay muted loop playsInline aria-label="Quick Check promotion" /></article>
        <article className="source-dashboard__profile"><header><span className="source-dashboard__avatar">{displayName.slice(0, 2).toUpperCase()}</span><div><h2>Welcome, {displayName} <span>👋</span></h2><small>See your study progress</small></div><button type="button">This month</button></header><div className="source-dashboard__profile-score"><span>Accumulate Score</span><strong>{currentScore ?? '—'}</strong></div><p>Test Taken</p><div className="source-dashboard__bars">{modules.map((module) => { const value = dashboard?.accuracy[module]; return <div key={module}><span>{formatModule(module)}</span><i><b style={{ width: `${value ?? 0}%` }} /></i><em>{value ?? '—'}{value !== null && value !== undefined ? '%' : ''}</em></div>; })}</div><footer>You have maintain good practice <button type="button">View report ↗</button></footer></article>
        <div className="source-dashboard__stack">
          <article className="source-dashboard__card source-dashboard__goal"><div><h2>Daily Goal</h2><span><BookOpen size={14} /> {items.length ? `${Math.min(items.length, 3)}/3` : '0/3'}</span></div><div className="source-dashboard__goal-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span className={index === ((currentDate.getDay() + 6) % 7) ? 'is-today' : ''} key={`${day}-${index}`}>{day}</span>)}</div></article>
          <article className="source-dashboard__card source-dashboard__level"><h2>Score / CEFR level</h2><div><strong>{currentScore ?? '—'}</strong><span>/ {currentScore === null || currentScore === undefined ? '—' : currentScore >= 543 ? 'B2' : currentScore >= 460 ? 'B1' : 'A2'}</span></div><small>{currentScore === null || currentScore === undefined ? 'Complete a mock test to assess your level' : 'Latest assessed total score'}</small></article>
        </div>
        <PartnerCard />
      </section>

      <section className="source-dashboard__calendar">
        <header className="source-dashboard__calendar-period"><span><ChevronLeft size={24} /> {previousLabel}</span><h2>{monthTitle}</h2><span>{nextLabel} <ChevronRight size={24} /></span></header>
        <div className="source-dashboard__calendar-layout">
          <aside className="source-dashboard__agenda"><h3>Upcoming agenda</h3>{items.slice(0, 4).map((item, index) => <article key={item.id}><strong>{index + 1} {dateLabel.split(' ')[0]}</strong><div><Headphones size={20} /><span>{item.title}<button type="button" onClick={() => onStart(item)}>Start test <Play size={13} /></button></span></div></article>)}{!items.length && <p>No published practice sets are available.</p>}<section><h4>Overall progress</h4><strong>{currentScore ?? '—'}</strong><span>{targetScore ? `Goal ${targetScore}` : 'Set a target after your first mock test'}</span><i><b style={{ width: `${progress}%` }} /></i></section></aside>
          <div className="source-dashboard__calendar-main"><header><div><span>{dateLabel.split(' ')[0].toUpperCase()}</span><strong>{selectedDay}</strong></div><h3>Daily schedule</h3><button type="button" onClick={onShowGuide}>TOEFL ITP 101</button></header><div className="source-dashboard__weekdays">{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => <span key={day}>{day}</span>)}</div><div className="source-dashboard__days">{Array.from({ length: firstDay }, (_, index) => <span className="is-placeholder" key={`empty-${index}`} />)}{Array.from({ length: daysInMonth }, (_, index) => { const day = index + 1; const isToday = day === currentDate.getDate(); const isMock = (day - 1) % 4 === 0; return <button type="button" className={`${selectedDay === day ? 'is-selected ' : ''}${isToday ? 'is-today ' : ''}${isMock ? 'is-mock' : ''}`} key={day} onClick={() => onSelectDay(day)}><strong>{day}</strong><small>{isMock ? 'Mock Test' : 'Recommended plan'}</small></button>; })}</div></div>
        </div>
      </section>
    </div>
  );
}
