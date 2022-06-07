import { Quaternion } from '.'
import { Matrix3 } from './Matrix3'
import { Matrix4 } from './Matrix4'

export class Vector2 {
	x: number
	y: number
	static One: Vector2 = new Vector2(1, 1)
	static UnitX: Vector2 = new Vector2(1, 0)
	static UnitY: Vector2 = new Vector2(0, 1)
	static Zero: Vector2 = new Vector2()

	constructor(x: number = 0, y: number = 0) {
		this.x = x
		this.y = y
	}

	/**
	 * Returns true if the components of this vector and v are strictly equal; false otherwise.
	 */
	equals(v: Vector2): boolean {
		return this.x === v.x && this.y === v.y
	}

	/**
	 * Returns a new Vector2 with the same x, y values as this one.
	 */
	clone(): Vector2 {
		return new Vector2(this.x, this.y)
	}

	/**
	 * Returns the length of the vector.
	 */
	length(): number {
		return Math.sqrt(this.lengthSqr())
	}

	/**
	 * Returns the length of the vector squared.
	 */
	lengthSqr(): number {
		return this.x * this.x + this.y * this.y
	}

	/**
	 * Computes the Euclidean distance squared between the two given points.
	 */
	distanceToSqr(v: Vector2): number {
		const dx = this.x - v.x
		const dy = this.y - v.y

		return dx * dx + dy * dy
	}

	/**
	 * Computes the Euclidean distance between the two given points.
	 */
	distanceTo(v: Vector2): number {
		return Math.sqrt(this.distanceToSqr(v))
	}

	/**
	 * Computes the angle in radians with respect to the positive x-axis.
	*/
	angle(): number {
		const angle = Math.atan2(-this.y, -this.x) + Math.PI

		return angle
	}

	/**
	 * Adds two vectors together.
	 */
	static add(v1: Vector2, v2: Vector2): Vector2 {
		return new Vector2(v1.x + v2.x, v1.y + v2.y)
	}

	/**
	 * Subtracts the second vector from the first.
	 */
	static sub(v1: Vector2, v2: Vector2): Vector2 {
		return new Vector2(v1.x - v2.x, v1.y - v2.y)
	}

	/**
	 * Returns a new vector whose values are the product of each pair of elements in two specified vectors.
	 */
	static multiply(v1: Vector2, v2: Vector2): Vector2 {
		return new Vector2(v1.x * v2.x, v1.y * v2.y)
	}

	/**
	 * Divides the first vector by the second.
	 */
	static divide(v1: Vector2, v2: Vector2): Vector2 {
		return new Vector2(v1.x / v2.x, v1.y / v2.y)
	}

	/**
	 * Adds the scalar value s to this vector's x, y values.
	 */
	static addScalar(v: Vector2, s: number): Vector2 {
		return new Vector2(v.x + s, v.y + s)
	}

	/**
	 * Subtracts the scalar value s to this vector's x, y values.
	 */
	static subScalar(v: Vector2, s: number): Vector2 {
		return new Vector2(v.x - s, v.y - s)
	}

	/**
	 * Multiplies a vector by a specified scalar.
	 */
	static multiplyScalar(v: Vector2, s: number): Vector2 {
		return new Vector2(v.x * s, v.y * s)
	}

	/**
	 * Divides the specified vector by a specified scalar value.
	 */
	static divideScalar(v: Vector2, s: number): Vector2 {
		return Vector2.multiplyScalar(v, 1 / s)
	}

	/**
	 * Returns the dot product of two vectors.
	 */
	static dot(v1: Vector2, v2: Vector2): number {
		return v1.x * v2.x + v1.y * v2.y
	}

	/**
	 * Returns the cross product of two vectors.
	 */
	static cross(v1: Vector2, v2: Vector2): number {
		return v1.x * v2.y - v1.y * v2.x
	}

	/**
	 * Returns a vector with the same direction as the specified vector, but with a length of one.
	 */
	static normalize(v: Vector2): Vector2 {
		return Vector2.divideScalar(v, v.length() || 1)
	}

	/**
	 * Linearly interpolate between v1 and v2,
	 * where alpha is the percent distance along the line - alpha = 0 will be this vector,
	 * and alpha = 1 will be v.
	 */
	static lerp(v1: Vector2, v2: Vector2, alpha: number): Vector2 {
		let result = new Vector2()
		result.x = v1.x + (v2.x - v1.x) * alpha
		result.y = v1.y + (v2.y - v1.y) * alpha

		return result
	}

	/**
	 * Returns a vector whose elements are the maximum of each of the pairs of elements in two specified vectors.
	 */
	static max(v1: Vector2, v2: Vector2): Vector2 {
		let result = new Vector2()
		result.x = Math.max(v1.x, v2.x)
		result.y = Math.max(v1.y, v2.y)

		return result
	}

	/**
	 * Returns a vector whose elements are the minimum of each of the pairs of elements in two specified vectors.
	 */
	static min(v1: Vector2, v2: Vector2): Vector2 {
		let result = new Vector2()
		result.x = Math.min(v1.x, v2.x)
		result.y = Math.min(v1.y, v2.y)

		return result
	}

	/**
	 * Restricts a vector between a minimum and a maximum value.
	 */
	static clamp(v: Vector2, min: Vector2, max: Vector2): Vector2 {
		let result = new Vector2()
		// assumes min < max, componentwise
		result.x = Math.max(min.x, Math.min(max.x, v.x))
		result.y = Math.max(min.y, Math.min(max.y, v.y))

		return result
	}

	/**
	 * Negates a specified vector.
	 */
	static negate(v: Vector2) {
		return new Vector2(-v.x, -v.y)
	}

	/**
	 * Returns a vector whose elements are the absolute values of each of the specified vector's elements.
	 */
	static abs(v: Vector2): Vector2 {
		return new Vector2(Math.abs(v.x), Math.abs(v.y))
	}

	/**
	 * Transforms a vector by a specified 3x3 matrix.
	 */
	static applyMat3(v: Vector2, m: Matrix3): Vector2 {
		// prettier-ignore
		return new Vector2(
			v.x * m.m11 + v.y * m.m21 + m.m31,
			v.x * m.m12 + v.y * m.m22 + m.m32
		)
	}

	/**
	 * Transforms a vector by a specified 4x4 matrix.
	 */
	static applyMat4(v: Vector2, m: Matrix4): Vector2 {
		// prettier-ignore
		return new Vector2(
			v.x * m.m11 + v.y * m.m21 + m.m41,
			v.x * m.m12 + v.y * m.m22 + m.m42
		)
	}

	/**
	 * Transforms a vector by the specified Quaternion rotation value.
	 */
	static applyQuat(v: Vector2, q: Quaternion): Vector2 {
		const x2 = q.x + q.x
		const y2 = q.y + q.y
		const z2 = q.z + q.z

		const wz2 = q.w * z2
		const xx2 = q.x * x2
		const xy2 = q.x * y2
		const yy2 = q.y * y2
		const zz2 = q.z * z2

		return new Vector2(v.x * (1.0 - yy2 - zz2) + v.y * (xy2 - wz2), v.x * (xy2 + wz2) + v.y * (1.0 - xx2 - zz2))
	}
}
