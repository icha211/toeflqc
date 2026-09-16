import React, { useState } from 'react';
import { ReadingPassagePanel } from './ReadingPassagePanel';
import { ReadingQuestionPanel } from './ReadingQuestionPanel';
import { ReadingPassage } from '../../../types/reading';

interface ReadingCanvasProps {
    passage: ReadingPassage;
    answers: Record<string, string>;
    onAnswerSelect: (questionUid: string, optionKey: string) => void;
}

export const ReadingCanvas: React.FC<ReadingCanvasProps> = ({
    passage,
    answers,
    onAnswerSelect,
}) => {
    return (
        <div className="flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden bg-[#f4f7fb] dark:bg-[#004b87]">
        <main className="grid h-full min-h-0 w-full grid-cols-1 gap-4 p-4 lg:grid-cols-[calc(16cm+108px)_minmax(320px,1fr)]">
            {/* Left Split Column: Passage Text Container */}
            <section className="flex flex-col overflow-hidden rounded-xl border border-[#d1dce8] bg-white shadow-sm dark:border-[#003560] dark:bg-[#003560]">
            <ReadingPassagePanel passage={passage} />
            </section>

            {/* Right Split Column: Questions Scrollable Track */}
            <section className="flex flex-col overflow-y-auto rounded-xl border border-[#d1dce8] bg-white p-4 shadow-sm dark:border-[#003560] dark:bg-[#003560]">
            <ReadingQuestionPanel
                passage={passage}
                answers={answers}
                onAnswerSelect={onAnswerSelect}
            />
            </section>
        </main>
        </div>
    );
};