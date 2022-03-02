import { Commandable } from '../Components'
import { OsbColor, OsbVector2 } from '.'
import { Vector2, noise2D } from '../../Math'

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
		const newX = amplitude * noise2D(x, t) + origin.x,
			newY = amplitude * noise2D(y, t) + origin.y

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
		const newX = amplitude * noise2D(x, t) + originX

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
		const newY = amplitude * noise2D(y, t) + originY

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
		const newAngle = amplitude * noise2D(angle, t) + originAngle

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
	color1: OsbColor,
	color2: OsbColor
) {
	const originR = Math.round((color1.r + color2.r) / 2),
		originG = Math.round((color1.g + color2.g) / 2),
		originB = Math.round((color1.b + color2.b) / 2)

	let r = originR,
		g = originG,
		b = originB

	const _ampR = Math.min(amplitude, originR),
		_ampG = Math.min(amplitude, originG),
		_ampB = Math.min(amplitude, originB)

	let t = startTime
	const timestep = 1000 / frequency

	do {
		const newR = Math.round(_ampR * noise2D(r, t)) + originR,
			newG = Math.round(_ampG * noise2D(g, t)) + originG,
			newB = Math.round(_ampB * noise2D(b, t)) + originB

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
		const newAngle = amplitude * noise2D(opacity, t) + originOpacity

		commandable.Fade(t, t + timestep, opacity, newAngle)

		opacity = newAngle
		t += timestep
	} while (t <= endTime)
}
