import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { DiscoveryResponse, QuizResult } from '@shared';

import { ServiceError } from './service-error';

// ── System Prompt Template ────────────────────────────────────────────────────

const SYSTEM_PROMPT_TEMPLATE = `You are a career exploration and self-assessment assistant for Filipino students aged 17–19.

The student has completed a 30-question quiz across 6 steps: Interests, Strengths, Work Style, Values, Future Vision, and Career Motivations. Each answer maps to one of four categories: Analytical, Creative, Leadership, or People-oriented.

You will receive:
- quizResult: an array of 6 step summaries, each with a dominantCategory and answerCounts per category
- stabilityPriority: an integer from 1–5 derived from Step 6 answers

stabilityPriority guide:
- 1–2: prioritise careers that align deeply with passion, even if unconventional
- 3: balance passion and financial viability equally
- 4–5: favour careers with strong, stable demand in the Philippine job market

All careers must be grounded in the Philippine context: local industries, BPO, tech, creative, or emerging sectors.

Return a single JSON object with two fields: "summary" and "careers". No preamble. No markdown fences.

"summary" must be an AssessmentSummary object with:
- profileType: a short label reflecting the dominant category pattern across all 6 steps
- tagline: one sentence capturing the student's orientation
- motivations: exactly 3 strings describing what drives this student
- interests: exactly 4 strings describing their interest areas
- strengths: exactly 5 objects, each with "label" (short name) and "description" (1 sentence)
- growthAreas: exactly 4 strings describing areas to develop
- environmentFits: exactly 4 strings describing work environments this student would thrive in
- environmentMismatch: one string describing an environment they would struggle in
- actionSteps: object with "thisMonth", "thisYear", and "longTerm" string fields (each 1–2 sentences)
- closingStatement: one encouraging sentence grounded in their specific quiz pattern

"careers" must be an array of exactly 3 CareerPath objects. Each must include:
- title
- whatTheyDo: exactly 3 bullet strings describing the actual work
- whyItFits: exactly 2 bullet strings referencing the student's dominant categories and answer patterns
- dayInLife: 1 short paragraph
- skills: array of skill strings
- tryItNow: 1 free, actionable activity
- phContext: 1 sentence naming a specific Philippine industry sector (BPO, tech, creative, emerging, healthcare, education, or infrastructure)

Rules:
- Write for a 17–19 year old. Be direct, not preachy. No motivational platitudes. Max 3 sentences per descriptive field.
- Include at least one career the student would never think to Google.
- Never recommend a career just because it sounds impressive. Only recommend what genuinely fits the quiz pattern.
- Each whyItFits bullet must explicitly reference the student's dominant Answer Categories or notable step patterns.
- Cite at least one specific quiz attribute as the basis for each recommendation. Do not cite prestige.

Quiz result: {{quizResult}}
Stability priority: {{stabilityPriority}}`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function isNonEmptyString(s: unknown): boolean {
  return typeof s === 'string' && s.trim().length > 0;
}

function isNonEmptyStringArray(arr: unknown, exactLength: number): boolean {
  if (!Array.isArray(arr)) return false;
  if (arr.length !== exactLength) return false;
  return arr.every((item) => isNonEmptyString(item));
}

// ── ExposureService ───────────────────────────────────────────────────────────

@Injectable()
export class ExposureService {
  /**
   * Assembles the full Gemini prompt by interpolating quizResult and
   * stabilityPriority into the System Prompt template.
   *
   * Throws PROMPT_CONSTRUCTION_ERROR if any required input is absent.
   */
  buildPrompt(quizResult: QuizResult, stabilityPriority: number): string {
    if (!SYSTEM_PROMPT_TEMPLATE) {
      throw new ServiceError(
        'PROMPT_CONSTRUCTION_ERROR',
        'System prompt template is missing or empty.',
      );
    }
    if (!quizResult) {
      throw new ServiceError(
        'PROMPT_CONSTRUCTION_ERROR',
        'quizResult is required for prompt construction.',
      );
    }
    if (stabilityPriority === undefined || stabilityPriority === null) {
      throw new ServiceError(
        'PROMPT_CONSTRUCTION_ERROR',
        'stabilityPriority is required for prompt construction.',
      );
    }

    return SYSTEM_PROMPT_TEMPLATE.replace(
      '{{quizResult}}',
      JSON.stringify(quizResult, null, 2),
    ).replace('{{stabilityPriority}}', String(stabilityPriority));
  }

