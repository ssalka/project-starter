# Project Starter

## Essentials

- **Coding patterns:** Always run the `coding-patterns` skill before writing code.
- **Package manager**: `pnpm` (not npm/yarn)
- **Quality checks**: `pnpm checks` (lint, format:check, typecheck)
- **Tests**: `pnpm test` | `pnpm test:e2e`
- **Filtering script runs:**: `pnpm --filter <package> format`
- **Docs lookup**: Use Context7 MCP for external package documentation

## Skills & Reference Material

- [Monorepo Structure](.claude/docs/monorepo-structure.md) - packages, imports, filtering
- [UI Components](.claude/skills/ui/SKILL.md) - design system, tokens, components
- [Code Quality](.claude/docs/code-quality.md) - lint, format, typecheck, test commands
- [Installing Dependencies](.claude/skills/installing-dependencies/SKILL.md) - pnpm workflow for monorepo
- [Testing Patterns](.claude/skills/testing-patterns/SKILL.md) - Vitest, factories, mocking

## Packages

| Package | Path | Description |
|---------|------|-------------|
| `client` | `packages/client` | React frontend (Vite, TanStack Router, Zustand) |
| `server` | `packages/server` | Express/tRPC backend (MongoDB/Mongoose, Auth.js, CASL) |
| `@ssalka/common` | `packages/common` | Shared types and config |
| `@ssalka/ui` | `packages/ui` | Shared UI components (shadcn/ui, Radix, Tailwind) |
| `scripts` | `packages/scripts` | Build and dev scripts |
