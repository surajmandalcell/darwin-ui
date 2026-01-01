"use client";

import { useState, useEffect, useCallback } from 'react';
import { useDesktop, apps } from '../../contexts/desktop-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wifi, Battery, WifiOff, X, ExternalLink } from 'lucide-react';
import { DarwinLogo } from '../icons/DarwinLogo';

// About Modal Component - Apple-style About window
function AboutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9501]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="w-[320px] bg-neutral-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header with close button */}
              <div className="relative flex items-center justify-center h-8 bg-neutral-800/50 border-b border-white/5">
                <motion.button
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 flex items-center justify-center group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                <span className="text-xs text-white/50 font-medium">About Darwin UI</span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col items-center text-center">
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 15 }}
                >
                  <DarwinLogo className="w-16 h-16 text-white" />
                </motion.div>

                {/* App Name */}
                <motion.h1
                  className="text-xl font-semibold text-white mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Darwin UI
                </motion.h1>

                {/* Version */}
                <motion.p
                  className="text-sm text-white/60 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Version 1.2.0
                </motion.p>

                {/* Description */}
                <motion.p
                  className="text-sm text-white/70 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  A macOS-inspired React component library for building beautiful, modern interfaces.
                </motion.p>

                {/* Divider */}
                <motion.div
                  className="w-full h-px bg-white/10 mb-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3 }}
                />

                {/* Credits */}
                <motion.div
                  className="text-xs text-white/50 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <p>Created by Suraj Mandal</p>
                  <p>Built with React, Vite & Tailwind CSS</p>
                </motion.div>

                {/* GitHub Link */}
                <motion.a
                  href="https://github.com/surajmandalcell/darwin-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 hover:text-white transition-colors border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </motion.a>

                {/* Copyright */}
                <motion.p
                  className="mt-4 text-[10px] text-white/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  Copyright 2024-2025 Darwin UI. All rights reserved.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface MenuItem {
  label: string;
  action?: () => void;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
}

// Animated WiFi indicator component
function AnimatedWifi({ connected = true }: { connected?: boolean }) {
  return (
    <div className="relative">
      {connected ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <Wifi className="w-4 h-4" />
          {/* Subtle pulse animation for active connection */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </motion.div>
        </motion.div>
      ) : (
        <WifiOff className="w-4 h-4 text-white/50" />
      )}
    </div>
  );
}

// Simple Battery icon
function BatteryIcon() {
  return <Battery className="w-4 h-4" />;
}

// Simple clock component without seconds
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <span className="tabular-nums">
      {formatDate(time)} {formatTime(time)}
    </span>
  );
}

// Dropdown menu animation variants
const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.12, ease: "easeIn" as const }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: [0.23, 1, 0.32, 1] as const,
      staggerChildren: 0.02,
      delayChildren: 0.02
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -5,
    transition: { duration: 0.1, ease: "easeIn" as const }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: "easeOut" as const }
  }
};

