import { Vector2 } from '../../Math'
import { Hitsound } from '../Enums/Hitsound'
import { IHitSample } from '../Interfaces/IHitSample'
import { HitObject } from './HitObject'

export class Circle extends HitObject {
	position: Vector2
	constructor(x: number, y: number, startTime: number, hitsound: Hitsound, hitSample: IHitSample) {
		super(x, y, startTime, hitsound, hitSample)
		this.position = new Vector2(x, y)
	}
}
