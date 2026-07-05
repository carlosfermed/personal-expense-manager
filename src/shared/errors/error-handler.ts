import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { env } from "../../config/env.js";
import { logger } from "../logger/logger.js";
import { AppError } from "./app-error.js";
import { errorCodes } from "./error-codes.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details === undefined ? {} : { details: error.details })
      }
    });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: errorCodes.validation,
        message: "Invalid request data",
        details: error.issues
      }
    });
    return;
  }

  logger.error(error instanceof Error ? error.message : "Unexpected error");

  response.status(500).json({
    error: {
      code: errorCodes.internalServer,
      message: env.NODE_ENV === "production" ? "Internal server error" : "Internal server error"
    }
  });
};
