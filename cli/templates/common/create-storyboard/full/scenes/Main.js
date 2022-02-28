const { Scene } = require('@osbjs/osbjs')
const { HelloWorld } = require('../components/helloworld')

class Main extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.registerComponents(new HelloWorld())
	}
}

module.exports = { Main }
