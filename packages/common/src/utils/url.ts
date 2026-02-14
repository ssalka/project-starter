export function getDomain(url: string): string | null {
  /** @see https://regex101.com/r/jN6kU2/1 */
  const match = url.match(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/);

  return match?.[1] ?? null;
}
