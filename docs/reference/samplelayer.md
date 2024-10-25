# SampleLayer <Badge type="info" text="enum" /> <Badge type="info" text="type" />

Possible layers for a sample.

```ts
const SampleLayer = {
  Background: 0,
  Fail: 1,
  Pass: 2,
  Foreground: 3,
} as const

type SampleLayer = (typeof SampleLayer)[keyof typeof SampleLayer]
```
