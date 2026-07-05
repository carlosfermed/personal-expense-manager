import { prisma } from "../../src/db/prisma.js";

export const resetDatabase = async () => {
  await prisma.user.deleteMany();
};
