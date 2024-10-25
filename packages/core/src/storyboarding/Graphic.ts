import { type Color3Tuple, type IColor3 } from '../types/Color3'
import { Timestamp } from '../types/Timestamp'
import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'
import { Command } from './Command'
import type { CompoundCommand } from './CompoundCommand'
import type { Easing } from './Easing'
import type { Layer } from './Layer'
import { Loop } from './Loop'
import type { Origin } from './Origin'
import { Trigger, type TriggerType } from './Trigger'
import {
  Additive,
  Color,
  Fade,
  FlipH,
  FlipV,
  Move,
  MoveX,
  MoveY,
  Rotate,
  Scale,
  ScaleVec,
  TypedCommand,
} from './TypedCommand'

export abstract class Graphic {
  /** The layer on which the element resides. */
  readonly layer: Layer
  /** The origin point of the element. */
  readonly origin: Origin
  /** The path to the element's resource. */
  readonly path: string
  /** The position of the element. */
  readonly position: Vector2
  /** Array of commands for animations and transformations. */
  readonly commands: Command[]

  private _currentCompoundCommand: CompoundCommand | null

  constructor({
    path,
    position,
    commands,
    layer,
    origin,
  }: {
    /**
     * The path to the element's resource.
     */
    path: string
    /**
     * The position of the element.
     */
    position: IVector2 | Vector2Tuple
    /**
     * The commands of this animation.
     */
    commands?: Command[]
    /**
     * The layer on which the animation resides.
     */
    layer: Layer

    /**
     * The origin point of the animation.
     */
    origin: Origin
  }) {
    this.layer = layer
    this.origin = origin
    this.path = path
    this.position = new Vector2(position)
    this._currentCompoundCommand = null
    this.commands = commands || []
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
    startTime: number | string | Timestamp

    /**
     * The end time of the animation.
     */
    endTime?: number | string | Timestamp

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
        new Fade({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new Fade({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /**
     * The end time of the animation.
     */
    endTime?: number | string | Timestamp

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
        new Move({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new Move({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /** The end time of the animation. */
    endTime?: number | string | Timestamp

    /** The starting X position of the move. */
    startValue: number

    /** The ending X position of the move. */
    endValue?: number

    /** The easing function for the moveX animation. */
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new MoveX({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new MoveX({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /** The end time of the animation. */
    endTime?: number | string | Timestamp

    /** The starting Y position of the move. */
    startValue: number

    /** The ending Y position of the move. */
    endValue?: number

    /** The easing function for the moveY animation. */
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new MoveY({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new MoveY({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /** The end time of the animation. */
    endTime?: number | string | Timestamp

    /** The starting scale value or vector. */
    startValue: number

    /** The ending scale value or vector. */
    endValue?: number

    /** The easing function for the scale animation. */
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new Scale({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new Scale({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /** The end time of the animation. */
    endTime?: number | string | Timestamp

    /** The starting scale value or vector. */
    startValue: IVector2 | Vector2Tuple

    /** The ending scale value or vector. */
    endValue?: IVector2 | Vector2Tuple

    /** The easing function for the scale animation. */
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new ScaleVec({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new ScaleVec({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /** The end time of the animation. */
    endTime?: number | string | Timestamp

    /** The starting rotation angle in radians. */
    startValue: number

    /** The ending rotation angle in radians. */
    endValue?: number

    /** The easing function for the rotate animation. */
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new Rotate({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new Rotate({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /** The end time of the animation. */
    endTime?: number | string | Timestamp

    /** The starting color value. */
    startValue: IColor3 | Color3Tuple

    /** The ending color value. */
    endValue?: IColor3 | Color3Tuple

    /** The easing function for the color animation. */
    easing?: Easing
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new Color({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
        }),
      )
    } else {
      this.commands.push(
        new Color({
          startTime,
          endTime,
          startValue,
          endValue,
          easing,
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
    startTime: number | string | Timestamp

    /** The end time of the effect. */
    endTime?: number | string | Timestamp
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new FlipH({
          startTime,
          endTime,
        }),
      )
    } else {
      this.commands.push(
        new FlipH({
          startTime,
          endTime,
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
    startTime: number | string | Timestamp

    /** The end time of the effect. */
    endTime?: number | string | Timestamp
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new FlipV({
          startTime,
          endTime,
        }),
      )
    } else {
      this.commands.push(
        new FlipV({
          startTime,
          endTime,
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
    startTime: number | string | Timestamp

    /** The end time of the effect. */
    endTime?: number | string | Timestamp
  }) {
    if (this._currentCompoundCommand) {
      this._currentCompoundCommand.commands.push(
        new Additive({
          startTime,
          endTime,
        }),
      )
    } else {
      this.commands.push(
        new Additive({
          startTime,
          endTime,
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
    startTime: number | string | Timestamp
  }) {
    this._currentCompoundCommand = new Loop({
      loopCount,
      startTime,
    })
    this.commands.push(this._currentCompoundCommand)
    return this
  }

  /**
   * Start a trigger group.
   */
  startTriggerGroup({
    triggerType,
    startTime,
    endTime,
  }: {
    /** The condition to trigger this group. */
    triggerType: TriggerType

    /** The start time of the trigger group. */
    startTime: number | string | Timestamp

    /** The end time of the trigger group. */
    endTime: number | string | Timestamp
  }) {
    this._currentCompoundCommand = new Trigger({
      triggerType,
      startTime,
      endTime,
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

  protected compiledCommands(): string {
    let result = ''
    for (const command of this.commands) {
      if (command instanceof Trigger) {
        result += ` T,${command.triggerType},${command.startTime},${command.endTime}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.endTime || ''},${childCommand.startValue}`
          if (childCommand.event !== 'P' && childCommand.endValue)
            result += `,${childCommand.endValue}`
          result += '\n'
        }
      }
      if (command instanceof Loop) {
        result += ` L,${command.startTime},${command.loopCount}\n`
        for (const childCommand of command.commands) {
          result += `  ${childCommand.event},${childCommand.easing},${childCommand.startTime},${childCommand.endTime || ''},${childCommand.startValue}`
          if (childCommand.event !== 'P' && childCommand.endValue)
            result += `,${childCommand.endValue}`
          result += '\n'
        }
      }
      if (command instanceof TypedCommand) {
        result += ` ${command.event},${command.easing},${command.startTime},${command.endTime || ''},${command.startValue}`
        if (command.event !== 'P' && command.endValue)
          result += `,${command.endValue}`
        result += '\n'
      }
    }

    return result.trimEnd()
  }

  abstract toString(): string
}
