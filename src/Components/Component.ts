import { v4 as uuidv4 } from 'uuid'

export abstract class Component {
	startTime: number|undefined
	endTime: number|undefined
	components: Component[]
	uuid: string

	constructor(startTime?: number, endTime?: number) {
		this.startTime = startTime
		this.endTime = endTime
		this.components = []
		this.uuid = uuidv4()
	}

	registerComponents(...component: Component[]) {
		this.components = this.components.concat(component)
	}

	abstract getOsbString(): string
}
