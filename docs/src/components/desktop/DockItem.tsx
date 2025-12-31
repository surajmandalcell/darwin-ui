"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppDefinition } from '../../contexts/desktop-context';
import { Hammer, LayoutGrid, Terminal, StickyNote, Image, Settings } from 'lucide-react';

interface DockItemProps {
  app: AppDefinition;
  isRunning: boolean;
  hasMinimizedWindow?: boolean;
  onClick: () => void;
  index: number;
}

// Map app IDs to their Lucide icons
const appIcons: Record<string, React.ReactNode> = {
  developer: <Hammer className="w-6 h-6 text-white" />,
  components: <LayoutGrid className="w-6 h-6 text-white" />,
  terminal: <Terminal className="w-6 h-6 text-white" />,
  notes: <StickyNote className="w-6 h-6 text-white" />,
  preview: <Image className="w-6 h-6 text-white" />,
  settings: <Settings className="w-6 h-6 text-white" />,
};

export function DockItem({
  app,
  isRunning,
  hasMinimizedWindow,
  onClick,
  index,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onClick();
  };

  // Get icon for this app or use the app's default icon
  const icon = appIcons[app.id] || app.icon;

  return (
    <motion.button
      className="relative flex flex-col items-center group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isHovered ? 1.15 : 1,
      }}
      transition={{
        opacity: { delay: index * 0.03, duration: 0.3 },
        y: { delay: index * 0.03, duration: 0.3 },
        scale: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
        {icon}
      </div>

      {/* Running Indicator */}
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
