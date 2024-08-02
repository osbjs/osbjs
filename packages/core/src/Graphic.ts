import { Color3, type Color3Tuple, type IColor3 } from './Color3'
import { Command } from './Command'
import type { CompoundCommand } from './CompoundCommand'
import type { Easing } from './Easing'
import { LoopCommand } from './LoopCommand'
import { Timestamp } from './Timestamp'
import { TriggerCommand, type TriggerType } from './TriggerCommand'
import { TypedCommand } from './TypedCommand'
import { Vector2, type IVector2, type Vector2Tuple } from './Vector2'

export enum GraphicType {
  Sprite,
  Animation,
  Video,
  Background,
}

export abstract class Graphic {
  /** The path to the element's resource. */
  readonly path: string
  /** The position of the element. */
  readonly position: Vector2
  /** Array of commands for animations and transformations. */
  readonly commands: Command[] = []

  private _currentCompoundCommand: CompoundCommand | null

  constructor({
    path,
    position,
  }: {
    path: string
    position: IVector2 | Vector2Tuple
  }) {
    this.path = path
    this.position = new Vector2(position)
    this._currentCompoundCommand = null
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'F',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'F',
        }),
      )
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: new Vector2(startValue),
          endValue: endValue ? new Vector2(endValue) : undefined,
          easing,
          event: 'M',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: new Vector2(startValue),
          endValue: endValue ? new Vector2(endValue) : undefined,
          easing,
          event: 'M',
        }),
      )
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'MX',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'MX',
        }),
      )
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'MY',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'MY',
        }),
      )
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'S',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'S',
        }),
      )
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: new Vector2(startValue),
          endValue: endValue ? new Vector2(endValue) : undefined,
          easing,
          event: 'V',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: new Vector2(startValue),
          endValue: endValue ? new Vector2(endValue) : undefined,
          easing,
          event: 'V',
        }),
      )
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'R',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue,
          endValue,
          easing,
          event: 'R',
        }),
      )
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
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: new Color3(startValue),
          endValue: endValue ? new Color3(endValue) : undefined,
          easing,
          event: 'C',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: new Color3(startValue),
          endValue: endValue ? new Color3(endValue) : undefined,
          easing,
          event: 'C',
        }),
      )
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
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: 'H',
          event: 'P',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: 'H',
          event: 'P',
        }),
      )
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
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: 'V',
          event: 'P',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: 'V',
          event: 'P',
        }),
      )
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
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: 'A',
          event: 'P',
        }),
      )
    } else {
      this.commands.push(
        new TypedCommand({
          startTime: new Timestamp(startTime),
          endTime: endTime ? new Timestamp(endTime) : undefined,
          startValue: 'A',
          event: 'P',
        }),
      )
    }
    return this
  }

  /**
   * Start a loop group.
   * @param params - Parameters for the loop group.
   * @param params.loopCount -
   */
  startLoopGroup({
    loopCount,
    startTime,
  }: {
    loopCount: number
    startTime: number | string
  }) {
    this._currentCompoundCommand = new LoopCommand({
      loopCount,
      startTime: new Timestamp(startTime),
    })
    this.commands.push(this._currentCompoundCommand)
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
    this._currentCompoundCommand = new TriggerCommand({
      triggerType,
      startTime: new Timestamp(startTime),
      endTime: new Timestamp(endTime),
    })
    this.commands.push(this._currentCompoundCommand)
    return this
  }

  /**
   * End the current loop/trigger group.
   */
  endGroup() {
    this._currentCompoundCommand = null
    return this
  }

  compileCommands(): string {
    let result = ''
    for (const command of this.commands) {
      if (command instanceof TriggerCommand) {
        result += ` T,${command.triggerType},${command.startTime},${command.endTime}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.startValue}`
          if (childCommand.event !== 'P' && childCommand.endValue)
            result += `,${childCommand.endValue}`
          result += '\n'
        }
      }
      if (command instanceof LoopCommand) {
        result += ` L,${command.loopCount}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.startValue}`
          if (childCommand.event !== 'P' && childCommand.endValue)
            result += `,${childCommand.endValue}`
          result += '\n'
        }
      }
      if (command instanceof TypedCommand) {
        result += ` ${command.event},${command.easing},${command.startTime},${command.endTime},${command.startValue}`
        if (command.event !== 'P' && command.endValue)
          result += `,${command.endValue}`
        result += '\n'
      }
    }

    return result
  }

  abstract toOsbString(): string
}
