"use client";

import { useDesktop, apps } from '../../contexts/desktop-context';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopWindow } from './DesktopWindow';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple } from 'lucide-react';

export function Desktop() {
  const { state } = useDesktop();

  // Filter visible windows (open and not minimized)
  const visibleWindows = state.windows.filter(w => w.isOpen && !w.isMinimized);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden select-none">
      {/* Animated Gradient Blob Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Animated gradient blobs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/30 blur-[120px]"
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[100px]"
          animate={{
            x: [0, -80, -40, 0],
            y: [0, 80, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ top: '40%', right: '10%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[80px]"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ bottom: '20%', left: '30%' }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

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
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/[0.08] flex items-center justify-center backdrop-blur-sm">
                <Apple className="w-10 h-10 text-white" />
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
