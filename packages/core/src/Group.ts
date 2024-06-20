import { StoryboardObject } from './StoryboardObject'

export class Group extends StoryboardObject {
  readonly children: StoryboardObject[]

  constructor() {
    super()
    this.children = []
  }

  add(...children: StoryboardObject[]) {
    this.children.push(...children)
  }

  toString(): string {
    return this.children.join('')
  }
}
