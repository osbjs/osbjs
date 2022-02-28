import { Component, Layer, parseOsuTimestamp, Sprite } from '@osbjs/osbjs'
import { imageSize } from 'image-size'
import { join } from 'path'

export class MyBackground extends Component {
	name = 'MyBackground'
	constructor(osbPath, folderPath, startTime, endTime, opacity = 0.8, fadeDuration = 500) {
		super()
		this.osbPath = osbPath
		this.folderPath = folderPath
		this.startTime = typeof startTime == 'string' ? parseOsuTimestamp(startTime) : Math.round(startTime)
		this.endTime = typeof endTime == 'string' ? parseOsuTimestamp(endTime) : Math.round(endTime)
		this.opacity = opacity
		this.fadeDuration = fadeDuration
	}

	generate() {
		const { height } = imageSize(join(this.folderPath + this.osbPath))
		if (height) {
			let bg = new Sprite(this.osbPath, Layer.Background)
			bg.ScaleAtTime(this.startTime, 480 / height)
			bg.Fade(this.startTime - this.fadeDuration, this.startTime, 0, this.opacity)
			bg.Fade(this.endTime, this.endTime + this.fadeDuration, 0, this.opacity)
			this.registerComponents(bg)
		}
	}
}
