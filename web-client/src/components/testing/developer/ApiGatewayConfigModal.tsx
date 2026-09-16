import React, { useState } from 'react';
import { ApiGatewayConfig } from '../../../types/developer';
import { developerApi } from '../../../services/developerApi';

interface ApiGatewayConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: ApiGatewayConfig;
    onSave: (config: ApiGatewayConfig) => void;
}

export const ApiGatewayConfigModal: React.FC<ApiGatewayConfigModalProps> = ({
    isOpen,
    onClose,
    config,
    onSave, 
    }) => {
    const [form, setForm] = useState<ApiGatewayConfig>(config);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading'; msg: string } | null>(null);

    if (!isOpen) return null;

    const handleTestConnection = async () => {
        setStatus({ type: 'loading', msg: 'Testing gateway response...' });
        const success = await developerApi.testConnection(form);
        if (success) {
            setStatus({ type: 'success', msg: 'Connected to API Gateway successfully!' });
        } else {
            setStatus({ type: 'error', msg: 'Could not connect to Gateway host.' });
        }
    };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h3 className="font-outfit text-lg font-bold text-slate-900 dark:text-white">
            🔧 API Gateway Configuration
            </h3>
            <button type="button" onClick={onClose} className="text-xl text-slate-400 hover:text-slate-700">
            &times;
            </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
            <label className="font-jakarta text-xs font-bold text-slate-700 dark:text-slate-300">Full API Gateway URL</label>
            <input
                type="text"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="http://localhost:8000"
                className="rounded-xl border border-slate-200 px-3.5 py-2 font-jakarta text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
        </div>

        <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
                <label className="font-jakarta text-xs font-bold text-slate-700 dark:text-slate-300">Host</label>
                <input
                type="text"
                value={form.host}
                onChange={(e) => setForm({ ...form, host: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 font-jakarta text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="font-jakarta text-xs font-bold text-slate-700 dark:text-slate-300">Port</label>
                <input
                type="text"
                value={form.port}
                onChange={(e) => setForm({ ...form, port: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 font-jakarta text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="font-jakarta text-xs font-bold text-slate-700 dark:text-slate-300">Protocol</label>
                <select
                    value={form.protocol}
                    onChange={(e) => setForm({ ...form, protocol: e.target.value as 'http' | 'https' })}
                    className="rounded-xl border border-slate-200 px-3 py-2 font-jakarta text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                >
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                </select>
            </div>
        </div>

        {status && (
            <div className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                status.type === 'success' ? 'bg-emerald-100 text-emerald-800' :
                status.type === 'error' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
            }`}>
                {status.msg}
            </div>
            )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
            type="button"
            onClick={handleTestConnection}
            className="rounded-xl border border-slate-200 px-4 py-2 font-jakarta text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
            Test Connection
            </button>
            <button
            type="button"
            onClick={() => { onSave(form); onClose(); }}
            className="rounded-xl bg-[#005faa] px-4 py-2 font-jakarta text-xs font-semibold text-white hover:bg-sky-700"
            >
            Save Config
            </button>
            </div>
        </div>
    </div>
    );
};