import { Vector2 } from '../../Math'
import { IDistancePosition } from '../Interfaces/IDistancePosition'
import { Curve } from './Curve'

export class BezierCurve extends Curve {
	points: Vector2[]
	precision: number
	length: number
	distancePositions: IDistancePosition[]
	startPosition: Vector2
	endPosition: Vector2

	constructor(points: Vector2[], precision: number) {
		super()
		this.points = points
		this.precision = precision
		this.startPosition = points[0]
		this.endPosition = points[points.length - 1]
		this.distancePositions = []
		this.length = this._initLength()
	}

	getPositionAtProgress(t: number): Vector2 {
		return this.getPositionAtDistance(this.precision * t)
	}

	getPositionAtDelta(delta: number) {
		return this.getPositionAtDistance(delta * this.length)
	}

	getPositionAtDistance(distance: number): Vector2 {
		let previousDistance = 0.0
		let previousPosition = this.startPosition

		let nextDistance = this.length
		let nextPosition = this.endPosition

		let i = 0
		while (i < this.distancePositions.length) {
			let distancePosition = this.distancePositions[i]
			if (distancePosition.distance > distance) break

			previousDistance = distancePosition.distance
			previousPosition = distancePosition.position
			i++
		}

		if (i < this.distancePositions.length - 1) {
			let distancePosition = this.distancePositions[i + 1]
			nextDistance = distancePosition.distance
			nextPosition = distancePosition.position
		}

		let delta = (distance - previousDistance) / (nextDistance - previousDistance)
		let prevNext = Vector2.sub(nextPosition, previousPosition)

		return Vector2.add(previousPosition, Vector2.multiplyScalar(prevNext, delta))
	}

	private _initLength() {
		let precision = this.points.length > 2 ? this.precision : 0

		let distance = 0
		let previousPosition = this.startPosition

		for (let i = 1; i <= precision; ++i) {
			let delta = i / (precision + 1)
			let nextPosition = this._getPositionAtDelta(delta)

			let prevNext = Vector2.sub(nextPosition, previousPosition)

			distance += prevNext.length()

			this.distancePositions.push({ distance, position: nextPosition })

			previousPosition = nextPosition
		}

		let prevEnd = Vector2.sub(this.endPosition, previousPosition)

		distance += prevEnd.length()

		return distance
	}

	private _getPositionAtDelta(delta: number): Vector2 {
		let intermediatePoints: Vector2[] = []
		for (let i = 0; i < this.points.length; ++i) intermediatePoints[i] = this.points[i]

		for (let i = 1; i < this.points.length; ++i)
			for (let j = 0; j < this.points.length - i; ++j) {
				intermediatePoints[j] = new Vector2()

				intermediatePoints[j].x = intermediatePoints[j].x * (1 - delta) + intermediatePoints[j + 1].x * delta
				intermediatePoints[j].y = intermediatePoints[j].y * (1 - delta) + intermediatePoints[j + 1].y * delta
			}

		return intermediatePoints[0]
	}
}
