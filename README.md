# Project Starter

An opinionated full-stack monorepo starter with authentication, type-safe APIs, and a polished design system.

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Frontend**: React 19, Vite, TanStack Router, Zustand, Tailwind CSS v4, shadcn/ui
- **Backend**: Express, tRPC, MongoDB/Mongoose, Auth.js, CASL
- **Testing**: Vitest, Playwright, React Testing Library
- **Tooling**: TypeScript, ESLint, Prettier, GitHub Actions CI

## Development

Requires [pnpm](https://pnpm.io/) and [Node.js](https://nodejs.org/).

1. Install dependencies

   ```sh
   pnpm i
   ```

2. Start the development servers

   ```sh
   pnpm dev
   ```

   Or run frontend & backend individually:
   ```sh
   pnpm dev:client
   pnpm dev:server
   ```

3. Open the app at [`localhost:5173`](http://localhost:5173/)

## Testing

### Unit Tests

```sh
pnpm test              # Run all
pnpm test <pattern>    # Run matching tests
pnpm test:ui           # Interactive Vitest UI
```

### E2E Tests

Install Playwright browsers first:

```sh
pnpm exec playwright install --with-deps
```

Then run:

```sh
pnpm test:e2e          # Run all
pnpm test:e2e:ui       # Interactive Playwright UI
```

## Quality Checks

```sh
pnpm checks            # lint + format:check + typecheck
pnpm lint              # ESLint
pnpm format            # Prettier (auto-fix)
pnpm typecheck         # TypeScript
```

Per-package:

```sh
pnpm --filter client typecheck
pnpm --filter server lint
pnpm --filter @ssalka/ui format
```

## Project Structure

```
packages/
  client/     - React frontend (Vite, TanStack Router, Zustand)
  server/     - Express/tRPC backend (MongoDB, Auth.js, CASL)
  common/     - Shared types and config (@ssalka/common)
  ui/         - UI component library (@ssalka/ui)
  scripts/    - Build and dev scripts
```
