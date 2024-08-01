import { Graphic, GraphicType } from './Graphic'
import { type IVector2, type Vector2Tuple } from './Vector2'

/**
 * Background image.
 */
export class Background extends Graphic {
  /**
   * @param options - The options for initializing the video.
   * @param options.path - The path to the video's file relative to the beatmap folder.
   * @param [options.position] - The position of the background image.
   */
  constructor({
    path,
    position,
  }: {
    path: string
    position: IVector2 | Vector2Tuple
  }) {
    super({ path, position, graphicType: GraphicType.Background })
  }
}
