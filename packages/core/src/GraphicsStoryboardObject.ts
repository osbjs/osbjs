import { Color3 } from './Color3'
import { StoryboardObject } from './StoryboardObject'
import { Vector2 } from './Vector2'

export type Layer = 'Background' | 'Foreground' | 'Fail' | 'Pass' | 'Overlay'
export type Origin =
  | 'TopLeft'
  | 'TopCentre'
  | 'TopRight'
  | 'CentreLeft'
  | 'Centre'
  | 'CentreRight'
  | 'BottomLeft'
  | 'BottomCentre'
  | 'BottomRight'

export const Easing = {
  Linear: 0,
  Out: 1,
  In: 2,
  InQuad: 3,
  OutQuad: 4,
  InOutQuad: 5,
  InCubic: 6,
  OutCubic: 7,
  InOutCubic: 8,
  InQuart: 9,
  OutQuart: 10,
  InOutQuart: 11,
  InQuint: 12,
  OutQuint: 13,
  InOutQuint: 14,
  InSine: 15,
  OutSine: 16,
  InOutSine: 17,
  InExpo: 18,
  OutExpo: 19,
  InOutExpo: 20,
  InCirc: 21,
  OutCirc: 22,
  InOutCirc: 23,
  InElastic: 24,
  OutElastic: 25,
  OutElasticHalf: 26,
  OutElasticQuarter: 27,
  InOutElastic: 28,
  InBack: 29,
  OutBack: 30,
  InOutBack: 31,
  InBounce: 32,
  OutBounce: 33,
  InOutBounce: 34,
} as const

export interface Command {
  event: 'F' | 'S' | 'V' | 'M' | 'MX' | 'MY' | 'P' | 'R'
  startTime: number | Timestamp
  endTime?: number | Timestamp
  easing?: number
  startValue: number | Vector2 | Color3 | string
  endValue?: number | Vector2 | Color3 | string
}

export interface LoopCommand {
  event: 'L'
  loopCount: number
  commands: Command[]
}

export type SampleSet = 'All' | 'Normal' | 'Soft' | 'Drum' | ''
export type Addition = 'Whistle' | 'Finish' | 'Clap' | ''
export type CustomSampleSet = number | ''
export type TriggerType =
  `HitSound${SampleSet}${SampleSet}${Addition}${CustomSampleSet}`
export type Timestamp = `${number}:${number}:${number}`

export interface TriggerCommand {
  event: 'T'
  triggerType: TriggerType
  startTime: number | Timestamp
  endTime: number | Timestamp
  commands: Command[]
}

/**
 * Represents an abstract graphics element with commands for animations and transformations.
 * @abstract
 */
export abstract class GraphicsStoryboardObject extends StoryboardObject {
  /** Array of commands for animations and transformations. */
  readonly commands: (Command | LoopCommand | TriggerCommand)[]
  /** The layer on which the element resides. */
  readonly layer?: Layer
  /** The origin point of the element. */
  readonly origin?: Origin
  /** The path to the element's resource. */
  readonly path: string
  /** The position of the element. */
  readonly position?: Vector2

  /**
   * Creates an instance of GraphicsElement.
   * @param options - The options for initializing the GraphicsElement.
   * @param options.path - The path to the element's resource.
   * @param [options.layer] - The layer on which the element resides.
   * @param [options.origin] - The origin point of the element.
   * @param [options.position] - The position of the element.
   */
  constructor({
    path,
    layer,
    origin,
    position,
  }: {
    path: string
    layer?: Layer
    origin?: Origin
    position?: Vector2
  }) {
    super()
    this.commands = []
    this.layer = layer
    this.origin = origin
    this.path = path
    this.position = position
  }

  /**
   * Adds a fade animation command to the element's commands.
   * @param params - Parameters for the fade animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting value of the fade.
   * @param [params.endValue] - The ending value of the fade.
   * @param [params.easing] - The easing function for the fade animation.
   */
  fade(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
    startValue: number
    endValue?: number
    easing?: number
  }) {
    this.commands.push({ ...params, event: 'F' })
  }

  /**
   * Adds a move animation command to the element's commands.
   * @param params - Parameters for the move animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting position of the move.
   * @param [params.endValue] - The ending position of the move.
   * @param [params.easing] - The easing function for the move animation.
   */
  move(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
    startValue: Vector2
    endValue?: Vector2
    easing?: number
  }) {
    this.commands.push({ ...params, event: 'M' })
  }

  /**
   * Adds a moveX animation command to the element's commands.
   * @param params - Parameters for the moveX animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting X position of the move.
   * @param [params.endValue] - The ending X position of the move.
   * @param [params.easing] - The easing function for the moveX animation.
   */
  moveX(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
    startValue: number
    endValue?: number
    easing?: number
  }) {
    this.commands.push({ ...params, event: 'MX' })
  }

  /**
   * Adds a moveY animation command to the element's commands.
   * @param params - Parameters for the moveY animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting Y position of the move.
   * @param [params.endValue] - The ending Y position of the move.
   * @param [params.easing] - The easing function for the moveY animation.
   */
  moveY(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
    startValue: number
    endValue?: number
    easing?: number
  }) {
    this.commands.push({ ...params, event: 'MY' })
  }

  /**
   * Adds a scale animation command to the element's commands.
   * @param params - Parameters for the scale animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting scale value or vector.
   * @param [params.endValue] - The ending scale value or vector.
   * @param [params.easing] - The easing function for the scale animation.
   */
  scale(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
    startValue: number | Vector2
    endValue?: number | Vector2
    easing?: number
  }) {
    this.commands.push({
      ...params,
      event: params.startValue instanceof Vector2 ? 'V' : 'S',
    })
  }

  /**
   * Adds a rotate animation command to the element's commands.
   * @param params - Parameters for the rotate animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting rotation angle.
   * @param [params.endValue] - The ending rotation angle.
   * @param [params.easing] - The easing function for the rotate animation.
   */
  rotate(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
    startValue: number
    endValue?: number
    easing?: number
  }) {
    this.commands.push({ ...params, event: 'R' })
  }

  /**
   * Flip the element horizontally.
   * @param params - Parameters for the horizontal flip animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   */
  flipHorizontally(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
  }) {
    this.commands.push({ ...params, startValue: 'H', event: 'R' })
  }

  /**
   * Flip the element vertically.
   * @param params - Parameters for the vertical flip animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   */
  flipVertically(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
  }) {
    this.commands.push({ ...params, startValue: 'V', event: 'R' })
  }

  /**
   * Use additive-color blending instead of alpha-blending.
   * @param params - Parameters for the additive color blending animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   */
  additiveColorBlending(params: {
    startTime: number | Timestamp
    endTime?: number | Timestamp
  }) {
    this.commands.push({ ...params, startValue: 'A', event: 'R' })
  }

  protected get compiledCommands(): string {
    let result = ''
    for (const command of this.commands) {
      if (command.event === 'T') {
        // is trigger command
        result += ` T,${command.triggerType},${command.startTime},${command.endTime}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.startValue}`
          if (childCommand.endValue) result += `,${childCommand.endValue}`
          result += '\n'
        }
      } else if (command.event === 'L') {
        // is loop command
        result += ` L,${command.loopCount}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.startValue}`
          if (childCommand.endValue) result += `,${childCommand.endValue}`
          result += '\n'
        }
      } else {
        result += ` ${command.event},${command.easing},${command.startTime},${command.endTime},${command.startValue}`
        if (command.endValue) result += `,${command.endValue}`
        result += '\n'
      }
    }

    return result
  }
}
