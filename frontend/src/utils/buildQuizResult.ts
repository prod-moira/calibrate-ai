import type { AnswerCategory, QuizResult } from '@shared';

/**
 * Builds a QuizResult from a 6×5 answer matrix.
 *
 * For each step (row), counts occurrences of each AnswerCategory across the
 * 5 answers and selects the dominant category (highest count; ties are broken
 * deterministically by the sort order of Object.entries).
 *
 * @param answers - A 6-element array where each element is a 5-element array
 *                  of AnswerCategory values (one per question in that step).
 * @returns A QuizResult array of exactly 6 StepSummary objects.
 */
export function buildQuizResult(answers: AnswerCategory[][]): QuizResult {
  // answers is a 6×5 matrix (6 steps, 5 answers each)
  return answers.map((stepAnswers) => {
    const counts = { Analytical: 0, Creative: 0, Leadership: 0, People: 0 };
    stepAnswers.forEach((a) => counts[a]++);
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as AnswerCategory;
    return { dominantCategory: dominant, answerCounts: counts };
  });
}
