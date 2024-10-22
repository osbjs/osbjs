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
    HPDrainRate?: number
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
    this.Events = [...bgs, ...videos, ...breaks, ...sb.toFlatten()]
  }

  toString() {
    let generalSection = `[General]\n`
    if (this.General.AudioFilename)
      generalSection += `AudioFilename: ${this.General.AudioFilename}\n`
    if (this.General.AudioLeadIn)
      generalSection += `AudioLeadIn: ${this.General.AudioLeadIn}\n`
    if (this.General.PreviewTime)
      generalSection += `PreviewTime: ${this.General.PreviewTime}\n`
    if (this.General.Countdown)
      generalSection += `Countdown: ${this.General.Countdown}\n`
    if (this.General.SampleSet)
      generalSection += `SampleSet: ${this.General.SampleSet}\n`
    if (this.General.StackLeniency)
      generalSection += `StackLeniency: ${this.General.StackLeniency}\n`
    if (this.General.Mode) generalSection += `Mode: ${this.General.Mode}\n`
    if (this.General.CountdownOffset)
      generalSection += `CountdownOffset: ${this.General.CountdownOffset}\n`
    if (this.General.OverlayPosition)
      generalSection += `OverlayPosition: ${this.General.OverlayPosition}\n`
    if (this.General.SkinPreference)
      generalSection += `SkinPreference: ${this.General.SkinPreference}\n`
    if (this.General.LetterboxInBreaks)
      generalSection += `LetterboxInBreaks: ${Number(this.General.LetterboxInBreaks)}\n`
    if (this.General.WidescreenStoryboard)
      generalSection += `WidescreenStoryboard: ${Number(this.General.WidescreenStoryboard)}\n`
    if (this.General.UseSkinSprites)
      generalSection += `UseSkinSprites: ${Number(this.General.UseSkinSprites)}\n`
    if (this.General.EpilepsyWarning)
      generalSection += `EpilepsyWarning: ${Number(this.General.EpilepsyWarning)}\n`
    if (this.General.SpecialStyle)
      generalSection += `SpecialStyle: ${Number(this.General.SpecialStyle)}\n`
    if (this.General.SamplesMatchPlaybackRate)
      generalSection += `SamplesMatchPlaybackRate: ${Number(this.General.SamplesMatchPlaybackRate)}\n`
    generalSection += '\n'

    let editorSection = `[Editor]\n`
    if (this.Editor.BeatDivisor)
      editorSection += `BeatDivisor: ${this.Editor.BeatDivisor}\n`
    if (this.Editor.DistanceSpacing)
      editorSection += `DistanceSpacing: ${this.Editor.DistanceSpacing}\n`
    if (this.Editor.GridSize)
      editorSection += `GridSize: ${this.Editor.GridSize}\n`
    if (this.Editor.TimelineZoom)
      editorSection += `TimelineZoom: ${this.Editor.TimelineZoom}\n`
    if (this.Editor.Bookmarks)
      editorSection += `Bookmarks: ${this.Editor.Bookmarks.join(',')}\n`
    editorSection += '\n'

    let metadataSection = `[Metadata]\n`
    if (this.Metadata.Title) metadataSection += `Title:${this.Metadata.Title}\n`
    if (this.Metadata.TitleUnicode)
      metadataSection += `TitleUnicode:${this.Metadata.TitleUnicode}\n`
    if (this.Metadata.Artist)
      metadataSection += `Artist:${this.Metadata.Artist}\n`
    if (this.Metadata.ArtistUnicode)
      metadataSection += `ArtistUnicode:${this.Metadata.ArtistUnicode}\n`
    if (this.Metadata.Creator)
      metadataSection += `Creator:${this.Metadata.Creator}\n`
    if (this.Metadata.Version)
      metadataSection += `Version:${this.Metadata.Version}\n`
    if (this.Metadata.Source)
      metadataSection += `Source:${this.Metadata.Source}\n`
    if (this.Metadata.Tags) metadataSection += `Tags:${this.Metadata.Tags}\n`
    if (this.Metadata.BeatmapID)
      metadataSection += `BeatmapID:${this.Metadata.BeatmapID}\n`
    if (this.Metadata.BeatmapSetID)
      metadataSection += `BeatmapSetID:${this.Metadata.BeatmapSetID}\n`
    metadataSection += '\n'

    let difficultySection = `[Difficulty]\n`
    if (this.Difficulty.HPDrainRate)
      difficultySection += `HPDrainRate:${this.Difficulty.HPDrainRate}\n`
    if (this.Difficulty.CircleSize)
      difficultySection += `CircleSize:${this.Difficulty.CircleSize}\n`
    if (this.Difficulty.OverallDifficulty)
      difficultySection += `OverallDifficulty:${this.Difficulty.OverallDifficulty}\n`
    if (this.Difficulty.ApproachRate)
      difficultySection += `ApproachRate:${this.Difficulty.ApproachRate}\n`
    if (this.Difficulty.SliderMultiplier)
      difficultySection += `SliderMultiplier:${this.Difficulty.SliderMultiplier}\n`
    if (this.Difficulty.SliderTickRate)
      difficultySection += `SliderTickRate:${this.Difficulty.SliderTickRate}\n`
    difficultySection += '\n'

    let eventsSection = '[Events]\n'
    for (const event of this.Events) {
      eventsSection += `${event}\n`
    }
    eventsSection += '\n'

    let timingPointsSection = '[TimingPoints]\n'
    for (const timingPoint of this.TimingPoints) {
      timingPointsSection += `${timingPoint}\n`
    }
    timingPointsSection += '\n'

    let coloursSection = '[Colours]\n'
    for (const [k, v] of Object.entries(this.Colours)) {
      coloursSection += `${k} : ${v}\n`
    }
    coloursSection += '\n'

    let hitObjectsSection = '[HitObjects]\n'
    for (const hitObject of this.HitObjects) {
      hitObjectsSection += `${hitObject}\n`
    }
    hitObjectsSection += '\n'

    return (
      `osu file format v${this.version}\n\n` +
      generalSection +
      editorSection +
      metadataSection +
      difficultySection +
      eventsSection +
      timingPointsSection +
      coloursSection +
      hitObjectsSection
    ).trimEnd()
  }
}
