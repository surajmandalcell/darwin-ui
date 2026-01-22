"use client";

import { useRef, useState, useCallback } from 'react';
import { useDesktop, apps } from '../../contexts/desktop-context';
import { useTheme } from '../../contexts/theme-context';
import { DockItem } from './DockItem';
import { motion } from 'framer-motion';
import { Github, Info } from 'lucide-react';

// Order of apps in dock
const dockAppOrder = ['developer', 'example', 'changelog', 'terminal', 'notes', 'settings'];

// Total items including separator and utility icons
const TOTAL_ITEMS = dockAppOrder.length + 3; // apps + github + about + separator placeholder

export function Dock() {
  const { state, openApp, getRunningApps, focusWindow, restoreWindow, setAboutModal } = useDesktop();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const runningApps = getRunningApps();

  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate scale for each item based on distance from mouse
  const getScale = useCallback((index: number) => {
    if (mouseX === null || !dockRef.current) return 1;

    const dockRect = dockRef.current.getBoundingClientRect();
    const itemWidth = dockRect.width / TOTAL_ITEMS;
    const itemCenter = itemWidth * (index + 0.5);
    const distance = Math.abs(mouseX - itemCenter);

    // Magnification parameters
    const maxScale = 1.5;
    const effectRadius = itemWidth * 2.5;

    if (distance > effectRadius) return 1;

    // Smooth falloff using cosine
    const scale = 1 + (maxScale - 1) * Math.cos((distance / effectRadius) * (Math.PI / 2));
    return scale;
  }, [mouseX]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
    setHoveredIndex(null);
  }, []);

  const handleGitHubClick = () => {
    window.open('https://github.com/surajmandalcell/darwin-ui', '_blank');
  };

  const handleAboutClick = () => {
    setAboutModal(true);
  };

  const handleAppClick = (appId: string) => {
    // Check if app has windows
    const appWindows = state.windows.filter(w => w.appId === appId);
    const openWindow = appWindows.find(w => w.isOpen && !w.isMinimized);
    const minimizedWindow = appWindows.find(w => w.isMinimized);

    if (openWindow) {
      // Focus existing window
      focusWindow(openWindow.id);
    } else if (minimizedWindow) {
      // Restore minimized window
      restoreWindow(minimizedWindow.id);
      focusWindow(minimizedWindow.id);
    } else {
      // Open new window
      openApp(appId);
    }
  };

  return (
    <motion.div
      ref={dockRef}
      className="relative flex items-end gap-1 px-[10px] py-1.5 md:px-4 md:gap-2 rounded-2xl max-w-[calc(100vw-20px)] overflow-x-auto z-[9990] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{
        backgroundColor: isDark ? 'rgba(30, 30, 30, 0.4)' : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: isDark
          ? '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          : '0 10px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* App Icons */}
      {dockAppOrder.map((appId, index) => {
        const app = apps[appId];
        if (!app) return null;

        const isRunning = runningApps.includes(appId);
        const hasMinimizedWindow = state.windows.some(
          w => w.appId === appId && w.isMinimized
        );

        return (
          <DockItem
            key={appId}
            app={app}
            isRunning={isRunning}
            hasMinimizedWindow={hasMinimizedWindow}
            onClick={() => handleAppClick(appId)}
            index={index}
            scale={getScale(index)}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        );
      })}

      {/* Separator */}
      <div className="w-px h-6 md:h-10 bg-foreground/20 mx-1 self-center" />

      {/* GitHub Icon */}
      <motion.button
        className="relative flex flex-col items-center origin-bottom"
        animate={{ scale: getScale(dockAppOrder.length + 1) }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        whileTap={{ scale: getScale(dockAppOrder.length + 1) * 0.9 }}
        onClick={handleGitHubClick}
        onMouseEnter={() => setHoveredIndex(dockAppOrder.length + 1)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center">
          <Github className="w-6 h-6 text-foreground/80" />
        </div>
        {/* Tooltip */}
        <motion.div
          className="absolute -top-10 px-3 py-1.5 bg-popover backdrop-blur-sm rounded-md text-xs text-popover-foreground whitespace-nowrap pointer-events-none border border-border"
          initial={{ opacity: 0, y: 5 }}
          animate={{
            opacity: hoveredIndex === dockAppOrder.length + 1 ? 1 : 0,
            y: hoveredIndex === dockAppOrder.length + 1 ? 0 : 5,
          }}
          transition={{ duration: 0.15 }}
        >
          GitHub
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-popover rotate-45 border-r border-b border-border" />
        </motion.div>
      </motion.button>

      {/* About Icon */}
      <motion.button
        className="relative flex flex-col items-center origin-bottom"
        animate={{ scale: getScale(dockAppOrder.length + 2) }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        whileTap={{ scale: getScale(dockAppOrder.length + 2) * 0.9 }}
        onClick={handleAboutClick}
        onMouseEnter={() => setHoveredIndex(dockAppOrder.length + 2)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center">
          <Info className="w-6 h-6 text-foreground/80" />
        </div>
        {/* Tooltip */}
        <motion.div
          className="absolute -top-10 px-3 py-1.5 bg-popover backdrop-blur-sm rounded-md text-xs text-popover-foreground whitespace-nowrap pointer-events-none border border-border"
          initial={{ opacity: 0, y: 5 }}
          animate={{
            opacity: hoveredIndex === dockAppOrder.length + 2 ? 1 : 0,
            y: hoveredIndex === dockAppOrder.length + 2 ? 0 : 5,
          }}
          transition={{ duration: 0.15 }}
        >
          About Darwin UI
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-popover rotate-45 border-r border-b border-border" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

export default Dock;
