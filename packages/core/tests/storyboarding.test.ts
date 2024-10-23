import { readFileSync } from 'fs'
import { join } from 'path'
import {
  Animation,
  Color,
  Component,
  Fade,
  FlipH,
  Loop,
  Move,
  Sample,
  SampleLayer,
  Scale,
  Sprite,
  Trigger,
} from '../src'

describe('Storyboarding', () => {
  it('creates a storyboard with every objects and commands present', () => {
    const sb = new Component({
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

    const expectedSb = readFileSync(
      join(process.cwd(), 'tests/data/testStoryboard.osb'),
      'utf-8',
    ).replace(/\r/g, '')

    expect(`[Events]\n${sb}`).toEqual(expectedSb)
  })
})
