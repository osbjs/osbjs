import { Component, Layer, parseOsuTimestamp, Sprite, IBackgroundOptions } from '@osbjs/osbjs'
import { imageSize } from 'image-size'
import { join } from 'path'

export class MyBackground extends Component {
	name = 'MyBackground'
	startTime: number
	endTime: number
	osbPath: string
	folderPath: string
	options = {
		opacity: 0.8,
		fadeDuration: 500,
	}

	constructor(
		osbPath: string,
		folderPath: string,
		startTime: number | string,
		endTime: number | string,
		options?: IBackgroundOptions
	) {
		super()
		this.osbPath = osbPath
		this.folderPath = folderPath
		this.startTime = typeof startTime == 'string' ? parseOsuTimestamp(startTime) : Math.round(startTime)
		this.endTime = typeof endTime == 'string' ? parseOsuTimestamp(endTime) : Math.round(endTime)
		this.options = { ...this.options, ...options }
	}

	override generate() {
		const { height } = imageSize(join(this.folderPath, this.osbPath))
		if (height) {
			let bg = new Sprite(this.osbPath, Layer.Background)
			bg.ScaleAtTime(this.startTime, 480 / height)
			bg.Fade(this.startTime - this.options.fadeDuration, this.startTime, 0, this.options.opacity)
			bg.Fade(this.endTime, this.endTime + this.options.fadeDuration, 0, this.options.opacity)
			this.registerComponents(bg)
		}
	}
}
