export type ModuleName = 'listening' | 'structure' | 'writing' | 'reading';

export interface DashboardSummaryResponse {
  user: {
    displayName: string;
    plan: 'trial' | 'pro';
    trialDay: number;
    trialDays: number;
  };
  score: {
    current: number | null;
    target: number | null;
    projected: number | null;
  };
  accuracy: Record<ModuleName, number | null>;
  nextAction: {
    module: ModuleName | null;
    title: string | null;
    questions: number | null;
    minutes: number | null;
  };
}

export interface PracticeItemResponse {
  id: string;
  module: ModuleName;
  title: string;
  description: string;
  questions: number;
  minutes: number;
  accuracy: number | null;
}

export interface PracticeQuestionResponse {
  id: string;
  prompt: string;
  options: string[];
  module: ModuleName;
}

export interface PracticeSetResponse {
  id: string;
  title: string;
  module: ModuleName;
  questions: PracticeQuestionResponse[];
}

export interface CreateProblemSetPayload {
  title: string;
  module: ModuleName;
  description?: string;
  questions: number;
  minutes: number;
}

export interface SubmissionReviewResponse {
  submissionId: string;
  testId: string;
  questions: Array<{
    questionId: string;
    prompt: string;
    selectedOption: string | null;
    correctOption: string | null;
    explanation: string | null;
  }>;
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
