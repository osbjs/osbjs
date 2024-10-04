import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'
import { Graphic } from './Graphic'
import type { Layer } from './Layer'
import type { Origin } from './Origin'

/**  A moving image. */
export class Animation extends Graphic {
  /** The layer on which the element resides. */
  readonly layer: Layer
  /** The origin point of the element. */
  readonly origin: Origin
  /** Indicates how many frames the animation has. */
  readonly frameCount: number
  /** Indicates how many milliseconds should be in between each frame. */
  readonly frameDelay: number
  /** Indicates if the animation should loop or not. */
  readonly repeat: boolean

  constructor({
    path,
    layer,
    origin,
    position,
    frameCount,
    frameDelay,
    repeat,
  }: {
    /**
     * The path to the image's file relative to the beatmap folder.
     */
    path: string

    /**
     * The layer on which the animation resides.
     */
    layer: Layer

    /**
     * The origin point of the animation.
     */
    origin: Origin

    /**
     * The position of the animation.
     */
    position: IVector2 | Vector2Tuple | Vector2

    /**
     * Indicates how many frames the animation has.
     */
    frameCount: number

    /**
     * Indicates how many milliseconds should be in between each frame.
     */
    frameDelay: number

    /**
     * Indicates if the animation should loop or not.
     */
    repeat: boolean
  }) {
    super({ path, position })
    this.layer = layer
    this.origin = origin
    this.frameCount = frameCount
    this.frameDelay = frameDelay
    this.repeat = repeat
  }

  toString(): string {
    const loopType = this.repeat ? 'LoopForever' : 'LoopOnce'
    let result = `Animation,${this.layer},${this.origin},"${this.path}",${this.position},${
      this.frameCount
    },${this.frameDelay},${loopType}\n${this.compileCommands()}`
    return result
  }
}
