import { clamp } from '.'
import { Matrix3 } from './Matrix3'
import { Matrix4 } from './Matrix4'
import { Quaternion } from './Quaternion'

export class Vector3 {
	x: number
	y: number
	z: number

	static One: Vector3 = new Vector3(1, 1, 1)
	static UnitX: Vector3 = new Vector3(1, 0, 0)
	static UnitY: Vector3 = new Vector3(0, 1, 0)
	static UnitZ: Vector3 = new Vector3(0, 0, 1)
	static Zero: Vector3 = new Vector3()

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x
		this.y = y
		this.z = z
	}

	equals(v: Vector3): boolean {
		return this.x === v.x && this.y === v.y && this.z === v.z
	}

	clone(): Vector3 {
		return new Vector3(this.x, this.y, this.z)
	}

	distanceTo(v: Vector3): number {
		return Math.sqrt(this.distanceToSqr(v))
	}

	distanceToSqr(v: Vector3): number {
		const dx = this.x - v.x,
			dy = this.y - v.y,
			dz = this.z - v.z

		return dx * dx + dy * dy + dz * dz
	}

	length(): number {
		return Math.sqrt(this.lengthSqr())
	}

	lengthSqr(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z
	}

	angleTo(v: Vector3): number {
		const denominator = Math.sqrt(this.lengthSqr() * v.lengthSqr())

		if (denominator === 0) return Math.PI / 2

		const theta = Vector3.dot(this, v) / denominator

		// clamp, to handle numerical problems
		return Math.acos(clamp(theta, -1, 1))
	}

	static add(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
	}

	static sub(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
	}

	static multiply(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z)
	}

	static divide(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z)
	}

	static addScalar(v: Vector3, s: number): Vector3 {
		return new Vector3(v.x + s, v.y + s, v.z + s)
	}

	static subScalar(v: Vector3, s: number): Vector3 {
		return new Vector3(v.x - s, v.y - s, v.z - s)
	}

	static multiplyScalar(v: Vector3, s: number): Vector3 {
		return new Vector3(v.x * s, v.y * s, v.z * s)
	}

	static divideScalar(v: Vector3, s: number): Vector3 {
		return Vector3.multiplyScalar(v, 1 / s)
	}

	static applyQuat(v: Vector3, q: Quaternion): Vector3 {
		const x = v.x,
			y = v.y,
			z = v.z,
			qx = q.x,
			qy = q.y,
			qz = q.z,
			qw = q.w
		let result = new Vector3()

		// calculate quat * vector
		const ix = qw * x + qy * z - qz * y
		const iy = qw * y + qz * x - qx * z
		const iz = qw * z + qx * y - qy * x
		const iw = -qx * x - qy * y - qz * z

		// calculate result * inverse quat
		result.x = ix * qw + iw * -qx + iy * -qz - iz * -qy
		result.y = iy * qw + iw * -qy + iz * -qx - ix * -qz
		result.z = iz * qw + iw * -qz + ix * -qy - iy * -qx

		return result
	}

	static applyMat4(v: Vector3, m: Matrix4): Vector3 {
		// prettier-ignore
		return new Vector3(
			v.x * m.m11 + v.y * m.m21 + v.z * m.m31 + m.m41,
			v.x * m.m12 + v.y * m.m22 + v.z * m.m32 + m.m42,
			v.x * m.m13 + v.y * m.m23 + v.z * m.m33 + m.m43
		)
	}

	static applyMat3(v: Vector3, m: Matrix3): Vector3 {
		// prettier-ignore
		return new Vector3(
			v.x * m.m11 + v.y * m.m21 + v.z * m.m31,
			v.x * m.m12 + v.y * m.m22 + v.z * m.m32,
			v.x * m.m13 + v.y * m.m23 + v.z * m.m33
		)
	}

	static lerp(v1: Vector3, v2: Vector3, alpha: number): Vector3 {
		let result = new Vector3()

		result.x = v1.x + (v2.x - v1.x) * alpha
		result.y = v1.y + (v2.y - v1.y) * alpha
		result.z = v1.z + (v2.z - v1.z) * alpha

		return result
	}

	static max(v1: Vector3, v2: Vector3): Vector3 {
		let result = new Vector3()
		result.x = Math.max(v1.x, v2.x)
		result.y = Math.max(v1.y, v2.y)
		result.z = Math.max(v1.z, v2.z)

		return result
	}

	static min(v1: Vector3, v2: Vector3): Vector3 {
		let result = new Vector3()
		result.x = Math.min(v1.x, v2.x)
		result.y = Math.min(v1.y, v2.y)
		result.z = Math.min(v1.z, v2.z)

		return result
	}

	static dot(v1: Vector3, v2: Vector3): number {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
	}

	static cross(v1: Vector3, v2: Vector3): Vector3 {
		let result = new Vector3()

		result.x = v1.y * v2.z - v1.z * v2.y
		result.y = v1.z * v2.x - v1.x * v2.z
		result.z = v1.x * v2.y - v1.y * v2.x

		return result
	}

	static negate(v: Vector3): Vector3 {
		return Vector3.multiplyScalar(v, -1)
	}

	static normalize(v: Vector3): Vector3 {
		return Vector3.divideScalar(v, v.length() || 1)
	}

	static abs(v: Vector3): Vector3 {
		return new Vector3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z))
	}

	static reflect(v: Vector3, normal: Vector3): Vector3 {
		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length
		return Vector3.sub(v, Vector3.multiplyScalar(normal, 2 * Vector3.dot(v, normal)))
	}

	static clamp(v: Vector3, min: Vector3, max: Vector3): Vector3 {
		let result = new Vector3()
		// assumes min < max, componentwise
		result.x = Math.max(min.x, Math.min(max.x, v.x))
		result.y = Math.max(min.y, Math.min(max.y, v.y))
		result.z = Math.max(min.z, Math.min(max.z, v.z))

		return result
	}
}
