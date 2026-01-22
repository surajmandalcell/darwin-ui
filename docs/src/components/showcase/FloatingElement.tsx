"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

type AnimationPattern = 'figure8' | 'drift' | 'orbit' | 'breathe';
type DepthLevel = 1 | 2 | 3;

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  depth?: DepthLevel;
  pattern?: AnimationPattern;
  duration?: number;
  delay?: number;
}

// Animation patterns with multi-dimensional movement
const PATTERNS = {
  figure8: {
    x: [0, 15, 0, -15, 0],
    y: [0, -10, 0, 10, 0],
    rotate: [0, 2, 0, -2, 0],
  },
  drift: {
    x: [0, 20, 10, 25, 0],
    y: [0, -15, -5, -20, 0],
    rotate: [0, 3, 1, 4, 0],
  },
  orbit: {
    x: [0, 12, 0, -12, 0],
    y: [0, -8, -16, -8, 0],
    rotate: [0, 5, 0, -5, 0],
    scale: [1, 1.02, 1, 0.98, 1],
  },
  breathe: {
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0],
    rotate: [0, 1, 0, -1, 0],
    scale: [1, 1.05, 1, 0.97, 1],
  },
} as const;

// Depth multipliers for parallax-like effect
const DEPTH_MULTIPLIERS: Record<DepthLevel, number> = {
  1: 0.5,  // Slow, background feel
  2: 1.0,  // Default
  3: 1.5,  // Fast, foreground feel
};

// Scroll parallax intensity based on depth
const SCROLL_PARALLAX_INTENSITY: Record<DepthLevel, number> = {
  1: 30,   // Subtle parallax
  2: 60,   // Medium parallax
  3: 100,  // More pronounced parallax
};

function applyDepthMultiplier(values: readonly number[], multiplier: number): number[] {
  return values.map(v => v * multiplier);
}

export function FloatingElement({
  children,
  className = '',
  style,
  depth = 2,
  pattern = 'figure8',
  duration = 12,
  delay = 0,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxIntensity = SCROLL_PARALLAX_INTENSITY[depth];
  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxIntensity, -parallaxIntensity]
  );

  // Calculate animation values based on depth
  const depthMultiplier = DEPTH_MULTIPLIERS[depth];
  const patternConfig = PATTERNS[pattern];

  // Memoize animation configuration
  const animationConfig = useMemo(() => {
    const config: {
      x: number[];
      y: number[];
      rotate: number[];
      scale?: number[];
    } = {
      x: applyDepthMultiplier(patternConfig.x, depthMultiplier),
      y: applyDepthMultiplier(patternConfig.y, depthMultiplier),
      rotate: patternConfig.rotate.slice(), // Rotation stays consistent
    };

    if ('scale' in patternConfig) {
      config.scale = patternConfig.scale.slice();
    }

    return config;
  }, [pattern, depthMultiplier, patternConfig]);

  // Duration inversely affected by depth (faster for foreground)
  const adjustedDuration = duration / depthMultiplier;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        y: scrollY,
      }}
    >
      <motion.div
        animate={animationConfig}
        transition={{
          duration: adjustedDuration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default FloatingElement;
