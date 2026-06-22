import { prisma } from "../../src/db/prisma";

export const resetDatabase = async () => {
  await prisma.user.deleteMany();
};
