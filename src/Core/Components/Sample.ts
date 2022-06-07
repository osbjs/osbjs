import { parseOsuTimestamp } from '../Utils'
import { SampleLayer } from '../Enums'
import { Component } from './Component'

export class Sample extends Component {
	layer: SampleLayer
	path: string
	volume: number
	startTime: number
	name = 'Sprite'

	/**
	 *
	 * @param startTime Time in milliseconds/timestamp that the sound should start playing.
	 * @param layer The layer you want the sound to be on.
	 * @param path Path to the audio file relative to the beatmap folder.
	 * @param volume Volume (1-100) of the sound file.
	 */
	constructor(startTime: number | string, layer: SampleLayer, path: AudioPath, volume: number = 100) {
		super()
		this.startTime = typeof startTime == 'string' ? parseOsuTimestamp(startTime) : Math.round(startTime)
		this.layer = layer
		this.path = path
		this.volume = volume
	}

	getOsbString(): string {
		return `Sample,${this.startTime},${this.layer},"${this.path}",${this.volume}\n`
	}

	override registerComponents() {
		throw new Error('Cannot register any components to Sample.')
	}
}

export type AudioPath = `${string}.mp3` | `${string}.ogg` | `${string}.wav`
