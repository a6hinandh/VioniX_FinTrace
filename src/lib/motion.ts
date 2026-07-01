import type { Variants } from 'framer-motion';

/** Stagger container — wrap a list of `motion.div` items with `itemVariants`. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

/** Scale + fade — used for modals and dropdowns (supports exit via AnimatePresence). */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
};

/** Backdrop fade — pairs with scaleFade for modal overlays. */
export const backdropFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Horizontal slide — used for the mobile sidebar drawer. */
export const slideFromLeft: Variants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { x: '-100%', transition: { duration: 0.2, ease: 'easeIn' } },
};

/** Subtle page transition fade — used for route changes inside the app shell. */
export const pageFade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
};
