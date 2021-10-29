import { Command } from '.'
import { Easing, OsbVector2, OsbColor, Parameter } from '..'

export abstract class CommandGroup {
	header: string
	commands: Command[]

	constructor(header: string) {
		this.header = header
		this.commands = []
	}

	Fade(startTime: number, endTime: number, startOpacity: number, endOpacity: number, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('F', easing, startTime, endTime, startOpacity, endOpacity))
	}

	FadeAtTime(time: number, opacity: number) {
		time = Math.round(time)
		this.commands.push(new Command('F', Easing.Linear, time, time, opacity, opacity))
	}

	Move(startTime: number, endTime: number, startPosition: OsbVector2, endPosition: OsbVector2, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('M', easing, startTime, endTime, startPosition, endPosition))
	}

	MoveAtTime(time: number, position: OsbVector2) {
		time = Math.round(time)
		this.commands.push(new Command('M', Easing.Linear, time, time, position, position))
	}

	MoveX(startTime: number, endTime: number, startX: number, endX: number, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('MX', easing, startTime, endTime, startX, endX))
	}

	MoveXAtTime(time: number, x: number) {
		time = Math.round(time)
		this.commands.push(new Command('MX', Easing.Linear, time, time, x, x))
	}

	MoveY(startTime: number, endTime: number, startY: number, endY: number, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('MY', easing, startTime, endTime, startY, endY))
	}

	MoveYAtTime(time: number, y: number) {
		time = Math.round(time)
		this.commands.push(new Command('MY', Easing.Linear, time, time, y, y))
	}

	Scale(startTime: number, endTime: number, startScale: number, endScale: number, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('S', easing, startTime, endTime, startScale, endScale))
		return this
	}

	ScaleAtTime(time: number, scale: number) {
		time = Math.round(time)

		this.commands.push(new Command('S', Easing.Linear, time, time, scale, scale))
	}

	ScaleVec(startTime: number, endTime: number, startScale: OsbVector2, endScale: OsbVector2, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('V', easing, startTime, endTime, startScale, endScale))
	}

	ScaleVecAtTime(time: number, scale: OsbVector2) {
		time = Math.round(time)
		this.commands.push(new Command('V', Easing.Linear, time, time, scale, scale))
	}

	Rotate(startTime: number, endTime: number, startAngle: number, endAngle: number, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('R', easing, startTime, endTime, startAngle, endAngle))
	}

	RotateAtTime(time: number, angle: number) {
		time = Math.round(time)
		this.commands.push(new Command('R', Easing.Linear, time, time, angle, angle))
	}

	Color(startTime: number, endTime: number, startColor: OsbColor, endColor: OsbColor, easing: Easing = Easing.Linear) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('C', easing, startTime, endTime, startColor, endColor))
	}

	ColorAtTime(time: number, color: OsbColor) {
		time = Math.round(time)
		this.commands.push(new Command('C', Easing.Linear, time, time, color, color))
	}

	Parameter(startTime: number, endTime: number, parameter: Parameter) {
		startTime = Math.round(startTime)
		endTime = Math.round(endTime)
		this.commands.push(new Command('P', Easing.Linear, startTime, endTime, parameter, parameter))
	}

	ParameterAtTime(time: number, parameter: Parameter) {
		time = Math.round(time)
		this.commands.push(new Command('P', Easing.Linear, time, time, parameter, parameter))
	}

	getOsbString(): string {
		let str: string = this.header
		this.commands.forEach((command) => {
			str += `  ${command.getOsbString()}\n`
		})
		return str
	}
}
