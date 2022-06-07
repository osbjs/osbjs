import { Quaternion, Vector3 } from '.'
import { Matrix3 } from './Matrix3'

export class Matrix4 {
	m11: number
	m12: number
	m13: number
	m14: number

	m21: number
	m22: number
	m23: number
	m24: number

	m31: number
	m32: number
	m33: number
	m34: number

	m41: number
	m42: number
	m43: number
	m44: number

	isIdentity: boolean

	translation: Vector3

	static readonly Identity = new Matrix4()

	// prettier-ignore
	constructor(
		m11: number = 1, m12: number = 0, m13: number = 0, m14: number = 0,
		m21: number = 0, m22: number = 1, m23: number = 0, m24: number = 0,
		m31: number = 0, m32: number = 0, m33: number = 1, m34: number = 0,
		m41: number = 0, m42: number = 0, m43: number = 0, m44: number = 1
	) {
		this.m11 = m11
		this.m12 = m12
		this.m13 = m13
		this.m14 = m14

		this.m21 = m21
		this.m22 = m22
		this.m23 = m23
		this.m24 = m24

		this.m31 = m31
		this.m32 = m32
		this.m33 = m33
		this.m34 = m34

		this.m41 = m41
		this.m42 = m42
		this.m43 = m43
		this.m44 = m44

		this.isIdentity = (
			m11 == 1 && m22 == 1 && m33 == 1 && m44 == 1 &&
			m12 == 0 && m13 == 0 && m14 == 0 &&
			m21 == 0 && m23 == 0 && m24 == 0 &&
			m31 == 0 && m32 == 0 && m34 == 0 &&
			m41 == 0 && m42 == 0 && m43 == 0
		)

		this.translation = new Vector3(m41, m42, m43)
	}

	/**
	 * Calculates the determinant for this matrix.
	 */
	determinant(): number {
		const a = this.m11,
			b = this.m12,
			c = this.m13,
			d = this.m14
		const e = this.m21,
			f = this.m22,
			g = this.m23,
			h = this.m24
		const i = this.m31,
			j = this.m32,
			k = this.m33,
			l = this.m34
		const m = this.m41,
			n = this.m42,
			o = this.m43,
			p = this.m44

		const kp_lo = k * p - l * o
		const jp_ln = j * p - l * n
		const jo_kn = j * o - k * n
		const ip_lm = i * p - l * m
		const io_km = i * o - k * m
		const in_jm = i * n - j * m

		return (
			a * (f * kp_lo - g * jp_ln + h * jo_kn) -
			b * (e * kp_lo - g * ip_lm + h * io_km) +
			c * (e * jp_ln - f * ip_lm + h * in_jm) -
			d * (e * jo_kn - f * io_km + g * in_jm)
		)
	}

	/**
	 * Calculates the determinant for this matrix.
	 */
	det(): number {
		return this.determinant()
	}

	/**
	 * Returns a value that indicates whether this instance and another 3x3 matrix are equal.
	 */
	equals(m: Matrix4): boolean {
		return (
			this.m11 == m.m11 &&
			this.m12 == m.m12 &&
			this.m13 == m.m13 &&
			this.m14 == m.m14 &&
			this.m21 == m.m21 &&
			this.m22 == m.m22 &&
			this.m23 == m.m23 &&
			this.m24 == m.m24 &&
			this.m31 == m.m31 &&
			this.m32 == m.m32 &&
			this.m33 == m.m33 &&
			this.m34 == m.m34 &&
			this.m41 == m.m41 &&
			this.m42 == m.m42 &&
			this.m43 == m.m43 &&
			this.m44 == m.m44
		)
	}

	/**
	 * Returns a new Matrix3 and with identical elements to this one.
	 */
	clone(): Matrix4 {
		// prettier-ignore
		return new Matrix4(
			this.m11, this.m12, this.m13, this.m14,
			this.m21, this.m22, this.m23, this.m24,
			this.m31, this.m32, this.m33, this.m34,
			this.m41, this.m42, this.m43, this.m44
		)
	}

