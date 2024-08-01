/**
 * Origin is where on the image should osu! consider that image's origin (coordinate) to be.
 * This affects the (x) and (y) values, as well as several other command-specific behaviours.
 */
export type Origin =
  | 'TopLeft'
  | 'TopCentre'
  | 'TopRight'
  | 'CentreLeft'
  | 'Centre'
  | 'CentreRight'
  | 'BottomLeft'
  | 'BottomCentre'
  | 'BottomRight'
