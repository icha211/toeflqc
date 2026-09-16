import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    CalendarIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

interface SidebarNavProps {
    isCollapsed: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed }) => {
    const location = useLocation();

  // Format formatted date for standard HCI visual reassurance
    const todayDateFormatted = 'Today, 1 Oct 2026';

    const isLinkActive = (path: string) => location.pathname === path;

    return (
        <aside
            className={`flex h-full flex-col justify-between border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${
                isCollapsed ? 'w-16 p-2' : 'w-64 p-4'
            }`}
        >
        <div className="flex flex-col gap-6">
        {/* TOEFL ITP SECTION */}
        <div className="flex flex-col gap-2">
            {!isCollapsed && (
                <span className="font-outfit text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    TOEFL ITP
                </span>
            )}

            {/* Today Schedule Link */}
            <Link
                to="/dashboard"
                title={isCollapsed ? todayDateFormatted : undefined}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 font-jakarta text-xs transition-all ${
                isLinkActive('/dashboard') || isLinkActive('/')
                    ? 'bg-slate-100 font-bold text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50'
            }`}
            >
                <CalendarIcon className="h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-800 dark:text-slate-400" />
                {!isCollapsed && (
                    <span className="truncate">{todayDateFormatted}</span>
                )}
            </Link>

            {/* My Progress Link */}
            <Link
            to="/progress"
            title={isCollapsed ? 'My Progress' : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 font-jakarta text-xs transition-all ${
                isLinkActive('/progress')
                    ? 'bg-slate-100 font-bold text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50'
                }`}
            >
                <ChartBarIcon className="h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-800 dark:text-slate-400" />
                {!isCollapsed && <span className="truncate">My Progress</span>}
            </Link>
        </div>

        {/* SOCIAL SECTION */}
        <div className="flex flex-col gap-2">
            {!isCollapsed && (
                <span className="font-outfit text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    SOCIAL
                </span>
                )}

                {/* Message Link */}
                <Link
                to="/messages"
                title={isCollapsed ? 'Message' : undefined}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 font-jakarta text-xs transition-all ${
                    isLinkActive('/messages')
                        ? 'bg-slate-100 font-bold text-slate-900 dark:bg-slate-800 dark:text-white'
                        : 'font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50'
                }`}
                >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-800 dark:text-slate-400" />
                    {!isCollapsed && <span className="truncate">Message</span>}
                </Link>

                {/* Community Link */}
                <Link
                    to="/community"
                    title={isCollapsed ? 'Community' : undefined}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 font-jakarta text-xs transition-all ${
                    isLinkActive('/community')
                        ? 'bg-slate-100 font-bold text-slate-900 dark:bg-slate-800 dark:text-white'
                        : 'font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50'
                    }`}
                >
                    <UserGroupIcon className="h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-800 dark:text-slate-400" />
                    {!isCollapsed && <span className="truncate">Community</span>}
                </Link>
            </div>
        </div>
        </aside>
    );
};