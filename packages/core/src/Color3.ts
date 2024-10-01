import { clamp } from './maths'

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
    } else if (
      typeof input === 'object' &&
      typeof input.r === 'number' &&
      typeof input.g === 'number' &&
      typeof input.b === 'number'
    ) {
      this.r = clamp(input.r, 0, 255)
      this.g = clamp(input.g, 0, 255)
      this.b = clamp(input.b, 0, 255)
    } else {
      throw new TypeError('Invalid input type for Color3')
    }
  }

  toString(): string {
    return `${this.r},${this.g},${this.b}`
  }
}
