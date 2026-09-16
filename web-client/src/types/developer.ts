export type TestTypeCategory = 'mocktest' | 'practicetest' | 'materialslibrary';
export type TOEFLModule = 'listening' | 'structure' | 'reading';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ViewMode = 'grid' | 'list';

export interface ApiGatewayConfig {
    url: string;
    host: string;
    port: string;
    protocol: 'http' | 'https';
}

export interface ProblemSetRecord {
    setId: string;
    module: TOEFLModule;
    label: string;
    icon?: string;
    setDate: string; // YYYY-MM-DD format
    difficulty: DifficultyLevel;
    difficultyLabel: string;
    updatedAt: string;
    year: number | null;
    monthIndex: number | null;
    day: number | null;
    displayDate: string;
    isArchived?: boolean;
}

export interface ArchivedSetItem {
    setId: string;
    module: TOEFLModule;
    setDate: string;
    _archivedAt: string;
}

export interface MaterialTopicItem {
    id: string;
    module: string;
    moduleTitle: string;
    code: string;
    title: string;
    fileName?: string;
    updatedAt?: string;
    html?: string;
}