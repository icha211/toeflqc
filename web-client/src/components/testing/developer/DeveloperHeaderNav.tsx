import React from 'react';
import { Link } from 'react-router-dom';

export const DeveloperHeaderNav: React.FC = () => {
return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
            <img src="/assets/icon/QuickCheckLogo.png" alt="Logo" className="h-8 w-auto object-contain" />
        </div>

            <nav className="flex items-center gap-2">
            <Link to="/dashboard" className="flex h-10 items-center gap-2 rounded-xl px-4 font-jakarta text-xs font-semibold text-slate-700 hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800">
            <span>🏠</span> Dashboard
                </Link>
                <Link to="/mock-tests" className="flex h-10 items-center gap-2 rounded-xl px-4 font-jakarta text-xs font-semibold text-slate-700 hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800">
                    <span>🔵</span> TOEFL ITP
                </Link>
                <Link to="/developer" className="flex h-10 items-center gap-2 rounded-xl bg-sky-100 px-4 font-jakarta text-xs font-bold text-[#005faa] dark:bg-sky-950 dark:text-sky-300">
                    <span>🧑‍💻</span> Developer Console
                </Link>
            </nav>
        </div>
    </header>
    );
};