import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'

/**
 * Background image.
 */
export class Background {
  /** The path to the image file. */
  readonly path: string
  /** The position of the element. */
  readonly position: Vector2
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
    this.path = path
    this.position = new Vector2(position)
  }

  toString(): string {
    return `0,0,"${this.path},${this.position}\n`
  }
}
