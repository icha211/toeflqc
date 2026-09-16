import type { AiEvaluationResponse, DashboardSummary, PracticeItem, SubmissionRequest } from '../types/test';
import { APP_CONFIG } from '../config/app-config';

const API_BASE_URL = APP_CONFIG.apiBaseUrl.replace(/\/$/, '');

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    ...options,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  dashboard: () => request<DashboardSummary>('/api/v1/dashboard'),
  practice: () => request<{ items: PracticeItem[] }>('/api/v1/practice'),
  submit: (payload: SubmissionRequest) =>
    request<{ submissionId: string; status: string; answerCount: number }>('/api/v1/submissions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  evaluateAi: (payload: { testId: string; answers: SubmissionRequest['answers']; module: string }) =>
    request<AiEvaluationResponse>('/api/v1/ai/evaluate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
