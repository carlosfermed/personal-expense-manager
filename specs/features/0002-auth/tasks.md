# Authentication Tasks

## Persistence

* [ ] Add the user model required for authentication.
* [ ] Add a unique constraint for normalized email addresses.
* [ ] Create and apply the authentication database migration.
* [ ] Verify that the schema and generated database client are up to date.

## Configuration and Security

* [ ] Add the required password-hashing dependency.
* [ ] Add the required JWT dependency.
* [ ] Define and validate the JWT secret.
* [ ] Define and validate the access-token expiration configuration.
* [ ] Add authentication variables to the example environment file.
* [ ] Ensure secrets, passwords, password hashes, and complete tokens are not logged.

## Domain and Application Logic

* [ ] Implement password hashing.
* [ ] Implement password verification.
* [ ] Implement access-token creation.
* [ ] Implement access-token verification.
* [ ] Add the user repository operations required by registration and login.
* [ ] Implement the registration service.
* [ ] Implement the login service.
* [ ] Ensure public user data excludes authentication-sensitive fields.

## HTTP Layer

* [ ] Add the registration request schema.
* [ ] Add the login request schema.
* [ ] Implement `POST /auth/register`.
* [ ] Implement `POST /auth/login`.
* [ ] Implement bearer-token extraction.
* [ ] Implement authentication middleware.
* [ ] Expose the authenticated user through the request context.
* [ ] Map validation, duplicate-email, invalid-credential, and invalid-token errors to the standard API error format.

## Tests

* [ ] Test successful registration.
* [ ] Test registration validation failures.
* [ ] Test registration with an existing email.
* [ ] Verify that the stored password is hashed.
* [ ] Verify that authentication-sensitive fields are not returned.
* [ ] Test successful login.
* [ ] Test login with an unknown email.
* [ ] Test login with an incorrect password.
* [ ] Verify that invalid login cases return the same generic error.
* [ ] Test authentication with a valid bearer token.
* [ ] Test authentication without an authorization header.
* [ ] Test authentication with a malformed authorization header.
* [ ] Test authentication with an invalid token.
* [ ] Test authentication with an expired token.
* [ ] Verify that authentication tests are isolated and order-independent.

## Documentation and Verification

* [ ] Document the registration and login endpoints.
* [ ] Document how to authenticate protected requests.
* [ ] Document the required environment variables.
* [ ] Run database migration validation.
* [ ] Run the complete test suite.
* [ ] Run linting.
* [ ] Run the TypeScript check.
