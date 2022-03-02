import { OsbVector2 } from '../Utils'
import { LoopType, Layer, Origin } from '../Enums'
import { Commandable } from './Commandable'

export class Animation extends Commandable {
	name = 'Animation'
	path: string
	layer: Layer
	origin: Origin
	initialPosition: OsbVector2
	frameCount: number
	frameDelay: number
	loopType: LoopType | string

	constructor(
		path: string,
		frameCount: number,
		frameDelay: number,
		layer: Layer = Layer.Background,
		origin: Origin = Origin.Center,
		initialPosition: OsbVector2 = new OsbVector2(320, 240),
		loopType: LoopType | string = LoopType.LoopForever
	) {
		super()
		this.path = path
		this.layer = layer
		this.origin = origin
		this.initialPosition = initialPosition
		this.loopType = loopType
		this.frameCount = frameCount
		this.frameDelay = frameDelay
	}

	getOsbString(): string {
		let str = `Animation,${this.layer},${this.origin},"${this.path}",${this.initialPosition.x},${this.initialPosition.y}\n`
		this.commands.forEach((command) => {
			str += ` ${command.getOsbString()}\n`
		})

		return str
	}
}