  /**
   * Orchestrates the full discovery flow: builds the prompt, calls Gemini,
   * parses and validates the response, and returns a typed DiscoveryResponse.
   */
  async discover(quizResult: QuizResult, stabilityPriority: number): Promise<DiscoveryResponse> {
    const prompt = this.buildPrompt(quizResult, stabilityPriority);
    const raw = await this.callGemini(prompt);
    return this.parseAndValidate(raw);
  }

  /**
   * Sends `prompt` to the Gemini API and returns the raw text response.
   *
   * Uses a 10-second AbortController/Promise.race timeout.
   * Throws:
   *   - GEMINI_TIMEOUT_ERROR — if no response arrives within 10 seconds
   *   - GEMINI_API_ERROR     — if the SDK throws for any other reason
   *
   * On success, logs the response status and timestamp (Requirement 5.1).
   */
  async callGemini(prompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY ?? '';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const TIMEOUT_MS = 10_000;

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(
          new ServiceError(
            'GEMINI_TIMEOUT_ERROR',
            'Gemini API did not respond within 10 seconds.',
          ),
        );
      }, TIMEOUT_MS);
    });

    let rawText: string;
    try {
      const result = await Promise.race([
        model.generateContent(prompt),
        timeoutPromise,
      ]);

      rawText = result.response.text();
    } catch (err) {
      // Re-throw ServiceErrors (including GEMINI_TIMEOUT_ERROR) unchanged
      if (err instanceof ServiceError) {
        throw err;
      }
      // Wrap any SDK / network error as GEMINI_API_ERROR
      throw new ServiceError(
        'GEMINI_API_ERROR',
        `Gemini API call failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    console.log('[callGemini] status: success, timestamp:', new Date().toISOString());

    return rawText;
  }

  /**
   * Strips optional markdown fences from `raw`, parses it as JSON, validates
   * both `summary` and `careers` against the full DiscoveryResponse schema,
   * and returns a typed DiscoveryResponse.
   *
   * Throws:
   *   - PARSE_FAILURE    — if `raw` is not valid JSON after fence stripping
   *   - SCHEMA_VIOLATION — if the parsed object violates any field constraint
   *   - EMPTY_RESULT     — if `careers` is a valid array but has 0 elements
   */
  parseAndValidate(raw: string): DiscoveryResponse {
    // Step 1: Strip optional markdown fences
    const stripped = raw
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '');

    // Step 2: Parse JSON
    let parsed: unknown;
    try {
      parsed = JSON.parse(stripped);
    } catch {
      throw new ServiceError(
        'PARSE_FAILURE',
        'Gemini response is not valid JSON.',
      );
    }

    // Step 3: Ensure parsed value is an object
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'Parsed response is not a JSON object.',
      );
    }

    const obj = parsed as Record<string, unknown>;

    // Step 4: Validate `summary`
    this.validateSummary(obj['summary']);

    // Step 5: Validate `careers`
    this.validateCareers(obj['careers']);

    return parsed as DiscoveryResponse;
  }

  // ── Private validation helpers ─────────────────────────────────────────────

  private validateSummary(summary: unknown): void {
    if (typeof summary !== 'object' || summary === null || Array.isArray(summary)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary is missing or not an object.',
      );
    }

    const s = summary as Record<string, unknown>;

    // profileType
    if (!isNonEmptyString(s['profileType'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.profileType must be a non-empty string.',
      );
    }

    // tagline
    if (!isNonEmptyString(s['tagline'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.tagline must be a non-empty string.',
      );
    }

    // motivations: exactly 3 non-empty strings
    if (!isNonEmptyStringArray(s['motivations'], 3)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.motivations must be an array of exactly 3 non-empty strings.',
      );
    }

    // interests: exactly 4 non-empty strings
    if (!isNonEmptyStringArray(s['interests'], 4)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.interests must be an array of exactly 4 non-empty strings.',
      );
    }

    // strengths: exactly 5 objects with label and description
    if (!Array.isArray(s['strengths']) || s['strengths'].length !== 5) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.strengths must be an array of exactly 5 objects.',
      );
    }
    for (let i = 0; i < 5; i++) {
      const strength = (s['strengths'] as unknown[])[i];
      if (
        typeof strength !== 'object' ||
        strength === null ||
        Array.isArray(strength)
      ) {
        throw new ServiceError(
          'SCHEMA_VIOLATION',
          `summary.strengths[${i}] must be an object.`,
        );
      }
      const st = strength as Record<string, unknown>;
      if (!isNonEmptyString(st['label'])) {
        throw new ServiceError(
          'SCHEMA_VIOLATION',
          `summary.strengths[${i}].label must be a non-empty string.`,
        );
      }
      if (!isNonEmptyString(st['description'])) {
        throw new ServiceError(
          'SCHEMA_VIOLATION',
          `summary.strengths[${i}].description must be a non-empty string.`,
        );
      }
    }

    // growthAreas: exactly 4 non-empty strings
    if (!isNonEmptyStringArray(s['growthAreas'], 4)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.growthAreas must be an array of exactly 4 non-empty strings.',
      );
    }

    // environmentFits: exactly 4 non-empty strings
    if (!isNonEmptyStringArray(s['environmentFits'], 4)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.environmentFits must be an array of exactly 4 non-empty strings.',
      );
    }

    // environmentMismatch
    if (!isNonEmptyString(s['environmentMismatch'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.environmentMismatch must be a non-empty string.',
      );
    }

    // actionSteps
    if (
      typeof s['actionSteps'] !== 'object' ||
      s['actionSteps'] === null ||
      Array.isArray(s['actionSteps'])
    ) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.actionSteps must be an object.',
      );
    }
    const as_ = s['actionSteps'] as Record<string, unknown>;
    if (!isNonEmptyString(as_['thisMonth'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.actionSteps.thisMonth must be a non-empty string.',
      );
    }
    if (!isNonEmptyString(as_['thisYear'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.actionSteps.thisYear must be a non-empty string.',
      );
    }
    if (!isNonEmptyString(as_['longTerm'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.actionSteps.longTerm must be a non-empty string.',
      );
    }

    // closingStatement
    if (!isNonEmptyString(s['closingStatement'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'summary.closingStatement must be a non-empty string.',
      );
    }
  }

  private validateCareers(careers: unknown): void {
    // Missing or wrong type
    if (!Array.isArray(careers)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        'careers is missing or not an array.',
      );
    }

    // Empty array → EMPTY_RESULT
    if (careers.length === 0) {
      throw new ServiceError(
        'EMPTY_RESULT',
        'careers array is empty.',
      );
    }

    // Wrong count (not exactly 3) → SCHEMA_VIOLATION
    if (careers.length !== 3) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers must be an array of exactly 3 Career Path objects, got ${careers.length}.`,
      );
    }

    for (let i = 0; i < 3; i++) {
      this.validateCareerPath(careers[i], i);
    }
  }

  private validateCareerPath(career: unknown, index: number): void {
    if (typeof career !== 'object' || career === null || Array.isArray(career)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}] must be an object.`,
      );
    }

    const c = career as Record<string, unknown>;

    // title
    if (!isNonEmptyString(c['title'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}].title must be a non-empty string.`,
      );
    }

    // whatTheyDo: exactly 3 non-empty strings
    if (!isNonEmptyStringArray(c['whatTheyDo'], 3)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}].whatTheyDo must be an array of exactly 3 non-empty strings.`,
      );
    }

    // whyItFits: exactly 2 non-empty strings
    if (!isNonEmptyStringArray(c['whyItFits'], 2)) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}].whyItFits must be an array of exactly 2 non-empty strings.`,
      );
    }

    // dayInLife
    if (!isNonEmptyString(c['dayInLife'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}].dayInLife must be a non-empty string.`,
      );
    }

    // skills: non-empty array of non-empty strings
    if (!Array.isArray(c['skills']) || c['skills'].length === 0) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}].skills must be a non-empty array.`,
      );
    }
    for (let j = 0; j < (c['skills'] as unknown[]).length; j++) {
      if (!isNonEmptyString((c['skills'] as unknown[])[j])) {
        throw new ServiceError(
          'SCHEMA_VIOLATION',
          `careers[${index}].skills[${j}] must be a non-empty string.`,
        );
      }
    }

    // tryItNow
    if (!isNonEmptyString(c['tryItNow'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}].tryItNow must be a non-empty string.`,
      );
    }

    // phContext
    if (!isNonEmptyString(c['phContext'])) {
      throw new ServiceError(
        'SCHEMA_VIOLATION',
        `careers[${index}].phContext must be a non-empty string.`,
      );
    }
  }
}
