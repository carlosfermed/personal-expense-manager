import express from "express";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { AppError } from "./shared/errors/app-error.js";
import { errorCodes } from "./shared/errors/error-codes.js";
import { errorHandler } from "./shared/errors/error-handler.js";

export const app = express();

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.use("/api/v1/auth", authRoutes);

app.use((_request, _response, next) => {
  next(new AppError(404, errorCodes.notFound, "Resource not found"));
});

app.use(errorHandler);
