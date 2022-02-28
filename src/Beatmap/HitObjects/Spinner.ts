import { Hitsound } from '../Enums/Hitsound'
import { IHitSample } from '../Interfaces/IHitSample'
import { HitObject } from './HitObject'

export class Spinner extends HitObject {
	endTime: number
	constructor(startTime: number, endTime: number, hitsound: Hitsound, hitSample: IHitSample) {
		super(256, 192, startTime, hitsound, hitSample)
		this.endTime = endTime
	}
}
