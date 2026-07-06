# Specification Timestamp Format Tasks

## Specification

- [x] Create the change spec.
- [x] Create the implementation plan.
- [x] Create the task list.
- [x] Approve the change for implementation.

## Discovery

- [x] List existing feature specification folders.
- [x] List existing change specification folders.
- [x] Search for references to old specification folder names.
- [x] Decide and document migration timestamps for existing folders.

Migration timestamp decisions:

- `specs/features/0001-initial-mvp` -> `specs/features/2606191349-initial-mvp`, based on commit `4a1e20f` from `2026-06-19T13:49:37+02:00`.
- `specs/features/0002-auth` -> `specs/features/2607061345-auth`, based on commit `3bf71e5` from `2026-07-06T13:45:39+02:00`.
- `specs/changes/0001-prisma-7-esm-alignment` -> `specs/changes/2607061345-prisma-7-esm-alignment`, based on commit `3bf71e5` from `2026-07-06T13:45:39+02:00`.
- `specs/changes/0002-spec-timestamp-format` -> `specs/changes/2607061415-spec-timestamp-format`, based on the branch timestamp selected for this change.

## Folder Migration

- [x] Rename existing feature spec folders to `YYMMDDHHMM-kebab-case-name`.
- [x] Rename existing change spec folders to `YYMMDDHHMM-kebab-case-name`.
- [x] Confirm each renamed folder still contains `spec.md`, `plan.md`, and `tasks.md`.

## Documentation

- [x] Update `AGENTS.md` feature workflow naming rules.
- [x] Update `AGENTS.md` change workflow naming rules.
- [x] Update `specs/technical-spec.md` specification workflow naming rules.
- [x] Update any README references to old specification paths, if present.
- [x] Update any other stale documentation references to old specification paths.

## Verification

- [x] Run the folder listing verification command.
- [x] Run a text search for old specification path references.
- [x] Run `npm run typecheck`.
- [x] Run `npm run test`.
- [x] Record any command that could not be run and why.

Verification notes:

- `find specs/features specs/changes -mindepth 1 -maxdepth 1 -type d` confirmed all feature and change folders use `YYMMDDHHMM-kebab-case-name`.
- Text search found old specification paths only in the migration decision log above.
- No verification command was skipped.

## Completion

- [x] Confirm no product behavior changed.
- [x] Confirm tasks reflect completed work.
- [x] Update this change status to `completed` after implementation and verification.
