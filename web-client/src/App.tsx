import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BarChart3, BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, Headphones, LayoutDashboard, LogOut, Menu, PenLine, Play, Settings, Sparkles, Target, X } from 'lucide-react';
import { api } from './services/api';
import type { DashboardSummary, PracticeItem } from './types/test';

const moduleMeta: Record<string, { icon: typeof Headphones; tone: string }> = {
  listening: { icon: Headphones, tone: 'teal' },
  structure: { icon: PenLine, tone: 'coral' },
  reading: { icon: BookOpen, tone: 'blue' },
  writing: { icon: PenLine, tone: 'amber' },
};

function App() {
	const [activeNav, setActiveNav] = useState('Dashboard');
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [selectedDay, setSelectedDay] = useState(14);
	const [toast, setToast] = useState('');
	const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
	const [practiceItems, setPracticeItems] = useState<PracticeItem[]>([]);
	const [loading, setLoading] = useState(true);

  	useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [dashboardResponse, practiceResponse] = await Promise.all([
          api.dashboard(),
          api.practice(),
        ]);

        if (!isMounted) return;
        setDashboard(dashboardResponse);
        setPracticeItems(practiceResponse.items ?? []);
      } catch (error) {
        console.error('Data load failed:', error);
        setToast('Using local demo data while the API is unavailable.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigation = useMemo(
    () => [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Mock tests', icon: Target },
      { label: 'Practice library', icon: BookOpen },
      { label: 'My progress', icon: BarChart3 },
    ],
    [],
  );

  const schedule = useMemo(() => {
    if (!practiceItems.length) {
      return [
        { module: 'listening', title: 'Part 1: short conversations', detail: '20 questions · 18 min', progress: 62 },
        { module: 'structure', title: 'Subject and verb agreement', detail: '20 questions · 15 min', progress: 70 },
        { module: 'reading', title: 'Passage 02: ecology', detail: '10 questions · 22 min', progress: 76 },
      ];
    }

    return practiceItems.map((item) => ({
      module: item.module,
      title: item.title,
      detail: `${item.questions} questions · ${item.minutes} min`,
      progress: item.accuracy,
    }));
  }, [practiceItems]);

  const projectedScore = dashboard?.score.projected ?? 583;
  const currentScore = dashboard?.score.current ?? 583;
  const trialDay = dashboard?.user.trialDay ?? 2;
  const trialDays = dashboard?.user.trialDays ?? 4;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">Q</span>
          <span>Quick Check</span>
        </div>

        <div className="workspace-switcher">
          <span className="workspace-avatar">QC</span>
          <span>
            <strong>TOEFL workspace</strong>
            <small>Trial · Day {trialDay} of {trialDays}</small>
          </span>
          <ChevronRight size={16} />
        </div>

        <nav aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navigation.map(({ label, icon: Icon }) => (
            <button
              className={`nav-item ${activeNav === label ? 'nav-item--active' : ''}`}
              key={label}
              onClick={() => {
                setActiveNav(label);
                setSidebarOpen(false);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === 'Mock tests' && <span className="nav-badge">1</span>}
            </button>
          ))}

          <p className="nav-label nav-label--spaced">Manage</p>
          <button
            className={`nav-item ${activeNav === 'Developer' ? 'nav-item--active' : ''}`}
            onClick={() => setActiveNav('Developer')}
          >
            <Settings size={18} />
            <span>Developer console</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="profile-row">
            <span className="profile-avatar">CU</span>
            <span>
              <strong>{dashboard?.user.displayName ?? 'Culaccino_'}</strong>
              <small>{dashboard?.user.plan === 'trial' ? 'Free trial' : 'Pro plan'}</small>
            </span>
            <button aria-label="Sign out" onClick={() => setToast('Sign out is connected to Firebase Auth in production.')}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="icon-button menu-button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>

          <div>
            <span className="breadcrumb">Workspace / </span>
            <strong>{activeNav}</strong>
          </div>

          <div className="topbar-actions">
            <button className="icon-button" aria-label="Open calendar" onClick={() => setToast('Your study calendar is up to date.')}>
              <CalendarDays size={19} />
            </button>
            <button className="topbar-avatar" aria-label="Open profile">CU</button>
          </div>
        </header>

        <div className="page-wrap">
          <section className="page-heading">
            <div>
              <p className="eyebrow">Tuesday, October 14, 2026</p>
              <h1>
                Good morning, {dashboard?.user.displayName ?? 'Culaccino'}
                <span>.</span>
              </h1>
              <p className="muted">Your next best step is ready. Keep the streak moving.</p>
            </div>
            <button className="button button--dark" onClick={() => setToast('Opening the full mock test setup.')}>
              <Play size={16} />
              Start a mock test
            </button>
          </section>

          <section className="hero-panel">
            <div className="hero-copy">
              <div className="sparkle">
                <Sparkles size={17} />
              </div>
              <p className="eyebrow">AI study signal</p>
              <h2>Build your score from the weakest link.</h2>
              <p>
                {dashboard?.nextAction.module ?? 'Listening'} is currently your highest-impact opportunity. Today’s plan is tuned to move accuracy from {dashboard?.accuracy.listening ?? 62}% toward 75%.
              </p>
              <button className="text-button" onClick={() => setToast('Showing your diagnostic report.')}>
                <span>View diagnostic report</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="hero-score">
              <span>Projected score</span>
              <strong>{projectedScore}</strong>
              <div className="score-line">
                <span style={{ width: `${Math.min((projectedScore / (dashboard?.score.target ?? 677)) * 100, 100)}%` }} />
              </div>
              <small>+42 points possible</small>
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon stat-icon--teal">
                <Target size={18} />
              </div>
              <span>Current estimate</span>
              <strong>
                {currentScore} <small>/ 677</small>
              </strong>
              <p>
                <b className="positive">+12</b> since last test
              </p>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon--coral">
                <CalendarDays size={18} />
              </div>
              <span>Trial progress</span>
              <strong>
                {trialDay} <small>/ {trialDays} days</small>
              </strong>
              <p>{trialDays - trialDay} days remaining</p>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon--blue">
                <BarChart3 size={18} />
              </div>
              <span>Weekly accuracy</span>
              <strong>
                {Math.round((dashboard?.accuracy.reading ?? 76) * 0.9)}<small>%</small>
              </strong>
              <p>
                <b className="positive">+8%</b> this week
              </p>
            </article>
          </section>

          <div className="content-grid">
            <section className="panel plan-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Today’s plan</p>
                  <h2>Small steps, measurable gains</h2>
                </div>
                <button className="icon-button" aria-label="Open plan settings" onClick={() => setToast('Plan settings are coming from your saved preferences.')}>
                  <Settings size={18} />
                </button>
              </div>

              <div className="task-list">
                {schedule.map((task) => {
                  const Icon = moduleMeta[task.module]?.icon ?? Headphones;
                  const tone = moduleMeta[task.module]?.tone ?? 'teal';

                  return (
                    <article className="task-row" key={task.title}>
                      <div className={`task-icon task-icon--${tone}`}>
                        <Icon size={19} />
                      </div>

                      <div className="task-copy">
                        <div>
                          <strong>{task.title}</strong>
                          <span className="task-module">{task.module}</span>
                        </div>
                        <p>{task.detail}</p>
                        <div className="mini-progress">
                          <span style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>

                      <button className="task-action" aria-label={`Start ${task.module} practice`} onClick={() => setToast(`Starting ${task.module} practice.`)}>
                        <ArrowRight size={18} />
                      </button>
                    </article>
                  );
                })}
              </div>

              <button className="button button--outline full-width" onClick={() => setToast('All practice sets are ready in the library.')}>
                <BookOpen size={16} />
                Browse practice library
              </button>
            </section>

            <section className="panel calendar-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">October 2026</p>
                  <h2>Study calendar</h2>
                </div>
                <div className="calendar-controls">
                  <button className="icon-button" aria-label="Previous month">
                    <ChevronLeft size={17} />
                  </button>
                  <button className="icon-button" aria-label="Next month">
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>

              <div className="weekdays">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <span key={`${day}-${index}`}>{day}</span>
                ))}
              </div>

              <div className="calendar-grid">
                {Array.from({ length: 31 }, (_, index) => {
                  const day = index + 1;
                  const status = day < 12 ? 'done' : day === 14 ? 'today' : day === 15 ? 'next' : '';
                  return (
                    <button
                      className={`day-cell ${status} ${selectedDay === day ? 'selected' : ''}`}
                      key={day}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day}
                      {status === 'done' && <Check size={11} />}
                    </button>
                  );
                })}
              </div>

              <div className="calendar-note">
                <span className="status-dot status-dot--teal" />
                Day {selectedDay}: {selectedDay <= 12 ? 'completed' : selectedDay === 14 ? 'targeted practice' : 'available study day'}
              </div>
            </section>
          </div>

          <footer className="page-footer">
            <span>Quick Check · TOEFL ITP progress workspace</span>
            <span>{loading ? 'Loading dashboard…' : 'Last synced just now'}</span>
          </footer>
        </div>
      </main>

      {sidebarOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      {toast && (
        <div className="toast" role="status">
          <Check size={16} />
          {toast}
          <button aria-label="Dismiss" onClick={() => setToast('')}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
