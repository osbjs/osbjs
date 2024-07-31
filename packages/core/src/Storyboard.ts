import { Group } from './Group'

export class Storyboard extends Group {
  constructor() {
    super()
  }

  override toString(): string {
    return this.children.map(c => c.toString()).join('')
  }
}
