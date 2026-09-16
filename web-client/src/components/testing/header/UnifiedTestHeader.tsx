import React from 'react';

interface UnifiedTestHeaderProps {
    title: string;
    packageLabel: string;
    timeRemaining: string; // "55:00"
    isTimeWarning?: boolean;
    onOpenOptions: () => void;
    onToggleFullscreen: () => void;
    onSubmit: () => void;
    children?: React.ReactNode; // Embedded ReadingHeaderNav
}

export const UnifiedTestHeader: React.FC<UnifiedTestHeaderProps> = ({
title,
packageLabel,
timeRemaining,
isTimeWarning = false,
onOpenOptions,
onToggleFullscreen,
onSubmit,
children,
}) => {
    return (
        <header className="relative z-30 flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-[#d1dce8] bg-white px-6 shadow-sm transition-colors duration-300 dark:border-[#003560] dark:bg-[#003560]">
        {/* Left: Brand Logo & Title Cluster */}
        <div className="flex items-center gap-6">
            <img
            src="/assets/icon/QuickCheckLogo.png"
            alt="QuickCheck Logo"
            className="h-10 w-[93px] object-contain"
            />
            <div className="flex flex-col justify-center">
            <span className="font-outfit text-[19px] font-medium leading-none text-slate-900 dark:text-white">
                {title}
            </span>
            <span className="mt-1 font-outfit text-sm font-medium leading-none text-[#7a8fa6] dark:text-[#d1dce8]">
                {packageLabel}
            </span>
            </div>
        </div>

        {/* Center: Absolute Positioned Timer (CBT Standard) */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg px-4 py-2">
            <span className="text-xl">⏱️</span>
            <span
            className={`font-mono text-2xl font-normal transition-colors duration-300 ${
                isTimeWarning
                ? 'animate-pulse text-red-600 font-bold'
                : 'text-[#005faa] dark:text-[#e0f2fe]'
            }`}
            >
            {timeRemaining}
            </span>
        </div>

        {/* Right: Embedded Navigator & Action Control Group */}
        <div className="flex items-center gap-4">
            {/* Navigation Chips (Part 1–5 Matrix) */}
            {children}

            {/* Feature Options (Fullscreen & Settings Modal) */}
            <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onToggleFullscreen}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#005faa] dark:text-[#d1dce8] dark:hover:bg-slate-800"
                aria-label="Toggle Fullscreen"
            >
                <i className="ph ph-frame-corners text-2xl" />
            </button>

            <button
                type="button"
                onClick={onOpenOptions}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#005faa] dark:text-[#d1dce8] dark:hover:bg-slate-800"
                aria-label="Test Options"
            >
                <i className="ph ph-list text-2xl" />
            </button>
            </div>

            {/* Submit Exam CTA */}
            <button
            type="button"
            onClick={onSubmit}
            className="flex h-11 items-center gap-2 rounded-xl bg-[#0d9488] px-6 text-base font-semibold text-white transition-all hover:bg-[#0f766e] active:scale-95 dark:bg-[#14b8a6]"
            >
            <span>Submit</span>
            <span className="text-lg">📤</span>
            </button>
        </div>
        </header>
    );
};