import React from 'react';
import { ScoreRingBadge } from '../../feedback/ScoreRingBadge';

interface QuestionReviewStatus {
    number: number;
    userAnswer?: string;
    correctAnswer?: string;
    isCorrect: boolean;
}

interface UnifiedReviewHeaderProps {
    questions: QuestionReviewStatus[];
    activeQuestionNumber: number;
    rawScore: number;
    totalQuestions: number;
    packageLabel: string;
    onSelectQuestion: (qNum: number) => void;
    onNextQuestion: () => void;
    onPrevQuestion: () => void;
}

export const UnifiedReviewHeader: React.FC<UnifiedReviewHeaderProps> = ({
    questions,
    activeQuestionNumber,
    rawScore,
    totalQuestions,
    packageLabel,
    onSelectQuestion,
    onNextQuestion,
    onPrevQuestion,
}) => {
  const parts = [
    { id: 1, range: [1, 10] },
    { id: 2, range: [11, 20] },
    { id: 3, range: [21, 30] },
    { id: 4, range: [31, 40] },
    { id: 5, range: [41, 50] },
];

const getChipStyle = (q: QuestionReviewStatus | undefined, isActive: boolean) => {
        if (isActive) return 'bg-teal-600 text-white border-2 border-white ring-2 ring-teal-500';
        if (!q || !q.userAnswer) return 'bg-slate-400 text-white border-slate-300';
        return q.isCorrect
        ? 'bg-teal-600/80 text-white border-teal-200 hover:bg-teal-600'
        : 'bg-rose-600/80 text-white border-rose-200 hover:bg-rose-600';
};

return (
        <header className="flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Brand & Package Title */}
        <div className="flex items-center gap-4">
            <img src="/assets/icon/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
            <div className="flex flex-col">
            <span className="font-outfit text-base font-bold text-slate-900 dark:text-white">
                Reading Comprehension Review
            </span>
            <span className="font-jakarta text-xs font-medium text-slate-500">
                {packageLabel}
            </span>
            </div>
        </div>

        {/* Part Grid Navigator (Parts 1-5) */}
        <div className="flex items-center gap-4">
            {parts.map((part) => (
            <div key={part.id} className="flex flex-col items-center gap-1">
                <span className="font-jakarta text-[10px] font-bold text-slate-700 dark:text-slate-300">
                PART {part.id}
                </span>
                <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 10 }, (_, i) => part.range[0] + i).map((qNum) => {
                    const q = questions.find((item) => item.number === qNum);
                    const isActive = qNum === activeQuestionNumber;

                    return (
                    <button
                        key={qNum}
                        type="button"
                        onClick={() => onSelectQuestion(qNum)}
                        className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-medium transition-all ${getChipStyle(
                        q,
                        isActive
                        )}`}
                    >
                        {qNum}
                    </button>
                    );
                })}
                </div>
            </div>
            ))}
        </div>

        {/* Controls: Score Ring & Next/Prev Controls */}
        <div className="flex items-center gap-4">
            <ScoreRingBadge rawScore={rawScore} totalQuestions={totalQuestions} />

            <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onPrevQuestion}
                disabled={activeQuestionNumber <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40"
            >
                ‹
            </button>
            <button
                type="button"
                onClick={onNextQuestion}
                disabled={activeQuestionNumber >= totalQuestions}
                className="flex h-10 items-center gap-2 rounded-xl bg-teal-600 px-4 font-jakarta text-sm font-semibold text-white transition-all hover:bg-teal-700 disabled:bg-teal-300"
            >
                Next ›
            </button>
            </div>
        </div>
        </header>
    );
};