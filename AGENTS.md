This file defines how an AI agent must work inside this repository.

It is not a product specification and it is not a technical specification.

## 1. Required Reading

Before modifying code, read:

1. `/specs/product-spec.md`
2. `/specs/technical-spec.md`
3. The relevant feature spec under `/specs/features/**`, if one exists
4. The relevant `plan.md` and `tasks.md`, if they already exist


Do not rely on assumptions when the answer is already defined in the specs.

## 2. Source of Truth Order

Use documents in this order:

1. `AGENTS.md` for repository working rules

2. `/specs/product-spec.md` for product behavior

3. `/specs/technical-spec.md` for architecture, stack, API, testing, security, and coding rules

4. `/specs/features/**` for feature-specific decisions

5. `/specs/changes/**` for approved refactors or behavior changes


If documents conflict, stop and report the conflict instead of choosing silently.

## 3. Working Rules

- Make small, focused changes.

- Do not implement behavior that has not been specified or planned.

- Do not change documented behavior without updating the relevant spec first.

- Do not introduce new dependencies unless the reason is documented in the relevant spec or plan.

- Do not introduce abstractions, patterns, folders, or layers that are not justified by the current feature or change.

- Keep code, filenames, comments, and documentation in English.

- Keep README, specs, tests, and implementation aligned.

- Be explicit about any command that could not be run.


## 4. Feature Workflow

Every new feature must live under:

```text
/specs/features/XXXX-feature-name/
  spec.md
  plan.md
  tasks.md
```

A feature may be implemented only after `spec.md`, `plan.md`, and `tasks.md` exist.

Each feature `spec.md` must include exactly one status line near the top:

```text
Status: proposed | approved | in-progress | completed | cancelled
```

Each feature must:

- reference the relevant product and technical requirements;

- define only the scope of that feature;

- include implementation tasks;

- include tests for behavioral changes;

- update documentation when behavior, setup, scripts, endpoints, or environment variables change.


## 5. Change Workflow

Every significant refactor or internal change must live under:

```text
/specs/changes/XXXX-change-name/
  spec.md
  plan.md
  tasks.md
```

A change may be implemented only after `spec.md`, `plan.md`, and `tasks.md` exist.

Each change `spec.md` must include exactly one status line near the top:

```text
Status: proposed | approved | in-progress | completed | cancelled
```

A change spec must explain:

- the current problem;

- the intended internal change;

- affected files or modules;

- behavior that must remain unchanged;

- how the change will be verified.


Refactors must not change product behavior unless the behavior change is explicitly documented.

## 6. Implementation Discipline

During implementation:

- Follow the existing feature plan and task list.

- Do not implement a feature or change while its spec status is `proposed`, `cancelled`, or `completed`.

- Move the spec status to `in-progress` when implementation begins.

- Move the spec status to `completed` only after implementation, documentation, task updates, and verification are complete.

- Mark progress in `tasks.md` when tasks are completed.

- Prefer completing one vertical slice at a time.

- Keep tests close to the behavior being changed.

- Avoid touching unrelated modules.

- Avoid broad rewrites unless the change spec requires them.

- Do not leave partially implemented behavior undocumented.


## 7. Verification

After implementation, run the relevant project commands when possible.

Common checks include:

```bash
npm run typecheck
npm run lint
npm run test
```

Only report a check as passed if it was actually executed successfully.

If a check cannot be run, report:

- which command was not run;

- why it was not run;

- what should be done next by a human developer.


## 8. Completion Checklist

Before considering work complete, verify that:

- the implementation matches the relevant spec;

- the implementation does not contradict product or technical specs;

- tests were added or updated for behavioral changes;

- README was updated when necessary;

- completed work is reflected in `tasks.md`;

- commands were run, or skipped commands were clearly reported.
