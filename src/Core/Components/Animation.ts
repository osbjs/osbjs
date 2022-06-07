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

	/**
	 * Create a new Animation.
	 * A animation is a special component, therefore you can register it to storyboard directly, or add it to another components.
	 * However, you can not add another components to it.
	 * @param path Path to the image file relative to the beatmap folder.
	 * For example, specify a filename like "sliderball.png", and name your files "sliderball0.png" to "sliderball9.png" for a 10 frame animation.
	 * @param frameCount number of frames in the animation.
	 * @param frameDelay delay in milliseconds between each frame.
	 * @param layer The layer the object appears on.
	 * @param origin is where on the image should osu! consider that image's origin (coordinate) to be.
	 * This affects the (x) and (y) values, as well as several other command-specific behaviours.
	 * For example, choosing (origin) = TopLeft will let the (x),(y) values determine,
	 * where the top left corner of the image itself should be on the screen.
	 * @param initialPosition Where the sprite should be by default.
	 */
	constructor(
		path: string,
		frameCount: number,
		frameDelay: number,
		loopType: LoopType | string = LoopType.LoopForever,
		layer: Layer = Layer.Background,
		origin: Origin = Origin.Center,
		initialPosition: OsbVector2 = new OsbVector2(320, 240)
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
		let str = `Animation,${this.layer},${this.origin},"${this.path}",${this.initialPosition.x},${this.initialPosition.y},${this.frameCount},${this.frameDelay},${this.loopType}\n`
		this.commands.forEach((command) => {
			str += ` ${command.getOsbString()}\n`
		})

		return str
	}

	override registerComponents() {
		throw new Error('Cannot register any components to Animation.')
	}
}
