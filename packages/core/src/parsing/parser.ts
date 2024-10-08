import { Animation } from '../storyboarding/Animation'
import { Container } from '../storyboarding/Container'
import { isEasing } from '../storyboarding/Easing'
import { isLayer } from '../storyboarding/Layer'
import { isOrigin } from '../storyboarding/Origin'
import { isSampleLayer, Sample } from '../storyboarding/Sample'
import { Sprite } from '../storyboarding/Sprite'
import { isTriggerType } from '../storyboarding/Trigger'
import { Color3 } from '../types/Color3'
import { Timestamp } from '../types/Timestamp'
import { Vector2 } from '../types/Vector2'
import { Background } from './Background'
import { Beatmap } from './Beatmap'
import { Break } from './Break'
import { Circle } from './Circle'
import { HitSample } from './HitSample'
import { Hold } from './Hold'
import { isSampleSet, SampleSet } from './SampleSet'
import { isCurveType, Slider } from './Slider'
import { Spinner } from './Spinner'
import { TimingPoint } from './TimingPoint'
import { Video } from './Video'

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

  if (k === undefined) throw new Error(`Cannot parse key from ${line}`)

  return [trim ? k.trim() : k, v?.length ? (trim ? v.trim() : v) : ''] as const
}

function ensureKeyValue<T>(key: string, val: any, ...possibleValues: T[]): T {
  if (!possibleValues.includes(val))
    throw new Error(
      `Key ${key} expected ${possibleValues.map(v => `'${v}'`).join(', ')} but received ${val}`,
    )
  return val
}

function parseColor3(k: string, v: string): Color3 {
  const split = v.split(',').map(p => parseInt(p, 10))

  if (split.length < 3)
    throw new Error(
      `Invalid color format (should be R,G,B or R,G,B,A) for key Combo${k}: ${v}`,
    )

  return new Color3(split)
}

function parseHitSample(v: string, line: string): HitSample {
  const split = v.split(':')
  const [_normalSet, _additionSet, _index, _volume] = split

  if (
    _normalSet === undefined ||
    _additionSet === undefined ||
    _index === undefined ||
    _volume === undefined
  )
    throw new Error(`Invalid hit sample: ${line}`)

  const normalSet = parseInt(_normalSet)
  const additionSet = parseInt(_additionSet)

  if (!isSampleSet(normalSet) || !isSampleSet(additionSet)) {
    throw new Error(`Invalid hit sample set: ${line}`)
  }

  const index = parseInt(_index)
  const volume = parseInt(_volume)
  let filename: string | undefined
  if (split.length > 4) {
    filename = split[4]
  }

  return new HitSample({ normalSet, additionSet, index, volume, filename })
}

const SUPPORTED_OSU_VERSION = 14

