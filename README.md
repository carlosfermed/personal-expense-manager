# Personal Expenses REST API

Backend API for tracking personal expenses. The current feature implements the initial project foundation and authentication with TypeScript, Express, Prisma, PostgreSQL, JWT access tokens, integration testing, and Docker Compose.

## Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL through Docker Compose
- Zod
- bcrypt
- JSON Web Tokens
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

Create a local `.env` file with the required environment variables listed below.

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

Required environment variables:

```text
NODE_ENV
PORT
DATABASE_URL
JWT_SECRET
JWT_EXPIRES_IN
```

Example development database URL:

```text
postgresql://perexmanager:perexmanager@localhost:5432/perexmanager_dev
```

Example test database URL:

```text
postgresql://perexmanager:perexmanager@localhost:5432/perexmanager_test
```

The Docker initialization script creates `perexmanager_test` for fresh PostgreSQL volumes. If the Docker volume already existed before this feature, create the test database manually or recreate the volume before running integration tests.

## Database

Generate Prisma Client:

```bash
npm run prisma:generate
```

Prisma Client is generated as ESM TypeScript into `src/generated/prisma`. The generated client is ignored by git and should be regenerated locally.

Apply migrations in development:

```bash
npm run prisma:migrate
```

Apply committed migrations:

```bash
npm run prisma:migrate:deploy
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:migrate:deploy
npm run typecheck
npm run test
```

`npm run build`, `npm run typecheck`, and `npm run test` run Prisma Client generation before executing their main command.

## Endpoint Summary

```text
GET /health
POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/auth/me
```

Health response:

```json
{
  "status": "ok"
}
```

Register:

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "secure123"
}
```

Successful response: `201 Created`

```json
{
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "createdAt": "2026-06-20T10:00:00.000Z"
    },
    "accessToken": "jwt-token"
  }
}
```

Login:

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "secure123"
}
```

Successful response: `200 OK`

```json
{
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "createdAt": "2026-06-20T10:00:00.000Z"
    },
    "accessToken": "jwt-token"
  }
}
```

Current authenticated user:

```http
GET /api/v1/auth/me
Authorization: Bearer jwt-token
```

Successful response: `200 OK`

```json
{
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "createdAt": "2026-06-20T10:00:00.000Z"
    }
  }
}
```

Protected requests authenticate with:

```text
Authorization: Bearer <access-token>
```

## Technical Decisions

- `src/app.ts` creates and exports the Express app for integration tests.
- `src/server.ts` only starts the HTTP server.
- The project runs as ESM.
- Prisma Client uses the Prisma 7 `prisma-client` generator with `moduleFormat = "esm"`.
- The generated Prisma Client is imported from `src/generated/prisma`.
- Prisma access is encapsulated behind repositories.
- Auth services keep password hashing, token creation, and public response shaping outside controllers.
- Tests call the Express app directly with Supertest.
- PostgreSQL is available locally through `docker-compose.yml`.

## Known Limitations

- Categories, expenses, reports, refresh tokens, logout, password recovery, email verification, OAuth, roles, and profile management are out of scope for the current feature.
