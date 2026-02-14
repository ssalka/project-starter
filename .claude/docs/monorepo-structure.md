# Monorepo Structure

This project is organized as a pnpm workspace monorepo.

## Packages

| Package            | Path               | Description                                              |
| ------------------ | ------------------ | -------------------------------------------------------- |
| `client`           | `packages/client`  | React frontend (Vite, TanStack Router, Zustand)          |
| `server`           | `packages/server`  | Express/tRPC backend (MongoDB/Mongoose, Auth.js, CASL)   |
| `@ssalka/common`  | `packages/common`  | Shared types and constants                               |
| `@ssalka/ui`      | `packages/ui`      | Shared UI components (shadcn/ui, Radix, Tailwind)        |
| `@ssalka/scripts` | `packages/scripts` | Build and dev scripts                                    |

## Package Filtering

Run commands for specific packages using pnpm's `--filter` flag:

```bash
pnpm --filter client <command>
pnpm --filter server <command>
pnpm --filter @ssalka/common <command>
pnpm --filter @ssalka/ui <command>
```

NOTE: the `--filter <package>` MUST come before the command:

```bash
# Incorrect
pnpm typecheck --filter client

# Correct
pnpm --filter client typecheck
```

## Import Conventions

### Cross-Package Imports

Workspace packages use the `@ssalka/*` prefix:

```typescript
import { someUtil } from '@ssalka/common';
import { Button } from '@ssalka/ui/components/button';
```

### Client Internal Imports

The client package uses `@/` as an alias for `src/`:

```typescript
// In packages/client
import { trpc } from '@/lib/api';
import { useCraftStore } from '@/state/objects';
```
