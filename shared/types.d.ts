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
export type QuizResult = StepSummary[];
export interface AssessmentSummary {
    profileType: string;
    tagline: string;
    motivations: [string, string, string];
    interests: [string, string, string, string];
    strengths: [
        {
            label: string;
            description: string;
        },
        {
            label: string;
            description: string;
        },
        {
            label: string;
            description: string;
        },
        {
            label: string;
            description: string;
        },
        {
            label: string;
            description: string;
        }
    ];
    growthAreas: [string, string, string, string];
    environmentFits: [string, string, string, string];
    environmentMismatch: string;
    actionSteps: {
        thisMonth: string;
        thisYear: string;
        longTerm: string;
    };
    closingStatement: string;
}
export interface CareerPath {
    title: string;
    whatTheyDo: [string, string, string];
    whyItFits: [string, string];
    dayInLife: string;
    skills: string[];
    tryItNow: string;
    phContext: string;
}
export interface DiscoveryRequest {
    quizResult: QuizResult;
    stabilityPriority: number;
}
export interface DiscoveryResponse {
    summary: AssessmentSummary;
    careers: [CareerPath, CareerPath, CareerPath];
}
