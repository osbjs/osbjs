import { Vector2 } from '../../Math'

export const PlayfieldSize = new Vector2(512, 384)
export const StoryboardSize = new Vector2(640, 480)
export const PlayfieldToStoryboardOffset = new Vector2((StoryboardSize.x - PlayfieldSize.x) * 0.5, (StoryboardSize.y - PlayfieldSize.y) * 0.75 - 16)
export const WidescreenStoryboardSize = new Vector2((StoryboardSize.y * 16) / 9, StoryboardSize.y)
