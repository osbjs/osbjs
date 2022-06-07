import { Vector2 } from '../../Math'
import { Curve, CircleCurve, CatmullCurve, BezierCurveGroup, BezierCurve } from '../Curves'
import { CurveType, Hitsound } from '../Enums'
import { IHitSample, ISliderParams, ITimingPoint } from '../Interfaces'
import { HitObject } from './HitObject'

export class Slider extends HitObject {
	params: ISliderParams
	startPoint: Vector2
	endPoint: Vector2
	endTime: number
	travelDuration: number

	private _curve: Curve

	constructor(
		x: number,
		y: number,
		startTime: number,
		hitsound: Hitsound,
		hitSample: IHitSample,
		params: ISliderParams,
		sliderMultiplier: number,
		timingPoint: ITimingPoint,
		currentMultiplier: number
	) {
		super(x, y, startTime, hitsound, hitSample)
		this.params = params
		this.startPoint = new Vector2(x, y)
		this.endPoint = params.curvePoints[params.curvePoints.length - 1]

		switch (params.curveType) {
			case CurveType.Bezier:
				this._curve = this._createBezierCurveGroup(params)
				break

			case CurveType.Catmull:
				this._curve = this._createCatmullCurve(params)
				break

			case CurveType.Perfect:
				if (params.curvePoints.length > 2) {
					this._curve = this._createBezierCurveGroup(params)
				} else if (params.curvePoints.length < 2 || !CircleCurve.isValid(this.startPoint, params.curvePoints[0], this.endPoint)) {
					this._curve = this._createLinearCurve(params)
				} else {
					this._curve = new CircleCurve(this.startPoint, params.curvePoints[0], this.endPoint)
				}

				break

			default:
				this._curve = this._createLinearCurve(params)
				break
		}

		this.travelDuration = this._calcDuration(timingPoint, sliderMultiplier, currentMultiplier, this.params.length)
		this.endTime = this.startTime + this.travelDuration * params.slides
	}

	private _calcDuration(timingPoint: ITimingPoint, beatmapMultiplier: number, currentMultiplier: number, length: number): number {
		let sliderMultiplierLessLength = length / beatmapMultiplier
		let travelDurationBeats = (sliderMultiplierLessLength / 100) * currentMultiplier
		return Math.round(timingPoint.beatLength * travelDurationBeats)
	}

	private _createBezierCurveGroup(params: ISliderParams): BezierCurveGroup {
		let curves: BezierCurve[] = []

		let cPoints: Vector2[] = [this.startPoint]

		let precision = Math.ceil(params.length)
		let previousPosition = this.startPoint

		params.curvePoints.forEach((cPoint) => {
			if (cPoint.x == previousPosition.x && cPoint.y == previousPosition.y) {
				if (cPoints.length > 1) curves.push(new BezierCurve(cPoints, precision))

				cPoints = []
			}

			cPoints.push(cPoint)
			previousPosition = cPoint
		})

		if (cPoints.length > 1) curves.push(new BezierCurve(cPoints, precision))

		return new BezierCurveGroup(curves)
	}

	private _createCatmullCurve(params: ISliderParams): CatmullCurve {
		let cPoints = [this.startPoint, ...params.curvePoints]
		let precision = Math.ceil(params.length)

		return new CatmullCurve(cPoints, precision)
	}

	private _createLinearCurve(params: ISliderParams): BezierCurveGroup {
		let curves: BezierCurve[] = []

		let previousPoint = this.startPoint
		let cPoints = params.curvePoints

		cPoints.forEach((cPoint) => {
			curves.push(new BezierCurve([previousPoint, cPoint], 0))
			previousPoint = cPoint
		})

		return new BezierCurveGroup(curves)
	}

	getPositionAtTime(time: number): Vector2 {
		if (time <= this.startTime) return this.startPoint
		if (this.endTime <= time) this.params.slides % 2 == 0 ? this.startPoint : this.endPoint
		let elapsedSinceStart = time - this.startTime
		let repeatAtTime = 1

		var progressDuration = elapsedSinceStart
		while (progressDuration > this.travelDuration) {
			progressDuration -= this.travelDuration
			repeatAtTime++
		}

		var progress = progressDuration / this.travelDuration
		var reversed = repeatAtTime % 2 == 0
		if (reversed) progress = 1.0 - progress

		return this._curve.getPositionAtDistance(this.params.length * progress)
	}
}
