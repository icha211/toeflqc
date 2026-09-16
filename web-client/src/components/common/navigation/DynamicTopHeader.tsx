import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
    HomeIcon,
    BookOpenIcon,
    BellIcon,
    Cog6ToothIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline';

interface DynamicTopHeaderProps {
    onToggleSidebar: () => void;
    onOpenAuthModal: (tab: 'login' | 'register') => void;
    onOpenPaywallModal: () => void;
}

export const DynamicTopHeader: React.FC<DynamicTopHeaderProps> = ({
    onToggleSidebar,
    onOpenAuthModal,
    onOpenPaywallModal,
    }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    const isDashboardActive =
        location.pathname.startsWith('/dashboard') || location.pathname === '/';
    const isMaterialsActive = location.pathname.startsWith('/materials');

    return (
    <header className="sticky top-0 z-30 flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
      {/* LEFT BRAND & SIDEBAR TOGGLE (8-pt spatial alignment) */}
    <div className="flex items-center gap-3">
        <Link to="/dashboard" className="flex items-center gap-2">
            <img
                src="/assets/icon/QuickCheckLogo.png"
                alt="QuickCheck Logo"
                className="h-8 w-auto object-contain"
            />
        </Link>
        <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
            <Bars3Icon className="h-5 w-5" />
        </button>
    </div>

      {/* CENTER SEGMENTED PILL SWITCHER (HCI Visual Hierarchy) */}
    <div className="hidden sm:flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800">
        <Link
            to="/dashboard"
            className={`flex h-9 items-center gap-2 rounded-full px-4 font-jakarta text-xs font-semibold transition-all ${
                isDashboardActive
                ? 'bg-white text-[#09a982] shadow-sm dark:bg-slate-700 dark:text-teal-300'
                : 'text-slate-600 hover:text-[#09a982] dark:text-slate-300'
            }`}
        >
            <HomeIcon className="h-4 w-4" />
            <span>TOEFL ITP Dashboard</span>
        </Link>
        <Link
            to="/materials"
            className={`flex h-9 items-center gap-2 rounded-full px-4 font-jakarta text-xs font-semibold transition-all ${
                isMaterialsActive
                ? 'bg-white text-[#09a982] shadow-sm dark:bg-slate-700 dark:text-teal-300'
                : 'text-slate-600 hover:text-[#09a982] dark:text-slate-300'
            }`}
            >
            <BookOpenIcon className="h-4 w-4" />
            <span>English Materials</span>
        </Link>
    </div>

      {/* RIGHT ACTION CONTAINER (Guest vs Authenticated State) */}
    <div className="flex items-center gap-3">
        {isLoading ? (
          /* Skeleton Loader (Eliminating Layout Shifts) */
        <div className="h-9 w-28 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
        ) : user ? (
          /* AUTHENTICATED STATE */
        <div className="flex items-center gap-2.5">
            <button
                type="button"
                onClick={onOpenPaywallModal}
                className="flex h-10 items-center justify-center rounded-full bg-[#09a982] px-5 font-jakarta text-xs font-bold text-white shadow-sm transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                Upgrade
            </button>
            <button
                type="button"
                aria-label="Settings"
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                <Cog6ToothIcon className="h-5 w-5" />
            </button>
            <button
                type="button"
                aria-label="Notifications"
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                <BellIcon className="h-5 w-5" />
            </button>
                <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-9 w-9 rounded-full border border-slate-200 object-cover dark:border-slate-700"
            />
            </div>
            ) : (
                /* GUEST STATE */
                <div className="flex items-center gap-3">
                    <button
                    type="button"
                    onClick={() => onOpenAuthModal('login')}
                    className="flex h-10 items-center justify-center px-4 font-jakarta text-xs font-bold text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200"
                    >
                    Log In
                    </button>
                    <button
                        type="button"
                        onClick={() => onOpenAuthModal('register')}
                        className="flex h-10 items-center justify-center rounded-full bg-[#09a982] px-5 font-jakarta text-xs font-bold text-white shadow-sm transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                        Start For Free
                    </button>
                </div>
                )}
            </div>
        </header>
    );
};