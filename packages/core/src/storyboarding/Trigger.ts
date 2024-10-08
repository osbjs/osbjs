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

export class Trigger extends CompoundCommand {
  triggerType: TriggerType
  startTime: Timestamp
  endTime: Timestamp

  constructor({
    triggerType,
    startTime,
    endTime,
    commands,
  }: {
    triggerType: TriggerType
    startTime: string | number | Timestamp
    endTime: string | number | Timestamp
    commands?: TypedCommand[]
  }) {
    super({
      event: 'T',
      commands,
    })
    this.triggerType = triggerType
    this.startTime =
      startTime instanceof Timestamp ? startTime : new Timestamp(startTime)
    this.endTime =
      endTime instanceof Timestamp ? endTime : new Timestamp(endTime)
  }
}
