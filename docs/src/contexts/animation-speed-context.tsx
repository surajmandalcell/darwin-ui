"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AnimationSpeedContextType {
  speed: number; // 0.5 = slow, 1 = normal, 2 = fast
  setSpeed: (speed: number) => void;
  getDuration: (baseDuration: number) => number;
}

const AnimationSpeedContext = createContext<AnimationSpeedContextType | null>(null);

const STORAGE_KEY = 'darwin-animation-speed';
const DEFAULT_SPEED = 1;

export function AnimationSpeedProvider({ children }: { children: ReactNode }) {
  const [speed, setSpeedState] = useState(DEFAULT_SPEED);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed) && parsed >= 0.25 && parsed <= 3) {
        setSpeedState(parsed);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage when speed changes
  const setSpeed = (newSpeed: number) => {
    const clamped = Math.max(0.25, Math.min(3, newSpeed));
    setSpeedState(clamped);
    localStorage.setItem(STORAGE_KEY, String(clamped));

    // Update CSS variable for non-framer animations
    document.documentElement.style.setProperty('--animation-speed', String(clamped));
  };

  // Helper to calculate adjusted duration (higher speed = lower duration)
  const getDuration = (baseDuration: number) => {
    return baseDuration / speed;
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AnimationSpeedContext.Provider value={{ speed, setSpeed, getDuration }}>
      {children}
    </AnimationSpeedContext.Provider>
  );
}

export function useAnimationSpeed() {
  const context = useContext(AnimationSpeedContext);
  if (!context) {
    // Return defaults if used outside provider
    return {
      speed: DEFAULT_SPEED,
      setSpeed: () => {},
      getDuration: (d: number) => d,
    };
  }
  return context;
}
