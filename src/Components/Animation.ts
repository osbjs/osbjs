import { Color, Easing, Layer, Origin, Parameter, Vector2 } from '..'
import { Command, CommandGroup, Loop, Trigger } from '../Commands'
import { LoopType } from '../Enums/LoopType'
import { Component } from './Component'

export class Animation extends Component {
	path: string
	layer: Layer
	commands: (Command | CommandGroup)[]
	origin: Origin
	startPosition: Vector2
	loopType: LoopType
	name = 'Animation'

	constructor(
		path: string,
		layer: Layer,
		origin: Origin = Origin.Center,
		startPosition: Vector2 = new Vector2(320, 480),
		loopType: LoopType = LoopType.LoopForever
	) {
		super()
		this.path = path
		this.layer = layer
		this.origin = origin
		this.startPosition = startPosition
		this.loopType = loopType
		this.commands = []
	}

	Fade(startTime: number, endTime: number, startOpacity: number, endOpacity: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('F', easing, startTime, endTime, startOpacity, endOpacity))
	}

	FadeAtTime(time: number, opacity: number) {
		this.commands.push(new Command('F', Easing.Linear, time, time, opacity, opacity))
	}

	Move(startTime: number, endTime: number, startPosition: Vector2, endPosition: Vector2, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('M', easing, startTime, endTime, startPosition, endPosition))
	}

	MoveAtTime(time: number, position: Vector2) {
		this.commands.push(new Command('M', Easing.Linear, time, time, position, position))
	}

	MoveX(startTime: number, endTime: number, startX: number, endX: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MX', easing, startTime, endTime, startX, endX))
	}

	MoveXAtTime(time: number, x: number) {
		this.commands.push(new Command('MX', Easing.Linear, time, time, x, x))
	}

	MoveY(startTime: number, endTime: number, startY: number, endY: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MY', easing, startTime, endTime, startY, endY))
	}

	MoveYAtTime(time: number, y: number) {
		this.commands.push(new Command('MY', Easing.Linear, time, time, y, y))
	}

	Scale(startTime: number, endTime: number, startScale: number, endScale: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('S', easing, startTime, endTime, startScale, endScale))
		return this
	}

	ScaleAtTime(time: number, scale: number) {
		this.commands.push(new Command('S', Easing.Linear, time, time, scale, scale))
	}

	ScaleVec(startTime: number, endTime: number, startScale: Vector2, endScale: Vector2, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('V', easing, startTime, endTime, startScale, endScale))
	}

	ScaleVecAtTime(time: number, scale: Vector2) {
		this.commands.push(new Command('V', Easing.Linear, time, time, scale, scale))
	}

	Rotate(startTime: number, endTime: number, startAngle: number, endAngle: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('R', easing, startTime, endTime, startAngle, endAngle))
	}

	RotateAtTime(time: number, angle: number) {
		this.commands.push(new Command('R', Easing.Linear, time, time, angle, angle))
	}

	Color(startTime: number, endTime: number, startColor: Color, endColor: Color, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('C', easing, startTime, endTime, startColor, endColor))
	}

	ColorAtTime(time: number, color: Color) {
		this.commands.push(new Command('C', Easing.Linear, time, time, color, color))
	}

	Parameter(startTime: number, endTime: number, parameter: Parameter) {
		this.commands.push(new Command('P', Easing.Linear, startTime, endTime, parameter, parameter))
	}

	ParameterAtTime(time: number, parameter: Parameter) {
		this.commands.push(new Command('P', Easing.Linear, time, time, parameter, parameter))
	}

	Loop(group: Loop) {
		this.commands.push(group)
	}

	Trigger(group: Trigger) {
		this.commands.push(group)
	}

	getOsbString(): string {
		let str = `Animation,${this.layer},${this.origin},"${this.path}",${this.startPosition.x},${this.startPosition.y}\n`
		this.commands.forEach((command) => {
			str += ` ${command.getOsbString()}\n`
		})

		return str
	}
}
