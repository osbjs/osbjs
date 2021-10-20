import { Command, CommandGroup, Loop, Trigger } from '../Commands'
import { Component } from './Component'
import { Easing, Layer, Origin, Parameter } from '../Enums'
import { Color, Position, ScaleVector } from '../Utils'

export class Sprite extends Component {
	path: string
	layer: Layer
	commands: (Command | CommandGroup)[]
	origin: Origin
	startPosition: Position

	constructor(
		path: string,
		layer: Layer,
		origin: Origin = Origin.Centre,
		startPosition: Position = new Position(320, 480)
	) {
		super(undefined, undefined)
		this.path = path
		this.layer = layer
		this.origin = origin
		this.startPosition = startPosition
		this.commands = []
	}

	Fade(startTime: number, endTime: number, startOpacity: number, endOpacity: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('F', easing, startTime, endTime, startOpacity, endOpacity))
	}

	Move(startTime: number, endTime: number, startPosition: Position, endPosition: Position, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('M', easing, startTime, endTime, startPosition, endPosition))
	}

	MoveX(startTime: number, endTime: number, startX: number, endX: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MX', easing, startTime, endTime, startX, endX))
	}

	MoveY(startTime: number, endTime: number, startY: number, endY: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MY', easing, startTime, endTime, startY, endY))
	}

	Scale(startTime: number, endTime: number, startScale: number, endScale: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('S', easing, startTime, endTime, startScale, endScale))
		return this
	}

	ScaleVec(startTime: number, endTime: number, startScale: ScaleVector, endScale: ScaleVector, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('V', easing, startTime, endTime, startScale, endScale))
	}

	Rotate(startTime: number, endTime: number, startAngle: number, endAngle: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('R', easing, startTime, endTime, startAngle, endAngle))
	}

	Color(startTime: number, endTime: number, startColor: Color, endColor: Color, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('C', easing, startTime, endTime, startColor, endColor))
	}

	Parameter(startTime: number, endTime: number, parameter: Parameter, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('P', easing, startTime, endTime, parameter, startTime == endTime ? parameter : Parameter.None))
	}

	Loop(group: Loop) {
		this.commands.push(group)
	}

	Trigger(group: Trigger) {
		this.commands.push(group)
	}

	getOsbString(): string {
		let str = `Sprite,${this.layer},${this.origin},"${this.path}",${this.startPosition.x},${this.startPosition.y}\n`
		this.commands.forEach((command) => {
			str += ` ${command.getOsbString()}\n`
		})

		return str
	}
}
