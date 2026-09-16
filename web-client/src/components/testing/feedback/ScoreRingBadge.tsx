import React from 'react';
import { calculateSectionScaledScore, TOEFLSectionType } from '../../utils/toeflScoreCalculator';

interface ScoreRingBadgeProps {
    rawScore: number;
    totalQuestions: number;
    section: TOEFLSectionType; // Accepts 'listening' | 'structure' | 'reading'
}

export const ScoreRingBadge: React.FC<ScoreRingBadgeProps> = ({
    rawScore,
    totalQuestions,
    section,
}) => {
    const { scaledScore, color, trackColor, bandLabel } = calculateSectionScaledScore(
    rawScore,
    section,
    totalQuestions
);

  // Scaled score range is 31 to 68 (max 68 for listening/structure, 67 for reading)
const maxScaled = section === 'reading' ? 67 : 68;
const percentage = Math.max(0, Math.min(100, ((scaledScore - 31) / (maxScaled - 31)) * 100));

const radius = 18;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = circumference - (percentage / 100) * circumference;

return (
    <div className="flex items-center justify-center gap-3 rounded-xl bg-slate-50 px-3.5 py-1.5 dark:bg-slate-800/80">
      {/* Dynamic SVG Circular Score Ring */}
    <div className="relative flex h-11 w-11 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 44 44">
        <circle
            cx="22"
            cy="22"
            r={radius}
            stroke={trackColor}
            strokeWidth="4"
            fill="transparent"
            />
        <circle
            cx="22"
            cy="22"
            r={radius}
            stroke={color}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
            />
        </svg>
        <span
            className="absolute font-jakarta text-xs font-bold"
            style={{ color }}
        >
            {scaledScore}
        </span>
    </div>

    {/* Meta Text Details */}
    <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
            <span className="font-outfit text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Scaled Score
            </span>
            <span
            className="rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase"
            style={{ backgroundColor: trackColor, color }}
            >
            {bandLabel}
            </span>
        </div>
        <span className="font-jakarta text-xs font-semibold text-slate-700 dark:text-slate-200">
            {rawScore} / {totalQuestions} Correct
        </span>
        </div>
    </div>
    );
};