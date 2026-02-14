import type { ResolveParams } from '@tanstack/react-router';

import type { FileRouteTypes } from '../routeTree.gen';

export type AppPathname = FileRouteTypes['to'];

/**
 * Check if a route has any params (used to conditionally require params argument).
 */
type HasParams<TRouteId extends AppPathname> = [ResolveParams<TRouteId>] extends [never]
  ? false
  : true;

/**
 * A tuple holding a route ID and its params, if any.
 */
export type RouterPathnameArgs<TRouteId extends AppPathname> =
  HasParams<TRouteId> extends true
    ? [routeId: TRouteId, params: ResolveParams<TRouteId>]
    : [routeId: TRouteId, params?: Record<string, never>];

/**
 * Generates a browser-ready pathname from a route ID and its params.
 *
 * @example
 * // Route without params
 * toAppUrl('/login')
 * // => '/login'
 *
 * @example
 * // Route without params
 * toAppUrl('/dashboard')
 * // => '/dashboard'
 */
export function toAppUrl<TRouteId extends AppPathname>(
  ...args: RouterPathnameArgs<TRouteId>
): string {
  const [routeId, params = {}] = args;

  let url: string = routeId;

  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`$${key}`, encodeURIComponent(value));
  }

  return url;
}
