import { Hitsound } from '../Enums/Hitsound'
import { IHitSample } from '../Interfaces/IHitSample'

export abstract class HitObject {
	x: number
	y: number
	hitsound: Hitsound
	startTime: number
	hitSample: IHitSample
	constructor(x: number, y: number, startTime: number, hitsound: Hitsound, hitSample: IHitSample) {
		this.x = x
		this.y = y
		this.startTime = startTime
		this.hitsound = hitsound
		this.hitSample = hitSample
	}
}
