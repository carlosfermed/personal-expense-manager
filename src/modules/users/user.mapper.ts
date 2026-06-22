import type { PublicUser, UserRecord } from "./user.types";

export const toPublicUser = (user: UserRecord): PublicUser => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt.toISOString()
});
