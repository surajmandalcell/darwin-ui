"use client";

import { useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { AppDefinition } from '../../contexts/desktop-context';

interface DockItemProps {
  app: AppDefinition;
  isRunning: boolean;
  hasMinimizedWindow?: boolean;
  isMinimized?: boolean;
  onClick: () => void;
  index: number;
}

export function DockItem({
  app,
  isRunning,
  hasMinimizedWindow,
  isMinimized,
  onClick,
  index,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [, setIsBouncing] = useState(false);

  // Animation values
  const scale = useSpring(1, { stiffness: 400, damping: 20 });
  const y = useSpring(0, { stiffness: 400, damping: 20 });

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

  const handleClick = () => {
    if (!isRunning) {
      // Bounce animation when opening
      setIsBouncing(true);
      // Bounce effect
      const bounceAnimation = async () => {
        for (let i = 0; i < 3; i++) {
          y.set(-20);
          await new Promise(r => setTimeout(r, 150));
          y.set(0);
          await new Promise(r => setTimeout(r, 150));
        }
        setIsBouncing(false);
      };
      bounceAnimation();
    }
    onClick();
  };

  // App icon backgrounds - different gradient for each app
  const iconGradients: Record<string, string> = {
    developer: 'from-blue-500 to-blue-700',
    components: 'from-indigo-500 to-purple-600',
    playground: 'from-green-500 to-emerald-600',
    terminal: 'from-gray-700 to-gray-900',
    notes: 'from-yellow-400 to-orange-500',
    preview: 'from-purple-500 to-pink-600',
    settings: 'from-gray-500 to-gray-700',
  };

  return (
    <motion.button
      className="relative flex flex-col items-center group"
      style={{ scale, y }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
          iconGradients[app.id] || 'from-gray-500 to-gray-700'
        } flex items-center justify-center shadow-lg transition-shadow ${
          isHovered ? 'shadow-xl shadow-black/30' : ''
        }`}
      >
        <div className="w-7 h-7 text-white">
          {app.icon}
        </div>
      </div>

      {/* Running Indicator */}
      {isRunning && !isMinimized && (
        <motion.div
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Minimized Indicator (slightly different) */}
      {hasMinimizedWindow && (
        <motion.div
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/40"
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
