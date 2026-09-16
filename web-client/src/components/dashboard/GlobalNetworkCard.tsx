import React, { useState } from 'react';
import { ArrowRightIcon, UsersIcon } from '@heroicons/react/24/outline';

export const GlobalNetworkCard: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <div className="relative min-h-[380px] w-full rounded-2xl border border-slate-200 bg-[#D8FFF7] shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
        {!isFlipped ? (
            /* Front Matching Panel */
            <div className="flex h-full flex-col items-center justify-between p-6 text-center">
            <div>
                <h3 className="font-jakarta text-lg font-bold text-slate-900 dark:text-white">
                Find Your English Partner
                </h3>
                <div className="mt-2 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="font-outfit text-xs text-teal-700 font-semibold">User Online & Matching</span>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 font-jakarta text-xs font-bold text-teal-800 hover:bg-teal-200"
            >
                <span>You have 50+ Connections</span>
                <ArrowRightIcon className="h-3 w-3" />
            </button>

            <div className="w-full max-w-xs">
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search partner (e.g. user_ken)..."
                className="w-full rounded-full border border-teal-600 px-4 py-2 font-jakarta text-xs text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            <a
                href="https://discord.gg/APnzhYPFT8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-jakarta text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
                <span>Talk with Your Friends on Discord</span>
                <img src="/assets/icon/discord.png" alt="Discord" className="h-5 w-5" />
            </a>
            </div>
        ) : (
            /* Back Global Network Panel */
            <div className="flex h-full flex-col justify-between p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                <h3 className="font-jakarta text-sm font-bold text-teal-800 dark:text-white">
                    YOUR GLOBAL NETWORK
                </h3>
                <p className="font-jakarta text-xs text-slate-500">78 Total Connections</p>
                </div>
                <UsersIcon className="h-6 w-6 text-teal-600" />
            </div>

            <div className="grid grid-cols-2 gap-2 my-4">
                {['Yuki T. (B1)', 'Einiry P. (B1)', 'Carlos R. (B2)', 'Sofia L. (B2)'].map((name) => (
                <div key={name} className="rounded-lg bg-teal-700 p-2 font-jakarta text-[11px] font-medium text-white">
                    {name}
                </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="self-end rounded-full bg-teal-700 px-4 py-2 font-jakarta text-xs font-bold text-white hover:bg-teal-800"
            >
                Back to Matchmaking
            </button>
            </div>
        )}
        </div>
    );
};