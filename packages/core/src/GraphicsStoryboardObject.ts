import { Color3, Color3Tuple, IColor3 } from './Color3'
import { StoryboardObject } from './StoryboardObject'
import { Timestamp } from './Timestamp'
import { Vector2, IVector2, Vector2Tuple } from './Vector2'

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

export type NumberCommand = {
  event: 'F' | 'S' | 'R' | 'MX' | 'MY'
  startValue: number
  endValue?: number
}

export type Vector2Command = {
  event: 'V' | 'M'
  startValue: Vector2
  endValue?: Vector2
}

export type Color3Command = {
  event: 'C'
  startValue: Color3
  endValue?: Color3
}

export type ParameterCommand = {
  event: 'P'
  startValue: 'H' | 'V' | 'A'
}

export type LoopCommand = {
  event: 'L'
  loopCount: number
  commands: Command[]
}

export type TriggerCommand = {
  event: 'T'
  triggerType: TriggerType
  startTime: Timestamp
  endTime: Timestamp
  commands: Command[]
}

export type Command =
  | (NumberCommand | Vector2Command | Color3Command | ParameterCommand) & {
      startTime: Timestamp
      endTime?: Timestamp
      easing?: number
    }

export type SampleSet = 'All' | 'Normal' | 'Soft' | 'Drum' | ''
export type Addition = 'Whistle' | 'Finish' | 'Clap' | ''
export type CustomSampleSet = number | ''
export type TriggerType =
  `HitSound${SampleSet}${SampleSet}${Addition}${CustomSampleSet}`

/**
 * Represents an abstract graphics element with commands for animations and transformations.
 * @abstract
 */
export abstract class GraphicsStoryboardObject extends StoryboardObject {
  /** Array of commands for animations and transformations. */
  readonly commands: (Command | TriggerCommand | LoopCommand)[]
  /** The layer on which the element resides. */
  readonly layer?: Layer
  /** The origin point of the element. */
  readonly origin?: Origin
  /** The path to the element's resource. */
  readonly path: string
  /** The position of the element. */
  readonly position?: Vector2
  private _currentCompoundComand?: LoopCommand | TriggerCommand

