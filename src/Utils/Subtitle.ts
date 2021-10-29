export class Subtitle {
	startTime: number
	endTime: number
	text: string
	constructor(startTime: number, endTime: number, text: string) {
		this.startTime = startTime
		this.endTime = endTime
		this.text = text
	}
}
