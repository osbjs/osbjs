import { parseSync } from 'subtitle'
import { readFileSync } from 'fs-extra'
import { ISubtitle } from '../Types'

export class SubtitleCollection {
	subtitles: ISubtitle[]
	path: string
	constructor(path: string) {
		this.path = path
		this.subtitles = this._getSubtitles()
	}

	private _getSubtitles(): ISubtitle[] {
		const input = readFileSync(this.path, 'utf8')

		let data = parseSync(input)
		return data
			.filter((s) => s.type == 'cue')
			.map((s) => {
				/** @ts-ignore */
				return { startTime: s.data.start, endTime: s.data.end, text: s.data.text }
			})
	}
}
