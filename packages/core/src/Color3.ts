import { clamp } from './mathUtils'

export class Color3 {
  public r: number
  public g: number
  public b: number

  constructor(r: number = 0, g: number = 0, b: number = 0) {
    this.r = clamp(r, 0, 255)
    this.g = clamp(g, 0, 255)
    this.b = clamp(b, 0, 255)
  }

  toString(): string {
    return `${this.r},${this.g},${this.b}`
  }

  static fromHex(hex: string): Color3 {
    hex = hex.replace(/^#/, '') // Remove the leading '#' if present

    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return new Color3(r, g, b)
  }
}
