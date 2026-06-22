export const errorCodes = {
  validation: "VALIDATION_ERROR",
  authentication: "AUTHENTICATION_ERROR",
  forbidden: "FORBIDDEN",
  notFound: "NOT_FOUND",
  conflict: "CONFLICT",
  internalServer: "INTERNAL_SERVER_ERROR"
} as const;

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];