export function MenuBar() {
  const {
    getActiveWindow,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    setAboutModal,
    state
  } = useDesktop();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const activeWindow = getActiveWindow();
  const activeApp = activeWindow ? apps[activeWindow.appId] : null;

  // Handle menu item actions
  const handleNewWindow = useCallback(() => {
    if (activeWindow) {
      openApp(activeWindow.appId);
    }
  }, [activeWindow, openApp]);

  const handleCloseWindow = useCallback(() => {
    if (activeWindow) {
      closeWindow(activeWindow.id);
    }
  }, [activeWindow, closeWindow]);

  const handleMinimize = useCallback(() => {
    if (activeWindow) {
      minimizeWindow(activeWindow.id);
    }
  }, [activeWindow, minimizeWindow]);

  const handleZoom = useCallback(() => {
    if (activeWindow) {
      if (activeWindow.isMaximized) {
        restoreWindow(activeWindow.id);
      } else {
        maximizeWindow(activeWindow.id);
      }
    }
  }, [activeWindow, maximizeWindow, restoreWindow]);

  const handleBringAllToFront = useCallback(() => {
    // Focus all open windows in sequence (the last one will be on top)
    state.windows
      .filter(w => w.isOpen && !w.isMinimized)
      .forEach(w => focusWindow(w.id));
  }, [state.windows, focusWindow]);

  const handleOpenDocs = useCallback(() => {
    openApp('developer', '/docs/getting-started/introduction');
  }, [openApp]);

  const handleReportIssue = useCallback(() => {
    window.open('https://github.com/darwin-ui/darwin-ui/issues/new', '_blank');
  }, []);

  // Build menu items with actions
  const getMenuItems = useCallback((): Record<string, MenuItem[]> => {
    const hasActiveWindow = !!activeWindow;

    return {
      File: [
        {
          label: 'New Window',
          action: handleNewWindow,
          shortcut: '⌘N',
          disabled: !hasActiveWindow
        },
        { label: '', separator: true },
        {
          label: 'Close Window',
          action: handleCloseWindow,
          shortcut: '⌘W',
          disabled: !hasActiveWindow
        },
      ],
      Edit: [
        { label: 'Undo', shortcut: '⌘Z', disabled: true },
        { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
        { label: '', separator: true },
        { label: 'Cut', shortcut: '⌘X', disabled: true },
        { label: 'Copy', shortcut: '⌘C', disabled: true },
        { label: 'Paste', shortcut: '⌘V', disabled: true },
        { label: 'Select All', shortcut: '⌘A', disabled: true },
      ],
      View: [
        { label: 'Zoom In', shortcut: '⌘+', disabled: true },
        { label: 'Zoom Out', shortcut: '⌘-', disabled: true },
        { label: 'Actual Size', shortcut: '⌘0', disabled: true },
        { label: '', separator: true },
        {
          label: activeWindow?.isMaximized ? 'Exit Full Screen' : 'Enter Full Screen',
          action: handleZoom,
          shortcut: '⌃⌘F',
          disabled: !hasActiveWindow
        },
      ],
      Window: [
        {
          label: 'Minimize',
          action: handleMinimize,
          shortcut: '⌘M',
          disabled: !hasActiveWindow
        },
        {
          label: 'Zoom',
          action: handleZoom,
          disabled: !hasActiveWindow
        },
        { label: '', separator: true },
        {
          label: 'Bring All to Front',
          action: handleBringAllToFront,
          disabled: state.windows.filter(w => w.isOpen && !w.isMinimized).length === 0
        },
      ],
      Help: [
        {
          label: 'Darwin UI Documentation',
          action: handleOpenDocs
        },
        { label: '', separator: true },
        {
          label: 'Report an Issue',
          action: handleReportIssue
        },
      ],
    };
  }, [
    activeWindow,
    state.windows,
    handleNewWindow,
    handleCloseWindow,
    handleMinimize,
    handleZoom,
    handleBringAllToFront,
    handleOpenDocs,
    handleReportIssue
  ]);

  const menuItems = getMenuItems();

  // Handler for About modal
  const handleOpenAbout = useCallback(() => {
    setAboutModal(true);
  }, [setAboutModal]);

  // Darwin menu items for stagger animation
  const darwinMenuItems = [
    { label: 'About Darwin UI', action: handleOpenAbout },
    { separator: true },
    { label: 'System Settings...', action: () => openApp('settings') },
    { separator: true },
    { label: 'Open Developer', action: () => openApp('developer') },
    { label: 'Open Terminal', action: () => openApp('terminal') },
    { label: 'Open Notes', action: () => openApp('notes') },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-7 z-[9000]">
      {/* Glass background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md border-b border-white/10" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-between px-4 text-white/90 text-[13px] font-medium">
        {/* Left side - Logo and App Menu */}
        <div className="flex items-center gap-4">
          {/* Darwin Logo (Apple position) */}
          <div className="relative">
            <motion.button
              className="flex items-center justify-center w-5 h-5 rounded"
              animate={{
                backgroundColor: activeMenu === 'darwin' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)'
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              transition={{ duration: 0.15 }}
              onClick={() => setActiveMenu(activeMenu === 'darwin' ? null : 'darwin')}
            >
              <DarwinLogo className="w-4 h-4" />
            </motion.button>

            {/* Darwin Menu Dropdown */}
            <AnimatePresence>
              {activeMenu === 'darwin' && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 mt-1 min-w-[200px] py-1 bg-neutral-800/95 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl shadow-black/50"
                >
                  {darwinMenuItems.map((item, idx) => (
                    item.separator ? (
                      <motion.div
                        key={idx}
                        variants={menuItemVariants}
                        className="my-1 h-px bg-white/10"
                      />
                    ) : (
                      <motion.button
                        key={idx}
                        variants={menuItemVariants}
                        className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 flex items-center justify-between transition-colors duration-100 hover:bg-blue-500 hover:text-white rounded-sm mx-0.5"
                        style={{ width: 'calc(100% - 4px)' }}
                        onClick={() => {
                          item.action?.();
                          setActiveMenu(null);
                        }}
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.1 }}
                      >
                        <span>{item.label}</span>
                      </motion.button>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active App Name */}
          <AnimatePresence mode="wait">
            {activeApp && (
              <motion.span
                key={activeApp.name}
                className="font-semibold"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
              >
                {activeApp.name}
              </motion.span>
            )}
          </AnimatePresence>

          {/* App Menus */}
          <div className="flex items-center gap-3">
            {Object.keys(menuItems).map((menu) => (
              <div key={menu} className="relative">
                <motion.button
                  className="px-2 py-0.5 rounded"
                  animate={{
                    backgroundColor: activeMenu === menu ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)'
                  }}
                  whileHover={{ backgroundColor: activeMenu === menu ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                  onMouseEnter={() => activeMenu && setActiveMenu(menu)}
                >
                  {menu}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {activeMenu === menu && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-1 min-w-[200px] py-1 bg-neutral-800/95 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl shadow-black/50"
                    >
                      {menuItems[menu].map((item, idx) => (
                        item.separator ? (
                          <motion.div
                            key={idx}
                            variants={menuItemVariants}
                            className="my-1 h-px bg-white/10"
                          />
                        ) : (
                          <motion.button
                            key={idx}
                            variants={menuItemVariants}
                            className={`w-full px-3 py-1.5 text-left text-[13px] flex items-center justify-between rounded-sm mx-0.5 ${
                              item.disabled
                                ? 'text-white/30 cursor-default'
                                : 'text-white/90 hover:bg-blue-500 hover:text-white'
                            }`}
                            style={{ width: 'calc(100% - 4px)' }}
                            onClick={() => {
                              if (!item.disabled && item.action) {
                                item.action();
                              }
                              setActiveMenu(null);
                            }}
                            disabled={item.disabled}
                            whileHover={!item.disabled ? { x: 2 } : {}}
                            transition={{ duration: 0.1 }}
                          >
                            <span>{item.label}</span>
                            {item.shortcut && (
                              <span className={`text-xs ml-4 ${item.disabled ? 'text-white/20' : 'text-white/50'}`}>
                                {item.shortcut}
                              </span>
                            )}
                          </motion.button>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - System Tray */}
        <div className="flex items-center gap-3">
          {/* Search/Spotlight */}
          <motion.button
            className="p-1 rounded"
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <Search className="w-4 h-4" />
          </motion.button>

          {/* Wifi with animated indicator */}
          <motion.button
            className="p-1 rounded"
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <AnimatedWifi connected={true} />
          </motion.button>

          {/* Battery */}
          <BatteryIcon />

          {/* Date & Time */}
          <Clock />
        </div>
      </div>

      {/* Click outside to close menu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            className="fixed inset-0 z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AboutModal isOpen={state.showAboutModal} onClose={() => setAboutModal(false)} />
    </div>
  );
}

export default MenuBar;
