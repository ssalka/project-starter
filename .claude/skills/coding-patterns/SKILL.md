---
name: coding-patterns
description: Use any time you are writing TypeScript code.
---

# Coding Patterns

## General

### `is` and `assert`

Use the `@sindresorhus/is` library for simple runtime type checks & assertions.

The `is` utility contains methods that return true if the given input matches the indicated type, and false otherwise:

```typescript
const unknownValue: unknown = 'hello world';

// Correct
is.truthy(unknownValue); // true
is.string(unknownValue); // true
is.number(unknownValue); // false
is.boolean(unknownValue); // false
is.nullOrUndefined(unknownValue); // false
is.nonEmptyStringAndNotWhitespace(unknownValue); // true

// Incorrect
Boolean(unknownValue);
!!unknownValue;
typeof unknownValue === 'string';
```

The `assert` utility contains all the same methods as `is`, however instead of returning a boolean value, it throws an error if the expectation fails. Use this instead of type assertions, and instead of conditionals that check the truthiness of a value:

```typescript
const unknownValue: unknown = true;

// Correct
assert.truthy(unknownValue); // TS knows `unknownValue` is truthy now

// Incorrect
if (!unknownValue) {
  throw new Error('Expected unknown value to be truthy');
}
```

### Lodash

Use named imports from the `lodash/es` module for functional patterns.

Generally, the following lodash utilities are recommended to be used instead of manually implementing them with loops or array `map`/`reduce` methods:

- groupBy
- keyBy
- countBy
- partition
- compact

When possible, use the shorthand syntax:

```typescript
// Correct
const objectsById = groupBy(objects, '_id');
const [valid, invalid] = partition(results, 'isValid');

// Incorrect
const objectsById = groupBy(objects, o => o._id);
const [valid, invalid] = partition(results, result => result.isValid);
```

## Frontend Patterns

### React

Do not use `useCallback` or `useMemo`. Instead, functions and computed values in a component can be directly assigned to local variables. This project uses the React Compiler with React 19, so memoization of local variables is automatic.

### TanStack Router

Client-side routes are managed by TanStack Router, and are defined in [packages/client/src/routes](../../../packages/client/src/routes).

## Backend Patterns

### tRPC (API routes)

The server package's tRPC routes are defined in [packages/server/src/api](../../../packages/server/src/api). `protectedProcedure` is used for any queries/mutations that require an authenticated user.
