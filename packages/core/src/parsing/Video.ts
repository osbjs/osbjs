import { Timestamp } from '../types/Timestamp'
import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'

export class Video {
  /** The start time of the video. */
  readonly startTime: Timestamp
  /** The path to the video file. */
  readonly path: string
  /** The position of the element. */
  readonly position: Vector2

  constructor({
    path,
    startTime,
    position,
  }: {
    path: string
    startTime: number
    position: IVector2 | Vector2Tuple | Vector2
  }) {
    this.startTime = new Timestamp(startTime)
    this.path = path
    this.position = new Vector2(position)
  }

  toString(): string {
    return `Video,${this.startTime},"${this.path}",${this.position}`
  }
}
