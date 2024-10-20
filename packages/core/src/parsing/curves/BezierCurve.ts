import type { Vector2 } from '../../types/Vector2'
import { BaseCurve } from './BaseCurve'

export class BezierCurve extends BaseCurve {
  readonly points: readonly Vector2[]
  readonly precision: number

  constructor(points: Vector2[], precision: number) {
    super()
    this.precision = precision
    this.points = points
    this.startPosition = points[0]!
    this.endPosition = points[points.length - 1]!
  }

  override initialize() {
    let precision = this.points.length > 2 ? this.precision : 0

    let distance = 0
    let previousPosition = this.startPosition
    for (let i = 1; i <= precision; ++i) {
      let delta = i / (precision + 1)
      let nextPosition = this._positionAtDelta(delta)

      distance += nextPosition.sub(previousPosition).len()
      this.distancePosition.push([distance, nextPosition])

      previousPosition = nextPosition
    }
    distance += this.endPosition.sub(previousPosition).len()
    this.length = distance
  }

  private _positionAtDelta(delta: number): Vector2 {
    let pointsCount = this.points.length
    let intermediatePoints: Vector2[] = []

    for (let i = 0; i < pointsCount; ++i)
      intermediatePoints[i] = this.points[i]!

    for (let i = 1; i < pointsCount; ++i)
      for (let j = 0; j < pointsCount - i; ++j)
        intermediatePoints[j] = intermediatePoints[j]!.mul(1 - delta).add(
          intermediatePoints[j + 1]!.mul(delta),
        )

    return intermediatePoints[0]!
  }
}
