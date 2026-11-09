# ADR 0007: Enforce boundaries with lint

- **Status:** accepted
- **Date:** 2026-11-09

## Context

Written conventions drift, especially with coding agents. Boundary rules need to fail the build.

## Decision

Use ESLint's built-in `no-restricted-imports` in `eslint.config.mjs` to enforce the dependency direction, feature entry points, and the rule that vendor SDKs are imported only in `src/lib`.

## Consequences

CI fails on a violation, with no new dependency. The rules are path-based, so they must be updated if the directory layout changes.
