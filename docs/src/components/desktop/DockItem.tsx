"use client";

import { motion } from 'framer-motion';
import type { AppDefinition } from '../../contexts/desktop-context';
import { Hammer, Terminal, StickyNote, Settings, LayoutDashboard, FileText } from 'lucide-react';

interface DockItemProps {
  app: AppDefinition;
  isRunning: boolean;
  hasMinimizedWindow?: boolean;
  onClick: () => void;
  index: number;
  scale: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

// Map app IDs to their Lucide icons
const appIcons: Record<string, React.ReactNode> = {
  developer: <Hammer className="w-6 h-6 text-foreground" />,
  example: <LayoutDashboard className="w-6 h-6 text-foreground" />,
  terminal: <Terminal className="w-6 h-6 text-foreground" />,
  notes: <StickyNote className="w-6 h-6 text-foreground" />,
  settings: <Settings className="w-6 h-6 text-foreground" />,
  changelog: <FileText className="w-6 h-6 text-foreground" />,
};

export function DockItem({
  app,
  isRunning,
  hasMinimizedWindow,
  onClick,
  index,
  scale,
  isHovered,
  onHover,
  onLeave,
}: DockItemProps) {
  // Get icon for this app or use the app's default icon
  const icon = appIcons[app.id] || app.icon;

  return (
    <motion.button
      className="relative flex flex-col items-center origin-bottom"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: scale,
      }}
      transition={{
        opacity: { delay: index * 0.03, duration: 0.3 },
        y: { delay: index * 0.03, duration: 0.3 },
        scale: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: scale * 0.9 }}
    >
      {/* Icon Container */}
      <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
        {icon}
      </div>

      {/* Running Indicator */}
      {isRunning && (
        <motion.div
          className={`absolute -bottom-1 w-1 h-1 rounded-full ${
            hasMinimizedWindow ? 'bg-amber-400' : 'bg-foreground/80'
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Tooltip */}
      <motion.div
        className="absolute -top-10 px-3 py-1.5 bg-popover backdrop-blur-sm rounded-md text-xs text-popover-foreground whitespace-nowrap pointer-events-none border border-border"
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 5,
        }}
        transition={{ duration: 0.15 }}
      >
        {app.name}
        {/* Tooltip arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-popover rotate-45 border-r border-b border-border" />
      </motion.div>
    </motion.button>
  );
}

export default DockItem;
