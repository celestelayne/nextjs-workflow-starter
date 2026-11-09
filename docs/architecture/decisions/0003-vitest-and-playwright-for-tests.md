# ADR 0003: Vitest and Playwright for tests

- **Status:** accepted
- **Date:** 2026-11-09

## Context

Slices are not complete until behavior is verified. The repository needs one fast unit runner and one browser runner.

## Decision

Use Vitest for unit tests and Playwright for end-to-end tests. E2E runs against the production build on port 3100 so it never collides with the dev server.

## Consequences

CI runs both on every push and pull request. E2E needs a browser install on first use. Chromium is the only browser configured.
