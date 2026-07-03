import { Router } from "express";

import { requireAuth } from "../../shared/auth/require-auth.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { validateBody } from "../../shared/http/validate-request.js";
import { login, me, register } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";

export const authRoutes = Router();

authRoutes.post("/register", validateBody(registerSchema), asyncHandler(register));
authRoutes.post("/login", validateBody(loginSchema), asyncHandler(login));
authRoutes.get("/me", requireAuth, asyncHandler(me));
