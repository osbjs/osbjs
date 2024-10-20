import { Vector2 } from '../../types/Vector2'
import { BaseCurve } from './BaseCurve'

export class CatmullCurve extends BaseCurve {
  readonly points: readonly Vector2[]
  readonly precision: number

  constructor(points: Vector2[], precision: number) {
    super()
    this.precision = precision
    this.points = points
    this.startPosition = points[0]!
    this.endPosition = points[points.length - 1]!
  }

  override initialize(): void {
    let precision = this.points.length > 2 ? this.precision : 0

    let distance = 0
    let linePrecision = precision / this.points.length
    let previousPosition = this.startPosition
    for (let lineIndex = 0; lineIndex < this.points.length - 1; ++lineIndex) {
      for (let i = 1; i <= linePrecision; ++i) {
        let delta = i / (linePrecision + 1)

        let p1 =
          lineIndex > 0 ? this.points[lineIndex - 1]! : this.points[lineIndex]!
        let p2 = this.points[lineIndex]!
        let p3 = this.points[lineIndex + 1]!
        let p4 =
          lineIndex < this.points.length - 2
            ? this.points[lineIndex + 2]!
            : this.points[lineIndex + 1]!

        let nextPosition = this._positionAtDelta(delta, p1, p2, p3, p4)

        distance += nextPosition.sub(previousPosition).len()
        this.distancePosition.push([distance, nextPosition])

        previousPosition = nextPosition
      }
    }
    distance += this.endPosition.sub(previousPosition).len()
    this.length = distance
  }

  private _positionAtDelta(
    delta: number,
    p1: Vector2,
    p2: Vector2,
    p3: Vector2,
    p4: Vector2,
  ) {
    return new Vector2(
      this._pointPositionAtDelta(delta, p1.x, p2.x, p3.x, p4.x),
      this._pointPositionAtDelta(delta, p1.y, p2.y, p3.y, p4.y),
    )
  }

  private _pointPositionAtDelta(
    delta: number,
    p1: number,
    p2: number,
    p3: number,
    p4: number,
  ) {
    return (
      0.5 *
      ((-p1 + 3 * p2 - 3 * p3 + p4) * delta * delta * delta +
        (2 * p1 - 5 * p2 + 4 * p3 - p4) * delta * delta +
        (-p1 + p3) * delta +
        2 * p2)
    )
  }
}
