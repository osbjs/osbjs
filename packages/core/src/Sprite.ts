import { Graphic } from './Graphic'
import type { Layer } from './Layer'
import type { Origin } from './Origin'
import { Vector2, type IVector2, type Vector2Tuple } from './Vector2'

/** A basic image. */
export class Sprite extends Graphic {
  /** The layer on which the element resides. */
  readonly layer: Layer
  /** The origin point of the element. */
  readonly origin: Origin
  /**
   * @param options - The options for initializing the Sprite.
   * @param options.path - The path to the image's file relative to the beatmap folder.
   * @param [options.layer] - The layer on which the sprite resides.
   * @param [options.origin] - The origin point of the sprite.
   * @param [options.position] - The position of the sprite.
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
    position: IVector2 | Vector2Tuple | Vector2
  }) {
    super({ path, position })
    this.layer = layer
    this.origin = origin
  }

  toOsbString(): string {
    let result = `Sprite,${this.layer},${this.origin},"${this.path}",${this.position}\n${this.compileCommands()}`
    return result
  }
}
