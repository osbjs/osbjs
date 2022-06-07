import { imageSize } from 'image-size'
import { Layer, Origin, OsbVector2, Sprite } from '../Core'

export class Texture {
	text: string
	path: string
	osbPath: string
	width: number
	height: number
	color: { r: number; g: number; b: number }
	offset: {
		left: number
		right: number
		top: number
		bottom: number
	}

	constructor(
		text: string,
		path: string,
		osbPath: string,
		color: { r: number; g: number; b: number },
		offset: {
			left: number
			right: number
			top: number
			bottom: number
		}
	) {
		this.text = text
		this.path = path
		this.osbPath = osbPath
		this.width = this._getWidth()
		this.height = this._getHeight()
		this.offset = offset
		this.color = color
	}

	private _getWidth(): number {
		return imageSize(this.path).width ?? 0
	}

	private _getHeight(): number {
		return imageSize(this.path).height ?? 0
	}

	/**
	 * Returns a `Sprite` instance of this texture.
	 * @param layer Layer to place the sprite on.
	 * @param origin Origin of the sprite.
	 * @param initialPosition Initial position of the sprite.
	 */
	toSprite(layer: Layer = Layer.Background, origin: Origin = Origin.Center, initialPosition: OsbVector2 = new OsbVector2(320, 240)): Sprite {
		return new Sprite(this.osbPath, layer, origin, initialPosition)
	}
}
