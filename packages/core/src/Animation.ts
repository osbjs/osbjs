import {
  GraphicsStoryboardObject,
  Layer,
  Origin,
} from './GraphicsStoryboardObject'
import { Vector2 } from './Vector2'

/**
 * A moving image.
 */
export class Animation extends GraphicsStoryboardObject {
  frameCount: number
  frameDelay: number
  loop: boolean
  /**
   * @param options - The options for initializing the animation.
   * @param options.path - The path to the image's file relative to the beatmap folder.
   * @param options.layer - The layer on which the animation resides.
   * @param options.origin - The origin point of the animation.
   * @param options.position - The position of the animation.
   * @param options.frameCount - Indicates how many frames the animation has.
   * @param options.frameDelay - Indicates how many milliseconds should be in between each frame.
   * @param options.forever - Indicates if the animation should loop or not.
   */
  constructor({
    path,
    layer,
    origin,
    position,
    frameCount,
    frameDelay,
    loop,
  }: {
    path: string
    layer: Layer
    origin: Origin
    position: Vector2
    frameCount: number
    frameDelay: number
    loop: boolean
  }) {
    super({ path, layer, origin, position })
    this.frameCount = frameCount
    this.frameDelay = frameDelay
    this.loop = loop
  }

  toString(): string {
    const loopType = this.loop ? 'LoopForever' : 'LoopOnce'
    let result = `Animation,${this.layer},${this.origin},"${this.path}",${this.position},${this.frameCount},${this.frameDelay},${loopType}\n`
    result += this.compiledCommands
    return result
  }
}
