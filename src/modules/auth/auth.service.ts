import { createAccessToken } from "../../shared/auth/jwt";
import { hashPassword, verifyPassword } from "../../shared/auth/password";
import { AppError } from "../../shared/errors/app-error";
import { errorCodes } from "../../shared/errors/error-codes";
import { toPublicUser } from "../users/user.mapper";
import { UserRepository } from "../users/user.repository";
import type { PublicUser } from "../users/user.types";
import type { LoginInput, RegisterInput } from "./auth.schemas";

type AuthResult = {
  user: PublicUser;
  accessToken: string;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export class AuthService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async register(input: RegisterInput): Promise<AuthResult> {
    const email = normalizeEmail(input.email);
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError(409, errorCodes.conflict, "Email is already registered");
    }

    const passwordHash = await hashPassword(input.password);
    const user = await this.userRepository.create({ email, passwordHash });

    return {
      user: toPublicUser(user),
      accessToken: createAccessToken(user.id)
    };
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const email = normalizeEmail(input.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(401, errorCodes.authentication, "Invalid email or password");
    }

    const passwordMatches = await verifyPassword(input.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError(401, errorCodes.authentication, "Invalid email or password");
    }

    return {
      user: toPublicUser(user),
      accessToken: createAccessToken(user.id)
    };
  }

  async getCurrentUser(userId: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(401, errorCodes.authentication, "Invalid or expired access token");
    }

    return toPublicUser(user);
  }
}
