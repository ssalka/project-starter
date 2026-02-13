# @ssalka/ui

Shared UI component library and design system for this project.

## Overview

This package provides:

- **Design tokens** - A 3-layer token system (primitives → semantics → components)
- **UI components** - Reusable components from [shadcn/ui](https://ui.shadcn.com/) built on [Radix UI](https://www.radix-ui.com/)
- **Tailwind preset** - Pre-configured theme with brand colors, typography, and motion

---

## Design Token Architecture

The design system follows a 3-layer token architecture:

```
┌─────────────────────────────────────────────────────────────┐
│  COMPONENT TOKENS (Layer 3)                                 │
│  e.g., button-primary-bg, card-shadow, input-focus-ring     │
│  → Defined in component files                               │
├─────────────────────────────────────────────────────────────┤
│  SEMANTIC TOKENS (Layer 2)                                  │
│  e.g., --primary, --background, --success, --sidebar-*      │
│  → Defined in src/tokens/semantic.css                       │
│  → Support light/dark theming                               │
├─────────────────────────────────────────────────────────────┤
│  PRIMITIVE TOKENS (Layer 1)                                 │
│  e.g., --color-purple-500, --color-slate-200        │
│  → Defined in src/tokens/primitives.css                     │
│  → Raw values, no semantic meaning                          │
└─────────────────────────────────────────────────────────────┘
```

### Usage Rules

| Token Layer | Use In Components?  | Use In App Code?       |
| ----------- | ------------------- | ---------------------- |
| Primitives  | ❌ Never            | ❌ Never               |
| Semantics   | ✅ Yes              | ✅ Yes                 |
| Component   | ✅ Yes (internally) | ❌ Use component props |

### Color Token Categories

| Category    | Tokens                                  | Purpose                      |
| ----------- | --------------------------------------- | ---------------------------- |
| **Core**    | `background`, `foreground`, `surface-*` | Page backgrounds and text    |
| **Brand**   | `primary`, `secondary`, `accent`        | Brand actions and emphasis   |
| **Status**  | `success`, `warning`, `error`, `info`   | Feedback and validation      |
| **Sidebar** | `sidebar-*`                             | Navigation and sidebar areas |

---

## Brand Colors

The design system uses the following color palette for branding:

| Color            | Usage                      | CSS Variable         |
| ---------------- | -------------------------- | -------------------- |
| **Brand Orange** | Primary actions, authority | `--color-orange-500` |
| **Brand Warm**   | Accents, highlights        | `--color-warm-500`   |

---

## Installation

This package is internal to the this monorepo. Add it to your package dependencies:

```json
{
  "dependencies": {
    "@ssalka/ui": "workspace:*"
  }
}
```

Also add it as a reference in your package's tsconfig:

```json
{
  "references": [{ "path": "../common" }, { "path": "../ui" }]
}
```

---

## Usage

### Tailwind Configuration

Import the preset in your `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

import uiPreset from '@ssalka/ui/components/tailwind-preset';

const config: Config = {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../ui/src/**/*.{ts,tsx}', // Include UI package components
  ],
};

export default config;
```

### CSS Entrypoint

Import the design system in your main CSS file:

```css
@import '@ssalka/ui/src/tailwind.css';
@config './tailwind.config.ts';
```

### Components

Import components individually for optimal tree-shaking:

```tsx
import { Button } from '@ssalka/ui/components/button';
import { Card } from '@ssalka/ui/components/card';

function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Using Semantic Colors

Always use semantic tokens in your code:

```tsx
// ✅ Good - uses semantic tokens
<div className="bg-primary text-primary-foreground" />
<div className="bg-success-background text-success-foreground" />
<div className="border-border bg-surface-sunken" />

// ❌ Bad - uses raw colors
<div className="bg-purple-500 text-white" />
<div className="bg-green-100 text-green-800" />
<div className="border-gray-200 bg-gray-50" />
```

---

## Typography

The system uses **Geist** as the primary typeface:

| Family     | Usage         | Tailwind Class |
| ---------- | ------------- | -------------- |
| Geist      | Body text, UI | `font-sans`    |
| Geist Mono | Code, data    | `font-mono`    |

### Typography Components

```tsx
import { H1, H2, H3, H4, P, SmallCapsLabel } from '@ssalka/ui/components/typography';

<H1>Page Title</H1>
<H2>Section Heading</H2>
<P>Body paragraph text</P>
<SmallCapsLabel>Form Label</SmallCapsLabel>
```

### Typography CVA Utility

```tsx
import { typography } from '@ssalka/ui/components/styles/typography';

const textClass = typography({
  size: 'lg',
  weight: 'semibold',
  color: 'muted',
});
```

---

## Spacing & Density

Use Tailwind's spacing scale. The system defines comfortable defaults:

| Context | Padding      | Gap           |
| ------- | ------------ | ------------- |
| Page    | `p-2 md:p-4` | `space-y-4`   |
| Card    | `p-6`        | `space-y-1.5` |
| Form    | `p-4`        | `space-y-4`   |

---

## Border Radius

| Token          | Value | Usage           |
| -------------- | ----- | --------------- |
| `rounded-sm`   | 4px   | Small elements  |
| `rounded`      | 8px   | Default         |
| `rounded-lg`   | 12px  | Cards, dialogs  |
| `rounded-xl`   | 16px  | Marketing       |
| `rounded-full` | pill  | Badges, avatars |

---

## Shadows & Elevation

| Token       | Usage           |
| ----------- | --------------- |
| `shadow-xs` | Subtle lift     |
| `shadow-sm` | Cards           |
| `shadow-md` | Popovers        |
| `shadow-lg` | Dropdowns       |
| `shadow-xl` | Modals, dialogs |

---

## Motion & Animation

### Duration Tokens

| Token          | Value | Usage                |
| -------------- | ----- | -------------------- |
| `duration-150` | 150ms | Micro-interactions   |
| `duration-200` | 200ms | Standard transitions |
| `duration-300` | 300ms | Page transitions     |

### Built-in Animations

| Class                    | Effect           |
| ------------------------ | ---------------- |
| `animate-fade-in`        | Fade in          |
| `animate-scale-in`       | Scale + fade in  |
| `animate-accordion-down` | Accordion expand |

### Reduced Motion

Animations automatically disable when `prefers-reduced-motion: reduce` is set.

---

## Z-Index Scale

| Token              | Value | Usage               |
| ------------------ | ----- | ------------------- |
| `z-dropdown`       | 100   | Dropdowns           |
| `z-sticky`         | 200   | Sticky headers      |
| `z-modal-backdrop` | 400   | Modal overlays      |
| `z-modal`          | 500   | Modals              |
| `z-popover`        | 600   | Popovers            |
| `z-tooltip`        | 700   | Tooltips            |
| `z-toast`          | 800   | Toast notifications |

---

## Dark Mode

Dark mode is enabled via the `dark` class on the document root:

```html
<html class="dark"></html>
```

All semantic tokens automatically adapt. Never hardcode light/dark variants:

```tsx
// ✅ Good - automatically adapts
<div className="bg-background text-foreground" />

// ❌ Bad - manual dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
```

---

## Governance & Best Practices

### PR Checklist for Token Changes

When modifying design tokens, ensure:

- The change is documented in this README
- Both light and dark mode values are updated
- Contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for UI)
- All affected components are tested
- No hardcoded colors bypass the token system

### Code Review Guidelines

**Do:**

- Use semantic tokens (`bg-primary`, `text-muted-foreground`)
- Use component variants over custom styling
- Follow the existing typography scale

**Don't:**

- Use raw Tailwind colors (`bg-gray-500`, `text-purple-600`)
- Add one-off spacing values
- Create custom colors outside the token system

### Adding New Tokens

1. Add primitive to `src/tokens/primitives.css` if it's a new raw value
2. Create semantic mapping in `src/tokens/semantic.css`
3. Expose in `tailwind-preset.ts`
4. Document in this README
5. Ensure both light and dark mode are handled

---

## File Structure

```
packages/ui/
├── src/
│   ├── tokens/
│   │   ├── primitives.css    # Layer 1: Raw values
│   │   └── semantic.css      # Layer 2: Semantic mappings
│   ├── colors.css            # Token exports + @theme
│   ├── fonts.css             # Font face definitions
│   ├── tailwind.css          # Main entry point
│   ├── styles/
│   │   ├── typography.ts     # Typography CVA
│   │   └── colors.ts         # Color type exports
│   └── components/           # UI components
├── tailwind-preset.ts        # Tailwind preset config
├── tailwind.config.ts        # Internal config
└── README.md                 # This file
```

---

## Accessibility

The design system is built with accessibility in mind:

- **Color contrast**: All text meets WCAG AA (4.5:1 ratio)
- **Focus indicators**: Visible focus rings on all interactive elements
- **Motion**: Respects `prefers-reduced-motion`
- **Screen readers**: Proper ARIA labels in components