  /**
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
    position?: IVector2 | Vector2Tuple | Vector2
  }) {
    super()
    this.commands = []
    this.layer = layer
    this.origin = origin
    this.path = path
    this.position = new Vector2(position)
  }

  /**
   * Change the opacity of the object (how transparent it is).
   * @param params - Parameters for the fade animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting value of the fade.
   * @param [params.endValue] - The ending value of the fade.
   * @param [params.easing] - The easing function for the fade animation.
   */
  fade({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: number
    endValue?: number
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'F',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'F',
      })
    }
    return this
  }

  /**
   * Move the object to a new position in the play area.
   * @param params - Parameters for the move animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting position of the move.
   * @param [params.endValue] - The ending position of the move.
   * @param [params.easing] - The easing function for the move animation.
   */
  move({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: IVector2 | Vector2Tuple
    endValue?: IVector2 | Vector2Tuple
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: new Vector2(startValue),
        endValue: endValue ? new Vector2(endValue) : undefined,
        easing,
        event: 'M',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: new Vector2(startValue),
        endValue: endValue ? new Vector2(endValue) : undefined,
        easing,
        event: 'M',
      })
    }
    return this
  }

  /**
   * Move the object along the x axis.
   * @param params - Parameters for the moveX animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting X position of the move.
   * @param [params.endValue] - The ending X position of the move.
   * @param [params.easing] - The easing function for the moveX animation.
   */
  moveX({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: number
    endValue?: number
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'MX',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'MX',
      })
    }
    return this
  }

  /**
   * Move the object along the y axis.
   * @param params - Parameters for the moveY animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting Y position of the move.
   * @param [params.endValue] - The ending Y position of the move.
   * @param [params.easing] - The easing function for the moveY animation.
   */
  moveY({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: number
    endValue?: number
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'MY',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'MY',
      })
    }
    return this
  }

  /**
   * Change the size of the object relative to its original size.
   * @param params - Parameters for the scale animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting scale value or vector.
   * @param [params.endValue] - The ending scale value or vector.
   * @param [params.easing] - The easing function for the scale animation.
   */
  scale({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: number
    endValue?: number
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'S',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'S',
      })
    }
  }

  /**
   * Scale the object each side invidually.
   * @param params - Parameters for the scale animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting scale value or vector.
   * @param [params.endValue] - The ending scale value or vector.
   * @param [params.easing] - The easing function for the scale animation.
   */
  scaleVec({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: IVector2 | Vector2Tuple
    endValue?: IVector2 | Vector2Tuple
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: new Vector2(startValue),
        endValue: endValue ? new Vector2(endValue) : undefined,
        easing,
        event: 'V',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: new Vector2(startValue),
        endValue: endValue ? new Vector2(endValue) : undefined,
        easing,
        event: 'V',
      })
    }
  }

  /**
   * Rotate the object around its origin.
   * @param params - Parameters for the rotate animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting rotation angle.
   * @param [params.endValue] - The ending rotation angle.
   * @param [params.easing] - The easing function for the rotate animation.
   */
  rotate({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: number
    endValue?: number
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'R',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue,
        endValue,
        easing,
        event: 'R',
      })
    }
    return this
  }

  /**
   * The virtual light source color on the object. The colors of the pixels on the object are determined subtractively.
   * @param params - Parameters for the rotate animation.
   * @param params.startTime - The start time of the animation.
   * @param [params.endTime] - The end time of the animation.
   * @param params.startValue - The starting rotation angle.
   * @param [params.endValue] - The ending rotation angle.
   * @param [params.easing] - The easing function for the rotate animation.
   */
  color({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: number | string
    endTime?: number | string
    startValue: IColor3 | Color3Tuple
    endValue?: IColor3 | Color3Tuple
    easing?: number
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: new Color3(startValue),
        endValue: endValue ? new Color3(endValue) : undefined,
        easing,
        event: 'C',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: new Color3(startValue),
        endValue: endValue ? new Color3(endValue) : undefined,
        easing,
        event: 'C',
      })
    }
    return this
  }

  /**
   * Flip the element horizontally.
   * @param params - Parameters for the horizontal flip effect.
   * @param params.startTime - The start time of the effect.
   * @param [params.endTime] - The end time of the effect.
   */
  flipH({
    startTime,
    endTime,
  }: {
    startTime: number | string
    endTime?: number | string
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: 'H',
        event: 'P',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: 'H',
        event: 'P',
      })
    }
    return this
  }

  /**
   * Flip the element vertically.
   * @param params - Parameters for the vertical flip effect.
   * @param params.startTime - The start time of the effect.
   * @param [params.endTime] - The end time of the effect.
   */
  flipV({
    startTime,
    endTime,
  }: {
    startTime: number | string
    endTime?: number | string
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: 'V',
        event: 'P',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: 'V',
        event: 'P',
      })
    }
    return this
  }

  /**
   * Use additive-color blending instead of alpha-blending.
   * @param params - Parameters for the additive color blending effect.
   * @param params.startTime - The start time of the effect.
   * @param [params.endTime] - The end time of the effect.
   */
  additive({
    startTime,
    endTime,
  }: {
    startTime: number | string
    endTime?: number | string
  }) {
    if (this._currentCompoundComand) {
      this._currentCompoundComand.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: 'A',
        event: 'P',
      })
    } else {
      this.commands.push({
        startTime: new Timestamp(startTime),
        endTime: endTime ? new Timestamp(endTime) : undefined,
        startValue: 'A',
        event: 'P',
      })
    }
    return this
  }

  /**
   * Start a loop group.
   * @param params - Parameters for the loop group.
   * @param params.loopCount -
   */
  startLoopGroup({ loopCount }: { loopCount: number }) {
    if (this._currentCompoundComand)
      throw new Error(
        'You need to end the loop/trigger command group before creating a new one',
      )

    this._currentCompoundComand = {
      event: 'L',
      loopCount,
      commands: [],
    }
    this.commands.push(this._currentCompoundComand)
    return this
  }

  /**
   * Start a trigger group command.
   * @param params - Parameters for the trigger group.
   */
  startTriggerGroup({
    triggerType,
    startTime,
    endTime,
  }: {
    triggerType: TriggerType
    startTime: number | string
    endTime: number | string
  }) {
    if (this._currentCompoundComand)
      throw new Error(
        'You need to end the loop/trigger command group before creating a new one',
      )

    this._currentCompoundComand = {
      event: 'T',
      triggerType,
      startTime: new Timestamp(startTime),
      endTime: new Timestamp(endTime),
      commands: [],
    }
    this.commands.push(this._currentCompoundComand)
    return this
  }

  /**
   * End the current loop/trigger group.
   */
  endGroup() {
    delete this._currentCompoundComand
    return this
  }

  protected get compiledCommands(): string {
    let result = ''
    for (const command of this.commands) {
      if (command.event === 'T') {
        // is trigger command
        result += ` T,${command.triggerType},${command.startTime},${command.endTime}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.startValue}`
          if (childCommand.event !== 'P' && childCommand.endValue)
            result += `,${childCommand.endValue}`
          result += '\n'
        }
      } else if (command.event === 'L') {
        // is loop command
        result += ` L,${command.loopCount}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.startValue}`
          if (childCommand.event !== 'P' && childCommand.endValue)
            result += `,${childCommand.endValue}`
          result += '\n'
        }
      } else {
        result += ` ${command.event},${command.easing},${command.startTime},${command.endTime},${command.startValue}`
        if (command.event !== 'P' && command.endValue)
          result += `,${command.endValue}`
        result += '\n'
      }
    }

    return result
  }
}
