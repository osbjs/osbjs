# Your first storyboard

In this tutorial, we will create a simple storyboard that will shows different backgrounds at different time.

## Setup your project

Create a `main.js` file and add the following code:
::: code-group

```js [main.js] {9}
import { Storyboard } from '@osbjs/core'
import fs from 'fs'

const sb = new Storyboard()

const osb = sb.toString()

fs.writeFileSync(
  'path/to/your/beatmap/folder/your-storyboard.osb', // <- change this
  osb,
  'utf-8',
)
```

:::

This will create an empty container that will hold your storyboard later and write the final storyboard to the .osb file. Note that you need to change the name of the .osb file to `Artist - Song (Creator).osb` like your .osu file but without the difficult name or else osu! cannot pick it up.

Now run this command to build the storyboard:

```sh
$ node main
```

::: tip

You can install nodemon to watch your file instead of re-running every time you make change to the code.

```sh
$ npm i -D nodemon
```

Add this to your package.json:

```json
{
  //..
  "scripts": {
    "dev": "nodemon main"
  }
}
```

Now instead of running `node main` you will run this instead:

```sh
$ npm run dev
```

:::

You will see an empty .osb file in your beatmap folder.

## Adding backgrounds

Suppose you have downloaded backgrounds from somewhere and put them in your current beatmap folder. In this tutorial, let's call them `bg1.jpg` and `bg2.jpg` respectively, but you can name it however you like, just remember to change their names in the code.

::: code-group

```js [main.js] {1,6-12,14-20}
import { Storyboard, Sprite } from '@osbjs/core'
import fs from 'fs'

const sb = new Storyboard()

const bg1 = new Sprite({
  path: 'bg1.jpg',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
})
sb.children.push(bg1)

const bg2 = new Sprite({
  path: 'bg2.jpg',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
})
sb.children.push(bg2)

const osb = sb.toString()

fs.writeFileSync(
  'path/to/your/beatmap/folder/your-storyboard.osb',
  osb,
  'utf-8',
)
```

:::

This will be your new .osb file:

```osb {4,5}
[Events]
//Background and Video events
//Storyboard Layer 0 (Background)
Sprite,Background,Centre,"bg1.jpg",320,240
Sprite,Background,Centre,"bg2.jpg",320,240
//Storyboard Layer 1 (Fail)
//Storyboard Layer 2 (Pass)
//Storyboard Layer 3 (Foreground)
//Storyboard Layer 4 (Overlay)
//Storyboard Sound Samples
```

## Sprinkle the magic

If you open the osu! editor now, you won't see your newly added backgrounds. That's because you haven't shown them yet.

Let's say I want the `bg1` to show from 00:00:000 to 01:00:000 and the `bg2` to show from 01:00:000 to 02:00:000, I need to update the code to the following:

::: code-group

```js [main.js] {12-16,25-29}
import { Storyboard, Sprite } from '@osbjs/core'
import fs from 'fs'

const sb = new Storyboard()

const bg1 = new Sprite({
  path: 'bg1.jpg',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
})
bg1.fade({
  startTime: '00:00:000',
  endTime: '01:00:000',
  startValue: 1,
})
sb.children.push(bg1)

const bg2 = new Sprite({
  path: 'bg2.jpg',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
})
bg2.fade({
  startTime: '01:00:000',
  endTime: '02:00:000',
  startValue: 1,
})
sb.children.push(bg2)

const osb = sb.toString()

fs.writeFileSync(
  'path/to/your/beatmap/folder/your-storyboard.osb',
  osb,
  'utf-8',
)
```

:::

This will be your new .osb file:

```osb {5,7}
[Events]
//Background and Video events
//Storyboard Layer 0 (Background)
Sprite,Background,Centre,"bg1.jpg",320,240
 F,0,0,60000,1
Sprite,Background,Centre,"bg2.jpg",320,240
 F,0,60000,120000,1
//Storyboard Layer 1 (Fail)
//Storyboard Layer 2 (Pass)
//Storyboard Layer 3 (Foreground)
//Storyboard Layer 4 (Overlay)
//Storyboard Sound Samples
```

In the osu! editor you can press `Ctrl+Shift+L` to reload the beatmap and the storyboard.

If you use normal HD or Full HD resolution image, you will notice the background is zoomed out, that's because the osu! playfield is only 854x480. To fix that, you need to scale your image to fit the playfield.

::: code-group

```js [main.js] {17-20,34-37}
import { Storyboard, Sprite } from '@osbjs/core'
import fs from 'fs'

const sb = new Storyboard()

const bg1 = new Sprite({
  path: 'bg1.jpg',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
})
bg1.fade({
  startTime: '00:00:000',
  endTime: '01:00:000',
  startValue: 1,
})
bg1.scale({
  startTime: '00:00:000',
  startValue: 480 / 1080, // <- change 1080 to your image height
})
sb.children.push(bg1)

const bg2 = new Sprite({
  path: 'bg2.jpg',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
})
bg2.fade({
  startTime: '01:00:000',
  endTime: '02:00:000',
  startValue: 1,
})
bg2.scale({
  startTime: '01:00:000',
  startValue: 480 / 1080, // <- change 1080 to your image height
})
sb.children.push(bg2)

const osb = sb.toString()

fs.writeFileSync(
  'path/to/your/beatmap/folder/your-storyboard.osb',
  osb,
  'utf-8',
)
```

:::

This will be your final .osb file:

```osb {6,9}
[Events]
//Background and Video events
//Storyboard Layer 0 (Background)
Sprite,Background,Centre,"bg1.jpg",320,240
 F,0,0,60000,1
 S,0,0,,0.4444444444444444
Sprite,Background,Centre,"bg2.jpg",320,240
 F,0,60000,120000,1
 S,0,60000,,0.4444444444444444
//Storyboard Layer 1 (Fail)
//Storyboard Layer 2 (Pass)
//Storyboard Layer 3 (Foreground)
//Storyboard Layer 4 (Overlay)
//Storyboard Sound Samples
```

## Wrapping up

Congratulation! You just created your first storyboard! If you want to practice, here are some ideas for improment:

- Make the background fade in/out.
- Make the background slide in.
- Add falling stars effects.
