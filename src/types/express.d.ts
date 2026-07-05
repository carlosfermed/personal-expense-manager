declare global {
  namespace Express {
    type AuthContext = {
      userId: string;
    };

    interface Request {
      auth: AuthContext;
    }
  }
}

export {};
