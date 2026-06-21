# Authentication Spec

## Goal

Allow users to create an account, sign in, and access authenticated endpoints using a JSON Web Token.

## Behavior

### Registration

* A user can register with an email and password.
* The email is normalized before being stored.
* Email addresses must be unique.
* Passwords are never stored in plain text.
* A successful registration returns the created user's public data and an access token.

### Login

* A registered user can sign in with their email and password.
* A successful login returns the user's public data and an access token.
* Invalid credentials must not reveal whether the email or password was incorrect.

### Authentication

* Clients authenticate using a bearer token in the `Authorization` header.
* Valid tokens identify the authenticated user.
* Missing, malformed, invalid, or expired tokens are rejected.
* Authentication failures use the API's standard error response.

### Current Authenticated User

* An authenticated user can retrieve their own public user data.
* The endpoint requires a valid bearer token.
* The response must not include the password or password hash.

## Endpoints

### `POST /auth/register`

Request body:

```json
{
  "email": "user@example.com",
  "password": "secure-password"
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

Expected errors:

* `400 Bad Request` when the request body is invalid.
* `409 Conflict` when the email is already registered.

### `POST /auth/login`

Request body:

```json
{
  "email": "user@example.com",
  "password": "secure-password"
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

Expected errors:

* `400 Bad Request` when the request body is invalid.
* `401 Unauthorized` when the credentials are invalid.

### `GET /auth/me`

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

Expected errors:

* `401 Unauthorized` when authentication is missing, malformed, invalid, or expired.

## Validation Rules

* `email` is required and must be a valid email address.
* `password` is required and must satisfy the password rules defined by the product or technical specification.
* Unknown request fields are handled according to the API-wide validation policy.

## Security Requirements

* Password hashes and other authentication secrets must never appear in API responses.
* Password comparison must use the configured password-hashing library.
* JWTs must be signed using the configured secret and expiration time.
* Tokens must contain only the claims required to identify and validate the user.
* Authentication-related logs must not contain passwords or complete access tokens.

## Out of Scope

* Refresh tokens.
* Logout or token revocation.
* Password recovery.
* Email verification.
* Social login.
* Role-based authorization.
* User profile management.

## Acceptance Criteria

* A valid registration creates a user with a hashed password.
* Registration rejects an email that is already in use.
* Registration never returns the password or password hash.
* A registered user can log in with valid credentials.
* Login rejects invalid credentials with the same generic error.
* Successful registration and login return a valid access token.
* An authenticated user can retrieve their current public user data.
* Current user retrieval never returns the password or password hash.
* The authentication middleware resolves the authenticated user from a valid bearer token.
* Protected endpoints reject missing, malformed, invalid, and expired tokens.
* Authentication behavior is covered by integration tests.
* Password hashing and token operations are covered at the appropriate test level.
* TypeScript compilation and the complete test suite succeed.
