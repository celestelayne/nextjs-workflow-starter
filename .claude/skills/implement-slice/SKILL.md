---
name: implement-slice
description: Implement an approved slice exactly as specified, task by task, using the OpenSpec apply workflow. Does not expand scope without approval. Use after a slice spec has been approved.
---

# implement-slice

Build what the approved slice specifies, no more and no less.

## Hard rules

- Only implement slices whose spec in `docs/slices/` and OpenSpec change are approved. If unsure, ask.
- Do not expand scope. If you discover needed work outside the spec, stop, describe it, and get approval before doing it. Update the spec first, then the code.
- Do not add dependencies or infrastructure the spec does not call for.
- Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code (see `AGENTS.md`).

## Steps

1. Read the slice spec, `openspec/changes/<slice-name>/tasks.md`, `AGENTS.md`, and `docs/architecture/README.md`.
2. Run the OpenSpec apply workflow (`/opsx:apply <slice-name>`) and work through tasks in order, ticking each off as it is finished.
3. Place code by ownership: routes in `src/app`, domain logic and feature UI in `src/features/<feature>`, shared UI in `src/components`, shared infrastructure in `src/lib`.
4. Write tests for important domain behavior and for each failure case in the spec.
5. Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`. Fix failures before continuing. Add a Playwright test in `e2e/` when the slice adds a user-visible flow.
6. Report what was built, what was verified, and anything deferred.

## Done when

- Every task is complete and every acceptance criterion is verified.
- All checks pass, with output reported honestly.
- No work outside the spec was done without approval.
