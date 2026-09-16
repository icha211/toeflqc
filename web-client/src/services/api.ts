import type { AiEvaluationResponse, CreateProblemSetRequest, DashboardSummary, PracticeItem, PracticeSet, SubmissionRequest, SubmissionReview } from '../types/test';
import { APP_CONFIG } from '../config/app-config';

const API_BASE_URL = APP_CONFIG.apiBaseUrl.replace(/\/$/, '');

async function request<T>(path: string, idToken: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  bootstrapAccount: (idToken: string) => request<{ isDeveloper: boolean }>('/api/v1/account/bootstrap', idToken, { method: 'POST' }),
  dashboard: (idToken: string) => request<DashboardSummary>('/api/v1/dashboard', idToken),
  practice: (idToken: string) => request<{ items: PracticeItem[] }>('/api/v1/practice', idToken),
  practiceSet: (idToken: string, setId: string) => request<PracticeSet>(`/api/v1/problem-sets/${encodeURIComponent(setId)}`, idToken),
  createProblemSet: (idToken: string, payload: CreateProblemSetRequest) =>
    request<{ id: string }>('/api/v1/problem-sets', idToken, { method: 'POST', body: JSON.stringify(payload) }),
  submit: (idToken: string, payload: SubmissionRequest) =>
    request<{ submissionId: string; status: string; answerCount: number }>('/api/v1/submissions', idToken, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  submissionReview: (idToken: string, submissionId: string) =>
    request<SubmissionReview>(`/api/v1/submissions/${encodeURIComponent(submissionId)}/review`, idToken),
  evaluateAi: (idToken: string, payload: { testId: string; answers: SubmissionRequest['answers']; module: string }) =>
    request<AiEvaluationResponse>('/api/v1/ai/evaluate', idToken, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
