# Prisma 7 ESM Alignment Tasks

## Specification

- [x] Create the change spec.
- [x] Create the implementation plan.
- [x] Create the task list.
- [ ] Approve the change for implementation.

## Configuration

- [ ] Set the project package module type to ESM.
- [ ] Update TypeScript configuration for ESM-compatible compilation.
- [ ] Confirm Vitest configuration remains compatible with ESM.
- [ ] Confirm build configuration emits the expected output.

## Prisma

- [ ] Change the Prisma generator to `prisma-client`.
- [ ] Configure the generated Prisma Client output path.
- [ ] Select and document the Prisma client module format.
- [ ] Update Prisma Client imports to use the generated client.
- [ ] Load `.env` explicitly in `prisma.config.ts`.
- [ ] Decide whether `src/generated/prisma` is ignored or committed.

## Scripts and Documentation

- [ ] Ensure Prisma Client generation runs before commands that require generated types.
- [ ] Update README setup instructions.
- [ ] Update README database instructions.
- [ ] Update documented scripts if they change.

## Verification

- [ ] Run `npm run prisma:generate`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Run `npm run test`.
- [ ] Run `npm run prisma:migrate`, if a development database is available.
- [ ] Record any command that could not be run and why.

## Completion

- [ ] Confirm existing product behavior is unchanged.
- [ ] Confirm tasks reflect completed work.
- [ ] Update this change status to `completed` after implementation and verification.
