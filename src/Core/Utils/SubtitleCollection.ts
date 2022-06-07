import { parseSync } from 'subtitle'
import { readFileSync } from 'fs-extra'
import { ISubtitle } from '../Interfaces'

export class SubtitleCollection {
	subtitles: ISubtitle[]
	path: string
	constructor(path: string) {
		this.path = path
		this.subtitles = this._getSubtitles()
	}

	private _getSubtitles(): ISubtitle[] {
		const input = readFileSync(this.path, 'utf8')

		if (this.path.match(/.*\.(srt|vtt)$/)) {
			let data = parseSync(input)
			return data
				.filter((s) => s.type == 'cue')
				.map((s) => {
					/** @ts-ignore */
					return { startTime: s.data.start, endTime: s.data.end, text: s.data.text }
				})
		} else if (this.path.match(/.*\.json$/)) {
			return JSON.parse(input)
		} else {
			throw new Error('Unsupported file type')
		}
	}
}
