import { Component, Layer, parseOsuTimestamp, Sprite } from '../Core'
import { imageSize } from 'image-size'
import { join } from 'path'

export class Background extends Component {
	name = 'Background'
	startTime: number
	endTime: number
	opacity: number
	osbPath: string
	fadeDuration: number
	folderPath: string
	constructor(
		osbPath: string,
		folderPath: string,
		startTime: number | string,
		endTime: number | string,
		opacity: number = 0.8,
		fadeDuration: number = 500
	) {
		super()
		this.osbPath = osbPath
		this.folderPath = folderPath
		this.startTime = typeof startTime == 'string' ? parseOsuTimestamp(startTime) : Math.round(startTime)
		this.endTime = typeof endTime == 'string' ? parseOsuTimestamp(endTime) : Math.round(endTime)
		this.opacity = opacity
		this.fadeDuration = fadeDuration
	}

	override generate() {
		const { height } = imageSize(join(this.folderPath, this.osbPath))
		if (height) {
			let bg = new Sprite(this.osbPath, Layer.Background)
			bg.ScaleAtTime(this.startTime, 480 / height)
			bg.Fade(this.startTime - this.fadeDuration, this.startTime, 0, this.opacity)
			bg.Fade(this.endTime, this.endTime + this.fadeDuration, 0, this.opacity)
			this.registerComponents(bg)
		}
	}
}
