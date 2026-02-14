---
name: ui
description: Design system and UI component guidelines for @ssalka/ui. Use when working with UI components, styling, colors, typography, or theming.
---

# UI Design System

This skill covers the `@ssalka/ui` package - the shared UI component library and design system.

## Package Overview

- **Location**: `packages/ui/`
- **Package name**: `@ssalka/ui`
- **Based on**: [shadcn/ui](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/) primitives
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Typography**: Geist font family

## Design Token Architecture

The system uses a 3-layer token architecture:

```
Layer 3: COMPONENT TOKENS (in component files)
         e.g., button styles, card shadows
              ↑
Layer 2: SEMANTIC TOKENS (src/tokens/semantic.css)
         e.g., --primary, --background, --success
         Supports light/dark theming
              ↑
Layer 1: PRIMITIVE TOKENS (src/tokens/primitives.css)
         e.g., --color-orange-500, --color-warm-200
         Raw values, never use directly
```

### Token Usage Rules

| Token Layer | Use In Components? | Use In App Code?    |
| ----------- | ------------------ | ------------------- |
| Primitives  | Never              | Never               |
| Semantics   | Yes                | Yes                 |
| Component   | Yes (internally)   | Use component props |

## Semantic Color Categories

### Core Colors

- `background`, `foreground` - Page backgrounds and text
- `surface`, `surface-raised`, `surface-sunken`, `surface-overlay` - Layered surfaces

### Brand Colors

- `primary` - Orange accent for primary actions (--color-orange-500)
- `secondary` - Warm neutral for secondary actions
- `accent` - Orange tint for emphasis and highlights

### Interactive States

Each brand color supports interaction states:

```tsx
// Primary has: primary, primary-foreground, primary-hover, primary-active
<button className="bg-primary hover:bg-primary-hover active:bg-primary-active" />
```

### Status Colors

- `success`, `warning`, `error`, `info`
- Each has: DEFAULT, foreground, background, border variants

```tsx
<Alert variant="error" /> // Uses --error-background, --error-border, --error
```

### Sidebar Colors

Dark sidebar theme with dedicated tokens:

- `sidebar-background`, `sidebar-foreground`, `sidebar-border`
- `sidebar-accent`, `sidebar-primary`, `sidebar-muted`

## Importing Components

Always import components individually for tree-shaking:

```tsx
// Incorrect - barrel import prevents tree-shaking
import { Button, Card } from '@ssalka/ui';
// Correct - individual imports
import { Button } from '@ssalka/ui/components/button';
import { Card } from '@ssalka/ui/components/card';
```

## Key Components

### Button

Uses `class-variance-authority` (CVA) for variants:

```tsx
import { Button } from '@ssalka/ui/components/button';

// Variants: default, destructive, outline, secondary, ghost, link
<Button variant="default">Primary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes: default, xs, sm, lg, icon, icon-sm, icon-xs
<Button size="sm">Small</Button>
<Button size="icon"><Icon /></Button>

// Intents: success, warning, info, error (works with variant)
<Button intent="success">Saved</Button>
<Button intent="error" variant="ghost">Error</Button>

// Polymorphic with asChild
<Button asChild><Link href="/home">Home</Link></Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@ssalka/ui/components/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>;
```

### Typography

```tsx
import { H1, H2, H3, H4, P, SmallCapsLabel } from '@ssalka/ui/components/typography';

<H1>Page Title</H1>           // text-4xl font-bold
<H2>Section</H2>              // text-2xl font-semibold
<H3>Subsection</H3>           // text-lg font-semibold
<P>Paragraph text</P>         // text-sm leading-tight
<SmallCapsLabel>Label</SmallCapsLabel>  // small-caps, muted
```

### Typography CVA Utility

```tsx
import { typography } from '@ssalka/ui/styles/typography';

// Size: 7xl, 6xl, 5xl, 4xl, 3xl, 2xl, xl, lg, md, sm, xs
// Weight: light, normal, medium, semibold, bold
// Color: muted, red, orange, yellow, green, blue, indigo, violet
// Variant: code, codeBlock, paragraph, placeholder
// Caps: normal, small

<span className={typography({ size: 'lg', weight: 'semibold', color: 'muted' })}>Styled text</span>;
```

### Input

```tsx
import { Input } from '@ssalka/ui/components/input';

// Supports onEnter callback
<Input placeholder="Enter text..." onEnter={(e, value) => console.log(value)} />;
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription, AlertAction } from '@ssalka/ui/components/alert';

// Variants: default, error, info, success, warning, secondary
<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
  <AlertAction><Button size="sm">Retry</Button></AlertAction>
</Alert>

// Compact mode
<Alert variant="info" compact>Quick info</Alert>
```

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@ssalka/ui/components/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Sidebar

