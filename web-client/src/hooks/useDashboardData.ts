import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { api } from '../services/api';
import type { DashboardSummary, PracticeItem } from '../types/test';

interface DashboardDataState {
  dashboard: DashboardSummary | null;
  practiceItems: PracticeItem[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useDashboardData(user: User | null, isAuthLoading: boolean): DashboardDataState {
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [practiceItems, setPracticeItems] = useState<PracticeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      setDashboard(null);
      setPracticeItems([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const authenticatedUser = user;
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setError(null);
        const idToken = await authenticatedUser.getIdToken();
        const [dashboardResponse, practiceResponse] = await Promise.all([
          api.dashboard(idToken),
          api.practice(idToken),
        ]);

        if (!isMounted) {
          return;
        }

        setDashboard(dashboardResponse);
        setPracticeItems(practiceResponse.items);
      } catch (loadError) {
        console.error('Dashboard data load failed:', loadError);

        if (isMounted) {
          setError('Your learning data could not be loaded. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [isAuthLoading, reloadKey, user]);

  return { dashboard, practiceItems, isLoading, error, reload: () => setReloadKey((key) => key + 1) };
}
