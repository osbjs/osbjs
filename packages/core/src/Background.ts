import { GraphicsStoryboardObject } from './GraphicsStoryboardObject'
import { Vector2 } from './Vector2'

export class Background extends GraphicsStoryboardObject {
  constructor({ path, position }: { path: string; position?: Vector2 }) {
    super({ path, position })
  }

  toString(): string {
    let result = `0,0,${this.path},"${this.path}",${this.position}\n`
    result += this.compiledCommands
    return result
  }
}
