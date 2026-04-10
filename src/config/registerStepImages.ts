import type { ImageSourcePropType } from 'react-native';

type DualImages = { top?: ImageSourcePropType; bottom?: ImageSourcePropType };

function isDual(e: ImageSourcePropType | DualImages): e is DualImages {
  return typeof e === 'object' && e !== null && ('top' in e || 'bottom' in e);
}

/**
 * Per-step images. Most steps: a single `require(...)`.
 * Step 4: use `{ top: require(...), bottom: require(...) }` for the two dropdown slots.
 *
 * Example:
 *   3: require('../../assets/how-to-register/step-03.png'),
 *   4: {
 *     top: require('../../assets/how-to-register/step-04-top.png'),
 *     bottom: require('../../assets/how-to-register/step-04-bottom.png'),
 *   },
 */
const SOURCES: Partial<Record<number, ImageSourcePropType | DualImages>> = {
  1: require('../../assets/event_register/1.png'),
  2: require('../../assets/event_register/2.png'),
  3: require('../../assets/event_register/3.png'),
  4: {
    top: require('../../assets/event_register/4.png'),
    bottom: require('../../assets/event_register/4.5.png'),
  },
  5: require('../../assets/event_register/5.png'),
  6: require('../../assets/event_register/6.png'),
  7: require('../../assets/event_register/7.png'),
  8: require('../../assets/event_register/8.png'),
  9: require('../../assets/event_register/9.png'),
  10: require('../../assets/event_register/10.png'),
  11: require('../../assets/event_register/11.png'),
  12: require('../../assets/event_register/12.png'),
};

export type RegisterImageSlot = 'single' | 'top' | 'bottom';

export function getRegisterStepImageSlot(
  stepNumber: number,
  slot: RegisterImageSlot,
): ImageSourcePropType | undefined {
  const e = SOURCES[stepNumber];
  if (!e) return undefined;

  if (isDual(e)) {
    if (slot === 'top') return e.top;
    if (slot === 'bottom') return e.bottom;
    return e.bottom ?? e.top;
  }

  if (slot === 'top') return undefined;
  return e as ImageSourcePropType;
}

/** Backward-compatible: one image per step (non–step-4). */
export function getRegisterStepImage(stepNumber: number): ImageSourcePropType | undefined {
  return getRegisterStepImageSlot(stepNumber, 'single');
}
