## 1. Product Overview

Personal Expenses is a backend application that allows users to register, authenticate, and manage their personal expenses through an API.

There is no frontend in the MVP.

The project is intended as a learning-focused backend project for a junior backend developer. It should demonstrate clear product behavior, secure account access, ownership-aware expense management, documentation, and incremental development using a specification-driven workflow.

## 2. Product Goals

The product must allow users to:

- create and access a personal account;

- authenticate with an access token;

- manage personal expense categories;

- create, list, update, and delete expenses;

- filter expenses by date, category, and amount;

- request a monthly spending summary;

- interact with clear and documented API behavior.


The project must also demonstrate a professional backend workflow based on specs, plans, tasks, verification, and documentation.

## 3. Target Users

The primary user is an individual who wants to track personal expenses through an API.

The secondary audience is technical reviewers, recruiters, and developers who may inspect the codebase to evaluate backend engineering skills.

## 4. Scope

### 4.1 In Scope

The MVP includes:

- user registration;

- user login;

- token-based authentication;

- authenticated access to protected resources;

- current authenticated user access;

- category creation;

- category listing;

- category update;

- category deletion, subject to product rules;

- expense creation;

- expense listing;

- expense retrieval by ID;

- expense update;

- expense deletion;

- expense filtering by:

    - date range;

    - category;

    - minimum amount;

    - maximum amount;

- pagination for expense listing;

- monthly spending summary with:

    - total amount spent in a selected month;

    - number of expenses in that month;

    - spending grouped by category;

- project documentation for setup and usage.


### 4.2 Out of Scope

The MVP does not include:

- frontend application;

- multi-currency support;

- shared accounts or household budgets;

- recurring expenses;

- income tracking;

- budget limits;

- email verification;

- password reset;

- OAuth login;

- refresh tokens;

- admin users;

- user profile update;

- password change;

- file uploads;

- receipt image storage;

- notifications;

- data export;

- soft delete;

- OpenAPI/Swagger documentation;

- advanced analytics beyond the monthly summary.


## 5. Core Concepts

### 5.1 User

A user represents a person who owns expenses and categories.

A user can:

- register with an email, password;

- log in with valid credentials;

- access only their own data;

- create personal categories;

- create personal expenses.


Users must never access, modify, or delete data belonging to another user.

### 5.2 Category

A category represents a user-owned label used to classify expenses.

Examples:

- Food

- Transport

- Rent

- Entertainment

- Health

- Education


Rules:

- Categories belong to one user.

- Category names must be unique per user.

- Two different users may use the same category name.

- Categories are not created automatically when a user registers.

- A category can be used by multiple expenses.


### 5.3 Expense

An expense represents a single spending record.

An expense belongs to:

- one user;

- one category.


An expense contains:

- title;

- amount;

- date;

- category;

- optional description.


Rules:

- The expense date is a calendar date.

- The expense amount is a positive decimal value.

- Technical formatting and precision rules are defined in the technical specification.


## 6. Functional Requirements

### 6.1 Authentication

#### Registration

The API must allow a new user to register.

Required product data:

- email;

- password;


Rules:

- Email must be valid.

- Email must be unique.

- Password must satisfy the minimum security requirements defined by the technical specification.

- Password must never be stored in plain text.

- The response must not include the password or password hash.

- Categories are not created automatically after registration.


#### Login

The API must allow an existing user to log in.

Required data:

- email;

- password.


Rules:

- Login succeeds only with valid credentials.

- On successful login, the API returns an access token.

- The access token is used to access protected functionality.


#### Current Authenticated User

The API must provide an endpoint for retrieving the current authenticated user.

Rules:

- The current user information must require valid authentication.

- The response must not include the password or password hash.


### 6.2 Categories

#### Create Category

An authenticated user can create a category.

Required data:

- name.


Rules:

- Name is required.

- Name must be unique for the authenticated user.


#### List Categories

An authenticated user can list their own categories.

Rules:

- The API returns only categories owned by the authenticated user.


#### Update Category

An authenticated user can update one of their own categories.

Rules:

- A user cannot update another user’s category.

- The new category name must remain unique for that user.


#### Delete Category

An authenticated user can delete one of their own categories.

Rules:

- A user cannot delete another user’s category.

- If the category is currently used by existing expenses, deletion must be rejected.

- The API must return a clear error explaining why the category cannot be deleted.


### 6.3 Expenses

#### Create Expense

An authenticated user can create an expense.

Required data:

- title;

- amount;

- date;

- category.


Optional data:

- description.


Rules:

- Title is required.

- Amount must be greater than zero.

- Date is required.

- Category must exist.

- Category must belong to the authenticated user.

