"use client";

import { useDesktop, apps } from '../../contexts/desktop-context';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopWindow } from './DesktopWindow';
import { motion, AnimatePresence } from 'framer-motion';
import { DarwinLogo } from '../icons/DarwinLogo';

export function Desktop() {
  const { state } = useDesktop();

  // Filter visible windows (open and not minimized)
  const visibleWindows = state.windows.filter(w => w.isOpen && !w.isMinimized);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden select-none">
      {/* Artistic Gradient Mesh Background - Inspired by Vercel/Linear */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-[#050508]" />

        {/* Mesh gradient layer */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120, 80, 200, 0.15), transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 20%, rgba(60, 100, 180, 0.12), transparent 50%),
              radial-gradient(ellipse 50% 60% at 60% 80%, rgba(100, 60, 160, 0.1), transparent 50%)
            `
          }}
        />

        {/* Primary aurora blob - slow drift */}
        <motion.div
          className="absolute w-[800px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
            filter: 'blur(60px)',
            top: '-10%',
            left: '10%',
          }}
          animate={{
            x: [0, 80, 40, 0],
            y: [0, 40, 80, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary glow - blue accent */}
        <motion.div
          className="absolute w-[600px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 70%)',
            filter: 'blur(80px)',
            top: '30%',
            right: '-5%',
          }}
          animate={{
            x: [0, -60, -30, 0],
            y: [0, 60, -20, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Tertiary warm accent - subtle pink */}
        <motion.div
          className="absolute w-[500px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
            filter: 'blur(100px)',
            bottom: '10%',
            left: '40%',
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
            rotate: [0, 10, -5, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle cyan accent - bottom right */}
        <motion.div
          className="absolute w-[400px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.06) 0%, transparent 60%)',
            filter: 'blur(70px)',
            bottom: '-5%',
            right: '20%',
          }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 100%)'
          }}
        />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
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
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[9990]"
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
              {/* Darwin UI Logo - Clean without squircle */}
              <DarwinLogo className="w-16 h-16 mx-auto mb-4 text-white" />
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
