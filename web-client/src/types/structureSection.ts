export interface StructureQuestion {
    id: string;
    questionNumber: number;
    conceptCode: string;          // e.g., 'C01-Subject-Verb-Agreement'
    conceptName: string;          // e.g., 'Subject-Verb Agreement'
    prompt: string;
    options: string[];
    correctAnswerIndex: number;
    explanationText: string;
    videoUrl?: string;
}

export interface DynamicMaterialRecord {
    topicId: string;
    title: string;
    html: string;
    uploadedAt: string;
}