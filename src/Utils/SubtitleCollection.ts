import { parseSync } from 'subtitle'
import { readFileSync } from 'fs-extra'
import { Subtitle } from './Subtitle'

export class SubtitleCollection {
	subtitles: Subtitle[]
	path: string
	constructor(path: string) {
		this.path = path

		this.subtitles = this._getSubtitles()
	}

	private _getSubtitles(): Subtitle[] {
		const input = readFileSync(this.path, 'utf8')

		let data = parseSync(input)
		return data
			.filter((s) => s.type == 'cue')
			.map((s) => {
				/** @ts-ignore */
				return new Subtitle(s.data.start, s.data.end, s.data.text)
			})
	}
}
