# Technical Specification — Personal Expenses REST API

## 1. Purpose

This document defines how the Personal Expenses REST API must be built.

Product behavior is defined in `/specs/product-spec.md`. This file defines the technical contract for architecture, stack, API conventions, persistence, validation, error handling, testing, security, and implementation boundaries.

Every feature specification must comply with this file unless a controlled change is introduced under `/specs/changes`.

## 2. Technical Goals

The implementation must prioritize:

- clarity over cleverness;

- maintainability;

- testability;

- explicit boundaries between layers;

- security by default;

- specification-driven development.


The codebase should be understandable by a junior backend developer and by technical reviewers.

## 3. Technology Stack

The MVP uses:

|Concern|Decision|
|---|---|
|Runtime|Node.js|
|Language|TypeScript|
|HTTP framework|Express|
|Database|PostgreSQL|
|ORM/query layer|Prisma|
|Validation|Zod|
|Authentication|JWT|
|Password hashing|bcrypt|
|Testing|Vitest + Supertest|
|Development database|Docker Compose with PostgreSQL|
|Logging|Internal logger wrapper using `console` initially|

### 3.1 Stack Rules

- TypeScript must run in strict mode.

- Avoid `any` unless explicitly justified.

- Express-specific objects must stay in HTTP layers.

- Prisma must be encapsulated behind repositories.

- Zod is the validation library for body, params, query, and environment variables.

- Raw SQL should be avoided unless Prisma cannot express a query clearly or efficiently.


## 4. Architecture

The project uses a modular layered architecture inspired by Clean Architecture and Hexagonal Architecture, but simplified for the MVP.

This is not full Domain-Driven Design.

The architecture must avoid both extremes:

- fat controllers containing business rules;

- over-engineered domain models or abstractions.


## 5. Layers and Responsibilities

Each feature module should generally follow these layers.

### 5.1 Routes

Routes:

- define endpoint paths and HTTP methods;

- attach middlewares;

- delegate to controllers.


### 5.2 Controllers

Controllers:

- translate HTTP requests into application input;

- call services;

- return HTTP responses.


Controllers must not contain business rules.

### 5.3 Validation Schemas

Validation schemas:

- define Zod schemas for request body, route params, and query params;

- produce typed validated input;

- run before service methods are executed.


### 5.4 Services

Services:

- contain application-specific business logic;

- enforce product rules;

- coordinate repositories;

- return application results or throw application errors.


Services must not depend on Express request or response objects.

### 5.5 Repositories

Repositories:

- encapsulate Prisma queries;

- expose application-oriented data access methods;

- enforce ownership-aware queries where applicable;

- avoid leaking database query details into services or controllers.


Preferred method names for user-owned resources:

```ts
findByIdForUser(id, userId)
listForUser(userId, filters)
deleteForUser(id, userId)
```

Avoid generic ownership-unsafe methods such as `findById(id)` unless the resource is not user-owned or ownership is checked immediately and explicitly by the caller.

### 5.6 Mappers and DTOs

Mappers and DTOs:

- shape API responses;

- prevent sensitive fields from leaking;

- keep response contracts stable;

- convert database/application objects into API response objects.


Do not expose Prisma models directly from controllers.

## 6. Dependency Direction

Dependencies should flow in this direction:

```text
routes/controllers -> services -> repositories -> database
```

Rules:

- controllers may depend on services;

- services may depend on repositories;

- repositories may depend on Prisma;

- repositories must not depend on controllers;

- services must not depend on Express;

- application logic must not depend on HTTP details.


## 7. Project Structure

The project should use a `src` directory.

Recommended structure:

