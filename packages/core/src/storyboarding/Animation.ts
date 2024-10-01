import { Graphic } from './Graphic'
import type { Layer } from './Layer'
import type { Origin } from './Origin'
import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'

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
  /**
   * @param options - The options for initializing the animation.
   * @param options.path - The path to the image's file relative to the beatmap folder.
   * @param [options.layer] - The layer on which the animation resides.
   * @param [options.origin] - The origin point of the animation.
   * @param [options.position] - The position of the animation.
   * @param options.frameCount - Indicates how many frames the animation has.
   * @param options.frameDelay - Indicates how many milliseconds should be in between each frame.
   * @param options.repeat - Indicates if the animation should loop or not.
   */
  constructor({
    path,
    layer,
    origin,
    position,
    frameCount,
    frameDelay,
    repeat,
  }: {
    path: string
    layer: Layer
    origin: Origin
    position: IVector2 | Vector2Tuple | Vector2
    frameCount: number
    frameDelay: number
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
