# Storyboard

::: info
Inherits: [Component](./component)
:::

A root component that output the correct string for a standalone .osb file.

Example:

```ts
const sb = new Storyboard({
  children: [
    new Sprite({
      path: 'anim.png',
      layer: 'Background',
      origin: 'Centre',
      position: [320, 240],
    }),
  ],
})

const osb = sb.toString()

fs.writeFileSync(path, osb, 'utf-8')
```

## Constructor details

_Overloads:_

```ts
new Storyboard()
```

```ts
new Storyboard({ children })
```

- Parameters:
  - `children` `(Component | Graphic | Sample)[] | undefined`: List of child storyboard objects. Defaults to undefined.

## Properties

_Properties inherited from [Component](./component):_

[`children`](./component#children)

## Methods

_Methods inherited from [Component](./component):_

[`toFlatten`](./component#toFlatten)

### `toString()`

Returns the string representation of this storyboard.

- Returns: `string`
