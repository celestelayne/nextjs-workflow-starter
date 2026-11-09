# next-workflow-starter

A Next.js starter for building applications with an AI-assisted, spec-first workflow. Use it as a GitHub template.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, ESLint, and [OpenSpec](https://github.com/Fission-AI/OpenSpec) for specifications.

## Getting started

Requires Node.js 22.12.0 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Workflow

Work is done in vertical slices with Claude Code:

| Skill | Purpose |
| --- | --- |
| `/create-slice` | Specify a slice (OpenSpec change plus `docs/slices/<name>.md`). Planning only. |
| `/implement-slice` | Build an approved slice without expanding scope. |
| `/review-slice` | Review against the spec with file-referenced, severity-ranked findings. |

OpenSpec commands are also available directly (`/opsx:propose`, `/opsx:apply`, `/opsx:verify`, `/opsx:archive`). The `verify` workflow is enabled via `openspec config profile`, a per-machine setting; on a new machine run `openspec config set profile custom` and add `verify` to `workflows`, then `openspec update`.

## Layout

```
.claude/skills/   Claude Code workflow skills
docs/architecture Architecture decisions and boundaries
docs/slices       Slice specs (start from TEMPLATE.md)
openspec/         OpenSpec specs and changes
src/app           Routes, layouts, pages
src/features      Feature-owned domain logic and UI
src/components    Shared UI components
src/lib           Shared technical infrastructure
AGENTS.md         Rules for coding agents
```

See [docs/architecture/README.md](docs/architecture/README.md) for principles and what is intentionally not yet chosen.
