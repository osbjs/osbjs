# @osbjs/parser

Parse .osu and .osb file.

## Usage

```ts
import { Beatmap } from '@osbjs/parser'
import fs from 'fs'

const input = fs.readFileSync(
  'path/to/your/beatmap/folder/your-beatmap.osu',
  'utf-8',
)
const beatmap = Beatmap.parse(input)
if (beatmap) {
  // do your thing
}
```

## Documentation

Visit the [documentation page](https://osbjs.vercel.app).
