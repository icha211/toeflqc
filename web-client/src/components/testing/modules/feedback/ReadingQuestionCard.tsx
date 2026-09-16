import React from 'react';
import { ReadingQuestion } from '../../../types/reading';

interface ReadingQuestionCardProps {
    question: ReadingQuestion;
    selectedOption?: string;
    onSelectOption: (optionKey: string) => void;
    onUnselectOption: () => void;
}

export const ReadingQuestionCard: React.FC<ReadingQuestionCardProps> = ({
    question,
    selectedOption,
    onSelectOption,
    onUnselectOption,
}) => {
    const isAnswered = Boolean(selectedOption);

    const handleDoubleClick = (optKey: string) => {
        if (selectedOption === optKey) {
        onUnselectOption();
        }
    };

    return (
        <div
        id={`q-container-${question.uid}`}
        className={`mb-4 flex w-full flex-col gap-3 rounded-lg border p-6 transition-all duration-200 ${
            isAnswered
            ? 'border-[#8eb4da] bg-sky-50/50 shadow-sm dark:border-[#0ea5e9] dark:bg-[#003560]/80'
            : 'border-[#edf2f7] bg-white dark:border-[#1e5fa0] dark:bg-[#003560]'
        }`}
        >
        {/* Question Stem Header */}
        <div className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-6">
            {/* Index Pill */}
            <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg border font-serif text-lg font-normal transition-all ${
                isAnswered
                ? 'border-white bg-[#003560] text-white shadow-md dark:border-white dark:bg-[#0ea5e9]'
                : 'border-[#bfd7ef] bg-white text-[#003560] dark:border-[#7cc4ff] dark:bg-[#003560] dark:text-white'
            }`}
            >
            {question.questionNumber}
            </div>

            {/* Question Text Stem */}
            <h3 className="font-serif text-[18px] leading-relaxed text-slate-900 dark:text-white">
            {question.questionText}
            </h3>
        </div>

        {/* Multiple Choice Radio Group */}
        <div className="flex w-full flex-col gap-2 pt-2">
            {Object.entries(question.options).map(([key, text]) => {
            const isSelected = selectedOption?.toLowerCase() === key.toLowerCase();

            return (
                <label
                key={key}
                onDoubleClick={() => handleDoubleClick(key.toLowerCase())}
                onClick={() => onSelectOption(key.toLowerCase())}
                className="flex min-h-[50px] w-full cursor-pointer items-center gap-8 rounded-none border-none bg-transparent p-0 transition-all"
                >
                {/* Option Letter Badge (A, B, C, D) */}
                <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border font-serif text-lg transition-colors ${
                    isSelected
                        ? 'border-[#003560] bg-[#003560] text-white dark:border-[#0ea5e9] dark:bg-[#0ea5e9]'
                        : 'border-[#d1dce8] text-slate-900 dark:border-[#7cc4ff] dark:text-white'
                    }`}
                >
                    {key}
                </span>

                {/* Option Text Box */}
                <div
                    className={`flex min-h-[50px] flex-1 items-center rounded-lg border px-4 py-2 font-serif text-[18px] leading-snug transition-all ${
                    isSelected
                        ? 'border-[#8eb4da] bg-sky-100/70 text-slate-900 shadow-sm ring-2 ring-[#0ea5e9]/20 dark:border-[#0ea5e9] dark:bg-[#0ea5e9]/30 dark:text-white'
                        : 'border-[#d1dce8] bg-white text-slate-900 hover:bg-slate-50 dark:border-[#1e5fa0] dark:bg-[#004b87] dark:text-white dark:hover:bg-[#005faa]'
                    }`}
                >
                    {text}
                </div>
                </label>
            );
            })}
        </div>
        </div>
    );
};