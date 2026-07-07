# Archive Completed Specs Change Spec

Status: completed

## 1. Problem

Completed feature and change specifications remain mixed with proposed, approved, and in-progress work under `specs/features/` and `specs/changes/`.

As the project grows, this makes it harder to identify current pending or active work from historical completed work.

## 2. Intended Internal Change

Completed feature specs may be moved under `specs/features/archive/`.

Completed change specs may be moved under `specs/changes/archive/`.

Archived spec directories must keep their original timestamped directory names and must continue to contain `spec.md`, `plan.md`, and `tasks.md`.

Only specs with `Status: completed` may be archived.

## 3. Affected Files Or Modules

- `AGENTS.md`
- `specs/technical-spec.md`
- `specs/features/**`
- `specs/changes/**`

## 4. Behavior That Must Remain Unchanged

This change must not alter product behavior, runtime code, API behavior, test behavior, database behavior, or setup commands.

The SDD workflow must still require `spec.md`, `plan.md`, and `tasks.md` before implementing a feature or change.

## 5. Verification

Verification will confirm that:

- the archive policy is documented in repository working rules;
- the technical specification reflects the active/archive distinction;
- only specs marked `Status: completed` are moved into archive directories;
- every archived spec directory still contains `spec.md`, `plan.md`, and `tasks.md`;
- no product or runtime verification command is required because this is documentation and repository organization only.
