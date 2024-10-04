import { Color3, type Color3Tuple, type IColor3 } from '../types/Color3'
import { Timestamp } from '../types/Timestamp'
import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'
import { Command } from './Command'
import type { CompoundCommand } from './CompoundCommand'
import type { Easing } from './Easing'
import { LoopCommand } from './LoopCommand'
import { TriggerCommand, type TriggerType } from './TriggerCommand'
import { TypedCommand } from './TypedCommand'

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
   */
  fade({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /**
     * The start time of the animation.
     */
    startTime: number | string

    /**
     * The end time of the animation.
     */
    endTime?: number | string

    /**
     * The starting value of the fade.
     */
    startValue: number

    /**
     * The ending value of the fade.
     */
    endValue?: number

    /**
     * The easing function for the fade animation.
     */
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
   */
  move({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /**
     * The start time of the animation.
     */
    startTime: number | string

    /**
     * The end time of the animation.
     */
    endTime?: number | string

    /**
     * The starting position of the move.
     */
    startValue: IVector2 | Vector2Tuple

    /**
     * The ending position of the move.
     */
    endValue?: IVector2 | Vector2Tuple

    /**
     * The easing function for the move animation.
     */
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
   */
  moveX({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /** The start time of the animation. */
    startTime: number | string

    /** The end time of the animation. */
    endTime?: number | string

    /** The starting X position of the move. */
    startValue: number

    /** The ending X position of the move. */
    endValue?: number

    /** The easing function for the moveX animation. */
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
   */
  moveY({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /** The start time of the animation. */
    startTime: number | string

    /** The end time of the animation. */
    endTime?: number | string

    /** The starting Y position of the move. */
    startValue: number

    /** The ending Y position of the move. */
    endValue?: number

    /** The easing function for the moveY animation. */
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
   */
  scale({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /** The start time of the animation. */
    startTime: number | string

    /** The end time of the animation. */
    endTime?: number | string

    /** The starting scale value or vector. */
    startValue: number

    /** The ending scale value or vector. */
    endValue?: number

    /** The easing function for the scale animation. */
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
   * Scale the object each side individually.
   */
  scaleVec({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /** The start time of the animation. */
    startTime: number | string

    /** The end time of the animation. */
    endTime?: number | string

    /** The starting scale value or vector. */
    startValue: IVector2 | Vector2Tuple

    /** The ending scale value or vector. */
    endValue?: IVector2 | Vector2Tuple

    /** The easing function for the scale animation. */
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
   */
  rotate({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /** The start time of the animation. */
    startTime: number | string

    /** The end time of the animation. */
    endTime?: number | string

    /** The starting rotation angle. */
    startValue: number

    /** The ending rotation angle. */
    endValue?: number

    /** The easing function for the rotate animation. */
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
   */
  color({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    /** The start time of the animation. */
    startTime: number | string

    /** The end time of the animation. */
    endTime?: number | string

    /** The starting color value. */
    startValue: IColor3 | Color3Tuple

    /** The ending color value. */
    endValue?: IColor3 | Color3Tuple

    /** The easing function for the color animation. */
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
   */
  flipH({
    startTime,
    endTime,
  }: {
    /** The start time of the effect. */
    startTime: number | string

    /** The end time of the effect. */
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
   */
  flipV({
    startTime,
    endTime,
  }: {
    /** The start time of the effect. */
    startTime: number | string

    /** The end time of the effect. */
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
   */
  additive({
    startTime,
    endTime,
  }: {
    /** The start time of the effect. */
    startTime: number | string

    /** The end time of the effect. */
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
   */
  startLoopGroup({
    loopCount,
    startTime,
  }: {
    /** The number of times to loop. */
    loopCount: number

    /** The start time of the loop group. */
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
   */
  startTriggerGroup({
    triggerType,
    startTime,
    endTime,
  }: {
    /** The type of trigger for the group. */
    triggerType: TriggerType

    /** The start time of the trigger group. */
    startTime: number | string

    /** The end time of the trigger group. */
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

  protected compileCommands(): string {
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

  abstract toString(): string
}
