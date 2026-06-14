export type ServiceErrorType =
  | 'PROMPT_CONSTRUCTION_ERROR'
  | 'GEMINI_API_ERROR'
  | 'GEMINI_TIMEOUT_ERROR'
  | 'PARSE_FAILURE'
  | 'SCHEMA_VIOLATION'
  | 'EMPTY_RESULT';

export class ServiceError extends Error {
  constructor(
    public readonly type: ServiceErrorType,
    message: string,
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}
