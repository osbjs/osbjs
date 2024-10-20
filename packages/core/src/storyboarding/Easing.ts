/**
 * Easing indicates if the command should "accelerate".
 */
export const Easing = {
  Linear: 0,
  Out: 1,
  In: 2,
  InQuad: 3,
  OutQuad: 4,
  InOutQuad: 5,
  InCubic: 6,
  OutCubic: 7,
  InOutCubic: 8,
  InQuart: 9,
  OutQuart: 10,
  InOutQuart: 11,
  InQuint: 12,
  OutQuint: 13,
  InOutQuint: 14,
  InSine: 15,
  OutSine: 16,
  InOutSine: 17,
  InExpo: 18,
  OutExpo: 19,
  InOutExpo: 20,
  InCirc: 21,
  OutCirc: 22,
  InOutCirc: 23,
  InElastic: 24,
  OutElastic: 25,
  OutElasticHalf: 26,
  OutElasticQuarter: 27,
  InOutElastic: 28,
  InBack: 29,
  OutBack: 30,
  InOutBack: 31,
  InBounce: 32,
  OutBounce: 33,
  InOutBounce: 34,
} as const

/**
 * Easing indicates if the command should "accelerate".
 */
export type Easing = (typeof Easing)[keyof typeof Easing]

export function isEasing(easing: unknown): easing is Easing {
  return (
    easing === 0 ||
    easing === 1 ||
    easing === 2 ||
    easing === 3 ||
    easing === 4 ||
    easing === 5 ||
    easing === 6 ||
    easing === 7 ||
    easing === 8 ||
    easing === 9 ||
    easing === 11 ||
    easing === 12 ||
    easing === 13 ||
    easing === 14 ||
    easing === 15 ||
    easing === 16 ||
    easing === 17 ||
    easing === 18 ||
    easing === 19 ||
    easing === 20 ||
    easing === 21 ||
    easing === 22 ||
    easing === 23 ||
    easing === 24 ||
    easing === 25 ||
    easing === 26 ||
    easing === 27 ||
    easing === 28 ||
    easing === 29 ||
    easing === 30 ||
    easing === 31 ||
    easing === 32 ||
    easing === 33 ||
    easing === 34
  )
}
