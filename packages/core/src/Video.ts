import { Graphic, GraphicType } from './Graphic'
import { Timestamp } from './Timestamp'
import { Vector2, type IVector2, type Vector2Tuple } from './Vector2'

export class Video extends Graphic {
  /**
   * The start time of the video.
   */
  startTime: Timestamp
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
    super({ path, position, graphicType: GraphicType.Video })
    this.startTime = new Timestamp(startTime)
  }
}
