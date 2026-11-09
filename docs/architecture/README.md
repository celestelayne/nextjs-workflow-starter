# Architecture

## Purpose

This repository is a reusable Next.js foundation for applications that coordinate asynchronous work, human decisions, and durable state changes.

The starter provides development conventions and reusable infrastructure. Individual applications provide their own domain models, workflows, permissions, and interfaces.

## Architectural principles

1. **Vertical slices:** Build complete, independently verifiable capabilities rather than implementing entire technical layers in advance.
2. **Explicit ownership:** Each feature owns its domain behavior, schemas, and feature-specific UI.
3. **Thin framework boundaries:** Next.js routes and server actions validate inputs, establish identity, and delegate business operations to feature-owned code.
4. **Validated contracts:** Validate untrusted input at server and integration boundaries.
5. **Deterministic domain actions:** State changes must enforce permissions, preconditions, and valid transitions.
6. **Durable asynchronous work:** Important background operations must have persisted state, retry rules, and visible outcomes.
7. **Human authority:** AI output is a proposal, not an automatically approved change.
8. **Observable behavior:** Important actions must expose their actual state and record relevant history.
9. **Failure and recovery:** Design retry, cancellation, correction, and recovery behavior alongside successful flows.
10. **Minimal dependencies:** Add libraries and infrastructure only when a feature demonstrates the need.

## Module boundaries

- `src/app/`: Routing and framework integration.
- `src/features/`: Feature-specific domain behavior, contracts, and presentation.
- `src/components/`: Reusable presentation components.
- `src/lib/`: Shared technical capabilities.

## Not yet selected

The starter does not currently prescribe:

- Database or ORM
- Authentication provider
- Background job provider
- AI model or SDK
- External integrations
- General-purpose workflow engine

These choices will be made when implementing the relevant vertical slice.

## Verification

Every completed slice must pass the repository's applicable lint, TypeScript, test, and production-build checks.

Important domain behavior requires automated tests.

A slice is not complete until its acceptance criteria and relevant failure cases have been verified.