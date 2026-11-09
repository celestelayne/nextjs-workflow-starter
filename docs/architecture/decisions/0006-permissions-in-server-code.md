# ADR 0006: Permissions in server code

- **Status:** accepted
- **Date:** 2026-11-09

## Context

Supabase supports row-level security (RLS), which enforces access in the database. RLS rules are SQL policies, which are harder to review and test than TypeScript.

## Decision

Role and permission checks live in each feature's `service.ts`, with unit tests. RLS may be added later as defense in depth.

## Consequences

Rules are readable and testable next to the behavior they protect. Until RLS is added, a bug in server code could expose data, so services must be the only path to the database.
