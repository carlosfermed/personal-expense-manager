# Authentication Tasks

## Persistence

* [x] Add the user model required for authentication.
* [x] Add a unique constraint for normalized email addresses.
* [x] Create and apply the authentication database migration.
* [x] Verify that the schema and generated database client are up to date.

## Configuration and Security

* [x] Add the required password-hashing dependency.
* [x] Add the required JWT dependency.
* [x] Define and validate the JWT secret.
* [x] Define and validate the access-token expiration configuration.
* [x] Add authentication variables to the example environment file.
* [x] Ensure secrets, passwords, password hashes, and complete tokens are not logged.

## Domain and Application Logic

* [x] Implement password hashing.
* [x] Implement password verification.
* [x] Implement access-token creation.
* [x] Implement access-token verification.
* [x] Add the user repository operations required by registration, login, and current-user retrieval.
* [x] Implement the registration service.
* [x] Implement the login service.
* [x] Implement the current-user retrieval service.
* [x] Ensure public user data excludes authentication-sensitive fields.

## HTTP Layer

* [x] Add the registration request schema.
* [x] Add the login request schema.
* [x] Implement `POST /auth/register`.
* [x] Implement `POST /auth/login`.
* [x] Implement `GET /auth/me`.
* [x] Implement bearer-token extraction.
* [x] Implement authentication middleware.
* [x] Expose the authenticated user through the request context.
* [x] Map validation, duplicate-email, invalid-credential, and invalid-token errors to the standard API error format.

## Tests

* [x] Test successful registration.
* [x] Test registration validation failures.
* [x] Test registration with an existing email.
* [x] Verify that the stored password is hashed.
* [x] Verify that authentication-sensitive fields are not returned.
* [x] Test successful login.
* [x] Test login with an unknown email.
* [x] Test login with an incorrect password.
* [x] Verify that invalid login cases return the same generic error.
* [x] Test authentication with a valid bearer token.
* [x] Test authentication without an authorization header.
* [x] Test authentication with a malformed authorization header.
* [x] Test authentication with an invalid token.
* [x] Test authentication with an expired token.
* [x] Test current-user retrieval with a valid bearer token.
* [x] Test current-user retrieval without valid authentication.
* [x] Verify that current-user retrieval does not return authentication-sensitive fields.
* [x] Verify that authentication tests are isolated and order-independent.

## Documentation and Verification

* [x] Document the registration, login, and current-user endpoints.
* [x] Document how to authenticate protected requests.
* [x] Document the required environment variables.
* [x] Run database migration validation.
* [x] Run the complete test suite.
* [x] Run the TypeScript check.
