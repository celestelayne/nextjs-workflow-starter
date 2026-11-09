# ADR 0001: Supabase for persistence and auth

- **Status:** accepted
- **Date:** 2026-11-09

## Context

The starter needs a relational database and user identity, with minimal cost and few vendors. Alternatives considered: Neon and Clerk as separate services, and a self-managed database with self-managed auth.

## Decision

Use Supabase (Postgres and Auth). It is installed by the first slice that needs persistence.

## Consequences

One vendor and one local setup cover the database and identity. A free project pauses after a week of inactivity. Vendor SDKs are imported only in `src/lib`, so the choice can be reversed without touching feature code, though moving auth later is real work. Background jobs are not covered and remain undecided.
