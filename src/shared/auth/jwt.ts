import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { env } from "../../config/env.js";
import { AppError } from "../errors/app-error.js";
import { errorCodes } from "../errors/error-codes.js";

type AccessTokenPayload = {
  sub: string;
};

export const createAccessToken = (userId: string) =>
  jwt.sign({}, env.JWT_SECRET, {
    subject: userId,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  });

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (typeof payload !== "object" || typeof payload.sub !== "string") {
      throw new AppError(401, errorCodes.authentication, "Invalid or expired access token");
    }

    return { sub: payload.sub };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(401, errorCodes.authentication, "Invalid or expired access token");
  }
};
