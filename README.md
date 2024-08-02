# osbjs

A minimalist osu! storyboarding library.

## Getting started

You can get ready just by installing the core package:

```bash
npm i @osbjs/core
```

Now let's create a new storyboard:

```ts
import { Group } from '@osbjs/core'

const sb = new Group()
```

A group is a container that will holds your storyboard objects like `Sprite`, `Animation`, `Video`, etc.
You can have multiple nested `Group`.

Now let's add a star image to our storyboard and move it around:

```ts
import { Group, Sprite } from '@osbjs/core'

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
```

Note that you need to add your star image to the storyboard for it to work.

Finally, output this storyboard to your beatmap folder.

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

## License

osbjs is MIT licensed.