	/**
	 * Returns a new Matrix4 which its upper 3x3 elements is the values if the given Matrix3.
	 */
	static fromMat3(m: Matrix3): Matrix4 {
		const result = new Matrix4()

		result.m11 = m.m11
		result.m12 = m.m12
		result.m13 = m.m13

		result.m21 = m.m21
		result.m22 = m.m22
		result.m23 = m.m23

		result.m31 = m.m31
		result.m32 = m.m32
		result.m33 = m.m33

		return result
	}

	/**
	 * Adds each element in one matrix with its corresponding element in a second matrix.
	 */
	static add(m1: Matrix4, m2: Matrix4): Matrix4 {
		const result = new Matrix4()

		result.m11 = m1.m11 + m2.m11
		result.m12 = m1.m12 + m2.m12
		result.m13 = m1.m13 + m2.m13
		result.m14 = m1.m14 + m2.m14

		result.m21 = m1.m21 + m2.m21
		result.m22 = m1.m22 + m2.m22
		result.m23 = m1.m23 + m2.m23
		result.m24 = m1.m24 + m2.m24

		result.m31 = m1.m31 + m2.m31
		result.m32 = m1.m32 + m2.m32
		result.m33 = m1.m33 + m2.m33
		result.m34 = m1.m34 + m2.m34

		result.m41 = m1.m41 + m2.m41
		result.m42 = m1.m42 + m2.m42
		result.m43 = m1.m43 + m2.m43
		result.m44 = m1.m44 + m2.m44

		return result
	}

	/**
	 * Subtracts each element in a second matrix from its corresponding element in a first matrix.
	 */
	static sub(m1: Matrix4, m2: Matrix4): Matrix4 {
		const result = new Matrix4()

		result.m11 = m1.m11 - m2.m11
		result.m12 = m1.m12 - m2.m12
		result.m13 = m1.m13 - m2.m13
		result.m14 = m1.m14 - m2.m14

		result.m21 = m1.m21 - m2.m21
		result.m22 = m1.m22 - m2.m22
		result.m23 = m1.m23 - m2.m23
		result.m24 = m1.m24 - m2.m24

		result.m31 = m1.m31 - m2.m31
		result.m32 = m1.m32 - m2.m32
		result.m33 = m1.m33 - m2.m33
		result.m34 = m1.m34 - m2.m34

		result.m41 = m1.m41 - m2.m41
		result.m42 = m1.m42 - m2.m42
		result.m43 = m1.m43 - m2.m43
		result.m44 = m1.m44 - m2.m44

		return result
	}

	/**
	 * Returns the matrix that results from multiplying two matrices together.
	 */
	static multiply(m1: Matrix4, m2: Matrix4): Matrix4 {
		const result = new Matrix4()

		result.m11 = m1.m11 * m2.m11 + m1.m12 * m2.m21 + m1.m13 * m2.m31 + m1.m14 * m2.m41
		result.m12 = m1.m11 * m2.m12 + m1.m12 * m2.m22 + m1.m13 * m2.m32 + m1.m14 * m2.m42
		result.m13 = m1.m11 * m2.m13 + m1.m12 * m2.m23 + m1.m13 * m2.m33 + m1.m14 * m2.m43
		result.m14 = m1.m11 * m2.m14 + m1.m12 * m2.m24 + m1.m13 * m2.m34 + m1.m14 * m2.m44

		result.m21 = m1.m21 * m2.m11 + m1.m22 * m2.m21 + m1.m23 * m2.m31 + m1.m24 * m2.m41
		result.m22 = m1.m21 * m2.m12 + m1.m22 * m2.m22 + m1.m23 * m2.m32 + m1.m24 * m2.m42
		result.m23 = m1.m21 * m2.m13 + m1.m22 * m2.m23 + m1.m23 * m2.m33 + m1.m24 * m2.m43
		result.m24 = m1.m21 * m2.m14 + m1.m22 * m2.m24 + m1.m23 * m2.m34 + m1.m24 * m2.m44

		result.m31 = m1.m31 * m2.m11 + m1.m32 * m2.m21 + m1.m33 * m2.m31 + m1.m34 * m2.m41
		result.m32 = m1.m31 * m2.m12 + m1.m32 * m2.m22 + m1.m33 * m2.m32 + m1.m34 * m2.m42
		result.m33 = m1.m31 * m2.m13 + m1.m32 * m2.m23 + m1.m33 * m2.m33 + m1.m34 * m2.m43
		result.m34 = m1.m31 * m2.m14 + m1.m32 * m2.m24 + m1.m33 * m2.m34 + m1.m34 * m2.m44

		result.m41 = m1.m41 * m2.m11 + m1.m42 * m2.m21 + m1.m43 * m2.m31 + m1.m44 * m2.m41
		result.m42 = m1.m41 * m2.m12 + m1.m42 * m2.m22 + m1.m43 * m2.m32 + m1.m44 * m2.m42
		result.m43 = m1.m41 * m2.m13 + m1.m42 * m2.m23 + m1.m43 * m2.m33 + m1.m44 * m2.m43
		result.m44 = m1.m41 * m2.m14 + m1.m42 * m2.m24 + m1.m43 * m2.m34 + m1.m44 * m2.m44

		return result
	}

