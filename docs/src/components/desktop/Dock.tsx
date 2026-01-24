"use client";

import { useState } from 'react';
import { useDesktop, apps } from '../../contexts/desktop-context';
import { useTheme } from '../../contexts/theme-context';
import { DockItem } from './DockItem';
import { motion } from 'framer-motion';
import { Github, Info } from 'lucide-react';

// Order of apps in dock
const dockAppOrder = ['developer', 'example', 'changelog', 'terminal', 'notes', 'settings'];

export function Dock() {
  const { state, openApp, getRunningApps, focusWindow, restoreWindow, setAboutModal } = useDesktop();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const runningApps = getRunningApps();

  const [githubHovered, setGithubHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);

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
      className="relative flex items-end gap-1 px-[10px] py-1.5 md:px-4 md:gap-2 rounded-2xl max-w-[calc(100vw-20px)] overflow-visible z-9990"
      style={{
        backgroundColor: isDark ? 'rgba(30, 30, 30, 0.4)' : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: isDark
          ? '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          : '0 10px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      }}
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
          />
        );
      })}

      {/* Separator */}
      <div className="w-px h-6 md:h-10 bg-foreground/20 mx-1 self-center" />

      {/* GitHub Icon */}
      <motion.button
        className="relative flex flex-col items-center"
        whileTap={{ opacity: 0.7 }}
        onClick={handleGitHubClick}
        onMouseEnter={() => setGithubHovered(true)}
        onMouseLeave={() => setGithubHovered(false)}
      >
        <motion.div
          className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center shadow-sm"
          animate={{
            boxShadow: githubHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
          }}
          transition={{ duration: 0.15 }}
        >
          <Github className="w-6 h-6 text-foreground/80" />
        </motion.div>
        {/* Tooltip */}
        <motion.div
          className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-popover/95 backdrop-blur-md rounded-lg text-xs font-medium text-popover-foreground whitespace-nowrap pointer-events-none border border-border shadow-sm z-9999"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{
            opacity: githubHovered ? 1 : 0,
            y: githubHovered ? 0 : 8,
            scale: githubHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          GitHub
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 bg-popover/95 rotate-45 border-r border-b border-border" />
        </motion.div>
      </motion.button>

      {/* About Icon */}
      <motion.button
        className="relative flex flex-col items-center"
        whileTap={{ opacity: 0.7 }}
        onClick={handleAboutClick}
        onMouseEnter={() => setAboutHovered(true)}
        onMouseLeave={() => setAboutHovered(false)}
      >
        <motion.div
          className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center shadow-sm"
          animate={{
            boxShadow: aboutHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
          }}
          transition={{ duration: 0.15 }}
        >
          <Info className="w-6 h-6 text-foreground/80" />
        </motion.div>
        {/* Tooltip */}
        <motion.div
          className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-popover/95 backdrop-blur-md rounded-lg text-xs font-medium text-popover-foreground whitespace-nowrap pointer-events-none border border-border shadow-sm z-9999"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{
            opacity: aboutHovered ? 1 : 0,
            y: aboutHovered ? 0 : 8,
            scale: aboutHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          About Darwin UI
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 bg-popover/95 rotate-45 border-r border-b border-border" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

export default Dock;
