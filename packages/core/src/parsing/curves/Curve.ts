import type { Vector2 } from '../../types/Vector2'

export interface Curve {
  startPosition: Vector2
  endPosition: Vector2
  length: number

  positionAtDistance(distance: number): Vector2
  positionAtDelta(delta: number): Vector2
}
