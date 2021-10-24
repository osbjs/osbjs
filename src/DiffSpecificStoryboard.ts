import { green } from 'chalk'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { Storyboard } from '.'

export class DiffSpecificStoryboard extends Storyboard {
	constructor(filename: string, path: string) {
		super(filename, path)
	}

	override getOsbString(): string {
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

		let str = `//Storyboard Layer 0 (Background)\n${bg}//Storyboard Layer 1 (Fail)\n${f}//Storyboard Layer 2 (Pass)\n${p}//Storyboard Layer 3 (Foreground)\n${fg}//Storyboard Sound Samples\n${s}`

		return str
	}

	override generate() {
		this.sort()
		if (!existsSync(this.path)) throw new Error("Beatmap doesn't exists")
		let beatmap = readFileSync(this.path, 'utf-8')
		let pattern =
			/\/\/Storyboard Layer 0 \(Background\)\n(.*\n*)\/\/Storyboard Layer 1 \(Fail\)\n(.*\n*)\/\/Storyboard Layer 2 \(Pass\)\n(.*\n*)\/\/Storyboard Layer 3 \(Foreground\)\n(.*\n*)\/\/Storyboard Layer 4 \(Overlay\)\n(.*\n*)\/\/Storyboard Sound Samples\n(.*\n*)/g

		beatmap = beatmap.replace(pattern, this.getOsbString())

		writeFileSync(`${this.path}/${this.filename}`, beatmap)

		console.log(green`Storyboard generated in ${this.path}/${this.filename}`)
	}
}
