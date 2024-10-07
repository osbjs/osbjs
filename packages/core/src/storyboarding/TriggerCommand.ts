import type { Timestamp } from '../types/Timestamp'
import { CompoundCommand } from './CompoundCommand'

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

export class TriggerCommand extends CompoundCommand {
  readonly triggerType: TriggerType
  readonly startTime: Timestamp
  readonly endTime: Timestamp

  constructor({
    triggerType,
    startTime,
    endTime,
  }: {
    triggerType: TriggerType
    startTime: Timestamp
    endTime: Timestamp
  }) {
    super({
      event: 'T',
    })
    this.triggerType = triggerType
    this.startTime = startTime
    this.endTime = endTime
  }
}
