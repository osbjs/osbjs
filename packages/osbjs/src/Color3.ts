import { clamp } from './mathUtils'

export interface IColor3 {
  r: number
  g: number
  b: number
}

export type Color3Tuple = [number, number, number]

/**
 * Represents a color with red, green, and blue components.
 */
export class Color3 implements IColor3 {
  r: number
  g: number
  b: number

  /**
   * @param input - The color components as a number tuple, object literal, or hex string.
   */
  constructor(input: Color3Tuple | IColor3 | string) {
    if (typeof input === 'string') {
      input = input.replace(/^#/, '') // Remove the leading '#' if present

      const bigint = parseInt(input, 16)
      this.r = clamp((bigint >> 16) & 255, 0, 255)
      this.g = clamp((bigint >> 8) & 255, 0, 255)
      this.b = clamp(bigint & 255, 0, 255)
    } else if (Array.isArray(input)) {
      const [r, g, b] = input
      this.r = clamp(r, 0, 255)
      this.g = clamp(g, 0, 255)
      this.b = clamp(b, 0, 255)
    } else if (typeof input === 'object') {
      this.r = clamp(input.r, 0, 255)
      this.g = clamp(input.g, 0, 255)
      this.b = clamp(input.b, 0, 255)
    } else {
      throw new Error('Invalid input type for Color3')
    }
  }

  /**
   * Returns the string representation of the color in the format "r,g,b".
   * @returns The formatted color string.
   */
  toString(): string {
    return `${this.r},${this.g},${this.b}`
  }
}
