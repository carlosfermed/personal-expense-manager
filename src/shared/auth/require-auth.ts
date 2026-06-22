import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "./jwt";
import { AppError } from "../errors/app-error";
import { errorCodes } from "../errors/error-codes";

const bearerPrefix = "Bearer ";

export const requireAuth = (request: Request, _response: Response, next: NextFunction) => {
  const authorization = request.header("authorization");

  if (!authorization) {
    next(new AppError(401, errorCodes.authentication, "Authentication required"));
    return;
  }

  if (!authorization.startsWith(bearerPrefix)) {
    next(new AppError(401, errorCodes.authentication, "Invalid authorization header"));
    return;
  }

  const token = authorization.slice(bearerPrefix.length).trim();

  if (!token) {
    next(new AppError(401, errorCodes.authentication, "Invalid authorization header"));
    return;
  }

  const payload = verifyAccessToken(token);
  request.auth = { userId: payload.sub };
  next();
};
