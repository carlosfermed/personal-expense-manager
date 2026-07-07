# Specification Timestamp Format Change Spec

Status: completed

## Problem

Specification folders currently use sequential numeric prefixes such as `0001` and `0002`.

Sequential prefixes are easy to read in a small repository, but they create coordination friction as the project grows:

- the next available number must be checked before creating a feature or change;

- parallel branches can choose the same number;

- folder names do not show when a specification was created;

- the workflow documentation in `AGENTS.md` and `specs/technical-spec.md` currently hardcodes the old `XXXX-name` convention.

The project should use a timestamp-based prefix so new specification folders are naturally sortable, less collision-prone, and traceable to their creation time.

## Intended Change

Adopt this folder naming format for feature and change specifications:

```text
YYMMDDHHMM-kebab-case-name
```

The timestamp must use the local project time at creation time.

Examples:

```text
specs/features/2607061345-auth/
specs/changes/2607061415-spec-timestamp-format/
```

The implementation must:

- update `AGENTS.md` to use `YYMMDDHHMM-kebab-case-name` for feature and change folders;

- update `specs/technical-spec.md` so the specification workflow documents the same naming convention;

- rename existing feature and change specification folders to the new convention;

- update any repository documentation or references that point to the old folder names;

- preserve every existing `spec.md`, `plan.md`, and `tasks.md` file inside each renamed specification folder.

This change affects repository workflow and documentation only. It must not change product behavior, runtime code, database schema, API endpoints, or tests except for references that need to point to renamed paths.

## Affected Files and Modules

Expected affected files:

- `AGENTS.md`

- `specs/technical-spec.md`

- `specs/features/*`

- `specs/changes/*`

- `README.md`, if it references specification folder names or workflow details

- any documentation, tests, or scripts that reference old specification paths

No source module under `src/` is expected to change.

## Behavior That Must Remain Unchanged

- Public API behavior remains unchanged.

- Authentication behavior remains unchanged.

- Database schema and migrations remain unchanged.

- Project scripts remain unchanged unless a script directly references old specification folder names.

- Existing specification content remains semantically unchanged except for path references and workflow naming rules.

- Completed specs remain completed, and proposed/in-progress specs keep their current status unless this change's own implementation status is being updated.

## Constraints

- Do not introduce new dependencies.

- Do not change source code unless a hardcoded specification path is discovered.

- Keep file and folder names in English.

- Use kebab-case for the descriptive part of the folder name.

- Use a 10-digit timestamp prefix with exactly the format `YYMMDDHHMM`.

- Avoid reusing the same timestamp prefix for multiple specification folders created during the same minute; if needed, increment the minute portion to keep folder names unique and sortable.

- Do not update unrelated documentation.

## Migration Rules

Existing specification folders must be renamed using the new format.

Because older folders were not created with the new timestamp convention, their migration timestamps should be assigned deliberately and documented in `tasks.md` during implementation. The assigned timestamps must preserve the current relative order of existing specs within each top-level specification type when possible.

All internal references to old paths must be updated in the same change.

## Verification

The implementation must be verified by:

```bash
find specs/features specs/changes -mindepth 1 -maxdepth 1 -type d
npm run typecheck
npm run test
```

If a command cannot be run, record the reason in `tasks.md` and report it in the final implementation summary.

Linting is not required because the project does not currently define a linting command.

## Acceptance Criteria

- New feature specs are documented as living under `specs/features/YYMMDDHHMM-kebab-case-name/`.

- New change specs are documented as living under `specs/changes/YYMMDDHHMM-kebab-case-name/`.

- `AGENTS.md` and `specs/technical-spec.md` agree on the folder naming convention.

- Existing feature and change spec folders are renamed to the new format.

- References to old specification paths are updated.

- No product behavior changes.

- TypeScript validation succeeds.

- The complete test suite succeeds.

- `tasks.md` reflects completed implementation and verification work before the change is marked `completed`.
