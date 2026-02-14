import type { AnyTRPCRouter, inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from './router.js';

// WARN this module is intentionally exposed to the frontend so tRPC types can be shared

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

// NOTE Export the router type signature, NOT the router itself.
export type { AppRouter, RouterInput, RouterOutput };

/**
 * Recursively extracts the nested value type from RouterOutput given a dot-notation key.
 * For example: GetRouterOutput<'user.get'> => RouterOutput['user']['get']
 */
export type GetRouterOutput<K extends string> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof RouterOutput
    ? Tail extends string
      ? GetNestedValue<RouterOutput[Head], Tail>
      : never
    : never
  : K extends keyof RouterOutput
    ? RouterOutput[K]
    : never;

type GetNestedValue<T, K extends string> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? GetNestedValue<T[Head], Tail>
    : never
  : K extends keyof T
    ? T[K]
    : never;

/**
 * Recursively extracts all procedure keys from a router record in dot-notation.
 * Uses `_def.procedure: true` to identify procedures vs nested router records.
 */
type RouterRecordKeys<TRecord, TPrefix extends string = ''> = {
  [K in keyof TRecord & string]: TRecord[K] extends { _def: { procedure: true } }
    ? TPrefix extends ''
      ? K
      : `${TPrefix}.${K}`
    : TRecord[K] extends object
      ? RouterRecordKeys<TRecord[K], TPrefix extends '' ? K : `${TPrefix}.${K}`>
      : never;
}[keyof TRecord & string];

/**
 * Extracts all procedure keys from a tRPC router in dot-notation.
 * For example: 'healthcheck' | 'user.get' | 'entities.standardLibrary'
 */
type ProcedureKeys<TRouter extends AnyTRPCRouter> = RouterRecordKeys<TRouter['_def']['record']>;

/** All callable TRPC procedure keys in dot-notation: 'healthcheck' | 'user.get' | 'entities.standardLibrary' | ... */
export type RouterKeys = ProcedureKeys<AppRouter>;
