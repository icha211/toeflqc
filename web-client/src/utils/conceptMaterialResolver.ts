import { DynamicMaterialRecord } from '../types/structureSection';

export const resolveMaterialByConcept = (conceptCode: string): DynamicMaterialRecord | null => {
    try {
        const rawData = localStorage.getItem('toefl_structure_materials_v1');
        if (!rawData) return null;

        const materialsMap: Record<string, DynamicMaterialRecord> = JSON.parse(rawData);

        // 1. Direct key match (e.g., 'Module 01-C01-Subject-Verb-Agreement')
        if (materialsMap[conceptCode]) {
        return materialsMap[conceptCode];
        }

        // 2. Partial concept code match (e.g., matching 'C01' anywhere in topicId)
        const matchedKey = Object.keys(materialsMap).find((key) =>
        key.toLowerCase().includes(conceptCode.toLowerCase())
        );

        return matchedKey ? materialsMap[matchedKey] : null;
    } catch (error) {
        console.error('Failed to resolve concept material:', error);
        return null;
    }
};