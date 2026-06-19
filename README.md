# Personal Expenses REST API

Backend API for tracking personal expenses. The current feature implements the initial project foundation with TypeScript, Express, a health check endpoint, integration testing, and PostgreSQL through Docker Compose.

## Stack

- Node.js
- TypeScript
- Express
- PostgreSQL through Docker Compose
- Vitest
- Supertest

## Requirements

- Node.js
- npm
- Docker and Docker Compose

## Installation

```bash
npm install
```

## Development

Start PostgreSQL:

```bash
docker compose up -d
```

Start the API in watch mode:

```bash
npm run dev
```

The server uses `PORT` when provided and defaults to `3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run test
```

## Endpoint Summary

```text
GET /health
```

Successful response:

```json
{
  "status": "ok"
}
```

## Technical Decisions

- `src/app.ts` creates and exports the Express app for integration tests.
- `src/server.ts` only starts the HTTP server.
- Tests call the Express app directly with Supertest.
- PostgreSQL is available locally through `docker-compose.yml`.

## Known Limitations

- Authentication, categories, expenses, reports, Prisma, and environment validation are planned for later MVP features.