	/**
	 * Returns the matrix that results from scaling all the elements of a specified matrix by a scalar factor.
	 */
	static multiplyScalar(m: Matrix4, s: number): Matrix4 {
		// prettier-ignore
		return new Matrix4(
			m.m11 * s, m.m12 * s, m.m13 * s, m.m14 * s,
			m.m21 * s, m.m22 * s, m.m23 * s, m.m24 * s,
			m.m31 * s, m.m32 * s, m.m33 * s, m.m34 * s,
			m.m41 * s, m.m42 * s, m.m43 * s, m.m44 * s
		)
	}

	/**
	 * Transposes the rows and columns of a matrix.
	 */
	static transpose(m: Matrix4): Matrix4 {
		// prettier-ignore
		return new Matrix4(
			m.m11, m.m21, m.m31, m.m41,
			m.m12, m.m22, m.m32, m.m42,
			m.m13, m.m23, m.m33, m.m43,
			m.m14, m.m24, m.m34, m.m44,
		)
	}

	/**
	 * Inverts the specified matrix. The return value indicates whether the operation succeeded.
	 */
	static invert(mat: Matrix4, result: Matrix4): boolean {
		if (Math.abs(mat.det()) < Number.EPSILON) {
			result = new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
			return false
		}

		if (!(result instanceof Matrix4)) result = new Matrix4()

		const a = mat.m11,
			b = mat.m12,
			c = mat.m13,
			d = mat.m14
		const e = mat.m21,
			f = mat.m22,
			g = mat.m23,
			h = mat.m24
		const i = mat.m31,
			j = mat.m32,
			k = mat.m33,
			l = mat.m34
		const m = mat.m41,
			n = mat.m42,
			o = mat.m43,
			p = mat.m44

		const kp_lo = k * p - l * o
		const jp_ln = j * p - l * n
		const jo_kn = j * o - k * n
		const ip_lm = i * p - l * m
		const io_km = i * o - k * m
		const in_jm = i * n - j * m

		const a11 = +(f * kp_lo - g * jp_ln + h * jo_kn)
		const a12 = -(e * kp_lo - g * ip_lm + h * io_km)
		const a13 = +(e * jp_ln - f * ip_lm + h * in_jm)
		const a14 = -(e * jo_kn - f * io_km + g * in_jm)

		const invDet = 1 / mat.det()

		result.m11 = a11 * invDet
		result.m21 = a12 * invDet
		result.m31 = a13 * invDet
		result.m41 = a14 * invDet

		result.m12 = -(b * kp_lo - c * jp_ln + d * jo_kn) * invDet
		result.m22 = +(a * kp_lo - c * ip_lm + d * io_km) * invDet
		result.m32 = -(a * jp_ln - b * ip_lm + d * in_jm) * invDet
		result.m42 = +(a * jo_kn - b * io_km + c * in_jm) * invDet

		const gp_ho = g * p - h * o
		const fp_hn = f * p - h * n
		const fo_gn = f * o - g * n
		const ep_hm = e * p - h * m
		const eo_gm = e * o - g * m
		const en_fm = e * n - f * m

		result.m13 = +(b * gp_ho - c * fp_hn + d * fo_gn) * invDet
		result.m23 = -(a * gp_ho - c * ep_hm + d * eo_gm) * invDet
		result.m33 = +(a * fp_hn - b * ep_hm + d * en_fm) * invDet
		result.m43 = -(a * fo_gn - b * eo_gm + c * en_fm) * invDet

		const gl_hk = g * l - h * k
		const fl_hj = f * l - h * j
		const fk_gj = f * k - g * j
		const el_hi = e * l - h * i
		const ek_gi = e * k - g * i
		const ej_fi = e * j - f * i

		result.m14 = -(b * gl_hk - c * fl_hj + d * fk_gj) * invDet
		result.m24 = +(a * gl_hk - c * el_hi + d * ek_gi) * invDet
		result.m34 = -(a * fl_hj - b * el_hi + d * ej_fi) * invDet
		result.m44 = +(a * fk_gj - b * ek_gi + c * ej_fi) * invDet

		return true
	}

