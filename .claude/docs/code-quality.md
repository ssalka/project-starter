# Code Quality Commands

## Quick Reference

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm checks`       | Run all checks (lint, format, typecheck) |
| `pnpm lint`         | ESLint (report errors)                   |
| `pnpm lint --fix`   | ESLint (auto-fix)                        |
| `pnpm format`       | Prettier (auto-fix)                      |
| `pnpm format:check` | Prettier (report errors)                 |
| `pnpm typecheck`    | TypeScript type checking                 |

## Per-Package Commands

Use `--filter` to run checks on a specific package:

```bash
pnpm --filter client lint
pnpm --filter server typecheck
pnpm --filter @ssalka/ui format
pnpm --filter @ssalka/common lint --fix
```

## Testing

| Command                   | Description                    |
| ------------------------- | ------------------------------ |
| `pnpm test`               | Run all unit tests (Vitest)    |
| `pnpm test <pattern>`     | Run tests matching pattern     |
| `pnpm test:e2e`           | Run E2E tests (Playwright)     |
| `pnpm test:e2e <pattern>` | Run E2E tests matching pattern |

Per-package testing:

```bash
pnpm --filter client test
pnpm --filter server test seed
pnpm --filter @ssalka/common test
```

For testing patterns and conventions, see the [testing-patterns skill](../skills/testing-patterns/SKILL.md).
