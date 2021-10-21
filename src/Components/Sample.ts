import { Component } from './Component'

export class Sample extends Component {
	layer: number
	path: string
	volume: number
	startTime: number
	name = 'Sprite'

	constructor(startTime: number, layer: number, path: string, volume: number) {
		super()
		this.startTime = startTime
		this.layer = layer
		this.path = path
		this.volume = volume
	}

	getOsbString(): string {
		return `Sample,${this.startTime},${this.layer},"${this.path}",${this.volume}\n`
	}
}
