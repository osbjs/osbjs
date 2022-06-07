import { Layer, Origin } from '../Enums'
import { OsbVector2 } from '../Utils'
import { Commandable } from './Commandable'

export class Sprite extends Commandable {
	name = 'Sprite'
	path: string
	layer: Layer
	origin: Origin
	initialPosition: OsbVector2

	/**
	 * Create a new sprite.
	 * A sprite is a special component, therefore you can register it to storyboard directly, or add it to another components.
	 * However, you can not add another components to it.
	 * @param path Path to the image file relative to the beatmap folder.
	 * @param layer The layer the object appears on.
	 * @param origin is where on the image should osu! consider that image's origin (coordinate) to be.
	 * This affects the (x) and (y) values, as well as several other command-specific behaviours.
	 * For example, choosing (origin) = TopLeft will let the (x),(y) values determine,
	 * where the top left corner of the image itself should be on the screen.
	 * @param initialPosition Where the sprite should be by default.
	 */
	constructor(
		path: string,
		layer: Layer = Layer.Background,
		origin: Origin = Origin.Center,
		initialPosition: OsbVector2 = new OsbVector2(320, 240)
	) {
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

	override registerComponents() {
		throw new Error('Cannot register any components to Sprite.')
	}
}
