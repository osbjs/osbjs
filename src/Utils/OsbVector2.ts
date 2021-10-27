import { IVector2 } from '..'

export class OsbVector2 implements IVector2 {
	x: number
	y: number
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	toString(): string {
		return `${this.x},${this.y}`
	}
}
