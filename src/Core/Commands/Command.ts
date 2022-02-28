import { Easing } from '../Enums'
import { OsbColor, OsbVector2, parseOsuTimestamp } from '../Utils'

export class Command {
	identifier: string
	easing: Easing
	startTime: number
	endTime: number
	startValue: string | number | OsbColor | OsbVector2
	endValue: string | number | OsbColor | OsbVector2
	duration: number

	constructor(
		identifier: string,
		easing: Easing,
		startTime: number | string,
		endTime: number | string,
		startValue: string | number | OsbColor | OsbVector2,
		endValue: string | number | OsbColor | OsbVector2
	) {
		this.identifier = identifier
		this.easing = easing
		this.startTime = typeof startTime == 'string' ? parseOsuTimestamp(startTime) : Math.round(startTime)
		this.endTime = typeof endTime == 'string' ? parseOsuTimestamp(endTime) : Math.round(endTime)
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
