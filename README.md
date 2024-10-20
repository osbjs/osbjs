# osbjs

A minimalist osu! storyboarding library.

## Getting started

```bash
npm i @osbjs/core@latest
```

## Examples

Here's how you add a falling star effect to your beatmap set:

```ts
import { Container, Sprite } from '@osbjs/core'
import fs from 'fs'

const sb = new Container()

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

## License

osbjs is MIT licensed.
