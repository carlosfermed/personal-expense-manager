# GitHub CI Change Tasks

## Specification

- [x] Create change spec.
- [x] Create implementation plan.
- [x] Create task list.
- [x] Review and approve the proposed change scope.

## Workflow

- [x] Move spec status to `in-progress` before implementation begins.
- [x] Create `.github/workflows/ci.yml`.
- [x] Configure pull request and main-branch push triggers.
- [x] Configure Node.js setup.
- [x] Configure dependency installation with `npm ci`.
- [x] Configure PostgreSQL service.
- [x] Configure required CI environment variables.
- [x] Run `npm run prisma:migrate:deploy` in the workflow.
- [x] Run `npm run typecheck` in the workflow.
- [x] Run `npm run build` in the workflow.
- [x] Run `npm run test` in the workflow.
- [x] Confirm no lint step is included.

## Documentation

- [x] Decide whether README needs a CI verification note.
- [x] Update README if needed.

## Verification

- [x] Run `npm run typecheck`.
- [x] Run `npm run build`.
- [x] Run `npm run test`.
- [x] Review workflow configuration for expected command order.
- [x] Document any command that could not be run.
- [ ] Confirm remote GitHub Actions validation after the workflow is pushed.

No local verification command was skipped.

## Completion

- [x] Mark completed tasks.
- [ ] Move spec status to `completed` after implementation and verification are complete.
