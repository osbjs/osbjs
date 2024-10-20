import type { Vector2 } from '../../types/Vector2'
import type { Curve } from './Curve'

export class CompositeCurve implements Curve {
  curves: Curve[]
  length!: number
  endPosition: Vector2
  startPosition: Vector2

  constructor(curves: Curve[]) {
    this.curves = curves
    this.startPosition = curves[0]!.startPosition
    this.endPosition = curves[curves.length - 1]!.endPosition
    this.length = 0
    for (const curve of curves) {
      this.length += curve.length
    }
  }

  positionAtDistance(distance: number): Vector2 {
    for (const curve of this.curves) {
      if (distance < curve.length) return curve.positionAtDistance(distance)

      distance -= curve.length
    }

    return this.curves[this.curves.length - 1]!.endPosition
  }

  positionAtDelta(delta: number): Vector2 {
    let length = this.length

    let d = delta
    for (let curveIndex = 0; curveIndex < this.curves.length; ++curveIndex) {
      let curve = this.curves[curveIndex]!
      let curveDelta = curve.length / length

      if (d < curveDelta) return curve.positionAtDelta(d / curveDelta)

      d -= curveDelta
    }
    return this.endPosition
  }
}
