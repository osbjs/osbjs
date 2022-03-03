import { Commandable } from '../Components'
import { OsbColor, OsbVector2 } from '.'
import { Vector2, noise2D, lerp } from '../../Math'

export function wiggleXY(
	commandable: Commandable,
	frequency: number,
	amplitude: number,
	startTime: number,
	endTime: number,
	origin: OsbVector2 | Vector2 = new OsbVector2(320, 240)
) {
	let { x, y } = origin
	let t = startTime
	const timestep = 1000 / frequency

	do {
		const newX = amplitude * noise2D(origin.x, t) + origin.x - amplitude,
			newY = amplitude * noise2D(origin.y, t) + origin.y - amplitude

		commandable.Move(t, t + timestep, new OsbVector2(x, y), new OsbVector2(newX, newY))

		x = newX
		y = newY
		t += timestep
	} while (t <= endTime)
}

export function wiggleX(commandable: Commandable, frequency: number, amplitude: number, startTime: number, endTime: number, originX: number = 320) {
	let x = originX
	let t = startTime
	const timestep = 1000 / frequency

	do {
		const newX = amplitude * noise2D(originX, t) + originX - amplitude

		commandable.MoveX(t, t + timestep, x, newX)

		x = newX
		t += timestep
	} while (t <= endTime)
}

export function wiggleY(commandable: Commandable, frequency: number, amplitude: number, startTime: number, endTime: number, originY: number = 240) {
	let y = originY
	let t = startTime
	const timestep = 1000 / frequency

	do {
		const newY = amplitude * noise2D(originY, t) + originY - amplitude

		commandable.MoveY(t, t + timestep, y, newY)

		y = newY
		t += timestep
	} while (t <= endTime)
}

export function wiggleRotation(
	commandable: Commandable,
	frequency: number,
	amplitude: number,
	startTime: number,
	endTime: number,
	originAngle: number = 0
) {
	let angle = originAngle
	let t = startTime
	const timestep = 1000 / frequency

	do {
		const newAngle = amplitude * noise2D(originAngle, t) + originAngle - amplitude

		commandable.Rotate(t, t + timestep, angle, newAngle)

		angle = newAngle
		t += timestep
	} while (t <= endTime)
}

export function wiggleColor(
	commandable: Commandable,
	frequency: number,
	amplitude: number,
	startTime: number,
	endTime: number,
	minGradient: OsbColor,
	maxGradient: OsbColor
) {
	const originR = Math.round((minGradient.r + maxGradient.r) / 2),
		originG = Math.round((minGradient.g + maxGradient.g) / 2),
		originB = Math.round((minGradient.b + maxGradient.b) / 2)

	const ampR = Math.min(Math.round(amplitude), originR),
		ampG = Math.min(Math.round(amplitude), originR),
		ampB = Math.min(Math.round(amplitude), originR)

	let r = originR,
		g = originG,
		b = originB

	let t = startTime
	const timestep = 1000 / frequency

	do {
		const noiseR = noise2D(originR, t),
			noiseG = noise2D(originG, t),
			noiseB = noise2D(originB, t)

		const newR = lerp(noiseR, -1, 1, originR - ampR, originR + ampR),
			newG = lerp(noiseG, -1, 1, originG - ampG, originG + ampG),
			newB = lerp(noiseB, -1, 1, originB - ampB, originB + ampB)

		commandable.Color(t, t + timestep, new OsbColor(r, g, b), new OsbColor(newR, newG, newB))

		r = newR
		g = newG
		b = newB
		t += timestep
	} while (t <= endTime)
}

export function wiggleOpacity(
	commandable: Commandable,
	frequency: number,
	amplitude: number,
	startTime: number,
	endTime: number,
	originOpacity: number
) {
	let opacity = originOpacity
	let t = startTime
	const timestep = 1000 / frequency

	do {
		const newAngle = amplitude * noise2D(originOpacity, t) + originOpacity - amplitude

		commandable.Fade(t, t + timestep, opacity, newAngle)

		opacity = newAngle
		t += timestep
	} while (t <= endTime)
}
