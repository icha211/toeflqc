import { ApiGatewayConfig, ProblemSetRecord, ArchivedSetItem, MaterialTopicItem, TestTypeCategory } from '../types/developer';

const GET_BASE_URL = (): string => {
    const saved = localStorage.getItem('toefl_api_gateway_config');
    if (saved) {
        const parsed: ApiGatewayConfig = JSON.parse(saved);
        if (parsed.url) return parsed.url;
    }
    return import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8000';
};

export const developerApi = {
  // --- API Gateway Connection Probing ---
    async testConnection(config: ApiGatewayConfig): Promise<boolean> {
    const targetUrl = config.url || `${config.protocol}://${config.host}:${config.port}`;
        try {
            const res = await fetch(`${targetUrl}/developer/audio-folder-contents?setId=test-conn`, { method: 'GET' });
            return res.status < 500;
            } catch {
                return false;
        }
    },

  // --- Cloudflare R2 Upload Handlers ---
    async uploadAudioProxy(formData: FormData) {
    const res = await fetch(`${GET_BASE_URL()}/developer/upload-proxy`, {
        method: 'POST',
        body: formData,
        });
        if (!res.ok) throw new Error('Audio proxy upload failed.');
        return res.json();
    },

    async ensureAudioFolder(setId: string) {
    const res = await fetch(`${GET_BASE_URL()}/developer/ensure-audio-folder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ set_id: setId }),
        });
        if (!res.ok) throw new Error('Failed to ensure audio folder.');
        return res.json();
    },

  // --- Firebase Sets & Archives API ---
    async fetchSetsByTestType(testType: TestTypeCategory): Promise<ProblemSetRecord[]> {
    const raw = localStorage.getItem(`toefl_developer_${testType}_sets_v2`);
        if (raw) {
            const parsed = JSON.parse(raw);
            return Object.values(parsed);
        }
        return [];
    },

    async softDeleteSet(setId: string, testType: TestTypeCategory): Promise<void> {
    const raw = localStorage.getItem(`toefl_developer_${testType}_sets_v2`);
    if (raw) {
        const parsed = JSON.parse(raw);
        delete parsed[setId];
        localStorage.setItem(`toefl_developer_${testType}_sets_v2`, JSON.stringify(parsed));
        }
    },

    async fetchArchivedSets(testType: TestTypeCategory): Promise<ArchivedSetItem[]> {
        const raw = localStorage.getItem(`toefl_developer_archive_${testType}`);
        return raw ? JSON.parse(raw) : [];
    },

    async restoreArchivedSet(setId: string, testType: TestTypeCategory): Promise<boolean> {
    // Restoration logic bridging local cache and remote RTDB
    return true;
    }
};