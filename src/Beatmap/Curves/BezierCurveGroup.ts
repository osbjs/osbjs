import { Vector2 } from '../../Math'
import { BezierCurve } from './BezierCurve'
import { Curve } from './Curve'

export class BezierCurveGroup extends Curve {
	curves: BezierCurve[]
	startPosition: Vector2
	endPosition: Vector2
	length: number

	constructor(curves: BezierCurve[]) {
		super()
		this.curves = curves
		this.startPosition = curves[0].startPosition
		this.endPosition = curves[curves.length - 1].endPosition
		this.length = this._initLength()
	}

	private _initLength() {
		let length = 0
		this.curves.forEach((c) => {
			length += c.length
		})
		return length
	}

	getPositionAtDistance(distance: number): Vector2 {
		for (const curve of this.curves) {
			if (distance < curve.length) return curve.getPositionAtDistance(distance)

			distance -= curve.length
		}

		return this.curves[this.curves.length - 1].endPosition
	}

	getPositionAtDelta(delta: number): Vector2 {
		let length = this.length

		let d = delta
		for (let curveIndex = 0; curveIndex < this.curves.length; ++curveIndex) {
			let curve = this.curves[curveIndex]
			let curveDelta = curve.length / length

			if (d < curveDelta) return curve.getPositionAtDelta(d / curveDelta)

			d -= curveDelta
		}
		return this.endPosition
	}
}
