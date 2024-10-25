/**
 * Possible layers for a sample.
 */
export const SampleLayer = {
  Background: 0,
  Fail: 1,
  Pass: 2,
  Foreground: 3,
} as const

/**
 * Possible layers for a sample.
 */
export type SampleLayer = (typeof SampleLayer)[keyof typeof SampleLayer]

export function isSampleLayer(layer: unknown): layer is SampleLayer {
  return layer === 0 || layer === 1 || layer === 2 || layer === 3
}
