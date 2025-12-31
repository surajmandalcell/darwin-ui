"use client";

import { useState, useEffect } from 'react';
import { useDesktop, apps } from '../../contexts/desktop-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wifi, Battery } from 'lucide-react';

export function MenuBar() {
  const { getActiveWindow } = useDesktop();
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

  // Menu items for each app
  const menuItems: Record<string, string[]> = {
    File: ['New Window', 'Close Window'],
    Edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'],
    View: ['Zoom In', 'Zoom Out', 'Enter Full Screen'],
    Window: ['Minimize', 'Zoom', 'Bring All to Front'],
    Help: ['Darwin UI Documentation', 'Report an Issue'],
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 z-[9000]">
      {/* Glass background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md border-b border-white/10" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-between px-4 text-white/90 text-[13px] font-medium">
        {/* Left side - Logo and App Menu */}
        <div className="flex items-center gap-4">
          {/* Darwin Logo (Apple position) */}
          <button
            className="flex items-center justify-center w-5 h-5 hover:bg-white/10 rounded transition-colors"
            onClick={() => setActiveMenu(activeMenu === 'darwin' ? null : 'darwin')}
          >
            <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">D</span>
            </div>
          </button>

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
                      className="absolute top-full left-0 mt-1 min-w-[180px] py-1 bg-neutral-800/95 backdrop-blur-md rounded-lg border border-white/10 shadow-md"
                    >
                      {menuItems[menu].map((item, idx) => (
                        <button
                          key={idx}
                          className="w-full px-3 py-1.5 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          {item}
                        </button>
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
