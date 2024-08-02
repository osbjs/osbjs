import {
  Timestamp,
  Vector2,
  type IVector2,
  type Vector2Tuple,
} from '@osbjs/core'

export class Video {
  /** The start time of the video. */
  readonly startTime: Timestamp
  /** The path to the video file. */
  readonly path: string
  /** The position of the element. */
  readonly position: Vector2

  /**
   * @param options - The options for initializing the video.
   * @param options.path - The path to the video's file relative to the beatmap folder.
   * @param options.startTime - The start time of the video.
   * @param [options.position] - The position of the video.
   */
  constructor({
    path,
    startTime,
    position,
  }: {
    path: string
    startTime: number | string
    position: IVector2 | Vector2Tuple | Vector2
  }) {
    this.startTime = new Timestamp(startTime)
    this.path = path
    this.position = new Vector2(position)
  }

  toString(): string {
    return `Video,${this.startTime},"${this.path}",${this.position}\n`
  }
}
