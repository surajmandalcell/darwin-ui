"use client";

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
        className="relative flex flex-col items-center group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleGitHubClick}
      >
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center shadow-lg">
          <Github className="w-6 h-6 text-foreground/80" />
        </div>
        {/* Tooltip */}
        <motion.div
          className="absolute -top-8 px-2 py-1 bg-popover rounded text-xs text-popover-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none shadow-md"
          initial={false}
          transition={{ duration: 0.15 }}
        >
          GitHub
        </motion.div>
      </motion.button>

      {/* About Icon */}
      <motion.button
        className="relative flex flex-col items-center group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleAboutClick}
      >
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
          <Info className="w-6 h-6 text-white/80" />
        </div>
        {/* Tooltip */}
        <motion.div
          className="absolute -top-8 px-2 py-1 bg-popover rounded text-xs text-popover-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none shadow-md"
          initial={false}
          transition={{ duration: 0.15 }}
        >
          About Darwin UI
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

export default Dock;
