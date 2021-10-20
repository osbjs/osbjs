import { Color, Easing, Position, ScaleVector } from '..'

export class Command {
	identifier: string
	easing: Easing
	startTime: number
	endTime: number
	startValue: string | number | Color | Position | ScaleVector
	endValue: string | number | Color | Position | ScaleVector
	duration: number

	constructor(
		identifier: string,
		easing: Easing,
		startTime: number,
		endTime: number,
		startValue: string | number | Color | Position | ScaleVector,
		endValue: string | number | Color | Position | ScaleVector
	) {
		this.identifier = identifier
		this.easing = easing
		this.startTime = startTime
		this.endTime = endTime
		this.startValue = startValue
		this.endValue = endValue
		this.duration = this.startTime - this.endTime
	}

	getOsbString(): string {
		let easingStr: string = this.easing.toString()
		let startTimeStr: string = this.startTime.toString()
		let endTimeStr: string = this.startTime != this.endTime ? this.endTime.toString() : ''
		let startValueStr: string = this.startValue.toString()
		let endValueStr: string = this.endValue.toString()

		let parameters: string[] = [this.identifier, easingStr, startTimeStr, endTimeStr, startValueStr]
		let result: string = parameters.join(',')

		if (startValueStr != endValueStr) result += ',' + endValueStr

		return result
	}
}
