import { StoryboardObject } from './StoryboardObject'

/**
 * A group/container of storyboard objects.
 */
export class Group extends StoryboardObject {
  readonly children: StoryboardObject[]

  constructor() {
    super()
    this.children = []
  }

  /**
   * Add storyboard objects to this group
   * @param children - Storyboard objects to be added
   */
  add(...children: StoryboardObject[]) {
    this.children.push(...children)
  }

  toString(): string {
    return this.children.map(c => c.toString()).join('')
  }
}
