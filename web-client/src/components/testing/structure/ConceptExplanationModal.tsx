import React, { useState } from 'react';
import { sanitizeHtml } from '../../../utils/sanitizeHtml';
import { resolveMaterialByConcept } from '../../../utils/conceptMaterialResolver';
import { MaterialTabMode } from '../../../types/material';
import {
    LightBulbIcon,
    PlayCircleIcon,
    BookOpenIcon,
    XMarkIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

interface ConceptExplanationModalProps {
    isOpen: boolean;
    onClose: () => void;
    conceptCode: string;
    conceptName: string;
    fallbackExplanation?: string;
    videoUrl?: string;
}

export const ConceptExplanationModal: React.FC<ConceptExplanationModalProps> = ({
    isOpen,
    onClose,
    conceptCode,
    conceptName,
    fallbackExplanation,
    videoUrl,
    }) => {
    const [activeTab, setActiveTab] = useState<MaterialTabMode>('materi');

    if (!isOpen) return null;

    // Retrieve matching DOCX material uploaded by developers
    const uploadedMaterial = resolveMaterialByConcept(conceptCode);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
        <div className="flex h-full w-full max-w-2xl flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-teal-700 px-2.5 py-1 font-jakarta text-xs font-bold text-white">
                {conceptCode}
                </span>
                <h3 className="font-jakarta text-sm font-bold text-slate-900 dark:text-white">
                {conceptName}
                </h3>
            </div>
            <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close drawer"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
            </div>

            {/* 3-Tab Learning Views */}
            <nav className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
            <button
                type="button"
                onClick={() => setActiveTab('explanation')}
                className={`flex items-center justify-center gap-2 py-3 font-jakarta text-xs font-bold transition-all ${
                activeTab === 'explanation'
                    ? 'border-b-2 border-teal-600 bg-white text-teal-800 dark:bg-slate-900 dark:text-teal-300'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
            >
                <LightBulbIcon className="h-4 w-4" /> Quick Summary
            </button>
            <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`flex items-center justify-center gap-2 py-3 font-jakarta text-xs font-bold transition-all ${
                activeTab === 'video'
                    ? 'border-b-2 border-teal-600 bg-white text-teal-800 dark:bg-slate-900 dark:text-teal-300'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
            >
                <PlayCircleIcon className="h-4 w-4" /> Video Lesson
            </button>
            <button
                type="button"
                onClick={() => setActiveTab('materi')}
                className={`flex items-center justify-center gap-2 py-3 font-jakarta text-xs font-bold transition-all ${
                activeTab === 'materi'
                    ? 'border-b-2 border-teal-600 bg-white text-teal-800 dark:bg-slate-900 dark:text-teal-300'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
            >
                <BookOpenIcon className="h-4 w-4" /> Full Material
            </button>
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'explanation' && (
                <div className="rounded-xl bg-slate-50 p-5 font-outfit text-sm leading-relaxed text-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
                <h4 className="mb-2 font-jakarta text-base font-bold text-slate-900 dark:text-white">
                    Rule Explanation
                </h4>
                <p>{fallbackExplanation || 'No summary explanation available for this concept.'}</p>
                </div>
            )}

            {activeTab === 'video' && (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                {videoUrl ? (
                    <iframe
                    src={videoUrl}
                    title="Grammar Concept Walkthrough"
                    className="aspect-video w-full rounded-xl border border-slate-200 shadow-sm"
                    allowFullScreen
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                    <PlayCircleIcon className="h-10 w-10 stroke-1" />
                    <p className="font-jakarta text-xs">No video lesson linked to this rule yet.</p>
                    </div>
                )}
                </div>
            )}

            {activeTab === 'materi' && (
                <div>
                {uploadedMaterial?.html ? (
                    <article
                    className="prose prose-slate max-w-none font-outfit text-sm leading-relaxed dark:prose-invert prose-headings:font-jakarta prose-th:bg-teal-700 prose-th:text-white"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(uploadedMaterial.html) }}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-800/40">
                    <ExclamationCircleIcon className="h-8 w-8 text-slate-400" />
                    <p className="font-jakarta text-xs font-medium text-slate-600 dark:text-slate-400">
                        No custom material uploaded for <strong>{conceptCode}</strong> in the Developer Materials Library yet.
                    </p>
                    </div>
                )}
                </div>
            )}
            </div>
        </div>
        </div>
    );
};