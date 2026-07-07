# GitHub CI Change Plan

## Implementation Plan

1. Review the existing project scripts, test setup, Prisma configuration, and Docker/PostgreSQL expectations.
2. Create a GitHub Actions workflow under `.github/workflows/ci.yml`.
3. Configure the workflow triggers for pull requests and pushes to the main branch.
4. Configure Node.js and dependency installation with `npm ci`.
5. Configure a PostgreSQL service for CI.
6. Set the application and test environment variables required by the existing code.
7. Run committed migrations with `npm run prisma:migrate:deploy`.
8. Run `npm run typecheck`.
9. Run `npm run build`.
10. Run `npm run test`.
11. Update README documentation only if the workflow adds repository usage information that should be visible to developers.
12. Run the relevant local verification commands when possible.
13. Mark completed tasks in `tasks.md`.
14. Move this change spec to `completed` only after implementation, documentation, task updates, and verification are complete.

## Verification Plan

The change will be checked at configuration and local command levels:

- workflow syntax and command ordering are reviewed;
- `npm run typecheck` confirms TypeScript remains valid;
- `npm run build` confirms the application can be built;
- `npm run test` confirms the test suite still passes;
- the first GitHub Actions run confirms the workflow works in the remote CI environment.

## Notes

Linting is intentionally excluded because the project does not currently define a linting tool or lint command.

The workflow should prefer existing npm scripts over duplicating command logic directly in the CI file.
