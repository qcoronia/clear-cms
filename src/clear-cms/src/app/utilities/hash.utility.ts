/**
 * @description Returns a hash of seed
 * @param seed Optional: defaults to `1`
 */
export function newHash(seed: string | number = 1): string {
  return btoa(`${seed}`);
}

/**
 * @description Returns a hash of seed incremented by `1`. _(Use number if possible)_
 * @param seed Optional: defaults to `1`
 */
export function shiftHash(seed: string | number = 1): string {
  return btoa(`${+atob(`${seed}`) + 1}`);
}
