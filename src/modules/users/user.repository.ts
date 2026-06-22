import { prisma } from "../../db/prisma";
import type { UserRecord } from "./user.types";

type CreateUserInput = {
  email: string;
  passwordHash: string;
};

export class UserRepository {
  findByEmail(email: string): Promise<UserRecord | null> {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  findById(id: string): Promise<UserRecord | null> {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  create(input: CreateUserInput): Promise<UserRecord> {
    return prisma.user.create({
      data: input
    });
  }
}