```text
src/
  app.ts
  server.ts

  config/
    env.ts

  db/
    prisma.ts

  shared/
    errors/
      app-error.ts
      error-codes.ts
      error-handler.ts
    http/
      validate-request.ts
      async-handler.ts
    auth/
      require-auth.ts
      jwt.ts
      password.ts
    pagination/
      pagination.ts
    logger/
      logger.ts

  modules/
    auth/
      auth.routes.ts
      auth.controller.ts
      auth.schemas.ts
      auth.service.ts
      auth.mapper.ts

    users/
      user.repository.ts
      user.mapper.ts
      user.types.ts

    categories/
      category.routes.ts
      category.controller.ts
      category.schemas.ts
      category.service.ts
      category.repository.ts
      category.mapper.ts
      category.types.ts

    expenses/
      expense.routes.ts
      expense.controller.ts
      expense.schemas.ts
      expense.service.ts
      expense.repository.ts
      expense.mapper.ts
      expense.types.ts

    reports/
      report.routes.ts
      report.controller.ts
      report.schemas.ts
      report.service.ts
      report.repository.ts
      report.types.ts

tests/
  helpers/
    app.ts
    db.ts
    auth.ts
    factories.ts
```

### 7.1 `app.ts`

`app.ts` must create and configure the Express application:

- JSON middleware;

- routes;

- health endpoint;

- not found handler;

- global error handler.


It must export the app for testing.

### 7.2 `server.ts`

`server.ts` must start the HTTP server.

It must not contain application logic.

### 7.3 Shared Code

Shared code must only be placed under `shared/` when at least two modules need it.

Avoid global utility folders that collect unrelated code.

## 8. Patterns and Boundaries

The MVP intentionally uses simple patterns:

- repositories for database access;

- services for application-specific business logic;

- DTOs and mappers for response shaping;

- middleware for cross-cutting HTTP concerns;

- manual dependency wiring;

- test factories/helpers for test setup.


The MVP must not introduce the following unless a future change spec explicitly justifies them:

- Facade;

- Strategy;

- Builder;

- CQRS;

- event bus;

- domain events;

- Unit of Work;

- full ports-and-adapters;

- dependency injection container;

- one-class-per-use-case structure;

- rich domain entities that only mirror database tables.


Types and interfaces must be introduced only when they define a real boundary or remove meaningful duplication.

Use `type` by default. Use `interface` only when object extension, class implementation, or declaration merging is intentionally needed.

## 9. API Design

### 9.1 Base Path

All API endpoints must be prefixed with:

```text
/api/v1
```

### 9.2 Successful Response Format

Successful responses should use a consistent shape.

Default:

```json
{
  "data": {}
}
```

Paginated lists:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 100,
    "totalPages": 5
  }
}
```

### 9.3 Error Response Format

Errors must use a consistent shape.

Validation example:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": []
  }
}
```

Simple error example:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 9.4 HTTP Status Codes

Use these conventions:

|Status|Meaning|
|---|---|
|200|Successful read, update, or delete where a body is returned|
|201|Successful creation|
|204|Successful deletion where no body is returned|
|400|Invalid request or validation error|
|401|Missing or invalid authentication|
|403|Authenticated but forbidden, if needed|
|404|Resource not found or not owned by user|
|409|Conflict, such as duplicate email or duplicate category name|
|500|Unexpected server error|

Ownership failures for user-owned resources should generally return `404` to avoid revealing whether another user’s resource exists.

## 10. Endpoint Summary

### 10.1 Auth

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

### 10.2 Categories

