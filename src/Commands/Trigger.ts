import { CommandGroup } from './CommandGroup'

export class Trigger extends CommandGroup {
	triggerName: string
	startTime: number
	endTime: number
	group: number
	constructor(triggerName: string, startTime: number, endTime: number, group: number = 0) {
		super(` T,${triggerName},${startTime},${endTime},${group}`)

		this.triggerName = triggerName
		this.startTime = startTime
		this.endTime = endTime
		this.group = group
	}
}
