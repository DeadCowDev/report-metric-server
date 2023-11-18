export type ErrorCode = 'UNKNOWN' | 'PARSE_ERROR';

export interface ApiError {
  message: string;
  statusCode: number;
  errorCode: ErrorCode;
}

export type ErrorsMap = Record<ErrorCode, ApiError>;
