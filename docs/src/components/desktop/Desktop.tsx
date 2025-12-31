"use client";

import { useDesktop, apps } from '../../contexts/desktop-context';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopWindow } from './DesktopWindow';
import { motion, AnimatePresence } from 'framer-motion';

// Solid dark wallpapers inspired by macOS
const wallpapers = {
  sonoma: {
    background: '#1a1a2e',
    overlay: 'none',
  },
  ventura: {
    background: '#0c1821',
    overlay: 'none',
  },
  monterey: {
    background: '#1e1e2e',
    overlay: 'none',
  },
  gradient: {
    background: '#0a0a0a',
    overlay: 'none',
  },
};

export function Desktop() {
  const { state } = useDesktop();
  const currentWallpaper = wallpapers[state.settings.wallpaper];

  // Filter visible windows (open and not minimized)
  const visibleWindows = state.windows.filter(w => w.isOpen && !w.isMinimized);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden select-none">
      {/* Animated Wallpaper */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ background: currentWallpaper.background }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: currentWallpaper.overlay }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Menu Bar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: state.isBooting ? 0.3 : 0,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <MenuBar />
      </motion.div>

      {/* Windows Container */}
      <div className="absolute inset-0 pt-7 pb-20 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {visibleWindows.map((window) => {
            const appDef = apps[window.appId];
            if (!appDef) return null;

            return (
              <DesktopWindow
                key={window.id}
                windowState={window}
                appDef={appDef}
                isFocused={state.activeWindowId === window.id}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: state.isBooting ? 0.5 : 0,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Dock />
      </motion.div>

      {/* Boot overlay */}
      <AnimatePresence>
        {state.isBooting && (
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center z-[9999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Darwin UI Logo */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-blue-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">D</span>
              </div>
              <motion.div
                className="w-32 h-1 bg-white/20 rounded-full overflow-hidden mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-full bg-white/80 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Desktop;
