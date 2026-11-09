# ADR 0005: Typed Result for expected failures

- **Status:** accepted
- **Date:** 2026-11-09

## Context

The architecture requires failure and recovery to be designed alongside success. Thrown exceptions make failure paths easy to forget and hard to check against a spec.

## Decision

Domain operations return a `Result` with a closed set of error kinds (`src/lib/result.ts`). Exceptions are reserved for bugs and unrecoverable states.

## Consequences

Callers must handle each failure explicitly, and reviewers can check handling against the spec. There is slightly more code at call sites.
