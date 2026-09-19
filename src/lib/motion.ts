import type { Transition, Variants } from "framer-motion";

/** Curvas e durações padrão do sistema. Componentes importam daqui para manter coesão. */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  snap: [0.2, 0.9, 0.3, 1.2] as const,
};

export const duration = {
  fast: 0.18,
  base: 0.3,
  slow: 0.6,
  reveal: 0.8,
};

export const spring: Transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 };
export const springSoft: Transition = { type: "spring", stiffness: 220, damping: 28 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: duration.base },
};

export const modalMotion = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 8 },
  transition: { duration: duration.base, ease: ease.out },
};

export const sheetMotion = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { type: "spring", stiffness: 320, damping: 34 } as Transition,
};
