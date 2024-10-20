/**
 * Clamps a value between a minimum and maximum range.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
