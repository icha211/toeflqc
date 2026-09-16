import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';

interface ConceptChipProps {
    conceptCode: string;
    conceptName: string;
    onClick: () => void;
    size?: 'sm' | 'md';
}

export const ConceptChip: React.FC<ConceptChipProps> = ({
    conceptCode,
    conceptName,
    onClick,
    size = 'md',
    }) => {
    return (
        <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 font-jakarta font-semibold text-teal-800 transition-all hover:bg-teal-100 hover:border-teal-300 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-300 dark:hover:bg-teal-900/60 ${
            size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3.5 py-1 text-xs'
        }`}
        title="View Concept Material & Explanation"
        >
        <BookOpenIcon className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        <span>
            <strong className="font-extrabold">{conceptCode}</strong>: {conceptName}
        </span>
        </button>
    );
};