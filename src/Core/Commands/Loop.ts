import { CommandGroup } from './CommandGroup'

export class Loop extends CommandGroup {
	startTime: number
	count: number

	constructor(startTime: number, count: number) {
		super(` L,${startTime},${count}`)
		this.startTime = startTime
		this.count = count
	}
}