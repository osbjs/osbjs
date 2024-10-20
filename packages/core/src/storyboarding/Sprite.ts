import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'
import type { Command } from './Command'
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
    commands,
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

    /**
     * The commands of this sprite.
     */
    commands?: Command[]
  }) {
    super({ path, position, commands })
    this.layer = layer
    this.origin = origin
  }

  toString(): string {
    let result = `Sprite,${this.layer},${this.origin},"${this.path}",${this.position}\n${this.compiledCommands()}`
    return result
  }
}
