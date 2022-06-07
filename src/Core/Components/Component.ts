import { v4 as uuidv4 } from 'uuid'
import { Animation, Sample, Sprite } from '.'
import { IStoryboardLayers } from '../Interfaces'
import { Layer } from '../Enums'

export abstract class Component {
	name?: string
	uuid: string = uuidv4()
	layers: IStoryboardLayers = {
		background: [],
		foreground: [],
		fail: [],
		pass: [],
		overlay: [],
		sample: [],
	}

	constructor() {
		if (this.constructor == Component) {
			throw new Error('Component can not be instantiated. To create a new Component, extends this class.')
		}
	}

	/**
	 * Register components to this component. You can supply as many components as you want.
	 * Note: later component will have higher z-index therefore it might appear on top of earlier components if their active time overlap.
	 * @param components Component instances
	 */
	registerComponents(...components: Component[]) {
		components.forEach((component) => {
			component.generate()
			this._addToLayer(component)
		})
	}

	protected _addToLayer(component: Component) {
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

				case Layer.Overlay:
					this.layers.overlay.push(component)

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
			this.layers.overlay = this.layers.overlay.concat(component.layers.overlay)
		}
	}

	generate() {}
}
