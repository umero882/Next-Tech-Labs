/**
 * Centralized framer-motion variants.
 * Tweak in one place; consumed by section/card components.
 */

const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.4, ease } },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const cardHover = {
  rest:  { y: 0 },
  hover: { y: -2, transition: { duration: 0.25, ease } },
};

export const arrowSlide = {
  rest:  { x: 0 },
  hover: { x: 4, transition: { duration: 0.25, ease } },
};
