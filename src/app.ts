import express from "express";

import { authRoutes } from "./modules/auth/auth.routes";
import { AppError } from "./shared/errors/app-error";
import { errorCodes } from "./shared/errors/error-codes";
import { errorHandler } from "./shared/errors/error-handler";

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