```text
POST   /api/v1/categories
GET    /api/v1/categories
PATCH  /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

### 10.3 Expenses

```text
POST   /api/v1/expenses
GET    /api/v1/expenses
GET    /api/v1/expenses/:id
PATCH  /api/v1/expenses/:id
DELETE /api/v1/expenses/:id
```

Expense filtering is handled through query parameters on:

```text
GET /api/v1/expenses
```

Supported query parameters:

```text
page
limit
startDate
endDate
categoryId
minAmount
maxAmount
```

### 10.4 Reports

```text
GET /api/v1/reports/monthly-summary?year=2026&month=6
```

## 11. Authentication and Authorization

### 11.1 Passwords

Passwords must never be stored in plain text.

Password requirements:

- minimum length: 8 characters;

- maximum length: 72 characters;

- must include at least one letter and one number.


Password hashes must not be returned in API responses.

### 11.2 JWT

JWT is used for access tokens.

The token must include:

```text
sub: user id
```

Optional claims:

```text
email
iat
exp
```

Recommended expiration:

```text
1h
```

The JWT secret must come from environment variables.

### 11.3 Protected Routes

Protected endpoints must use authentication middleware.

The middleware must:

- read the `Authorization` header;

- require the `Bearer <token>` format;

- verify the token;

- attach the authenticated user context to the request;

- reject invalid or missing tokens with `401`.


### 11.4 User Context

Authenticated routes receive a user context containing at least:

```ts
{
  userId: string;
}
```

Controllers and services must use `userId` from authenticated context, never from request body or query parameters.

## 12. Validation

All external input must be validated with Zod.

Validation applies to:

- request body;

- route params;

- query params;

- environment variables.


Validation must happen before controller logic calls services.

Invalid data must return a structured validation error.

### 12.1 Date Validation

Expense dates must use date-only format:

```text
YYYY-MM-DD
```

The API must reject invalid dates.

Do not accept full date-time strings for expense dates.

### 12.2 Amount Validation

Expense amounts must be:

- greater than zero;

- decimal values;

- maximum 2 decimal places.


Amounts should be represented as decimal strings in API responses to avoid floating-point ambiguity.

Example:

```json
{
  "amount": "12.50"
}
```

### 12.3 Pagination Validation

Expense listing supports:

- `page`;

- `limit`.


Defaults:

```text
page = 1
limit = 20
```

Limits:

```text
minimum page = 1
minimum limit = 1
maximum limit = 100
```

## 13. Persistence Model

PostgreSQL is the source of truth for persisted data.

The database must enforce important invariants where possible, including:

- unique user email;

- unique category name per user;

- required relations;

- foreign keys;

- decimal amount precision;

- timestamps.


### 13.1 User

Fields:

- id;

- email;

- name;

- passwordHash;

- createdAt;

- updatedAt.


Rules:

- email is unique;

- passwordHash is required;

- passwordHash is never returned.


### 13.2 Category

Fields:

- id;

- userId;

- name;

- createdAt;

- updatedAt.


Rules:

- category belongs to one user;

- category name is unique per user;

- different users may use the same category name.


Database constraint:

```text
unique(userId, name)
```

### 13.3 Expense

Fields:

- id;

- userId;

- categoryId;

- title;

- amount;

- date;

- description;

- createdAt;

- updatedAt.


Rules:

- expense belongs to one user;

- expense belongs to one category;

- category must belong to the same user;

- amount must be positive;

- date is a date-only value;

- description is optional.


Recommended database type for amount:

```text
Decimal / numeric(12, 2)
```

Recommended database type for date:

```text
Date
```

### 13.4 Delete Behavior

Deleting a category used by expenses must be rejected.

This should be enforced by service logic before deletion.

The database should also use restrictive foreign key behavior where practical.

Expenses are hard-deleted in the MVP.

Soft delete is out of scope.

## 14. Error Handling

The project must define an application error abstraction.

Recommended shape:

```ts
class AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;
}
```

Known error codes:

```text
VALIDATION_ERROR
AUTHENTICATION_ERROR
FORBIDDEN
NOT_FOUND
CONFLICT
INTERNAL_SERVER_ERROR
```

The global error handler must:

- convert known application errors into consistent responses;

- convert Zod validation errors into validation responses;

- avoid leaking stack traces in production;

- return generic messages for unexpected errors.


## 15. Environment Configuration

Environment variables must be validated on startup.

Required variables:

```text
NODE_ENV
PORT
DATABASE_URL
JWT_SECRET
JWT_EXPIRES_IN
```

Invalid environment configuration must fail fast during application startup.

Feature specs may add required environment variables when justified.

## 16. Testing Strategy

The MVP must prioritize endpoint-level integration tests.

Required tools:

- Vitest;

- Supertest.


Tests should exercise the Express app and the test database.

### 16.1 Required Test Coverage

The main flows must be covered:

- registration;

- login;

- retrieving current authenticated user;

- protected route access without token;

- category lifecycle;

- category ownership;

- rejecting deletion of used categories;

- expense lifecycle;

- expense ownership;

- expense filtering;

- pagination;

- monthly summary;

- validation errors;

- conflict errors.


### 16.2 Test Database

Tests must use a separate PostgreSQL database from development.

The test database must be reset between tests or test suites.

No test should depend on data created by another unrelated test.

### 16.3 Test Helpers

Reusable test helpers are allowed for:

- creating users;

- authenticating users;

- creating categories;

- creating expenses;

- cleaning database state.


Test helpers must remain explicit enough that tests are readable.

## 17. Coding Standards

Code should be:

- explicit;

- readable;

- modular;

- consistently formatted;

- easy to review.


Avoid premature abstraction.

### 17.1 Naming

Use clear names such as:

```text
AuthService
CategoryRepository
ExpenseService
ReportRepository
validateRequest
requireAuth
```

Avoid vague names such as:

```text
Manager
Helper
Utils
Handler
```

unless the role is specific and clear.

### 17.2 File Naming

File names must use kebab-case by default.

Feature module files should include their role:

```text
auth.service.ts
auth.controller.ts
auth.routes.ts
expense.repository.ts
expense.schemas.ts
```

Shared infrastructure files should also use kebab-case:

```text
app-error.ts
error-handler.ts
validate-request.ts
require-auth.ts
```

PascalCase should be used for exported classes, types, and interfaces, not for file names.

### 17.3 Imports

Prefer direct imports from the module that owns the code.

Limited barrel files are allowed only when they expose a clear public module API.

Avoid deep, unclear dependency chains.

### 17.4 Comments

Comments should explain why something exists, not repeat what the code already says.

Good comments:

- explain business decisions;

- explain non-obvious constraints;

- document trade-offs.


Avoid comments that restate simple code.

## 18. Security Requirements

The implementation must guarantee:

- passwords are hashed before storage;

- password hashes are never returned;

- JWT is required for protected endpoints;

- user-owned data access is always scoped by authenticated `userId`;

- unexpected errors do not expose internals;

- input is validated before reaching business logic;

- secrets are read from environment variables;

- test credentials and secrets are not committed.


Recommended security middleware for MVP:

- JSON body size limit;

- basic HTTP hardening with Helmet;

- explicit CORS configuration if needed.


Rate limiting is optional for MVP and may be added later through a future feature or change spec.

## 19. Logging

Logging should be minimal in the MVP.

The application may log:

- server startup;

- unexpected errors;

- database connection failures.


Do not log:

- passwords;

- JWT tokens;

- password hashes;

- sensitive request bodies.


The MVP uses a small internal logger wrapper.

The initial implementation may delegate to:

```ts
console.info
console.warn
console.error
```

Application code should use the internal logger instead of calling `console` directly across the codebase.

Do not introduce Pino, Winston, or another logging package in the MVP unless a future change spec justifies it.

## 20. Documentation Requirements

The README must include:

- project description;

- stack;

- architecture summary;

- installation;

- environment variables;

- Docker Compose usage;

- database migration commands;

- test commands;

- development commands;

- endpoint summary;

- technical decisions;

- known limitations.


The README must stay synchronized with implemented behavior.

If an endpoint, script, environment variable, or setup step changes, README must be updated in the same feature or change.

## 21. Out of Scope for Technical Implementation

The MVP must not include:

- frontend;

- OpenAPI/Swagger;

- OAuth;

- refresh tokens;

- password reset;

- email verification;

- admin roles;

- soft delete;

- multi-currency support;

- file uploads;

- event queues;

- CQRS;

- full DDD tactical patterns;

- dependency injection container;

- microservices;

- GraphQL.


These may only be introduced through future product and technical changes.

## 22. Technical Acceptance Criteria

The technical implementation is acceptable when:

- the app starts through a clear development command;

- PostgreSQL can be started with Docker Compose;

- Prisma migrations can create the schema;

- environment variables are validated;

- all protected routes require JWT;

- all user-owned data access is scoped by `userId`;

- all incoming request data is validated with Zod;

- error responses are consistent;

- endpoint tests cover the main flows;

- README explains setup and usage;

- feature specs, plans, and tasks match the implemented behavior;

- no product behavior contradicts `/specs/product-spec.md`.