import React, { useState } from 'react';
import { AppLayout } from '../components/common/navigation/AppLayout';
import { DashboardSummarySection } from '../components/dashboard/DashboardSummarySection';
import { GlobalNetworkCard } from '../components/dashboard/GlobalNetworkCard';
import { ScoreCalculatorPanel } from '../components/dashboard/ScoreCalculatorPanel';

export const DashboardView: React.FC = () => {
    const [isToeflModalOpen, setIsToeflModalOpen] = useState<boolean>(false);

    return (
        <AppLayout>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
            {/* Top Overview & Summary Grid */}
            <DashboardSummarySection />

            {/* Dynamic Secondary Section Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2">
                {/* Calendar & Agenda Placeholder */}
                <div className="rounded-2xl border border-slate-200 bg-[#D8FFF7] p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                    <h2 className="font-outfit text-base font-bold text-slate-900 dark:text-white">
                    AGUSTUS 2026 Daily Schedule
                    </h2>
                    <button
                    type="button"
                    onClick={() => setIsToeflModalOpen(true)}
                    className="rounded-full bg-teal-500 px-4 py-1.5 font-jakarta text-xs font-bold text-white hover:bg-teal-600"
                    >
                    TOEFL ITP 101
                    </button>
                </div>
                <p className="mt-4 font-jakarta text-xs text-slate-600 dark:text-slate-400">
                    Interactive monthly calendar schedule integrated.
                </p>
                </div>
            </div>

            {/* Partner & Network Widget */}
            <div className="col-span-1">
                <GlobalNetworkCard />
            </div>
            </div>

            {/* Score Estimator Section */}
            <ScoreCalculatorPanel />
        </div>
        </AppLayout>
    );
};

export default DashboardView;