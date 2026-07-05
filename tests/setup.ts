process.env.NODE_ENV = "test";
process.env.PORT = "3000";
process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://perexmanager:perexmanager@localhost:5432/perexmanager_test";
process.env.JWT_SECRET = "test-jwt-secret-with-at-least-thirty-two-chars";
process.env.JWT_EXPIRES_IN = "1h";
