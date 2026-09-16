import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UnifiedReviewHeader } from '../components/testing/review/UnifiedReviewHeader';
import { ReadingPassagePanel } from '../components/testing/modules/ReadingPassagePanel';
import { StructuredExplanationCard, ExplanationData } from '../components/testing/review/StructuredExplanationCard';
import { ReadingQuestionCard } from '../components/testing/feedback/ReadingQuestionCard';
import { ReadingPassage, ReadingQuestion } from '../types/reading';

export interface ReviewQuestionItem extends ReadingQuestion {
    userAnswer?: string;
    isCorrect: boolean;
    explanationData?: ExplanationData;
}

export const Section3ReviewView: React.FC = () => {
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();

  // State Management
const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
const [passages, setPassages] = useState<ReadingPassage[]>([]);
const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestionItem[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load Review Data (Mock or Firebase Hydration)
useEffect(() => {
    const fetchReviewData = async () => {
        setIsLoading(true);
    try {
        // Attempt local storage fallback or API fetch
        const rawResult = localStorage.getItem('toefl_section3_result');
        if (rawResult) {
            const parsed = JSON.parse(rawResult);
            setReviewQuestions(parsed.questions || []);
            setPassages(parsed.passages || []);
        }
    } catch (error) {
        console.error('Failed to load review data:', error);
    } finally {
        setIsLoading(false);
    }
};

fetchReviewData();
}, [id]);

  // Computed Values
const activeQuestion = reviewQuestions[activeQuestionIndex];
  
const activePassage = useMemo(() => {
    if (!activeQuestion) return null;
    return passages.find((p) => p.id === activeQuestion.passageId) || passages[0] || null;
}, [activeQuestion, passages]);

const rawScore = useMemo(() => {
    return reviewQuestions.filter((q) => q.isCorrect).length;
}, [reviewQuestions]);

  // Handlers
const handleSelectQuestion = (questionNumber: number) => {
    const targetIndex = reviewQuestions.findIndex((q) => q.questionNumber === questionNumber);
    if (targetIndex !== -1) {
        setActiveQuestionIndex(targetIndex);
    }
};

const handleNext = () => {
    if (activeQuestionIndex < reviewQuestions.length - 1) {
        setActiveQuestionIndex((prev) => prev + 1);
    }
};

const handlePrev = () => {
    if (activeQuestionIndex > 0) {
        setActiveQuestionIndex((prev) => prev - 1);
    }
};

if (isLoading) {
        return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
            <span className="font-jakarta text-sm font-semibold text-slate-600 dark:text-slate-300">
                Loading Section 3 Review...
            </span>
            </div>
        </div>
        );
}

if (!reviewQuestions.length || !activePassage || !activeQuestion) {
        return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900">
            <p className="font-jakarta text-base font-semibold text-slate-700 dark:text-slate-200">
            No review data found for Section 3.
            </p>
            <button
            type="button"
            onClick={() => navigate('/mock-tests')}
            className="rounded-xl bg-teal-600 px-5 py-2.5 font-jakarta text-sm font-semibold text-white transition-all hover:bg-teal-700"
            >
            Return to Tests
            </button>
        </div>
        );
    }

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f4f7fb] dark:bg-[#004b87]">
        {/* SaaS Review Navigation Topbar */}
        <UnifiedReviewHeader
            questions={reviewQuestions.map((q) => ({
            number: q.questionNumber,
            userAnswer: q.userAnswer,
            correctAnswer: q.correctAnswer,
            isCorrect: q.isCorrect,
            }))}
            activeQuestionNumber={activeQuestion.questionNumber}
            rawScore={rawScore}
            totalQuestions={reviewQuestions.length}
            packageLabel={`Package Review`}
            onSelectQuestion={handleSelectQuestion}
            onNextQuestion={handleNext}
            onPrevQuestion={handlePrev}
        />

        {/* Split Review Canvas (Passage Left + Question & Explanation Right) */}
        <main className="grid flex-1 min-h-0 w-full grid-cols-1 gap-4 p-4 lg:grid-cols-[calc(16cm+108px)_minmax(320px,1fr)]">
            {/* Left Pane: Synchronized Reading Passage */}
            <section className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <ReadingPassagePanel passage={activePassage} />
            </section>

            {/* Right Pane: Scrollable Question Details & Explanation Breakdown */}
            <section className="flex flex-col overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Status Badge Indicator */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <span
                className={`font-jakarta text-xs font-bold tracking-wider uppercase ${
                    activeQuestion.isCorrect
                    ? 'text-teal-600 dark:text-teal-400'
                    : activeQuestion.userAnswer
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-slate-400'
                }`}
                >
                {activeQuestion.isCorrect
                    ? 'CORRECT'
                    : activeQuestion.userAnswer
                    ? 'INCORRECT'
                    : 'UNANSWERED'}
                </span>
                <span className="font-jakarta text-xs font-semibold text-slate-400">
                Question {activeQuestion.questionNumber} of {reviewQuestions.length}
                </span>
            </div>

            {/* Interactive Question Card */}
            <ReadingQuestionCard
                question={activeQuestion}
                selectedOption={activeQuestion.userAnswer}
                onSelectOption={() => {}} // Read-only in review mode
                onUnselectOption={() => {}}
            />

            {/* Breakdown & Correct Answer Explanations */}
            {activeQuestion.explanationData ? (
                <StructuredExplanationCard data={activeQuestion.explanationData} />
            ) : (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
                No detailed explanation provided for this question.
                </div>
            )}
            </section>
        </main>
        </div>
    );
};

export default Section3ReviewView;