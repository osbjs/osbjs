import { Scene } from '@osbjs/osbjs'
import { Example } from '../components/Example.js'

export class Main extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.registerComponents(new Example())
	}
}
