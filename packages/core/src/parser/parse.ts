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
            beatmap.General[k] = v
            break

          case 'AudioLeadIn':
          case 'PreviewTime':
          case 'CountdownOffset':
            beatmap.General[k] = parseInt(v)
            break

          case 'SampleSet':
            beatmap.General[k] = ensureValue(k, v, 'Normal', 'Soft', 'Drum')
            break

          case 'Countdown':
          case 'Mode':
            beatmap.General[k] = ensureValue(k, parseInt(v), 0, 1, 2, 3)
            break

          case 'StackLeniency':
            beatmap.General[k] = parseFloat(v)
            break

          case 'LetterboxInBreaks':
          case 'UseSkinSprites':
          case 'EpilepsyWarning':
          case 'SpecialStyle':
          case 'WidescreenStoryboard':
          case 'SamplesMatchPlaybackRate':
            beatmap.General[k] = ensureValue(k, parseInt(v), 0, 1)
            break

          case 'OverlayPosition':
            beatmap.General[k] = ensureValue(k, v, 'NoChange', 'Below', 'Above')
            break

          default:
            throw new Error(`Unknown key in 'General' section: ${k}`)
        }
      } else {
        throw new Error(`Unknown section: ${section}`)
      }
    }
  }

  return beatmap
}
