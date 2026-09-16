import React from 'react';
import { BookOpenIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

export const DashboardSummarySection: React.FC = () => {
    const { user } = useAuth();
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Promo Video Banner */}
        <div className="col-span-1 min-h-[160px] overflow-hidden rounded-2xl bg-[#003560] shadow-sm lg:col-span-3">
            <video
            src="/assets/icon/banner promo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            />
        </div>

        {/* User Profile Card */}
        <div className="flex flex-col items-center justify-start gap-2 rounded-2xl border border-slate-200 bg-[#D8FFF7] p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="self-start font-jakarta text-base font-bold text-slate-900 dark:text-white">
            Welcome, {user?.name || 'User'}
            </h2>
            <img
            src={user?.avatarUrl || '/assets/figma/sidebar-avatar.jpeg'}
            alt="Profile Avatar"
            className="h-16 w-16 rounded-full border border-slate-200 object-cover shadow-sm"
            />
            <p className="self-start font-outfit text-sm font-semibold text-slate-800 dark:text-slate-200">
            Quick Check
            </p>
            <span className="self-start font-jakarta text-xs text-slate-500">
            {user?.isTrial ? 'Trial Membership' : 'Premium Member'}
            </span>
        </div>

        {/* Stacked Cards: Daily Goal & CEFR Level */}
        <div className="col-span-1 flex flex-col gap-3">
            {/* Daily Goal Card */}
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-[#D8FFF7] p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
                <h3 className="font-outfit text-xs font-bold text-slate-800 dark:text-white">
                Daily Goal
                </h3>
                <span className="flex items-center gap-1 font-jakarta text-xs font-semibold text-teal-700">
                <BookOpenIcon className="h-4 w-4" /> 1/3
                </span>
            </div>
            <div className="grid grid-cols-7 gap-1 pt-1">
                {dayLabels.map((day, idx) => (
                <div
                    key={day}
                    className={`flex flex-col items-center justify-center rounded-lg p-1 ${
                    idx === 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                >
                    <span className="font-outfit text-[10px] font-bold">{day}</span>
                </div>
                ))}
            </div>
            </div>

            {/* CEFR Score Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#D8FFF7] p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-outfit text-xs font-bold text-slate-800 dark:text-white">
                Score / CEFR Level
            </h3>
            <div className="flex items-baseline gap-1 my-1">
                <span className="font-outfit text-3xl font-extrabold text-[#109d91]">583</span>
                <span className="font-outfit text-lg font-semibold text-slate-400">/ B2</span>
            </div>
            <span className="font-jakarta text-[10px] text-slate-500">
                Tested on Mock Test 01 Oct 2026
            </span>
            </div>
        </div>

        {/* Section Progress Bars */}
        <div className="col-span-1 flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#D8FFF7] p-4 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
            <h3 className="font-jakarta text-xs font-bold text-slate-900 dark:text-white">
                Study Progress
            </h3>
            <span className="rounded-lg bg-slate-100 px-2 py-1 font-jakarta text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                This Month
            </span>
            </div>

            <div className="my-2 flex flex-col gap-2">
            {[
                { label: 'Listening', pct: 62 },
                { label: 'Structure', pct: 70 },
                { label: 'Writing', pct: 75 },
                { label: 'Reading', pct: 76 },
            ].map((item) => (
                <div key={item.label} className="grid grid-cols-12 items-center gap-2 font-jakarta text-[11px]">
                <span className="col-span-3 text-slate-700 dark:text-slate-300">{item.label}</span>
                <div className="col-span-7 h-3 w-full overflow-hidden rounded-full bg-teal-100 dark:bg-slate-800">
                    <div
                    className="h-full rounded-full bg-[#1598a5] transition-all duration-500"
                    style={{ width: `${item.pct}%` }}
                    />
                </div>
                <span className="col-span-2 text-right font-bold text-slate-900 dark:text-white">
                    {item.pct}%
                </span>
                </div>
            ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
            <span className="font-jakarta text-[10px] text-slate-500">Accumulated score: 2,147</span>
            <a href="/progress" className="flex items-center gap-1 font-jakarta text-xs font-bold text-teal-700 hover:underline">
                View report <ArrowUpRightIcon className="h-3 w-3" />
            </a>
            </div>
        </div>
        </div>
    );
};