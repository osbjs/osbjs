# @osbjs/core

This package contains only the functionality necessary to define osu! storyboard elements, but it should be enough for you to create a simple storyboard. For more functionality, check out other official packages.

## Usage

```ts
import { Group, Sprite } from '@osbjs/core'
import fs from 'fs'

const sb = new Group()

const starImage = new Sprite({
  path: 'star.png',
})
starImage.move({
  startTime: 0,
  endTime: 1000,
  startValue: [0, 0],
  endValue: [100, 100],
})
sb.children.push(starImage)

const osb = `[Events]\n${sb.toString()}`

fs.writeFileSync(
  'path/to/your/beatmap/folder/your-storyboard.osb',
  osb,
  'utf-8',
)
```

## Documentation

Visit the [documentation page](https://osbjs.vercel.app).
