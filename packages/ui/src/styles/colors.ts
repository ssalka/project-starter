/**
 * =============================================================================
 * DESIGN SYSTEM - COLOR UTILITIES
 * =============================================================================
 *
 * TypeScript utilities for working with design system colors.
 * These constants should mirror the color tokens defined in CSS.
 * =============================================================================
 */

/**
 * Semantic color names available in the typography system.
 * These map to Tailwind utility classes (e.g., text-red-600, bg-red-100).
 */
export const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'] as const;

export type Color = (typeof colors)[number];

/**
 * Status colors for UI feedback.
 */
export const statusColors = ['success', 'warning', 'error', 'info'] as const;

export type StatusColor = (typeof statusColors)[number];

/**
 * Brand color palette names.
 */
export const brandColors = [
  'electric-aqua',
  'light-green',
  'neon-chartreuse',
  'amber-flame',
  'tiger-flame',
] as const;

export type BrandColor = (typeof brandColors)[number];
