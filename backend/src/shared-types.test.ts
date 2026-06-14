/**
 * Smoke test — verifies that shared types are importable from the backend.
 * This test has no runtime assertions; it simply ensures the TypeScript
 * compiler resolves the @shared alias and the types are structurally correct.
 */
import { describe, it, expect } from 'vitest';
import type {
  AnswerCategory,
  StepSummary,
  QuizResult,
  AssessmentSummary,
  CareerPath,
  DiscoveryRequest,
  DiscoveryResponse,
} from './shared/types';

describe('Shared types — importability from backend', () => {
  it('AnswerCategory values are the expected literals', () => {
    const categories: AnswerCategory[] = ['Analytical', 'Creative', 'Leadership', 'People'];
    expect(categories).toHaveLength(4);
  });

  it('StepSummary can be constructed with the correct shape', () => {
    const step: StepSummary = {
      dominantCategory: 'Analytical',
      answerCounts: { Analytical: 3, Creative: 1, Leadership: 0, People: 1 },
    };
    expect(step.dominantCategory).toBe('Analytical');
    expect(step.answerCounts.Analytical).toBe(3);
  });

  it('QuizResult is an array of StepSummary', () => {
    const step: StepSummary = {
      dominantCategory: 'Creative',
      answerCounts: { Analytical: 0, Creative: 5, Leadership: 0, People: 0 },
    };
    const result: QuizResult = [step, step, step, step, step, step];
    expect(result).toHaveLength(6);
  });

  it('DiscoveryRequest has the expected shape', () => {
    const step: StepSummary = {
      dominantCategory: 'People',
      answerCounts: { Analytical: 1, Creative: 1, Leadership: 1, People: 2 },
    };
    const req: DiscoveryRequest = {
      quizResult: [step, step, step, step, step, step],
      stabilityPriority: 3,
    };
    expect(req.stabilityPriority).toBe(3);
    expect(req.quizResult).toHaveLength(6);
  });

  it('DiscoveryResponse has summary and careers fields', () => {
    // Type-level check only — build a minimal conforming object.
    const summary: AssessmentSummary = {
      profileType: 'The Analytical Innovator',
      tagline: 'You break problems down before building anything.',
      motivations: ['Solving hard problems', 'Building systems', 'Continuous learning'],
      interests: ['Data analysis', 'Systems design', 'Research', 'Automation'],
      strengths: [
        { label: 'Logical thinking', description: 'You approach problems systematically.' },
        { label: 'Attention to detail', description: 'You rarely miss edge cases.' },
        { label: 'Research skills', description: 'You dig deep before deciding.' },
        { label: 'Pattern recognition', description: 'You spot trends quickly.' },
        { label: 'Persistence', description: 'You keep going when others give up.' },
      ],
      growthAreas: ['Communication', 'Delegation', 'Collaboration', 'Flexibility'],
      environmentFits: ['Structured teams', 'Research labs', 'Tech companies', 'Startups'],
      environmentMismatch: 'High-pressure sales environments with no clear metrics.',
      actionSteps: {
        thisMonth: 'Take an online data analysis course.',
        thisYear: 'Build a personal project using a new technology.',
        longTerm: 'Aim for a senior engineer or architect role.',
      },
      closingStatement: 'Your analytical mind is exactly what the tech industry needs.',
    };

    const career: CareerPath = {
      title: 'Data Engineer',
      whatTheyDo: ['Build data pipelines', 'Maintain data warehouses', 'Work with analytics teams'],
      whyItFits: ['Your Analytical dominance fits data-heavy roles.', 'Your People score shows team collaboration.'],
      dayInLife: 'You spend mornings writing SQL and afternoons in standups.',
      skills: ['SQL', 'Python', 'ETL', 'Cloud platforms'],
      tryItNow: 'Set up a free Kaggle account and complete a beginner dataset challenge.',
      phContext: 'Philippine BPO and tech sectors have strong demand for data engineers.',
    };

    const response: DiscoveryResponse = {
      summary,
      careers: [career, career, career],
    };

    expect(response.careers).toHaveLength(3);
    expect(response.summary.profileType).toBe('The Analytical Innovator');
  });
});
