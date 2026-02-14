---
name: testing-patterns
description: Vitest and Playwright testing patterns, mocking strategies, and test organization. Use when fixing failing tests, writing new tests, creating test fixtures, or setting up mocks for tRPC/Zustand.
allowed-tools: Read, Write, Edit, Bash
---

# Testing Patterns

This skill covers testing conventions, utilities, and patterns for this monorepo.

## Testing Framework

For unit tests, this project uses **Vitest** (not Jest). Always import from vitest:

```typescript
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
```

E2E tests are run using Playwright:

```typescript
import { expect, test } from '@playwright/test';
```

## File Naming & Location

- Unit tests: `*.spec.ts` adjacent to source file
- E2E tests: `packages/client/e2e/*.spec.ts`
- Test utilities: `packages/*/src/test/`

## Running Tests

```bash
# Unit tests
pnpm test                    # All unit tests
pnpm test <pattern>          # Unit tests matching pattern
pnpm --filter server test    # Server package only

# E2E tests (always use root script)
pnpm test:e2e                # All E2E tests
pnpm test:e2e <pattern>      # Specific test file
```

## tRPC Mocking

The client has a built-in tRPC mock setup. Use `mockTRPC` helper:

```typescript
// In test file
import { mockTRPC } from '@/test/utils';

beforeEach(() => {
  mockTRPC({
    'someRoute.get': { _id: '123', name: 'Test' },
    'someRoute.list': [
      /* mock data */
    ],
  });
});
```

If a procedure is called without being mocked, the test will fail with a helpful error message.

## Test Structure Pattern

Each function should have:

1. Happy path test(s)
2. Edge case tests
3. Error case tests (if applicable)

```typescript
describe('functionName', () => {
  it('handles typical input correctly', () => {
    // Happy path
  });

  it('handles empty input', () => {
    // Edge case
  });

  it('handles invalid input', () => {
    // Edge case
  });

  it('returns null when not found', () => {
    // Error/null case
  });
});
```

## Mocking Patterns

### Module Mocking

```typescript
vi.mock('../lib/api', async importOriginal => {
  const actual = await importOriginal<typeof ApiModule>();
  return { ...actual, customMock: vi.fn() };
});
```

### Spy Functions

```typescript
const callback = vi.fn();
crawl(object, callback);
expect(callback).toHaveBeenCalledTimes(3);
expect(callback).toHaveBeenCalledWith(object, { parentId: undefined, path: [0] });
```

## Edge Cases to Cover

Always include tests for:

- Empty arrays/objects
- Null/undefined inputs (where applicable)
- Invalid inputs (where applicable)
- Deeply nested structures (5+ levels)

```typescript
describe('Edge Cases', () => {
  describe('empty structures', () => { ... });
  describe('invalid inputs', () => { ... });
  describe('deeply nested structures', () => { ... });
});
```

## Common Mistakes to Avoid

- Using `jest.*` instead of `vi.*` (use Vitest APIs)
- Creating inline objects instead of using factories
- Missing type imports for TypeScript
- Forgetting to test mutation side effects (use `.toEqual()` for object comparisons)
