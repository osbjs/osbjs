export interface IVector2 {
  x: number
  y: number
}

export type Vector2Tuple = [number, number]

/**
 * Represents vector in 2 dimensional space.
 */
export class Vector2 implements IVector2 {
  x: number
  y: number

  /**
   * @param input - The x component as a number, a tuple of [x, y], or an object with x and y properties. Defaults to 0.
   * @param y - The y component as a number if the input is a number. Defaults to 0.
   */
  constructor(input: number | Vector2Tuple | IVector2 = 0, y: number = 0) {
    if (Array.isArray(input)) {
      const [x, y] = input
      if (typeof x !== 'number' || typeof y !== 'number') {
        throw new TypeError('Invalid input type for Vector2')
      }
      this.x = x
      this.y = y
    } else if (
      typeof input === 'object' &&
      typeof input.x === 'number' &&
      typeof input.y === 'number'
    ) {
      this.x = input.x
      this.y = input.y
    } else {
      throw new TypeError('Invalid input type for Vector2')
    }
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param v - The vector to compare with.
   * @returns True if the vectors are equal, false otherwise.
   */
  equals(v: Vector2): boolean {
    return this.x === v.x && this.y === v.y
  }

  /**
   * Adds another vector to this vector.
   * @param v The vector to add.
   */
  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y)
  }

  /**
   * Subtracts another vector from this vector.
   * @param v The vector to subtract.
   */
  subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  /**
   * Multiplies this vector by a scalar.
   * @param scalar - The scalar to multiply by.
   */
  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  /**
   * Divides this vector by a scalar.
   * @param scalar - The scalar to divide by.
   */
  divide(scalar: number): Vector2 {
    if (scalar === 0) throw new Error('Cannot divide by zero')
    return new Vector2(this.x / scalar, this.y / scalar)
  }

  /**
   * Calculates the dot product with another vector.
   * @returns The dot product.
   */
  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y
  }

  /**
   * Calculates the magnitude (length) of the vector.
   * @returns The magnitude of the vector.
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Normalizes the vector (makes it unit length).
   */
  normalize(): Vector2 {
    const mag = this.length()
    if (mag === 0) return new Vector2()
    return this.divide(mag)
  }

  /**
   * Calculates the distance between this vector and another vector.
   * @param v The vector to calculate the distance to.
   */
  distance(v: Vector2): number {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2)
  }

  /**
   * Calculates the angle between this vector and another vector in radians.
   * @param v The vector to calculate the angle with.
   */
  angle(v: Vector2): number {
    const dotProduct = this.dot(v)
    const magnitudes = this.length() * v.length()
    if (magnitudes === 0)
      throw new RangeError('Cannot calculate angle with zero-length vector')
    return Math.acos(dotProduct / magnitudes)
  }

  /**
   * Creates a copy of this vector.
   * @returns A new vector with the same components.
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }

  /**
   * Negates the vector (inverts its direction).
   * @returns The negated vector.
   */
  negate(): Vector2 {
    return new Vector2(-this.x, -this.y)
  }

  /**
   * Provides a string representation of the vector.
   * @returns A string representing the vector.
   */
  toString(): string {
    return `${this.x},${this.y}`
  }
}
