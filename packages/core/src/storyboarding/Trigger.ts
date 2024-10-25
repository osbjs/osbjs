import { Timestamp } from '../types/Timestamp'
import { CompoundCommand } from './CompoundCommand'
import type { TypedCommand } from './TypedCommand'

type SampleSet = 'All' | 'Normal' | 'Soft' | 'Drum' | ''
type Addition = 'Whistle' | 'Finish' | 'Clap' | ''
type CustomSampleSet = number | ''
export type TriggerType =
  | `HitSound${SampleSet}${SampleSet}${Addition}${CustomSampleSet}`
  | 'Passing'
  | 'Failing'

export function isTriggerType(input: unknown): input is TriggerType {
  if (typeof input !== 'string') return false

  const hitSoundPattern = new RegExp(
    `^HitSound(All|Normal|Soft|Drum|)(All|Normal|Soft|Drum|)(Whistle|Finish|Clap|)(\\d*)$`,
  )

  return (
    input === 'Passing' || input === 'Failing' || hitSoundPattern.test(input)
  )
}

/**
 * A command group that will trigger when a specific condition is satisfied.
 */
export class Trigger extends CompoundCommand {
  readonly triggerType: TriggerType
  readonly endTime: Timestamp

  constructor({
    triggerType,
    startTime,
    endTime,
    commands,
  }: {
    /**
     * The condition to trigger this group.
     */
    triggerType: TriggerType
    /**
     * The start time of the trigger group.
     */
    startTime: string | number | Timestamp
    /**
     * The end time of the trigger group.
     */
    endTime: string | number | Timestamp
    /**
     * List of child commands that will be triggered.
     */
    commands?: TypedCommand[]
  }) {
    super({
      event: 'T',
      commands,
      startTime,
    })
    this.triggerType = triggerType
    this.endTime =
      endTime instanceof Timestamp ? endTime : new Timestamp(endTime)
  }
}
