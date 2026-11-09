# Conventions

How code is organized and how boundaries behave. Principles live in [README.md](README.md); decisions and their reasons live in [decisions/](decisions/).

## Dependency direction

```
src/app  ->  src/features  ->  src/components  ->  src/lib
```

- `src/app` may import features, components, and lib.
- `src/features` may import components and lib, never `src/app`.
- `src/components` may import lib, never features.
- `src/lib` imports nothing from the layers above it.

Features do not import each other's internals. Cross-feature use goes through the other feature's public entry point (`@/features/<name>`). Lint enforces this (see [ADR 0007](decisions/0007-enforce-boundaries-with-lint.md)).

## Feature structure

```
src/features/<name>/
  index.ts        Public API. The only file other code imports.
  actions.ts      Server actions. Boundary only (see below).
  service.ts      Domain operations. Enforces permissions, preconditions, transitions.
  schema.ts       Zod schemas and inferred types. The feature's contracts.
  data.ts         Persistence access for this feature, using clients from src/lib.
  components/     Feature-specific UI.
  *.test.ts       Unit tests next to the code they cover.
```

Create only the files a feature needs. Inside a feature, use relative imports. Vendor SDKs (for example Supabase) are imported only in `src/lib`; features reach them through repository-owned wrappers.

## Contracts and errors

- Every value crossing a boundary is validated with a Zod schema: form data, route and action inputs, webhook and integration payloads, and model output.
- Domain operations return a `Result` (`src/lib/result.ts`), not exceptions, for expected failures.
- Error kinds are a closed set: `validation`, `unauthenticated`, `forbidden`, `not_found`, `conflict`, `invalid_transition`, `external_failure`.
- Exceptions are for bugs and unrecoverable states only.

| Error kind | Typical response |
| --- | --- |
| `validation` | Field-level messages to the user, HTTP 400 |
| `unauthenticated` | Redirect to sign-in, HTTP 401 |
| `forbidden` | Explain the missing permission, HTTP 403 |
| `not_found` | Not-found state, HTTP 404 |
| `conflict`, `invalid_transition` | Show the current state and why the change was refused, HTTP 409 |
| `external_failure` | Show a retryable state, HTTP 502 |

## Server boundary pattern

Every server action and route handler does the same four things, in this order, and nothing else:

1. Identify the caller.
2. Validate input against the feature schema.
3. Call the feature's service.
4. Return a `Result` and map it to a response.

Business rules do not live in actions or routes. Never trust identity, roles, or ids sent by the client.

## Permissions

Role and permission checks are TypeScript in the feature's `service.ts`, next to the rule they protect, with unit tests. Database row-level security may be added later as defense in depth ([ADR 0006](decisions/0006-permissions-in-server-code.md)).

## Configuration

- All environment variables are declared and validated in one module, `src/lib/env.ts`, created by the first slice that needs configuration. Nothing else reads `process.env`.
- Server-only secrets never use the `NEXT_PUBLIC_` prefix and are never imported into client components.
- `.env.example` lists every variable name with no values. `.env*` files are otherwise git-ignored.

## State changes and AI output

- A state change is a named transition with preconditions, checked in the service.
- AI output is a proposal. It is stored as a proposal and applied only by a transition a person triggers.
- Important actions record who did what and when.

## Testing

| What | Where | Rule |
| --- | --- | --- |
| Domain rules, schemas, `Result` error paths | `*.test.ts` next to the code (Vitest) | Every transition, permission check, and validation failure has a test. |
| User-visible flows | `e2e/` (Playwright, production build) | One test per flow, including one failure path. |
| AI behavior | Eval runner against labeled fixtures | Added with the first AI slice. Fixtures are fake and each has a known right answer. |

## Naming

- Files and directories: `kebab-case`. React components: `PascalCase` exports.
- Tests: `<file>.test.ts` beside the file; E2E: `e2e/<flow>.spec.ts`.
- One public entry point per feature: `index.ts`.
