import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { app } from "../src/app.js";
import { prisma } from "../src/db/prisma.js";
import { resetDatabase } from "./helpers/db.js";

const uniqueEmail = () => `user-${crypto.randomUUID()}@example.com`;

const registerUser = async (email = uniqueEmail(), password = "secure123") => {
  const response = await request(app)
    .post("/api/v1/auth/register")
    .send({ email, password })
    .expect(201);

  return {
    email: response.body.data.user.email as string,
    password,
    user: response.body.data.user as { id: string; email: string; createdAt: string },
    accessToken: response.body.data.accessToken as string
  };
};

describe("auth endpoints", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("registers a user, hashes the password, and returns public data with an access token", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "USER@example.com", password: "secure123" })
      .expect(201);

    expect(response.body.data.user).toMatchObject({
      id: expect.any(String),
      email: "user@example.com",
      createdAt: expect.any(String)
    });
    expect(response.body.data.accessToken).toEqual(expect.any(String));
    expect(response.body.data.user).not.toHaveProperty("password");
    expect(response.body.data.user).not.toHaveProperty("passwordHash");

    const storedUser = await prisma.user.findUniqueOrThrow({
      where: { email: "user@example.com" }
    });

    expect(storedUser.passwordHash).not.toBe("secure123");
    await expect(bcrypt.compare("secure123", storedUser.passwordHash)).resolves.toBe(true);
  });

  it("rejects invalid registration requests", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "not-an-email", password: "short" })
      .expect(400);

    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects registration when the normalized email already exists", async () => {
    await registerUser("duplicate@example.com");

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "DUPLICATE@example.com", password: "secure123" })
      .expect(409);

    expect(response.body.error).toMatchObject({
      code: "CONFLICT",
      message: "Email is already registered"
    });
  });

  it("logs in a registered user with valid credentials", async () => {
    const registered = await registerUser();

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: registered.email.toUpperCase(), password: registered.password })
      .expect(200);

    expect(response.body.data.user).toMatchObject({
      id: registered.user.id,
      email: registered.email,
      createdAt: registered.user.createdAt
    });
    expect(response.body.data.accessToken).toEqual(expect.any(String));
    expect(response.body.data.user).not.toHaveProperty("passwordHash");
  });

  it("returns the same generic error for unknown email and incorrect password", async () => {
    const registered = await registerUser();

    const unknownEmailResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: uniqueEmail(), password: "secure123" })
      .expect(401);

    const incorrectPasswordResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: registered.email, password: "wrong123" })
      .expect(401);

    expect(unknownEmailResponse.body.error).toEqual(incorrectPasswordResponse.body.error);
    expect(unknownEmailResponse.body.error).toMatchObject({
      code: "AUTHENTICATION_ERROR",
      message: "Invalid email or password"
    });
  });

  it("authenticates requests with a valid bearer token", async () => {
    const registered = await registerUser();

    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${registered.accessToken}`)
      .expect(200);

    expect(response.body.data.user).toEqual(registered.user);
    expect(response.body.data.user).not.toHaveProperty("password");
    expect(response.body.data.user).not.toHaveProperty("passwordHash");
  });

  it("rejects current-user retrieval without an authorization header", async () => {
    const response = await request(app).get("/api/v1/auth/me").expect(401);

    expect(response.body.error.code).toBe("AUTHENTICATION_ERROR");
  });

  it("rejects malformed authorization headers", async () => {
    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", "Token abc")
      .expect(401);

    expect(response.body.error.code).toBe("AUTHENTICATION_ERROR");
  });

  it("rejects invalid bearer tokens", async () => {
    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", "Bearer invalid-token")
      .expect(401);

    expect(response.body.error.code).toBe("AUTHENTICATION_ERROR");
  });

  it("rejects expired bearer tokens", async () => {
    const registered = await registerUser();
    const expiredToken = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: registered.user.id,
      expiresIn: "-1s"
    });

    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${expiredToken}`)
      .expect(401);

    expect(response.body.error.code).toBe("AUTHENTICATION_ERROR");
  });
});
