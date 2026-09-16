import React from 'react';
import { ListeningCanvas } from './modules/ListeningCanvas';
import { StructureCanvas } from './modules/StructureCanvas';
import { ReadingCanvas } from './modules/ReadingCanvas';
import { WritingCanvas } from './modules/WritingCanvas';

interface SectionRunnerProps {
    currentSection: 'listening' | 'structure' | 'reading' | 'writing';
    activeQuestionId: string;
}

export const SectionRunner: React.FC<SectionRunnerProps> = ({ currentSection, activeQuestionId }) => {
    switch (currentSection) {
        case 'listening':
        return <ListeningCanvas questionId={activeQuestionId} />;
        case 'structure':
        return <StructureCanvas questionId={activeQuestionId} />;
        case 'reading':
        return <ReadingCanvas questionId={activeQuestionId} />;
        case 'writing':
        return <WritingCanvas questionId={activeQuestionId} />;
        default:
        return null;
    }
};