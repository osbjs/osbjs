/**
 * Converts degrees to radians.
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Converts radians to degrees.
 */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI)
}

/**
 * Clamps a value between a minimum and maximum range.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Formats a number to a specified precision.
 */
export function precise(x: number, precision = 5): number {
  return Number(x.toPrecision(precision))
}
