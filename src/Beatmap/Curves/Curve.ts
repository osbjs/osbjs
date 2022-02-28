import { Vector2 } from '../../Math';

export abstract class Curve {
	constructor() {}

	abstract getPositionAtDistance(progress: number): Vector2
	abstract getPositionAtDelta(progress: number): Vector2
}
