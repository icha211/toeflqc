export type TOEFLSectionType = 'listening' | 'structure' | 'reading';

export interface ScoreBand {
    scaledScore: number;
    color: string;
    trackColor: string;
    bandLabel: 'High' | 'Mid' | 'Low';
}

export interface TOEFLOverallScore {
    listeningScaled: number;
    structureScaled: number;
    readingScaled: number;
    totalScaled: number; // Formula: ((Listening + Structure + Reading) * 10) / 3
}

// TOEFL ITP Scaled Score Anchor Mapping Tables
const SCORE_ANCHOR_TABLES: Record<TOEFLSectionType, Array<[number, number]>> = {
  // Section 1: Listening Comprehension (50 Questions) -> Scaled Score: 31–68
    listening: [
    [0, 31], [5, 31], [10, 38], [15, 42], [20, 46], [25, 49],
    [30, 52], [35, 55], [40, 58], [45, 62], [50, 68]
    ],
  // Section 2: Structure & Written Expression (40 Questions) -> Scaled Score: 31–68
    structure: [
    [0, 31], [5, 33], [10, 37], [15, 40], [20, 44], [25, 48],
    [30, 53], [35, 58], [40, 68]
    ],
  // Section 3: Reading Comprehension (50 Questions) -> Scaled Score: 31–67
    reading: [
    [0, 31], [5, 31], [10, 37], [15, 41], [20, 45], [25, 48],
    [30, 51], [35, 54], [40, 57], [45, 61], [50, 67]
    ],
};

/**
 * Calculates TOEFL ITP Scaled Score (31–68 range) for any specified section.
 */
export const calculateSectionScaledScore = (
    rawScore: number,
    section: TOEFLSectionType,
    totalQuestions?: number
): ScoreBand => {
    const defaultTotal = section === 'structure' ? 40 : 50;
    const maxQ = totalQuestions || defaultTotal;

  // Normalize raw score relative to section standard max questions
    const normalizedRaw = Math.max(0, Math.min(maxQ, Math.round((rawScore / maxQ) * defaultTotal)));
    const anchors = SCORE_ANCHOR_TABLES[section];
    let scaledScore = 31;

    for (let i = 1; i < anchors.length; i++) {
    const left = anchors[i - 1];
    const right = anchors[i];

    if (normalizedRaw <= right[0]) {
        const ratio = (normalizedRaw - left[0]) / Math.max(1, right[0] - left[0]);
        scaledScore = Math.round(left[1] + (right[1] - left[1]) * ratio);
        break;
    }
}

  // Universal SaaS Color Banding Rules
if (scaledScore >= 60) {
    return { scaledScore, color: '#0d9488', trackColor: '#ccfbf1', bandLabel: 'High' }; // Teal
    }
    if (scaledScore >= 47) {
        return { scaledScore, color: '#faba0e', trackColor: '#fef3c7', bandLabel: 'Mid' };  // Amber
    }
  return { scaledScore, color: '#dc2626', trackColor: '#fee2e2', bandLabel: 'Low' };    // Red
};

/**
 * Calculates the Total TOEFL ITP Scaled Score (310–677 range).
 */
export const calculateTotalTOEFLScore = (
    listeningRaw: number,
    structureRaw: number,
    readingRaw: number
): TOEFLOverallScore => {
    const listeningScaled = calculateSectionScaledScore(listeningRaw, 'listening').scaledScore;
    const structureScaled = calculateSectionScaledScore(structureRaw, 'structure').scaledScore;
    const readingScaled = calculateSectionScaledScore(readingRaw, 'reading').scaledScore;

  // TOEFL ITP Formula: Multiply sum by 10 and divide by 3
const totalScaled = Math.round(((listeningScaled + structureScaled + readingScaled) * 10) / 3);

return {
    listeningScaled,
    structureScaled,
    readingScaled,
    totalScaled,
    };
};