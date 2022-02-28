import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { Layer } from '../Enums'
import { Animation, Component, Sample, Sprite } from '../Components'
import { IStoryboardLayers } from '../Types'
import { green } from 'chalk'
import { join } from 'path'

export class Storyboard {
	path: string
	filename: string
	layers: IStoryboardLayers = {
		background: [],
		foreground: [],
		fail: [],
		pass: [],
		overlay: [],
		sample: [],
	}

	constructor(filename: string, path: string = './storyboard') {
		this.filename = filename
		this.path = path
	}

	protected _extractEachLayerOsbString() {
		const bg = this.layers.background.map((component) => component.getOsbString()).join(''),
			fg = this.layers.foreground.map((component) => component.getOsbString()).join(''),
			f = this.layers.fail.map((component) => component.getOsbString()).join(''),
			p = this.layers.pass.map((component) => component.getOsbString()).join(''),
			s = this.layers.sample.map((component) => component.getOsbString()).join(''),
			ov = this.layers.overlay.map((component) => component.getOsbString()).join('')

		return { bg, fg, f, p, s, ov }
	}

	getOsbString(): string {
		const { bg, fg, f, p, s, ov } = this._extractEachLayerOsbString()
		let str = `[Events]\n//Background and Video events\n//Storyboard Layer 0 (Background)\n${bg}//Storyboard Layer 1 (Fail)\n${f}//Storyboard Layer 2 (Pass)\n${p}//Storyboard Layer 3 (Foreground)\n${fg}//Storyboard Layer 4 (Overlay)\n${ov}//Storyboard Sound Samples\n${s}`

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

	registerComponents(...components: Component[]) {
		components.forEach((component) => {
			component.generate()
			this._addToLayer(component)
		})
	}

	generate() {
		if (!existsSync(this.path)) mkdirSync(this.path, { recursive: true })
		writeFileSync(join(this.path, this.filename), this.getOsbString())
		console.log(green`Storyboard generated in ${this.path}/${this.filename}`)
	}
}
