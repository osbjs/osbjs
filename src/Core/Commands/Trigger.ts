import { CommandGroup } from './CommandGroup'

export class Trigger extends CommandGroup {
	triggerName: TriggerName
	startTime: number
	endTime: number
	/**
	 * Create a trigger group.
	 *
	 * Trigger loops can be used to trigger animations based on play-time events.
	 * Although called loops, trigger loops only execute once when triggered.
	 * Trigger loops are zero-based similar to normal loops.
	 * If two overlap, the first will be halted and replaced by a new loop from the beginning.
	 * If they overlap any existing storyboarded events, they will not trigger until those transformations are no in effect.
	 *
	 * Example:
	 * ```
	 * // create a trigger group
	 * const trigger = new Trigger("HitSoundClap", 1000, 3000)
	 * trigger.Fade(0, 1000, 1, 0.5) // this means sprite will start to fade if any clap hitsound is played during the time 1000 and 3000.
	 * // add trigger group to sprite
	 * sprite.trigger(trigger)
	 * ```
	 * @param triggerName The trigger condition. see https://osu.ppy.sh/wiki/en/Storyboard/Scripting/Compound_Commands.
	 * @param startTime Time in milliseconds/timestamp at which the trigger is valid.
	 * @param endTime Time in milliseconds/timestamp at which the trigger stops being valid.
	 */
	constructor(triggerName: TriggerName, startTime: number, endTime: number) {
		super(` T,${triggerName},${startTime},${endTime}\n`)

		this.triggerName = triggerName
		this.startTime = startTime
		this.endTime = endTime
	}
}

export type TriggerName = `HitSound${SampleSet}${AdditionsSampleSet}${Addition}${CustomSampleSet}`
type SampleSet = '' | 'All' | 'Normal' | 'Soft' | 'Drum'
type AdditionsSampleSet = SampleSet
type Addition = '' | 'Whistle' | 'Finish' | 'Clap'
type CustomSampleSet = number | ''
