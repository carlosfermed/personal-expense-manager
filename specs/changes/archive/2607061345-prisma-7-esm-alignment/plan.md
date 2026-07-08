# Prisma 7 ESM Alignment Plan

## Implementation Plan

1. Review the current Prisma, TypeScript, Vitest, build, and runtime configuration.
2. Update package and TypeScript configuration to run the project as ESM.
3. Change the Prisma generator to `prisma-client` with `output = "../src/generated/prisma"` and the selected module format.
4. Update Prisma client imports to use the generated client path.
5. Load `.env` explicitly in `prisma.config.ts` before reading `DATABASE_URL`.
6. Update scripts so Prisma Client generation happens before commands that require generated types.
7. Decide and document whether `src/generated/prisma` is ignored or committed.
8. Update README setup, scripts, and database instructions.
9. Run Prisma generation, TypeScript validation, build, tests, and migration validation when possible.
10. Mark completed tasks and update the change status when implementation is finished.

## Verification Strategy

Verify the change at configuration, compile, runtime, and test levels:

- Prisma client generation confirms the generator and output path are valid.

- TypeScript validation confirms imports, module resolution, and generated types are correct.

- Build validation confirms emitted JavaScript can be produced for the configured module system.

- Integration tests confirm existing API behavior did not change.

- Prisma migration validation confirms CLI environment loading and database connectivity are correct when a development database is available.
