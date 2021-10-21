import { v4 as uuidv4 } from 'uuid'
import { Animation, Layer, Sample, Sprite } from '..'
import { ILayers } from '../Interfaces/ILayers'

export abstract class Component {
	abstract readonly name: string
	components: Component[] = []
	uuid: string = uuidv4()
	layers: ILayers = {
		background: [],
		foreground: [],
		fail: [],
		pass: [],
		sample: [],
	}

	constructor() {}

	registerComponents(...component: Component[]) {
		this.components = this.components.concat(component)
	}

	sort() {
		for (let i = 0; i < this.components.length; i++) {
			const component = this.components[i]
			component.generate()
			if (component instanceof Sprite || component instanceof Animation) {
				switch (component.layer) {
					case Layer.Background:
						this.layers.background.push(component)
						break

					case Layer.Foreground:
						this.layers.foreground.push(component)
						break

					case Layer.Fail:
						this.layers.fail.push(component)
						break

					case Layer.Pass:
						this.layers.pass.push(component)
						break

					default:
						break
				}
			} else if (component instanceof Sample) {
				this.layers.sample.push(component)
			} else {
				this.layers.background = this.layers.background.concat(component.layers.background)
				this.layers.foreground = this.layers.foreground.concat(component.layers.foreground)
				this.layers.fail = this.layers.fail.concat(component.layers.fail)
				this.layers.pass = this.layers.pass.concat(component.layers.pass)
			}
		}
	}

	generate() {
		this.sort()
	}
}
