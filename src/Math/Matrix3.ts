import { Vector2 } from '.'

export class Matrix3 {
	m11: number
	m12: number
	m13: number

	m21: number
	m22: number
	m23: number

	m31: number
	m32: number
	m33: number

	isIdentity: boolean

	translation: Vector2

	static readonly Identity = new Matrix3()

	// prettier-ignore
	constructor(
		m11: number = 1, m12: number = 0, m13: number = 0,
		m21: number = 0, m22: number = 1, m23: number = 0,
		m31: number = 0, m32: number = 0, m33: number = 1
	) {
		this.m11 = m11
		this.m12 = m12
		this.m13 = m13

		this.m21 = m21
		this.m22 = m22
		this.m23 = m23

		this.m31 = m31
		this.m32 = m32
		this.m33 = m33

		this.isIdentity = (
			m11 == 1 && m22 == 1 && m33 == 1 &&
			m12 == 0 && m13 == 0 &&
			m21 == 0 && m23 == 0 &&
			m31 == 0 && m32 == 0
		)

		this.translation = new Vector2(m31, m32)
	}

	determinant(): number {
		return (
			this.m11 * this.m22 * this.m33 +
			this.m12 * this.m23 * this.m31 +
			this.m13 * this.m21 * this.m32 -
			this.m13 * this.m22 * this.m31 -
			this.m12 * this.m21 * this.m33 -
			this.m11 * this.m23 * this.m32
		)
	}

	det(): number {
		return this.determinant()
	}

	equals(m: Matrix3): boolean {
		return (
			this.m11 == m.m11 &&
			this.m12 == m.m12 &&
			this.m13 == m.m13 &&
			this.m21 == m.m21 &&
			this.m22 == m.m22 &&
			this.m23 == m.m23 &&
			this.m31 == m.m31 &&
			this.m32 == m.m32 &&
			this.m33 == m.m33
		)
	}

	clone(): Matrix3 {
		return new Matrix3(this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33)
	}

	static add(m1: Matrix3, m2: Matrix3): Matrix3 {
		const result = new Matrix3()

		result.m11 = m1.m11 + m2.m11
		result.m12 = m1.m12 + m2.m12
		result.m13 = m1.m13 + m2.m13

		result.m21 = m1.m21 + m2.m21
		result.m22 = m1.m22 + m2.m22
		result.m23 = m1.m23 + m2.m23

		result.m31 = m1.m31 + m2.m31
		result.m32 = m1.m32 + m2.m32
		result.m33 = m1.m33 + m2.m33

		return result
	}

	static sub(m1: Matrix3, m2: Matrix3): Matrix3 {
		const result = new Matrix3()

		result.m11 = m1.m11 - m2.m11
		result.m12 = m1.m12 - m2.m12
		result.m13 = m1.m13 - m2.m13

		result.m21 = m1.m21 - m2.m21
		result.m22 = m1.m22 - m2.m22
		result.m23 = m1.m23 - m2.m23

		result.m31 = m1.m31 - m2.m31
		result.m32 = m1.m32 - m2.m32
		result.m33 = m1.m33 - m2.m33

		return result
	}

	static multiply(m1: Matrix3, m2: Matrix3): Matrix3 {
		const result = new Matrix3()

		result.m11 = m1.m11 * m2.m11 + m1.m12 * m2.m21 + m1.m13 * m2.m31
		result.m12 = m1.m11 * m2.m12 + m1.m12 * m2.m22 + m1.m13 * m2.m32
		result.m13 = m1.m11 * m2.m13 + m1.m11 * m2.m23 + m1.m13 * m2.m33

		result.m21 = m1.m21 * m2.m11 + m1.m22 * m2.m21 + m1.m23 * m2.m31
		result.m22 = m1.m21 * m2.m12 + m1.m22 * m2.m22 + m1.m23 * m2.m32
		result.m23 = m1.m21 * m2.m13 + m1.m22 * m2.m23 + m1.m23 * m2.m33

		result.m31 = m1.m31 * m2.m11 + m1.m32 * m2.m21 + m1.m33 * m2.m31
		result.m32 = m1.m31 * m2.m12 + m1.m32 * m2.m22 + m1.m33 * m2.m32
		result.m33 = m1.m31 * m2.m13 + m1.m32 * m2.m23 + m1.m33 * m2.m33

		return result
	}

