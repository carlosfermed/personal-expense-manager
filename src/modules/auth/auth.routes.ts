import { Router } from "express";

import { requireAuth } from "../../shared/auth/require-auth";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateBody } from "../../shared/http/validate-request";
import { login, me, register } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schemas";

export const authRoutes = Router();

authRoutes.post("/register", validateBody(registerSchema), asyncHandler(register));
authRoutes.post("/login", validateBody(loginSchema), asyncHandler(login));
authRoutes.get("/me", requireAuth, asyncHandler(me));
