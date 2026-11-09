# ADR 0002: shadcn/ui for components

- **Status:** accepted
- **Date:** 2026-11-09

## Context

The starter needs accessible, consistent UI primitives that agents can extend without learning a bespoke library.

## Decision

Use shadcn/ui (Radix primitives, Tailwind). Primitives live in `src/components/ui` and are added with `npx shadcn@latest add`.

## Consequences

Components are owned source code, so they can be edited freely but are not updated automatically. Styling uses theme tokens. Dark mode is class-based and has no toggle yet.
