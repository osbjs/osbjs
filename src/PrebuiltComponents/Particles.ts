import { Vector2 } from '../Math'
import { Component, Origin, OsbVector2 } from '../Core'

export class Particles extends Component {
	name = 'Particles'
	options: ParticlesOptions = {
		scale: 1,
		origin: Origin.Center,
		rotationAngle: 0,
		additive: false,
		spawnOrigin: new OsbVector2(854, 0),
		particleCount: 32,
	}
	constructor(osbPath: string, folderPath: string, startTime: number | string, endTime: number | string, options: ParticlesOptions) {
		super()
		this.options = { ...this.options, ...options }
	}
}

export interface ParticlesOptions {
	scale: number
	origin: Origin
	rotationAngle: number
	additive: boolean
	spawnOrigin: Vector2 | OsbVector2
	particleCount: number
}
