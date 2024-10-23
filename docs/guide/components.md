# Components

## Overview

When your storyboard grow in complexity, sometimes you will end up recreating the same sprites or scenes/containers that do the same thing. That's when you should split your code into multiple reusable components. For example, when the song goes into the chorus you wanna do a raining effect.

## Defining a component

Here are some ways to define a component:

::: code-group

```js [imperative class style]
class RainingScene extends Component {
  constructor({ startTime, endTime, duration, step = 1000 }) {
    super()
    this.startTime = startTime
    this.endTime = endTime
    this.duration = duration
    this.step = step
    this.render()
  }

  render() {
    for (let i = startTime; i <= endTime; i += this.step) {
      let startPosition = new Vector2(randInt(-107, 747), 0)
      let spr = new Sprite({
        path: 'dot.jpg',
        layer: 'Background',
        origin: 'Centre',
        position: startPosition,
      })
      spr.scaleVec({
        startTime: i,
        startValue: [1, randInt(5, 10)],
      })
      spr.fade({
        startTime: i,
        startValue: 1,
      })
      spr.move({
        startTime: i,
        endTime: i + this.duration,
        startValue: startPosition,
        endValue: new Vector2(startPosition.x, 480),
      })
      this.children.push(spr)
    }
  }
}

const sb = new Storyboard()

// ..

sb.children.push(
  new RainingScene({
    startTime: 0,
    endTime: 10000,
    duration: 20,
  }),
)
```

```js [declarative function style]
function RainParticle({ startTime, endTime }) {
  let startPosition = new Vector2(randInt(-107, 747), 0)
  let endPosition = new Vector2(startPosition.x, 480)

  return new Sprite({
    path: 'dot.jpg',
    layer: 'Background',
    origin: 'Centre',
    position: startPosition,
    commands: [
      new ScaleVec({
        startTime,
        startValue: [1, randInt(5, 10)],
      }),
      new Fade({ startTime, startValue: 1 }),
      new Move({
        startTime,
        endTime,
        startValue: startPosition,
        endValue: endPosition,
      }),
    ],
  })
}

function RainingScene({ startTime, endTime, duration, step = 1000 }) {
  return new Component({
    children: range(startTime, endTime, step).map(i =>
      RainParticle({ startTime: i, endTime: i + duration }),
    ),
  })
}

const sb = new Storyboard({
  children: [
    // ..
    RainingScene({
      startTime: 0,
      endTime: 10000,
      duration: 20,
    }),
  ],
})
```

:::

Even though you can keep multiple components in the same file, it is recommended to move them to separate files.
