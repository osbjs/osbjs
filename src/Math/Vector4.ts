import { Quaternion } from '.'
import { Matrix4 } from './Matrix4'

export class Vector4 {
	x: number
	y: number
	z: number
	w: number

	static One: Vector4 = new Vector4(1, 1, 1, 1)
	static Unitx: Vector4 = new Vector4(1, 0, 0, 0)
	static Unity: Vector4 = new Vector4(0, 1, 0, 0)
	static Unitz: Vector4 = new Vector4(0, 0, 1, 0)
	static Unitw: Vector4 = new Vector4(0, 0, 0, 1)
	static zero: Vector4 = new Vector4()

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
		this.x = x
		this.y = y
		this.z = z
		this.w = w
	}

	equals(v: Vector4): boolean {
		return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w
	}

	clone(): Vector4 {
		return new Vector4(this.x, this.y, this.z, this.w)
	}

	length(): number {
		return Math.sqrt(this.lengthSqr())
	}

	lengthSqr(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	}

	distanceTo(v: Vector4): number {
		return Math.sqrt(this.distanceToSqr(v))
	}

	distanceToSqr(v: Vector4): number {
		const dx = this.x - v.x,
			dy = this.y - v.y,
			dz = this.z - v.z,
			dw = this.w - v.w

		return dx * dx + dy * dy + dz * dz + dw * dw
	}

	static add(v1: Vector4, v2: Vector4): Vector4 {
		return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w)
	}

	static sub(v1: Vector4, v2: Vector4): Vector4 {
		return new Vector4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w)
	}

	static multiply(v1: Vector4, v2: Vector4): Vector4 {
		return new Vector4(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w)
	}

	static divide(v1: Vector4, v2: Vector4): Vector4 {
		return new Vector4(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z, v1.w / v2.w)
	}

	static addScalar(v: Vector4, s: number): Vector4 {
		return new Vector4(v.x + s, v.y + s, v.z + s, v.w + s)
	}

	static subScalar(v: Vector4, s: number): Vector4 {
		return new Vector4(v.x - s, v.y - s, v.z - s, v.w - s)
	}

	static multiplyScalar(v: Vector4, s: number): Vector4 {
		return new Vector4(v.x * s, v.y * s, v.z * s, v.w * s)
	}

	static divideScalar(v: Vector4, s: number): Vector4 {
		return Vector4.multiplyScalar(v, 1 / s)
	}

	static lerp(v1: Vector4, v2: Vector4, alpha: number) {
		let result = new Vector4()
		result.x = v1.x + (v2.x - v1.x) * alpha
		result.y = v1.y + (v2.y - v1.y) * alpha
		result.z = v1.z + (v2.z - v1.z) * alpha
		result.w = v1.w + (v2.w - v1.w) * alpha

		return result
	}

	static abs(v: Vector4): Vector4 {
		return new Vector4(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z), Math.abs(v.w))
	}

	static clamp(v: Vector4, min: Vector4, max: Vector4): Vector4 {
		let result = new Vector4()
		// assumes min < max, componentwise
		result.x = Math.max(min.x, Math.min(max.x, v.x))
		result.y = Math.max(min.y, Math.min(max.y, v.y))
		result.z = Math.max(min.z, Math.min(max.z, v.z))
		result.w = Math.max(min.w, Math.min(max.w, v.w))

		return result
	}

	static max(v1: Vector4, v2: Vector4): Vector4 {
		let result = new Vector4()

		result.x = Math.max(v1.x, v2.x)
		result.y = Math.max(v1.y, v2.y)
		result.z = Math.max(v1.z, v2.z)
		result.w = Math.max(v1.w, v2.w)

		return result
	}

	static min(v1: Vector4, v2: Vector4): Vector4 {
		let result = new Vector4()

		result.x = Math.min(v1.x, v2.x)
		result.y = Math.min(v1.y, v2.y)
		result.z = Math.min(v1.z, v2.z)
		result.w = Math.min(v1.w, v2.w)

		return result
	}

	static negate(v: Vector4): Vector4 {
		return Vector4.multiplyScalar(v, -1)
	}

	static normalize(v: Vector4): Vector4 {
		return Vector4.divideScalar(v, v.length() || 1)
	}

	static applyQuat(v: Vector4, q: Quaternion): Vector4 {
		const x2 = q.x + q.x
		const y2 = q.y + q.y
		const z2 = q.z + q.z

		const wx2 = q.w * x2
		const wy2 = q.w * y2
		const wz2 = q.w * z2
		const xx2 = q.x * x2
		const xy2 = q.x * y2
		const xz2 = q.x * z2
		const yy2 = q.y * y2
		const yz2 = q.y * z2
		const zz2 = q.z * z2

		let result = new Vector4()

		result.x = v.x * (1.0 - yy2 - zz2) + v.y * (xy2 - wz2) + v.z * (xz2 + wy2)
		result.y = v.x * (xy2 + wz2) + v.y * (1.0 - xx2 - zz2) + v.z * (yz2 - wx2)
		result.z = v.x * (xz2 - wy2) + v.y * (yz2 + wx2) + v.z * (1.0 - xx2 - yy2)
		result.w = v.w

		return result
	}

	static applyMat4(v: Vector4, m: Matrix4): Vector4 {
		return new Vector4(
			v.x * m.m11 + v.y * m.m21 + v.z * m.m31 + v.w * m.m41,
			v.x * m.m12 + v.y * m.m22 + v.z * m.m32 + v.w * m.m42,
			v.x * m.m13 + v.y * m.m23 + v.z * m.m33 + v.w * m.m43,
			v.x * m.m14 + v.y * m.m24 + v.z * m.m34 + v.w * m.m44
		)
	}
}
