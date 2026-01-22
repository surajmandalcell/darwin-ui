"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppDefinition } from '../../contexts/desktop-context';
import { Hammer, Terminal, StickyNote, Settings, LayoutDashboard, FileText } from 'lucide-react';

interface DockItemProps {
  app: AppDefinition;
  isRunning: boolean;
  hasMinimizedWindow?: boolean;
  onClick: () => void;
  index: number;
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
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get icon for this app or use the app's default icon
  const icon = appIcons[app.id] || app.icon;

  return (
    <motion.button
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { delay: index * 0.02, duration: 0.15 },
        y: { delay: index * 0.02, duration: 0.15 },
      }}
      whileTap={{ opacity: 0.7 }}
    >
      {/* Icon Container */}
      <motion.div
        className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center shadow-sm"
        animate={{
          backgroundColor: isHovered ? 'hsl(var(--muted) / 1.2)' : 'hsl(var(--muted))',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
        }}
        transition={{ duration: 0.15 }}
      >
        {icon}
      </motion.div>

      {/* Running Indicator */}
      {isRunning && (
        <motion.div
          className={`absolute -bottom-1 w-1 h-1 rounded-full ${
            hasMinimizedWindow ? 'bg-amber-400' : 'bg-foreground/80'
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}

      {/* Tooltip */}
      <motion.div
        className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-popover/95 backdrop-blur-md rounded-lg text-xs font-medium text-popover-foreground whitespace-nowrap pointer-events-none border border-border shadow-sm z-[9999]"
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 8,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        {app.name}
        {/* Tooltip arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 bg-popover/95 rotate-45 border-r border-b border-border" />
      </motion.div>
    </motion.button>
  );
}

export default DockItem;
