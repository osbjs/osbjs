import { IVector2 } from '../Interfaces/IVector2'

export function randInt(low: number, high: number) {
	return low + Math.floor(Math.random() * (high - low + 1))
}

export function randFloat(low: number, high: number) {
	return low + Math.random() * (high - low)
}

export function degToRad(degrees: number) {
	return (degrees * Math.PI) / 180
}

export function radToDeg(radians: number) {
	return (radians * 180) / Math.PI
}

export function addVec2(v1: IVector2, v2: IVector2): IVector2 {
	return {
		x: v1.x + v2.x,
		y: v1.y + v2.y,
	}
}

export function subVec2(v1: IVector2, v2: IVector2): IVector2 {
	return {
		x: v1.x - v2.x,
		y: v1.y - v2.y,
	}
}

export function multiplyVec2(v1: IVector2, v2: IVector2): IVector2 {
	return {
		x: v1.x * v2.x,
		y: v1.y * v2.y,
	}
}

export function devideVec2(v1: IVector2, v2: IVector2): IVector2 {
	return {
		x: v1.x / v2.x,
		y: v1.y / v2.y,
	}
}

export function multiplyScalarVec2(v: IVector2, s: number): IVector2 {
	return {
		x: v.x * s,
		y: v.y * s,
	}
}

export function devideScalarVec2(v: IVector2, s: number): IVector2 {
	return {
		x: s == 0 ? 0 : v.x / s,
		y: s == 0 ? 0 : v.y / s,
	}
}

export function dotVec2(v1: IVector2, v2: IVector2): number {
	return v1.x * v2.x + v1.y * v2.y
}

export function crossVec2(v1: IVector2, v2: IVector2): number {
	return v1.x * v2.y - v1.y * v2.x
}

export function lengthVec2(v: IVector2): number {
	return Math.sqrt(v.x * v.x + v.y * v.y)
}

export function lengthSqVec2(v: IVector2): number {
	return v.x * v.x + v.y * v.y
}

export function normalizeVec2(v: IVector2): IVector2 {
	return devideScalarVec2(v, lengthVec2(v) || 1)
}