	/**
	 * Negates the specified matrix by multiplying all its values by -1.
	 */
	static negate(m: Matrix4): Matrix4 {
		// prettier-ignore
		return new Matrix4(
			-m.m11, -m.m12, -m.m13, -m.m14,
			-m.m21, -m.m22, -m.m23, -m.m24,
			-m.m31, -m.m32, -m.m33, -m.m34,
			-m.m41, -m.m42, -m.m43, -m.m44
		)
	}

	/**
	 * Decomposes this matrix into its position, quaternion and scale components.
	 */
	static decompose(m: Matrix4): {
		scale: Vector3
		rotation: Quaternion
		translation: Vector3
	} {
		// extract scale
		const scale = new Vector3()

		const xAxis = new Vector3(m.m11, m.m12, m.m13),
			yAxis = new Vector3(m.m21, m.m22, m.m23),
			zAxis = new Vector3(m.m31, m.m31, m.m33)

		scale.x = xAxis.length()
		scale.y = yAxis.length()
		scale.z = zAxis.length()

		// extract translation
		const translation = new Vector3()

		translation.x = m.m41
		translation.y = m.m42
		translation.z = m.m43

		// extract rotation
		const mTemp = m.clone()

		mTemp.m11 /= scale.x
		mTemp.m12 /= scale.x
		mTemp.m13 /= scale.x

		mTemp.m21 /= scale.y
		mTemp.m22 /= scale.y
		mTemp.m23 /= scale.y

		mTemp.m31 /= scale.z
		mTemp.m32 /= scale.z
		mTemp.m33 /= scale.z

		const rotation = Quaternion.createFromRotationMatrix(mTemp)

		return { scale, translation, rotation }
	}

	/**
	 * Performs a linear interpolation from one matrix to a second matrix based on a value that specifies the weighting of the second matrix.
	 */
	static lerp(m1: Matrix4, m2: Matrix4, alpha: number): Matrix4 {
		const result = new Matrix4()

		result.m11 = m1.m11 + (m2.m11 - m1.m11) * alpha
		result.m12 = m1.m12 + (m2.m12 - m1.m12) * alpha
		result.m13 = m1.m13 + (m2.m13 - m1.m13) * alpha
		result.m14 = m1.m14 + (m2.m14 - m1.m14) * alpha

		result.m21 = m1.m21 + (m2.m21 - m1.m21) * alpha
		result.m22 = m1.m22 + (m2.m22 - m1.m22) * alpha
		result.m23 = m1.m23 + (m2.m23 - m1.m23) * alpha
		result.m24 = m1.m24 + (m2.m24 - m1.m24) * alpha

		result.m31 = m1.m31 + (m2.m31 - m1.m31) * alpha
		result.m32 = m1.m32 + (m2.m32 - m1.m32) * alpha
		result.m33 = m1.m33 + (m2.m33 - m1.m33) * alpha
		result.m34 = m1.m34 + (m2.m34 - m1.m34) * alpha

		result.m41 = m1.m41 + (m2.m41 - m1.m41) * alpha
		result.m42 = m1.m42 + (m2.m42 - m1.m42) * alpha
		result.m43 = m1.m43 + (m2.m43 - m1.m43) * alpha
		result.m44 = m1.m44 + (m2.m44 - m1.m44) * alpha

		return result
	}

