import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'

/**
 * Background image.
 */
export class Background {
  /** The path to the image file. */
  readonly path: string
  /** The position of the element. */
  readonly position: Vector2

  constructor({
    path,
    position,
  }: {
    /**
     * The path to the video's file relative to the beatmap folder.
     */
    path: string
    /**
     * The position of the background image.
     */
    position: IVector2 | Vector2Tuple
  }) {
    this.path = path
    this.position = new Vector2(position)
  }

  toString(): string {
    return `0,0,"${this.path}",${this.position}`
  }
}
