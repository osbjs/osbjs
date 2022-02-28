import { Vector2 } from '../../Math'
import { IDistancePosition } from '../Interfaces/IDistancePosition'
import { Curve } from './Curve'

export class CatmullCurve extends Curve {
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

		let distance = 0.0
		let linePrecision = precision / this.points.length
		let previousPosition = this.startPosition
		for (let lineIndex = 0; lineIndex < this.points.length - 1; ++lineIndex) {
			for (let i = 1; i <= linePrecision; ++i) {
				let delta = i / (linePrecision + 1)

				let p1 = lineIndex > 0 ? this.points[lineIndex - 1] : this.points[lineIndex]
				let p2 = this.points[lineIndex]
				let p3 = this.points[lineIndex + 1]
				let p4 = lineIndex < this.points.length - 2 ? this.points[lineIndex + 2] : this.points[lineIndex + 1]

				let nextPosition = this._getPositionAtDelta(p1, p2, p3, p4, delta)

				let prevNext = Vector2.sub(nextPosition, previousPosition)

				distance += prevNext.length()

				this.distancePositions.push({ distance, position: nextPosition })

				previousPosition = nextPosition
			}
		}

		let prevEnd = Vector2.sub(this.endPosition, previousPosition)

		distance += prevEnd.length()

		return distance
	}

	private _getPointPositionAtDelta(p1: number, p2: number, p3: number, p4: number, delta: number) {
		return (
			0.5 *
			((-p1 + 3 * p2 - 3 * p3 + p4) * delta * delta * delta + (2 * p1 - 5 * p2 + 4 * p3 - p4) * delta * delta + (-p1 + p3) * delta + 2 * p2)
		)
	}

	private _getPositionAtDelta(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2, delta: number): Vector2 {
		const result = new Vector2()
		result.x = this._getPointPositionAtDelta(p1.x, p2.x, p3.x, p4.x, delta)
		result.y = this._getPointPositionAtDelta(p1.y, p2.y, p3.y, p4.y, delta)
		return result
	}
}
