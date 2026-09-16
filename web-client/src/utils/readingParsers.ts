import { ReadingQuestion } from '../types/reading';

/**
 * Parses raw text input into structured Question objects.
 * Handles formats like: "34. What does the passage discuss? (A) Option 1 (B) Option 2"
 */
export const parseMagicQuestions = (
    rawText: string,
    passageId: number
    ): ReadingQuestion[] => {
    const lines = rawText.split('\n');
    const questions: ReadingQuestion[] = [];
    let currentQ: Partial<ReadingQuestion> | null = null;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const qMatch = trimmed.match(/^(?:<[^>]+>)*(\d+)[\.\)]?\s+(.*)/);
        const optMatch = trimmed.match(/^[\(]?([A-D])[\.\)]?\s+(.*)/i);

        if (qMatch && !optMatch) {
        if (currentQ && currentQ.questionNumber) {
            questions.push(currentQ as ReadingQuestion);
        }
        const qNum = parseInt(qMatch[1], 10);
        currentQ = {
            uid: `${passageId}_${qNum}`,
            passageId,
            questionNumber: qNum,
            rawQuestionText: qMatch[2],
            questionText: qMatch[2],
            options: {},
        };
        } else if (optMatch && currentQ && currentQ.options) {
        const letter = optMatch[1].toUpperCase();
        currentQ.options[letter] = optMatch[2];
        }
    }

    if (currentQ && currentQ.questionNumber) {
        questions.push(currentQ as ReadingQuestion);
    }

    return questions;
};