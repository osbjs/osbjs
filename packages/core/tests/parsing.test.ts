import { readFileSync } from 'fs'
import { join } from 'path'
import {
  Animation,
  Background,
  Beatmap,
  Break,
  Circle,
  Color,
  Color3,
  Component,
  Fade,
  FlipH,
  HitSample,
  Loop,
  Move,
  parseBeatmap,
  parseStoryboard,
  Sample,
  SampleLayer,
  Scale,
  Slider,
  Spinner,
  Sprite,
  Timestamp,
  TimingPoint,
  Trigger,
  Vector2,
} from '../src'

describe('Parsing', () => {
  // todo check beatmap with storyboard
  it('parse beatmap correctly', () => {
    const data = readFileSync(
      join(process.cwd(), 'tests/data/testBeatmap.osu'),
      'utf-8',
    ).replace(/\r/g, '')

    const beatmap = parseBeatmap(data)

    const expectedBeatmap = new Beatmap(14)

    expectedBeatmap.General = {
      AudioFilename: 'audio.mp3',
      AudioLeadIn: 0,
      PreviewTime: 117436,
      Countdown: 0,
      SampleSet: 'Soft',
      StackLeniency: 0.3,
      Mode: 0,
      LetterboxInBreaks: false,
      WidescreenStoryboard: false,
    }
    expectedBeatmap.Editor = {
      Bookmarks: [
        new Timestamp(4936),
        new Timestamp(14536),
        new Timestamp(24136),
      ],
      DistanceSpacing: 1,
      BeatDivisor: 4,
      GridSize: 32,
      TimelineZoom: 4.899998,
    }
    expectedBeatmap.Metadata = {
      Title: 'Test title',
      TitleUnicode: 'Test title',
      Artist: 'Test artist',
      ArtistUnicode: 'Test artist',
      Creator: 'Test creator',
      Version: 'Test diff name',
      Source: 'Test source',
      Tags: 'Test tags',
      BeatmapID: 3829478,
      BeatmapSetID: 1862420,
    }
    expectedBeatmap.Difficulty = {
      HPDrainRate: 4,
      CircleSize: 4.5,
      OverallDifficulty: 9,
      ApproachRate: 9.8,
      SliderMultiplier: 2,
      SliderTickRate: 1,
    }
    expectedBeatmap.Events = [
      new Background({ path: 'bg.jpg', position: [0, 0] }),
      new Break({
        startTime: 53136,
        endTime: 60827,
      }),
      new Break({
        startTime: 74736,
        endTime: 75827,
      }),
      new Sprite({
        path: '/test.png',
        layer: 'Background',
        origin: 'Centre',
        position: [320, 240],
        commands: [
          // number command
          new Fade({
            startTime: 0,
            endTime: 1000,
            startValue: 0,
            endValue: 1,
          }),
          // vector command
          new Move({
            startTime: 1000,
            endTime: 2000,
            startValue: [100, 100],
            endValue: [300, 200],
          }),
          // color command
          new Color({
            startTime: 2000,
            endTime: 3000,
            startValue: [0, 0, 0],
            endValue: [255, 255, 255],
          }),
          // parameter command
          new FlipH({
            startTime: 5000,
            endTime: 6000,
          }),
          // omitted values
          new Scale({
            startTime: 10000,
            startValue: 2,
          }),
        ],
      }),
      new Animation({
        path: '/test.png',
        layer: 'Background',
        origin: 'Centre',
        position: [320, 240],
        frameCount: 1,
        frameDelay: 0,
        repeat: false,
        commands: [
          new Trigger({
            triggerType: 'Failing',
            startTime: 0,
            endTime: 1,
            commands: [
              new Fade({
                startTime: 0,
                startValue: 1,
              }),
            ],
          }),
          new Loop({
            loopCount: 10,
            startTime: 0,
            commands: [
              new Scale({
                startTime: 0,
                startValue: 1,
              }),
            ],
          }),
        ],
      }),
      new Sample({
        time: 0,
        layer: SampleLayer.Background,
        path: 'audio.ogg',
        volume: 90,
      }),
    ]
    expectedBeatmap.TimingPoints = [
      new TimingPoint({
        time: new Timestamp(136),
        beatLength: 300,
        meter: 4,
        sampleSet: 2,
        sampleIndex: 1,
        volume: 50,
        uninherited: true,
        effects: 0,
      }),
      new TimingPoint({
        time: new Timestamp(4336),
        beatLength: -200,
        sampleSet: 2,
        sampleIndex: 1,
        volume: 50,
        uninherited: false,
        effects: 0,
      }),
    ]
    expectedBeatmap.Colours = {
      Combo1: new Color3(255, 0, 0),
      Combo2: new Color3(255, 128, 192),
      Combo3: new Color3(128, 128, 255),
      Combo4: new Color3(255, 128, 128),
      Combo5: new Color3(0, 128, 255),
      Combo6: new Color3(0, 255, 255),
      Combo7: new Color3(255, 128, 0),
      Combo8: new Color3(128, 255, 128),
    }
    expectedBeatmap.HitObjects = [
      new Circle({
        position: new Vector2(152, 144),
        time: new Timestamp(346),
        type: 1,
        hitSound: 2,
        hitSample: new HitSample({
          normalSet: 0,
          additionSet: 0,
          index: 0,
          volume: 0,
        }),
      }),
      new Slider({
        position: new Vector2(179, 212),
        time: new Timestamp(533),
        type: 2,
        hitSound: 0,
        curveType: 'L',
        curvePoints: [new Vector2(424, 179)],
        slides: 1,
        length: 245,
        edgeSounds: [0, 0],
        edgeSets: [
          [1, 0],
          [0, 0],
        ],
        hitSample: new HitSample({
          normalSet: 0,
          additionSet: 0,
          index: 0,
          volume: 0,
        }),
      }),
      new Slider({
        position: new Vector2(202, 63),
        time: new Timestamp(1377),
        type: 2,
        hitSound: 4,
        curveType: 'B',
        curvePoints: [
          new Vector2(275, 69),
          new Vector2(255, 126),
          new Vector2(376, 136),
        ],
        slides: 1,
        length: 175,
      }),
      new Slider({
        position: new Vector2(345, 286),
        time: new Timestamp(2033),
        type: 2,
        hitSound: 0,
        curveType: 'P',
        curvePoints: [new Vector2(320, 189), new Vector2(279, 313)],
        slides: 1,
        length: 315,
      }),
      new Spinner({
        startTime: new Timestamp(3064),
        endTime: new Timestamp(4283),
        type: 12,
        hitSound: 0,
        hitSample: new HitSample({
          normalSet: 0,
          additionSet: 0,
          index: 0,
          volume: 0,
        }),
      }),
    ]

    expect(beatmap).toEqual(expectedBeatmap)
  })

  it('parse storyboard correctly', () => {
    const data = readFileSync(
      join(process.cwd(), 'tests/data/testStoryboard.osb'),
      'utf-8',
    ).replace(/\r/g, '')

    const expectedSb = new Component({
      children: [
        new Sprite({
          path: '/test.png',
          layer: 'Background',
          origin: 'Centre',
          position: [320, 240],
          commands: [
            // number command
            new Fade({
              startTime: 0,
              endTime: 1000,
              startValue: 0,
              endValue: 1,
            }),
            // vector command
            new Move({
              startTime: 1000,
              endTime: 2000,
              startValue: [100, 100],
              endValue: [300, 200],
            }),
            // color command
            new Color({
              startTime: 2000,
              endTime: 3000,
              startValue: [0, 0, 0],
              endValue: [255, 255, 255],
            }),
            // parameter command
            new FlipH({
              startTime: 5000,
              endTime: 6000,
            }),
            // omitted values
            new Scale({
              startTime: 10000,
              startValue: 2,
            }),
          ],
        }),
        new Animation({
          path: '/test.png',
          layer: 'Background',
          origin: 'Centre',
          position: [320, 240],
          frameCount: 1,
          frameDelay: 0,
          repeat: false,
          commands: [
            new Trigger({
              triggerType: 'Failing',
              startTime: 0,
              endTime: 1,
              commands: [
                new Fade({
                  startTime: 0,
                  startValue: 1,
                }),
              ],
            }),
            new Loop({
              loopCount: 10,
              startTime: 0,
              commands: [
                new Scale({
                  startTime: 0,
                  startValue: 1,
                }),
              ],
            }),
          ],
        }),
        new Sample({
          time: 0,
          layer: SampleLayer.Background,
          path: 'audio.ogg',
          volume: 90,
        }),
      ],
    })

    const sb = parseStoryboard(data)

    expect(sb).toEqual(expectedSb)
  })
})
