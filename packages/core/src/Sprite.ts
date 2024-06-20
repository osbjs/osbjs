import {
  GraphicsStoryboardObject,
  Layer,
  Origin,
} from './GraphicsStoryboardObject'
import { Vector2 } from './Vector2'

/**
 * A basic image.
 */
export class Sprite extends GraphicsStoryboardObject {
  /**
   * @param options - The options for initializing the Sprite.
   * @param options.path - The path to the image's file relative to the beatmap folder.
   * @param options.layer - The layer on which the sprite resides.
   * @param options.origin - The origin point of the sprite.
   * @param options.position - The position of the sprite.
   */
  constructor({
    path,
    layer,
    origin,
    position,
  }: {
    path: string
    layer: Layer
    origin: Origin
    position: Vector2
  }) {
    super({ path, layer, origin, position })
  }

  toString(): string {
    let result = `Sprite,${this.layer},${this.origin},"${this.path}",${this.position}\n`
    result += this.compiledCommands
    return result
  }
}
