# @osbjs/core

This package contains the functionality necessary for defining osu! storyboard elements and parsing .osu/.osb file.

## Usage

### Creating storyboard

```ts
import { Storyboard, Sprite } from '@osbjs/core'
import fs from 'fs'

const sb = new Storyboard()

const starImage = new Sprite({
  path: 'star.png',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240]
})
starImage.move({
  startTime: 0,
  endTime: 1000,
  startValue: [0, 0],
  endValue: [100, 100],
})
sb.children.push(starImage)

const osb = sb.toString()

fs.writeFileSync(
  'path/to/your/beatmap/folder/your-storyboard.osb',
  osb,
  'utf-8',
)
```

### Parsing beatmap

```ts
import { parseBeatmap } from '@osbjs/core'

const beatmap = parseBeatmap(
  fs.readFileSync('path/to/your/beatmap/folder/your-storyboard.osu', 'utf-8'),
)
```

## Documentation

Visit the [documentation page](https://osbjs.vercel.app).
