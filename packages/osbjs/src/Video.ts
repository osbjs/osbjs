import { GraphicsStoryboardObject } from './GraphicsStoryboardObject'
import { Timestamp } from './Timestamp'
import { Vector2 } from './Vector2'

export class Video extends GraphicsStoryboardObject {
  startTime: Timestamp
  /**
   * @param options - The options for initializing the video.
   * @param options.path - The path to the video's file relative to the beatmap folder.
   * @param options.startTime - The start time of the video.
   * @param options.position - The position of the video.
   */
  constructor({
    path,
    startTime,
    position,
  }: {
    path: string
    startTime: number | string
    position: Vector2
  }) {
    super({
      path,
      position,
    })
    this.startTime = new Timestamp(startTime)
  }

  toString(): string {
    let result = `Video,${this.startTime},"${this.path}",${this.position}\n`
    result += this.compiledCommands
    return result
  }
}
