# Prisma 7 ESM Alignment Change Spec

Status: completed

## Problem

The project currently uses Prisma 7 with the deprecated `prisma-client-js` generator and imports `PrismaClient` from `@prisma/client`.

The runtime package is configured as CommonJS, while current Prisma 7 guidance for new projects recommends the `prisma-client` generator with an explicit generated output path and direct imports from the generated client.

The application loads environment variables through `loadEnvFile` in `src/config/env.ts`, but Prisma CLI configuration is loaded separately through `prisma.config.ts`. As a result, Prisma CLI commands depend on `DATABASE_URL` already being exported in the shell environment unless the config file loads `.env` explicitly.

## Intended Change

Migrate the project to a Prisma 7 aligned ESM setup:

- set the package module type to ESM;

- update TypeScript configuration for ESM-compatible compilation and resolution;

- replace the Prisma generator with `prisma-client`;

- generate the Prisma client into `src/generated/prisma`;

- import `PrismaClient` from the generated client path instead of `@prisma/client`;

- load `.env` explicitly from `prisma.config.ts`;

- ensure project scripts generate Prisma Client before type checking, building, and testing when needed;

- decide whether `src/generated/prisma` is committed or ignored, and document that decision.

The change must preserve all existing product behavior.

## Affected Files and Modules

Expected affected files:

- `package.json`

- `tsconfig.json`

- `tsconfig.build.json`

- `vitest.config.mts`

- `prisma/schema.prisma`

- `prisma.config.ts`

- `src/db/prisma.ts`

- any source or test imports that require ESM-compatible file extensions or generated Prisma client paths

- `.gitignore`

- `.env.example`, if environment loading or setup documentation changes

- `README.md`

## Behavior That Must Remain Unchanged

- Public API endpoints and response shapes remain unchanged.

- Authentication behavior remains unchanged.

- Database schema models and migrations remain unchanged unless a technical requirement is discovered and documented before implementation.

- Prisma access remains encapsulated behind repositories.

- Environment variables remain validated on application startup.

- Tests continue to use the test database and remain isolated.

## Constraints

- Do not introduce unrelated dependencies.

- Do not change product behavior as part of this migration.

- Do not add new architecture layers.

- Keep generated-client import paths explicit and reviewable.

- If `dotenv` is introduced, document why the Node.js `loadEnvFile` approach is not sufficient for Prisma CLI configuration in this project.

## Verification

The implementation must be verified with:

```bash
npm run prisma:generate
npm run typecheck
npm run build
npm run test
```

Migration validation should also be run when a development database is available:

```bash
npm run prisma:migrate
```

If a command cannot be run, the reason must be recorded in `tasks.md` and reported in the final implementation summary.

## Acceptance Criteria

- `prisma/schema.prisma` uses `provider = "prisma-client"` with an explicit output path.

- The generated Prisma client is imported from the configured output path.

- `prisma.config.ts` loads `.env` explicitly before reading `DATABASE_URL`.

- The project runs as ESM.

- TypeScript compilation succeeds.

- The application build succeeds.

- The test suite succeeds.

- README setup and database instructions match the new Prisma workflow.

- `tasks.md` reflects completed implementation and verification work.
