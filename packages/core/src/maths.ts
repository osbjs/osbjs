/**
 * Converts degrees to radians.
 * @param degrees - The angle in degrees.
 * @returns The angle converted to radians.
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Converts radians to degrees.
 * @param radians - The angle in radians.
 * @returns The angle converted to degrees.
 */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI)
}

/**
 * Clamps a value between a minimum and maximum range.
 * @param value - The value to clamp.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns The clamped value, constrained between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Formats a number to a specified precision.
 *
 * @param x - The number to be formatted.
 * @param precision - The number of significant digits. Defaults to 5.
 * @returns The formatted number.
 */
export function precise(x: number, precision = 5): number {
  return Number(x.toPrecision(precision))
}
