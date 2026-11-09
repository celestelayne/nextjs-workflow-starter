---
name: create-slice
description: Specify a new vertical slice as an OpenSpec change and a slice spec in docs/slices. Planning only; never writes application code. Use when the user wants to plan, scope, or propose a new feature or slice.
---

# create-slice

Turn a feature idea into an approved, reviewable specification. This skill plans; it does not implement.

## Hard rules

- Do not edit anything under `src/`, `package.json`, or config files.
- Do not start implementation, even if the request says "build" or "add". Stop after the spec is presented.
- Keep the slice small enough to verify end to end. If it is not, propose splitting it.

## Steps

1. Read `AGENTS.md` and `docs/architecture/README.md`. Respect the module boundaries and the "Not yet selected" list.
2. Clarify the idea. Ask the user about anything that changes scope, permissions, or data. State assumptions explicitly.
3. Run the OpenSpec propose workflow (`/opsx:propose "<slice-name>"`) to create the change under `openspec/changes/<slice-name>/` (proposal, spec deltas, design, tasks).
4. Copy `docs/slices/TEMPLATE.md` to `docs/slices/<slice-name>.md` and fill it in: goal, scope, out of scope, acceptance criteria, failure cases, and verification plan.
5. If the slice needs a technology decision listed under "Not yet selected" in the architecture doc, record it as an open question in the slice spec. Do not decide it silently.
6. Present a summary and wait for explicit user approval.

## Done when

- `openspec/changes/<slice-name>/` and `docs/slices/<slice-name>.md` exist and agree with each other.
- Acceptance criteria are testable and failure cases are listed.
- The user has been asked to approve, and no application code changed.
