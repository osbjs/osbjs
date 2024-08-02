import type { Color3, Graphic, Sample } from '@osbjs/core'
import type { Background } from './Background'
import type { HitObject } from './HitObject'
import type { TimingPoint } from './TimingPoint'
import type { Video } from './Video'

export interface OsuBeatmap {
  version: number
  general: {
    audioFilename: string
    audioLeadIn: number
    previewTime: number
    countdown: 0 | 1 | 2 | 3
    sampleSet: 'Normal' | 'Soft' | 'Drum'
    stackLeniency: number
    mode: 0 | 1 | 2 | 3
    letterboxInBreaks: 0 | 1
    useSkinSprites: 0 | 1
    overlayPosition: 'NoChange' | 'Below' | 'Above'
    skinPreference?: string
    epilepsyWarning: 0 | 1
    countdownOffset: number
    specialStyle: 0 | 1
    widescreenStoryboard: 0 | 1
    samplesMatchPlaybackRate: 0 | 1
  }
  editor: {
    bookmarks: string
    distanceSpacing: number
    beatDivisor: number
    gridSize: number
    timelineZoom: number
  }
  metadata: {
    title: string
    titleUnicode: string
    artist: string
    artistUnicode: string
    creator: string
    version: string
    source: string
    tags: string
    beatmapID: number
    beatmapSetID: number
  }
  difficulty: {
    hpDrainRate: number
    circleSize: number
    overallDifficulty: number
    approachRate: number
    sliderMultiplier: number
    sliderTickRate: number
  }
  events: (Graphic | Sample | Video | Background)[]
  timingPoints: TimingPoint[]
  colours: Record<number, Color3> & {
    sliderTrackOverride: Color3
    sliderBorder: Color3
  }
  hitObjects: HitObject[]
}
