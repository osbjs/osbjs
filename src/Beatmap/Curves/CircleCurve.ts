import { IDistancePosition } from '../Interfaces'
import { Curve } from './Curve'
import { Vector2 } from '../../Math'

export class CircleCurve extends Curve {
	precision: number
	length: number
	distancePositions: IDistancePosition[]
	startPosition: Vector2
	endPosition: Vector2
	startPoint: Vector2
	midPoint: Vector2
	endPoint: Vector2

	constructor(startPoint: Vector2, midPoint: Vector2, endPoint: Vector2) {
		super()
		this.startPoint = startPoint
		this.midPoint = midPoint
		this.endPoint = endPoint
		this.startPosition = startPoint
		this.endPosition = endPoint
		this.distancePositions = []
		this.length = this._initLength()
		this.precision = this.length * 0.125
	}

	getPositionAtProgress(t: number): Vector2 {
		return this.getPositionAtDistance(this.precision * t)
	}

	getPositionAtDelta(delta: number) {
		return this.getPositionAtDistance(delta * this.length)
	}

	getPositionAtDistance(distance: number): Vector2 {
		if (distance >= this.length) return this.endPosition
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
		let d =
			2 *
			(this.startPoint.x * (this.midPoint.y - this.endPoint.y) +
				this.midPoint.x * (this.endPoint.y - this.startPoint.y) +
				this.endPoint.x * (this.startPoint.y - this.midPoint.y))
		if (d == 0) throw new Error('Invalid circle curve')

		let startLengthSqr = this.startPoint.x * this.startPoint.x + this.startPoint.y * this.startPoint.y,
			midLengthSqr = this.midPoint.x * this.midPoint.x + this.midPoint.y * this.midPoint.y,
			endLengthSqr = this.endPoint.x * this.endPoint.x + this.endPoint.y * this.endPoint.y

		let center = {
			x:
				(startLengthSqr * (this.midPoint.y - this.endPoint.y) +
					midLengthSqr * (this.endPoint.y - this.startPoint.y) +
					endLengthSqr * (this.startPoint.y - this.midPoint.y)) /
				d,
			y:
				(startLengthSqr * (this.endPoint.x - this.midPoint.x) +
					midLengthSqr * (this.startPoint.x - this.endPoint.x) +
					endLengthSqr * (this.midPoint.x - this.startPoint.x)) /
				d,
		}

		let centerStart = {
			x: this.startPoint.x - center.x,
			y: this.startPoint.y - center.y,
		}

		let radius = Math.sqrt(centerStart.x * centerStart.x + centerStart.y * centerStart.y)

		let startAngle = Math.atan2(this.startPoint.y - center.y, this.startPoint.x - center.x)
		let midAngle = Math.atan2(this.midPoint.y - center.y, this.midPoint.x - center.x)
		let endAngle = Math.atan2(this.endPoint.y - center.y, this.endPoint.x - center.x)

		while (midAngle < startAngle) midAngle += 2 * Math.PI
		while (endAngle < startAngle) endAngle += 2 * Math.PI
		if (midAngle > endAngle) endAngle -= 2 * Math.PI

		let length = Math.abs((endAngle - startAngle) * radius)
		let precision = length * 0.125

		for (let i = 1; i < precision; i++) {
			let progress = i / precision
			let angle = endAngle * progress + startAngle * (1 - progress)

			let position = new Vector2(Math.cos(angle) * radius + center.x, Math.sin(angle) * radius + center.y)

			this.distancePositions.push({ distance: progress * length, position })
		}

		this.distancePositions.push({ distance: length, position: this.endPoint })

		return length
	}

	static isValid(startPoint: Vector2, midPoint: Vector2, endPoint: Vector2): boolean {
		return (
			startPoint.x != midPoint.x &&
			startPoint.y != midPoint.y &&
			midPoint.x != endPoint.x &&
			midPoint.y != endPoint.y &&
			2 * (startPoint.x * (midPoint.y - endPoint.y) + midPoint.x * (endPoint.y - startPoint.y) + endPoint.x * (startPoint.y - midPoint.y)) != 0
		)
	}
}
