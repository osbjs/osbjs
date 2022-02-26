import { Layer, Origin } from '../Enums'
import { OsbVector2 } from '../Utils'
import { Commandable } from './Commandable'

export class Sprite extends Commandable {
	path: string
	layer: Layer
	origin: Origin
	initialPosition: OsbVector2
	name = 'Sprite'

	constructor(path: string, layer: Layer, origin: Origin = Origin.Center, initialPosition: OsbVector2 = new OsbVector2(320, 240)) {
		super()
		this.path = path
		this.layer = layer
		this.origin = origin
		this.initialPosition = initialPosition
	}

	getOsbString(): string {
		let str = `Sprite,${this.layer},${this.origin},"${this.path}",${this.initialPosition.x},${this.initialPosition.y}\n`
		this.commands.forEach((command) => {
			str += ` ${command.getOsbString()}\n`
		})

		return str
	}
}
