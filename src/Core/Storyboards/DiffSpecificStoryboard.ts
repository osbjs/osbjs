import { green } from 'chalk'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { Storyboard } from './Storyboard'
import { join } from 'path'
import { Beatmap } from '../../Beatmap'

export class DiffSpecificStoryboard extends Storyboard {
	beatmap: Beatmap
	constructor(filename: string, path: string) {
		super(filename, path)
		this.beatmap = new Beatmap(join(path, filename))
	}

	override getOsbString(): string {
		const { bg, fg, f, p, s, ov } = this._extractEachLayerOsbString()

		let str = `//Storyboard Layer 0 (Background)\n${bg}//Storyboard Layer 1 (Fail)\n${f}//Storyboard Layer 2 (Pass)\n${p}//Storyboard Layer 3 (Foreground)\n${fg}//Storyboard Layer 4 (Overlay)\n${ov}//Storyboard Sound Samples\n${s}`

		return str
	}

	override generate() {
		if (!existsSync(this.path) || !existsSync(join(this.path, this.filename))) throw new Error("Beatmap doesn't exists")
		let beatmap = readFileSync(join(this.path, this.filename), 'utf-8')
		let pattern =
			/\/\/Storyboard Layer 0 \(Background\)\n(.*\n*)\/\/Storyboard Layer 1 \(Fail\)\n(.*\n*)\/\/Storyboard Layer 2 \(Pass\)\n(.*\n*)\/\/Storyboard Layer 3 \(Foreground\)\n(.*\n*)\/\/Storyboard Layer 4 \(Overlay\)\n(.*\n*)\/\/Storyboard Sound Samples\n(.*\n*)/g

		beatmap = beatmap.replace(pattern, this.getOsbString())

		writeFileSync(join(this.path, this.filename), beatmap)

		console.log(green`Storyboard generated in ${join(this.path, this.filename)}`)
	}
}
