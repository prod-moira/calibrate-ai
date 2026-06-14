/**
 * Smoke test — verifies that shared types are importable from the frontend.
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
} from '../../shared/types';

describe('Shared types — importability from frontend', () => {
  it('AnswerCategory values are the expected literals', () => {
    const categories: AnswerCategory[] = ['Analytical', 'Creative', 'Leadership', 'People'];
    expect(categories).toHaveLength(4);
  });

  it('StepSummary can be constructed with the correct shape', () => {
    const step: StepSummary = {
      dominantCategory: 'Leadership',
      answerCounts: { Analytical: 0, Creative: 1, Leadership: 4, People: 0 },
    };
    expect(step.dominantCategory).toBe('Leadership');
  });

  it('QuizResult is an array of 6 StepSummaries', () => {
    const step: StepSummary = {
      dominantCategory: 'People',
      answerCounts: { Analytical: 0, Creative: 0, Leadership: 1, People: 4 },
    };
    const result: QuizResult = [step, step, step, step, step, step];
    expect(result).toHaveLength(6);
  });

  it('DiscoveryRequest has stabilityPriority and quizResult', () => {
    const step: StepSummary = {
      dominantCategory: 'Analytical',
      answerCounts: { Analytical: 5, Creative: 0, Leadership: 0, People: 0 },
    };
    const req: DiscoveryRequest = {
      quizResult: [step, step, step, step, step, step],
      stabilityPriority: 2,
    };
    expect(req.stabilityPriority).toBe(2);
  });

  it('DiscoveryResponse has summary and careers tuple', () => {
    const summary: AssessmentSummary = {
      profileType: 'The Creative Connector',
      tagline: 'You lead through ideas, not just authority.',
      motivations: ['Expression', 'Connection', 'Impact'],
      interests: ['Design', 'Storytelling', 'Community', 'Media'],
      strengths: [
        { label: 'Empathy', description: 'You read people well.' },
        { label: 'Creativity', description: 'You bring fresh perspectives.' },
        { label: 'Communication', description: 'You express ideas clearly.' },
        { label: 'Adaptability', description: 'You handle change well.' },
        { label: 'Vision', description: 'You think long-term.' },
      ],
      growthAreas: ['Structure', 'Focus', 'Data skills', 'Conflict handling'],
      environmentFits: ['Creative agencies', 'NGOs', 'Media companies', 'Collaborative studios'],
      environmentMismatch: 'Rigid, process-heavy corporate environments.',
      actionSteps: {
        thisMonth: 'Start a personal creative project.',
        thisYear: 'Intern at a creative agency or media company.',
        longTerm: 'Build a portfolio that reflects your voice.',
      },
      closingStatement: 'Your creativity is a career asset, not just a hobby.',
    };

    const career: CareerPath = {
      title: 'UX Designer',
      whatTheyDo: ['Research user needs', 'Design interfaces', 'Test prototypes'],
      whyItFits: ['Your Creative dominance fits design roles.', 'Your People score shows user empathy.'],
      dayInLife: 'Mornings are spent in user interviews, afternoons in Figma.',
      skills: ['Figma', 'User research', 'Prototyping', 'Empathy mapping'],
      tryItNow: 'Redesign the home screen of your favourite app in Figma.',
      phContext: 'Philippine tech and BPO sectors have strong demand for UX designers.',
    };

    const response: DiscoveryResponse = {
      summary,
      careers: [career, career, career],
    };

    expect(response.careers).toHaveLength(3);
    expect(response.summary.tagline).toBeTruthy();
  });
});
