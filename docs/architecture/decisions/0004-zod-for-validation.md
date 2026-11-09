# ADR 0004: Zod for validation

- **Status:** accepted
- **Date:** 2026-11-09

## Context

Untrusted input must be validated at server and integration boundaries, including model output. Alternatives considered: Valibot, and deferring the choice.

## Decision

Use Zod for schemas and inferred types. It is installed by the first slice that needs validation.

## Consequences

One schema language across forms, actions, integrations, and AI output. Large ecosystem and agent familiarity, at the cost of a larger bundle than Valibot.
