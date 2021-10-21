import { v4 as uuidv4 } from 'uuid'

export abstract class Component {
	components: Component[]
	uuid: string

	constructor() {
		this.components = []
		this.uuid = uuidv4()
	}

	registerComponents(...component: Component[]) {
		this.components = this.components.concat(component)
	}

	protected generate() {}

	getOsbString(): string {
		this.generate()
		let str = ``
		this.components.forEach((component) => {
			str += component.getOsbString()
		})

		return str
	}
}
