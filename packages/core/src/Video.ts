import { GraphicsStoryboardObject } from './GraphicsStoryboardObject'

export class Video extends GraphicsStoryboardObject {
  startTime: number
  /**
   * @param options - The options for initializing the video.
   * @param options.path - The path to the image's file relative to the beatmap folder.
   */
  constructor({ path, startTime }: { path: string; startTime: number }) {
    super({
      path,
    })
    this.startTime = startTime
  }

  toString(): string {
    let result = `Video,${this.startTime},"${this.path}"\n`
    result += this.compiledCommands
    return result
  }
}
