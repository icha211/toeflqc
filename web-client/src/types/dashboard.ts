export interface DailySectionProgress {
    listening: boolean;
    structure: boolean;
    reading: boolean;
}

export interface DailyTaskRecord {
    setDate: string;
    mockTitle?: string;
    sections: DailySectionProgress;
}

export interface NetworkConnection {
    id: string;
    name: string;
    country: string;
    flagClass: string;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}