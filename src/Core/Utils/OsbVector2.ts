import { Vector2 } from '../../Math'

export class OsbVector2 {
	x: number
	y: number
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	static fromVector2(v: Vector2) {
		return new OsbVector2(v.x, v.y)
	}

	toString(): string {
		return `${this.x},${this.y}`
	}
}
