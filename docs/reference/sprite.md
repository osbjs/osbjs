# Sprite

::: info
Inherits: [Graphic](./graphic)
:::

A basic image.

Example:

```ts
const spr = new Sprite({
  path: 'anim.png',
  layer: 'Background',
  origin: 'Centre',
  position: [320, 240],
})
```

## Constructor details

```ts
new Sprite({ path, layer, origin, commands })
```

- Parameters:
  - `path` (`string`): The path to the image's file relative to the beatmap folder.
  - `layer` (`Layer`) ([Layer](./layer)): The layer on which the sprite resides.
  - `origin` (`Origin`) ([Origin](./origin)): The origin point of the sprite.
  - `position` (`IVector2 | Vector2Tuple | Vector2`) ([Vector2](./vector2)): The position of the sprite.
  - `commands` (`Command[] | undefined`) ([Command](./command)): The commands of this sprite. Defaults to `undefined`.

## Properties

_Properties inherited from [Graphic](./graphic):_

[`layer`](./graphic#layer), [`origin`](./graphic#origin), [`path`](./graphic#path), [`position`](./graphic#position), [`commands`](./graphic#commands)

## Methods

_Methods inherited from [Graphic](./graphic):_

[`fade`](./graphic#fade), [`move`](./graphic#move), [`moveX`](./graphic#moveX), [`moveY`](./graphic#moveY), [`scale`](./graphic#scale), [`scaleVec`](./graphic#scaleVec), [`rotate`](./graphic#rotate), [`color`](./graphic#color), [`flipH`](./graphic#flipH), [`flipV`](./graphic#flipV), [`additive`](./graphic#additive), [`startLoopGroup`](./graphic#startLoopGroup), [`startTriggerGroup`](./graphic#startTriggerGroup), [`endGroup`](./graphic#endGroup)

### `toString()`

Return a string representation of this sprite.

- Returns: `string`
