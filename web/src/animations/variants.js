const ease = [0.22, 1, 0.36, 1];

// ─── Page Transitions ─────────────────────────────────────────────────────────
export const pageVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease },
  },
};

// ─── Core Reusable Variants ───────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.38, ease } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease } },
};

// ─── Stagger Containers ───────────────────────────────────────────────────────
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerContainerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
};

// ─── Card Variants ────────────────────────────────────────────────────────────
export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.42, ease },
  }),
};

// ─── Modal Variants ───────────────────────────────────────────────────────────
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

export const modalPanel = {
  hidden: { opacity: 0, scale: 0.93, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease } },
  exit: { opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.2, ease } },
};

// ─── Floating Animation ───────────────────────────────────────────────────────
export const floatY = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatSlow = {
  animate: {
    y: [0, -5, 0],
    transition: { duration: 9, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─── Hover Presets ────────────────────────────────────────────────────────────
export const hoverLift = {
  whileHover: { y: -4, scale: 1.015, transition: { duration: 0.25, ease } },
  whileTap: { scale: 0.98 },
};

export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.2, ease } },
  whileTap: { scale: 0.97 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 24px rgba(232,93,63,0.3)",
    scale: 1.02,
    transition: { duration: 0.25, ease },
  },
  whileTap: { scale: 0.98 },
};