import * as fs from 'fs'
import { Layer } from '.'
import { Animation, Component, Sample, Sprite } from './Components'
import { ILayers } from './Interfaces/ILayers'

export class Storyboard {
	components: Component[]
	path: string
	filename: string
	layers: ILayers = {
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

	getOsbString() {
		this.sort()

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

		let str = `[Events]\n//Background and Video events\n//Storyboard Layer 0 (Background)\n${bg}//Storyboard Layer 1 (Fail)\n${f}//Storyboard Layer 2 (Pass)${p}//Storyboard Layer 3 (Foreground)\n${fg}//Storyboard Sound Samples\n${s}`

		return str
	}

	sort() {
		for (let i = 0; i < this.components.length; i++) {
			const component = this.components[i]
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
				component.sort()
				this.layers.background = this.layers.background.concat(component.layers.background)
				this.layers.foreground = this.layers.foreground.concat(component.layers.foreground)
				this.layers.fail = this.layers.fail.concat(component.layers.fail)
				this.layers.pass = this.layers.pass.concat(component.layers.pass)
			}
		}
	}

	registerComponents(...components: Component[]) {
		this.components = this.components.concat(components)
	}

	generate() {
		fs.mkdirSync(this.path, { recursive: true })
		fs.writeFileSync(`${this.path}/${this.filename}`, this.getOsbString())
	}
}
