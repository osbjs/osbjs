import { Component } from './Component'

export class Scene extends Component {
	constructor() {
		super(undefined, undefined)
	}

	getOsbString(): string {
		let str = ``
		this.components.forEach((component) => {
			str += component.getOsbString()
		})

		return str
	}
}
