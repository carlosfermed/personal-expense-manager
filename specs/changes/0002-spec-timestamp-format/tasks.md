# Specification Timestamp Format Tasks

## Specification

- [x] Create the change spec.
- [x] Create the implementation plan.
- [x] Create the task list.
- [ ] Approve the change for implementation.

## Discovery

- [ ] List existing feature specification folders.
- [ ] List existing change specification folders.
- [ ] Search for references to old specification folder names.
- [ ] Decide and document migration timestamps for existing folders.

## Folder Migration

- [ ] Rename existing feature spec folders to `YYMMDDHHMM-kebab-case-name`.
- [ ] Rename existing change spec folders to `YYMMDDHHMM-kebab-case-name`.
- [ ] Confirm each renamed folder still contains `spec.md`, `plan.md`, and `tasks.md`.

## Documentation

- [ ] Update `AGENTS.md` feature workflow naming rules.
- [ ] Update `AGENTS.md` change workflow naming rules.
- [ ] Update `specs/technical-spec.md` specification workflow naming rules.
- [ ] Update any README references to old specification paths, if present.
- [ ] Update any other stale documentation references to old specification paths.

## Verification

- [ ] Run the folder listing verification command.
- [ ] Run a text search for old specification path references.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test`.
- [ ] Record any command that could not be run and why.

## Completion

- [ ] Confirm no product behavior changed.
- [ ] Confirm tasks reflect completed work.
- [ ] Update this change status to `completed` after implementation and verification.
