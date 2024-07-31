import { GraphicsStoryboardObject } from './GraphicsStoryboardObject'
import type { IVector2, Vector2Tuple, Vector2 } from './Vector2'

/**
 * Background image.
 */
export class Background extends GraphicsStoryboardObject {
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
    position?: IVector2 | Vector2Tuple | Vector2
  }) {
    super({ path, position })
  }

  toString(): string {
    let result = `0,0,${this.path},"${this.path}"`
    if (this.position) {
      result += `,${this.position}`
    }
    result += '\n'
    result += this.compiledCommands
    return result
  }
}
