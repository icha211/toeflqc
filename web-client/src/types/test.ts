export type ModuleName = 'listening' | 'structure' | 'writing' | 'reading';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  prompt: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  module: ModuleName;
}

export interface PracticeItem {
  id: string;
  module: ModuleName;
  title: string;
  description: string;
  questions: number;
  minutes: number;
  accuracy: number | null;
}

export interface PracticeSet {
  id: string;
  title: string;
  module: ModuleName;
  questions: Array<Required<Pick<Question, 'id' | 'prompt' | 'options' | 'module'>>>;
}

export interface CreateProblemSetRequest {
  title: string;
  module: ModuleName;
  description?: string;
  questions: number;
  minutes: number;
}

export interface DashboardSummary {
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

export interface SubmissionRequest {
  testId: string;
  answers: Array<{ questionId: string; selectedOption: string }>;
}

export interface SubmissionReview {
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

export interface AiEvaluationResponse {
  submissionId: string;
  status: 'queued' | 'completed';
  scoreBreakdown: Record<ModuleName, number>;
  weaknesses: Array<{ module: ModuleName; label: string; score: number; reason: string }>;
  recommendations: string[];
  explanationBlocks: Array<{ title: string; content: string; confidence: number }>;
  nextPracticePlan: Array<{ module: ModuleName; title: string; minutes: number; focus: string }>;
}
