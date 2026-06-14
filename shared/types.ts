/**
 * Shared TypeScript types for Calibrate.
 * Consumed by both the NestJS backend (`backend/`) and the React frontend (`frontend/`).
 */

// ── Core domain types ────────────────────────────────────────────────────────

export type AnswerCategory = 'Analytical' | 'Creative' | 'Leadership' | 'People';

export interface StepSummary {
  dominantCategory: AnswerCategory;
  answerCounts: {
    Analytical: number;
    Creative: number;
    Leadership: number;
    People: number;
  };
}

/** Exactly 6 StepSummary objects — one per quiz step. */
export type QuizResult = StepSummary[];

// ── Assessment Summary ────────────────────────────────────────────────────────

export interface AssessmentSummary {
  /** Short label reflecting the dominant category pattern across all 6 steps (non-empty). */
  profileType: string;
  /** One sentence capturing the student's orientation (non-empty). */
  tagline: string;
  /** Exactly 3 non-empty strings describing what drives the student. */
  motivations: [string, string, string];
  /** Exactly 4 non-empty strings describing interest areas. */
  interests: [string, string, string, string];
  /** Exactly 5 objects, each with a short label and a one-sentence description. */
  strengths: [
    { label: string; description: string },
    { label: string; description: string },
    { label: string; description: string },
    { label: string; description: string },
    { label: string; description: string },
  ];
  /** Exactly 4 non-empty strings describing areas to develop. */
  growthAreas: [string, string, string, string];
  /** Exactly 4 non-empty strings describing work environments the student thrives in. */
  environmentFits: [string, string, string, string];
  /** One non-empty string describing an environment the student would struggle in. */
  environmentMismatch: string;
  actionSteps: {
    /** 1–2 sentences (non-empty). */
    thisMonth: string;
    /** 1–2 sentences (non-empty). */
    thisYear: string;
    /** 1–2 sentences (non-empty). */
    longTerm: string;
  };
  /** One encouraging sentence grounded in the quiz pattern (non-empty). */
  closingStatement: string;
}

// ── Career Path ───────────────────────────────────────────────────────────────

export interface CareerPath {
  /** Non-empty career title. */
  title: string;
  /** Exactly 3 non-empty strings describing the actual work. */
  whatTheyDo: [string, string];
  /** Exactly 2 non-empty strings referencing the student's dominant categories. */
  whyItFits: [string, string];
  /** One short paragraph describing a day in the life (non-empty). */
  dayInLife: string;
  /** One or more non-empty skill strings. */
  skills: string[];
  /** One free, actionable activity (non-empty). */
  tryItNow: string;
  /** One sentence naming a specific Philippine industry sector (non-empty). */
  phContext: string;
}

// ── Request / Response ────────────────────────────────────────────────────────

export interface DiscoveryRequest {
  /** Exactly 6 StepSummary objects derived from the quiz. */
  quizResult: QuizResult;
  /** Integer 1–5 derived from Step 6 answers via deriveStabilityPriority(). */
  stabilityPriority: number;
}

export interface DiscoveryResponse {
  summary: AssessmentSummary;
  /** Exactly 3 CareerPath objects. */
  careers: [CareerPath, CareerPath, CareerPath];
}