	/**
	 * Creates a matrix that rotates around an arbitrary vector.
	 */
	static createFromAxisAngle(axis: Vector3, angle: number): Matrix4 {
		const x = axis.x,
			y = axis.y,
			z = axis.z
		const sa = Math.sin(angle),
			ca = Math.cos(angle)
		const xx = x * x,
			yy = y * y,
			zz = z * z
		const xy = x * y,
			xz = x * z,
			yz = y * z

		const result = new Matrix4()

		result.m11 = xx + ca * (1 - xx)
		result.m12 = xy - ca * xy + sa * z
		result.m13 = xz - ca * xz - sa * y

		result.m21 = xy - ca * xy - sa * z
		result.m22 = yy + ca * (1 - yy)
		result.m23 = yz - ca * yz + sa * x

		result.m31 = xz - ca * xz + sa * y
		result.m32 = yz - ca * yz - sa * x
		result.m33 = zz + ca * (1 - zz)

		return result
	}

	/**
	 * Creates a rotation matrix from the given Quaternion rotation value.
	 */
	static createFromQuaternion(q: Quaternion): Matrix4 {
		const result = new Matrix4()

		const xx = q.x * q.x
		const yy = q.y * q.y
		const zz = q.z * q.z

		const xy = q.x * q.y
		const wz = q.z * q.w
		const xz = q.z * q.x
		const wy = q.y * q.w
		const yz = q.y * q.z
		const wx = q.x * q.w

		result.m11 = 1 - 2 * (yy + zz)
		result.m12 = 2 * (xy + wz)
		result.m13 = 2 * (xz - wy)

		result.m21 = 2 * (xy - wz)
		result.m22 = 1 - 2 * (zz + xx)
		result.m23 = 2 * (yz + wx)

		result.m31 = 2 * (xz + wy)
		result.m32 = 2 * (yz - wx)
		result.m33 = 1 - 2 * (yy + xx)

		return result
	}

	/**
	 * Creates a rotation matrix from the specified yaw, pitch, and roll.
	 * @param yaw Angle of rotation, in radians, around the Y-axis.
	 * @param pitch Angle of rotation, in radians, around the X-axis.
	 * @param roll Angle of rotation, in radians, around the Z-axis.
	 */
	static createFromYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix4 {
		const q = Quaternion.createFromYawPitchRoll(yaw, pitch, roll)
		return Matrix4.createFromQuaternion(q)
	}

	/**
	 * Creates a view matrix.
	 * @param cameraPosition The position of the camera.
	 * @param cameraTarget The target towards which the camera is pointing.
	 * @param cameraUpVector The direction that is "up" from the camera's point of view.
	 */
	static createLookAt(cameraPosition: Vector3, cameraTarget: Vector3, cameraUpVector: Vector3): Matrix4 {
		const zaxis = Vector3.normalize(Vector3.sub(cameraPosition, cameraTarget))
		const xaxis = Vector3.normalize(Vector3.cross(cameraUpVector, zaxis))
		const yaxis = Vector3.cross(zaxis, xaxis)

		const result = new Matrix4()

		result.m11 = xaxis.x
		result.m12 = yaxis.x
		result.m13 = zaxis.x

		result.m21 = xaxis.y
		result.m22 = yaxis.y
		result.m23 = zaxis.y

		result.m31 = xaxis.z
		result.m32 = yaxis.z
		result.m33 = zaxis.z

		result.m41 = -Vector3.dot(xaxis, cameraPosition)
		result.m42 = -Vector3.dot(yaxis, cameraPosition)
		result.m43 = -Vector3.dot(zaxis, cameraPosition)

		return result
	}

	/**
	 * Creates an orthographic perspective matrix from the given view volume dimensions.
	 * @param width Width of the view volume at the near view plane.
	 * @param height Height of the view volume at the near view plane.
	 * @param zNearPlane Minimum Z-value of the view volume.
	 * @param zFarPlane Maximum Z-value of the view volume.
	 * @returns
	 */
	static createOrthographic(width: number, height: number, zNearPlane: number, zFarPlane: number): Matrix4 {
		const result = new Matrix4()

		result.m11 = 2 / width

		result.m22 = 2 / height

		result.m33 = 1 / (zNearPlane - zFarPlane)

		result.m43 = zNearPlane / (zNearPlane - zFarPlane)

		return result
	}

