import { Command, CommandGroup, Loop, Trigger } from '../Commands'
import { Component } from './Component'
import { Easing, Layer, Origin, Parameter } from '../Enums'
import { OsbColor, OsbVector2 } from '../Utils'

export class Sprite extends Component {
	path: string
	layer: Layer
	commands: (Command | CommandGroup)[]
	origin: Origin
	initialPosition: OsbVector2
	name = 'Sprite'

	constructor(path: string, layer: Layer, origin: Origin = Origin.Center, initialPosition: OsbVector2 = new OsbVector2(320, 240)) {
		super()
		this.path = path
		this.layer = layer
		this.origin = origin
		this.initialPosition = initialPosition
		this.commands = []
	}

	Fade(startTime: number | string, endTime: number | string, startOpacity: number, endOpacity: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('F', easing, startTime, endTime, startOpacity, endOpacity))
	}

	FadeAtTime(time: number | string, opacity: number) {
		this.commands.push(new Command('F', Easing.Linear, time, time, opacity, opacity))
	}

	Move(startTime: number | string, endTime: number | string, startPosition: OsbVector2, endPosition: OsbVector2, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('M', easing, startTime, endTime, startPosition, endPosition))
	}

	MoveAtTime(time: number | string, position: OsbVector2) {
		this.commands.push(new Command('M', Easing.Linear, time, time, position, position))
	}

	MoveX(startTime: number | string, endTime: number | string, startX: number, endX: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MX', easing, startTime, endTime, startX, endX))
	}

	MoveXAtTime(time: number | string, x: number) {
		this.commands.push(new Command('MX', Easing.Linear, time, time, x, x))
	}

	MoveY(startTime: number | string, endTime: number | string, startY: number, endY: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MY', easing, startTime, endTime, startY, endY))
	}

	MoveYAtTime(time: number | string, y: number) {
		this.commands.push(new Command('MY', Easing.Linear, time, time, y, y))
	}

	Scale(startTime: number | string, endTime: number | string, startScale: number, endScale: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('S', easing, startTime, endTime, startScale, endScale))
		return this
	}

	ScaleAtTime(time: number | string, scale: number) {
		this.commands.push(new Command('S', Easing.Linear, time, time, scale, scale))
	}

	ScaleVec(startTime: number | string, endTime: number | string, startScale: OsbVector2, endScale: OsbVector2, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('V', easing, startTime, endTime, startScale, endScale))
	}

	ScaleVecAtTime(time: number | string, scale: OsbVector2) {
		this.commands.push(new Command('V', Easing.Linear, time, time, scale, scale))
	}

	Rotate(startTime: number | string, endTime: number | string, startAngle: number, endAngle: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('R', easing, startTime, endTime, startAngle, endAngle))
	}

	RotateAtTime(time: number | string, angle: number) {
		this.commands.push(new Command('R', Easing.Linear, time, time, angle, angle))
	}

	Color(startTime: number | string, endTime: number | string, startColor: OsbColor, endColor: OsbColor, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('C', easing, startTime, endTime, startColor, endColor))
	}

	ColorAtTime(time: number | string, color: OsbColor) {
		this.commands.push(new Command('C', Easing.Linear, time, time, color, color))
	}

	Parameter(startTime: number | string, endTime: number | string, parameter: Parameter) {
		this.commands.push(new Command('P', Easing.Linear, startTime, endTime, parameter, parameter))
	}

	ParameterAtTime(time: number | string, parameter: Parameter) {
		this.commands.push(new Command('P', Easing.Linear, time, time, parameter, parameter))
	}

	Loop(group: Loop) {
		this.commands.push(group)
	}

	Trigger(group: Trigger) {
		this.commands.push(group)
	}

	getOsbString(): string {
		let str = `Sprite,${this.layer},${this.origin},"${this.path}",${this.initialPosition.x},${this.initialPosition.y}\n`
		this.commands.forEach((command) => {
			str += ` ${command.getOsbString()}\n`
		})

		return str
	}
}
