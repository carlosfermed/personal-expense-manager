# GitHub CI Change Tasks

## Specification

- [x] Create change spec.
- [x] Create implementation plan.
- [x] Create task list.
- [ ] Review and approve the proposed change scope.

## Workflow

- [ ] Move spec status to `in-progress` before implementation begins.
- [ ] Create `.github/workflows/ci.yml`.
- [ ] Configure pull request and main-branch push triggers.
- [ ] Configure Node.js setup.
- [ ] Configure dependency installation with `npm ci`.
- [ ] Configure PostgreSQL service.
- [ ] Configure required CI environment variables.
- [ ] Run `npm run prisma:migrate:deploy` in the workflow.
- [ ] Run `npm run typecheck` in the workflow.
- [ ] Run `npm run build` in the workflow.
- [ ] Run `npm run test` in the workflow.
- [ ] Confirm no lint step is included.

## Documentation

- [ ] Decide whether README needs a CI verification note.
- [ ] Update README if needed.

## Verification

- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Run `npm run test`.
- [ ] Review workflow configuration for expected command order.
- [ ] Document any command that could not be run.
- [ ] Confirm remote GitHub Actions validation after the workflow is pushed.

## Completion

- [ ] Mark completed tasks.
- [ ] Move spec status to `completed` after implementation and verification are complete.