- The created expense belongs to the authenticated user.


#### List Expenses

An authenticated user can list their own expenses.

Rules:

- The API returns only expenses owned by the authenticated user.

- Results are ordered by expense date in descending order by default.

- Results are paginated.

- Technical pagination parameters are defined in the technical specification.


#### Get Expense by ID

An authenticated user can retrieve one of their own expenses by ID.

Rules:

- A user cannot retrieve another user’s expense.

- If the expense does not exist or does not belong to the user, the API returns a not found response.


#### Update Expense

An authenticated user can update one of their own expenses.

Updatable fields:

- title;

- amount;

- date;

- category;

- description.


Rules:

- A user cannot update another user’s expense.

- If the category is changed, the new category must belong to the authenticated user.

- Amount must remain greater than zero.

- Date must remain a valid calendar date.


#### Delete Expense

An authenticated user can delete one of their own expenses.

Rules:

- A user cannot delete another user’s expense.

- If the expense does not exist or does not belong to the user, the API returns a not found response.


### 6.4 Expense Filters

The API must allow authenticated users to filter their own expenses.

Supported product filters:

- date range;

- category;

- minimum amount;

- maximum amount.


Rules:

- Filters can be combined.

- Date filters apply to the expense date.

- Amount filters apply to the expense amount.

- Invalid filter values must return a validation error.

- Filtering must never return expenses from other users.

- Filtered results are paginated.

- Filtered results are ordered by expense date in descending order by default.


### 6.5 Monthly Summary

The API must allow an authenticated user to request a spending summary for a specific month.

Required selection:

- year;

- month.


The response must include:

- selected year;

- selected month;

- total amount spent in that month;

- number of expenses in that month;

- amount spent grouped by category.


Rules:

- Only expenses owned by the authenticated user are included.

- Only expenses whose date belongs to the selected month are included.

- Categories with no expenses in the selected month do not need to appear in the result.

- If there are no expenses in the selected month:

    - total amount is zero;

    - expense count is zero;

    - grouped category list is empty.


Exact request and response schemas are defined in the technical specification and feature specifications.

## 7. Product Rules

### 7.1 Data Ownership

All user-owned resources must be isolated by user.

This applies to:

- categories;

- expenses;

- reports;

- filters.


A user must never access another user’s data, even if they know another resource ID.

### 7.2 Validation

The API must reject invalid input.

Invalid input must return clear errors.

### 7.3 Error Handling

The API must return consistent error responses.

The product should distinguish between:

- validation errors;

- authentication errors;

- authorization or ownership errors;

- not found errors;

- conflict errors;

- unexpected server errors.


Error responses must be understandable for API users and reviewers.

### 7.4 Security

The product must follow basic backend security expectations:

- passwords are hashed before storage;

- authentication tokens are required for protected access;

- passwords and password hashes are never returned in API responses;

- users cannot access resources owned by other users;

- error responses should not expose sensitive internal implementation details.


## 8. API Resource Summary

The initial API should expose resources for:

- authentication;

- categories;

- expenses;

- reports.


Exact paths, HTTP methods, request schemas, response schemas, and status codes are defined in the technical specification and feature specifications.

## 9. Confirmed MVP Decisions

|Topic|Decision|
|---|---|
|Default categories|Users create categories manually|
|Deleting used categories|Rejected if the category has expenses|
|Expense amount|Positive decimal|
|Expense date|Calendar date|
|Monthly summary|Includes total spent, expense count, and grouped totals by category|
|Expense listing pagination|Included; parameters are defined in the technical specification|
|User profile update|Out of scope|
|Password change|Out of scope|
|Refresh tokens|Out of scope|
|OpenAPI/Swagger|Out of scope for MVP|

## 10. Suggested MVP Feature Sequence

The product should be implemented incrementally using this sequence:

1. Initial project foundation

2. Authentication

3. Categories

4. Expenses

5. Expense filters

6. Monthly reports


Each feature must have its own:

- `spec.md`;

- `plan.md`;

- `tasks.md`.


## 11. MVP Acceptance Criteria

The MVP is complete when:

- a user can register and log in;

- a user can authenticate using the configured token mechanism;

- a user can retrieve their authenticated user profile;

- a user can manage their own categories;

- a user cannot delete a category that is currently used by expenses;

- a user can manage their own expenses;

- a user can filter their own expenses by date, category, and amount;

- expense listing supports pagination;

- a user can request a monthly spending summary;

- the monthly summary includes total spent, expense count, and grouped totals by category;

- users cannot access data belonging to other users;

- invalid requests return validation errors;

- README explains setup and usage;

- the repository contains product, technical, agent, feature, and change specs following the agreed SDD structure.
