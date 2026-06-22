import type { Request, Response } from "express";

import { AuthService } from "./auth.service";

const authService = new AuthService();

export const register = async (request: Request, response: Response) => {
  const result = await authService.register(request.body);

  response.status(201).json({ data: result });
};

export const login = async (request: Request, response: Response) => {
  const result = await authService.login(request.body);
    
  response.status(200).json({ data: result });
};

export const me = async (request: Request, response: Response) => {
  const user = await authService.getCurrentUser(request.auth.userId);

  response.status(200).json({ data: { user } });
};
