import { Component, Layer, Sprite } from '../Core'

export class RemoveBackground extends Component {
	name = 'RemoveBackground'
	path: string

	/**
	 * Hide beatmap background.
	 * @param path relative path to beatmap background.
	 */
	constructor(path: string) {
		super()
		this.path = path
	}

	override generate() {
		let bg = new Sprite(this.path, Layer.Background)
		bg.FadeAtTime(0, 0)
		this.registerComponents(bg)
	}
}
