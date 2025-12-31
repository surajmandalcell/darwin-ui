"use client";

import { useState, useEffect, useCallback } from 'react';
import { useDesktop, apps } from '../../contexts/desktop-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wifi, Battery } from 'lucide-react';

interface MenuItem {
  label: string;
  action?: () => void;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
}

export function MenuBar() {
  const {
    getActiveWindow,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    state
  } = useDesktop();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const activeWindow = getActiveWindow();
  const activeApp = activeWindow ? apps[activeWindow.appId] : null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

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
            <button
              className={`flex items-center justify-center w-5 h-5 rounded transition-colors ${
                activeMenu === 'darwin' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              onClick={() => setActiveMenu(activeMenu === 'darwin' ? null : 'darwin')}
            >
              <div className="w-4 h-4 rounded bg-white/[0.08] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">D</span>
              </div>
            </button>

            {/* Darwin Menu Dropdown */}
            <AnimatePresence>
              {activeMenu === 'darwin' && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 min-w-[200px] py-1 bg-neutral-800/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl"
                >
                  <button
                    className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-between"
                    onClick={() => {
                      openApp('developer', '/docs/getting-started/introduction');
                      setActiveMenu(null);
                    }}
                  >
                    <span>About Darwin UI</span>
                  </button>
                  <div className="my-1 h-px bg-white/10" />
                  <button
                    className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-between"
                    onClick={() => {
                      openApp('settings');
                      setActiveMenu(null);
                    }}
                  >
                    <span>System Settings...</span>
                  </button>
                  <div className="my-1 h-px bg-white/10" />
                  <button
                    className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-between"
                    onClick={() => {
                      openApp('developer');
                      setActiveMenu(null);
                    }}
                  >
                    <span>Open Developer</span>
                  </button>
                  <button
                    className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-between"
                    onClick={() => {
                      openApp('components');
                      setActiveMenu(null);
                    }}
                  >
                    <span>Open Components</span>
                  </button>
                  <button
                    className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-between"
                    onClick={() => {
                      openApp('terminal');
                      setActiveMenu(null);
                    }}
                  >
                    <span>Open Terminal</span>
                  </button>
                  <button
                    className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-between"
                    onClick={() => {
                      openApp('notes');
                      setActiveMenu(null);
                    }}
                  >
                    <span>Open Notes</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active App Name */}
          {activeApp && (
            <span className="font-semibold">{activeApp.name}</span>
          )}

          {/* App Menus */}
          <div className="flex items-center gap-3">
            {Object.keys(menuItems).map((menu) => (
              <div key={menu} className="relative">
                <button
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeMenu === menu ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                  onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                  onMouseEnter={() => activeMenu && setActiveMenu(menu)}
                >
                  {menu}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {activeMenu === menu && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 min-w-[200px] py-1 bg-neutral-800/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl"
                    >
                      {menuItems[menu].map((item, idx) => (
                        item.separator ? (
                          <div key={idx} className="my-1 h-px bg-white/10" />
                        ) : (
                          <button
                            key={idx}
                            className={`w-full px-3 py-1.5 text-left text-[13px] flex items-center justify-between transition-colors ${
                              item.disabled
                                ? 'text-white/30 cursor-default'
                                : 'text-white/90 hover:bg-blue-500 hover:text-white'
                            }`}
                            onClick={() => {
                              if (!item.disabled && item.action) {
                                item.action();
                              }
                              setActiveMenu(null);
                            }}
                            disabled={item.disabled}
                          >
                            <span>{item.label}</span>
                            {item.shortcut && (
                              <span className={`text-xs ml-4 ${item.disabled ? 'text-white/20' : 'text-white/50'}`}>
                                {item.shortcut}
                              </span>
                            )}
                          </button>
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
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <Search className="w-4 h-4" />
          </button>

          {/* Wifi */}
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <Wifi className="w-4 h-4" />
          </button>

          {/* Battery */}
          <div className="flex items-center gap-1">
            <Battery className="w-5 h-4" />
            <span className="text-xs">100%</span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2 pl-2">
            <span>{formatDate(currentTime)}</span>
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}

export default MenuBar;
