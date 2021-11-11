import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { Layer } from '.'
import { Animation, Component, Sample, Sprite } from './Components'
import { IStoryboardLayers } from './Types/IStoryboardLayers'
import { green } from 'chalk'

export class Storyboard {
	components: Component[]
	path: string
	filename: string
	layers: IStoryboardLayers = {
		background: [],
		foreground: [],
		fail: [],
		pass: [],
		sample: [],
	}

	constructor(filename: string, path: string = './storyboard') {
		this.filename = filename
		this.path = path
		this.components = []
	}

	getOsbString(): string {
		let bg = '',
			fg = '',
			f = '',
			p = '',
			s = ''

		this.layers.background.forEach((component) => {
			bg += component.getOsbString()
		})
		this.layers.foreground.forEach((component) => {
			fg += component.getOsbString()
		})
		this.layers.fail.forEach((component) => {
			f += component.getOsbString()
		})
		this.layers.pass.forEach((component) => {
			p += component.getOsbString()
		})
		this.layers.sample.forEach((component) => {
			s += component.getOsbString()
		})

		let str = `[Events]\n//Background and Video events\n//Storyboard Layer 0 (Background)\n${bg}//Storyboard Layer 1 (Fail)\n${f}//Storyboard Layer 2 (Pass)\n${p}//Storyboard Layer 3 (Foreground)\n${fg}//Storyboard Sound Samples\n${s}`

		return str
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

	registerComponents(...components: Component[]) {
		this.components = this.components.concat(components)
		components.forEach((component) => {
			component.generate()
			this._addToLayer(component)
		})
	}

	generate() {
		if (!existsSync(this.path)) mkdirSync(this.path, { recursive: true })
		writeFileSync(`${this.path}/${this.filename}`, this.getOsbString())
		console.log(green`Storyboard generated in ${this.path}/${this.filename}`)
	}
}
