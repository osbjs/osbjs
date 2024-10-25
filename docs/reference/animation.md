# Animation

::: info
Inherits: [Graphic](./graphic)
:::

Represent a moving image.

Examples:

```ts
const anim = new Animation({
  path: 'anim.png',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
  frameCount: 10,
  frameDelay: 0,
  repeat: false,
})
```

## Constructor details

```ts
new Animation({
  path,
  layer,
  origin,
  position,
  frameCount,
  frameDelay,
  command,
})
```

- Parameters:
  - `path` (`string`): The path to the image's file relative to the beatmap folder.
  - `layer` (`Layer`) ([Layer](./layer)): The layer on which the animation resides.
  - `origin` (`Origin`) ([Origin](./origin)): The origin point of the animation.
  - `position` (`IVector2 | Vector2Tuple | Vector2`) ([Vector2](./vector2)): The position of the animation.
  - `frameCount` (`number`): Indicates how many frames the animation has.
  - `frameDelay` (`number`): Indicates how many milliseconds should be in between each frame.
  - `repeat` (`boolean`): Indicates if the animation should loop or not.
  - `commands` (`Command[] | undefined`) ([Command](./command)): The commands of this animation. Defaults to `undefined`.

## Properties

_Properties inherited from [Graphic](./graphic):_

[`layer`](./graphic#layer), [`origin`](./graphic#origin), [`path`](./graphic#path), [`position`](./graphic#position), [`commands`](./graphic#commands)

### `frameCount`

Indicates how many frames the animation has.

- Type: `number`

### `frameDelay`

Indicates how many milliseconds should be in between each frame.

- Type: `number`

### `repeat`

Indicates if the animation should loop or not.

- Type: `boolean`

## Methods

_Methods inherited from [Graphic](./graphic):_

[`fade`](./graphic#fade), [`move`](./graphic#move), [`moveX`](./graphic#moveX), [`moveY`](./graphic#moveY), [`scale`](./graphic#scale), [`scaleVec`](./graphic#scaleVec), [`rotate`](./graphic#rotate), [`color`](./graphic#color), [`flipH`](./graphic#flipH), [`flipV`](./graphic#flipV), [`additive`](./graphic#additive), [`startLoopGroup`](./graphic#startLoopGroup), [`startTriggerGroup`](./graphic#startTriggerGroup), [`endGroup`](./graphic#endGroup)

### `toString()`

Return a string representation of this animation.

- Returns: `string`