Full-featured sidebar with mobile sheet support:

```tsx
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@ssalka/ui/components/sidebar';

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Logo</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Section</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Home">
              <HomeIcon />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Footer</SidebarFooter>
  </Sidebar>
  <SidebarTrigger />
  <main>Content</main>
</SidebarProvider>;
```

## Utility Functions

### cn() - Class Name Merger

```tsx
import { cn } from '@ssalka/ui/utils';

// Combines clsx and tailwind-merge
cn('bg-red-500', condition && 'text-white', 'bg-blue-500');
// Result: 'bg-blue-500 text-white' (tailwind-merge resolves conflicts)
```

### Other Utilities

```tsx
import { cn, isMobile, prefersReducedMotion, toast } from '@ssalka/ui/utils';

// Toast notifications (via sonner)
toast('Message saved');
toast.success('Success!');
toast.error('Error occurred');

// Motion preference check
if (!prefersReducedMotion) {
  // Run animation
}
```

## Tailwind Configuration

### Using the Preset

```ts
// tailwind.config.ts
import uiPreset from '@ssalka/ui/tailwind-preset';

export default {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../ui/src/**/*.{ts,tsx}', // Include UI package
  ],
};
```

### CSS Entry Point

```css
@import '@ssalka/ui/src/tailwind.css';
@config './tailwind.config.ts';
```

## Custom Utilities

Defined in `src/tailwind.css`:

- `small-caps` - Applies `font-variant-caps: all-small-caps`
- `caps-normal` - Resets to normal caps
- `squircle` - iOS-style rounded corners (with fallback)
- `page` - Standard page padding (`p-2 md:p-4`)

## Spacing Guidelines

| Context | Padding      | Gap           |
| ------- | ------------ | ------------- |
| Page    | `p-2 md:p-4` | `space-y-4`   |
| Card    | `p-6`        | `space-y-1.5` |
| Form    | `p-4`        | `space-y-4`   |

## Border Radius Scale

| Token          | Value | Usage           |
| -------------- | ----- | --------------- |
| `rounded-sm`   | 4px   | Small elements  |
| `rounded`      | 8px   | Default         |
| `rounded-lg`   | 12px  | Cards, dialogs  |
| `rounded-xl`   | 16px  | Marketing       |
| `rounded-full` | pill  | Badges, avatars |

## Shadow Scale

| Token       | Usage           |
| ----------- | --------------- |
| `shadow-xs` | Subtle lift     |
| `shadow-sm` | Cards           |
| `shadow-md` | Popovers        |
| `shadow-lg` | Dropdowns       |
| `shadow-xl` | Modals, dialogs |

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

## Animation Tokens

### Durations

- `duration-150` - Micro-interactions
- `duration-200` - Standard transitions
- `duration-300` - Page transitions

### Built-in Animations

- `animate-fade-in`, `animate-fade-out`
- `animate-scale-in`, `animate-scale-out`
- `animate-slide-in-from-top/bottom/left/right`
- `animate-accordion-down`, `animate-accordion-up`

Animations automatically disable when `prefers-reduced-motion: reduce` is set.

## Dark Mode

Enable via `dark` class on document root:

```html
<html class="dark"></html>
```

All semantic tokens automatically adapt. Never hardcode light/dark variants:

```tsx
// Correct - automatically adapts
<div className="bg-background text-foreground" />

// Incorrect - manual dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
```

## Best Practices

### Do

- Use semantic tokens (`bg-primary`, `text-muted-foreground`)
- Import components individually for tree-shaking
- Use component variants via props, not custom styling
- Follow the typography scale
- Use `cn()` for conditional class merging

### Don't

- Use raw Tailwind colors (`bg-gray-500`, `text-purple-600`)
- Use primitive tokens directly
- Add one-off spacing values
- Create custom colors outside the token system
- Import from the barrel export (`@ssalka/ui`)

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
│   ├── utils.ts              # cn(), toast, etc.
│   └── components/           # UI components
├── tailwind-preset.ts        # Tailwind preset config
└── README.md                 # Full documentation
```

## Adding New Components

Use the shadcn CLI to add components:

```bash
# works from client or ui package, or from root
pnpm add-component <component-name>
```

This runs `pnpm dlx shadcn@latest add` which will scaffold the component following the design system patterns.
