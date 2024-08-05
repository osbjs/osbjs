import type { Color3, Graphic, Sample, Timestamp } from '@osbjs/core'
import type { Background } from './Background'
import type { Break } from './Break'
import type { HitObject } from './HitObject'
import type { TimingPoint } from './TimingPoint'
import type { Video } from './Video'

export class Beatmap {
  version: number
  general: {
    audioFilename?: string
    audioLeadIn?: number
    previewTime?: number
    countdown?: 0 | 1 | 2 | 3
    sampleSet?: 'Normal' | 'Soft' | 'Drum'
    stackLeniency?: number
    mode?: 0 | 1 | 2 | 3
    letterboxInBreaks?: boolean
    useSkinSprites?: boolean
    overlayPosition?: 'NoChange' | 'Below' | 'Above'
    skinPreference?: string
    epilepsyWarning?: boolean
    countdownOffset?: number
    specialStyle?: boolean
    widescreenStoryboard?: boolean
    samplesMatchPlaybackRate?: boolean
  }
  editor: {
    bookmarks?: Timestamp[]
    distanceSpacing?: number
    beatDivisor?: number
    gridSize?: number
    timelineZoom?: number
  }
  metadata: {
    title?: string
    titleUnicode?: string
    artist?: string
    artistUnicode?: string
    creator?: string
    version?: string
    source?: string
    tags?: string
    beatmapID?: number
    beatmapSetID?: number
  }
  difficulty: {
    hpDrainRate?: number
    circleSize?: number
    overallDifficulty?: number
    approachRate?: number
    sliderMultiplier?: number
    sliderTickRate?: number
  }
  events: (Graphic | Sample | Break | Video | Background)[]
  timingPoints: TimingPoint[]
  colours: Record<number, Color3> & {
    sliderTrackOverride?: Color3
    sliderBorder?: Color3
  }
  hitObjects: HitObject[]

  constructor(version = 14) {
    this.version = version
    this.general = {}
    this.timingPoints = []
    this.hitObjects = []
    this.colours = {}
    this.events = []
    this.difficulty = {}
    this.metadata = {}
    this.editor = {}
  }

  static parse(input: string): Beatmap | null {
    const lines = input.split('\n')
    if (lines.length === 0) return null

    // first line must specify the version
    const firstLine = lines[0]!
    const versionRegex = /^osu file format v(\d+)$/m
    const match = firstLine.match(versionRegex)
    if (!match || !match[1]) return null
    const version = parseInt(match[1])

    const beatmap = new Beatmap(version)

    return beatmap
  }

  toString() {
    return `osu file format v${this.version}\n`
  }
}
