export type TrialPlan = 'trial' | 'pro';

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  plan: TrialPlan;
  trialDay: number;
  trialDays: number;
}

export interface TrialState {
  isActive: boolean;
  currentDay: number;
  totalDays: number;
  paywallBlocked: boolean;
}
