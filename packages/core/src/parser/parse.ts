import { Color3 } from '../types/Color3'
import { Timestamp } from '../types/Timestamp'
import { Beatmap } from './Beatmap'

function isWhiteSpace(line: string) {
  return !line.replace(/\s/g, '').length
}

function isComment(line: string) {
  return line.trimStart().startsWith('//')
}

function stripComments(line: string) {
  const index = line.indexOf('//')
  return index === -1 ? line : line.substring(0, index)
}

function extractSection(line: string) {
  const match = line.match(/\[(.*?)\]/)
  return match ? match[1] : null
}

function splitKeyValue(line: string, separator = ':', trim = true) {
  const [k, v] = line.split(separator, 2)

  if (!k) throw new Error(`Cannot parse key from ${line}`)

  return [trim ? k.trim() : k, v?.length ? (trim ? v.trim() : v) : ''] as const
}

function ensureValue<T>(key: string, val: any, ...possibleValues: T[]): T {
  if (!possibleValues.includes(val))
    throw new Error(
      `Key ${key} expected ${possibleValues.map(v => `'${v}'`).join(', ')} but received ${val}`,
    )
  return val
}

function parseColor3(k: string, v: string): Color3 {
  const split = v.split(',').map(parseInt)
  if (split.length < 3)
    throw new Error(
      `Invalid color format (should be R,G,B or R,G,B,A) for key Combo${k}: ${v}`,
    )

  return new Color3(split)
}

export function parse(input: string): Beatmap {
  const lines = input
    .split('\n')
    .filter(line => isWhiteSpace(line) || isComment(line))
  if (lines.length === 0) throw new Error('Empty beatmap')

  let match = input.match(/osu file format v(\d+)/)
  if (!match || !match[1]) throw new Error('Unknown .osu version')
  const version = parseInt(match[1])

  const beatmap = new Beatmap(version)

  let section: string | undefined = undefined

  for (let line of lines) {
    if (section !== 'Metadata') {
      line = stripComments(line)
    }

    line = line.trimEnd()

    if (line.startsWith('[') && line.endsWith(']')) {
      let possibleSection = extractSection(line)

      if (!possibleSection) throw new Error(`Unknown section`)

      section = possibleSection
    }

    if (section) {
      if (section === 'General') {
        const [k, v] = splitKeyValue(line)

        switch (k) {
          case 'AudioFilename':
          case 'SkinPreference':
            beatmap[section][k] = v
            break

          case 'AudioLeadIn':
          case 'PreviewTime':
          case 'CountdownOffset':
            beatmap[section][k] = parseInt(v)
            break

          case 'SampleSet':
            beatmap[section][k] = ensureValue(k, v, 'Normal', 'Soft', 'Drum')
            break

          case 'Countdown':
          case 'Mode':
            beatmap[section][k] = ensureValue(k, parseInt(v), 0, 1, 2, 3)
            break

          case 'StackLeniency':
            beatmap[section][k] = parseFloat(v)
            break

          case 'LetterboxInBreaks':
          case 'UseSkinSprites':
          case 'EpilepsyWarning':
          case 'SpecialStyle':
          case 'WidescreenStoryboard':
          case 'SamplesMatchPlaybackRate':
            beatmap[section][k] = ensureValue(k, parseInt(v), 0, 1)
            break

          case 'OverlayPosition':
            beatmap[section][k] = ensureValue(
              k,
              v,
              'NoChange',
              'Below',
              'Above',
            )
            break

          default:
            throw new Error(`Unknown key in 'General' section: ${k}`)
        }
      } else if (section === 'Editor') {
        const [k, v] = splitKeyValue(line)

        switch (k) {
          case 'Bookmarks':
            beatmap[section][k] = v.split(',').map(ts => new Timestamp(ts))
            break

          case 'BeatDivisor':
          case 'GridSize':
            beatmap[section][k] = parseInt(v)
            break

          case 'DistanceSpacing':
          case 'TimelineZoom':
            beatmap[section][k] = parseFloat(v)
            break

          default:
            throw new Error(`Unknown key in [${section}] section: ${k}`)
        }
      } else if (section === 'Metadata') {
        const [k, v] = splitKeyValue(line)

        switch (k) {
          case 'Title':
          case 'TitleUnicode':
          case 'Artist':
          case 'ArtistUnicode':
          case 'Creator':
          case 'Version':
          case 'Source':
          case 'Tags':
            beatmap[section][k] = v
            break

          case 'BeatmapID':
          case 'BeatmapSetID':
            beatmap[section][k] = parseInt(v)
            break

          default:
            throw new Error(`Unknown key in [${section}] section: ${k}`)
        }
      } else if (section === 'Difficulty') {
        const [k, v] = splitKeyValue(line)

        switch (k) {
          case 'HpDrainRate':
          case 'CircleSize':
          case 'OverallDifficulty':
          case 'ApproachRate':
          case 'SliderMultiplier':
          case 'SliderTickRate':
            beatmap[section][k] = parseFloat(v)
            break

          default:
            throw new Error(`Unknown key in [${section}] section: ${k}`)
        }
      } else if (section === 'Events') {
        // todo
      } else if (section === 'TimingPoints') {
        // todo
      } else if (section === 'Colours') {
        const [k, v] = splitKeyValue(line)

        if (k.startsWith('Combo')) {
          const id = parseInt(k.replace('Combo', ''))

          if (isNaN(id) || id < 1 || id > 8)
            throw new Error(`Invalid combo color key: Combo${k}`)

          beatmap[section][`Combo${id}`] = parseColor3(k, v)
        } else {
          switch (k) {
            case 'SliderTrackOverride':
            case 'SliderBorder':
              beatmap[section][k] = parseColor3(k, v)
              break

            default:
              throw new Error(`Unknown key in [${section}] section: ${k}`)
          }
        }
      } else if (section === 'HitObjects') {
        // todo
      } else {
        throw new Error(`Unknown section: ${section}`)
      }
    }
  }

  return beatmap
}
