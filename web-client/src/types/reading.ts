export interface ReadingQuestion {
    uid: string; // e.g. "1_34" (Passage 1, Question 34)
    passageId: number;
    questionNumber: number;
    questionText: string;
    rawQuestionText: string;
    options: Record<string, string>; // { A: "...", B: "..." }
    correctAnswer?: string;
    explanationId?: string;
    explanationEn?: string;
}

export interface ReadingPassage {
    id: number;
    title: string;
    content: string; // Formatted HTML or Markdown
    questions: ReadingQuestion[];
    }

export interface ReadingExamState {
    currentPassageId: number;
    answers: Record<string, string>; // { "1_34": "a" }
    timeRemainingSeconds: number;
    isSubmitted: boolean;
}