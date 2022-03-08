import { existsSync, readFileSync } from 'fs'
import { OsbColor } from '../Core'
import { IBeatmapDifficulty, IBeatmapHitObjects, IBeatmapMetadata, ITimingPoint } from './Interfaces'
import { getAudioFilename, parseColors, parseDifficulty, parseHitObjects, parseMetadata, parseTimingPoints } from './Utils/ParserHelpers'

export class Beatmap {
	path: string
	difficulty: IBeatmapDifficulty
	metadata: IBeatmapMetadata
	colors: OsbColor[]
	hitObjects: IBeatmapHitObjects
	timingPoints: ITimingPoint[]
	audioFilename: string
	private _raw: string

	constructor(path: string) {
		this.path = path
		if (!existsSync(path)) throw new Error("File doesn't exists")

		this._raw = readFileSync(this.path, 'utf-8')
		this.difficulty = parseDifficulty(this._raw)
		this.metadata = parseMetadata(this._raw)
		this.colors = parseColors(this._raw)
		this.hitObjects = parseHitObjects(this._raw)
		this.timingPoints = parseTimingPoints(this._raw)
		this.audioFilename = getAudioFilename(this._raw)
	}
}
