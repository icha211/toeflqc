import React from 'react';
import { useDeveloperConsole } from '../hooks/useDeveloperConsole';
import { DeveloperHeaderNav } from '../components/testing/developer/DeveloperHeaderNav';
import { ApiGatewayConfigModal } from '../components/testing/developer/ApiGatewayConfigModal';

export const DeveloperConsoleView: React.FC = () => {
    const {
    activeTab,
    setActiveTab,
    libraryView,
    setLibraryView,
    isCreateOpen,
    setIsCreateOpen,
    isGatewayConfigOpen,
    setIsGatewayConfigOpen,
    gatewayConfig,
    saveGatewayConfig,
    } = useDeveloperConsole();

    return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-[#004b87]">
    <DeveloperHeaderNav />

    <main className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
        {/* Hero & Primary Action Stack */}
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
            <img src="/assets/icon/logo.png" alt="TOEFL Logo" className="h-10 w-10 rounded-xl border border-slate-200 p-1 object-contain" />
            <div>
                <h1 className="font-outfit text-xl font-bold text-slate-900 dark:text-white">
                TOEFL ITP Developer Dashboard
                </h1>
                <p className="font-jakarta text-xs font-normal text-slate-500">
                Create and organize TOEFL problem sets for Listening, Structure, and Reading.
                </p>
            </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
            <button
                type="button"
                onClick={() => setIsCreateOpen(!isCreateOpen)}
                className="rounded-xl bg-[#005faa] px-4 py-2.5 font-jakarta text-xs font-bold text-white shadow-sm hover:bg-sky-700"
            >
            Create New Question Set
            </button>
            <button
                type="button"
                onClick={() => setIsGatewayConfigOpen(true)}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-jakarta text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              ⚙️ API Gateway
            </button>
          </div>
        </section>

        {/* Tab Selection Navigation */}
        <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {(['mocktest', 'practicetest', 'materialslibrary'] as const).map((tab) => (
            <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg py-2.5 font-jakarta text-xs font-bold transition-all ${
                activeTab === tab
                    ? 'bg-[#005faa] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
            >
                {tab === 'mocktest' && '📋 Mock Test'}
                {tab === 'practicetest' && '✏️ Practice Test'}
                {tab === 'materialslibrary' && '📚 Materials Library'}
            </button>
            ))}
        </div>

        {/* Problem Set Library Header & Grid Controls */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
            <div>
                <h2 className="font-outfit text-lg font-bold text-slate-900 dark:text-white">
                Problem Set Library
                </h2>
                <p className="font-jakarta text-xs font-normal text-slate-500">
                Manage metadata, set dates, and module questions.
                </p>
            </div>

            {/* View Mode Toggle Switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-800">
                <button
                    type="button"
                    onClick={() => setLibraryView('grid')}
                    className={`rounded px-2.5 py-1 font-jakarta text-xs ${
                    libraryView === 'grid' ? 'bg-white font-bold shadow-sm dark:bg-slate-700' : 'text-slate-500'
                }`}
                >
                Grid
                </button>
                <button
                    type="button"
                    onClick={() => setLibraryView('list')}
                    className={`rounded px-2.5 py-1 font-jakarta text-xs ${
                    libraryView === 'list' ? 'bg-white font-bold shadow-sm dark:bg-slate-700' : 'text-slate-500'
                }`}
                >
                List
                </button>
            </div>
            </div>
        </section>
    </main>

      {/* Floating API Gateway Configuration Modal */}
    <ApiGatewayConfigModal
        isOpen={isGatewayConfigOpen}
        onClose={() => setIsGatewayConfigOpen(false)}
        config={gatewayConfig}
        onSave={saveGatewayConfig}
    />
    </div>
    );
};

export default DeveloperConsoleView;