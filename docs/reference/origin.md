# Origin <Badge type="info" text="enum" /> <Badge type="info" text="type" />

Origin is where on the image should osu! consider that image's origin (coordinate) to be. This affects the (x) and (y) values, as well as several other command-specific behaviours.

```ts
const Origin = {
  TopLeft: 'TopLeft',
  TopCentre: 'TopCentre',
  TopRight: 'TopRight',
  CentreLeft: 'CentreLeft',
  Centre: 'Centre',
  CentreRight: 'CentreRight',
  BottomLeft: 'BottomLeft',
  BottomCentre: 'BottomCentre',
  BottomRight: 'BottomRight',
} as const

type Origin = (typeof Origin)[keyof typeof Origin]
```
