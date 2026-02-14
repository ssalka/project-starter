---
name: installing-dependencies
description: Guidelines for installing npm dependencies in this monorepo project. Use when installing packages, adding dependencies, or managing package.json files.
allowed-tools: Bash, Read
---

# Installing Dependencies

This Skill provides guidelines for correctly installing dependencies in this monorepo.

## Core Rules

### 1. Always Use pnpm

This project uses `pnpm` as the package manager. **Never use `npm`** for installing dependencies.

```bash
# Correct
pnpm install <package-name>

# Incorrect
npm install <package-name>
```

### 2. TypeScript Type Definitions

Always install `@types/*` packages as **devDependencies** using the `-D` flag:

```bash
# Correct
pnpm install -D @types/react

# Incorrect
pnpm install @types/react
```

### 3. Navigate to Package Directory

This is a monorepo. Always `cd` into the specific package where the dependency will be used before running the install command:

```bash
# Correct
cd packages/client
pnpm install react-query

# Incorrect (running from root)
pnpm install react-query
```

### 4. Version Consistency

If a dependency is already being used in another package in the monorepo, install the **same version** to maintain consistency:

```bash
# Check existing version first
grep "\"react\"" packages/*/package.json

# Install matching version
cd packages/new-package
pnpm install react@19.2.0
```

## Complete Installation Workflow

1. **Identify the target package** where the dependency is needed
2. **Check if the dependency exists elsewhere** in the monorepo
3. **Navigate to the package directory**: `cd packages/<package-name>`
4. **Install the dependency**:
   - For runtime dependencies: `pnpm install <package-name>`
   - For dev dependencies: `pnpm install -D <package-name>`
   - For type definitions: `pnpm install -D @types/<package-name>`
5. **Verify installation** by checking the `package.json` file

## Examples

### Installing a Runtime Dependency

```bash
cd packages/client
pnpm install axios
```

### Installing Type Definitions

```bash
cd packages/common
pnpm install -D @types/lodash
```

### Installing Multiple Packages

```bash
cd packages/server
pnpm install express body-parser cors
pnpm install -D @types/express @types/body-parser @types/cors
```

### Checking for Existing Versions

Before installing, check what versions are already in use:

```bash
# Check all package.json files for a specific dependency
grep -r "\"lodash-es\"" packages/*/package.json

# Output might show:
# packages/client/package.json:    "lodash-es": "^4.17.21"
# packages/server/package.json:    "lodash-es": "^4.17.21"

# Install the same version in a new package
cd packages/common
pnpm install lodash-es@4.17.21
```

## Common Mistakes to Avoid

- Using `npm` instead of `pnpm`
- Installing `@types/*` as regular dependencies instead of devDependencies
- Running install commands from the monorepo root instead of the package directory
- Installing different versions of the same package across packages without good reason

## Monorepo Structure

This monorepo follows this structure:

```
project-starter/
├── packages/
│   ├── client/      (Frontend React application)
│   ├── server/      (Backend Express+tRPC application)
│   └── common/      (Shared types and utilities)
└── package.json     (Root workspace configuration)
```

Always verify you're in the correct package directory before installing dependencies.