export function parseBeatmap(input: string, ignoreStoryboard = false): Beatmap {
  const lines = input
    .split('\n')
    .filter(line => !isWhiteSpace(line) && !isComment(line))
  if (lines.length === 0) throw new Error('Empty beatmap')

  let match = input.match(/osu file format v(\d+)/)
  if (!match || !match[1]) throw new Error('Unknown .osu version')
  const version = parseInt(match[1])

  if (isNaN(version) || SUPPORTED_OSU_VERSION > version)
    throw new Error('Unsupported .osu version')

  const beatmap = new Beatmap(version)

  let section: string | undefined = undefined
  let isEventsSection = false

  let event: Sprite | Animation | Sample | undefined
  let isInCommandGroup = false

  for (let line of lines) {
    if (section !== 'Metadata') {
      line = stripComments(line)
    }

    line = line.trimEnd()

    if (line.startsWith('[') && line.endsWith(']')) {
      let possibleSection = extractSection(line)

      if (!possibleSection) throw new Error(`Unknown section: ${line}`)

      section = possibleSection
      isEventsSection = section === 'Events'

      continue
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
            beatmap[section][k] = ensureKeyValue(k, v, 'Normal', 'Soft', 'Drum')
            break

          case 'Countdown':
          case 'Mode':
            beatmap[section][k] = ensureKeyValue(k, parseInt(v), 0, 1, 2, 3)
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
            beatmap[section][k] = Boolean(ensureKeyValue(k, parseInt(v), 0, 1))
            break

          case 'OverlayPosition':
            beatmap[section][k] = ensureKeyValue(
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
            beatmap[section][k] = v
              .split(',')
              .map(ts => new Timestamp(parseInt(ts)))
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
          case 'HPDrainRate':
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
        let depth = 0
        while (line.substring(depth).startsWith(' ')) depth++

        if (depth > 2) throw new Error(`Failed to parse event: ${line}`)

        const split = line.trim().split(',')

        if (
          isInCommandGroup &&
          depth < 2 &&
          (event instanceof Animation || event instanceof Sprite)
        ) {
          event.endGroup()
          isInCommandGroup = false
        }

        if (depth === 0) {
          if (split[0] === 'Sprite') {
            if (ignoreStoryboard) continue
            const layer = split[1]
            const origin = split[2]
            const path = split[3]
            const x = split[4]
            const y = split[5]

            if (
              !isLayer(layer) ||
              !isOrigin(origin) ||
              path === undefined ||
              x === undefined ||
              y === undefined
            )
              throw new Error(`Missing required Sprite parameters: ${line}`)

            event = new Sprite({
              path: path.replaceAll('"', ''),
              layer,
              origin,
              position: new Vector2(parseFloat(x), parseFloat(y)),
            })

            beatmap[section].push(event)
          } else if (split[0] === 'Animation') {
            if (ignoreStoryboard) continue
            const layer = split[1]
            const origin = split[2]
            const path = split[3]
            const x = split[4]
            const y = split[5]
            const frameCount = split[6]
            const frameDelay = split[7]
            const loopType = split[8]

            if (
              !isLayer(layer) ||
              !isOrigin(origin) ||
              path === undefined ||
              x === undefined ||
              y === undefined ||
              frameCount === undefined ||
              frameDelay === undefined ||
              (loopType !== 'LoopOnce' && loopType !== 'LoopForever')
            )
              throw new Error(`Missing required Animation parameters: ${line}`)

            event = new Animation({
              path: path.replaceAll('"', ''),
              layer,
              origin,
              position: new Vector2(parseFloat(x), parseFloat(y)),
              frameCount: parseInt(frameCount),
              frameDelay: parseInt(frameDelay),
              repeat: loopType !== 'LoopOnce',
            })

            beatmap[section].push(event)
          } else if (split[0] === 'Sample') {
            if (ignoreStoryboard) continue
            const _time = split[1]
            const _layer = split[2]
            const path = split[3]
            const volume = split[4]

            if (
              _time === undefined ||
              _layer === undefined ||
              path === undefined
            )
              throw new Error(`Missing required Sample parameters: ${line}`)

            const layer = parseInt(_layer)
            if (!isSampleLayer(layer))
              throw new Error(`${layer} is not a valid sample layer: ${line}`)

            const time = parseInt(_time)

            event = new Sample({
              path: path.replaceAll('"', ''),
              layer,
              time,
              volume: volume !== undefined ? parseInt(volume) : undefined,
            })

            beatmap[section].push(event)
          } else if (split[0] === '0') {
            const path = split[2]
            const x = split[3]
            const y = split[4]

            if (path === undefined || x === undefined || y === undefined)
              throw new Error(`Missing required Background parameters: ${line}`)
            beatmap.Events.push(
              new Background({
                path: path.replaceAll('"', ''),
                position: new Vector2(parseFloat(x), parseFloat(y)),
              }),
            )
          } else if (split[0] === '1' || split[0] === 'Video') {
            const startTime = split[1]
            const path = split[2]
            const x = split[3]
            const y = split[4]

            if (
              startTime === undefined ||
              path === undefined ||
              x === undefined ||
              y === undefined
            )
              throw new Error(`Missing required Video parameters: ${line}`)

            beatmap.Events.push(
              new Video({
                startTime: parseInt(startTime),
                path: path.replaceAll('"', ''),
                position: new Vector2(parseFloat(x), parseFloat(y)),
              }),
            )
          } else if (split[0] === '2' || split[0] === 'Break') {
            const startTime = split[1]
            const endTime = split[2]

            if (startTime === undefined || endTime === undefined)
              throw new Error(`Missing required Background parameters: ${line}`)

            beatmap.Events.push(
              new Break({
                startTime: parseInt(startTime),
                endTime: parseInt(endTime),
              }),
            )
          } else {
            throw new Error(`Unknown event: ${line}`)
          }
        } else {
          if (ignoreStoryboard) continue
          if (!event)
            throw new Error(`Expected event object, found command: ${line}`)

          if (split[0] === 'T') {
            if (depth !== 1)
              throw new Error(
                `Cannot call trigger command inside another command group: ${line}`,
              )

            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Trigger command can only be called on Sprite and Animation object',
              )

            isInCommandGroup = true

            const triggerType = split[1]
            const startTime = split[2]
            const endTime = split[3]

            if (
              !isTriggerType(triggerType) ||
              startTime === undefined ||
              endTime === undefined
            )
              throw new Error(
                `Missing required trigger command parameters: ${line}`,
              )

            event.startTriggerGroup({
              triggerType,
              startTime: parseInt(startTime),
              endTime: parseInt(endTime),
            })
          } else if (split[0] === 'L') {
            if (depth !== 1)
              throw new Error(
                `Cannot call loop command inside another command group: ${line}`,
              )

            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Loop command can only be called on Sprite and Animation object',
              )

            isInCommandGroup = true

            const startTime = split[1]
            const loopCount = split[2]

            if (startTime === undefined || loopCount === undefined)
              throw new Error(
                `Missing required loop command parameters: ${line}`,
              )

            event.startLoopGroup({
              startTime: parseInt(startTime),
              loopCount: parseInt(loopCount),
            })
          } else {
            const commandType = split[0]
            const _easing = split[1]
            const _startTime = split[2]
            const _endTime = split[3]

            if (
              commandType === undefined ||
              _easing === undefined ||
              _startTime === undefined ||
              _endTime === undefined
            )
              throw new Error(`Missing required command parameter: ${line}`)

            const easing = parseInt(_easing)
            if (!isEasing(easing)) throw new Error(`Invalid easing: ${line}`)
            const startTime = parseInt(_startTime)
            const endTime = _endTime.length ? parseInt(_endTime) : undefined

            if (commandType === 'F') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Fade command can only be called on Sprite and Animation object',
                )
              const startValue = split[4]
              const endValue = split[5]

              if (startValue === undefined)
                throw new Error(
                  `Missing required fade command parameter: ${line}`,
                )

              event.fade({
                startTime,
                endTime,
                startValue: parseFloat(startValue),
                endValue: endValue ? parseFloat(endValue) : undefined,
                easing,
              })
            } else if (commandType === 'S') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Scale command can only be called on Sprite and Animation object',
                )
              const startValue = split[4]
              const endValue = split[5]

              if (startValue === undefined)
                throw new Error(
                  `Missing required scale command parameter: ${line}`,
                )

              event.scale({
                startTime,
                endTime,
                startValue: parseFloat(startValue),
                endValue: endValue ? parseFloat(endValue) : undefined,
                easing,
              })
            } else if (commandType === 'V') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Vector scale command can only be called on Sprite and Animation object',
                )
              const startX = split[4]
              const startY = split[5]
              const endX = split[6]
              const endY = split[7]

              if (startX === undefined || startY === undefined)
                throw new Error(
                  `Missing required vector scale command parameter: ${line}`,
                )

              event.scaleVec({
                startTime,
                endTime,
                startValue: new Vector2(parseFloat(startX), parseFloat(startY)),
                endValue: new Vector2(
                  endX ? parseFloat(endX) : parseFloat(startX),
                  endY ? parseFloat(endY) : parseFloat(startY),
                ),
                easing,
              })
            } else if (commandType === 'R') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Rotate command can only be called on Sprite and Animation object',
                )
              const startValue = split[4]
              const endValue = split[5]

              if (startValue === undefined)
                throw new Error(
                  `Missing required rotate command parameter: ${line}`,
                )

              event.rotate({
                startTime,
                endTime,
                startValue: parseFloat(startValue),
                endValue: endValue ? parseFloat(endValue) : undefined,
                easing,
              })
            } else if (commandType === 'MX') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Move X command can only be called on Sprite and Animation object',
                )
              const startValue = split[4]
              const endValue = split[5]

              if (startValue === undefined)
                throw new Error(
                  `Missing required move X command parameter: ${line}`,
                )

              event.moveX({
                startTime,
                endTime,
                startValue: parseFloat(startValue),
                endValue: endValue ? parseFloat(endValue) : undefined,
                easing,
              })
            } else if (commandType === 'MY') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Move Y command can only be called on Sprite and Animation object',
                )
              const startValue = split[4]
              const endValue = split[5]

              if (startValue === undefined)
                throw new Error(
                  `Missing required move Y command parameter: ${line}`,
                )

              event.moveY({
                startTime,
                endTime,
                startValue: parseFloat(startValue),
                endValue: endValue ? parseFloat(endValue) : undefined,
                easing,
              })
            } else if (commandType === 'M') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Move command can only be called on Sprite and Animation object',
                )
              const startX = split[4]
              const startY = split[5]
              const endX = split[6]
              const endY = split[7]

              if (startX === undefined || startY === undefined)
                throw new Error(
                  `Missing required move command parameter: ${line}`,
                )

              event.move({
                startTime,
                endTime,
                startValue: new Vector2(parseFloat(startX), parseFloat(startY)),
                endValue: new Vector2(
                  endX ? parseFloat(endX) : parseFloat(startX),
                  endY ? parseFloat(endY) : parseFloat(startY),
                ),
                easing,
              })
            } else if (commandType === 'P') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Parameter command can only be called on Sprite and Animation object',
                )
              const parameter = split[4]

              switch (parameter) {
                case 'H':
                  event.flipH({
                    startTime,
                    endTime,
                  })
                  break

                case 'V':
                  event.flipV({
                    startTime,
                    endTime,
                  })
                  break

                case 'A':
                  event.additive({
                    startTime,
                    endTime,
                  })

                default:
                  throw new Error(`Unknown command parameter: ${line}`)
              }
            } else if (commandType === 'C') {
              if (!(event instanceof Sprite) && !(event instanceof Animation))
                throw new Error(
                  'Color command can only be called on Sprite and Animation object',
                )
              const startR = split[4]
              const startG = split[5]
              const startB = split[6]
              const endR = split[7]
              const endG = split[8]
              const endB = split[9]

              if (
                startR === undefined ||
                startG === undefined ||
                startB === undefined
              )
                throw new Error(
                  `Missing required color command parameter: ${line}`,
                )

              event.color({
                startTime,
                endTime,
                startValue: [
                  parseFloat(startR),
                  parseFloat(startG),
                  parseFloat(startB),
                ],
                endValue: [
                  endR ? parseFloat(endR) : parseFloat(startR),
                  endG ? parseFloat(endG) : parseFloat(startG),
                  endB ? parseFloat(endB) : parseFloat(startB),
                ],
                easing,
              })
            } else {
              throw new Error(`Unknown command: ${line}`)
            }
          }
        }
      } else if (section === 'TimingPoints') {
        const [
          time,
          beatLength,
          meter,
          _sampleSet,
          sampleIndex,
          volume,
          _uninherited,
          effects,
        ] = line.split(',')

        if (
          time === undefined ||
          sampleIndex === undefined ||
          _sampleSet === undefined ||
          volume === undefined ||
          effects === undefined ||
          _uninherited === undefined ||
          beatLength === undefined ||
          meter === undefined
        )
          throw new Error(`Invalid timing point: ${line}`)

        const sampleSet = parseInt(_sampleSet)
        if (!isSampleSet(sampleSet))
          throw new Error(`Invalid sample set for timing point: ${line}`)

        const uninherited = Boolean(parseInt(_uninherited))

        beatmap.TimingPoints.push(
          new TimingPoint({
            time: new Timestamp(parseInt(time)),
            beatLength: parseFloat(beatLength),
            meter: uninherited ? parseInt(meter) : undefined,
            sampleSet,
            sampleIndex: parseInt(sampleIndex),
            volume: parseInt(volume),
            uninherited,
            effects: parseInt(effects),
          }),
        )
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
        const split = line.split(',')
        const [_x, _y, _time, _type, _hitSound] = split
        if (
          _x === undefined ||
          _y === undefined ||
          _time === undefined ||
          _type === undefined ||
          _hitSound === undefined
        )
          throw new Error(`Missing required hit object parameters: ${line}`)

        const x = parseFloat(_x)
        const y = parseFloat(_y)
        const time = parseInt(_time)
        const type = parseInt(_type)
        const hitSound = parseInt(_hitSound)

        if ((type & 1) === 1) {
          let hitSample: HitSample | undefined
          if (split.length > 5) hitSample = parseHitSample(split[5]!, line)

          beatmap.HitObjects.push(
            new Circle({
              position: new Vector2(x, y),
              time: new Timestamp(time),
              type,
              hitSound,
              hitSample,
            }),
          )
        } else if ((type & 2) === 2) {
          if (split.length < 8)
            throw new Error(`Missing required slider parameters: ${line}`)

          const curveTypeAndCurvePoints = split[5]!.split('|')
          if (curveTypeAndCurvePoints.length < 2)
            throw new Error(`Missing slider curve parameters: ${line}`)
          const [curveType, ..._curvePoints] = curveTypeAndCurvePoints
          if (!isCurveType(curveType))
            throw new Error(
              `${curveType} is not a valid slider curve type: ${line}`,
            )

          const curvePoints = _curvePoints.map(p => {
            const [x, y] = p.split(':')

            if (x === undefined || y === undefined)
              throw new Error(`${p} is not a valid curve point: ${line}`)

            return new Vector2(parseFloat(x), parseFloat(y))
          })

          const slides = parseInt(split[6]!)
          const length = parseFloat(split[7]!)

          let edgeSounds: number[] | undefined
          let edgeSets: [SampleSet, SampleSet][] | undefined
          let hitSample: HitSample | undefined
          if (split.length > 10) {
            edgeSounds = split[8]!.split('|').map(v => parseInt(v, 10))

            edgeSets = split[9]!.split('|').map(s => {
              const [_normalSet, _additionSet] = s.split(':')

              if (_normalSet === undefined || _additionSet === undefined)
                throw new Error(`${s} is not a valid sample set: ${line}`)

              const normalSet = parseInt(_normalSet)
              const additionSet = parseInt(_additionSet)

              if (!isSampleSet(normalSet) || !isSampleSet(additionSet))
                throw new Error(`${s} is not a valid sample set: ${line}`)

              return [normalSet, additionSet]
            })
            hitSample = parseHitSample(split[10]!, line)
          }

          beatmap.HitObjects.push(
            new Slider({
              position: new Vector2(x, y),
              time: new Timestamp(time),
              type,
              hitSound,
              hitSample,
              curvePoints,
              curveType,
              slides,
              length,
              edgeSets,
              edgeSounds,
            }),
          )
        } else if ((type & 8) === 8) {
          if (split.length < 6)
            throw new Error(`Missing required spinner parameters: ${line}`)

          const endTime = new Timestamp(parseInt(split[5]!))

          let hitSample: HitSample | undefined
          if (split[6]) hitSample = parseHitSample(split[6], line)

          beatmap.HitObjects.push(
            new Spinner({
              startTime: new Timestamp(time),
              endTime,
              type,
              hitSound,
              hitSample,
            }),
          )
        } else if ((type & 128) === 128) {
          if (split.length < 6)
            throw new Error(`Missing required hold parameters: ${line}`)

          const [_endTime, _hitSample] = split[5]!.split(':')

          const endTime = new Timestamp(parseInt(_endTime!))

          let hitSample: HitSample | undefined
          if (_hitSample) hitSample = parseHitSample(_hitSample, line)

          beatmap.HitObjects.push(
            new Hold({
              time: new Timestamp(time),
              endTime,
              type,
              hitSound,
              hitSample,
            }),
          )
        } else {
          throw new Error(`Unknown hit object type: ${line}`)
        }
      } else {
        throw new Error(`Unknown section: ${line}`)
      }
    }
  }

  return beatmap
}

