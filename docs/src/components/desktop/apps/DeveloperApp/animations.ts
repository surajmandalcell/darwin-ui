// Animation variants for staggered children
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
} as const;

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
} as const;

// Page transition variants
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)"
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
} as const;

// Feature card variants (no hover border glow)
export const featureCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
} as const;

// Icon animation variants
export const iconVariants = {
  initial: { rotate: 0 },
  hover: {
    rotate: [0, -10, 10, -5, 5, 0],
    scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const
    }
  }
};

// Sidebar navigation variants
export const sidebarItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  })
};

// Code block variants (no hover glow)
export const codeBlockVariants = {
  initial: {
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  hover: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    transition: {
      duration: 0.3
    }
  }
} as const;
