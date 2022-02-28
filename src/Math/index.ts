export * from './Vector2'
export * from './Vector3'
export * from './Vector4'
export * from './Quaternion'
export * from './Matrix3'
export * from './Matrix4'
export * from './Easing'
export * from './RandomNumbers'

export function degToRad(degrees: number): number {
	return (degrees * Math.PI) / 180
}

export function radToDeg(radians: number): number {
	return (radians * 180) / Math.PI
}

export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value))
}

export function lerp(x: number, xMin: number, xMax: number, yMin: number, yMax: number): number {
	return yMin + (x - xMin) * ((yMax - yMin) / (xMax - xMin))
}