	static multiplyScalar(m: Matrix3, s: number): Matrix3 {
		// prettier-ignore
		return new Matrix3(
			m.m11 * s, m.m12 * s, m.m13 * s,
			m.m21 * s, m.m22 * s, m.m23 * s,
			m.m31 * s, m.m32 * s, m.m33 * s
		)
	}

	static transpose(m: Matrix3): Matrix3 {
		// prettier-ignore
		return new Matrix3(
			m.m11, m.m21, m.m31,
			m.m12, m.m22, m.m32,
			m.m13, m.m23, m.m33
		)
	}

	static invert(m: Matrix3, result: Matrix3): boolean {
		if (Math.abs(m.det()) < Number.EPSILON) {
			result = new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0)

			return false
		}

		if (!(result instanceof Matrix3)) result = new Matrix3()

		const invDet = 1 / m.det()

		result.m11 = m.m22 * invDet
		result.m12 = -m.m12 * invDet
		result.m21 = -m.m21 * invDet
		result.m22 = m.m11 * invDet
		result.m31 = (m.m21 * m.m32 - m.m31 * m.m22) * invDet
		result.m32 = (m.m31 * m.m12 - m.m11 * m.m32) * invDet

		return true
	}

	static negate(m: Matrix3): Matrix3 {
		// prettier-ignore
		return new Matrix3(
			-m.m11, -m.m12, -m.m13,
			-m.m21, -m.m22, -m.m23,
			-m.m31, -m.m32, -m.m33
		)
	}

	static lerp(m1: Matrix3, m2: Matrix3, alpha: number): Matrix3 {
		const result = new Matrix3()

		result.m11 = m1.m11 + (m2.m11 - m1.m11) * alpha
		result.m12 = m1.m12 + (m2.m12 - m1.m12) * alpha
		result.m13 = m1.m13 + (m2.m13 - m1.m13) * alpha

		result.m21 = m1.m21 + (m2.m21 - m1.m21) * alpha
		result.m22 = m1.m22 + (m2.m22 - m1.m22) * alpha
		result.m23 = m1.m23 + (m2.m23 - m1.m23) * alpha

		result.m31 = m1.m31 + (m2.m31 - m1.m31) * alpha
		result.m32 = m1.m32 + (m2.m32 - m1.m32) * alpha
		result.m33 = m1.m33 + (m2.m33 - m1.m33) * alpha

		return result
	}

	static createTranslation(v: Vector2): Matrix3 {
		const result = new Matrix3()

		result.m31 = v.x
		result.m32 = v.y

		return result
	}

	static createRotation(angle: number, center?: Vector2): Matrix3 {
		const c = Math.cos(angle),
			s = Math.sin(angle)

		const result = new Matrix3()

		result.m11 = c
		result.m12 = s

		result.m21 = -s
		result.m22 = c

		if (center) {
			result.m31 = center.x * (1 - c) + center.y * s
			result.m32 = center.y * (1 - c) - center.x * s
		}

		return result
	}

	static createScaleVec(v: Vector2, center?: Vector2): Matrix3 {
		const result = new Matrix3()

		result.m11 = v.x

		result.m22 = v.y

		if (center) {
			result.m31 = center.x * (1 - v.x)
			result.m32 = center.y * (1 - v.y)
		}

		return result
	}

	static createScaleScalar(s: number, center?: Vector2): Matrix3 {
		const result = new Matrix3()

		result.m11 = s

		result.m22 = s

		if (center) {
			result.m31 = center.x * (1 - s)
			result.m32 = center.y * (1 - s)
		}

		return result
	}

	static createSkew(angleX: number, angleY: number, center?: Vector2): Matrix3 {
		const result = new Matrix3()

		const xTan = Math.tan(angleX)
		const yTan = Math.tan(angleY)

		result.m12 = yTan

		result.m21 = xTan

		if (center) {
			result.m31 = -center.y * xTan
			result.m32 = -center.x * yTan
		}

		return result
	}
}
