import type { Animation } from '../storyboarding/Animation'
import type { Container } from '../storyboarding/Container'
import type { Sample } from '../storyboarding/Sample'
import type { Sprite } from '../storyboarding/Sprite'
import type { Color3 } from '../types/Color3'
import type { Timestamp } from '../types/Timestamp'
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
    LetterboxInBreaks?: boolean
    UseSkinSprites?: boolean
    OverlayPosition?: 'NoChange' | 'Below' | 'Above'
    SkinPreference?: string
    EpilepsyWarning?: boolean
    CountdownOffset?: number
    SpecialStyle?: boolean
    WidescreenStoryboard?: boolean
    SamplesMatchPlaybackRate?: boolean
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
  Colours: Partial<
    Record<`Combo${number}` | 'SliderTrackOverride' | 'SliderBorder', Color3>
  >
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
    this.Events = [...breaks, ...videos, ...bgs, ...sb.toFlatten()]
  }

  toString() {
    return `osu file format v${this.version}\n`
  }
}
