import type { AnswerCategory } from '@shared';

export const STEP6_VALUE_MAP: Record<AnswerCategory, number> = {
  Analytical: 5, // A
  Creative: 1,   // B
  Leadership: 3, // C
  People: 2,     // D
};

export function deriveStabilityPriority(step6Answers: AnswerCategory[]): number {
  // step6Answers has exactly 5 elements
  const mean = step6Answers.reduce((sum, a) => sum + STEP6_VALUE_MAP[a], 0) / 5;
  return Math.min(5, Math.max(1, Math.round(mean)));
}
