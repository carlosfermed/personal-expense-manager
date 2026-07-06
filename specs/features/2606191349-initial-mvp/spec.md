# Initial MVP Spec

Status: completed

## Goal

Create the initial backend foundation for the personal expenses REST API.

## Behavior

- The API exposes a health check endpoint.
- The project uses TypeScript.
- The Express application can be started locally.
- Integration tests can be executed.
- PostgreSQL is available through Docker Compose.

## Endpoint

GET /health

Expected response:

{
  "status": "ok"
}

## Acceptance Criteria

- GET /health returns 200.
- The project compiles with TypeScript.
- The test suite runs successfully.
- The README explains how to run the project.
