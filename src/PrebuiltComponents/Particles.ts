import { Component, Easing, Origin, OsbColor, OsbVector2, Parameter, Sprite, Layer } from '../Core'
import { randFloat, randInt, degToRad } from '../Math'

export interface ParticlesOptions {
	duration?: number
	amount?: number
	startPosition?: OsbVector2
	endPosition?: OsbVector2
	axis: 'x' | 'y'
	easing?: Easing
	randomEasing?: boolean
	fadeInDuration?: number
	fadeOutDuration?: number
	color?: OsbColor
	startScale?: number
	endScale?: number
	randomScale?: boolean
	startRotation?: number
	endRotation?: number
	randomRotation?: boolean
	origin?: Origin
	additive?: boolean
	opacity?: number
}

export class Particles extends Component {
	path: string
	startTime: number
	endTime: number
	options = {
		duration: 2000,
		amount: 16,
		startPosition: new OsbVector2(-107, 0),
		endPosition: new OsbVector2(747, 480),
		axis: 'x',
		easing: Easing.In,
		randomEasing: false,
		fadeInDuration: 200,
		fadeOutDuration: 200,
		color: new OsbColor(1, 1, 1),
		startScale: 0.1,
		endScale: 1,
		randomScale: false,
		startRotation: 0,
		endRotation: 0,
		randomRotation: false,
		origin: Origin.Center,
		additive: true,
		opacity: 1,
	}
	constructor(path: string, startTime: number, endTime: number, options?: ParticlesOptions) {
		super()

		this.path = path
		this.startTime = startTime
		this.endTime = endTime
		this.options = { ...this.options, ...options }
	}

	generate() {
		//#region extract options
		const {
			randomScale,
			opacity,
			duration,
			amount,
			startPosition,
			endPosition,
			axis,
			easing,
			randomEasing,
			fadeInDuration,
			fadeOutDuration,
			color,
			startScale,
			endScale,
			startRotation,
			endRotation,
			randomRotation,
			origin,
			additive,
		} = this.options
		//#endregion

		const timestep = duration / amount
		let counter = 0
		for (let startTime = this.startTime; startTime <= this.endTime - duration; Math.round((startTime += timestep))) {
			let endTime = startTime + duration

			const spr = new Sprite(this.path, Layer.Background, origin)

			if (color.r < 1 || color.b < 1 || color.g < 1) spr.ColorAtTime(startTime, color)
			if (startScale == endScale && startScale != 1) spr.ScaleAtTime(startTime, startScale)
			if (startRotation == endRotation && startRotation != 0) spr.RotateAtTime(startTime, degToRad(startRotation))
			if (additive) spr.ParameterAtTime(startTime, Parameter.AdditiveBlending)

			const eas = randomEasing ? Easing[Easing[randInt(0, 34)] as keyof typeof Easing] : easing
			const startX = axis == 'x' ? randInt(startPosition.x, endPosition.x) : startPosition.x
			const startY = axis == 'y' ? randInt(startPosition.y, endPosition.y) : startPosition.y
			const endX = axis == 'x' ? startX : endPosition.x
			const endY = axis == 'y' ? startY : endPosition.y
			spr.Move(startTime, endTime, new OsbVector2(startX, startY), new OsbVector2(endX, endY), eas)

			if (fadeInDuration > 0 || fadeOutDuration > 0) {
				let fadeInTime = startTime + fadeInDuration
				let fadeOutTime = endTime - fadeOutDuration
				if (fadeOutTime < fadeInTime) fadeInTime = fadeOutTime = (fadeInTime + fadeOutTime) / 2

				spr.Fade(startTime, Math.max(startTime, fadeInTime), 0, opacity, eas)
				spr.Fade(Math.min(fadeOutTime, endTime), endTime, opacity, 0, eas)
			} else {
				spr.FadeAtTime(startTime, opacity)
			}

			if (startScale != endScale) {
				if (randomScale) spr.Scale(startTime, endTime, randFloat(startScale, endScale), randFloat(startScale, endScale), eas)
				else spr.Scale(startTime, endTime, startScale, endScale, eas)
			}

			if (startRotation != endRotation)
				if (randomRotation)
					spr.Rotate(
						startTime,
						endTime,
						degToRad(randFloat(startRotation, endRotation)),
						degToRad(randFloat(startRotation, endRotation)),
						eas
					)
				else spr.Rotate(startTime, endTime, degToRad(startRotation), degToRad(endRotation), eas)

			this.registerComponents(spr)
			counter++
		}
		console.log(counter)
	}
}
