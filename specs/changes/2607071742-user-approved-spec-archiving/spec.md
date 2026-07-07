# User Approved Spec Archiving Change Spec

Status: completed

## 1. Problem

The archive workflow allows completed specs to be moved into archive directories, but it does not explicitly state that archiving requires user approval.

Completed work may need to remain visible outside archive while it is still recent and useful for review.

## 2. Intended Internal Change

Clarify that completing a feature or change does not automatically authorize archiving it.

Completed specs may remain in the main feature or change directories until the user explicitly asks to archive them.

## 3. Affected Files Or Modules

- `AGENTS.md`
- `specs/technical-spec.md`

## 4. Behavior That Must Remain Unchanged

This change must not alter product behavior, runtime code, API behavior, test behavior, database behavior, or setup commands.

Completed specs may still be archived when the user explicitly authorizes it.

## 5. Verification

Verification will confirm that repository working rules and the technical specification both document user-approved archiving.
