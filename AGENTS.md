<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repository rules

Architecture and module boundaries are defined in `docs/architecture/README.md`. Conventions (feature structure, contracts, the server boundary pattern, configuration, testing) are in `docs/architecture/conventions.md`. Decisions are recorded in `docs/architecture/decisions/`. Read these before structural changes, and add a decision record when you make a new architectural choice.

### Workflow

Work proceeds in vertical slices, specified with OpenSpec and driven by three skills:

1. `/create-slice` specifies a slice (OpenSpec change plus `docs/slices/<name>.md`). It never implements.
2. `/implement-slice` builds an approved slice. It never expands scope without approval.
3. `/review-slice` reviews the result with concrete findings, file references, and severity.

Do not implement anything that has not been specified and approved.

### Where code goes

- `src/app`: routes, layouts, pages, Next.js entry points. Keep thin.
- `src/features`: feature-owned domain logic, schemas, and UI.
- `src/components`: UI shared by multiple features.
- `src/lib`: shared technical infrastructure.

Do not create abstractions in advance. Empty directories are ownership conventions, not a mandate to fill them.

### Rules

- Validate untrusted input at server and integration boundaries with Zod schemas.
- Return a `Result` (`src/lib/result.ts`) for expected failures; throw only for bugs.
- Server actions and routes only identify the caller, validate, call the feature service, and return a `Result`. Business rules and permission checks live in the feature's `service.ts`.
- Import a feature only through `@/features/<name>`. Lint enforces this and the dependency direction (app, features, components, lib).
- Read environment variables only through `src/lib/env.ts` once it exists; keep `.env.example` current.
- AI output is a proposal. It must not apply state changes without human approval.
- Do not add dependencies or infrastructure until a slice requires them. The selected stack (Supabase for persistence and auth) is listed in `docs/architecture/README.md`; install it only inside the slice that needs it.
- Import vendor SDKs only inside `src/lib`; features depend on repository-owned interfaces.
- Use shadcn/ui primitives from `src/components/ui` instead of raw `button`, `input`, or `dialog` markup. Add new ones with `npx shadcn@latest add <component>`. Style with theme tokens (`bg-background`, `text-muted-foreground`), not hard-coded colors.
- Do not upgrade dependencies as a side effect of other work. Commit `package-lock.json` changes only when intended.
- Add tests for important domain behavior and for failure cases.

### Verification

Before calling work done, run and report real results of:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Unit tests (`*.test.ts` under `src/`) use Vitest. End-to-end tests live in `e2e/` and use Playwright against the production build.
