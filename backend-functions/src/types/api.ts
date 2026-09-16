export type ModuleName = 'listening' | 'structure' | 'writing' | 'reading';

export interface DashboardSummaryResponse {
  user: {
    displayName: string;
    plan: 'trial' | 'pro';
    trialDay: number;
    trialDays: number;
  };
  score: {
    current: number;
    target: number;
    projected: number;
  };
  accuracy: Record<ModuleName, number>;
  nextAction: {
    module: ModuleName;
    title: string;
    questions: number;
    minutes: number;
  };
}

export interface PracticeItemResponse {
  id: string;
  module: ModuleName;
  title: string;
  description: string;
  questions: number;
  minutes: number;
  accuracy: number;
}

export interface SubmissionPayload {
  testId: string;
  answers: Array<{ questionId: string; selectedOption: string }>;
}

export interface AiEvaluationPayload {
  testId: string;
  answers: Array<{ questionId: string; selectedOption: string }>;
  module: ModuleName | string;
}

export interface AiEvaluationResponse {
  submissionId: string;
  status: 'queued' | 'completed';
  scoreBreakdown: Record<ModuleName, number>;
  weaknesses: Array<{ module: ModuleName; label: string; score: number; reason: string }>;
  recommendations: string[];
  explanationBlocks: Array<{ title: string; content: string; confidence: number }>;
  nextPracticePlan: Array<{ module: ModuleName; title: string; minutes: number; focus: string }>;
}
