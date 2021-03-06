import { rgbToHex } from '.'
import { IColor } from '../Interfaces'

export class OsbColor {
	r: number
	g: number
	b: number
	constructor(r: number, g: number, b: number) {
		if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) throw new Error('Color values can only be between 0 and 255')

		this.r = r
		this.g = g
		this.b = b
	}

	toString(): string {
		return `${this.r},${this.g},${this.b}`
	}

	toHexString(): string {
		return rgbToHex(this.r, this.g, this.b)
	}

	static fromColor(color: IColor): OsbColor {
		return new OsbColor(color.r, color.g, color.b)
	}

	static fromHexString(hex: string): OsbColor {
		const trimmed = hex.replace('#', '')
		const r = parseInt('0x' + trimmed[0] + trimmed[1]) | 0,
			g = parseInt('0x' + trimmed[2] + trimmed[3]) | 0,
			b = parseInt('0x' + trimmed[4] + trimmed[5]) | 0

		return new OsbColor(r, g, b)
	}
}
