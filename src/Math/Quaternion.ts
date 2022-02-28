import { clamp, Vector3 } from '.'
import { Matrix4 } from './Matrix4'

export class Quaternion {
	x: number
	y: number
	z: number
	w: number
	isIdentity: boolean

	static Identity: Quaternion = new Quaternion()

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
		this.x = x
		this.y = y
		this.z = z
		this.w = w
		this.isIdentity = x === 0 && y === 0 && z === 0 && w === 1
	}

	equals(q: Quaternion): boolean {
		return this.x === q.x && this.y === q.y && this.z === q.z && this.w === q.w
	}

	clone(): Quaternion {
		return new Quaternion(this.x, this.y, this.z, this.w)
	}

	angleTo(q: Quaternion): number {
		return 2 * Math.acos(Math.abs(clamp(Quaternion.dot(this, q), -1, 1)))
	}

	length(): number {
		return Math.sqrt(this.lengthSqr())
	}

	lengthSqr(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	}

	static dot(q1: Quaternion, q2: Quaternion): number {
		return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w
	}

	static add(q1: Quaternion, q2: Quaternion): Quaternion {
		return new Quaternion(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w)
	}

	static sub(v1: Quaternion, v2: Quaternion): Quaternion {
		return new Quaternion(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w)
	}

	static conjugate(q: Quaternion): Quaternion {
		return new Quaternion(q.x * -1, q.y * -1, q.z * -1, q.w)
	}

	static invert(q: Quaternion): Quaternion {
		// quaternion is assumed to have unit length
		return Quaternion.conjugate(q)
	}

	static normalize(q: Quaternion): Quaternion {
		let l = q.length()

		let result = new Quaternion()

		if (l === 0) {
			result.x = 0
			result.y = 0
			result.z = 0
			result.w = 1
		} else {
			l = 1 / l

			result.x = q.x * l
			result.y = q.y * l
			result.z = q.z * l
			result.w = q.w * l
		}

		return result
	}

	static multiply(q1: Quaternion, q2: Quaternion): Quaternion {
		const qax = q1.x,
			qay = q1.y,
			qaz = q1.z,
			qaw = q1.w
		const qbx = q2.x,
			qby = q2.y,
			qbz = q2.z,
			qbw = q2.w

		let result = new Quaternion()

		result.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby
		result.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz
		result.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx
		result.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz

		return result
	}

	static multiplyScalar(q: Quaternion, s: number): Quaternion {
		return new Quaternion(q.x * s, q.y * s, q.z * s, q.w * s)
	}

	static divide(q1: Quaternion, q2: Quaternion): Quaternion {
		let result = new Quaternion()

		const q1x = q1.x,
			q1y = q1.y,
			q1z = q1.z,
			q1w = q1.z

		const ls = q2.x * q2.x + q2.y * q2.y + q2.z * q2.z + q2.w * q2.w
		const invNorm = 1.0 / ls

		const q2x = -q2.x * invNorm,
			q2y = -q2.y * invNorm,
			q2z = -q2.z * invNorm,
			q2w = q2.w * invNorm

		result.x = q1x * q2w + q2x * q1w + q1y * q2z - q1z * q2y
		result.y = q1y * q2w + q2y * q1w + q1z * q2x - q1x * q2z
		result.z = q1z * q2w + q2z * q1w + q1x * q2y - q1y * q2x
		result.w = q1w * q2w - q1x * q2x + q1y * q2y + q1z * q2z

		return result
	}

	static slerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
		if (t === 0) return q1.clone()
		if (t === 1) return q2.clone()

		const x = q1.x,
			y = q1.y,
			z = q1.z,
			w = q1.w

		let result = q1.clone()

		let cosHalfTheta = w * q2.w + x * q2.x + y * q2.y + z * q2.z

		if (cosHalfTheta < 0) {
			result.w = -q2.w
			result.x = -q2.x
			result.y = -q2.y
			result.z = -q2.z

			cosHalfTheta = -cosHalfTheta
		} else {
			result = q2.clone()
		}

		if (cosHalfTheta >= 1.0) {
			result.w = w
			result.x = x
			result.y = y
			result.z = z

			return result
		}

		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta

		if (sqrSinHalfTheta <= Number.EPSILON) {
			const s = 1 - t

			result.w = s * w + t * result.w
			result.x = s * x + t * result.x
			result.y = s * y + t * result.y
			result.z = s * z + t * result.z

			return Quaternion.normalize(result)
		}

		const sinHalfTheta = Math.sqrt(sqrSinHalfTheta),
			halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta),
			ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
			ratioB = Math.sin(t * halfTheta) / sinHalfTheta

		result.w = w * ratioA + result.w * ratioB
		result.x = x * ratioA + result.x * ratioB
		result.y = y * ratioA + result.y * ratioB
		result.z = z * ratioA + result.z * ratioB

		return result
	}

	static lerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
		const t1 = 1 - t

		let q = new Quaternion()

		const dot = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w

		if (dot >= 0) {
			q.x = t1 * q1.x + t * q2.x
			q.y = t1 * q1.y + t * q2.y
			q.z = t1 * q1.z + t * q2.z
			q.w = t1 * q1.w + t * q2.w
		} else {
			q.x = t1 * q1.x - t * q2.x
			q.y = t1 * q1.y - t * q2.y
			q.z = t1 * q1.z - t * q2.z
			q.w = t1 * q1.w - t * q2.w
		}

		return Quaternion.normalize(q)
	}

	static concat(q1: Quaternion, q2: Quaternion): Quaternion {
		let result = new Quaternion()

		// Concatenate rotation is actually q2 * q1 instead of q1 * q2.
		// So that's why q2 goes q1 and q1 goes q2.
		const q1x = q2.x
		const q1y = q2.y
		const q1z = q2.z
		const q1w = q2.w

		const q2x = q1.x
		const q2y = q1.y
		const q2z = q1.z
		const q2w = q1.w

		const dot = q1x * q2x + q1y * q2y + q1z * q2z

		result.x = q1x * q2w + q2x * q1w + q1y * q2z - q1z * q2y
		result.y = q1y * q2w + q2y * q1w + q1z * q2x - q1x * q2z
		result.z = q1z * q2w + q2z * q1w + q1x * q2y - q1y * q2x
		result.w = q1w * q2w - dot

		return result
	}

	static negate(q: Quaternion): Quaternion {
		return new Quaternion(-q.x, -q.y, -q.z, -q.w)
	}

	static createFromAxisAngle(axis: Vector3, angle: number): Quaternion {
		const halfAngle = angle / 2,
			s = Math.sin(halfAngle),
			c = Math.cos(halfAngle)

		let result = new Quaternion()

		result.x = axis.x * s
		result.y = axis.y * s
		result.z = axis.z * s
		result.w = c

		return result
	}

	static createFromRotationMatrix(m: Matrix4): Quaternion {
		const result = new Quaternion()

		const trace = m.m11 + m.m22 + m.m33

		if (trace > 0) {
			let s = Math.sqrt(trace + 1)
			result.w = s * 0.5
			s = 0.5 / s

			result.x = (m.m23 - m.m32) * s
			result.y = (m.m31 - m.m13) * s
			result.z = (m.m12 - m.m21) * s
		} else {
			if (m.m11 >= m.m22 && m.m11 >= m.m33) {
				let s = Math.sqrt(1.0 + m.m11 - m.m22 - m.m33)
				let invS = 0.5 / s

				result.x = 0.5 * s
				result.y = (m.m12 + m.m21) * invS
				result.z = (m.m13 + m.m31) * invS
				result.w = (m.m23 - m.m32) * invS
			} else if (m.m22 > m.m33) {
				let s = Math.sqrt(1.0 + m.m22 - m.m11 - m.m33)
				let invS = 0.5 / s

				result.x = (m.m21 + m.m12) * invS
				result.y = 0.5 * s
				result.z = (m.m32 + m.m23) * invS
				result.w = (m.m31 - m.m13) * invS
			} else {
				let s = Math.sqrt(1.0 + m.m33 - m.m11 - m.m22)
				let invS = 0.5 / s

				result.x = (m.m31 + m.m13) * invS
				result.y = (m.m32 + m.m23) * invS
				result.z = 0.5 * s
				result.w = (m.m12 - m.m21) * invS
			}
		}

		return result
	}

	static createFromYawPitchRoll(yaw: number, pitch: number, roll: number): Quaternion {
		let sr, cr, sp, cp, sy, cy

		const halfRoll = roll * 0.5
		sr = Math.sin(halfRoll)
		cr = Math.cos(halfRoll)

		const halfPitch = pitch * 0.5
		sp = Math.sin(halfPitch)
		cp = Math.cos(halfPitch)

		const halfyaw = yaw * 0.5
		sy = Math.sin(halfyaw)
		cy = Math.cos(halfyaw)

		const result = new Quaternion()

		result.x = cy * sp * cr + sy * cp * sr
		result.y = sy * cp * cr - cy * sp * sr
		result.z = cy * cp * sr - sy * sp * cr
		result.w = cy * cp * cr + sy * sp * sr

		return result
	}
}
