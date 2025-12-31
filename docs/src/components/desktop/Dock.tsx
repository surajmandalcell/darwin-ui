"use client";

import { useDesktop, apps } from '../../contexts/desktop-context';
import { DockItem } from './DockItem';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

// Order of apps in dock
const dockAppOrder = ['developer', 'terminal', 'notes', 'settings'];

export function Dock() {
  const { state, openApp, getRunningApps, focusWindow, restoreWindow } = useDesktop();
  const runningApps = getRunningApps();

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
      className="relative flex items-end gap-2 px-4 py-2 rounded-2xl"
      style={{
        background: 'rgba(30, 30, 30, 0.4)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
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

      {/* Trash */}
      <div className="w-px h-10 bg-white/20 mx-1 self-center" />
      <motion.button
        className="relative flex flex-col items-center group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center shadow-lg">
          <Trash2 className="w-6 h-6 text-white/80" />
        </div>
        {/* Tooltip */}
        <motion.div
          className="absolute -top-8 px-2 py-1 bg-black/80 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
          transition={{ duration: 0.15 }}
        >
          Trash
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

export default Dock;
