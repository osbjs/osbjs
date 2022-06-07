import { CommandGroup } from './CommandGroup'

export class Loop extends CommandGroup {
	startTime: number
	count: number

	/**
	 * Create a loop group.
	 *
	 * Loops can be defined to repeat a set of events constantly for a set number of iterations.
	 * Note that events inside a loop should be timed with a zero-base.
	 * This means that you should start from 0ms for the inner event's timing and work up from there.
	 * The loop event's start time will be added to this value at game runtime.
	 *
	 * Example:
	 * ```
	 * // create a loop group
	 * const loop = new Loop(1000, 3)
	 * loop.Fade(0, 1000, 1, 0.5) // this means sprite will start to fade at 1000, 2000 and 3000 respectively.
	 * // add loop group to sprite
	 * sprite.loop(loop)
	 * ```
	 * @param startTime Time in milliseconds/timestamp at which the loop begins.
	 * @param count The number of times the loop executes before stopping.
	 */
	constructor(startTime: number, count: number) {
		super(` L,${startTime},${count}\n`)
		this.startTime = startTime
		this.count = count
	}
}
