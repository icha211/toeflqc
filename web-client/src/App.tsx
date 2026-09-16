import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ArrowRight, BarChart3, Bell, BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, LayoutDashboard, LogIn, LogOut, Menu, PanelLeftClose, PanelLeftOpen, PenLine, Play, Settings, Sparkles, Target, X } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { DashboardMetrics } from './components/dashboard/DashboardMetrics';
import { SourceDashboardView } from './components/dashboard/SourceDashboardView';
import { StudyPlan } from './components/dashboard/StudyPlan';
import { PracticeSession } from './components/testing/PracticeSession';
import { WorkspacePanels } from './components/workspace/WorkspacePanels';
import { AuthModal } from './components/auth/AuthModal';
import { useDashboardData } from './hooks/useDashboardData';
import { api } from './services/api';
import type { PracticeItem } from './types/test';

function App() {
  const { user, isLoading: isAuthLoading, isDeveloper, configurationError, signInWithEmail, registerWithEmail, resetPassword, signInWithGoogle, refreshClaims, signOutUser } = useAuth();
	const [activeNav, setActiveNav] = useState('Dashboard');
	const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());
	const [toast, setToast] = useState('');
  const [accountBootstrapError, setAccountBootstrapError] = useState<string | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [activePracticeItem, setActivePracticeItem] = useState<PracticeItem | null>(null);
  const { dashboard, practiceItems, isLoading: loading, error: loadError, reload } = useDashboardData(user, isAuthLoading);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!user) return;
    const authenticatedUser = user;

    async function bootstrapAccount() {
      try {
        await api.bootstrapAccount(await authenticatedUser.getIdToken());
        await refreshClaims();
        setAccountBootstrapError(null);
      } catch (bootstrapError) {
        console.error('Account bootstrap failed:', bootstrapError);
        setAccountBootstrapError('Developer activation needs Firebase Admin credentials in backend-functions/.env.');
      }
    }

    void bootstrapAccount();
  }, [refreshClaims, user]);

  const navigation = useMemo(
    () => [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Daily practice', icon: CalendarDays },
      { label: 'Mock tests', icon: Target },
      { label: 'Practice library', icon: BookOpen },
      { label: 'My progress', icon: BarChart3 },
    ],
    [],
  );

  const projectedScore = dashboard?.score.projected ?? null;
  const currentScore = dashboard?.score.current ?? null;
  const targetScore = dashboard?.score.target ?? null;
  const trialDay = dashboard?.user.trialDay ?? 0;
  const trialDays = dashboard?.user.trialDays ?? 0;
  const listeningAccuracy = dashboard?.accuracy.listening ?? null;
  const readingAccuracy = dashboard?.accuracy.reading ?? null;
  const displayName = dashboard?.user.displayName ?? user?.displayName ?? user?.email ?? 'Learner';
  const userStateMessage = configurationError ?? loadError ?? (!user && !isAuthLoading ? 'Sign in to load your personal study plan.' : null);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const dateLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(currentDate);
  const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);

  const handleAccountAction = async () => {
    try {
      if (user) {
        await signOutUser();
      } else {
        setIsAccountModalOpen(true);
      }
    } catch (error) {
      console.error('Authentication action failed:', error);
      setToast('Authentication could not be completed. Please try again.');
    }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''} ${sidebarCollapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="brand">
          <img className="brand-mark" src="/login-logo-mark.png" alt="Quick Check" />
          <img className="brand-wordmark" src="/login-logo-wordmark.png" alt="Quick Check" />
          <button className="sidebar-collapse" aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}>
            {sidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>
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

          <p className="nav-label nav-label--spaced">Skills</p>
          {[
            { label: 'Listening', icon: Play },
            { label: 'Structure', icon: Settings },
            { label: 'Writing', icon: PenLine },
            { label: 'Reading', icon: BookOpen },
          ].map(({ label, icon: Icon }) => (
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
              <strong>{displayName}</strong>
              <small>{dashboard ? (dashboard.user.plan === 'trial' ? 'Free trial' : 'Pro plan') : user ? 'Signed in · profile syncing' : 'Not signed in'}</small>
            </span>
            <button aria-label={user ? 'Sign out' : 'Sign in'} onClick={handleAccountAction}>
              {user ? <LogOut size={16} /> : <LogIn size={16} />}
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-brand">
            <button className="icon-button menu-button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
          </div>
          <nav className="topbar-switcher" aria-label="Workspace view">
            <button className="topbar-switcher__active"><LayoutDashboard size={14} /> TOEFL ITP Dashboard</button>
            <button onClick={() => setActiveNav('Practice library')}><BookOpen size={14} /> English Materials</button>
          </nav>
          <div className="topbar-actions">
            <button className="topbar-upgrade" onClick={() => setToast('Subscription upgrades will be connected to billing.')}>Upgrade</button>
            <button className="topbar-action" aria-label="Settings"><Settings size={17} /></button>
            <button className="topbar-action" aria-label="Notifications"><Bell size={17} /></button>
            <button className="topbar-avatar" aria-label="Open profile">{displayName.slice(0, 2).toUpperCase()}</button>
          </div>
        </header>

        <div className="page-wrap">
          {activeNav !== 'Dashboard' ? (
            <WorkspacePanels
              activeView={activeNav}
              items={practiceItems}
              canManageContent={isDeveloper}
              onStart={(item) => {
                if (!user) {
                  setToast('Sign in before starting practice.');
                  return;
                }
                setActivePracticeItem(item);
              }}
              onCreateProblemSet={async (payload) => {
                if (!user) throw new Error('Authentication required');
                await api.createProblemSet(await user.getIdToken(), payload);
                reload();
                setToast('Problem set published. Add questions in the next editor step.');
              }}
            />
          ) : <>
          {accountBootstrapError && <p className="data-state" role="alert">{accountBootstrapError}</p>}
          <SourceDashboardView
            dashboard={dashboard}
            items={practiceItems}
            displayName={displayName}
            selectedDay={selectedDay}
            currentDate={currentDate}
            onSelectDay={setSelectedDay}
            onStart={(item) => {
              if (!user) {
                setToast('Sign in before starting practice.');
                return;
              }
              setActivePracticeItem(item);
            }}
            onShowGuide={() => setToast('TOEFL ITP has three sections, 140 questions, and a 115-minute total duration.')}
          />
          <div className="legacy-dashboard">
          <section className="page-heading">
            <div>
              <p className="eyebrow">{dateLabel}</p>
              <h1>
                Good morning, {displayName}
                <span>.</span>
              </h1>
              <p className="muted">Your next best step is ready. Keep the streak moving.</p>
            </div>
            <button className="button button--dark" onClick={() => setToast('Opening the full mock test setup.')}>
              <Play size={16} />
              Start a mock test
            </button>
          </section>

          {userStateMessage && <p className="data-state" role="status">{userStateMessage}</p>}

          {!user && !isAuthLoading && !configurationError && (
            <button className="button button--dark sign-in-button" onClick={handleAccountAction}>
              <LogIn size={16} />
              Sign in with Google
            </button>
          )}

          <section className="hero-panel">
            <div className="hero-copy">
              <div className="sparkle">
                <Sparkles size={17} />
              </div>
              <p className="eyebrow">AI study signal</p>
              <h2>Build your score from the weakest link.</h2>
              <p>{dashboard?.nextAction.module && listeningAccuracy !== null
                ? `${dashboard.nextAction.module} is currently your highest-impact opportunity. Today’s plan is tuned to move accuracy from ${listeningAccuracy}% toward your target.`
                : 'Complete your first diagnostic to generate a personal AI study plan.'}
              </p>
              <button className="text-button" onClick={() => setToast('Showing your diagnostic report.')}>
                <span>View diagnostic report</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="hero-score">
              <span>Projected score</span>
              <strong>{projectedScore ?? '—'}</strong>
              <div className="score-line">
                <span style={{ width: `${projectedScore !== null && targetScore !== null && targetScore > 0 ? Math.min((projectedScore / targetScore) * 100, 100) : 0}%` }} />
              </div>
              <small>{targetScore !== null ? `Target score: ${targetScore}` : 'Complete a mock test to set a projection'}</small>
            </div>
          </section>

          <DashboardMetrics
            currentScore={currentScore}
            targetScore={targetScore}
            trialDay={trialDay}
            trialDays={trialDays}
            readingAccuracy={readingAccuracy}
          />

          <div className="content-grid">
            <StudyPlan
              items={practiceItems}
              onStart={(item) => {
                if (!user) {
                  setToast('Sign in before starting practice.');
                  return;
                }
                setActivePracticeItem(item);
              }}
              onBrowse={() => setToast('All practice sets are ready in the library.')}
              onSettings={() => setToast('Plan settings are coming from your saved preferences.')}
            />

            <section className="panel calendar-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">{monthLabel}</p>
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
                {Array.from({ length: daysInCurrentMonth }, (_, index) => {
                  const day = index + 1;
                  const status = day === currentDay ? 'today' : '';
                  return (
                    <button
                      className={`day-cell ${status} ${selectedDay === day ? 'selected' : ''}`}
                      key={day}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="calendar-note">
                <span className="status-dot status-dot--teal" />
                {selectedDay === currentDay ? 'Today: choose a practice set to begin.' : `Day ${selectedDay}: available study day`}
              </div>
            </section>
          </div>

          <footer className="page-footer">
            <span>Quick Check · TOEFL ITP progress workspace</span>
            <span>{loading ? 'Loading dashboard…' : 'Last synced just now'}</span>
          </footer>
          </div>
          </>}
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
      {activePracticeItem && user && <PracticeSession item={activePracticeItem} user={user} onClose={() => setActivePracticeItem(null)} />}
      {isAccountModalOpen && <AuthModal
        onClose={() => setIsAccountModalOpen(false)}
        onLogin={signInWithEmail}
        onRegister={registerWithEmail}
        onGoogle={signInWithGoogle}
        onResetPassword={resetPassword}
      />}
    </div>
  );
}

export default App;
