# Component

A container of storyboard objects.

Example:

```ts
const component = new Component({
  children: [
    new Sprite({
      path: 'anim.png',
      layer: 'Background',
      origin: 'Centre',
      position: [320, 240],
    }),
  ],
})
```

## Constructor details

_Overloads:_

```ts
new Component()
```

```ts
new Component({ children })
```

- Parameters:
  - `children` `(Component | Graphic | Sample)[] | undefined` ([Component](./component.md), [Graphic](./graphic.md), [Sample](./sample.md)) : List of child storyboard objects. Defaults to undefined.

## Properties

### `children`

List of child storyboard objects.

- Type: `(Component | Graphic | Sample)[]` ([Graphic](./graphic.md), [Sample](./sample.md))

## Methods

### `toFlatten()`

Returns the flattened container tree.

- Returns: `(Graphic | Sample)[]` ([Graphic](./graphic.md), [Sample](./sample.md))

### `toString()`

Returns the string representation of this component.

- Returns: `string`