	/**
	 * Builds a customized, orthographic projection matrix.
	 * @param left Minimum X-value of the view volume.
	 * @param right Maximum X-value of the view volume.
	 * @param bottom Minimum Y-value of the view volume.
	 * @param top Maximum Y-value of the view volume.
	 * @param zNearPlane Minimum Z-value of the view volume.
	 * @param zFarPlane Maximum Z-value of the view volume.
	 */
	static createOrthographicOffCenter(left: number, right: number, bottom: number, top: number, zNearPlane: number, zFarPlane: number): Matrix4 {
		const result = new Matrix4()

		result.m11 = 2 / (right - left)

		result.m22 = 2 / (top - bottom)

		result.m33 = 1 / (zNearPlane - zFarPlane)

		result.m41 = (left + right) / (left - right)
		result.m42 = (top + bottom) / (bottom - top)
		result.m43 = zNearPlane / (zNearPlane - zFarPlane)

		return result
	}

	/**
	 * Creates a perspective projection matrix from the given view volume dimensions.
	 * @param width Width of the view volume at the near view plane.
	 * @param height Height of the view volume at the near view plane.
	 * @param nearPlaneDistance Distance to the near view plane.
	 * @param farPlaneDistance Distance to of the far view plane.
	 */
	static createPerspective(width: number, height: number, nearPlaneDistance: number, farPlaneDistance: number): Matrix4 {
		if (nearPlaneDistance <= 0) throw new Error('`nearPlaneDistance` must be greater than 0')
		if (farPlaneDistance <= 0) throw new Error('`farPlaneDistance` must be greater than 0')
		if (nearPlaneDistance >= farPlaneDistance) throw new Error('`farPlaneDistance` must be greater than `nearPlaneDistance`')

		const result = new Matrix4()

		result.m11 = (2 * nearPlaneDistance) / width

		result.m22 = (2 * nearPlaneDistance) / height

		result.m33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance)
		result.m34 = -1

