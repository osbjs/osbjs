/**
 * The layer the object appears on.
 */
export type Layer = (typeof Layer)[keyof typeof Layer]

/**
 * The layer the object appears on.
 */
export const Layer = {
  Background: 'Background',
  Foreground: 'Foreground',
  Fail: 'Fail',
  Pass: 'Pass',
  Overlay: 'Overlay',
} as const

export function isLayer(layer: unknown): layer is Layer {
  return (
    layer === 'Background' ||
    layer === 'Foreground' ||
    layer === 'Fail' ||
    layer === 'Pass' ||
    layer === 'Overlay'
  )
}
