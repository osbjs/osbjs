/**
 * Origin is where on the image should osu! consider that image's origin (coordinate) to be.
 * This affects the (x) and (y) values, as well as several other command-specific behaviours.
 */
export type Origin = (typeof Origin)[keyof typeof Origin]

/**
 * Origin is where on the image should osu! consider that image's origin (coordinate) to be.
 * This affects the (x) and (y) values, as well as several other command-specific behaviours.
 */
export const Origin = {
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

export function isOrigin(origin: unknown): origin is Origin {
  return (
    origin === 'TopLeft' ||
    origin === 'TopCentre' ||
    origin === 'TopRight' ||
    origin === 'CentreLeft' ||
    origin === 'Centre' ||
    origin === 'CentreRight' ||
    origin === 'BottomLeft' ||
    origin === 'BottomRight' ||
    origin === 'BottomCentre'
  )
}
