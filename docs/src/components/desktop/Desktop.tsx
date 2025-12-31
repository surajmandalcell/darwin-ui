"use client";

import { useDesktop, apps } from '../../contexts/desktop-context';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopWindow } from './DesktopWindow';
import { motion, AnimatePresence } from 'framer-motion';

// Wallpaper gradients inspired by macOS
const wallpapers = {
  sonoma: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #16213e 100%)',
    overlay: 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
  },
  ventura: {
    background: 'linear-gradient(135deg, #0c1821 0%, #162447 50%, #1f4068 100%)',
    overlay: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
  },
  monterey: {
    background: 'linear-gradient(180deg, #2d1b4e 0%, #1e3a5f 50%, #1a1a2e 100%)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
  },
  gradient: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    overlay: 'none',
  },
};

export function Desktop() {
  const { state } = useDesktop();
  const currentWallpaper = wallpapers[state.settings.wallpaper];

  // Filter visible windows (open and not minimized)
  const visibleWindows = state.windows.filter(w => w.isOpen && !w.isMinimized);

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
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
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Darwin UI Logo */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
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
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
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
