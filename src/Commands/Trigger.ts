import { TriggerName } from '..'
import { CommandGroup } from './CommandGroup'

export class Trigger extends CommandGroup {
	triggerName: TriggerName | string
	startTime: number
	endTime: number
	/**
	 * for more info on `triggerName`, see https://osu.ppy.sh/wiki/en/Storyboard/Scripting/Compound_Commands */
	constructor(triggerName: TriggerName | string, startTime: number, endTime: number) {
		super(` T,${triggerName},${startTime},${endTime}`)

		this.triggerName = triggerName
		this.startTime = startTime
		this.endTime = endTime
	}
}