		result.m43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance)
		result.m44 = 0

		return result
	}

	/**
	 * Creates a perspective projection matrix based on a field of view, aspect ratio, and near and far view plane distances.
	 * @param fieldOfView Field of view in the y direction, in radians.
	 * @param aspectRatio Aspect ratio, defined as view space width divided by height.
	 * @param nearPlaneDistance Distance to the near view plane.
	 * @param farPlaneDistance Distance to of the far view plane.
	 */
	static createPerspectiveFieldOfView(fieldOfView: number, aspectRatio: number, nearPlaneDistance: number, farPlaneDistance: number): Matrix4 {
		if (fieldOfView <= 0 || fieldOfView >= Math.PI) throw new Error('`fieldOfView` can only go from 0 to pi')
		if (nearPlaneDistance <= 0) throw new Error('`nearPlaneDistance` must be greater than 0')
		if (farPlaneDistance <= 0) throw new Error('`farPlaneDistance` must be greater than 0')
		if (nearPlaneDistance >= farPlaneDistance) throw new Error('`farPlaneDistance` must be greater than `nearPlaneDistance`')

		const yScale = 1 / Math.tan(fieldOfView * 0.5)
		const xScale = yScale / aspectRatio

		const result = new Matrix4()

		result.m11 = xScale

		result.m22 = yScale

		result.m33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance)
		result.m34 = -1

		result.m43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance)
		result.m44 = 0

		return result
	}

	/**
	 * Creates a customized perspective projection matrix.
	 * @param left Minimum X-value of the view volume.
	 * @param right Maximum X-value of the view volume.
	 * @param bottom Minimum Y-value of the view volume.
	 * @param top Maximum Y-value of the view volume.
	 * @param nearPlaneDistance Distance to the near view plane.
	 * @param farPlaneDistance Distance to of the far view plane.
	 */
	static createPerspectiveOffCenter(
		left: number,
		right: number,
		bottom: number,
		top: number,
		nearPlaneDistance: number,
		farPlaneDistance: number
	): Matrix4 {
		if (nearPlaneDistance <= 0) throw new Error('`nearPlaneDistance` must be greater than 0')
		if (farPlaneDistance <= 0) throw new Error('`farPlaneDistance` must be greater than 0')
		if (nearPlaneDistance >= farPlaneDistance) throw new Error('`farPlaneDistance` must be greater than `nearPlaneDistance`')

		const result = new Matrix4()

		result.m11 = (2 * nearPlaneDistance) / (right - left)

		result.m22 = (2 * nearPlaneDistance) / (top - bottom)

		result.m31 = (left + right) / (right - left)
		result.m32 = (top + bottom) / (top - bottom)
		result.m33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance)
		result.m34 = -1

		result.m43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance)
		result.m44 = 0

		return result
	}

	/**
	 * Creates a world matrix with the specified parameters
	 * @param position The position of the object; used in translation operations.
	 * @param forward Forward direction of the object.
	 * @param up Upward direction of the object; usually [0, 1, 0].
	 */
	static createWorld(position: Vector3, forward: Vector3, up: Vector3): Matrix4 {
		const zAxis = Vector3.normalize(Vector3.negate(forward))
		const xAxis = Vector3.normalize(Vector3.cross(up, zAxis))
		const yAxis = Vector3.cross(zAxis, xAxis)

		const result = new Matrix4()

		result.m11 = xAxis.x
		result.m12 = xAxis.y
		result.m13 = xAxis.z

		result.m21 = yAxis.x
		result.m22 = yAxis.y
		result.m23 = yAxis.z

		result.m31 = zAxis.x
		result.m32 = zAxis.y
		result.m33 = zAxis.z

		result.m41 = position.x
		result.m42 = position.y
		result.m43 = position.z

		return result
	}

	/**
	 * Creates a rotation matrix around the X axis using the given rotation in radians and a center point (if specified).
	 */
	static createRotationX(angle: number, center?: Vector3): Matrix4 {
		const c = Math.cos(angle),
			s = Math.sin(angle)

		const result = new Matrix4()

		result.m22 = c
		result.m23 = s

		result.m32 = -s
		result.m33 = c

		if (center) {
			result.m42 = center.y * (1 - c) + center.z * s
			result.m43 = center.z * (1 - c) + center.y * s
		}

		return result
	}

	/**
	 * Creates a rotation matrix around the Y axis using the given rotation in radians and a center point (if specified).
	 */
	static createRotationY(angle: number, center?: Vector3): Matrix4 {
		const c = Math.cos(angle),
			s = Math.sin(angle)

		const result = new Matrix4()

		result.m11 = c
		result.m13 = -s

		result.m31 = s
		result.m33 = c

		if (center) {
			result.m41 = center.x * (1 - c) + center.z * s
			result.m43 = center.z * (1 - c) + center.x * s
		}

		return result
	}

	/**
	 * Creates a rotation matrix around the Z axis using the given rotation in radians and a center point (if specified).
	 */
	static createRotationZ(angle: number, center?: Vector3): Matrix4 {
		const c = Math.cos(angle),
			s = Math.sin(angle)

		const result = new Matrix4()

		result.m11 = c
		result.m12 = s

		result.m21 = -s
		result.m22 = c

		if (center) {
			result.m41 = center.x * (1 - c) + center.y * s
			result.m42 = center.y * (1 - c) + center.x * s
		}

		return result
	}

	/**
	 * Creates a scaling matrix from the specified vector scale and a center point (if specified).
	 */
	static createScaleVec(v: Vector3, center?: Vector3): Matrix4 {
		const result = new Matrix4()

		result.m11 = v.x
		result.m22 = v.y
		result.m33 = v.z

		if (center) {
			result.m41 = center.x * (1 - v.x)
			result.m42 = center.y * (1 - v.y)
			result.m43 = center.z * (1 - v.z)
		}

		return result
	}

	/**
	 * Creates a scaling matrix that scales uniformly with the given scale and a center point (if specified).
	 */
	static createScaleScalar(s: number, center?: Vector3): Matrix4 {
		const result = new Matrix4()

		result.m11 = s
		result.m22 = s
		result.m33 = s

		if (center) {
			result.m41 = center.x * (1 - s)
			result.m42 = center.y * (1 - s)
			result.m43 = center.z * (1 - s)
		}

		return result
	}

	/**
	 * Creates a translation matrix from the specified 2-dimensional vector.
	 */
	static createTranslation(v: Vector3): Matrix4 {
		const result = new Matrix4()

		result.m41 = v.x
		result.m42 = v.y
		result.m43 = v.z

		return result
	}
}
