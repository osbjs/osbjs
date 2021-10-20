import * as fs from 'fs'
import { Component } from './Components'

export class Storyboard {
	components: Component[]
	path: string
	filename: string

	constructor(filename: string, path: string = './storyboard') {
		this.filename = filename
		this.path = path
		this.components = []
	}

	getOsbString() {
		let str = ''
		this.components.forEach((component) => {
			str += component.getOsbString()
		})
		return str
	}

	registerComponents(...components: Component[]) {
		this.components = this.components.concat(components)
	}

	generate() {
		fs.mkdirSync(this.path, { recursive: true })
		fs.writeFileSync(`${this.path}/${this.filename}`, this.getOsbString())
	}
}
