# Layer <Badge type="info" text="enum" /> <Badge type="info" text="type" />

The layer the object appears on.

```ts
const Layer = {
  Background: 'Background',
  Foreground: 'Foreground',
  Fail: 'Fail',
  Pass: 'Pass',
  Overlay: 'Overlay',
} as const

type Layer = (typeof Layer)[keyof typeof Layer]
```
