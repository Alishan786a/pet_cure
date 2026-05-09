import type { Transition, Variants } from 'framer-motion'

/** Premium ease — smooth deceleration */
export const EASE = [0.22, 1, 0.36, 1] as const

export const springSnappy = { type: 'spring', stiffness: 420, damping: 22 } as const
export const springSoft = { type: 'spring', stiffness: 280, damping: 24 } as const
export const springPop = { type: 'spring', stiffness: 500, damping: 28 } as const

export function transitionBase(reduce: boolean, duration = 0.52): Transition {
  return reduce ? { duration: 0 } : { duration, ease: EASE }
}

export const viewportOnce = { once: true, margin: '-10% 0px -8% 0px' as const }

/** Parent: orchestrates staggered children */
export function staggerContainer(reduce: boolean, stagger = 0.1, delayChildren = 0.08): Variants {
  if (reduce) return { hidden: {}, visible: {} }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

export function fadeUp(reduce: boolean): Variants {
  if (reduce) return { hidden: {}, visible: {} }
  return {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE },
    },
  }
}

export function fadeUpTight(reduce: boolean): Variants {
  if (reduce) return { hidden: {}, visible: {} }
  return {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASE },
    },
  }
}

export function scaleIn(reduce: boolean): Variants {
  if (reduce) return { hidden: {}, visible: {} }
  return {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.58, ease: EASE },
    },
  }
}

export function slideInRight(reduce: boolean): Variants {
  if (reduce) return { hidden: {}, visible: {} }
  return {
    hidden: { opacity: 0, x: 36 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  }
}

export function blurIn(reduce: boolean): Variants {
  if (reduce) return { hidden: {}, visible: {} }
  return {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: EASE },
    },
  }
}
