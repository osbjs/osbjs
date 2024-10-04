import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'
import { Graphic } from './Graphic'
import type { Layer } from './Layer'
import type { Origin } from './Origin'

/** A basic image. */
export class Sprite extends Graphic {
  /** The layer on which the element resides. */
  readonly layer: Layer
  /** The origin point of the element. */
  readonly origin: Origin
  
  constructor({
    path,
    layer,
    origin,
    position,
  }: {
    /**
     * The path to the image's file relative to the beatmap folder.
     */
    path: string

    /**
     * The layer on which the sprite resides.
     */
    layer: Layer

    /**
     * The origin point of the sprite.
     */
    origin: Origin

    /**
     * The position of the sprite.
     */
    position: IVector2 | Vector2Tuple | Vector2
  }) {
    super({ path, position })
    this.layer = layer
    this.origin = origin
  }

  toString(): string {
    let result = `Sprite,${this.layer},${this.origin},"${this.path}",${this.position}\n${this.compileCommands()}`
    return result
  }
}
