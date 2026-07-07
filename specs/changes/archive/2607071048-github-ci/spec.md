# GitHub CI Change Spec

Status: completed

## 1. Problem

The repository does not currently define an automated GitHub Actions workflow for validating changes before they are merged.

Feature and change work is verified locally through documented commands, but the same checks are not enforced consistently in a remote CI environment.

## 2. Intended Internal Change

Add a GitHub Actions workflow that validates the backend application on pull requests and pushes to the main branch.

The workflow must run the project verification commands that are currently meaningful for the MVP:

- install dependencies with `npm ci`;
- provide a PostgreSQL service for Prisma and integration tests;
- apply committed database migrations with `npm run prisma:migrate:deploy`;
- validate TypeScript with `npm run typecheck`;
- validate the build output with `npm run build`;
- run the complete test suite with `npm run test`.

The workflow must not add a lint step because the project does not currently define a linting tool or lint command.

## 3. Affected Files

Expected affected files:

- `.github/workflows/ci.yml`
- `README.md`, only if CI usage or verification documentation needs to be updated
- this change spec, plan, and task list

No application source code, tests, Prisma schema, or migrations are expected to change for this CI setup.

## 4. Behavior That Must Remain Unchanged

This change must not alter:

- API behavior;
- authentication behavior;
- database schema;
- Prisma migrations;
- runtime environment validation;
- local development commands;
- test behavior or test isolation rules.

The CI workflow must use the existing project scripts instead of introducing separate verification behavior.

## 5. Technical Requirements

This change follows the technical specification requirements for:

- Node.js, TypeScript, Express, Prisma, PostgreSQL, Vitest, and Supertest as the project stack;
- strict TypeScript validation;
- PostgreSQL-backed integration tests;
- separate test database usage;
- documented verification commands;
- no linting requirement until a future approved change introduces a linter.

The workflow must define environment variables required by the application and tests, including:

- `DATABASE_URL`;
- `JWT_SECRET`;
- `JWT_EXPIRES_IN`;
- `PORT`;
- `NODE_ENV`.

The database service must be ready before migration and test commands run.

## 6. Verification

The implementation will be verified by running, when possible:

```bash
npm run typecheck
npm run build
npm run test
```

The CI workflow configuration will also be reviewed to confirm it includes:

- dependency installation with `npm ci`;
- PostgreSQL service configuration;
- migration deployment before tests;
- TypeScript validation;
- build validation;
- complete test suite execution;
- no lint step.

Because GitHub Actions cannot be fully executed locally without an Actions runner, final remote validation must occur when the workflow runs on GitHub.

## 7. Out of Scope

This change does not include:

- adding a linter;
- adding formatting checks;
- adding coverage thresholds;
- adding deployment;
- adding release automation;
- changing project scripts;
- changing tests or application behavior.
