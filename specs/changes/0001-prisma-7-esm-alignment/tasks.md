# Prisma 7 ESM Alignment Tasks

## Specification

- [x] Create the change spec.
- [x] Create the implementation plan.
- [x] Create the task list.
- [x] Approve the change for implementation.

## Configuration

- [x] Set the project package module type to ESM.
- [x] Update TypeScript configuration for ESM-compatible compilation.
- [x] Confirm Vitest configuration remains compatible with ESM.
- [x] Confirm build configuration emits the expected output.

## Prisma

- [x] Change the Prisma generator to `prisma-client`.
- [x] Configure the generated Prisma Client output path.
- [x] Select and document the Prisma client module format.
- [x] Update Prisma Client imports to use the generated client.
- [x] Load `.env` explicitly in `prisma.config.ts`.
- [x] Decide whether `src/generated/prisma` is ignored or committed.

## Scripts and Documentation

- [x] Ensure Prisma Client generation runs before commands that require generated types.
- [x] Update README setup instructions.
- [x] Update README database instructions.
- [x] Update documented scripts if they change.

## Verification

- [x] Run `npm run prisma:generate`.
- [x] Run `npm run typecheck`.
- [x] Run `npm run build`.
- [x] Run `npm run test`.
- [x] Run `npm run prisma:migrate`, if a development database is available.
- [x] Record any command that could not be run and why.

## Completion

- [x] Confirm existing product behavior is unchanged.
- [x] Confirm tasks reflect completed work.
- [x] Update this change status to `completed` after implementation and verification.
