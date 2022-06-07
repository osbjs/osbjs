import { Vector2 } from '../Math'
import { Component, Easing, Layer, Sprite, OsbVector2, parseOsuTimestamp } from '../Core'
import { Beatmap, Circle, Slider, PlayfieldToStoryboardOffset } from '../Beatmap'
import { IHitObjectHighlightOptions } from './Interfaces'

export class HitObjectHighlight extends Component {
	name = 'HitObjectHighlight'
	osbPath: string
	startTime: number
	endTime: number
	beatmap: Beatmap
	circles: Circle[]
	sliders: Slider[]
	beat: number
	options = {
		startScale: 1,
		endScale: 1.2,
		fadeDuration: 200,
		beatDivisor: 8,
		followSliderPath: true,
	}

	/**
	 * Highlight every objects inbetween start and end time.
	 * @param osbPath relative path to image file.
	 * For example, if you have a folder named `sb` inside your beatmap folder and your `hl.png` is in it, then it should be `sb/hl.png`
	 * @param startTime times in milliseconds/timestamp indicate the start time of the section you want to highlight.
	 * @param endTime times in milliseconds/timestamp indicate the end time of the section you want to highlight.
	 * @param beatmap `Beatmap` instance of difficulty you want to use
	 * @param options Additional options.
	 */
	constructor(osbPath: string, startTime: number | string, endTime: number | string, beatmap: Beatmap, options?: IHitObjectHighlightOptions) {
		super()
		this.osbPath = osbPath
		this.beatmap = beatmap
		this.startTime = typeof startTime == 'string' ? parseOsuTimestamp(startTime) : Math.round(startTime)
		this.endTime = typeof endTime == 'string' ? parseOsuTimestamp(endTime) : Math.round(endTime)
		let firstUninherited = this.beatmap.timingPoints
			.filter((tPoint) => tPoint.uninherited && tPoint.time <= this.startTime)
			.sort((t1, t2) => t2.time - t1.time)[0]
		this.startTime = Math.max(firstUninherited.time, this.startTime)
		this.options = { ...this.options, ...options }
		this.circles = this.beatmap.hitObjects.circles.filter((c) => c.startTime >= this.startTime && c.startTime <= this.endTime)
		this.sliders = this.beatmap.hitObjects.sliders.filter((s) => s.startTime >= this.startTime && s.startTime <= this.endTime)
		this.beat = this.beatmap.timingPoints
			.filter((tPoint) => tPoint.time <= this.startTime && tPoint.uninherited)
			.sort((t1, t2) => t2.time - t1.time)[0].beatLength
	}

	override generate() {
		this.circles.forEach((circle) => {
			let sprite = new Sprite(this.osbPath, Layer.Background)

			sprite.MoveAtTime(circle.startTime, OsbVector2.fromVector2(Vector2.add(circle.position, PlayfieldToStoryboardOffset)))
			sprite.Scale(circle.startTime, circle.startTime + this.options.fadeDuration, this.options.startScale, this.options.endScale, Easing.In)
			sprite.Fade(circle.startTime, circle.startTime + Math.round(this.beat / 2), 1, 0)

			this.registerComponents(sprite)
		})

		let timestep = Math.round(this.beat / this.options.beatDivisor)

		this.sliders.forEach((slider) => {
			let sprite = new Sprite(this.osbPath, Layer.Background)

			sprite.Scale(slider.startTime, slider.endTime + this.options.fadeDuration, this.options.startScale, this.options.endScale, Easing.In)
			sprite.Fade(slider.startTime, Math.round(slider.endTime + this.options.fadeDuration), 1, 0)

			if (this.options.followSliderPath) {
				let startTime = slider.startTime
				let totalStep = Math.round((slider.endTime - slider.startTime) / timestep)

				for (let i = 0; i < totalStep; i++) {
					let prevEndTime = startTime + timestep * i
					let endTime = startTime + timestep * (i + 1)
					let startPosition = slider.getPositionAtTime(prevEndTime)
					let endPosition = slider.getPositionAtTime(endTime)
					sprite.Move(
						prevEndTime,
						endTime,
						OsbVector2.fromVector2(Vector2.add(startPosition, PlayfieldToStoryboardOffset)),
						OsbVector2.fromVector2(Vector2.add(endPosition, PlayfieldToStoryboardOffset))
					)
				}
			}

			this.registerComponents(sprite)
		})
	}
}
