import type { Vector2 } from '../../types/Vector2'
import type { Curve } from './Curve'

export abstract class BaseCurve implements Curve {
  distancePosition: [number, Vector2][] = []
  length!: number
  endPosition!: Vector2
  startPosition!: Vector2
  abstract initialize(): void

  positionAtDistance(distance: number): Vector2 {
    if (!this.distancePosition.length) this.initialize()

    let previousDistance = 0
    let previousPosition = this.startPosition

    let nextDistance = this.length
    let nextPosition = this.endPosition

    let i = 0
    while (i < this.distancePosition.length) {
      let distancePositionTuple = this.distancePosition[i]!
      if (distancePositionTuple[0] > distance) break

      previousDistance = distancePositionTuple[0]
      previousPosition = distancePositionTuple[1]
      i++
    }

    if (i < this.distancePosition.length - 1) {
      let distancePositionTuple = this.distancePosition[i + 1]!
      nextDistance = distancePositionTuple[0]
      nextPosition = distancePositionTuple[1]
    }

    let delta =
      (distance - previousDistance) / (nextDistance - previousDistance)
    let previousToNext = nextPosition.sub(previousPosition)

    return previousPosition.add(previousToNext.mul(delta))
  }

  positionAtDelta(delta: number): Vector2 {
    return this.positionAtDistance(delta * this.length)
  }
}
