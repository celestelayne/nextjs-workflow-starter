---
name: review-slice
description: Review an implemented slice against its spec and the repository conventions, producing concrete findings with file references and severity. Use after implementation, before archiving.
---

# review-slice

Verify the implementation against the approved spec. Read-only: report findings, do not fix them unless asked.

## Hard rules

- Every finding needs a file reference (`path:line`), a severity, and a concrete failure scenario.
- Never conclude with a generic "looks good". If there are no findings, list what was checked and how.
- Do not modify code during review.

## Severity

- **blocker**: violates an acceptance criterion, loses or corrupts data, or breaks a permission or state-transition rule.
- **major**: missing failure-case handling, missing tests for important behavior, boundary violations.
- **minor**: readability, naming, small inconsistencies.

## Steps

1. Read the slice spec, the OpenSpec change (`proposal.md`, specs, `tasks.md`), and the diff for the slice.
2. Check each acceptance criterion and failure case against the code and tests. Mark each verified, unverified, or failing.
3. Check conventions from `AGENTS.md` and `docs/architecture/README.md`: module boundaries, validation at boundaries, deterministic state changes, scope creep beyond the spec.
4. Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`. Report real output.
5. Run `/opsx:verify <slice-name>` as an additional check and fold its results into the findings.

## Output format

```
## Findings
1. [severity] path:line - what is wrong, and the input or state that triggers it.

## Acceptance criteria
- [verified | unverified | failing] criterion - evidence

## Checks
- lint / tsc / tests / build: pass or fail, with detail

## Verdict
Ready to archive, or the list of findings to resolve first.
```
