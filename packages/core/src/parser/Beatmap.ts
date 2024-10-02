import type {
  Animation,
  Color3,
  Container,
  Sample,
  Sprite,
  Timestamp,
} from '@osbjs/core'
import { Background } from './Background'
import { Break } from './Break'
import type { HitObject } from './HitObject'
import type { TimingPoint } from './TimingPoint'
import { Video } from './Video'

export class Beatmap {
  version: number
  General: {
    AudioFilename?: string
    AudioLeadIn?: number
    PreviewTime?: number
    Countdown?: 0 | 1 | 2 | 3
    SampleSet?: 'Normal' | 'Soft' | 'Drum'
    StackLeniency?: number
    Mode?: 0 | 1 | 2 | 3
    LetterboxInBreaks?: 0 | 1
    UseSkinSprites?: 0 | 1
    OverlayPosition?: 'NoChange' | 'Below' | 'Above'
    SkinPreference?: string
    EpilepsyWarning?: 0 | 1
    CountdownOffset?: number
    SpecialStyle?: 0 | 1
    WidescreenStoryboard?: 0 | 1
    SamplesMatchPlaybackRate?: 0 | 1
  }
  Editor: {
    Bookmarks?: Timestamp[]
    DistanceSpacing?: number
    BeatDivisor?: number
    GridSize?: number
    TimelineZoom?: number
  }
  Metadata: {
    Title?: string
    TitleUnicode?: string
    Artist?: string
    ArtistUnicode?: string
    Creator?: string
    Version?: string
    Source?: string
    Tags?: string
    BeatmapID?: number
    BeatmapSetID?: number
  }
  Difficulty: {
    HpDrainRate?: number
    CircleSize?: number
    OverallDifficulty?: number
    ApproachRate?: number
    SliderMultiplier?: number
    SliderTickRate?: number
  }
  Events: (Sprite | Animation | Sample | Break | Video | Background)[]
  TimingPoints: TimingPoint[]
  Colours: Record<number, Color3> & {
    SliderTrackOverride?: Color3
    SliderBorder?: Color3
  }
  HitObjects: HitObject[]

  constructor(version: number) {
    this.version = version
    this.General = {}
    this.TimingPoints = []
    this.HitObjects = []
    this.Colours = {}
    this.Events = []
    this.Difficulty = {}
    this.Metadata = {}
    this.Editor = {}
  }

  replaceEvents(sb: Container) {
    const breaks = this.Events.filter(e => e instanceof Break)
    const videos = this.Events.filter(e => e instanceof Video)
    const bgs = this.Events.filter(e => e instanceof Background)
    this.Events = [...breaks, ...videos, ...bgs, ...sb.flatten()]
  }

  toString() {
    return `osu file format v${this.version}\n`
  }
}