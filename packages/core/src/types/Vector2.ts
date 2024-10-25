export interface IVector2 {
  x: number
  y: number
}

export type Vector2Tuple = [number, number]

export class Vector2 implements IVector2 {
  x: number
  y: number

  constructor(vector?: Vector2Tuple | IVector2)
  constructor(x?: number, y?: number)
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
      typeof input.y === 'number' &&
      !isNaN(input.x) &&
      !isNaN(input.y)
    ) {
      this.x = input.x
      this.y = input.y
    } else if (typeof input === 'number') {
      this.x = input
      this.y = y
    } else {
      throw new TypeError('Invalid input type for Vector2')
    }
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param v - The vector to compare with.
   */
  eq(v: Vector2): boolean {
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
  sub(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  /**
   * Multiplies this vector by a scalar.
   * @param scalar - The scalar to multiply by.
   */
  mul(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  /**
   * Divides this vector by a scalar.
   * @param scalar - The scalar to divide by.
   */
  div(scalar: number): Vector2 {
    if (scalar === 0) throw new Error('Cannot divide by zero')
    return new Vector2(this.x / scalar, this.y / scalar)
  }

  /**
   * Calculates the dot product with another vector.
   */
  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y
  }

  /**
   * Calculates the magnitude (length) of the vector.
   */
  len(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Gets the square of the length of this vector.
   */
  lenSqr(): number {
    return Math.sqrt(this.len())
  }

  /**
   * Returns a normalized vector (a vector with unit length) of this vector.
   */
  normalize(): Vector2 {
    const mag = this.len()
    if (mag === 0) return new Vector2()
    return this.div(mag)
  }

  /**
   * Calculates the distance between this vector and another vector.
   * @param v The vector to calculate the distance to.
   */
  dist(v: Vector2): number {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2)
  }

  /**
   * Calculates the angle between this vector and another vector in radians.
   * @param v The vector to calculate the angle with.
   */
  angle(v: Vector2): number {
    const dotProduct = this.dot(v)
    const magnitudes = this.len() * v.len()
    if (magnitudes === 0)
      throw new RangeError('Cannot calculate angle with zero-length vector')
    return Math.acos(dotProduct / magnitudes)
  }

  /**
   * Creates a copy of this vector.
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }

  /**
   * Returns a negated vector of this one (inverts its direction).
   */
  negate(): Vector2 {
    return new Vector2(-this.x, -this.y)
  }

  /**
   * Provides a string representation of the vector.
   */
  toString(): string {
    return `${this.x},${this.y}`
  }
}
