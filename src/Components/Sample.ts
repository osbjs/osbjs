import { Component } from './Component'

export class Sample extends Component {
	layer: number
	path: string
	volume: number
	startTime: number

	constructor(startTime: number, layer: number, path: string, volume: number) {
		super()
		this.startTime = startTime
		this.layer = layer
		this.path = path
		this.volume = volume
	}

	override getOsbString(): string {
		return `Sample,${this.startTime},${this.layer},"${this.path}",${this.volume}\n`
	}
}