function parseVariablesSection(lines: string[]) {
  let isVariablesSection = false
  const variables: Record<string, string> = {}
  let section: string | undefined

  for (let line of lines) {
    line = line.trim()

    if (line.startsWith('[') && line.endsWith(']')) {
      let possibleSection = extractSection(line)

      if (!possibleSection) throw new Error(`Unknown section: ${line}`)

      section = possibleSection
      isVariablesSection = section === 'Variables'

      continue
    }

    if (isVariablesSection) {
      const [identifier, value] = line.split('=')

      if (!identifier || !value)
        throw new Error(`Failed to parse variable: ${line}`)

      variables[identifier] = value
    }
  }

  return variables
}

function applyVariables(line: string, variables: Record<string, string>) {
  let result = line.trim()

  for (const [identifier, value] of Object.entries(variables)) {
    result.replaceAll(identifier, value)
  }

  return result
}

export function parseStoryboard(input: string): Container {
  const lines = input
    .split('\n')
    .filter(line => !isWhiteSpace(line) && !isComment(line))
  if (lines.length === 0) throw new Error('Empty storyboard')

  const sb = new Container()

  let event: Sprite | Animation | Sample | undefined
  let isInCommandGroup = false
  const variables = parseVariablesSection(lines)
  let isEventsSection = false
  let section: string | undefined

  for (let line of lines) {
    line = stripComments(line).trimEnd()

    if (line.startsWith('[') && line.endsWith(']')) {
      let possibleSection = extractSection(line)

      if (!possibleSection) throw new Error(`Unknown section: ${line}`)

      section = possibleSection
      isEventsSection = section === 'Events'

      continue
    }

    if (isEventsSection) {
      let depth = 0

      while (line.substring(depth).startsWith(' ')) depth++

      if (depth > 2) throw new Error(`Failed to parse event: ${line}`)

      const split = applyVariables(line.trim(), variables).split(',')

      if (
        isInCommandGroup &&
        depth < 2 &&
        (event instanceof Animation || event instanceof Sprite)
      ) {
        event.endGroup()
        isInCommandGroup = false
      }

      if (depth === 0) {
        if (split[0] === 'Sprite') {
          const layer = split[1]
          const origin = split[2]
          const path = split[3]
          const x = split[4]
          const y = split[5]

          if (
            !isLayer(layer) ||
            !isOrigin(origin) ||
            path === undefined ||
            x === undefined ||
            y === undefined
          )
            throw new Error(`Missing required Sprite parameters: ${line}`)

          event = new Sprite({
            path: path.replaceAll('"', ''),
            layer,
            origin,
            position: new Vector2(parseFloat(x), parseFloat(y)),
          })

          sb.children.push(event)
        } else if (split[0] === 'Animation') {
          const layer = split[1]
          const origin = split[2]
          const path = split[3]
          const x = split[4]
          const y = split[5]
          const frameCount = split[6]
          const frameDelay = split[7]
          const loopType = split[8]

          if (
            !isLayer(layer) ||
            !isOrigin(origin) ||
            path === undefined ||
            x === undefined ||
            y === undefined ||
            frameCount === undefined ||
            frameDelay === undefined ||
            (loopType !== 'LoopOnce' && loopType !== 'LoopForever')
          )
            throw new Error(`Missing required Animation parameters: ${line}`)

          event = new Animation({
            path: path.replaceAll('"', ''),
            layer,
            origin,
            position: new Vector2(parseFloat(x), parseFloat(y)),
            frameCount: parseInt(frameCount),
            frameDelay: parseInt(frameDelay),
            repeat: loopType !== 'LoopOnce',
          })

          sb.children.push(event)
        } else if (split[0] === 'Sample') {
          const _time = split[1]
          const _layer = split[2]
          const path = split[3]
          const volume = split[4]

          if (_time === undefined || _layer === undefined || path === undefined)
            throw new Error(`Missing required Sample parameters: ${line}`)

          const layer = parseInt(_layer)
          if (!isSampleLayer(layer))
            throw new Error(`${layer} is not a valid sample layer: ${line}`)

          const time = parseInt(_time)

          event = new Sample({
            path: path.replaceAll('"', ''),
            layer,
            time,
            volume: volume !== undefined ? parseInt(volume) : undefined,
          })

          sb.children.push(event)
        } else {
          throw new Error(`Unknown event: ${line}`)
        }
      } else {
        if (!event)
          throw new Error(`Expected event object, found command: ${line}`)

        if (split[0] === 'T') {
          if (depth !== 1)
            throw new Error(
              `Cannot call trigger command inside another command group: ${line}`,
            )

          if (!(event instanceof Sprite) && !(event instanceof Animation))
            throw new Error(
              'Trigger command can only be called on Sprite and Animation object',
            )

          isInCommandGroup = true

          const triggerType = split[1]
          const startTime = split[2]
          const endTime = split[3]

          if (
            !isTriggerType(triggerType) ||
            startTime === undefined ||
            endTime === undefined
          )
            throw new Error(
              `Missing required trigger command parameters: ${line}`,
            )

          event.startTriggerGroup({
            triggerType,
            startTime: parseInt(startTime),
            endTime: parseInt(endTime),
          })
        } else if (split[0] === 'L') {
          if (depth !== 1)
            throw new Error(
              `Cannot call loop command inside another command group: ${line}`,
            )

          if (!(event instanceof Sprite) && !(event instanceof Animation))
            throw new Error(
              'Loop command can only be called on Sprite and Animation object',
            )

          isInCommandGroup = true

          const startTime = split[1]
          const loopCount = split[2]

          if (startTime === undefined || loopCount === undefined)
            throw new Error(`Missing required loop command parameters: ${line}`)

          event.startLoopGroup({
            startTime: parseInt(startTime),
            loopCount: parseInt(loopCount),
          })
        } else {
          const commandType = split[0]
          const _easing = split[1]
          const _startTime = split[2]
          const _endTime = split[3]

          if (
            commandType === undefined ||
            _easing === undefined ||
            _startTime === undefined ||
            _endTime === undefined
          )
            throw new Error(`Missing required command parameter: ${line}`)

          const easing = parseInt(_easing)
          if (!isEasing(easing)) throw new Error(`Invalid easing: ${line}`)
          const startTime = parseInt(_startTime)
          const endTime = _endTime.length ? parseInt(_endTime) : undefined

          if (commandType === 'F') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Fade command can only be called on Sprite and Animation object',
              )
            const startValue = split[4]
            const endValue = split[5]

            if (startValue === undefined)
              throw new Error(
                `Missing required fade command parameter: ${line}`,
              )

            event.fade({
              startTime,
              endTime,
              startValue: parseFloat(startValue),
              endValue: endValue ? parseFloat(endValue) : undefined,
              easing,
            })
          } else if (commandType === 'S') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Scale command can only be called on Sprite and Animation object',
              )
            const startValue = split[4]
            const endValue = split[5]

            if (startValue === undefined)
              throw new Error(
                `Missing required scale command parameter: ${line}`,
              )

            event.scale({
              startTime,
              endTime,
              startValue: parseFloat(startValue),
              endValue: endValue ? parseFloat(endValue) : undefined,
              easing,
            })
          } else if (commandType === 'V') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Vector scale command can only be called on Sprite and Animation object',
              )
            const startX = split[4]
            const startY = split[5]
            const endX = split[6]
            const endY = split[7]

            if (startX === undefined || startY === undefined)
              throw new Error(
                `Missing required vector scale command parameter: ${line}`,
              )

            event.scaleVec({
              startTime,
              endTime,
              startValue: new Vector2(parseFloat(startX), parseFloat(startY)),
              endValue: new Vector2(
                endX ? parseFloat(endX) : parseFloat(startX),
                endY ? parseFloat(endY) : parseFloat(startY),
              ),
              easing,
            })
          } else if (commandType === 'R') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Rotate command can only be called on Sprite and Animation object',
              )
            const startValue = split[4]
            const endValue = split[5]

            if (startValue === undefined)
              throw new Error(
                `Missing required rotate command parameter: ${line}`,
              )

            event.rotate({
              startTime,
              endTime,
              startValue: parseFloat(startValue),
              endValue: endValue ? parseFloat(endValue) : undefined,
              easing,
            })
          } else if (commandType === 'MX') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Move X command can only be called on Sprite and Animation object',
              )
            const startValue = split[4]
            const endValue = split[5]

            if (startValue === undefined)
              throw new Error(
                `Missing required move X command parameter: ${line}`,
              )

            event.moveX({
              startTime,
              endTime,
              startValue: parseFloat(startValue),
              endValue: endValue ? parseFloat(endValue) : undefined,
              easing,
            })
          } else if (commandType === 'MY') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Move Y command can only be called on Sprite and Animation object',
              )
            const startValue = split[4]
            const endValue = split[5]

            if (startValue === undefined)
              throw new Error(
                `Missing required move Y command parameter: ${line}`,
              )

            event.moveY({
              startTime,
              endTime,
              startValue: parseFloat(startValue),
              endValue: endValue ? parseFloat(endValue) : undefined,
              easing,
            })
          } else if (commandType === 'M') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Move command can only be called on Sprite and Animation object',
              )
            const startX = split[4]
            const startY = split[5]
            const endX = split[6]
            const endY = split[7]

            if (startX === undefined || startY === undefined)
              throw new Error(
                `Missing required move command parameter: ${line}`,
              )

            event.move({
              startTime,
              endTime,
              startValue: new Vector2(parseFloat(startX), parseFloat(startY)),
              endValue: new Vector2(
                endX ? parseFloat(endX) : parseFloat(startX),
                endY ? parseFloat(endY) : parseFloat(startY),
              ),
              easing,
            })
          } else if (commandType === 'P') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Parameter command can only be called on Sprite and Animation object',
              )
            const parameter = split[4]

            switch (parameter) {
              case 'H':
                event.flipH({
                  startTime,
                  endTime,
                })
                break

              case 'V':
                event.flipV({
                  startTime,
                  endTime,
                })
                break

              case 'A':
                event.additive({
                  startTime,
                  endTime,
                })

              default:
                throw new Error(`Unknown command parameter: ${line}`)
            }
          } else if (commandType === 'C') {
            if (!(event instanceof Sprite) && !(event instanceof Animation))
              throw new Error(
                'Color command can only be called on Sprite and Animation object',
              )
            const startR = split[4]
            const startG = split[5]
            const startB = split[6]
            const endR = split[7]
            const endG = split[8]
            const endB = split[9]

            if (
              startR === undefined ||
              startG === undefined ||
              startB === undefined
            )
              throw new Error(
                `Missing required color command parameter: ${line}`,
              )

            event.color({
              startTime,
              endTime,
              startValue: [
                parseFloat(startR),
                parseFloat(startG),
                parseFloat(startB),
              ],
              endValue: [
                endR ? parseFloat(endR) : parseFloat(startR),
                endG ? parseFloat(endG) : parseFloat(startG),
                endB ? parseFloat(endB) : parseFloat(startB),
              ],
              easing,
            })
          } else {
            throw new Error(`Unknown command: ${line}`)
          }
        }
      }
    }
  }

  return sb
}
