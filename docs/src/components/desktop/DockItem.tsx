"use client";

import { useState } from 'react';
import { motion, useSpring, useAnimationControls } from 'framer-motion';
import type { AppDefinition } from '../../contexts/desktop-context';

interface DockItemProps {
  app: AppDefinition;
  isRunning: boolean;
  hasMinimizedWindow?: boolean;
  onClick: () => void;
  index: number;
}

export function DockItem({
  app,
  isRunning,
  hasMinimizedWindow,
  onClick,
  index,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  // Animation values with smoother damping
  const scale = useSpring(1, { stiffness: 400, damping: 25 });
  const y = useSpring(0, { stiffness: 400, damping: 25 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.3);
    y.set(-8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    y.set(0);
  };

  // Smooth bounce animation using framer-motion keyframes
  const bounce = () => {
    controls.start({
      y: [0, -20, 0, -10, 0, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeOut",
        times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1]
      }
    });
  };

  const handleClick = () => {
    if (!isRunning) {
      // Smooth bounce animation when opening
      bounce();
    }
    onClick();
  };

  // App icon backgrounds - solid colors for each app
  const iconColors: Record<string, string> = {
    developer: 'bg-blue-500',
    components: 'bg-indigo-500',
    terminal: 'bg-gray-700',
    notes: 'bg-yellow-500',
    preview: 'bg-purple-500',
    settings: 'bg-gray-600',
  };

  return (
    <motion.button
      className="relative flex flex-col items-center group"
      style={{ scale }}
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl ${
          iconColors[app.id] || 'bg-gray-600'
        } flex items-center justify-center shadow-lg transition-shadow ${
          isHovered ? 'shadow-xl shadow-black/30' : ''
        }`}
      >
        <div className="w-7 h-7 text-white">
          {app.icon}
        </div>
      </div>

      {/* Running Indicator - shows different states:
          - White dot = running and visible
          - Amber/yellow dot = minimized */}
      {isRunning && (
        <motion.div
          className={`absolute -bottom-1 w-1 h-1 rounded-full ${
            hasMinimizedWindow ? 'bg-amber-400' : 'bg-white/80'
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Tooltip */}
      <motion.div
        className="absolute -top-10 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-md text-xs text-white whitespace-nowrap pointer-events-none border border-white/10"
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 5,
        }}
        transition={{ duration: 0.15 }}
      >
        {app.name}
        {/* Tooltip arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/10" />
      </motion.div>
    </motion.button>
  );
}

export default DockItem;
